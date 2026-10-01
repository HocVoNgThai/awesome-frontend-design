// Menu di động (details) và đánh dấu mục điều hướng của phần đang xem.
const menu = document.querySelector<HTMLDetailsElement>('[data-menu]');

if (menu) {
  const close = () => {
    menu.open = false;
  };
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      close();
      menu.querySelector('summary')?.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target as Node)) close();
  });
}

const links = new Map<string, HTMLAnchorElement[]>();
document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]').forEach((a) => {
  const id = a.getAttribute('href')!.slice(1);
  links.set(id, [...(links.get(id) ?? []), a]);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((anchors, id) => {
          anchors.forEach((a) => {
            if (id === entry.target.id) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

// Chọn sẵn loại dự án khi bấm vào một dịch vụ
document.querySelectorAll<HTMLAnchorElement>('[data-type]').forEach((a) => {
  a.addEventListener('click', () => {
    const select = document.querySelector<HTMLSelectElement>('#f-type');
    const type = a.dataset.type;
    if (select && type && [...select.options].some((o) => o.value === type)) select.value = type;
  });
});
