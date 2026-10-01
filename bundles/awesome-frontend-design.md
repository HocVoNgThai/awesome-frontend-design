# Awesome Frontend Design (single-file bundle)

Paste this as custom instructions, project knowledge or a system prompt. Follow the options and routing in the first skill.



<!-- skill: awesome-frontend-design -->

# Awesome Frontend Design (entry point)

An opinionated frontend skill pack. Distinctive over generic, motivated motion over decoration,
real content over filler. Read this file first, choose the options below, then load only the
specialist skills the task needs.

## 1. Resolve the options (do this before writing code)

| Option | Values | Default |
|---|---|---|
| `mode` | `static` (landing, portfolio, blog, docs, marketing) or `app` (has a backend, auth, data, dashboards) | infer |
| `motion` | `calm` (MOTION 1-3), `balanced` (4-6), `expressive` (7-10) | `balanced` for static, `calm` for app |
| `stack` | `auto`, `astro`, `html`, `next` (Next.js + TS + Tailwind + shadcn/ui), `vite-node` (Vite + React + Node API) | `auto` |
| `backend` | `none`, `simple` (forms, CRUD), `medium` (auth, roles, dashboards), `complex` (multi-tenant, realtime, heavy data) | `none` for static |
| `style` | `signature` (the industrial multi-theme style in `afd-design-direction`) or `custom` (derive from the brief) | `custom` |
| `themes` | `1`, `2` (light/dark) or `4` (signature four-machine set) | `2` |

Resolution order:
1. Options the user stated, in any wording ("static page", "few effects", "Next.js app with auth").
2. Evidence in the repo: `astro.config.*` -> astro, `next.config.*` -> next, `vite.config.*` -> vite-node,
   `components.json` -> shadcn already set up, `tailwind` in `package.json`. Never switch the stack of an existing project.
3. If something that changes the architecture is still unknown, ask **once**, in one message, at most
   3 short questions, each with a recommended default. Otherwise pick the default and state it in one line.

## 2. Presets (named bundles of the options)

| Preset | mode | motion | stack | Typical use |
|---|---|---|---|---|
| `static-calm` | static | calm | astro or html | docs, company page, legal, quiet portfolio |
| `static-balanced` | static | balanced | astro | landing page, product page, blog |
| `static-expressive` | static | expressive | astro | personal portfolio, campaign, showcase |
| `app-simple` | app | calm | next | internal tool, admin, SaaS MVP |
| `app-rich` | app | balanced | next | consumer SaaS, marketing + app in one |
| `app-dashboard` | app | calm | next or vite-node | dense data UI, complex backend |
| `app-showcase` | app | expressive | next | product with a hero experience, app-like portfolio |

A preset is a starting point. Any single option can be overridden.

## 3. Route to the specialist skills

Always load `afd-design-direction` (the design read, dials and anti-template rules). Then:

| Task | Load |
|---|---|
| mode = static | `afd-static-sites` |
| mode = app | `afd-app-frontend` |
| any animation, transition, hover, reveal, page transition | `afd-motion` |
| more than one theme, dark mode, theme switch, design tokens | `afd-theme-systems` |
| finished a page or component, "check the UI", before shipping | `afd-ui-review` |

Skills hold the rules; their `references/` files hold the long material. Open a reference file only
when the task touches it.

## 4. Workflow

1. **Read**: write the one-line design read and the three dials (`afd-design-direction` section 1-2).
2. **Plan**: list pages/screens, the layout family of each section, the tokens, the motion budget.
   Keep it to one short message. Do not ask for approval unless the user asked for a plan first.
3. **Build** mobile-first with semantic tokens, real content, real states (empty, loading, error).
4. **Motion** last, one signature effect first, then the rest of the budget.
5. **Review** with `afd-ui-review`: run the repo gates, render at 360 and 1440 px, fix, report what was not checked.

## 5. Non-negotiables (apply to every preset)

- Never invent facts about the user or their business: experience, clients, numbers, quotes, logos. Use an
  explicit `TODO:` in content files instead.
