// Toàn bộ nội dung hiển thị nằm ở file này để chủ website sửa mà không cần đụng vào giao diện.
// Mục đánh dấu TODO là thông tin chưa có: hãy thay bằng thông tin thật của công ty trước khi đưa lên chính thức.

export const site = {
  // TODO: tên công ty chính thức. Ký hiệu trên logo lấy từ chữ cái đầu của tên này.
  name: 'Tên Công Ty',
  // TODO: tên miền thật, đồng bộ với `site` trong astro.config.mjs.
  url: 'https://example.com',
  lang: 'vi',
  title: 'Thiết kế và xây dựng website cho doanh nghiệp',
  description:
    'Chúng tôi nhận thiết kế và lập trình website doanh nghiệp, landing page, website bán hàng và hệ thống web nội bộ: từ khảo sát, thiết kế đến vận hành.',
  contact: {
    // TODO: thông tin liên hệ thật.
    email: 'hello@example.com',
    phone: '',
    address: '',
    // TODO: nếu có dịch vụ nhận biểu mẫu (endpoint POST nhận JSON), điền URL vào đây.
    // Để trống thì biểu mẫu mở ứng dụng email của người dùng với nội dung đã soạn sẵn.
    formEndpoint: '',
  },
};

export const nav = [
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Quy trình', href: '#quy-trinh' },
  { label: 'Tiêu chuẩn', href: '#tieu-chuan' },
  { label: 'Công nghệ', href: '#cong-nghe' },
  { label: 'Hỏi đáp', href: '#hoi-dap' },
];

export const hero = {
  label: 'Thiết kế và phát triển website',
  // Mỗi phần tử là một từ; `em` đánh dấu từ nhấn mạnh (chữ nghiêng, cùng họ phông).
  headline: [
    [{ t: 'Thiết' }, { t: 'kế' }, { t: 'website' }, { t: 'đáng', em: true }, { t: 'tin', em: true }],
    [{ t: 'cho' }, { t: 'doanh' }, { t: 'nghiệp.' }],
  ],
  lead: 'Chúng tôi nhận thiết kế và lập trình website giới thiệu công ty, landing page, website bán hàng và hệ thống web nội bộ. Một đầu mối cho cả quy trình, từ khảo sát đến vận hành.',
  primary: { label: 'Liên hệ tư vấn', href: '#lien-he' },
  secondary: { label: 'Xem dịch vụ', href: '#dich-vu' },
};

// TODO: rà lại phạm vi dịch vụ cho đúng với năng lực thực tế của công ty.
export const services = [
  {
    title: 'Website giới thiệu doanh nghiệp',
    text: 'Trang chính thức trình bày năng lực, sản phẩm và thông tin liên hệ rõ ràng, nhất quán với nhận diện thương hiệu.',
    tags: 'Thiết kế · Lập trình · Quản trị nội dung',
  },
  {
    title: 'Landing page chiến dịch',
    text: 'Một trang, một mục tiêu: thu khách hàng tiềm năng hoặc giới thiệu một sản phẩm. Dựng nhanh và đo lường được.',
    tags: 'Thiết kế · Biểu mẫu · Theo dõi chuyển đổi',
  },
  {
    title: 'Website bán hàng',
    text: 'Danh mục sản phẩm, giỏ hàng, thanh toán và quản lý đơn hàng, tích hợp với quy trình bán hàng hiện có.',
    tags: 'Cửa hàng · Thanh toán · Quản lý đơn',
  },
  {
    title: 'Ứng dụng web và hệ thống nội bộ',
    text: 'Cổng khách hàng, trang quản trị và công cụ vận hành, có phân quyền, báo cáo và tích hợp dữ liệu.',
    tags: 'Phân quyền · Báo cáo · Tích hợp API',
  },
  {
    title: 'Thiết kế UI/UX và hệ thống thiết kế',
    text: 'Nghiên cứu người dùng, wireframe, giao diện chi tiết và bộ thành phần dùng lại để các trang sau luôn nhất quán.',
    tags: 'Wireframe · Giao diện · Thành phần',
  },
  {
    title: 'Bảo trì và vận hành',
    text: 'Cập nhật nội dung, vá lỗi, sao lưu và theo dõi hoạt động của website sau khi ra mắt.',
    tags: 'Cập nhật · Sao lưu · Giám sát',
  },
];

export const process = {
  title: 'Quy trình làm việc',
  lead: 'Mỗi bước có sản phẩm bàn giao cụ thể và một điểm để bạn duyệt trước khi sang bước tiếp theo.',
  steps: [
    {
      title: 'Khảo sát',
      text: 'Làm rõ mục tiêu kinh doanh, người dùng, nội dung hiện có và các ràng buộc kỹ thuật.',
      output: 'Tóm tắt dự án, phạm vi, cấu trúc trang',
    },
    {
      title: 'Thiết kế',
      text: 'Wireframe để thống nhất bố cục, sau đó là giao diện chi tiết cho máy tính và điện thoại. Bạn duyệt trước khi lập trình.',
      output: 'Wireframe, giao diện, bộ thành phần',
    },
    {
      title: 'Phát triển',
      text: 'Lập trình theo thiết kế đã duyệt, tách thành phần dùng lại, tối ưu tốc độ và khả năng truy cập ngay từ đầu.',
      output: 'Bản chạy thử trên môi trường staging',
    },
    {
      title: 'Kiểm thử và ra mắt',
      text: 'Kiểm tra trên các trình duyệt và thiết bị phổ biến, SEO kỹ thuật, biểu mẫu; sau đó đưa lên tên miền chính thức.',
      output: 'Website chính thức, danh sách kiểm tra',
    },
    {
      title: 'Bàn giao và vận hành',
      text: 'Hướng dẫn quản trị nội dung, bàn giao mã nguồn và tài liệu; hỗ trợ bảo trì khi bạn cần.',
      output: 'Mã nguồn, tài liệu, hướng dẫn quản trị',
    },
  ],
};

