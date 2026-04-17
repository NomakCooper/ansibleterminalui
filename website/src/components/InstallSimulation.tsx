import { useEffect, useMemo, useState } from 'react';
import { usePackageMeta } from '../hooks/usePackageMeta';
import { fillPackageTemplate } from '../utils/packageMeta';

type PromptLine = {
  kind: 'prompt';
  prompt: string;
  command: string;
  hold: number;
  typeSpeed?: number;
};

type OutputLine = {
  kind: 'output';
  text: string;
  template?: string;
  tone?: 'default' | 'success' | 'muted';
  hold: number;
};

type BlankLine = {
  kind: 'blank';
  hold: number;
};

type SimulationLine = PromptLine | OutputLine | BlankLine;

const shellPrompt = 'nomakcooper@3a2dev-host ~ $ ';

const simulationLines: SimulationLine[] = [
  { kind: 'prompt', prompt: shellPrompt, command: 'node -v', hold: 350, typeSpeed: 18 },
  { kind: 'output', text: 'v25.9.0', tone: 'default', hold: 420 },
  { kind: 'blank', hold: 180 },
  { kind: 'prompt', prompt: shellPrompt, command: 'npm -v', hold: 350, typeSpeed: 18 },
  { kind: 'output', text: '11.12.1', tone: 'default', hold: 420 },
  { kind: 'blank', hold: 240 },
  { kind: 'prompt', prompt: shellPrompt, command: 'npm install -g @3a2dev/ansi-tui', hold: 500, typeSpeed: 26 },
  { kind: 'blank', hold: 300 },
  { kind: 'output', text: 'added 73 packages in 3s', tone: 'success', hold: 650 },
  { kind: 'blank', hold: 260 },
  { kind: 'output', text: '38 packages are looking for funding', tone: 'muted', hold: 400 },
  { kind: 'output', text: '  run `npm fund` for details', tone: 'muted', hold: 650 },
  { kind: 'blank', hold: 260 },
  { kind: 'prompt', prompt: shellPrompt, command: 'ansi-tui -v', hold: 350, typeSpeed: 18 },
  { kind: 'output', text: '0.1.0', template: '{{version}}', tone: 'success', hold: 400 },
];

function renderLine(line: SimulationLine, packageMeta: ReturnType<typeof usePackageMeta>, typedCommand?: string) {
  if (line.kind === 'blank') {
    return <div className="h-3" aria-hidden="true" />;
  }

  if (line.kind === 'output') {
    const toneClass =
      line.tone === 'success'
        ? 'text-green-400'
        : line.tone === 'muted'
          ? 'text-zinc-500'
          : 'text-zinc-300';

    return <div className={toneClass}>{line.template && packageMeta ? fillPackageTemplate(line.template, packageMeta) : line.text}</div>;
  }

  return (
    <div>
      <span className="text-zinc-600">{line.prompt}</span>
      <span className="text-cyan-400">{typedCommand ?? line.command}</span>
      {typedCommand !== undefined && typedCommand.length < line.command.length ? (
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.26em] animate-blink rounded-[1px] bg-cyan-400 align-[-0.18em]" aria-hidden="true"></span>
      ) : null}
    </div>
  );
}

export default function InstallSimulation() {
  const packageMeta = usePackageMeta();
  const [displayedCount, setDisplayedCount] = useState(0);
  const [typingCommand, setTypingCommand] = useState<string | null>(null);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();

    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedCount(simulationLines.length);
      setTypingCommand(null);
      setTypingIndex(null);
      return;
    }

    setDisplayedCount(0);
    setTypingCommand(null);
    setTypingIndex(null);

    let cancelled = false;
    const timeoutIds: number[] = [];
    const intervalIds: number[] = [];

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timeoutIds.push(id);
    };

    const runLine = (index: number) => {
      if (cancelled || index >= simulationLines.length) {
        return;
      }

      const line = simulationLines[index];

      if (line.kind === 'prompt') {
        setTypingIndex(index);
        setTypingCommand('');

        let position = 0;
        const intervalId = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(intervalId);
            return;
          }

          position += 1;
          setTypingCommand(line.command.slice(0, position));

          if (position >= line.command.length) {
            window.clearInterval(intervalId);
            schedule(() => {
              if (cancelled) {
                return;
              }

              setDisplayedCount((count) => count + 1);
              setTypingIndex(null);
              setTypingCommand(null);
              runLine(index + 1);
            }, line.hold);
          }
        }, line.typeSpeed ?? 20);

        intervalIds.push(intervalId);
        return;
      }

      schedule(() => {
        if (cancelled) {
          return;
        }

        setDisplayedCount((count) => count + 1);
        runLine(index + 1);
      }, line.hold);
    };

    runLine(0);

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
      intervalIds.forEach((id) => window.clearInterval(id));
    };
  }, [reducedMotion, replayKey]);

  const visibleLines = useMemo(() => simulationLines.slice(0, displayedCount), [displayedCount]);
  const activePrompt = typingIndex !== null ? simulationLines[typingIndex] : null;

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-800/60 px-5 py-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">install</p>
          <p className="mt-1 text-xs text-zinc-500">Output for `npm install -g @3a2dev/ansi-tui`</p>
        </div>
        <button
          type="button"
          onClick={() => setReplayKey((key) => key + 1)}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
        >
          Replay
        </button>
      </div>

        <div className="space-y-1 overflow-x-auto bg-zinc-950 px-5 py-5 font-mono text-sm leading-relaxed">
          {visibleLines.map((line, index) => (
          <div key={index}>{renderLine(line, packageMeta)}</div>
        ))}
        {activePrompt ? <div>{renderLine(activePrompt, packageMeta, typingCommand ?? '')}</div> : null}
      </div>
    </div>
  );
}
