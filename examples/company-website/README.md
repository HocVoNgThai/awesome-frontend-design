# Website công ty (landing page)

Website chính thức giới thiệu dịch vụ thiết kế và xây dựng website. Astro 7 (xuất tĩnh), CSS thuần, TypeScript cho vài đoạn script nhỏ.

## Chạy

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # kiểm tra tương phản + typecheck + build
npm run preview    # xem bản build
```

Yêu cầu Node 22.12 trở lên (Astro 7). Dự án có `.nvmrc` ghi Node 26: chạy `nvm use` trong thư mục dự án.

## Việc cần làm trước khi đưa lên chính thức

Toàn bộ nội dung nằm ở [src/data/site.ts](src/data/site.ts). Mọi mục đánh dấu `TODO` là thông tin chưa có:

- Tên công ty (`site.name`), tên miền (`site.url`, cả `astro.config.mjs` và `public/robots.txt`).
- Email, điện thoại, địa chỉ liên hệ. Trường nào để trống thì không hiển thị.
- `formEndpoint`: URL nhận biểu mẫu (POST JSON). Để trống thì biểu mẫu mở ứng dụng email của người dùng.
- Xác nhận lại danh sách dịch vụ, tiêu chuẩn kỹ thuật, công nghệ và câu hỏi thường gặp cho đúng thực tế công ty.
- Chưa có phần dự án tiêu biểu và logo khách hàng: thêm khi có dữ liệu thật, không dùng nội dung mẫu.
- Chưa có ảnh Open Graph (`og:image`) cho chia sẻ mạng xã hội.

## Cấu trúc

```
src/data/site.ts      nội dung
src/styles/           tokens.css, themes/dark.css, base.css
src/components/       mỗi section một component, CSS đi kèm
src/scripts/          theme.ts, ui.ts, figure.ts, form.ts (mỗi file dưới 3 KB)
scripts/              contrast.json + check-contrast.mjs, render-matrix.mjs
```

Xem [DESIGN.md](DESIGN.md) cho các quyết định thiết kế.
