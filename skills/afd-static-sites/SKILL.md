---
name: afd-static-sites
description: Frontend rules for static sites - landing pages, portfolios, blogs, docs and marketing pages - using Astro (default) or plain HTML/CSS. Use when the request is for a static page or site with no or little backend. Covers page recipes, structure per page type, performance, SEO, i18n, fonts, CSP-friendly output and how motion level changes the build.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.1.0"
---

# Static sites

Mode `static`: content is known at build time. Ship HTML first, add JavaScript only as islands that earn their bytes.
Always also load `afd-design-direction`; load `afd-motion` and `afd-theme-systems` as needed.

## 1. Stack choice

| Situation | Use |
|---|---|
| One page, no build wanted | plain `index.html` + one CSS file + optional `<script type="module">` |
| Multi-page, content collections, i18n, MDX, themes | **Astro** (static output) with plain modern CSS |
| Existing Next.js/Vite project | do not switch; follow `afd-app-frontend` |
| Needs a CMS for the owner | Astro + a git-based CMS (Sveltia, Decap, Tina) writing Markdown/JSON into the repo |

Default CSS: plain modern CSS with cascade layers and tokens (see `afd-theme-systems`). Tailwind is fine when the repo
already uses it; do not add it to a plain-CSS repo.

## 2. Page recipes

Open `references/page-recipes.md` for the section sequences. Summary:

- **Landing (product/campaign)**: hero with a real visual -> proof (real, or omitted) -> how it works (one layout family) -> one deep feature -> pricing/CTA. Max one primary CTA, repeated, same label.
- **Portfolio**: identity first screen -> selected work (case-study cards that morph into the case page) -> writing/notes -> about -> contact. Recruiters get the answer to "who, what level, proof, contact" in under a minute.
- **Blog/notes**: list with tag filter + search; article page calm (60-70ch, contents, code blocks, reading time); RSS; related items.
- **Docs**: sidebar + contents, search, copy buttons, versioned URLs, no motion beyond state.

## 3. Motion level in static mode

| Level | What to build |
|---|---|
| calm | state transitions only, optional page fade; ship no motion JS |
| balanced | CSS scroll reveal, View Transitions between pages, one signature microinteraction |
| expressive | balanced + kinetic headline, pointer effects (`pointer: fine`), canvas/pattern layer, per-theme effect set, draggable elements on one page |

Home and index pages carry the effects; article and docs pages stay one level calmer than the home.

## 4. Astro defaults (details in `references/astro-setup.md`)

- `output: 'static'`; `trailingSlash` set deliberately; `site` set (needed for sitemap, canonical, OG).
- Content collections with a Zod schema; build-time computed counts and lists, never typed numbers.
- Images through `astro:assets` (`<Image>`/`<Picture>`) with width/height; AVIF/WebP.
- Fonts self-hosted (Astro Fonts API or `@fontsource`), `font-display: swap`, metric-matched fallback, preload only the active theme's files.
- Islands: `client:visible` or `client:idle`; zero islands is a valid answer.
- Scoped component styles are unlayered; keep theme skins/layouts selectors specific (`:root[data-theme='x']`).
- Lint and typecheck gate before every commit (`astro check`).

## 5. Performance budget

LCP < 2.0 s on mobile 4G, CLS < 0.05, INP < 200 ms, Lighthouse mobile Perf >= 95, A11y 100, BP 100, SEO 100.
Total JS per page: calm 0-5 KB, balanced <= 10 KB gz, expressive <= 30 KB gz in lazy chunks. No render-blocking third-party.

## 6. SEO, sharing, i18n

- One `h1`, descriptive `title` (<= 60 chars) and `meta description` per page; canonical; `hreflang` for every locale; sitemap; `robots.txt`.
- Open Graph image per page, generated at build from the page title and theme (one consistent style).
- JSON-LD: `Person`/`Organization`, `Article`, `BreadcrumbList` where true.
- i18n: URL prefix per locale (`/en/`, `/vi/`), language switch keeps the path, untranslated pages show the source language with a visible notice,
  `lang` attribute set on `<html>` and on mixed-language spans, technical terms may stay in English.
- Dates ISO in lists (`2026-09-28`), localised in articles.

## 7. Security-minded output (optional, recommended for a security-conscious owner)

- Strict CSP: `default-src 'none'`-style allowlist, one hashed inline script (theme-init), no inline `style=""`, Trusted Types.
- No third-party scripts, fonts or analytics by default. Self-host. If analytics is needed, use a cookieless, self-hosted or first-party one and say so on the page.
- External links `rel="noopener noreferrer"`. Sanitise Markdown output; never `innerHTML` a string.
- A post-build gate rejects inline styles, inline handlers and unknown origins.

## 8. Checklist
- [ ] Options stated (mode, motion, theme count, stack)
- [ ] Hero fits the first viewport with a real visual
- [ ] Content from collections/data; counts computed
- [ ] Page works with JavaScript disabled (readable, navigable)
- [ ] Budgets met; images sized; fonts do not shift layout
- [ ] SEO/OG/hreflang present; 404 suggests a real page
- [ ] `afd-ui-review` run

## References
- `references/page-recipes.md` - section sequences and layout families per page type
- `references/astro-setup.md` - project skeleton, config, collections, fonts, CSP, deploy
