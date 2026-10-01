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
