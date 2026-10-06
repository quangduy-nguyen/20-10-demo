# 🌸 Thiệp Mừng 20/10 Online Cá Nhân Hóa (Vietnamese Women's Day)

Dự án thiệp điện tử chúc mừng ngày Phụ nữ Việt Nam 20/10 cá nhân hóa gửi tới **30 chị em** trong công ty. Thiết kế sang trọng, hiện đại, tối ưu 100% hiển thị trên điện thoại và máy tính, sẵn sàng import lên **GitHub** và deploy lên **Vercel** hoàn toàn miễn phí.

---

## ✨ Các Tính Năng Đã Tích Hợp

1. **Cá nhân hóa 30 người nhận**:
   - Link thiệp riêng biệt cho từng người theo định dạng: `https://ten-mien-cua-ban.vercel.app/?id=chi_lan`, `?id=em_mai`, ...
   - Hiển thị ảnh đại diện, họ tên, chức danh, lời chúc riêng biệt lấy từ bảng dữ liệu.
   - Thơ 4 câu sáng tác riêng theo tên và phòng ban cho từng chị em.
   - Tích hợp thanh chọn nhanh (Dropdown & Nút Trước/Sau) để Ban Tổ Chức dễ dàng duyệt và kiểm tra 30 người nhận mà không cần đổi URL thủ công.

2. **Hiệu ứng phong bì thư & Âm thanh**:
   - Mở màn bằng phong bì thư 3D sang trọng với con dấu sáp đỏ niêm phong mang tên người nhận.
   - Khi bấm "Mở Thiệp": Hiệu ứng pháo hoa rực rỡ (*Canvas Confetti*), cánh hoa hồng bay lơ lửng, và nhạc nền acoustic lãng mạn tự động phát.
   - Nút bật/tắt nhạc đĩa than quay nhẹ nhàng ở góc màn hình.

3. **Bài hát AI theo tên & Video chúc mừng**:
   - Nút *"Bài Hát AI Theo Tên"*: Popup xem lời bài hát AI sáng tác riêng cho người nhận, bản nghe thử và Prompt tạo nhạc trên **Suno AI** / **Udio**.
   - Nút *"Xem Video Lời Chúc"*: Popup xem video lời chúc mừng từ đồng nghiệp.

4. **Thư mời dự tiệc & Link Google Maps**:
   - Địa điểm: **Nhà hàng Maison Sen Buffet** (61 Trần Hưng Đạo, P. Phan Chu Trinh, Q. Hoàn Kiếm, Hà Nội).
   - Thời gian: **18:30 - Thứ Ba, ngày 20/10/2026**.
   - Nút dẫn trực tiếp tới vị trí nhà hàng trên ứng dụng/trình duyệt Google Maps.

5. **Shortcut nhắc hẹn đa nền tảng**:
   - 📅 **Google Calendar**: 1 chạm tạo sự kiện tự động điền sẵn giờ, địa chỉ, trang phục, link thiệp.
   - 🍏 **Apple / Outlook Calendar**: Tải file `.ics` chuẩn quốc tế, mở là tự thêm vào ứng dụng Lịch trên iPhone/Mac/Windows.
   - 💬 **Nhắc hẹn qua Zalo**: Tự động định dạng tin nhắn đẹp mắt và sao chép vào khay nhớ tạm để gửi vào nhóm Zalo.

6. **Khảo sát & Xác nhận tham dự (RSVP Poll)**:
   - Các lựa chọn: *Chắc chắn tham gia* / *Đang sắp xếp (50/50)* / *Bận việc đột xuất* kèm ô ghi chú lời nhắn/món ăn.
   - Lưu trữ tự động trên máy và hiển thị biểu đồ phần trăm thống kê trực quan.
   - Tích hợp sẵn mã Webhook kết nối Google Sheets (xem hướng dẫn bên dưới).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
thiep-20-10/
├── index.html                  # Giao diện chính (Single Page Web App)
├── style.css                   # Hiệu ứng chuyển động, cánh hoa rơi, tone màu Rose Gold
├── app.js                      # Logic xử lý cá nhân hóa, âm nhạc, lịch, khảo sát RSVP
├── data.js                     # Dữ liệu 30 chị em và thông tin sự kiện tiệc
├── DanhSach_30_ChiEm.csv       # File bảng tính gốc 30 chị em (CSV)
├── DanhSach_30_ChiEm.xlsx      # File bảng tính gốc 30 chị em (Excel)
├── update_data_from_csv.py     # Script Python tự động chuyển CSV -> data.js
├── google-apps-script.js       # Code Apps Script để lưu kết quả Poll vào Google Sheets
├── vercel.json                 # Cấu hình tối ưu khi deploy trên Vercel
├── .gitignore                  # Bỏ qua file rác của hệ thống (.DS_Store)
└── README.md                   # Hướng dẫn chi tiết
```

---

## 🚀 Hướng Dẫn Import Lên GitHub & Deploy Lên Vercel

### Bước 1: Đẩy mã nguồn lên GitHub

Mở Terminal trên máy tính tại thư mục dự án và chạy các lệnh:

```bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm toàn bộ file vào git
git add .

# 3. Tạo commit đầu tiên
git commit -m "Khoi tao thiep 20-10 ca nhan hoa cho 30 chi em"

# 4. Đổi nhánh chính thành main
git branch -M main

