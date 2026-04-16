import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ansibleterminalui.vercel.app',
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap()],
});
