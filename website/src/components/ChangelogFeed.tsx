import { useEffect, useState } from 'react';
import { fallbackReleases, sectionColors, type ReleaseEntry } from '../data/releases';

interface Props {
  initialReleases?: ReleaseEntry[];
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  prerelease: boolean;
  published_at: string;
  html_url: string;
  body: string;
}

const RELEASES_API_URL = 'https://api.github.com/repos/3A2DEV/ansi-tui/releases?per_page=12';
const IGNORED_HEADINGS = new Set(['Changelog', 'Release notes']);

function toDisplayDate(isoDate: string) {
  return isoDate ? isoDate.slice(0, 10) : '';
}

function normalizeVersion(tagName: string) {
  return tagName.replace(/^v/, '');
}

function isVersionHeading(heading: string) {
  return /^v?\d+(?:\.\d+)*(?:[-+][\w.-]+)?$/.test(heading);
}

function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={`${part}-${index}`} className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.92em] text-cyan-300">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function parseReleaseSections(body: string) {
  const sections: Record<string, string[]> = {};
  let currentSection: string | null = null;

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);

    if (headingMatch) {
      const heading = headingMatch[1].replace(/:$/, '').trim();
      currentSection = !IGNORED_HEADINGS.has(heading) && !isVersionHeading(heading) ? heading : null;

      if (currentSection && !sections[currentSection]) {
        sections[currentSection] = [];
      }

      continue;
    }

    if (!currentSection) {
      continue;
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);

    if (bulletMatch) {
      sections[currentSection].push(bulletMatch[1].trim());
      continue;
    }

    const currentItems = sections[currentSection];

    if (currentItems.length > 0) {
      currentItems[currentItems.length - 1] = `${currentItems[currentItems.length - 1]} ${line}`;
    } else {
      currentItems.push(line);
    }
  }

  if (Object.keys(sections).length > 0) {
    return sections;
  }

  const notes = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  return notes.length > 0 ? { Notes: notes } : { Notes: ['Release notes unavailable.'] };
}

function parseGitHubRelease(release: GitHubRelease, index: number): ReleaseEntry {
  const name = release.name?.trim();
  const tagName = release.tag_name?.trim() || name || 'unversioned';
  const normalizedTag = normalizeVersion(tagName);
  const normalizedName = name ? normalizeVersion(name) : '';
  const label = release.prerelease
    ? 'Pre-release'
    : index === 0
      ? 'Latest'
      : normalizedName && normalizedName !== normalizedTag
        ? name
        : undefined;

  return {
    version: normalizedTag,
    date: toDisplayDate(release.published_at),
    label,
    url: release.html_url,
    sections: parseReleaseSections(release.body || ''),
  };
}

export default function ChangelogFeed({ initialReleases = fallbackReleases }: Props) {
  const [releases, setReleases] = useState<ReleaseEntry[]>(initialReleases);
  const [loadState, setLoadState] = useState<'idle' | 'error'>('idle');

  useEffect(() => {
    let cancelled = false;

    const loadReleases = async () => {
      try {
        const response = await fetch(RELEASES_API_URL);

        if (!response.ok) {
          throw new Error(`GitHub releases request failed: ${response.status}`);
        }

        const data = (await response.json()) as GitHubRelease[];

        if (!cancelled && data.length > 0) {
          setReleases(data.map(parseGitHubRelease));
          setLoadState('idle');
        }
      } catch {
        if (!cancelled) {
          setLoadState('error');
        }
      }
    };

    void loadReleases();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs text-zinc-500">
        <span>Release notes from GitHub Releases.</span>
        {loadState === 'error' ? <span className="text-amber-400">Showing bundled fallback notes.</span> : <span className="text-cyan-400">Live source: GitHub Releases</span>}
      </div>

      {releases.map(({ version, date, label, url, sections }) => (
        <article key={`${version}-${date}`} className="mb-16">
          <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-zinc-800 pb-5">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-2xl font-bold text-zinc-50 transition-colors hover:text-cyan-400">
                v{version}
              </a>
            ) : (
              <h2 className="font-mono text-2xl font-bold text-zinc-50">v{version}</h2>
            )}
            {label ? <span className="badge-cyan">{label}</span> : null}
            <time className="ml-auto font-mono text-sm text-zinc-500">{date}</time>
          </div>

          <div className="space-y-6">
            {Object.entries(sections).map(([sectionName, items]) => (
              <div key={sectionName}>
                <h3 className={['badge mb-4 text-xs font-semibold', sectionColors[sectionName] ?? 'border-zinc-700 bg-zinc-800 text-zinc-400'].join(' ')}>
                  {sectionName}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1 shrink-0 text-zinc-700">-</span>
                      <span className="leading-relaxed">{renderInlineCode(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-zinc-500 transition-colors hover:text-cyan-400">
                GitHub Release →
              </a>
            ) : null}
            <a
              href={`https://www.npmjs.com/package/@3a2dev/ansi-tui/v/${version}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-500 transition-colors hover:text-cyan-400"
            >
              npm v{version} →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