// TODO: các cam kết dưới đây là mô tả cách làm việc. Chủ website cần xác nhận trước khi công bố.
export const standards = {
  title: 'Tiêu chuẩn kỹ thuật',
  lead: 'Những thứ khách truy cập không nhìn thấy nhưng quyết định website có dùng tốt hay không. Chúng tôi kiểm tra từng mục trước khi bàn giao.',
  items: [
    {
      title: 'Hiển thị tốt trên mọi thiết bị',
      text: 'Thiết kế bắt đầu từ màn hình điện thoại rồi mở rộng, không cuộn ngang, nút bấm đủ lớn để chạm.',
      code: ['@media (min-width: 48rem) {', '  .layout { display: grid; }', '}'],
    },
    {
      title: 'Tải nhanh',
      text: 'Ảnh đúng kích thước và định dạng, phông chữ tự lưu trữ, hạn chế mã chạy ở trình duyệt.',
      code: ['<img src="cover.avif"', '  width="800" height="500"', '  loading="lazy" alt="…">'],
    },
    {
      title: 'Truy cập được cho mọi người',
      text: 'Tương phản màu, điều hướng bằng bàn phím và nhãn cho trình đọc màn hình được kiểm tra theo WCAG 2.2.',
      code: [':focus-visible {', '  outline: 2px solid;', '}'],
    },
    {
      title: 'Bàn giao đầy đủ',
      text: 'Bạn nhận mã nguồn và tài liệu vận hành, không bị khóa vào một nhà cung cấp.',
      code: ['├─ src/', '├─ docs/', '└─ README.md'],
    },
    {
      title: 'SEO kỹ thuật',
      text: 'Cấu trúc tiêu đề, thẻ mô tả, sitemap và dữ liệu có cấu trúc để công cụ tìm kiếm hiểu đúng nội dung.',
      code: ['<title>…</title>', '<link rel="canonical">', '<script type="application/ld+json">'],
    },
    {
      title: 'Bảo mật nền tảng',
      text: 'HTTPS, các header bảo mật, kiểm soát thư viện bên thứ ba và xử lý an toàn dữ liệu biểu mẫu.',
      code: ['Strict-Transport-Security:', '  max-age=63072000', 'X-Content-Type-Options: nosniff'],
    },
  ],
};

// TODO: cập nhật theo công nghệ công ty thực sự sử dụng.
export const stack = {
  title: 'Công nghệ',
  lead: 'Chúng tôi chọn công cụ theo bài toán của bạn, không theo thói quen. Dưới đây là những gì thường dùng.',
  groups: [
    { name: 'Giao diện', items: ['HTML', 'CSS', 'TypeScript', 'Astro', 'React'] },
    { name: 'Ứng dụng', items: ['Next.js', 'Node.js', 'PostgreSQL'] },
    { name: 'Nội dung', items: ['Markdown', 'Headless CMS'] },
    { name: 'Hạ tầng', items: ['Cloudflare', 'Vercel', 'Docker'] },
    { name: 'Chất lượng', items: ['Lighthouse', 'axe', 'Playwright'] },
  ],
};

// TODO: kiểm tra lại các câu trả lời cho khớp với chính sách thực tế của công ty.
export const faq = {
  title: 'Câu hỏi thường gặp',
  items: [
    {
      q: 'Một website mất bao lâu để hoàn thành?',
      a: 'Thời gian phụ thuộc vào phạm vi và tốc độ phản hồi nội dung từ phía bạn. Sau buổi khảo sát, chúng tôi gửi lộ trình với các mốc cụ thể.',
    },
    {
      q: 'Chi phí được tính như thế nào?',
      a: 'Theo phạm vi công việc: số trang, chức năng, tích hợp và mức độ tùy biến thiết kế. Báo giá được gửi bằng văn bản sau khảo sát, mỗi hạng mục được nêu rõ.',
    },
    {
      q: 'Tôi cần chuẩn bị gì trước khi bắt đầu?',
      a: 'Mục tiêu của website, tài liệu thương hiệu (logo, màu sắc) nếu có, cùng nội dung và hình ảnh hiện có. Phần còn thiếu chúng tôi sẽ cùng bạn xác định.',
    },
    {
      q: 'Ai sở hữu mã nguồn và tên miền?',
      a: 'Tên miền và tài khoản hosting được đăng ký dưới tên doanh nghiệp của bạn. Mã nguồn được bàn giao khi hoàn tất dự án theo hợp đồng.',
    },
    {
      q: 'Sau khi ra mắt có được hỗ trợ không?',
      a: 'Có gói bảo trì gồm cập nhật nội dung, vá lỗi, sao lưu và theo dõi hoạt động. Phạm vi và thời hạn hỗ trợ được thỏa thuận trong hợp đồng.',
    },
    {
      q: 'Tôi có thể tự chỉnh sửa nội dung không?',
      a: 'Có, nếu dự án dùng hệ thống quản trị nội dung. Chúng tôi hướng dẫn người quản trị của bạn khi bàn giao.',
    },
  ],
};

export const contact = {
  title: 'Cho chúng tôi biết bạn cần gì',
  lead: 'Mô tả ngắn về dự án là đủ để bắt đầu. Chúng tôi phản hồi để hẹn buổi khảo sát đầu tiên.',
  types: [
    'Website giới thiệu doanh nghiệp',
    'Landing page',
    'Website bán hàng',
    'Ứng dụng web / hệ thống nội bộ',
    'Thiết kế lại website hiện có',
    'Khác',
  ],
};
