# Changelog

## 0.1.0

- First release: entry skill plus six specialists (design direction, motion, theme systems, static sites, app frontend, UI review).
- Options: mode (static/app), motion (calm/balanced/expressive), stack, backend complexity, style, theme count.
- Installer CLI for Claude Code, Codex, Gemini CLI, Antigravity, Cursor, Copilot, OpenCode, Windsurf and the universal `.agents/skills` folder.
- Single-file bundles for chat UIs.

## Unreleased

- Add `examples/web-agency-landing` (Astro, light/dark, built with the skills).
- `afd-theme-systems`: warn against text over fixed-colour highlights (failed in dark mode during the example build).
- `afd-ui-review`: check header fit at 360 px and overlapping text in every theme; fix screenshot name for `/`.
- `afd-static-sites`: note that Astro inlines tiny scripts, which breaks strict CSP (`assetsInlineLimit: 0`).
