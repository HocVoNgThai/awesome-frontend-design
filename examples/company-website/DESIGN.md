# Quyết định thiết kế

**Đọc đề:** website chính thức của một công ty thiết kế và làm web, cho chủ doanh nghiệp và người phụ trách marketing, phong cách bản vẽ kỹ thuật nghiêm túc, gần với bố cục biên tập kiểu Thụy Sĩ. Điều khách phải nhớ: công ty này làm việc có quy trình và liên hệ ở đâu. Nơi mang cá tính: hero (thanh trượt bản vẽ so với sản phẩm hoàn thiện). Phần còn lại giữ yên tĩnh.

**Dials:** VARIANCE 5, MOTION 5 (balanced), DENSITY 4.

## Hệ thống

| | Quyết định |
|---|---|
| Phông | Newsreader (hiển thị, chữ nghiêng cho phần nhấn), Inter Tight (nội dung), JetBrains Mono (thông số). Cả ba có subset tiếng Việt, tự lưu trữ qua Fontsource. |
| Màu | Một màu nhấn (đỏ cam) cho mỗi theme, một họ xám xanh lục. Sáng: `#c4331a`; tối: `#ff6b4a`. |
| Hình khối | Một bán kính 4px, không đổ bóng, đường kẻ mảnh và dấu ngắm ở góc section. |
| Theme | `:root[data-theme]`. Mặc định theo hệ thống, lựa chọn của người dùng được nhớ. Theme tối thiết kế riêng, không đảo màu. |
| Token | `tokens.css` (mặc định = sáng) và `themes/dark.css`. Component chỉ đọc token ngữ nghĩa. |

## Họ bố cục theo section (không lặp)

| Section | Họ |
|---|---|
| Hero | split (lead + thanh trượt) |
| Dịch vụ | index (dòng + metadata) |
| Quy trình | rail (cột dính + timeline) |
| Tiêu chuẩn | bento (6 mục, 6 ô) |
| Công nghệ | table (bảng thông số) |
| Hỏi đáp | stack |
| Liên hệ | strip (dải đảo màu) |

## Chuyển động (balanced, chính sách A: theo `prefers-reduced-motion`)

| Hiệu ứng | Lý do |
|---|---|
| Từ trong tiêu đề trượt lên một lần khi tải | thiết lập thứ tự đọc |
| Đường chia hero trượt một lần rồi dừng | cho người xem biết đây là thanh kéo |
| Đường kẻ dịch vụ, ô tiêu chuẩn hiện khi cuộn tới (CSS scroll-driven) | chỉ ra thứ tự, không cần JS |
| Mốc quy trình đổi màu khi tới giữa màn hình | báo tiến độ đọc |
| Đổi theme bằng vòng tròn mở rộng (View Transition) | phản hồi trực tiếp cho thao tác |

Tắt hết hiệu ứng thì mọi nội dung vẫn hiển thị đầy đủ. Không hiệu ứng nào dùng timer, không có vòng lặp vô hạn.

## Kiểm tra

`npm run check` chạy: tương phản (30 cặp màu, cả hai theme), `astro check`, build. `scripts/render-matrix.mjs` render theo trang x theme x viewport.
