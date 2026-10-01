import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Standalone: defaults below. Hosted demo (see ../build-hosted.mjs) sets SITE_URL, BASE_PATH and PUBLIC_DEMO_HOSTED=1.
const site = process.env.SITE_URL ?? 'https://example.com'; // TODO: replace with the real domain
const base = process.env.BASE_PATH ?? '/';
const hosted = process.env.PUBLIC_DEMO_HOSTED === '1';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: hosted ? [] : [sitemap()],
  build: { inlineStylesheets: 'never' },
  // Emit every script as a file so a strict script-src needs no hashes.
  vite: { build: { assetsInlineLimit: 0 } },
});
