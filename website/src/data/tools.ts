export interface Tool {
  name: string;
  icon: string;
  actionCount: number;
  actions: string[];
  highlights: string;
}

export const tools: Tool[] = [
  {
    name: 'ansible-playbook',
    icon: '▶',
    actionCount: 7,
    actions: ['run', 'check', 'diff', 'syntax-check', 'list-hosts', 'list-tasks', 'list-tags'],
    highlights: 'Run playbooks with check and diff mode, tag filtering, and vault support.',
  },
  {
    name: 'ansible-galaxy',
    icon: '◈',
    actionCount: 17,
    actions: [
      'role install',
      'role init',
      'role list',
      'role remove',
      'role info',
      'collection install',
      'collection build',
      'collection publish',
      'collection verify',
      'collection init',
      'collection list',
      'collection info',
      'collection download',
      'collection migrate',
      'import role',
      'search',
      'login',
    ],
    highlights: 'Full role and collection lifecycle: install, build, publish, verify, and search.',
  },
  {
    name: 'ansible-vault',
    icon: '◆',
    actionCount: 7,
    actions: ['create', 'encrypt', 'decrypt', 'view', 'edit', 'rekey', 'encrypt_string'],
    highlights: 'Full vault lifecycle with vault ID and password file support.',
  },
  {
    name: 'ansible-inventory',
    icon: '⊞',
    actionCount: 3,
    actions: ['list (JSON/YAML/TOML)', 'host vars', 'graph tree'],
    highlights: 'List inventory, inspect host vars, and render graph trees in multiple formats.',
  },
  {
    name: 'ansible-doc',
    icon: '≡',
    actionCount: 4,
    actions: ['module/plugin lookup', 'list', 'list_files', 'metadata-dump'],
    highlights: 'Module and plugin documentation lookup with metadata dumping.',
  },
  {
    name: 'ansible-config',
    icon: '⚙',
    actionCount: 5,
    actions: ['list', 'dump', 'view', 'init', 'validate'],
    highlights: 'Inspect, generate, and validate Ansible configuration safely.',
  },
  {
    name: 'ansible-lint',
    icon: '⚑',
    actionCount: 4,
    actions: ['run', 'list-rules', 'list-tags', 'list-profiles'],
    highlights: 'Lint with profiles, fix support, and strict mode options.',
  },
  {
    name: 'ansible-builder',
    icon: '⬡',
    actionCount: 3,
    actions: ['build', 'create', 'introspect'],
    highlights: 'Build execution environments and inspect build inputs.',
  },
  {
    name: 'ansible-creator',
    icon: '⊕',
    actionCount: 5,
    actions: ['init collection', 'init playbook', 'init execution_env', 'add resource', 'add plugin'],
    highlights: 'Scaffold collections, playbooks, execution environments, and plugins.',
  },
  {
    name: 'ansible-test',
    icon: '◉',
    actionCount: 8,
    actions: ['units', 'integration', 'sanity', 'coverage', 'env', 'shell', 'network', 'windows'],
    highlights: 'Run the full Ansible test matrix from one guided surface.',
  },
  {
    name: 'ansible-console',
    icon: '⌘',
    actionCount: 1,
    actions: ['interactive console'],
    highlights: 'Interactive ad-hoc REPL console for direct target interaction.',
  },
];

export const totalActions = tools.reduce((sum, tool) => sum + tool.actionCount, 0);
export const displayedActionCount = '60+';
