---
name: afd-ui-review
description: Visual and UX audit to run before shipping frontend changes. Use after implementing or changing pages, components, themes or motion, when asked to "test the UI", "check for UI bugs", "review the design", or before calling a design phase done. Runs the repo gates, renders a page x theme x viewport matrix in a real browser, and reports findings by severity.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.1.0"
---

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
