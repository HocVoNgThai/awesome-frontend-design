// Thanh trượt so sánh bản vẽ và sản phẩm hoàn thiện. Điều khiển bằng <input type="range"> nên dùng được cả bàn phím.
const figure = document.querySelector<HTMLElement>('[data-figure]');
const input = figure?.querySelector<HTMLInputElement>('input[type="range"]');

function describe(value: number) {
  if (value <= 4) return 'Hiển thị toàn bộ sản phẩm hoàn thiện';
  if (value >= 96) return 'Hiển thị toàn bộ bản vẽ';
  return `Bản vẽ ${value}%, hoàn thiện ${100 - value}%`;
}

if (figure && input) {
  const update = () => {
    const value = Number(input.value);
    figure.style.setProperty('--pos', `${value}%`);
    input.setAttribute('aria-valuetext', describe(value));
  };
  input.addEventListener('input', () => {
    figure.classList.remove('intro');
    update();
  });
  update();
}
