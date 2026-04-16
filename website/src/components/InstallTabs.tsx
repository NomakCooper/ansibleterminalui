import { useState } from 'react';

type Tab = 'global' | 'npx' | 'script' | 'offline';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'global', label: 'npm global' },
  { id: 'npx', label: 'npx (no install)' },
  { id: 'script', label: 'install.sh' },
  { id: 'offline', label: 'offline / air-gapped' },
];

const content: Record<Tab, { lines: Array<{ text: string; comment?: boolean; prompt?: boolean }> }> = {
  global: {
    lines: [
      { text: 'npm install -g @3a2dev/ansi-tui', prompt: true },
      { text: 'ansi-tui', prompt: true },
    ],
  },
  npx: {
    lines: [
      { text: '# run directly without installing', comment: true },
      { text: 'npx @3a2dev/ansi-tui', prompt: true },
    ],
  },
  script: {
    lines: [
      { text: 'git clone https://github.com/3A2DEV/ansi-tui', prompt: true },
      { text: 'cd ansi-tui', prompt: true },
      { text: './install.sh', prompt: true },
    ],
  },
  offline: {
    lines: [
      { text: '# on a connected machine:', comment: true },
      { text: 'npm pack @3a2dev/ansi-tui', prompt: true },
      { text: 'curl -fsSL https://raw.githubusercontent.com/3A2DEV/ansi-tui/main/install.sh -o install.sh', prompt: true },
      { text: '', prompt: false },
      { text: '# copy the tarball and install.sh to the target, then:', comment: true },
      { text: 'chmod +x install.sh', prompt: true },
      { text: './install.sh --local ./3a2dev-ansi-tui-0.1.0.tgz', prompt: true },
    ],
  },
};

export default function InstallTabs() {
  const [active, setActive] = useState<Tab>('global');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'unsupported'>('idle');

  const commandText = content[active].lines
    .filter((line) => line.prompt)
    .map((line) => line.text)
    .join('\n');

  const handleCopy = async () => {
    if (!navigator?.clipboard) {
      setCopyState('unsupported');
      window.setTimeout(() => setCopyState('idle'), 2000);
      return;
    }

    await navigator.clipboard.writeText(commandText);
    setCopyState('copied');
    window.setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
      <div className="flex overflow-x-auto border-b border-zinc-700 bg-zinc-800">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={[
              'border-b-2 -mb-px px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              active === id ? 'border-cyan-400 bg-zinc-900 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative p-5 font-mono text-sm">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
          aria-label="Copy install command to clipboard"
        >
          {copyState === 'copied' ? 'Copied' : copyState === 'unsupported' ? 'No clipboard' : 'Copy'}
        </button>

        <div className="space-y-1 pr-20">
          {content[active].lines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              {line.comment ? (
                <span className="text-zinc-600">{line.text}</span>
              ) : line.prompt ? (
                <>
                  <span className="shrink-0 select-none text-zinc-600">$</span>
                  <span className="text-cyan-400">{line.text}</span>
                </>
              ) : (
                <span className="block h-4 text-zinc-800">&nbsp;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-zinc-800 px-5 py-3">
        {['Node.js 18+', 'Any modern terminal', 'Ansible CLI pre-installed'].map((requirement) => (
          <span key={requirement} className="inline-flex items-center gap-1 text-xs text-zinc-500">
            <span className="text-green-500">✓</span>
            {requirement}
          </span>
        ))}
      </div>
    </div>
  );
}
