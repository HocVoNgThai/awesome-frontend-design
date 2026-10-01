# Motion libraries: when, which, how

Default answer: do it in CSS. A library needs a reason written in the plan: the effect, the KB cost, the lazy-load plan,
and why CSS cannot do it. Check current docs and bundle size before adding; versions move.

| Need | First try | Library when CSS is not enough |
|---|---|---|
| Reveal, stagger, hover, page fade | CSS scroll-driven + View Transitions | none |
| React layout animation (reorder, shared layout, presence/exit) | CSS + View Transitions | **Motion** (`motion/react`: `motion.div`, `AnimatePresence`, `layout`) |
| Gesture-driven UI (drag, swipe, springs) | Pointer Events recipe | **Motion** |
| Complex timelines, scroll scrubbing, SVG morph | CSS `animation-timeline` | **GSAP** + ScrollTrigger, loaded lazily |
| Smooth scroll | native scroll | **Lenis** only for expressive showcase pages; it can hurt accessibility and anchor links, test both |
| 3D, shaders | none | **Three.js** / React Three Fiber, dynamic import behind an interaction or viewport trigger |
| Lottie/after-effects | CSS or SVG | lottie-web / dotLottie player, lazy, with a static poster |

## Rules when you do add one

1. Load below the fold or after interaction: `import()` inside an IntersectionObserver or event handler. Never in the critical path.
2. Provide the static poster/first frame in HTML, so LCP and no-JS are fine.
3. Honour the product's motion switch (`motionOff()`), and kill timelines on teardown (`ctx.revert()`, `useEffect` cleanup).
4. In React Server Component frameworks, animation components are client components (`"use client"`); keep them leaf-sized.
5. Strict CSP: libraries that write inline styles (they usually set `element.style`, which is allowed via CSSOM) are fine; those that inject
   `<style>` tags or use `eval` are not. Check the console for CSP violations.
6. Tailwind: do not stack `transition-all` everywhere. Name the property (`transition-[translate,opacity]`).
7. Record the decision and bytes in the PR description.

## Motion (React) quick patterns

```tsx
"use client";
import { motion } from "motion/react";

export function Rise({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Wrap the app in `<MotionConfig reducedMotion="user">` so the OS setting is honoured automatically.

## GSAP quick pattern (lazy)

```ts
const el = document.querySelector('[data-pin]');
if (el && !motionOff()) {
  const io = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(el, { y: 24, opacity: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: el });
  });
  io.observe(el);
}
```
