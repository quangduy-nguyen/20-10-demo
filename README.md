# 🌸 Thiệp Mừng 20/10 Online Cá Nhân Hóa (Bản Nâng Cấp Tinh Chỉnh)

Mã nguồn thiệp điện tử chúc mừng ngày Phụ nữ Việt Nam 20/10 gửi tới **30 chị em** trong công ty. Thiết kế theo phong cách hiện đại, sang trọng, tối ưu hiển thị trên điện thoại và máy tính.

---

## 🌟 Các Thay Đổi & Cải Tiến Mới Nhất

1. **Hiệu ứng phong bao 3D Pop-up**:
   - Khi người nhận nhấp vào link, trang web sẽ hiển thị **hình ảnh phong bao đựng thiệp sang trọng** có con dấu sáp niêm phong in tên người nhận.
   - Khi nhấp vào mở thiệp: Nắp phong bao lật mở 3D, tấm thiệp từ bên trong trượt (pop-up) ra ngoài kèm pháo hoa confetti và nhạc nền acoustic tự động phát, sau đó chuyển cảnh mượt mà vào nội dung thiệp đầy đủ.

2. **Lời chúc chân thực từ bảng dữ liệu**:
   - Sử dụng 100% lời chúc chân thành đã viết sẵn trong sheet cho từng chị em.
   - Đã loại bỏ hoàn toàn các phần video AI, thơ AI và bài hát AI theo yêu cầu.

3. **Thư mời tiệc & Lời nhắc**:
   - Phần nhắc hẹn đổi tiêu đề thành **"Lời nhắc"** gọn gàng.
   - Tích hợp duy nhất nút **"Thêm vào Google Calendar"** (1 chạm lưu lịch kèm thời gian, địa điểm, link bản đồ).

4. **Xác nhận tham dự (2 Lựa chọn)**:
   - Đã bỏ tiêu đề "Khảo Sát & Xác Nhận (RSVP)".
   - Chỉ gồm đúng 2 lựa chọn rõ ràng:
     - 🌸 **Sẽ tham dự**
     - 🍂 **Không tham dự**
   - Ô lời nhắn gửi đến Ban Tổ Chức (optional) + Nút gửi xác nhận.

5. **Bảo mật & Theo dõi số liệu riêng cho Ban Tổ Chức**:
   - **Người nhận**: Hoàn toàn không xem được danh sách hay thiệp của nhau. Mỗi người chỉ thấy thiệp của riêng mình qua link cá nhân.
   - Đã **bỏ phần thống kê poll trên thiệp**, người nhận không thấy số liệu.
   - **Ban Tổ Chức**:
     - Có sẵn file **`TheoDoi_ThamDu_20_10.csv`** để theo dõi trên máy tính hoặc import vào Google Sheets / Excel.
     - Trang **`admin.html`**: Trang quản trị riêng cho BTC để copy nhanh link gửi Zalo cho từng người và xem thống kê ai đã bấm "Sẽ tham dự" / "Không tham dự".
     - File **`google-apps-script.js`**: Hướng dẫn 3 bước để đồng bộ câu trả lời trực tiếp về Google Sheet riêng của bạn theo thời gian thực.

---

## 📂 Danh Sách File Trong Dự Án

- `index.html`: Giao diện thiệp chính (phong bao 3D + thiệp chúc mừng).
- `style.css`: Hiệu ứng nắp phong bao lật mở 3D, thiệp trượt pop-up, cánh hoa rơi.
- `app.js`: Logic cá nhân hóa theo `?id=...`, Google Calendar, gửi xác nhận.
- `data.js`: Dữ liệu 30 chị em và thông tin nhà hàng Maison Sen Buffet (Hà Nội).
- `admin.html`: Trang quản lý riêng của Ban Tổ Chức để copy link và theo dõi phản hồi.
- `TheoDoi_ThamDu_20_10.csv`: Bảng theo dõi điểm danh 30 chị em (dành cho BTC).
- `google-apps-script.js`: Script kết nối form với Google Sheets.
- `vercel.json`: Cấu hình tối ưu Vercel.

---

## 🚀 Hướng Dẫn Tải Lại Lên GitHub Để Vercel Tự Động Cập Nhật

1. Truy cập repo của bạn trên GitHub: `https://github.com/quangduy-nguyen/20-10-demo`
2. Bấm nút **"Add file"** ở góc phải danh sách file ➔ Chọn **"Upload files"**.
3. Kéo các file vừa được chỉnh sửa vào:
   - `index.html`
   - `style.css`
   - `app.js`
   - `admin.html`
   - `TheoDoi_ThamDu_20_10.csv`
   - `google-apps-script.js`
   - `README.md`
4. Cuộn xuống bấm nút xanh **"Commit changes"**.
5. **Vercel sẽ tự động cập nhật trang web sau 15-20 giây!**
