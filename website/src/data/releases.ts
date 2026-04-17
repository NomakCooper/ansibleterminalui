export interface ReleaseEntry {
  version: string;
  date: string;
  label?: string;
  url?: string;
  sections: Record<string, string[]>;
}

export const fallbackReleases: ReleaseEntry[] = [
  {
    version: '0.1.0',
    date: '2026-04-15',
    label: 'Initial Release',
    sections: {
      Added: [
        'Full-terminal workstation shell with themed header, grouped sidebar, framed dashboard, and compact footer.',
        '8 color themes: Cyan, Blue, White, Gray, Yellow, Violet, Red, and Neon.',
        'Workspace sessions with full context persistence.',
        '4-phase guided workflows for 11 tool screens.',
        'Live streaming execution output with scroll, pause, and elapsed time.',
        'Ctrl+F file and directory browser on all path fields.',
        'Jobs screen with execution history, detail views, and deletion.',
        'Proxy-aware execution with session-level override.',
        'Automatic Ansible toolchain detection and health matrix.',
        'Offline installation via npm pack and install script.',
        '297-test suite with CI across Node 20, 22, and 24.',
      ],
      Fixed: [
        'Global shortcuts no longer fire during form input.',
        'Left and right cursor movement works correctly in text fields.',
        'Long-form overflow is clipped safely to terminal height.',
        'ANSI-heavy lint output is safe in constrained layouts.',
        'OSC 8 hyperlinks are stripped before display.',
        'ansible-test correctly runs from collection root.',
      ],
    },
  },
];

export const sectionColors: Record<string, string> = {
  Added: 'border-green-400/30 bg-green-400/5 text-green-400',
  Changed: 'border-cyan-400/30 bg-cyan-400/5 text-cyan-400',
  Fixed: 'border-amber-400/30 bg-amber-400/5 text-amber-400',
  Deprecated: 'border-yellow-400/30 bg-yellow-400/5 text-yellow-400',
  Removed: 'border-red-400/30 bg-red-400/5 text-red-400',
  Security: 'border-violet-400/30 bg-violet-400/5 text-violet-400',
  Features: 'border-cyan-400/30 bg-cyan-400/5 text-cyan-400',
  Bugfixes: 'border-amber-400/30 bg-amber-400/5 text-amber-400',
  'Improved Documentation': 'border-green-400/30 bg-green-400/5 text-green-400',
  'Deprecations and Removals': 'border-yellow-400/30 bg-yellow-400/5 text-yellow-400',
  Notes: 'border-zinc-700 bg-zinc-800 text-zinc-400',
};
