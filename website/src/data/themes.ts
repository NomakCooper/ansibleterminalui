export interface Theme {
  name: string;
  character: string;
  bg: string;
  accent: string;
  secondary: string;
  preview: string[];
}

export const themes: Theme[] = [
  {
    name: 'Cyan',
    character: 'Electric teal, professional dark',
    bg: '#0a0a0a',
    accent: '#00d4d4',
    secondary: '#005f5f',
    preview: ['#0a0a0a', '#00d4d4', '#005f5f', '#1a1a1a'],
  },
  {
    name: 'Blue',
    character: 'Deep blue, corporate precision',
    bg: '#0d1117',
    accent: '#3b82f6',
    secondary: '#1d4ed8',
    preview: ['#0d1117', '#3b82f6', '#1d4ed8', '#1e293b'],
  },
  {
    name: 'White',
    character: 'Monochrome light, clean terminal',
    bg: '#f8f8f8',
    accent: '#111111',
    secondary: '#555555',
    preview: ['#f8f8f8', '#111111', '#555555', '#e8e8e8'],
  },
  {
    name: 'Gray',
    character: 'Monochrome dark, minimal brutalist',
    bg: '#111111',
    accent: '#888888',
    secondary: '#444444',
    preview: ['#111111', '#888888', '#444444', '#222222'],
  },
  {
    name: 'Yellow',
    character: 'Amber and gold, vintage CRT warmth',
    bg: '#0a0800',
    accent: '#f59e0b',
    secondary: '#92400e',
    preview: ['#0a0800', '#f59e0b', '#92400e', '#1c1200'],
  },
  {
    name: 'Violet',
    character: 'Deep purple, refined dark',
    bg: '#0d0a1a',
    accent: '#7c3aed',
    secondary: '#4c1d95',
    preview: ['#0d0a1a', '#7c3aed', '#4c1d95', '#1e1030'],
  },
  {
    name: 'Red',
    character: 'Warm command-center with amber highlights',
    bg: '#0f0800',
    accent: '#ef4444',
    secondary: '#f59e0b',
    preview: ['#0f0800', '#ef4444', '#f59e0b', '#1f1000'],
  },
  {
    name: 'Neon',
    character: 'Cyberpunk green-on-black',
    bg: '#000000',
    accent: '#39ff14',
    secondary: '#00aa00',
    preview: ['#000000', '#39ff14', '#00aa00', '#0a1a00'],
  },
];
