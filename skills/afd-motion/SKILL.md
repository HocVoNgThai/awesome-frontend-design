---
name: afd-motion
description: Motion, animation and interaction rules and recipes for web frontends, with three levels (calm, balanced, expressive). Use when adding or changing any animation, transition, hover effect, scroll reveal, page transition, cursor effect, marquee, kinetic type or microinteraction. CSS-first (scroll-driven animations, View Transitions), small JS only when needed, comfort and performance rules included.
license: MIT
metadata:
  author: HocVoNgThai
  version: "0.2.0"
---

# Motion

Motion must be **motivated**: hierarchy, sequence, feedback or state change. If you cannot say why in
one sentence, remove it. CSS first, JavaScript second, a library last.

## 1. Pick the level

| Level | Dial | Allowed | Budget |
|---|---|---|---|
| `calm` | 1-3 | state transitions (hover, focus, open/close), 150-250 ms, optional fade between pages | 0 KB JS for motion |
| `balanced` | 4-6 | calm + scroll reveal (CSS), cross-document View Transitions, one signature microinteraction, small stagger | <= 2 KB JS |
| `expressive` | 7-10 | balanced + kinetic type, pointer-follow effects, canvas/pattern layers, draggable elements, per-theme effect set | <= 15 KB JS per page, lazy chunks |

Use one level for the whole product. In `app` mode default to `calm` on data screens and allow `balanced` on
marketing/onboarding screens only.

## 2. Hard rules (all levels)

1. Animate only `transform` (`translate`, `scale`, `rotate`), `opacity`, `clip-path`. Never `width`, `height`,
   `top`, `left`, `margin`.
2. Never ease a blurred `box-shadow` or a `filter` on hover: it repaints the page every frame. Switch the shadow at once
   and animate `scale` or `translate`.
3. No `window.addEventListener('scroll')` for effects. Use `animation-timeline: view()`, IntersectionObserver or View Transitions.
4. Durations and easings come from tokens (`--dur-fast`, `--dur-base`, `--dur-page`, `--ease-out`, `--ease-in-out`, `--stagger`), not literals.
5. Layout shift budget: CLS stays near 0. Reserve space for anything a script reveals (`visibility`, not `display`).
6. Never hide content until JavaScript runs. LCP must not wait for a script. The no-JS state is the readable state.
7. Pointer effects only under `(pointer: fine)`; every pointer effect has a keyboard or tap equivalent.
8. Provide an off switch. Respect `prefers-reduced-motion` by default (see 3). When the product has its own
   switch, store it and set `html[data-motion="off"]`; in that state every animation finishes at once and each
   effect's end state is the readable layout.
9. A new motion library (GSAP, Motion, Lenis, Three.js) is a proposal first: state the KB cost, the lazy-loading plan and the alternative in CSS.

## 3. Reduced motion policy (choose one, state it)

- **Policy A (default)**: honour `prefers-reduced-motion: reduce`. Put effects in `@media (prefers-reduced-motion: no-preference)`.
- **Policy C (opt-in, owner-driven)**: effects run for everyone, and the product ships its own visible "turn off effects"
  switch. Effects live in `@media screen`; scripts check a shared `motionOff()` helper. Choose C only when the owner asked,
  because it overrides an OS accessibility setting. Essential feedback (focus, drag, state change) must stay usable under both.

## 4. Comfort rules (these came from real complaints: "jerky", "flashing")

- Nothing fires on its own timer while the reader reads. Trigger on load once, on hover, or on scroll into view.
- `infinite` only for something genuinely live: a typing caret, a ticker. A caret next to finished text blinks a few times and leaves.
- No brightness flashes, no full-screen noise, no strobing.
- A hover that dims siblings brightens them back after a short delay (about 180 ms) so crossing a gap does not flash.
- Effects that swap glyphs pin each glyph's width first (`getComputedStyle(el).width`), so nothing shifts.
- Entrances are eased, never stepped. Stepped motion is reserved for effects the visitor triggers.
- Page changes: one soft curve in every theme, capped around 280 ms.
- Stepped animations that must end visible use `steps(n, jump-none)` with **n >= 2**. `jump-end` can freeze on the second to last step;
  `steps(1, jump-none)` is invalid and silently drops the whole `animation` declaration (use plain `steps(1)` for a blink).

## 5. Cross-document View Transitions: ship the opt-in early

`@view-transition { navigation: auto; }` must be in the **first stylesheet** the page links, placed before inline scripts in `<head>`.
If the browser runs its first style update before it sees the opt-in, it skips the transition and cuts to the new page: a full-screen flash on
about half of navigations (measured, fixed by moving the rule to the first linked stylesheet). Name shared elements only on the navigating
pair (set in `pageswap`, clear after); duplicate names abort the transition.

## 6. Layering (z-index) contract

Write the stack down once and keep it: content < sticky effects < overlays < dock < menus and popovers < sticky header.
A grid or flex item keeps its `z-index` even with `position: static`. Popovers that open above a sticky header need to be in the same stacking context or portalled.

## 7. Recipes

Open the reference that matches the task:
- `references/recipes-css.md` - scroll reveal, stagger, line-mask headline, marquee, stepped boot, hover tilt, spotlight border, page transitions.
- `references/recipes-js.md` - pointer spotlight/magnetic, inertia follow, typed text, draggable windows, theme-switch circular reveal. CSP-safe CSSOM patterns.
- `references/libraries.md` - when Motion (React), GSAP, Lenis, Three.js are justified, how to load them lazily, and the CSS alternative.

## 8. Verify

- Turn effects off: everything readable, nothing hidden, no running loops.
- Performance panel: no long task over 50 ms from motion code; CLS about 0 on every page; no per-frame paint on hover.
- Frame pacing on a throttled CPU (4x slowdown) for the expressive level.
- If the project has a strict CSP, the gates from `afd-ui-review` still pass (no inline `style=""`).
