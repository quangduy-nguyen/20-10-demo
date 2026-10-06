/**
 * GOOGLE APPS SCRIPT ĐỒNG BỘ KHẢO SÁT THAM DỰ 20/10 VÀO GOOGLE SHEETS
 * 
 * HƯỚNG DẪN 3 BƯỚC CÀI ĐẶT:
 * 1. Tạo 1 Google Sheet mới trên Google Drive, đặt tên "Diem_Danh_Tham_Du_20_10"
 *    Tạo các tiêu đề cột ở dòng 1:
 *    [A1: Thời Gian] | [B1: Mã ID] | [C1: Họ Tên] | [D1: Chức Danh] | [E1: Trạng Thái] | [F1: Ghi Chú / Lời Nhắn]
 * 
 * 2. Vào menu "Tiện ích mở rộng" (Extensions) -> "Apps Script"
 *    Xóa hết code mặc định và dán toàn bộ đoạn code dưới đây vào. Nhấn Save (Ctrl+S).
 * 
 * 3. Nhấn nút "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment)
 *    - Loại triển khai: "Ứng dụng web" (Web app)
 *    - Thực thi dưới dạng: "Tôi" (Me)
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone)
 *    - Nhấn "Triển khai" và sao chép đường link URL ứng dụng web (có đuôi /exec).
 *    - Mở file app.js, dán URL này vào biến GOOGLE_SHEET_WEBHOOK_URL.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var time = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    var id = data.id || "";
    var name = data.ho_ten || "";
    var title = data.chuc_danh || "";
    var status = data.status || "";
    var note = data.note || "";
    
    var statusText = "Tham gia";
    if (status === "maybe") statusText = "Đang sắp xếp (50/50)";
    if (status === "no") statusText = "Bận việc";
    
    // Ghi dòng mới vào sheet
    sheet.appendRow([time, id, name, title, statusText, note]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Webhook khảo sát 20/10 đang hoạt động tốt!")
    .setMimeType(ContentService.MimeType.TEXT);
}
