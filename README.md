# TDTU IAM SYSTEM - MASTERPIECE LIQUID GLASS EDITION (2026)

Hệ thống Quản lý Định danh và Truy cập (IAM).
Thiết kế dựa trên ngôn ngữ Human Interface - iOS 26 Liquid Glass.


---

### 1. TÍNH NĂNG NỔI BẬT

#### 🎨 GIAO DIỆN & TRẢI NGHIỆM (UI/UX)
- Liquid Glass Architecture: Hiệu ứng kính lỏng, Blur cực sâu và Mesh Gradient chuyển động.
- Retina Clarity System: Độ tương phản cao, đảm bảo văn bản rõ nét trên cả Light và Dark Mode.
- Apple Squircle Design: Bo góc 50px chuẩn hình học Apple cho toàn bộ thẻ Card và nút bấm.
- Multi-Device Responsive: Tự động tối ưu giao diện, ẩn sidebar và thu nhỏ tiêu đề khi xem trên Mobile/Tablet.

#### 🛡️ CƠ CHẾ BẢO MẬT (SECURITY)
- Multi-Factor Authentication (2FA): Xác thực qua Google Authenticator bằng mã QR.
- Google OAuth2 Integration: Đăng nhập nhanh với tài khoản Google, nút bấm Pill-shape tự động thích ứng theme.
- Hardened Password Recovery: Quy trình khôi phục mật khẩu 3 bước, bắt buộc xác thực mã PIN trước khi đổi pass.
- Smart Input Validation:
  + Mã OTP/PIN bắt buộc đúng 6 chữ số mới cho xác thực.
- JWT Stateless Auth: Quản lý phiên làm việc bằng Token bảo mật.

---

### 2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

- Frontend: HTML5, CSS3 (Liquid Glass Logic), JavaScript ES6+.
- Backend: Node.js, Express.js.
- Database: MongoDB (Atlas).
- Libraries: SweetAlert2 (iOS Style), Bootstrap 5, Google GSI, Speakeasy.

---

### 3. HƯỚNG DẪN CÀI ĐẶT

#### Bước 1: Cấu hình file .env
Tạo file .env tại thư mục gốc và dán các thông số sau:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=410410827263-antql5c3aq2jtq67rgd3mj2ma58b7kop.apps.googleusercontent.com

#### Bước 2: Cài đặt thư viện
Gõ lệnh: npm install

#### Bước 3: Chạy dự án
Gõ lệnh: npm run dev (hoặc node server.js)

#### Bước 4: Mở kết nối Ngrok (Cho Demo Mobile)
Gõ lệnh: ngrok http 5000
Sau đó cập nhật link mới vào file index.html.

---

### 4. QUY TRÌNH DEMO CHUẨN (DÀNH CHO GIẢNG VIÊN)

1. TRÌNH DIỄN UI: Chuyển đổi giữa Light/Dark Mode để xem độ trong suốt của kính.
2. ĐĂNG KÝ & 2FA: Tạo tài khoản Gmail, quét mã QR bằng app Authenticator qua điện thoại và xác nhận mã PIN trong 30 giây mã PIN sẽ được cập nhật liên tục.
3. QUÊN MẬT KHẨU: Nhập Gmail -> Nhập mã PIN từ app điện thoại -> Đổi mật khẩu mới.
4. ĐĂNG NHẬP GOOGLE: Bấm nút Google Sign-In và nhận thông báo Authorized.

### 5. TÀI KHOẢN TEST (TESTING CREDENTIALS)
Để thuận tiện chấm điểm tính năng Phân quyền (RBAC), giảng viên vui lòng sử dụng tài khoản đã được phân quyền sẵn dưới đây:

* **Tài khoản Admin (Superadmin):**
  - Email: 524h0105@student.tdtu.edu.vn
  - Password: [123456]
  - Quyền hạn: Kích hoạt giao diện Admin Center, xem thống kê Server Load và bảng Security Audit Logs.

* **Tài khoản User:**
  - Email: 524h0102@student.tdtu.edu.vn
  - Password: [654321]
