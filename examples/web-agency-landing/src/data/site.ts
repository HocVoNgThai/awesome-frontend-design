// All visible copy lives here. Fictional studio for testing the awesome-frontend-design skills.
// TODO markers = facts the real company must supply. Nothing below is a real client, metric or price.
export const site = {
  name: 'Xưởng Web',
  url: 'https://example.com', // TODO: real domain
  email: 'hello@example.com', // TODO: real email
  title: 'Xưởng Web · Studio làm website cho doanh nghiệp nhỏ',
  description:
    'Thiết kế và lập trình landing page, website doanh nghiệp và ứng dụng web. Nhanh, dễ đọc trên điện thoại, mã nguồn thuộc về bạn.',
  cta: 'Nhận báo giá',
};

export const nav = [
  { href: '#dich-vu', label: 'Dịch vụ' },
  { href: '#quy-trinh', label: 'Quy trình' },
  { href: '#goi', label: 'Các gói' },
  { href: '#hoi-dap', label: 'Hỏi đáp' },
];

export const services = [
  { name: 'Landing page', text: 'Một trang, một mục tiêu: nhận liên hệ hoặc đơn hàng.', tags: ['Astro', 'HTML · CSS'] },
  { name: 'Website doanh nghiệp', text: 'Nhiều trang, tự cập nhật nội dung, chuẩn SEO cơ bản, đa ngôn ngữ khi cần.', tags: ['Astro', 'CMS'] },
  { name: 'Ứng dụng web', text: 'Đăng nhập, phân quyền, bảng điều khiển và kết nối dữ liệu của bạn.', tags: ['Next.js', 'TypeScript', 'Node'] },
  { name: 'Làm lại và tăng tốc', text: 'Giữ nội dung đang có, thay phần thiết kế và mã chạy chậm.', tags: ['Audit', 'Lighthouse'] },
  { name: 'Bảo trì', text: 'Cập nhật, sao lưu và theo dõi lỗi sau khi ra mắt.', tags: ['Theo tháng'] },
];

export const steps = [
  { name: 'Hiểu mục tiêu', text: 'Một buổi trao đổi để chốt người xem là ai và họ cần làm gì sau khi đọc trang.' },
  { name: 'Phác cấu trúc', text: 'Dựng khung trang bằng nội dung thật trước, hình ảnh sau. Bạn duyệt khung rồi mới đến màu sắc.' },
  { name: 'Thiết kế và lập trình', text: 'Bản chạy thử có đường dẫn để bạn mở trên điện thoại và góp ý ngay.' },
  { name: 'Bàn giao', text: 'Mã nguồn, tài khoản hosting đứng tên bạn, hướng dẫn sửa nội dung và theo dõi sau ra mắt.' },
];

export const promises = [
  'Mã nguồn và tài khoản hosting đứng tên bạn.',
  'Đọc tốt ở 360 px, dùng được bằng bàn phím, tương phản đạt chuẩn.',
  'Tốc độ là yêu cầu: đo bằng Lighthouse trước khi bàn giao.',
  'Sửa nội dung không cần lập trình viên.',
];

export const packages = [
  {
    name: 'Landing',
    fit: 'Chiến dịch, sản phẩm mới, một dịch vụ cần nhận liên hệ.',
    scope: 'Một trang, biểu mẫu liên hệ, đo lường cơ bản.',
    time: 'TODO: xác nhận thời gian',
    price: 'TODO: báo giá',
  },
  {
    name: 'Website',
    fit: 'Doanh nghiệp cần giới thiệu dịch vụ, bài viết và nhiều trang.',
    scope: 'Nhiều trang, quản lý nội dung, SEO cơ bản, đa ngôn ngữ tuỳ chọn.',
    time: 'TODO: xác nhận thời gian',
    price: 'TODO: báo giá',
  },
  {
    name: 'Ứng dụng web',
    fit: 'Cần đăng nhập, phân quyền, dữ liệu riêng hoặc quy trình nội bộ.',
    scope: 'Giao diện, API, cơ sở dữ liệu, phân quyền, bảng điều khiển.',
    time: 'TODO: xác nhận thời gian',
    price: 'TODO: báo giá',
  },
];

export const faq = [
  { q: 'Mã nguồn thuộc về ai?', a: 'Thuộc về bạn. Chúng tôi bàn giao toàn bộ mã nguồn và để tên miền, hosting đứng tên bạn.' },
  { q: 'Tôi cần chuẩn bị gì?', a: 'Mục tiêu của trang, nội dung đang có (dù còn thô), logo và ví dụ vài trang bạn thích. Phần còn lại chúng tôi hỏi trong buổi đầu.' },
  { q: 'Có hỗ trợ sau khi ra mắt không?', a: 'Có. Lỗi phát sinh do chúng tôi được sửa miễn phí trong thời gian bảo hành. Sau đó bạn có thể chọn gói bảo trì theo tháng.' },
  { q: 'Tôi đang dùng WordPress, có làm lại được không?', a: 'Được. Tuỳ bài toán, chúng tôi làm lại giao diện trên nền hiện có hoặc chuyển sang nền gọn hơn. Chúng tôi chọn công cụ theo mục tiêu, không theo thói quen.' },
  { q: 'Website có hiển thị tốt bằng tiếng Việt và nhiều ngôn ngữ không?', a: 'Có. Phông chữ được kiểm tra đủ dấu tiếng Việt, và cấu trúc trang hỗ trợ thêm ngôn ngữ khác khi cần.' },
];
