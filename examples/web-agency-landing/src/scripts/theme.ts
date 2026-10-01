const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');

const apply = (theme: string) => {
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* storage blocked */ }
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(theme === 'dark')));
};

buttons.forEach((b) => b.setAttribute('aria-pressed', String(root.dataset.theme === 'dark')));

buttons.forEach((b) =>
  b.addEventListener('click', async (e) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) return apply(next);
    const x = e.clientX || innerWidth / 2;
    const y = e.clientY || 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => apply(next));
    await t.ready;
    root.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 450, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
    );
  }),
);
