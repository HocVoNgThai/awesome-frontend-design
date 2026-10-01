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
