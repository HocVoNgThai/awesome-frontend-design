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


<!-- afd-app-frontend/references/backend-complexity.md -->

# Backend complexity and what the frontend must provide

Pick the row that matches. A higher row includes everything above it.

## simple (forms, CRUD, a few tables, one user type or no login)

- Pages: list, detail, create/edit form, settings.
- Forms: server validation errors mapped to fields; pending state; success toast.
- Lists: server pagination or "load more"; empty state with the create action.
- Mutations: optimistic for toggles and deletes with undo toast.
- Shell: top bar + simple nav; no sidebar needed under 6 destinations.
- Motion: calm. Dialog and toast transitions only.

## medium (auth, roles, dashboards, search, files)

- Auth screens: sign in, sign up, forgot/reset, verify email, session expired, sign out everywhere. Never lose form input on expiry.
- Roles: hide what a role never has; disable-with-reason what it sometimes has. No dead links.
- Data tables: sort, filter, column visibility, pagination, row selection, bulk actions; state in the URL; sticky header; keyboard navigation; density toggle.
- Dashboards: KPI row (real numbers with period and unit), one primary chart, recent activity, saved filters. Charts follow the dataviz rules: label directly, colour-blind safe, no 3D, zero baseline for bars.
- Search: debounced, shows result count, highlights terms, empty result suggests alternatives.
- Files: drag and drop with progress, type and size errors before upload, retry.
- Notifications: in-app list + toast; not both for the same event.
- Shell: collapsible sidebar, breadcrumbs, command palette.

## complex (multi-tenant, permissions matrix, realtime, jobs, heavy data)

- Tenant/workspace switcher always visible; every page shows the active tenant; URL carries the tenant id.
- Permission-aware navigation built from the permission set, not hard-coded per role. Permission denied states explain which permission is missing and who can grant it.
- Bulk actions with preview ("42 items will change"), progress, partial failure report, undo window.
- Background jobs: queued/running/failed/done states, progress, cancel, retry, link to logs; survive page reloads.
- Realtime: connection state indicator, optimistic merge, conflict resolution UI ("changed by Ana 2 min ago"), no UI jumps while the user is editing (buffer incoming changes).
- Audit/activity: filterable timeline with actor, action, target, time, and a diff view.
- Large data: virtualised lists/tables, server-side everything, skeletons by row, cursor pagination, export as a job.
- Degraded mode: rate limits, partial outage, read-only mode, stale data banners with timestamps.
- Power use: keyboard shortcuts with a help overlay, saved views, bulk edit grids, URL-shareable state.
- Settings: org, members, roles, API keys (show once, copy, rotate), webhooks with delivery log, billing.
- Observability in UI: error boundary per widget so one failing panel never blanks the page; client error reporting with a user-visible reference id.

## Cross-cutting at every level

Accessible tables (`scope`, captions), live regions for async results, focus management after navigation and dialogs, and timestamps with timezone on hover.


<!-- afd-app-frontend/references/shadcn-theming.md -->

# Mapping semantic tokens to shadcn/ui and Tailwind v4

shadcn components read CSS variables such as `--background`, `--foreground`, `--card`, `--popover`, `--primary`,
`--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`.
Treat those as the adapter layer; keep your own semantic tokens as the source of truth.

## globals.css pattern

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root {
  /* your semantic tokens (source of truth) */
  --bg: #edeef0;  --bg-raised: #fbfbfc;  --fg: #0e1013;  --fg-muted: #4a5058;
  --accent-fill: #ff5a1f;  --accent-text: #1d4bd8;  --line: #c9ccd1;  --focus: #1d4bd8;
  --radius: 0.5rem;

  /* shadcn adapter */
  --background: var(--bg);
  --foreground: var(--fg);
  --card: var(--bg-raised);            --card-foreground: var(--fg);
  --popover: var(--bg-raised);         --popover-foreground: var(--fg);
  --primary: var(--accent-fill);       --primary-foreground: #0e1013;
  --secondary: var(--bg-raised);       --secondary-foreground: var(--fg);
  --muted: var(--bg-raised);           --muted-foreground: var(--fg-muted);
  --accent: var(--bg-raised);          --accent-foreground: var(--fg);
  --destructive: #c0261d;
  --border: var(--line);  --input: var(--line);  --ring: var(--focus);
}

