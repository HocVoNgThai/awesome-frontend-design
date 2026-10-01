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
