# Small JavaScript motion recipes (CSP-safe)

Rules: no `eval`, no inline event handlers, no inline `style="..."` in markup. Write styles through the CSSOM
(`el.style.setProperty('--x', v)`, `el.style.translate = '...'`). With Trusted Types enforced, never assign a string to
`innerHTML`; build nodes with `createElement` and `textContent`. Pointer effects only under `(pointer: fine)`.

## Shared helper

```ts
// motion.ts
export const motionOff = () =>
  document.documentElement.dataset.motion === 'off' ||
  matchMedia('(prefers-reduced-motion: reduce)').matches; // drop this line under policy C
```

## 1. Cursor spotlight and magnetic target (about 0.5 KB)

```ts
import { motionOff } from './motion';
if (matchMedia('(pointer: fine)').matches && !motionOff()) {
  addEventListener('pointermove', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-spot]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}
```

## 2. Pointer-follow with inertia

```ts
let x = 0, tx = 0, raf = 0;
const el = document.querySelector<HTMLElement>('[data-follow]')!;
const tick = () => {
  x += (tx - x) * 0.08;
  el.style.translate = `${x}px 0`;
  raf = Math.abs(tx - x) > 0.5 ? requestAnimationFrame(tick) : 0; // stop when settled
};
addEventListener('pointermove', (e) => { tx = e.clientX; raf ||= requestAnimationFrame(tick); }, { passive: true });
// Pause when off-screen with IntersectionObserver. Motion off: static position.
```

## 3. Typed or scrambled text

Render the final text in HTML so no-JS users and crawlers see it. Build frames from a **fixed** string, append with `textContent`,
and stop immediately when `motionOff()`. Pin each glyph's width first so nothing shifts.

## 4. Draggable windows and cards

Pointer Events + `setPointerCapture`; clamp to the parent; write `translate` inside `requestAnimationFrame`;
optional snap grid; remember positions in `localStorage` (wrapped in try/catch); double-click to collapse; a "tidy" button to reset.
Keyboard parity: the same items are normal links in DOM order. Dragging is direct manipulation, so it ignores the effects switch.
Below 64 rem stack them.

## 5. Circular theme-switch reveal

```ts
async function setTheme(next: string, x: number, y: number) {
  if (!document.startViewTransition || motionOff()) return apply(next);
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(() => apply(next));
  await t.ready;
  document.documentElement.animate(
    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
  );
}
```

## 6. Pause when not visible

Loops (tickers, canvases, sprites) stop on `document.hidden` (`visibilitychange`) and when the element leaves the viewport
(IntersectionObserver). Re-measure canvases after fonts load (dispatch an `fonts-ready` event on `document.fonts.ready`).
