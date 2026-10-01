# CSS motion recipes (0 JS)

All effect rules go inside `@media (prefers-reduced-motion: no-preference)` (policy A) or `@media screen` (policy C).
Always `@supports`-gate new features and leave the static layout as the fallback.

## 1. Scroll reveal

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }
}
@keyframes reveal { from { opacity: 0; translate: 0 1.25rem; } }
```

Stagger children without JS:

```css
@supports (width: calc(sibling-index() * 1px)) {
  .reveal > * { animation-delay: calc(sibling-index() * var(--stagger, 60ms)); }
}
```

Fallback when `sibling-index()` is missing: index classes `.i-1 ... .i-8` set in markup.
Browsers without `animation-timeline` show the content immediately, which is the correct fallback.

## 2. Line-mask headline (kinetic intro)

Split lines or graphemes at **build time** (`Intl.Segmenter` keeps diacritics and CJK intact) and wrap each in
`<span class="mask"><span>...</span></span>`.

```css
.mask { overflow: clip; overflow-clip-margin: .2em; padding-block: .12em; display: inline-block; }
.mask > span { display: inline-block; animation: rise var(--dur-base) var(--ease-out) both; }
@keyframes rise { from { translate: 0 105%; } }
```

Screen readers: `aria-label` with the plain text on the heading, `aria-hidden="true"` on the split copy.

## 3. Page transitions (cross-document)

```css
/* first linked stylesheet */
@view-transition { navigation: auto; }
::view-transition-group(root) { animation-duration: 280ms; animation-timing-function: var(--ease-in-out); }
```

Shared element morph: give the card and the hero the same `view-transition-name` only on the navigating pair.

## 4. Marquee (max one per page)

Duplicate the list once with `aria-hidden="true"` and `inert` on the copy.

```css
.marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
.marquee:hover .marquee-track, .marquee:focus-within .marquee-track { animation-play-state: paused; }
@keyframes marquee { to { translate: -50%; } }
```

Motion off: wrapped static list.

## 5. Stepped boot (mechanical feel, visitor-triggered or once on load)

```css
.log-line { opacity: 0; animation: print 0.4s steps(4, jump-none) forwards; animation-delay: calc(var(--i) * 80ms); }
@keyframes print { to { opacity: 1; } }
```

`steps(n, jump-none)` with n >= 2. Set `--i` through index classes or build-time markup.

## 6. Hover tilt without per-frame filter cost

```css
@media (hover: hover) and (pointer: fine) {
  .card { transition: translate var(--dur-fast) var(--ease-out), scale var(--dur-fast) var(--ease-out); }
  .card:hover { translate: 0 -2px; scale: 1.02; box-shadow: var(--shadow-hover); } /* shadow switches, not eased */
}
```

## 7. Spotlight border (position from CSS variables set by tiny JS)

```css
.card::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; padding: 1px;
  background: radial-gradient(12rem circle at var(--mx, -99rem) var(--my, 0), var(--accent), transparent 60%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
```

## 8. Tune-in, stamp and peel (theme flavours)

- Tune-in: `clip-path: inset(50% 0 50% 0)` to `inset(0)` over `--dur-base`.
- Stamp: `scale: 1.6` and `opacity: 0` to `1` with a short overshoot cubic-bezier, once on reveal.
- Redaction peel: a pseudo-element bar with `translate: 0` to `105% 0`.

## 9. Caret

A few blinks, then it leaves (ends hidden, not looping):

```css
.caret { animation: blink 1s steps(1) 4 forwards; }
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 0; } }
```

Use `infinite` only while text is actually being typed.
