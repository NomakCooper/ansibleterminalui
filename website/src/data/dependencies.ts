export type DependencyKind = 'runtime' | 'development';

export interface Dependency {
  name: string;
  version: string;
  kind: DependencyKind;
  detail: string;
  why: string;
}

export const runtimeDependencies: Dependency[] = [
  {
    name: 'chalk',
    version: '^5.0.0',
    kind: 'runtime',
    detail: 'Terminal string styling done right.',
    why: 'Used for color and emphasis in terminal output outside the main Ink-rendered views.',
  },
  {
    name: 'env-paths',
    version: '^3.0.0',
    kind: 'runtime',
    detail: 'Get paths for storing things like data, config, cache, etc.',
    why: 'Provides OS-correct locations for persisted sessions, config, cache, and job history files.',
  },
  {
    name: 'execa',
    version: '^8.0.0',
    kind: 'runtime',
    detail: 'Process execution for humans.',
    why: 'Runs ansible-* commands with explicit argv handling, streamed output, and reliable exit-code capture.',
  },
  {
    name: 'ink',
    version: '^5.0.0',
    kind: 'runtime',
    detail: 'React for CLI.',
    why: 'Forms the terminal UI runtime that renders screens, layout, focus flow, and updates in the terminal.',
  },
  {
    name: 'ink-select-input',
    version: '^6.0.0',
    kind: 'runtime',
    detail: 'Select input component for Ink.',
    why: 'Powers keyboard-driven selection lists for tools, actions, and guided choices.',
  },
  {
    name: 'ink-spinner',
    version: '^5.0.0',
    kind: 'runtime',
    detail: 'Spinner component for Ink.',
    why: 'Shows visible progress while long-running playbooks and other commands execute.',
  },
  {
    name: 'ink-table',
    version: '^3.0.0',
    kind: 'runtime',
    detail: 'A table component for Ink.',
    why: 'Renders structured terminal tables for environment summaries, tool health, and other matrix views.',
  },
  {
    name: 'ink-text-input',
    version: '^6.0.0',
    kind: 'runtime',
    detail: 'Text input component for Ink.',
    why: 'Backs text fields across the guided forms for paths, tags, extra vars, and other command inputs.',
  },
  {
    name: 'react',
    version: '^18.0.0',
    kind: 'runtime',
    detail: 'React is a JavaScript library for building user interfaces.',
    why: 'Ink is React-based, so ansi-tui uses React state, components, and hooks for the terminal app itself.',
  },
  {
    name: 'strip-ansi',
    version: '^7.0.0',
    kind: 'runtime',
    detail: 'Strip ANSI escape codes from a string.',
    why: 'Normalizes captured job logs and plain-text views when raw ANSI sequences should not be preserved.',
  },
  {
    name: 'uuid',
    version: '^10.0.0',
    kind: 'runtime',
    detail: 'RFC9562 UUIDs.',
    why: 'Generates stable IDs for sessions, jobs, and other persisted records.',
  },
  {
    name: 'which',
    version: '^4.0.0',
    kind: 'runtime',
    detail: 'Like which(1) unix command. Find the first instance of an executable in the PATH.',
    why: 'Locates installed ansible-* executables and supports runtime environment validation before execution.',
  },
];

export const developmentDependencies: Dependency[] = [
  {
    name: '@types/node',
    version: '^25.5.0',
    kind: 'development',
    detail: 'TypeScript definitions for node.',
    why: 'Types Node.js APIs used for process management, filesystem access, and CLI runtime behavior.',
  },
  {
    name: '@types/react',
    version: '^18.0.0',
    kind: 'development',
    detail: 'TypeScript definitions for react.',
    why: 'Provides static typing for the React components and hooks used through Ink.',
  },
  {
    name: '@types/uuid',
    version: '^10.0.0',
    kind: 'development',
    detail: 'Stub TypeScript definitions entry for uuid, which provides its own types definitions.',
    why: 'Included in the published toolchain metadata to keep TypeScript resolution friction-free around UUID usage.',
  },
  {
    name: '@types/which',
    version: '^3.0.0',
    kind: 'development',
    detail: 'TypeScript definitions for which.',
    why: 'Adds static types for executable lookup and PATH validation helpers.',
  },
  {
    name: '@typescript-eslint/eslint-plugin',
    version: '^7.0.0',
    kind: 'development',
    detail: 'TypeScript plugin for ESLint.',
    why: 'Enforces TypeScript-specific lint rules across the TUI screens, hooks, and support code.',
  },
  {
    name: '@typescript-eslint/parser',
    version: '^7.0.0',
    kind: 'development',
    detail: 'An ESLint custom parser which leverages TypeScript ESTree.',
    why: 'Lets ESLint parse the TypeScript and TSX source used by the Ink application.',
  },
  {
    name: 'eslint',
    version: '^8.0.0',
    kind: 'development',
    detail: 'An AST-based pattern checker for JavaScript.',
    why: 'Runs static analysis before publish and in CI to catch maintainability and correctness issues early.',
  },
  {
    name: 'ink-testing-library',
    version: '^3.0.0',
    kind: 'development',
    detail: 'Utilities for testing Ink apps.',
    why: 'Supports screen and component tests without requiring a real interactive terminal session.',
  },
  {
    name: 'tsup',
    version: '^8.0.0',
    kind: 'development',
    detail: 'Bundle your TypeScript library with no config, powered by esbuild.',
    why: 'Builds the publishable npm package output in dist/ for installation and execution.',
  },
  {
    name: 'typescript',
    version: '^5.0.0',
    kind: 'development',
    detail: 'TypeScript is a language for application scale JavaScript development.',
    why: 'Provides the type system and compile-time checks used across the ansi-tui codebase.',
  },
  {
    name: 'vitest',
    version: '^4.1.4',
    kind: 'development',
    detail: 'Next generation testing framework powered by Vite.',
    why: 'Runs the package test suite covering core logic, tools, components, screens, hooks, and packaging.',
  },
];

export const allDependencies = [...runtimeDependencies, ...developmentDependencies];