[data-theme="dark"] {
  --bg: #101214; --bg-raised: #181b1f; --fg: #e8eaed; --fg-muted: #a3a9b1;
  --accent-fill: #ffb224; --accent-text: #7cd4f5; --line: #2b3036; --focus: #7cd4f5;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --font-sans: var(--font-body);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
```

## Notes

- Keep the primary foreground paired with the primary fill and test the pair in the contrast gate (`afd-theme-systems`).
- `shadcn`'s `--accent` is a subtle hover surface, not your brand accent. Do not confuse the two: your brand accent maps to `--primary`.
- Add more themes as extra `[data-theme="name"]` blocks that override the semantic tokens only; the adapter lines stay unchanged.
- Radius and shadow are tokens too (`--radius`, `--shadow-card`). A hard-edged theme sets `--radius: 0`.
- Modify `components/ui/*` to use your motion tokens (`duration-[var(--dur-fast)]`) rather than sprinkling literals.


<!-- afd-app-frontend/references/stack-nextjs-shadcn.md -->

# Next.js + TypeScript + Tailwind + shadcn/ui

Verify commands against the current docs (Next.js, Tailwind v4, shadcn/ui); they change.

## Bootstrap

```bash
npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
npx shadcn@latest init
npx shadcn@latest add button input label form dialog dropdown-menu sonner table tabs skeleton
```

## Structure

```
src/
  app/
    (marketing)/page.tsx       static, SEO, can be balanced/expressive
    (app)/layout.tsx           shell: sidebar, header, session guard
    (app)/dashboard/page.tsx   Server Component fetching data
    api/                       route handlers (or call your Node API)
    globals.css                Tailwind import, tokens, theme blocks
  components/ui/               shadcn components (owned)
  components/                  product components
  lib/                         utils (cn), api client, zod schemas, auth helpers
  hooks/
```

Route groups separate the loud marketing surface from the calm app shell, so each has its own motion level and its own layout.

## Rules

- Server Components by default. `"use client"` only for state, effects, event handlers, browser APIs. Keep client leaves small.
- Data: fetch in Server Components, mutate with Server Actions or route handlers, revalidate with tags/paths. Validate input with Zod on the server.
- Streaming: `loading.tsx` and `<Suspense>` with skeletons shaped like the final UI. `error.tsx` per route group with a retry. `not-found.tsx` helpful.
- Fonts: `next/font` (self-hosted, no layout shift); expose as CSS variables used by tokens. Check required subsets.
- Images: `next/image` with width/height or `fill` + `sizes`; set `priority` only on the LCP image.
- Metadata API for titles, OG, canonical; `generateMetadata` per dynamic route; `sitemap.ts`, `robots.ts`.
- Dark mode: `next-themes` (`attribute="data-theme"`, `defaultTheme="system"`, `disableTransitionOnChange` unless you animate the switch yourself) with `suppressHydrationWarning` on `<html>`.
- Forms: React Hook Form + Zod resolver with shadcn `Form`, or native `<form action={serverAction}>` with `useActionState`.
- Auth: use a maintained library (Auth.js, Clerk, Lucia-style patterns, or your backend sessions). The UI handles loading, signed-out, expired and forbidden states explicitly.
- Env: only `NEXT_PUBLIC_*` reaches the browser. Never import server-only modules in client components (`import "server-only"`).
- Animation: CSS first. For React-driven presence/layout animation use `motion/react` inside client leaves, lazy where heavy. View Transitions support in React/Next is evolving, check current docs before relying on it.

## Tailwind notes (v4)

- CSS-first config: `@import "tailwindcss";` then `@theme { ... }` for tokens; no `tailwind.config.js` required.
- Dark variant by attribute: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`
- Prefer semantic utilities bound to tokens (`bg-background text-foreground border-border`) over palette utilities (`bg-zinc-900`).
- Container queries (`@container`, `@md:`) for components that live in different widths.

## Quality gates

```bash
npm run lint && npx tsc --noEmit && npm test && npx playwright test
```


<!-- afd-app-frontend/references/stack-vite-node.md -->

# Vite + React + TypeScript + Node API

For apps behind a login with an existing or separate Node backend (Express, Fastify, Hono, NestJS). No SSR needed.

## Bootstrap

```bash
npm create vite@latest web -- --template react-ts
cd web && npm i
npm i tailwindcss @tailwindcss/vite
npx shadcn@latest init
npm i @tanstack/react-query react-router zod react-hook-form @hookform/resolvers
```

Add the Tailwind Vite plugin in `vite.config.ts`, `@import "tailwindcss";` in `src/index.css`, and a `@/` path alias in `tsconfig` + Vite.

## Structure

```
web/src/
  routes/            route components (lazy: const Page = lazy(() => import('./Page')))
  components/ui/     shadcn
  components/
  lib/api.ts         typed fetch client (base URL, error mapping, auth refresh)
  lib/schemas.ts     zod schemas shared with the backend when possible
  features/<name>/   queries, mutations, components per feature
```

## Rules

- Share types: generate from OpenAPI (`openapi-typescript`) or share a package with Zod schemas, so client and server cannot drift.
- One API client. It maps HTTP errors to a small union (`validation`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `rateLimited`, `server`, `network`) and the UI has a component for each.
- TanStack Query: stable query keys per feature, `staleTime` chosen on purpose, optimistic updates with rollback, `invalidateQueries` after mutations, `placeholderData` to avoid flicker on pagination.
- Auth: prefer `HttpOnly` cookie sessions with CSRF protection; if tokens must live in the client, keep them in memory and refresh via cookie. A route guard component handles signed-out and expired states; keep the intended URL to return to.
- Code splitting: lazy routes, dynamic import for charts/editors. Watch the bundle with `vite build --report` or a visualizer.
- Dev proxy to the Node API in `vite.config.ts` to avoid CORS in development; in production serve behind the same origin or configure CORS narrowly.
- Realtime: WebSocket or SSE with a visible connection state (live, reconnecting, offline) and backoff; never silently show stale data.
- Dark mode and tokens: same as the Next.js guide, via `data-theme` and the shadcn variables.

## Node API alignment (what the UI needs from the backend)

- Consistent error body: `{ code, message, fields?: Record<string,string> }`.
- Pagination metadata (`nextCursor` or `total`), sort and filter params that the URL can mirror.
- Idempotent mutations or `409` on conflict so the UI can recover.
- `Retry-After` on `429`, so the UI can show a precise message.


<!-- afd-app-frontend/references/states-forms-data.md -->

# States, forms and data patterns

## State matrix (design each as a real component, not a string)

| State | Shows | Never |
|---|---|---|
| loading | skeleton with the final layout's shape; spinner only for sub-second inline actions | a blank page, a layout jump on arrival |
| empty | why it is empty, one primary action, optional sample | "No data" alone |
| error | what failed in human words, retry, keep input, reference id for support | raw stack traces, losing form values |
| partial | the data that loaded + a per-widget error with retry | blanking the page |
| forbidden | which permission is missing, who can grant it | a 404 pretending the page does not exist (unless that is a security decision) |
| stale/offline | banner with last updated time | silently showing old data |
| long content | truncate with `title`/tooltip, wrap, `min-w-0` on flex children | overflowing the container |

## Forms

- Layout: single column, label above control, helper below, error replaces helper, group related fields.
- Validation: schema shared with the server where possible. Validate on blur and on submit; after the first error, revalidate on change.
- Errors: text + icon, linked with `aria-describedby`, `aria-invalid="true"`; on submit failure focus the first invalid control and announce a summary (`role="alert"`).
- Submit: disabled while pending with a visible pending label ("Saving..."), prevents double submit, re-enables on error.
- Inputs: correct `type`, `inputmode`, `autocomplete` tokens, and `enterkeyhint`; do not block paste; show/hide password toggle.
- Unsaved changes: warn on navigation only when real changes exist.
- Long forms: sections with a sticky progress/summary, autosave drafts with a saved indicator.

## Data fetching and mutation

- Reads: Server Components or TanStack Query; cache key = resource + params; the URL holds filters and pagination.
- Writes: optimistic when the success rate is high and the rollback is clear; otherwise show pending and confirm.
- Race conditions: abort stale requests; ignore out-of-order responses; disable controls that would double fire.
- Pagination: cursor for feeds and large sets, offset only for small stable sets; keep scroll position on back.
- Search/filter inputs: debounce 250-400 ms; announce the result count in a live region.

## Tables

- Header sticky, numeric columns right-aligned and tabular, status as text + colour/icon, row actions in a menu with a visible trigger, selected rows persist across pages when selection is global.
- Responsive: at < 640 px switch to stacked cards for key columns or scroll horizontally inside the table container only.

## Dialogs, toasts, menus

- Dialog: title, one purpose, primary action right, Esc closes, focus returns to the trigger.
- Toast: polite live region, auto-dismiss 4-6 s for success, sticky for errors with an action; never the only place an error appears.
- Menus: roving focus, typeahead, disabled items explain themselves via tooltip.

## Charts and numbers

Direct labels instead of legends when possible, accessible text summary, colour-blind safe palette, zero baseline for bars, units and period on every number, formatted with `Intl.NumberFormat` and `Intl.DateTimeFormat` for the locale.


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


<!-- afd-design-direction/references/ai-tells.md -->

# AI tells: patterns that make a page read as templated

Scan the finished page against this list. Three or more hits means change the layout family, not the colours.

## Visual
- Purple-to-blue gradient hero, glow blobs, neon box-shadows, gradient text on the headline.
- Glassmorphism cards stacked on a blurred gradient with no reason for the blur.
- Three equal feature cards with an icon in a tinted circle, a title and two lines.
- Every section centred, every section the same vertical rhythm, every card the same radius and shadow.
- Hero with text on the left and an empty or stock-illustration right half.
- Emoji used as icons; icons from three different sets.
- Decorative dots, "live" status lights, fake terminal chrome that shows nothing real.
- Grain, noise or mesh overlays that cover content or cost paint time.

## Structure
- Sections in this fixed order: hero, logos, three features, testimonials, pricing, FAQ, CTA, footer, regardless of the product.
- Section-number eyebrows (`01 /`, `02 /`), small uppercase kicker above every heading.
- "Scroll" arrows, bouncing chevrons.
- Bento grid with empty cells, or cells that exist only to fill the grid.
- A pill badge above the headline announcing something nobody announced.

## Copy
- Filler verbs: elevate, seamless, unleash, supercharge, revolutionize, empower, next-generation.
- "Trusted by" logo strips, star ratings, testimonial quotes and statistics that nobody supplied.
- Three-word taglines with periods. ("Fast. Simple. Powerful.")
- Placeholder names (John Doe, Acme), lorem ipsum, "Lorem" in any shipped state.
- Headlines that could describe any product if you swapped the nouns.

## Motion
- Everything fades up with the same delay on scroll.
- Parallax on text, auto-playing carousels, looping gradients, shimmer on static content.
- Hover that scales every card by the same amount, with a blurred shadow transition.
- Animation that fires on a timer while the reader is reading.

## Engineering
- Raw hex values in components instead of tokens; dark mode by `filter: invert`.
- `div` with `onClick` instead of a button or link; missing `alt`; missing focus styles.
- Layout shift when fonts or images load; content hidden until hydration.
- Only the happy path designed: no empty, loading, error or long-text state.


<!-- afd-design-direction/references/signature-industrial.md -->

# Signature style: one industrial DNA, four machines

Origin: the author's own portfolio (live, four themes, four languages). Use it when the user asks
for "the signature style", or a multi-theme portfolio/landing with strong personality. For other briefs,
borrow the principles and change the palette, shapes and layouts.

## The DNA (shared by every theme)

- Hard-edged **panels** with a mono **title bar** (`~/path`, `file.txt`, `module`), like windows, modules or sheets.
- **Real data only**: counts, dates and lists are computed from content at build time. No typed stats.
- **Stepped, mechanical motion** for things the visitor triggers (boot, print, press, stamp). Entrances stay eased and calm.
- Switching theme swaps the palette **and** the page composition. It changes the whole machine.
- Clean backgrounds. No speckle, paper or grain textures.
- Each theme owns an accent pair: a **fill** (backgrounds, bars) and a **text accent** (links, small text) that passes contrast.

## The four themes

| | **Gray: Concrete** (default) | **White: Studio** | **Black: Night OS** | **Cream: Archive** |
|---|---|---|---|---|
| Idea | mission control + window bento | bento of hardware modules | desktop OS + window bento | dossier + card-catalogue drawers |
| `--bg` / raised / sunken | `#c8cbcd` / `#dcdee0` / `#b5b8ba` | `#edeef0` / `#fbfbfc` / `#e1e3e6` | `#101214` / `#181b1f` / `#0a0b0d` | `#e9e3d4` / `#f6f2e8` / `#ddd6c4` |
| `--fg` | `#0d1012` | `#0e1013` | `#e8eaed` | `#1c1a16` |
| Accent fill | signal yellow `#f9d630` | orange `#ff5a1f` | amber `#ffb224` | vermilion `#b8372a` |
| Accent text | rust `#7d2600` | cobalt `#1d4bd8` | ice `#7cd4f5` | ink blue `#1f3fb8` |
| Display / body | Chivo 900 / Chivo | Hubot Sans 800 / Hubot Sans | Space Grotesk 700 / Space Grotesk | Archivo 800 / Literata |
| Mono | Chivo Mono | Geist Mono (+ VT323 for LCD) | IBM Plex Mono | Space Mono |
| Shape | 0 radius, 2 px rules, hard 4 px offset shadow | 16-20 px modules, screw heads, soft shadow | 0 radius, 1.5 px frames, 6 px black shadow | 3 px paper, 2 px ink, folder tabs, 5 px ink shadow |
| Header | control strip with a solid brand block | floating pill nav | OS menu bar, centred menu | folder tabs on the page edge |
| Card / page head | panel + title bar + three squares | module + mono label + screws | window, centred title, accent button | sheet with a typed file label |
| Motion pick | panels boot top to bottom, log lines print | spring rise, LCD ticker, press key | windows pop on a stepped scale, drag | redaction bars peel, stamp lands, drawers slide |
| Icons | pixel icons in a solid square | regular-weight icons in a soft circle | light-weight icons in an accent square | thin icons in a dashed stamp circle |

Fonts must be verified for the target subsets (for example Vietnamese) before use.

## Page structure per theme

Same markup, four grids (`src/styles/layouts/*.css`). Examples:

| Page | Gray | White | Black | Cream |
|---|---|---|---|---|
| List | sticky control column + log panel | centred hero, pill filter, year tiles | one explorer window with tag tree and preview | catalogue drawer, year tabs, index cards |
| Article | title panel + spec sheet with sticky facts and contents | no boxes, centred title, floating contents pill | editor window with line gutter and outline panel | one typed sheet, filing form, margin notes |
| Index of work | rack cabinet, projects as units | catalogue: split headline, hero module, grid | desktop with folder icons and cascading windows | manila cover with staggered folder tabs |
| About | identity column + badge wall | spec sheet + badge conveyor | terminal session, every block is `$ command` output | typed dossier with a clipped profile card |

## Home compositions

Render all four, show one by `html[data-theme]` (set by an inline theme-init script before first paint, so no flash).
Hidden variants are `display: none`, which keeps them out of the accessibility tree. Each has its own `h1`; a test
checks exactly one is visible. Tiles exist only for content that exists, so there are no empty cells.

## Optional extras (expressive only)

- **Pixel cast**: small decorative sprites per theme, `aria-hidden`, pausing when the tab is hidden, switchable in the footer.
- **Per-theme cursor**, **name intro** (drop, teletype, decrypt, typewriter), **text effect** on one heading (LCD strip, CRT glitch once then on hover, `$ whoami` typing, typewriter).
- **Halftone** dot patterns: a CSS fallback first, a canvas enhancement after, colours from tokens.

Every extra must obey `afd-motion` comfort rules and be switchable off.

## Building it

1. `afd-theme-systems`: token tiers, `themes/`, `skins/`, `layouts/`, theme-init, contrast gate.
2. `afd-static-sites` (Astro) for the page set. `afd-motion` for the effect picks.
3. Keep theme-specific structure in unlayered `skins/` and `layouts/` files with selectors starting `:root[data-theme='x']`.


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


<!-- afd-motion/references/libraries.md -->

# Motion libraries: when, which, how

Default answer: do it in CSS. A library needs a reason written in the plan: the effect, the KB cost, the lazy-load plan,
and why CSS cannot do it. Check current docs and bundle size before adding; versions move.

| Need | First try | Library when CSS is not enough |
|---|---|---|
| Reveal, stagger, hover, page fade | CSS scroll-driven + View Transitions | none |
| React layout animation (reorder, shared layout, presence/exit) | CSS + View Transitions | **Motion** (`motion/react`: `motion.div`, `AnimatePresence`, `layout`) |
| Gesture-driven UI (drag, swipe, springs) | Pointer Events recipe | **Motion** |
| Complex timelines, scroll scrubbing, SVG morph | CSS `animation-timeline` | **GSAP** + ScrollTrigger, loaded lazily |
| Smooth scroll | native scroll | **Lenis** only for expressive showcase pages; it can hurt accessibility and anchor links, test both |
| 3D, shaders | none | **Three.js** / React Three Fiber, dynamic import behind an interaction or viewport trigger |
| Lottie/after-effects | CSS or SVG | lottie-web / dotLottie player, lazy, with a static poster |

## Rules when you do add one

1. Load below the fold or after interaction: `import()` inside an IntersectionObserver or event handler. Never in the critical path.
2. Provide the static poster/first frame in HTML, so LCP and no-JS are fine.
3. Honour the product's motion switch (`motionOff()`), and kill timelines on teardown (`ctx.revert()`, `useEffect` cleanup).
4. In React Server Component frameworks, animation components are client components (`"use client"`); keep them leaf-sized.
5. Strict CSP: libraries that write inline styles (they usually set `element.style`, which is allowed via CSSOM) are fine; those that inject
   `<style>` tags or use `eval` are not. Check the console for CSP violations.
6. Tailwind: do not stack `transition-all` everywhere. Name the property (`transition-[translate,opacity]`).
7. Record the decision and bytes in the PR description.

## Motion (React) quick patterns

```tsx
"use client";
import { motion } from "motion/react";

export function Rise({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Wrap the app in `<MotionConfig reducedMotion="user">` so the OS setting is honoured automatically.

## GSAP quick pattern (lazy)

```ts
const el = document.querySelector('[data-pin]');
if (el && !motionOff()) {
  const io = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(el, { y: 24, opacity: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: el });
  });
  io.observe(el);
}
```


<!-- afd-motion/references/recipes-css.md -->

# CSS motion recipes (0 JS)

All effect rules go inside `@media (prefers-reduced-motion: no-preference)` (policy A) or `@media screen` (policy C).
Always `@supports`-gate new features and leave the static layout as the fallback.

## 1. Scroll reveal

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
}
@keyframes reveal { from { opacity: 0; translate: 0 1.25rem; } }
```

Stagger children without JS:

```css
@supports (width: calc(sibling-index() * 1px)) {
  .reveal > * { animation-delay: calc(sibling-index() * var(--stagger, 60ms)); }
}
```

Fallback when `sibling-index()` is missing: index classes `.i-1 ... .i-8` set in markup.
Browsers without `animation-timeline` show the content immediately, which is the correct fallback.

## 2. Line-mask headline (kinetic intro)

Split lines or graphemes at **build time** (`Intl.Segmenter` keeps diacritics and CJK intact) and wrap each in
`<span class="mask"><span>...</span></span>`.

```css
.mask { overflow: clip; overflow-clip-margin: .2em; padding-block: .12em; display: inline-block; }
.mask > span { display: inline-block; animation: rise var(--dur-base) var(--ease-out) both; }
@keyframes rise { from { translate: 0 105%; } }
```

Screen readers: `aria-label` with the plain text on the heading, `aria-hidden="true"` on the split copy.

## 3. Page transitions (cross-document)

```css
/* first linked stylesheet */
@view-transition { navigation: auto; }
::view-transition-group(root) { animation-duration: 280ms; animation-timing-function: var(--ease-in-out); }
```

Shared element morph: give the card and the hero the same `view-transition-name` only on the navigating pair.

## 4. Marquee (max one per page)

Duplicate the list once with `aria-hidden="true"` and `inert` on the copy.

```css
.marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
.marquee:hover .marquee-track, .marquee:focus-within .marquee-track { animation-play-state: paused; }
@keyframes marquee { to { translate: -50%; } }
```

Motion off: wrapped static list.

## 5. Stepped boot (mechanical feel, visitor-triggered or once on load)

```css
.log-line { opacity: 0; animation: print 0.4s steps(4, jump-none) forwards; animation-delay: calc(var(--i) * 80ms); }
@keyframes print { to { opacity: 1; } }
```

`steps(n, jump-none)` with n >= 2. Set `--i` through index classes or build-time markup.

## 6. Hover tilt without per-frame filter cost

```css
@media (hover: hover) and (pointer: fine) {
  .card { transition: translate var(--dur-fast) var(--ease-out), scale var(--dur-fast) var(--ease-out); }
  .card:hover { translate: 0 -2px; scale: 1.02; box-shadow: var(--shadow-hover); } /* shadow switches, not eased */
}
```

## 7. Spotlight border (position from CSS variables set by tiny JS)

```css
.card::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; padding: 1px;
  background: radial-gradient(12rem circle at var(--mx, -99rem) var(--my, 0), var(--accent), transparent 60%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
```

## 8. Tune-in, stamp and peel (theme flavours)

- Tune-in: `clip-path: inset(50% 0 50% 0)` to `inset(0)` over `--dur-base`.
- Stamp: `scale: 1.6` and `opacity: 0` to `1` with a short overshoot cubic-bezier, once on reveal.
- Redaction peel: a pseudo-element bar with `translate: 0` to `105% 0`.

## 9. Caret

A few blinks, then it leaves (ends hidden, not looping):

```css
.caret { animation: blink 1s steps(1) 4 forwards; }
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 0; } }
```

Use `infinite` only while text is actually being typed.


<!-- afd-motion/references/recipes-js.md -->

# Small JavaScript motion recipes (CSP-safe)

Rules: no `eval`, no inline event handlers, no inline `style="..."` in markup. Write styles through the CSSOM
(`el.style.setProperty('--x', v)`, `el.style.translate = '...'`). With Trusted Types enforced, never assign a string to
`innerHTML`; build nodes with `createElement` and `textContent`. Pointer effects only under `(pointer: fine)`.

## Shared helper

```ts
// motion.ts
export const motionOff = () =>
  document.documentElement.dataset.motion === 'off' ||
  matchMedia('(prefers-reduced-motion: reduce)').matches; // drop this line under policy C
