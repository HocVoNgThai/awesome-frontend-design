---
name: awesome-frontend-design
description: Entry point for building distinctive, production-grade frontends (UI/UX, layout, themes, animation). Use first for any request to design, build or restyle a website, landing page, portfolio, blog, dashboard or web app UI. Picks a mode (static site or app with backend), a motion level (calm, balanced, expressive) and a stack (Astro, Next.js + shadcn, Vite + Node), then routes to the specialist afd-* skills.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.1.0"
---

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