- Contrast: text >= 4.5:1, UI and focus >= 3:1, in every theme.
- Every animation has a one-sentence reason, a way to turn it off, and no layout shift.
- Visible focus ring on every interactive element; targets >= 44 px on touch; keyboard parity for pointer effects.
- No horizontal scroll at 320 px. No content hidden until JavaScript runs.
- Semantic tokens in components (`--bg`, `--fg`, `--accent`), never raw hex or per-theme `if`.
- Do not add a dependency, a third-party origin or a font family without saying why and what it costs.
- Respect the project's existing conventions and language. Match the surrounding code style.

## 6. How to answer the user

State the resolved options in one line ("static-expressive: Astro, 4 themes, signature style"), then build.
After building, list what you verified and what you could not verify (for example real iOS Safari).


<!-- skill: afd-app-frontend -->

# App frontend (mode `app`)

Always also load `afd-design-direction`. Load `afd-motion` for any animation and `afd-theme-systems` for tokens or dark mode.
An app is judged by its states and its speed, not by its hero. Design the unhappy paths first.

## 1. Stack choice

| Situation | Use |
|---|---|
| New app, SEO or marketing + app in one repo | **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui** |
| App behind a login, existing Node API (Express, Fastify, Hono, NestJS), no SEO need | **Vite + React + TypeScript + Tailwind + shadcn/ui** with a typed API client |
| Existing project | Keep its stack, router and component library. Add, do not migrate. |
| Static pages only | switch to `afd-static-sites` |

Details: `references/stack-nextjs-shadcn.md`, `references/stack-vite-node.md`.

## 2. Backend complexity changes the UI

Read `references/backend-complexity.md` for the full table. Summary:

| `backend` | UI consequences |
|---|---|
| `simple` | forms with server validation errors mapped to fields, optimistic toggles, toasts, empty states |
| `medium` | auth flows (sign in/up, reset, session expiry), roles hide or disable features, data tables with sort/filter/pagination in the URL, settings pages |
| `complex` | multi-tenant switcher, permission-aware navigation, bulk actions with undo, background jobs with progress, realtime updates with connection state, audit/activity views, rate-limit and degraded-mode messaging |

## 3. Motion in apps

| Level | Where | What |
|---|---|---|
| calm (default for data screens) | everywhere | 150-200 ms state transitions (hover, focus, expand, toast, dialog), skeletons instead of spinners for known layout, no entrance animation on tables |
| balanced | onboarding, empty states, marketing routes | page-level fade/slide through View Transitions or Motion `AnimatePresence`, list reorder animation, one signature microinteraction |
| expressive | landing/showcase routes only | scroll storytelling, kinetic type, pointer effects. Never on data-heavy screens. |

Motion on a dashboard must carry information (a changed value pulses once; a row that was just added is highlighted). Never decorative.

## 4. Component rules (shadcn/ui and Tailwind)

