# Astro setup (static)

Check the current Astro docs for exact APIs; versions move. Node: use the version the Astro release requires (Astro 5/6 need a recent LTS).

## Skeleton

```
src/
  content/              collections (md/mdx/json) + config.ts (Zod schemas)
  pages/[lang]/         index, writing/, work/, about/, 404
  layouts/              Base.astro (head, theme-init, skip link)
  components/
  styles/               tokens.css, base.css, themes/, skins/, layouts/
  scripts/              motion.ts, pointer.ts, theme.ts (small, typed)
  lib/                  data helpers (counts, sorting, i18n)
public/                 fonts, favicons, robots.txt
astro.config.ts
```

## astro.config.ts essentials

```ts
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: { defaultLocale: 'en', locales: ['en', 'vi'], routing: { prefixDefaultLocale: true } },
  build: { inlineStylesheets: 'never' }, // keeps style-src 'self' possible
});
```

Astro inlines tiny `<script>` bundles into the HTML, which a strict `script-src` rejects. Also set `vite: { build: { assetsInlineLimit: 0 } }` so every script is emitted as a file under `/_astro/`, and verify with a post-build scan of the HTML.

`inlineStylesheets: 'never'` matters for a strict `style-src 'self'`. Astro's `define:vars` emits inline style/script, avoid it under strict CSP.

## Content collection

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  writing: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
    schema: z.object({
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      summary: z.string().max(200),
      draft: z.boolean().default(false),
    }),
  }),
};
```

Derive counts, latest lists and tag indexes from `getCollection`, never hard-code them.

## Base layout head order (matters for View Transitions and fonts)

1. `<meta charset>`, viewport, `color-scheme`, `theme-color`.
2. **First stylesheet link** (contains `@view-transition { navigation: auto }` and font-face rules).
3. Theme-init inline script (hashed under CSP).
4. Preloads for the active theme's fonts only.
5. Title, description, canonical, hreflang, OG.

## Fonts

Self-host with the Astro Fonts API or `@fontsource`. Verify needed subsets (for example `vietnamese`):

```bash
curl -A 'Mozilla/5.0 Chrome/130' "https://fonts.googleapis.com/css2?family=NAME" | grep vietnamese
```

`font-display: swap`, a metric-matched fallback (`size-adjust`, `ascent-override`) to avoid layout shift, and re-measure canvases after fonts load.

## Islands

`client:visible` for below-the-fold interactivity, `client:idle` for search/palette, `client:only` rarely. Prefer a 1 KB vanilla module to a framework island.

## Strict CSP example (Cloudflare `_headers` or equivalent)

```
Content-Security-Policy: default-src 'none'; script-src 'self' 'sha256-<theme-init-hash>'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; require-trusted-types-for 'script'
```

Compute the hash from the built HTML in a post-build script, so changing the inline script cannot silently break the policy. Fail the build on inline `style=`, inline `on*=` handlers and unknown origins.

## Deploy

Any static host: Cloudflare Workers static assets/Pages, Netlify, Vercel, GitHub Pages. Redirect `/` by locale at the edge when i18n is on. Verify production with curl and a headless browser after deploy.
