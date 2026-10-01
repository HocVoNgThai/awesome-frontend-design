---
name: afd-app-frontend
description: Frontend rules for web apps that have a backend, from simple (forms, CRUD) to complex (auth, roles, dashboards, realtime, multi-tenant). Default stack Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui; alternative Vite + React + Node API. Use when the request is for an app, SaaS, dashboard, admin, or any UI that reads and writes data. Covers states, forms, data fetching, auth UX, density, and how motion level applies.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.2.0"
---

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
