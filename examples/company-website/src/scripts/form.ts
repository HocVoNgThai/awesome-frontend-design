// Biểu mẫu liên hệ. Có `data-endpoint` thì gửi JSON tới đó; không có thì soạn sẵn email (mailto).
// Kiểm tra bằng Constraint Validation API, hiển thị lỗi tiếng Việt cạnh từng trường.
const form = document.querySelector<HTMLFormElement>('[data-form]');

if (form) {
  form.noValidate = true;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = button.querySelector<HTMLElement>('[data-label]')!;
  const endpoint = form.dataset.endpoint ?? '';
  const email = form.dataset.email ?? '';

  const messages = (field: HTMLInputElement | HTMLTextAreaElement): string => {
    const v = field.validity;
    if (v.valueMissing) return 'Vui lòng điền thông tin này.';
    if (v.typeMismatch) return 'Email chưa đúng định dạng, ví dụ: ten@congty.vn.';
    if (v.tooShort) return `Hãy mô tả thêm, tối thiểu ${field.minLength} ký tự.`;
    return 'Giá trị chưa hợp lệ.';
  };

  const errorOf = (field: Element) => document.getElementById(field.getAttribute('aria-describedby') ?? '');

  const clear = (field: Element) => {
    field.removeAttribute('aria-invalid');
    const error = errorOf(field);
    if (error) error.textContent = '';
  };

  form.addEventListener('input', (event) => {
    const target = event.target as Element;
    if (target.hasAttribute('aria-invalid')) clear(target);
  });

  const say = (text: string, state: 'ok' | 'error') => {
    status.dataset.state = state;
    status.textContent = text;
  };

  const sayFallback = () => {
    if (!email) return;
    status.append(' Nếu không có gì xảy ra, hãy gửi trực tiếp tới ');
    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.textContent = email;
    status.append(a, '.');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[aria-describedby]')];
    let first: HTMLElement | null = null;
    for (const field of fields) {
      clear(field);
      if (!field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
        const error = errorOf(field);
        if (error) error.textContent = messages(field);
        first ??= field;
      }
    }
    if (first) {
      say('Vui lòng kiểm tra các trường được đánh dấu.', 'error');
      first.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) {
      // Bẫy bot bị điền: giả vờ thành công, không gửi gì cả
      say('Cảm ơn bạn. Chúng tôi sẽ phản hồi sớm.', 'ok');
      return;
    }

    if (endpoint) {
      button.disabled = true;
      label.textContent = 'Đang gửi…';
      status.textContent = '';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, type: data.type, message: data.message }),
        });
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        say('Cảm ơn bạn. Chúng tôi đã nhận được yêu cầu và sẽ phản hồi sớm.', 'ok');
      } catch {
        say('Chưa gửi được yêu cầu. Vui lòng thử lại.', 'error');
        sayFallback();
      } finally {
        button.disabled = false;
        label.textContent = 'Gửi yêu cầu';
      }
      return;
    }

    // Không có endpoint: mở ứng dụng email với nội dung đã soạn
    const body = [
      `Họ và tên: ${data.name}`,
      `Email: ${data.email}`,
      ...(data.phone ? [`Số điện thoại: ${data.phone}`] : []),
      `Loại dự án: ${data.type}`,
      '',
      data.message,
    ].join('\n');
    const subject = `Yêu cầu tư vấn: ${data.type}`;
    say('Đang mở ứng dụng email của bạn. Hãy bấm gửi trong đó để hoàn tất.', 'ok');
    sayFallback();
    location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
