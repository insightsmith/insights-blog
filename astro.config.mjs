import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://blog.insightsforge.com.au',
  base: '/',
  output: 'static',
  adapter: netlify(),
  integrations: [mdx(), tailwind(), react()],
});
