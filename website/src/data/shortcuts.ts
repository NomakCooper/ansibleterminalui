export interface ShortcutGroup {
  label: string;
  keys: Array<{ key: string; action: string }>;
}

export const shortcutGroups: ShortcutGroup[] = [
  {
    label: 'Global',
    keys: [
      { key: 'q', action: 'Quit' },
      { key: 's', action: 'Sessions screen' },
      { key: 't', action: 'Cycle theme' },
      { key: '↑ / ↓', action: 'Navigate sidebar' },
      { key: '→', action: 'Expand tool actions' },
      { key: 'Esc', action: 'Back or collapse' },
      { key: 'Enter', action: 'Select or confirm' },
    ],
  },
  {
    label: 'Form',
    keys: [
      { key: '↑ / ↓', action: 'Next or previous field' },
      { key: 'Ctrl+F', action: 'Open file or directory picker' },
      { key: 'Tab', action: 'Next field' },
      { key: 'Esc', action: 'Cancel and return to action list' },
    ],
  },
  {
    label: 'Execution',
    keys: [
      { key: '↑ / ↓', action: 'Scroll output' },
      { key: 'Space', action: 'Pause or resume auto-scroll' },
      { key: 'Esc', action: 'Return to form' },
    ],
  },
];