# 5. Liên kết tới repository GitHub của bạn (thay URL bên dưới bằng repo của bạn)
git remote add origin https://github.com/Tên_Tài_Khoản_Của_Bạn/thiep-20-10.git

# 6. Đẩy code lên GitHub
git push -u origin main
```

*(Nếu chưa tạo repo trên GitHub, hãy vào [github.com/new](https://github.com/new) tạo 1 repo mới với tên `thiep-20-10`, để chế độ Public hoặc Private đều được).*

---

### Bước 2: Deploy lên Vercel trong 1 phút (Miễn phí 100%)

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub của bạn.
2. Bấm nút **"Add New..."** -> Chọn **"Project"**.
3. Tại danh sách repository, tìm repo **`thiep-20-10`** và bấm **"Import"**.
4. Ở màn hình cấu hình:
   - **Framework Preset**: Để nguyên `Other` (hoặc Vercel tự nhận diện Static HTML).
   - **Root Directory**: `./` (để mặc định).
   - Không cần cấu hình thêm Build Command hay Environment Variables.
5. Bấm **"Deploy"**.
6. Sau khoảng 20 - 30 giây, Vercel sẽ cấp cho bạn một đường link chính thức (Ví dụ: `https://thiep-20-10-xyz.vercel.app`).

---

## 🎯 Cách Test Demo & Gửi Cho Từng Chị Em

Khi đã có link trên Vercel (hoặc khi test local mở `index.html` trên trình duyệt):

1. **Truy cập thử từng người bằng tham số `?id=...`**:
   - Chị Lan: `https://thiep-20-10-xyz.vercel.app/?id=chi_lan`
   - Em Mai: `https://thiep-20-10-xyz.vercel.app/?id=em_mai`
   - Chị Hương: `https://thiep-20-10-xyz.vercel.app/?id=chi_huong`
   - *(Xem toàn bộ danh sách 30 ID trong file `DanhSach_30_ChiEm.csv`)*.

2. **Dùng thanh công cụ Test trên cùng**:
   - Ở đầu trang có sẵn thanh chọn tên nhanh của 30 chị em.
   - Bấm nút **"Sao chép link cá nhân"** để lấy ngay đường link chuẩn xác gửi vào Zalo/Slack cho từng người!

---

## 🎵 Hướng Dẫn Sáng Tác Nhạc AI Theo Tên Từng Chị (Suno AI)

Nếu bạn muốn tạo bài hát thực sự có nhắc đến tên từng chị em để tạo bất ngờ:

1. Truy cập **[Suno.com](https://suno.com)** (Đăng ký tài khoản miễn phí được tặng credits tạo nhạc mỗi ngày).
2. Bấm vào mục **Create** (Bật chế độ **Custom Mode**).
3. **Phần Lyrics (Lời bài hát)**: Dán đoạn thơ hoặc lời bài hát trong file `data.js` (hoặc popup thiệp).
   *Ví dụ:*
   ```text
   [Verse 1]
   Sớm mai gió khẽ lay ngàn cành hoa,
   Chị Lan mỉm cười rạng rỡ nét kiêu sa.
   Kế toán chuyên cần, tâm sáng nụ cười duyên,
   Tháng Mười gửi trọn khúc ca bình yên!
   
   [Chorus]
   Chúc chị luôn xinh tươi, cuộc sống ngọt ngào,
   Ngập tràn hạnh phúc, thắm đượm ước ao!
   ```
4. **Phần Style of Music**: Điền `Vietnamese Pop Acoustic, warm joyful, female voice, sweet piano`.
5. **Title**: Điền `Mừng 20-10 Chị Lan`.
6. Bấm **Create**: Sau 1 phút, Suno sẽ tạo ra 2 bài hát hoàn chỉnh. Bạn có thể tải file `.mp3` về hoặc lấy link bài hát dán vào trường `audio_url` trong `data.js`.

---

## 📊 Hướng Dẫn Kết Nối Khảo Sát (RSVP) Với Google Sheets

Mặc định form khảo sát đã lưu trên bộ nhớ trình duyệt để bạn test thử. Để câu trả lời của 30 chị em tự động đổ về file Excel Google Drive:

1. Mở file hướng dẫn `google-apps-script.js` trong thư mục này.
2. Làm theo 3 bước cực kỳ đơn giản để tạo Webhook từ Google Sheets.
3. Dán đường link Webhook nhận được vào dòng số 9 của file `app.js`:
   ```javascript
   const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Đẩy lại code lên GitHub (`git add . && git commit -m "Ket noi Google Sheets" && git push`), Vercel sẽ tự động cập nhật ngay lập tức!

---

## ✏️ Hướng Dẫn Chỉnh Sửa Dữ Liệu Hoặc Thay Đổi Nhà Hàng

- **Nếu muốn sửa tên/lời chúc/link ảnh**:
  Mở file `DanhSach_30_ChiEm.csv`, sửa nội dung và lưu lại. Sau đó mở Terminal chạy:
  ```bash
  python3 update_data_from_csv.py
  ```
  File `data.js` sẽ tự động cập nhật ngay lập tức.
- **Nếu muốn đổi nhà hàng khác**:
  Mở file `data.js`, sửa các trường `location_name`, `location_address`, và `google_maps_url` trong đối tượng `EVENT_INFO`.

Chúc bạn và tập thể có một ngày lễ 20/10 thật trọn vẹn, ý nghĩa và ngập tràn niềm vui! 🌸
