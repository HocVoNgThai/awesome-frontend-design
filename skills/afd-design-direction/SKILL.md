---
name: afd-design-direction
description: Design direction and anti-template rules for any frontend. Use before designing or restyling a page, section, component, palette or typography, and whenever a UI looks generic, "AI-made" or template-like. Covers the design read, VARIANCE/MOTION/DENSITY dials, colour, type, layout, copy rules and a pre-flight checklist. Includes the optional signature industrial multi-theme style.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.2.0"
---

# Design direction

Audience decides, not taste. A recruiter scans the first screen for ten seconds; a reader of long
text needs calm. The home can be expressive, the reading page must be quiet.

## 1. Design read (write it down before touching CSS)

One line in the plan or PR:

> Reading this as: **<what it is>** for **<audience>**, with a **<vibe>** language, leaning toward **<reference family>**.

Then answer in one line each: what is the one thing a visitor must do or remember? Which single
surface carries the personality (hero, nav, cards, motion)? Everything else stays quiet.

## 2. Dials

| Dial | 1 | 10 |
|---|---|---|
| VARIANCE | symmetric, grid, predictable | asymmetric, overlapping, collage |
| MOTION | static, instant | cinematic, kinetic |
| DENSITY | airy, one idea per screen | packed, dashboard-like |

Defaults by surface (override explicitly when the user states otherwise):

| Surface | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Home, portfolio index, landing hero | 7 | 6 | 4 |
| Article, docs, case-study body | 4 | 3 | 3 |
| Lists, search, tables | 5 | 4 | 5 |
| App dashboard, admin | 3 | 2 | 7 |
| Forms, settings, onboarding | 2 | 2 | 4 |

`motion` option maps to the MOTION dial: calm = 1-3, balanced = 4-6, expressive = 7-10.

## 3. Colour

- One accent per theme, used the same way in every section. If the accent fill fails contrast as text,
  add a second token (`--accent-text`) rather than darkening the fill.
- One grey family per theme; do not mix warm and cool greys. No pure `#000` or `#fff` page background
  unless the theme is deliberately stark.
- Dark theme is designed, not inverted: hierarchy that pops in light must pop in dark.
- Banned as a default: purple-blue glow gradients, neon outer glows, gradient headline text, rainbow
  borders, "warm beige + brass + espresso" by reflex. A banned item is allowed only with a stated reason.
- Status colours (success, warning, danger) are separate from the brand accent and always paired with an icon or label.

## 4. Typography

- Display face with character and with the subset the content needs (check Vietnamese, Cyrillic, CJK
  coverage before choosing). Two families maximum: display + body (+ mono for data).
- Emphasis inside a headline is italic or weight of the same family, never a random third font.
- Headline at most 2 lines on desktop; body 60-70ch and 16-18 px; `text-wrap: balance` on headings,
  `pretty` on paragraphs.
- Numbers in lists, tables and dates: `font-variant-numeric: tabular-nums`, one line, never wrapping.
- Stacked diacritics: display `line-height >= 1.0`, never clip them with `overflow: hidden` masks
  (use `overflow: clip` plus `overflow-clip-margin`).
- CJK: system fonts first, no letter-spacing, no uppercase transforms.

## 5. Layout

- Hero fits the first viewport: label, headline, one sentence, CTAs (max 4 text elements). It needs a real
  visual (product, portrait, figure, live data, generative pattern tied to content), not an empty half.
- No layout family twice on one page. No three equal feature cards. Bento cells equal the number of items.
- Cards only when elevation means hierarchy; otherwise use rules and spacing.
- One radius system per theme. One spacing scale (4 or 8 px base). One max content width per page type.
- Every multi-column block declares how it collapses below 768 px.
- No section-number eyebrows (`01 /`), no scroll cues, no decorative status dots, no fake version stamps.

## 6. Copy and content

- Real content first. If the user has none, write plausible structure and mark every invented line
  `TODO:`. Never invent testimonials, client logos, metrics or credentials.
- Numbers shown on a page are computed from data at build or request time, never typed by hand.
- Voice: specific and calm. Ban filler verbs (elevate, seamless, unleash, revolutionize) and empty superlatives.
- One label per intent across the whole product ("Contact" everywhere, not three variants).
- Optional house rule (ask or detect): no em dash or en dash in visible text; use "-" or " · ".

## 7. Icons, imagery, depth

- One icon set, one stroke weight. Icons never replace text for primary actions.
- Real photography or product shots beat stock illustration; generative patterns must derive from content.
- Depth through one shadow system per theme (hard offset, soft, or none). Do not mix.

## 8. AI-tell scan

Before finishing, scan `references/ai-tells.md`. If three or more tells appear, the page reads as
templated: change the layout family, not the colours.

## 9. Pre-flight (tick before calling UI work done)

- [ ] Design read and dials written down
- [ ] One accent per theme; contrast verified in every theme
- [ ] Hero fits viewport with a real visual
- [ ] No tell from sections 3-6 and `references/ai-tells.md`
- [ ] Checked at 360 px and 1440 px, each language if multilingual
- [ ] Every animation justified, has an off state, causes no layout shift (`afd-motion`)
- [ ] States designed: empty, loading, error, long text, no JavaScript where relevant
- [ ] No unexplained new dependency, font family or third-party origin

## 10. Signature style (option `style: signature`)

An industrial multi-theme system: one DNA (hard-edged panels with a mono title bar, real data only,
stepped mechanical motion), four themes that change **page structure**, not only paint
(Concrete, Studio, Night OS, Archive). Read `references/signature-industrial.md` for tokens, shapes,
per-theme layouts and motion picks, and `afd-theme-systems` for the architecture that makes it work.
Use it when the user asks for "my style", "signature", "industrial" or a multi-theme portfolio. Otherwise
derive a custom language from the design read.

## References
- `references/ai-tells.md` - the banned and suspicious patterns list
- `references/signature-industrial.md` - the signature style in full
