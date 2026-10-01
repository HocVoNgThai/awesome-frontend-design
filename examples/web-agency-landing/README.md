# Example: landing page for a web studio

Generated to test the skill pack. Prompt used:

> Use awesome-frontend-design: static, balanced, 2 themes (light and dark). Landing page for a company that builds websites. Astro, no animation libraries, Vietnamese.

Resolved options: `static-balanced`, Astro, plain CSS with tokens, custom style, 2 themes.

The company, copy and email are fictional. Prices and durations are `TODO:` on purpose (the skills forbid inventing facts).

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # astro check + contrast gate + build
```

Skill checks run against it: `afd-theme-systems` contrast script (24 pairs), `afd-ui-review` render matrix (light/dark x 360/1440 px),
plus a manual look at the screenshots. Findings fed back into the skills are listed in the repo `CHANGELOG.md`.
