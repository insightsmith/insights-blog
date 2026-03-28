import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blog.insightsforge.com.au',
  base: '/',
  output: 'static',
  adapter: netlify(),
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
