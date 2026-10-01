// Đổi theme bằng View Transition hình tròn mở rộng từ vị trí nhấn. Không hỗ trợ hoặc giảm chuyển động thì đổi ngay.
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function apply(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d100e' : '#f3f4f1');
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

async function setTheme(theme: 'light' | 'dark', x: number, y: number) {
  if (!document.startViewTransition || reduced.matches) return apply(theme);
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-switching');
  const transition = document.startViewTransition(() => apply(theme));
  try {
    await transition.ready;
    root.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
    await transition.finished;
  } catch {
    // transition bị huỷ: theme đã được áp dụng trong callback
  } finally {
    root.classList.remove('theme-switching');
  }
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  button.addEventListener('click', (event) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const rect = button.getBoundingClientRect();
    // Phím Enter/Space cho clientX = 0: lấy tâm nút
    const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
    const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
    void setTheme(next, x, y);
  });
});