```

## 1. Cursor spotlight and magnetic target (about 0.5 KB)

```ts
import { motionOff } from './motion';
if (matchMedia('(pointer: fine)').matches && !motionOff()) {
  addEventListener('pointermove', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-spot]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}
```

## 2. Pointer-follow with inertia

```ts
let x = 0, tx = 0, raf = 0;
const el = document.querySelector<HTMLElement>('[data-follow]')!;
const tick = () => {
  x += (tx - x) * 0.08;
  el.style.translate = `${x}px 0`;
  raf = Math.abs(tx - x) > 0.5 ? requestAnimationFrame(tick) : 0; // stop when settled
};
addEventListener('pointermove', (e) => { tx = e.clientX; raf ||= requestAnimationFrame(tick); }, { passive: true });
// Pause when off-screen with IntersectionObserver. Motion off: static position.
```

## 3. Typed or scrambled text

Render the final text in HTML so no-JS users and crawlers see it. Build frames from a **fixed** string, append with `textContent`,
and stop immediately when `motionOff()`. Pin each glyph's width first so nothing shifts.

## 4. Draggable windows and cards

Pointer Events + `setPointerCapture`; clamp to the parent; write `translate` inside `requestAnimationFrame`;
optional snap grid; remember positions in `localStorage` (wrapped in try/catch); double-click to collapse; a "tidy" button to reset.
Keyboard parity: the same items are normal links in DOM order. Dragging is direct manipulation, so it ignores the effects switch.
Below 64 rem stack them.

## 5. Circular theme-switch reveal

```ts
async function setTheme(next: string, x: number, y: number) {
  if (!document.startViewTransition || motionOff()) return apply(next);
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(() => apply(next));
  await t.ready;
  document.documentElement.animate(
    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
  );
}
```

## 6. Pause when not visible

Loops (tickers, canvases, sprites) stop on `document.hidden` (`visibilitychange`) and when the element leaves the viewport
(IntersectionObserver). Re-measure canvases after fonts load (dispatch an `fonts-ready` event on `document.fonts.ready`).


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


<!-- afd-static-sites/references/astro-setup.md -->

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


<!-- afd-static-sites/references/page-recipes.md -->

# Page recipes

Each section names one **layout family**. Do not use the same family twice on a page.

Layout families: `split` (text + visual), `rail` (sticky side column + flow), `bento` (mixed-size tiles, no empty cell),
`index` (rows with one-line metadata), `stack` (single column, calm), `strip` (full-width band), `gallery` (uniform media grid),
`table` (spec sheet), `timeline`.

## Landing page (product or campaign)

| # | Section | Family | Notes |
|---|---|---|---|
| 1 | Hero | split | label, headline <= 2 lines, one sentence, 1-2 CTAs; visual is the product, a live demo or a figure |
| 2 | Proof | strip | real logos/numbers only; if none exist, skip the section (never fake) |
| 3 | How it works | rail or timeline | 3-5 steps tied to the actual product flow |
| 4 | Deep feature | split (flipped) or bento | show real UI, not icons in circles |
| 5 | Pricing / next step | table or stack | one primary action; same label as the hero CTA |
| 6 | Footer | strip | links, legal, contact; email as plain link |

Expressive: kinetic headline, product demo reacting to pointer. Calm: static screenshot, simple fade on load.

## Portfolio

| # | Section | Family |
|---|---|---|
| 1 | Identity (name, role, one sentence, contact, portrait or live element) | split |
| 2 | Selected work (3-6 projects with cover, role, stack, outcome) | bento or gallery |
| 3 | Writing / notes (latest, from the collection) | index |
| 4 | About (short bio, skills, certifications as real badges or text) | rail |
| 5 | Contact | stack |

Case-study page: title panel, facts (role, period, stack), problem, approach, result with real evidence, next/previous. Never invent clients or metrics.

## Blog / notes

- List: one-line rows (ISO date, title, tags), multi-tag filter in the URL (`?tag=a&tag=b`), search, preview popup after a short rest.
- Article: calm column 60-70ch, sticky contents on wide screens, code blocks with copy and focus styles, reading time, tags, related, RSS.
- Status chips for notes if a garden (Draft / In progress / Complete).

## Docs

Sidebar (collapsible groups), page contents on the right, search (command palette), previous/next, edit link, version selector. Motion limited to state.

## Common components

- Header: brand, 4-6 links, language and theme switch, search. Sticky, never taller than 64 px on mobile.
- Footer: motion switch, theme switch, legal, contact.
- 404: says what happened, offers 3 real pages and search.
- Cards: only when elevation signals hierarchy.
- Buttons: 3 variants (primary, secondary, ghost), 44 px touch target, visible focus ring, one loading state.


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
- [ ] Contrast gate lists every pair and passes in every theme, including any text that sits on an accent fill
- [ ] Text never sits on a decorative highlight whose colour is the same in every theme (a lime marker behind light text fails in dark); use an underline stroke or the paired `on-accent` token
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

1. **Accessibility (critical)**: check in every theme, including dark, text that overlaps a highlight, badge or band; text >= 4.5:1, UI and focus >= 3:1; visible focus ring on every interactive element; icon-only buttons have `aria-label`;
   one `h1`; correct `lang`; skip link works; nothing conveyed by colour alone; forms labelled; dialogs trap and return focus.
2. **Touch and interaction (critical)**: targets >= 44x44 px; hover-only affordances have a focus or tap equivalent; feedback within 100 ms.
3. **Performance (high)**: LCP < 2.5 s, CLS < 0.05, INP < 200 ms; images have dimensions; fonts do not shift layout; new JS chunks over 5 KB gz are listed and justified.
4. **Style fit (high)**: one accent per theme, one radius system, themes feel designed (not recoloured), no AI tells (`afd-design-direction` references).
5. **Layout and responsive (high)**: header fits at 360 px with brand and primary CTA on one line each and no icon shrinking; no horizontal scroll at 320 px; hero fits the first viewport; dates and numbers on one line; long words and URLs wrap
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
