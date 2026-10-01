# Awesome Frontend Design

Open-source agent skills for **distinctive frontend work**: UI/UX direction, layout, multi-theme systems and motion.
Built from a real, live portfolio (four themes, four languages, strict CSP) and generalised so it also covers apps with backends.

Tiếng Việt: [README.vi.md](README.vi.md)

- Choose **static** (landing page, portfolio, blog, docs) or **app** (simple CRUD to complex multi-tenant dashboards).
- Choose **motion**: `calm`, `balanced` or `expressive`.
- Choose a stack: **Astro** or plain HTML/CSS for static; **Next.js + TypeScript + Tailwind + shadcn/ui** or **Vite + React + Node API** for apps.
- Optional **signature style**: one industrial design DNA, four themes that change page structure, not only colours.
- Works with **Claude Code, OpenAI Codex, Gemini CLI, Google Antigravity, Cursor, GitHub Copilot, OpenCode, Windsurf** and any agent that reads `SKILL.md` folders. A single-file bundle covers ChatGPT and other chat UIs.

## Install

Recommended, any agent (uses the [skills](https://github.com/vercel-labs/skills) CLI):

```bash
npx skills add HocVoNgThai/awesome-frontend-design
```

Install one skill only:

```bash
npx skills add HocVoNgThai/awesome-frontend-design --skill afd-motion
```

Built-in zero-dependency installer (Node 18+):

```bash
# detect agents in the current project, else install to .agents/skills
npx github:HocVoNgThai/awesome-frontend-design init

# pick agents
npx github:HocVoNgThai/awesome-frontend-design init --ai claude,codex,gemini,antigravity

# for your user account (all projects)
npx github:HocVoNgThai/awesome-frontend-design init --ai claude --global
```

Once published to npm: `npx awesome-frontend-design init --ai claude`.

Claude Code plugin marketplace:

```text
/plugin marketplace add HocVoNgThai/awesome-frontend-design
/plugin install awesome-frontend-design@awesome-frontend-design
```

ChatGPT, Gemini web or any chat without skill folders: paste [`bundles/awesome-frontend-design.md`](bundles/awesome-frontend-design.md)
(skills only) or the [`full`](bundles/awesome-frontend-design.full.md) bundle (with references) into custom instructions or project knowledge.

| Agent | `--ai` | Project folder | `--global` folder |
|---|---|---|---|
| Claude Code | `claude` | `.claude/skills` | `~/.claude/skills` |
| OpenAI Codex | `codex` | `.agents/skills` | `~/.agents/skills` |
| Gemini CLI | `gemini` | `.gemini/skills` | `~/.gemini/skills` |
| Google Antigravity | `antigravity` | `.agent/skills` | `~/.gemini/antigravity/skills` |
| Cursor | `cursor` | `.cursor/skills` | `~/.cursor/skills` |
| GitHub Copilot | `copilot` | `.github/skills` | `~/.copilot/skills` |
| OpenCode | `opencode` | `.opencode/skills` | `~/.config/opencode/skills` |
| Windsurf | `windsurf` | `.windsurf/skills` | `~/.codeium/windsurf/skills` |
| Universal | `agents` | `.agents/skills` | `~/.agents/skills` |

Agents change their folders over time. If one differs, use `--dir <path>`. Other commands: `list`, `remove`, `bundle [--full]`, `--dry-run`, `--force`.

## Use

Ask in plain words, or name the options:

```text
Use awesome-frontend-design. Static, expressive, 4 themes, signature style. Build my security-engineer portfolio.
Use awesome-frontend-design: app-simple. Next.js dashboard for invoices, shadcn, few effects.
Use awesome-frontend-design: static-calm. Landing page for a CLI tool, Astro, no animation libraries.
Use awesome-frontend-design: app-dashboard, backend complex, multi-tenant admin. Calm, dense, keyboard first.
Review the UI with afd-ui-review.
```

If you do not say, the agent infers the options from your repo (`astro.config`, `next.config`, `components.json`) and asks at most three questions.

### Options

| Option | Values |
|---|---|
| `mode` | `static`, `app` |
| `motion` | `calm`, `balanced`, `expressive` |
| `stack` | `auto`, `astro`, `html`, `next`, `vite-node` |
| `backend` | `none`, `simple`, `medium`, `complex` |
| `style` | `signature`, `custom` |
| `themes` | `1`, `2`, `4` |

### Presets

| Preset | mode | motion | stack | Typical use |
|---|---|---|---|---|
| `static-calm` | static | calm | astro / html | docs, company page, quiet portfolio |
| `static-balanced` | static | balanced | astro | landing page, product page, blog |
| `static-expressive` | static | expressive | astro | personal portfolio, campaign, showcase |
| `app-simple` | app | calm | next | internal tool, SaaS MVP |
| `app-rich` | app | balanced | next | consumer SaaS, marketing + app |
| `app-dashboard` | app | calm | next / vite-node | dense data UI, complex backend |
| `app-showcase` | app | expressive | next | product with a hero experience |

## What is inside

| Skill | Purpose |
|---|---|
| [`awesome-frontend-design`](skills/awesome-frontend-design/SKILL.md) | Entry point: resolves options, routes to the others |
| [`afd-design-direction`](skills/afd-design-direction/SKILL.md) | Design read, dials, colour, type, layout, copy, AI-tell scan, signature style |
| [`afd-motion`](skills/afd-motion/SKILL.md) | Three motion levels, comfort rules, CSS and small-JS recipes, library policy |
| [`afd-theme-systems`](skills/afd-theme-systems/SKILL.md) | Tokens, dark mode, themes that change structure, no-flash init, contrast gate |
| [`afd-static-sites`](skills/afd-static-sites/SKILL.md) | Astro / HTML pages: landing, portfolio, blog, docs; performance, SEO, i18n, CSP |
| [`afd-app-frontend`](skills/afd-app-frontend/SKILL.md) | Next.js + shadcn or Vite + Node; states, forms, data, backend complexity |
| [`afd-ui-review`](skills/afd-ui-review/SKILL.md) | Gates, render matrix script, prioritised checklist, report format |

Skills are short; long material lives in `references/` and is read only when needed, so token use stays low.

## Live examples

Built with these skills and hosted on a strict-CSP site (`default-src 'none'`, no inline scripts, Trusted Types):

- Web studio landing page, `static-balanced`: https://thiscooking.site/samples/web-agency/
- Company website landing page, `static-calm`: https://thiscooking.site/samples/company-website/

Sources and prompts: [examples/](examples/README.md).

## Principles

1. Distinctive over generic. A page that could be any product is a bug.
2. Motion is motivated. If it cannot be explained in one sentence, remove it.
3. Real content. Never invent clients, metrics, quotes or credentials; mark gaps with `TODO:`.
4. Accessible by default. Contrast, focus, touch targets, keyboard parity, an off switch for effects.
5. Cheap to run. CSS first, zero JavaScript by default, libraries only with a stated reason.

## Contributing

Issues and PRs welcome, see [CONTRIBUTING.md](CONTRIBUTING.md). Run `npm test` before a PR (frontmatter, links, bundle freshness).

## Credits

Inspired by the structure and ideas of [taste-skill](https://github.com/Leonxlnx/taste-skill) and
[ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (both MIT). Content here is original and
distilled from building [thiscooking.site](https://thiscooking.site).

## License

[MIT](LICENSE) (c) 2026 HocVoNgThai
