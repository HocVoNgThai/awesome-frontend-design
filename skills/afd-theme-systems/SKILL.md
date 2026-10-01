---
name: afd-theme-systems
description: Architecture for design tokens, dark mode and multi-theme frontends where themes change colour, chrome and even page structure. Use when adding a theme, dark mode, a theme switcher, design tokens, a per-theme layout, or when mapping tokens to Tailwind/shadcn. Covers token tiers, no-flash theme init, skins vs layouts, contrast gating and the circular theme-switch transition.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.2.0"
---

# Theme systems

A theme is a set of values (tokens). A **machine** is a theme that also changes structure. Decide which one you
are building (`themes` option: 1, 2 or 4) and keep the architecture below, so adding a theme is a new file, never an edit in a component.

## 1. Token tiers

| Tier | Example | Defined in | Read by |
|---|---|---|---|
| Primitive | `--concrete-200`, `--signal`, `--amber` | `tokens.css` | themes only |
| Semantic | `--bg`, `--bg-raised`, `--fg`, `--fg-muted`, `--accent`, `--accent-fill`, `--border`, `--focus`, `--dur-base`, `--ease-out` | `tokens.css` defaults + `themes/*.css` | components |
| Component | `--btn-bg`, `--card-shadow`, `--chrome-bar` | same files | that component |

Rules:
- Components read semantic or component tokens only. No raw hex, no `if theme` in a component.
- Every semantic colour that carries text has a paired foreground token and a recorded contrast result.
- Motion tokens are part of the theme (`--dur-*`, `--ease-*`, `--stagger`), so a theme can feel mechanical or soft.
- Theme selectors: `:root[data-theme='name']`. Default theme = `:root` values.

## 2. File layout

```
styles/
  tokens.css            primitives + semantic defaults
  base.css              reset, typography, focus, motion-off rules
  themes/<name>.css     token overrides only
  skins/<name>.css      chrome shared by all pages (header, heads, icon frames, cursors, effects), unlayered
  layouts/<name>.css    per-theme page structure (list, article, index, about), unlayered
```

Use cascade layers for tokens/base/components. Skins and layouts are **unlayered** and start with
`:root[data-theme='x']`, because unlayered rules beat layered ones and component-scoped styles (Astro, Svelte, CSS modules) are
unlayered too. Layered theme rules would lose.

## 3. No-flash theme init

An inline script in `<head>`, before first paint, sets `data-theme` (and `data-motion`, language hints) from `localStorage`
or `prefers-color-scheme`. Keep it tiny and static so a hash-based CSP can allow exactly one inline script.

```html
<script>
  (() => {
    try {
      const t = localStorage.getItem('theme');
      const d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = t || d;
    } catch { document.documentElement.dataset.theme = 'light'; }
  })();
</script>
```

Also: set `color-scheme` per theme (`color-scheme: dark` in dark), set `<meta name="theme-color">` per theme, and preload only the
active theme's font files from that same script.

## 4. Themes that change structure

When `themes: 4` (or any theme that changes the home composition):
- Render every variant of the composition in markup, show the active one with CSS (`display: none` on the rest).
  That keeps the no-JS and no-flash behaviour and removes hidden variants from the accessibility tree.
- Each variant has its own `h1`; a test asserts that exactly one is visible.
- Data is gathered once and passed to all variants. Tiles exist only for content that exists (no empty cells).
- Inner pages keep one markup and get four grids from `layouts/*.css`.
- Keep a table (theme x page) in `DESIGN.md` so the structure is documented, not tribal.

## 5. Theme switch UX

- The switcher is a real control (`button` group with `aria-pressed`) with a visible label per theme.
- Switching animates with a circular View Transition from the click point (`afd-motion` recipes-js section 5) and is instant when motion is off.
- The tab icon, `theme-color`, cursor and favicon follow the theme.
- A remembered choice wins over system preference; offer "system" as an option when you ship light and dark only.

## 6. Contrast gate (automatic)

Keep a list of text/background pairs per theme and fail the build under 4.5 (text) or 3 (UI, focus ring, borders).
`scripts/check-contrast.mjs` in this skill is a dependency-free starter:

```bash
node skills/afd-theme-systems/scripts/check-contrast.mjs themes.json
```

Add every new colour pair to the list in the same commit as the colour. Check hover, disabled and selected states too.

## 7. Dark mode is designed, not inverted

- Raise surfaces by lightening, not by shadow only. Reduce chroma on large fills. Pure white text on pure black vibrates; use a near-white.
- Borders carry more weight in dark. Check that elevation order is still readable.
- Images and illustrations get a dark variant or a subtle treatment; test shadows that disappear on dark.

## 8. Mapping to Tailwind v4 and shadcn/ui

See the shadcn-theming reference of the afd-app-frontend skill: semantic tokens map to shadcn's CSS variables
(`--background`, `--foreground`, `--primary`, ...) through `@theme inline`, and extra themes are `[data-theme]` blocks.

## 9. Checklist
- [ ] One file per theme under `themes/`; no theme logic in components
- [ ] Theme-init inline, tiny, before paint; no flash on reload
- [ ] Contrast gate lists every pair and passes in every theme, including any text that sits on an accent fill
- [ ] Text never sits on a decorative highlight whose colour is the same in every theme (a lime marker behind light text fails in dark); use an underline stroke or the paired `on-accent` token
- [ ] Structure differences documented in a table
- [ ] Switcher accessible, remembered, animated only when motion is on
- [ ] Fonts for every theme ship the subsets the content needs
