export interface FAQItem {
  q: string;
  a: string;
}

export const faq: FAQItem[] = [
  {
    q: 'Do I need Docker or containers to use ansi-tui?',
    a: 'No. ansi-tui is a Node.js terminal app. The only requirements are Node.js 18 or newer and the Ansible CLI tools you already have installed.',
  },
  {
    q: 'Does it work on jump hosts or shared systems?',
    a: 'Yes. It is designed with enterprise constraints in mind: proxy-aware, offline-installable, and no elevated permissions required.',
  },
  {
    q: 'Does it replace the Ansible CLI?',
    a: 'No. ansi-tui wraps the CLI. It builds and runs the exact same commands you would run manually, while guiding form filling, previewing the command, and capturing output.',
  },
  {
    q: 'Can I use it without an active session?',
    a: 'Yes. Sessions pre-fill forms for convenience, but every tool works without one.',
  },
  {
    q: 'Where is data stored?',
    a: 'Locally on your machine in OS-standard paths, including ~/Library/Application Support/ansi-tui/ on macOS and ~/.local/share/ansi-tui/ on Linux. No cloud, no telemetry.',
  },
  {
    q: 'Does it support ansible-vault secrets?',
    a: 'Yes. Vault password files, vault IDs, and vault-protected variables are supported across relevant tools. Password fields are masked.',
  },
  {
    q: 'Can I install it offline or air-gapped?',
    a: 'Yes. Run npm pack @3a2dev/ansi-tui on a connected machine, download install.sh from the repository, copy both files to the target, then run ./install.sh --local ./3a2dev-ansi-tui-0.1.0.tgz.',
  },
];
