# Contributing

Thanks for helping. Keep skills short, concrete and testable.

## Layout

```
skills/<name>/SKILL.md          frontmatter (name, description) + rules; keep under ~150 lines
skills/<name>/references/*.md   long material, read on demand
skills/<name>/scripts/*         small dependency-free helpers
bin/cli.mjs                     installer (init, list, remove, bundle)
bundles/                        generated single-file bundles (run npm run bundle)
```

## Rules for skill text

- The `description` says **what it does and when to use it**; agents decide to load a skill from it. Max 1024 chars.
- `name` equals the folder name, lowercase, hyphens.
- Rules must be checkable. Prefer "headline at most 2 lines" over "make it nice".
- Say why for non-obvious rules (the failure that produced it).
- No em dash or en dash anywhere (CI fails); use "-" or " · ".
- Never add facts you cannot source. Library versions and CLI flags change: tell the reader to check the current docs.
- Do not add a rule that only fits one brand. Put brand-specific material in `signature-industrial.md` or a new style reference.

## Workflow

```bash
npm test          # validate frontmatter, links, dashes, bundle freshness
npm run bundle    # regenerate bundles after editing any skill
```

Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). One topic per PR.

## Adding a new agent target

Add an entry in `TARGETS` in `bin/cli.mjs` (project folder, global folder, label) and a row in the README table.
