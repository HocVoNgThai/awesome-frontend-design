# Awesome Frontend Design (Tiếng Việt)

Bộ skill mã nguồn mở cho AI agent, chuyên **thiết kế frontend**: UI/UX, layout, hệ thống theme và hiệu ứng/hoạt ảnh.
Được đúc kết từ website thật đang chạy (4 theme, 4 ngôn ngữ, CSP chặt) và tổng quát hoá để dùng cho cả app có backend.

English: [README.md](README.md)

## Tính năng

- Chọn **static** (landing page, portfolio, blog, docs) hoặc **app** (từ CRUD đơn giản đến dashboard multi-tenant phức tạp).
- Chọn mức hiệu ứng: `calm` (ít), `balanced` (vừa), `expressive` (nhiều).
- Chọn stack: **Astro** hoặc HTML/CSS thuần cho static; **Next.js + TypeScript + Tailwind + shadcn/ui** hoặc **Vite + React + Node API** cho app.
- **Phong cách signature** (tuỳ chọn): một DNA công nghiệp, bốn theme đổi cả cấu trúc trang chứ không chỉ đổi màu.
- Chạy với **Claude Code, Codex, Gemini CLI, Antigravity, Cursor, Copilot, OpenCode, Windsurf** và mọi agent đọc thư mục `SKILL.md`.
  Có bản gộp một file cho ChatGPT và các giao diện chat.

## Cài đặt

Khuyến nghị, dùng cho mọi agent:

```bash
npx skills add HocVoNgThai/awesome-frontend-design
```

Chỉ cài một skill:

```bash
npx skills add HocVoNgThai/awesome-frontend-design --skill afd-motion
```

Trình cài đặt có sẵn (không phụ thuộc gói ngoài, Node 18+):

```bash
npx github:HocVoNgThai/awesome-frontend-design init --ai claude,codex,gemini,antigravity
npx github:HocVoNgThai/awesome-frontend-design init --ai claude --global
```

ChatGPT / Gemini web: dán nội dung [`bundles/awesome-frontend-design.md`](bundles/awesome-frontend-design.md) vào custom instructions hoặc project knowledge.

## Cách dùng

```text
Dùng awesome-frontend-design. Static, expressive, 4 theme, style signature. Làm portfolio cho kỹ sư bảo mật.
Dùng awesome-frontend-design: app-simple. Dashboard hoá đơn bằng Next.js, shadcn, ít hiệu ứng.
Dùng awesome-frontend-design: static-calm. Landing page cho một CLI tool, Astro, không thư viện animation.
Dùng awesome-frontend-design: app-dashboard, backend complex, admin multi-tenant. Calm, dày thông tin, ưu tiên bàn phím.
Review UI bằng afd-ui-review.
```

Nếu bạn không nói rõ, agent tự đoán từ repo (`astro.config`, `next.config`, `components.json`) và hỏi tối đa ba câu.

## Bên trong có gì

| Skill | Vai trò |
|---|---|
| `awesome-frontend-design` | Điểm vào: xác định option, điều hướng sang skill khác |
| `afd-design-direction` | Design read, dials, màu, chữ, layout, copy, quét dấu hiệu "AI-made", style signature |
| `afd-motion` | Ba mức hiệu ứng, quy tắc dễ chịu cho mắt, recipe CSS/JS nhỏ, chính sách dùng thư viện |
| `afd-theme-systems` | Token, dark mode, theme đổi cấu trúc, init không nháy, kiểm tra contrast |
| `afd-static-sites` | Trang Astro/HTML: landing, portfolio, blog, docs; hiệu năng, SEO, i18n, CSP |
| `afd-app-frontend` | Next.js + shadcn hoặc Vite + Node; state, form, dữ liệu, độ phức tạp backend |
| `afd-ui-review` | Cổng kiểm tra, script render matrix, checklist theo mức ưu tiên |

## Đóng góp và giấy phép

Xem [CONTRIBUTING.md](CONTRIBUTING.md). Giấy phép [MIT](LICENSE).
