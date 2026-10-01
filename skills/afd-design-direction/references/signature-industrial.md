# Signature style: one industrial DNA, four machines

Origin: the author's own portfolio (live, four themes, four languages). Use it when the user asks
for "the signature style", or a multi-theme portfolio/landing with strong personality. For other briefs,
borrow the principles and change the palette, shapes and layouts.

## The DNA (shared by every theme)

- Hard-edged **panels** with a mono **title bar** (`~/path`, `file.txt`, `module`), like windows, modules or sheets.
- **Real data only**: counts, dates and lists are computed from content at build time. No typed stats.
- **Stepped, mechanical motion** for things the visitor triggers (boot, print, press, stamp). Entrances stay eased and calm.
- Switching theme swaps the palette **and** the page composition. It changes the whole machine.
- Clean backgrounds. No speckle, paper or grain textures.
- Each theme owns an accent pair: a **fill** (backgrounds, bars) and a **text accent** (links, small text) that passes contrast.

## The four themes

| | **Gray: Concrete** (default) | **White: Studio** | **Black: Night OS** | **Cream: Archive** |
|---|---|---|---|---|
| Idea | mission control + window bento | bento of hardware modules | desktop OS + window bento | dossier + card-catalogue drawers |
| `--bg` / raised / sunken | `#c8cbcd` / `#dcdee0` / `#b5b8ba` | `#edeef0` / `#fbfbfc` / `#e1e3e6` | `#101214` / `#181b1f` / `#0a0b0d` | `#e9e3d4` / `#f6f2e8` / `#ddd6c4` |
| `--fg` | `#0d1012` | `#0e1013` | `#e8eaed` | `#1c1a16` |
| Accent fill | signal yellow `#f9d630` | orange `#ff5a1f` | amber `#ffb224` | vermilion `#b8372a` |
| Accent text | rust `#7d2600` | cobalt `#1d4bd8` | ice `#7cd4f5` | ink blue `#1f3fb8` |
| Display / body | Chivo 900 / Chivo | Hubot Sans 800 / Hubot Sans | Space Grotesk 700 / Space Grotesk | Archivo 800 / Literata |
| Mono | Chivo Mono | Geist Mono (+ VT323 for LCD) | IBM Plex Mono | Space Mono |
| Shape | 0 radius, 2 px rules, hard 4 px offset shadow | 16-20 px modules, screw heads, soft shadow | 0 radius, 1.5 px frames, 6 px black shadow | 3 px paper, 2 px ink, folder tabs, 5 px ink shadow |
| Header | control strip with a solid brand block | floating pill nav | OS menu bar, centred menu | folder tabs on the page edge |
| Card / page head | panel + title bar + three squares | module + mono label + screws | window, centred title, accent button | sheet with a typed file label |
| Motion pick | panels boot top to bottom, log lines print | spring rise, LCD ticker, press key | windows pop on a stepped scale, drag | redaction bars peel, stamp lands, drawers slide |
| Icons | pixel icons in a solid square | regular-weight icons in a soft circle | light-weight icons in an accent square | thin icons in a dashed stamp circle |

Fonts must be verified for the target subsets (for example Vietnamese) before use.

## Page structure per theme

Same markup, four grids (`src/styles/layouts/*.css`). Examples:

| Page | Gray | White | Black | Cream |
|---|---|---|---|---|
| List | sticky control column + log panel | centred hero, pill filter, year tiles | one explorer window with tag tree and preview | catalogue drawer, year tabs, index cards |
| Article | title panel + spec sheet with sticky facts and contents | no boxes, centred title, floating contents pill | editor window with line gutter and outline panel | one typed sheet, filing form, margin notes |
| Index of work | rack cabinet, projects as units | catalogue: split headline, hero module, grid | desktop with folder icons and cascading windows | manila cover with staggered folder tabs |
| About | identity column + badge wall | spec sheet + badge conveyor | terminal session, every block is `$ command` output | typed dossier with a clipped profile card |

## Home compositions

Render all four, show one by `html[data-theme]` (set by an inline theme-init script before first paint, so no flash).
Hidden variants are `display: none`, which keeps them out of the accessibility tree. Each has its own `h1`; a test
checks exactly one is visible. Tiles exist only for content that exists, so there are no empty cells.

## Optional extras (expressive only)

- **Pixel cast**: small decorative sprites per theme, `aria-hidden`, pausing when the tab is hidden, switchable in the footer.
- **Per-theme cursor**, **name intro** (drop, teletype, decrypt, typewriter), **text effect** on one heading (LCD strip, CRT glitch once then on hover, `$ whoami` typing, typewriter).
- **Halftone** dot patterns: a CSS fallback first, a canvas enhancement after, colours from tokens.

Every extra must obey `afd-motion` comfort rules and be switchable off.

## Building it

1. `afd-theme-systems`: token tiers, `themes/`, `skins/`, `layouts/`, theme-init, contrast gate.
2. `afd-static-sites` (Astro) for the page set. `afd-motion` for the effect picks.
3. Keep theme-specific structure in unlayered `skins/` and `layouts/` files with selectors starting `:root[data-theme='x']`.
