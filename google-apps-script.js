/**
 * GOOGLE APPS SCRIPT THEO DÕI XÁC NHẬN THAM DỰ 20/10
 * 
 * HƯỚNG DẪN 3 BƯỚC ĐỂ LƯU KẾT QUẢ VÀO GOOGLE SHEET RIÊNG CỦA BẠN:
 * 
 * 1. Tạo 1 file Google Sheet mới trên Google Drive của bạn (ví dụ đặt tên: "Theo_Doi_Tham_Du_20_10")
 *    - Dòng 1 tạo các cột tiêu đề:
 *      A1: Thời Gian | B1: ID | C1: Họ Tên | D1: Chức Danh | E1: Xác Nhận Tham Dự | F1: Lời Nhắn
 * 
 * 2. Vào menu "Tiện ích mở rộng" (Extensions) -> "Apps Script"
 *    - Xóa hết code cũ và dán toàn bộ đoạn code dưới đây vào. Bấm Lưu (Ctrl + S hoặc Cmd + S).
 * 
 * 3. Bấm nút xanh "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment):
 *    - Loại: "Ứng dụng web" (Web app)
 *    - Thực thi dưới dạng: "Tôi" (Me)
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone)
 *    - Nhấn "Triển khai" và sao chép đường link Web App URL (có đuôi /exec).
 *    - Mở file app.js, dán link URL đó vào biến GOOGLE_SHEET_WEBHOOK_URL ở dòng 7.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var time = data.timestamp || new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    var id = data.id || "";
    var name = data.ho_ten || "";
    var title = data.chuc_danh || "";
    var status = data.status || ""; // "Sẽ tham dự" hoặc "Không tham dự"
    var note = data.note || "";
    
    // Ghi một dòng mới vào Google Sheet
    sheet.appendRow([time, id, name, title, status, note]);
    
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
    .createTextOutput("Webhook theo dõi 20/10 đang hoạt động bình thường!")
    .setMimeType(ContentService.MimeType.TEXT);
}