- Own the components: shadcn copies source into `components/ui`. Edit them to match the design; do not wrap them in ten layers.
- Tokens: map your semantic tokens to shadcn CSS variables (`references/shadcn-theming.md`). No hard-coded colours in `className`.
- Use `cn()` (clsx + tailwind-merge) for conditional classes; use `cva` for variants.
- Avoid arbitrary values (`w-[413px]`); extend the theme scale instead. Name transitions (`transition-[translate,opacity]`), not `transition-all`.
- Icons: one set (lucide default or the project's). Icon-only buttons carry `aria-label`.
- Radix primitives under shadcn handle focus trap, roving focus, ARIA. Do not rebuild dialog, menu, select, tabs by hand.

## 5. Every screen has these states

`loading` (skeleton shaped like the content), `empty` (says why and offers the next action), `error` (what happened, retry, keeps user input),
`partial` (some data failed), `forbidden` (tells what permission is missing), `offline/stale` (when it matters), `long content` (truncate with title, wrap, never break layout), `success` (confirmation proportionate to the action).

## 6. Forms and data

Details: `references/states-forms-data.md`. Key rules:
- Validate on the server, mirror with a schema on the client (Zod). Show errors next to the field, focus the first invalid one, keep the entered values.
- Label every control, helper text under it, required marked with text not colour only. Submit button shows pending state and disables double submit.
- Destructive actions: confirm with the consequence in the dialog text, or offer undo (preferred).
- Server state with TanStack Query or framework primitives (Server Components, Server Actions, route handlers); do not mirror server state in global stores.
- URL is state for filters, sort, page, tab, selected item.

## 7. Density and layout

Dashboards: DENSITY 6-8, VARIANCE 2-4. 13-14 px table text is acceptable if line-height and hit areas hold. Sticky header + sidebar that collapses to icons, responsive down to 360 px
(tables become cards or scroll within their own container, never page-wide). Keyboard shortcuts and a command palette for power users (complex backend).

## 8. Performance and quality gates

- Next.js: Server Components by default, `"use client"` only at interactive leaves; `next/image`, `next/font`; dynamic import heavy widgets (charts, editors).
- Core Web Vitals on the marketing routes as in `afd-static-sites`; on app routes, INP < 200 ms and no layout shift when data arrives.
- Gates before done: `typecheck`, `lint`, unit tests, a Playwright smoke of the main flow, `afd-ui-review`.

## 9. Security UX

Session expiry is communicated and does not lose work. Never render user HTML unsanitised. Never put secrets in client bundles (`NEXT_PUBLIC_*` is public).
CSRF-safe mutations, cookie flags (`HttpOnly`, `Secure`, `SameSite`), no tokens in `localStorage` when avoidable. Show who is signed in and which tenant is active.

## References
- `references/stack-nextjs-shadcn.md`
- `references/stack-vite-node.md`
- `references/backend-complexity.md`
- `references/states-forms-data.md`
- `references/shadcn-theming.md`


<!-- skill: afd-design-direction -->

# Design direction

Audience decides, not taste. A recruiter scans the first screen for ten seconds; a reader of long
text needs calm. The home can be expressive, the reading page must be quiet.

## 1. Design read (write it down before touching CSS)

One line in the plan or PR:

> Reading this as: **<what it is>** for **<audience>**, with a **<vibe>** language, leaning toward **<reference family>**.

Then answer in one line each: what is the one thing a visitor must do or remember? Which single
surface carries the personality (hero, nav, cards, motion)? Everything else stays quiet.

## 2. Dials

| Dial | 1 | 10 |
|---|---|---|
| VARIANCE | symmetric, grid, predictable | asymmetric, overlapping, collage |
| MOTION | static, instant | cinematic, kinetic |
| DENSITY | airy, one idea per screen | packed, dashboard-like |

Defaults by surface (override explicitly when the user states otherwise):

| Surface | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Home, portfolio index, landing hero | 7 | 6 | 4 |
| Article, docs, case-study body | 4 | 3 | 3 |
| Lists, search, tables | 5 | 4 | 5 |
| App dashboard, admin | 3 | 2 | 7 |
| Forms, settings, onboarding | 2 | 2 | 4 |

`motion` option maps to the MOTION dial: calm = 1-3, balanced = 4-6, expressive = 7-10.

## 3. Colour

- One accent per theme, used the same way in every section. If the accent fill fails contrast as text,
  add a second token (`--accent-text`) rather than darkening the fill.
- One grey family per theme; do not mix warm and cool greys. No pure `#000` or `#fff` page background
  unless the theme is deliberately stark.
- Dark theme is designed, not inverted: hierarchy that pops in light must pop in dark.
- Banned as a default: purple-blue glow gradients, neon outer glows, gradient headline text, rainbow
  borders, "warm beige + brass + espresso" by reflex. A banned item is allowed only with a stated reason.
- Status colours (success, warning, danger) are separate from the brand accent and always paired with an icon or label.

## 4. Typography

- Display face with character and with the subset the content needs (check Vietnamese, Cyrillic, CJK
  coverage before choosing). Two families maximum: display + body (+ mono for data).
- Emphasis inside a headline is italic or weight of the same family, never a random third font.
- Headline at most 2 lines on desktop; body 60-70ch and 16-18 px; `text-wrap: balance` on headings,
  `pretty` on paragraphs.
- Numbers in lists, tables and dates: `font-variant-numeric: tabular-nums`, one line, never wrapping.
- Stacked diacritics: display `line-height >= 1.0`, never clip them with `overflow: hidden` masks
  (use `overflow: clip` plus `overflow-clip-margin`).
- CJK: system fonts first, no letter-spacing, no uppercase transforms.

## 5. Layout

- Hero fits the first viewport: label, headline, one sentence, CTAs (max 4 text elements). It needs a real
  visual (product, portrait, figure, live data, generative pattern tied to content), not an empty half.
- No layout family twice on one page. No three equal feature cards. Bento cells equal the number of items.
- Cards only when elevation means hierarchy; otherwise use rules and spacing.
- One radius system per theme. One spacing scale (4 or 8 px base). One max content width per page type.
- Every multi-column block declares how it collapses below 768 px.
- No section-number eyebrows (`01 /`), no scroll cues, no decorative status dots, no fake version stamps.

## 6. Copy and content

- Real content first. If the user has none, write plausible structure and mark every invented line
  `TODO:`. Never invent testimonials, client logos, metrics or credentials.
- Numbers shown on a page are computed from data at build or request time, never typed by hand.
- Voice: specific and calm. Ban filler verbs (elevate, seamless, unleash, revolutionize) and empty superlatives.
- One label per intent across the whole product ("Contact" everywhere, not three variants).
- Optional house rule (ask or detect): no em dash or en dash in visible text; use "-" or " · ".

## 7. Icons, imagery, depth

- One icon set, one stroke weight. Icons never replace text for primary actions.
- Real photography or product shots beat stock illustration; generative patterns must derive from content.
- Depth through one shadow system per theme (hard offset, soft, or none). Do not mix.

## 8. AI-tell scan

Before finishing, scan `references/ai-tells.md`. If three or more tells appear, the page reads as
templated: change the layout family, not the colours.

## 9. Pre-flight (tick before calling UI work done)

- [ ] Design read and dials written down
- [ ] One accent per theme; contrast verified in every theme
- [ ] Hero fits viewport with a real visual
- [ ] No tell from sections 3-6 and `references/ai-tells.md`
- [ ] Checked at 360 px and 1440 px, each language if multilingual
- [ ] Every animation justified, has an off state, causes no layout shift (`afd-motion`)
- [ ] States designed: empty, loading, error, long text, no JavaScript where relevant
- [ ] No unexplained new dependency, font family or third-party origin

## 10. Signature style (option `style: signature`)

An industrial multi-theme system: one DNA (hard-edged panels with a mono title bar, real data only,
stepped mechanical motion), four themes that change **page structure**, not only paint
(Concrete, Studio, Night OS, Archive). Read `references/signature-industrial.md` for tokens, shapes,
per-theme layouts and motion picks, and `afd-theme-systems` for the architecture that makes it work.
Use it when the user asks for "my style", "signature", "industrial" or a multi-theme portfolio. Otherwise
derive a custom language from the design read.

## References
- `references/ai-tells.md` - the banned and suspicious patterns list
- `references/signature-industrial.md` - the signature style in full


<!-- skill: afd-motion -->

# Motion

Motion must be **motivated**: hierarchy, sequence, feedback or state change. If you cannot say why in
one sentence, remove it. CSS first, JavaScript second, a library last.

## 1. Pick the level

| Level | Dial | Allowed | Budget |
|---|---|---|---|
| `calm` | 1-3 | state transitions (hover, focus, open/close), 150-250 ms, optional fade between pages | 0 KB JS for motion |
| `balanced` | 4-6 | calm + scroll reveal (CSS), cross-document View Transitions, one signature microinteraction, small stagger | <= 2 KB JS |
| `expressive` | 7-10 | balanced + kinetic type, pointer-follow effects, canvas/pattern layers, draggable elements, per-theme effect set | <= 15 KB JS per page, lazy chunks |

Use one level for the whole product. In `app` mode default to `calm` on data screens and allow `balanced` on
marketing/onboarding screens only.

## 2. Hard rules (all levels)

1. Animate only `transform` (`translate`, `scale`, `rotate`), `opacity`, `clip-path`. Never `width`, `height`,
   `top`, `left`, `margin`.
2. Never ease a blurred `box-shadow` or a `filter` on hover: it repaints the page every frame. Switch the shadow at once
   and animate `scale` or `translate`.
3. No `window.addEventListener('scroll')` for effects. Use `animation-timeline: view()`, IntersectionObserver or View Transitions.
4. Durations and easings come from tokens (`--dur-fast`, `--dur-base`, `--dur-page`, `--ease-out`, `--ease-in-out`, `--stagger`), not literals.
5. Layout shift budget: CLS stays near 0. Reserve space for anything a script reveals (`visibility`, not `display`).
6. Never hide content until JavaScript runs. LCP must not wait for a script. The no-JS state is the readable state.
7. Pointer effects only under `(pointer: fine)`; every pointer effect has a keyboard or tap equivalent.
8. Provide an off switch. Respect `prefers-reduced-motion` by default (see 3). When the product has its own
   switch, store it and set `html[data-motion="off"]`; in that state every animation finishes at once and each
   effect's end state is the readable layout.
9. A new motion library (GSAP, Motion, Lenis, Three.js) is a proposal first: state the KB cost, the lazy-loading plan and the alternative in CSS.

## 3. Reduced motion policy (choose one, state it)

- **Policy A (default)**: honour `prefers-reduced-motion: reduce`. Put effects in `@media (prefers-reduced-motion: no-preference)`.
- **Policy C (opt-in, owner-driven)**: effects run for everyone, and the product ships its own visible "turn off effects"
  switch. Effects live in `@media screen`; scripts check a shared `motionOff()` helper. Choose C only when the owner asked,
  because it overrides an OS accessibility setting. Essential feedback (focus, drag, state change) must stay usable under both.

## 4. Comfort rules (these came from real complaints: "jerky", "flashing")

- Nothing fires on its own timer while the reader reads. Trigger on load once, on hover, or on scroll into view.
- `infinite` only for something genuinely live: a typing caret, a ticker. A caret next to finished text blinks a few times and leaves.
- No brightness flashes, no full-screen noise, no strobing.
- A hover that dims siblings brightens them back after a short delay (about 180 ms) so crossing a gap does not flash.
- Effects that swap glyphs pin each glyph's width first (`getComputedStyle(el).width`), so nothing shifts.
- Entrances are eased, never stepped. Stepped motion is reserved for effects the visitor triggers.
- Page changes: one soft curve in every theme, capped around 280 ms.
- Stepped animations that must end visible use `steps(n, jump-none)` with **n >= 2**. `jump-end` can freeze on the second to last step;
  `steps(1, jump-none)` is invalid and silently drops the whole `animation` declaration (use plain `steps(1)` for a blink).

## 5. Cross-document View Transitions: ship the opt-in early

`@view-transition { navigation: auto; }` must be in the **first stylesheet** the page links, placed before inline scripts in `<head>`.
If the browser runs its first style update before it sees the opt-in, it skips the transition and cuts to the new page: a full-screen flash on
about half of navigations (measured, fixed by moving the rule to the first linked stylesheet). Name shared elements only on the navigating
pair (set in `pageswap`, clear after); duplicate names abort the transition.

## 6. Layering (z-index) contract

Write the stack down once and keep it: content < sticky effects < overlays < dock < menus and popovers < sticky header.
A grid or flex item keeps its `z-index` even with `position: static`. Popovers that open above a sticky header need to be in the same stacking context or portalled.

## 7. Recipes

Open the reference that matches the task:
- `references/recipes-css.md` - scroll reveal, stagger, line-mask headline, marquee, stepped boot, hover tilt, spotlight border, page transitions.
- `references/recipes-js.md` - pointer spotlight/magnetic, inertia follow, typed text, draggable windows, theme-switch circular reveal. CSP-safe CSSOM patterns.
- `references/libraries.md` - when Motion (React), GSAP, Lenis, Three.js are justified, how to load them lazily, and the CSS alternative.

## 8. Verify

- Turn effects off: everything readable, nothing hidden, no running loops.
- Performance panel: no long task over 50 ms from motion code; CLS about 0 on every page; no per-frame paint on hover.
- Frame pacing on a throttled CPU (4x slowdown) for the expressive level.
- If the project has a strict CSP, the gates from `afd-ui-review` still pass (no inline `style=""`).


<!-- skill: afd-static-sites -->

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


<!-- skill: afd-theme-systems -->

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
- [ ] Contrast gate lists every pair and passes in every theme
- [ ] Structure differences documented in a table
- [ ] Switcher accessible, remembered, animated only when motion is on
- [ ] Fonts for every theme ship the subsets the content needs


<!-- skill: afd-ui-review -->

# UI review

Report findings as **where -> what the user sees -> fix**, most severe first. Do not report taste as a bug; do report broken rules from
`afd-design-direction`, `afd-motion` and `afd-theme-systems`. Say plainly what you did **not** check.

## 1. Run the project gates

Use what the repo has: `npm run check`, or `lint`, `typecheck`, `test`, `build`. Any failure blocks the review. If the repo has no gates, propose
the smallest set (typecheck, lint, build, contrast script) and run what exists.

## 2. Render matrix (real browser)

`scripts/render-matrix.mjs` drives Playwright over pages x themes x viewports and collects console errors, CSP violations, failed requests,
horizontal overflow, the number of visible `h1`, and full-page screenshots.

```bash
npm i -D playwright-core   # or use the project's Playwright
node skills/afd-ui-review/scripts/render-matrix.mjs --base http://localhost:4321 \
  --pages / /about/ /writing/ --themes light dark --viewports 360x780 1440x900 --out .afd-review
```

Open the screenshots. Look at them; do not assume the numbers are enough. Use reduced motion once per page.

## 3. Checklist by priority

1. **Accessibility (critical)**: text >= 4.5:1, UI and focus >= 3:1; visible focus ring on every interactive element; icon-only buttons have `aria-label`;
   one `h1`; correct `lang`; skip link works; nothing conveyed by colour alone; forms labelled; dialogs trap and return focus.
2. **Touch and interaction (critical)**: targets >= 44x44 px; hover-only affordances have a focus or tap equivalent; feedback within 100 ms.
3. **Performance (high)**: LCP < 2.5 s, CLS < 0.05, INP < 200 ms; images have dimensions; fonts do not shift layout; new JS chunks over 5 KB gz are listed and justified.
4. **Style fit (high)**: one accent per theme, one radius system, themes feel designed (not recoloured), no AI tells (`afd-design-direction` references).
5. **Layout and responsive (high)**: no horizontal scroll at 320 px; hero fits the first viewport; dates and numbers on one line; long words and URLs wrap
   (`overflow-wrap: anywhere` in prose and meta); text boxes do not overlap or clip.
6. **Typography and colour (medium)**: body 16-18 px, 60-70ch; diacritics not clipped; CJK has no letter-spacing or uppercase; tabular numbers in data.
7. **Animation (medium)**: each effect motivated; motion off leaves everything visible; no jank on theme switch or page transition; no timer-driven flashing;
   at most one infinite loop (a live caret or ticker).
8. **States (medium)**: empty, loading, error, long content, forbidden exist for every data screen.
9. **Navigation (high)**: current page marked (`aria-current`), language switch keeps the path, back and forward work with View Transitions, 404 offers real pages.

## 4. Security-specific UI checks

- No new third-party origin in the network log; CSP header unchanged unless justified.
- External links use `rel="noopener noreferrer"`.
- No user-controlled string reaches the DOM through `innerHTML`; Markdown output sanitised.
- No secrets in the client bundle; no tokens in URLs.

## 5. Output format

| Severity | Page / theme / viewport | Finding | Fix |
|---|---|---|---|

Severity: **blocker** (broken, inaccessible, security), **major** (clear rule broken), **minor** (polish). Then screenshots for anything visual.
End with "Not checked:" listing gaps (real iOS Safari, screen reader, slow network).
