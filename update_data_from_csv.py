#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Công cụ tự động đồng bộ từ file DanhSach_30_ChiEm.csv sang data.js
Chạy lệnh: python3 update_data_from_csv.py
"""

import csv
import json
import os

def clean_key(k):
    return k.replace('\ufeff', '').strip()

csv_file = 'DanhSach_30_ChiEm.csv'
if not os.path.exists(csv_file):
    print(f"❌ Không tìm thấy file {csv_file}")
    exit(1)

with open(csv_file, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    recipients = []
    for row in reader:
        cleaned = {clean_key(k): v.strip() for k, v in row.items()}
        recipients.append(cleaned)

# Thơ 4 câu sáng tác riêng biệt cho từng người theo tên và phòng ban
ai_poems = {
    'chi_lan': 'Kế toán sổ sách vẹn toàn,\nChị Lan xinh đẹp chứa chan nụ cười.\nTháng mười rực rỡ muôn nơi,\nChúc chị hạnh phúc trọn đời an yên!',
    'em_mai': 'Marketing sáng tạo mê say,\nPhương Mai năng động mỗi ngày thêm duyên.\nNụ cười tỏa nắng dịu hiền,\nNgàn hoa đua nở mừng riêng em cười!',
    'chi_huong': 'Code dòng nào cũng tinh anh,\nChị Hương duyên dáng rạng danh IT.\nBug nào thấy chị cũng đi,\nChúc chị rạng rỡ, xuân thì mãi xanh!',
    'ban_ngoc': 'HR kết nối muôn nhà,\nBích Ngọc chu đáo, mặn mà nét duyên.\nChúc bạn hạnh phúc bình yên,\nCông việc hanh thông, vẹn nguyên nụ cười!',
    'chi_thao': 'Bản lĩnh chỉ đạo kiên cường,\nCOO Thu Thảo dẫn đường tiên phong.\nNgày vui rực rỡ đóa hồng,\nChúc chị luôn mãi sáng trong nụ cười!',
    'em_linh': 'UI/UX vẽ sắc muôn màu,\nMỹ Linh khéo léo trước sau tuyệt vời.\nThiết kế lay động lòng người,\n20 tháng 10 rạng ngời ngát hương!',
    'chi_ha': 'Kinh doanh chốt hợp đồng mau,\nChị Hà tài giỏi trước sau vẹn toàn.\nKPI thắng lợi hân hoan,\nChúc chị duyên dáng ngập tràn niềm vui!',
    'ban_trang': 'Content bay bổng từng lời,\nQuỳnh Trang câu chữ rạng ngời sắc xuân.\nTriệu view viral đến gần,\nChúc bạn hạnh phúc muôn phần thăng hoa!',
    'chi_yen': 'Kiểm thử từng lỗi tinh tường,\nHải Yến tận tụy, người thương người vì.\n20/10 vạn sự như ý,\nChúc chị tươi trẻ, xuân thì ngát hương!',
    'em_anh': 'Frontend giao diện đẹp xinh,\nNgọc Ánh duyên dáng, thông minh tuyệt vời.\nChúc em rạng rỡ nụ cười,\nBao nhiêu yêu dấu ngọt ngời đón em!',
    'chi_dung': 'Tài chính chu đáo vẹn tròn,\nThùy Dung nét đẹp sắc son dịu dàng.\nChúc chị cuộc sống huy hoàng,\nHoa tươi quà ngập, thênh thang nụ cười!',
    'ban_hien': 'Tuyển dụng chiêu mộ anh tài,\nThu Hiền duyên dáng chẳng phai nụ cười.\nChúc bạn rực rỡ đôi mươi,\n20 tháng 10 thắm tươi sắc màu!',
    'chi_van': 'Ngọt ngào chăm sóc ân cần,\nThanh Vân trao gửi muôn phần niềm vui.\nChúc chị 20/10 tươi,\nNụ cười rạng rỡ, cuộc đời bình an!',
    'em_nhung': 'Account khéo léo tài hoa,\nHồng Nhung đằm thắm như hoa đầu cành.\nHợp đồng ký kết ngọt lành,\nChúc em rạng rỡ, chúc lành duyên may!',
    'chi_oanh': 'Product định hướng tài ba,\nKim Oanh nhiệt huyết như hoa mặt trời.\nChúc chị vạn sự đẹp tươi,\nNgày vui phụ nữ rạng ngời thành công!',
    'ban_giang': 'Data biểu đồ rõ ràng,\nHương Giang phân tích nhịp nhàng thông minh.\nChúc bạn rạng rỡ lung linh,\nSự nghiệp dốc đứng, chuyện tình thăng hoa!',
    'chi_quyen': 'Hành chính chăm chút sớm hôm,\nLệ Quyên khéo léo vẹn tròn việc công.\nChúc chị thắm đượm sắc hồng,\nGia đình hạnh phúc, ấm nồng yêu thương!',
    'em_tram': 'Đồ họa màu sắc lung linh,\nBảo Trâm cá tính, thông minh tuyệt vời.\nChúc em rực rỡ nụ cười,\nÝ tưởng tuôn chảy, cuộc đời thắm tươi!',
    'chi_thuy': 'Scrum điều phối nhịp nhàng,\nThanh Thủy bản lĩnh, dịu dàng sắc son.\nSprint nào kết quả cũng ngon,\nChúc chị luôn giữ nét xuân nụ cười!',
    'ban_quynh': 'SEO đẩy thứ hạng vươn cao,\nDiễm Quỳnh năng động ngọt ngào đáng yêu.\nChúc bạn đón nhận thật nhiều,\nYêu thương, quà tặng, vạn điều bình an!',
    'chi_loan': 'Pháp lý sắc sảo thông tuệ,\nBích Loan mẫn cán, vẹn bề uy nghi.\nChúc chị hạnh phúc xuân thì,\n20/10 chúc điều gì cũng nên!',
    'em_phuong': 'Social tương tác bão like,\nMai Phương vui tính, chẳng ai sánh bằng.\nNụ cười tươi tắn như trăng,\nChúc em rạng rỡ, tài năng vươn xa!',
    'chi_nga': 'Backend vững chãi an tâm,\nThúy Nga thầm lặng, cần mẫn từng ngày.\nHệ thống mượt mà hôm nay,\nChúc chị hạnh phúc đong đầy yêu thương!',
    'ban_uyen': 'Khách quý mến mộ dài lâu,\nMỹ Uyên tinh tế trước sau ân cần.\nChúc bạn tỏa sáng ngàn lần,\n20 tháng 10 muôn phần hân hoan!',
    'chi_hue': 'Kiểm toán minh bạch tinh anh,\nThị Huệ sắc sảo, trọn lành việc chung.\nChúc chị hạnh phúc muôn trùng,\nSắc xuân rực rỡ, vui cùng tháng năm!',
    'em_khanh': 'Video góc máy tuyệt trần,\nNgọc Khánh sáng tạo muôn phần say mê.\nChúc em mọi bước đường về,\nNgập tràn hoa đẹp, say mê tháng ngày!',
    'chi_tuyet': 'Hạ tầng hệ thống an yên,\nÁnh Tuyết vững chãi, dịu hiền mến thương.\nChúc chị muôn nẻo dặm trường,\nBình an, hạnh phúc, ngát hương xuân nồng!',
    'ban_thao': 'Đào tạo truyền lửa say mê,\nPhương Thảo duyên dáng vẹn bề tài năng.\nChúc bạn rạng rỡ vầng trăng,\n20/10 nhận quà ngập tràn!',
    'chi_hien': 'CMO chiến lược tài ba,\nThu Hiền rạng rỡ kiêu sa dẫn đầu.\nChúc sếp tâm đức bền lâu,\nĐưa thương hiệu vút qua cầu thành công!',
    'em_ly': 'Bước đầu thực tập hăng say,\nKhánh Ly tươi trẻ mỗi ngày thêm xinh.\nChúc em giữ mãi niềm tin,\nTương lai rực rỡ, vẹn gìn nét duyên!'
}

for r in recipients:
    cid = r.get('id', '')
    r['ai_poem'] = ai_poems.get(cid, f"Chúc {r.get('ho_ten', '')} 20/10 thật nhiều niềm vui, luôn xinh đẹp và rạng rỡ!")
    r['ai_song_prompt'] = f"Vietnamese pop acoustic upbeat song, sweet female vocals, celebrating {r.get('ho_ten')} ({r.get('chuc_danh')}) on Vietnamese Women's Day 20-10"

event_info = {
    'title': 'DẠ TIỆC TÔN VINH PHÁI ĐẸP 20/10',
    'subtitle': '"Rạng Rỡ Như Hoa - Tỏa Sáng Yêu Thương"',
    'date_text': '18:30 - Thứ Ba, ngày 20/10/2026',
    'iso_start': '2026-10-20T18:30:00+07:00',
    'iso_end': '2026-10-20T21:30:00+07:00',
    'location_name': 'Nhà hàng Maison Sen Buffet',
    'location_address': '61 Trần Hưng Đạo, P. Phan Chu Trinh, Q. Hoàn Kiếm, Hà Nội',
    'google_maps_url': 'https://www.google.com/maps/search/?api=1&query=Maison+Sen+Buffet+61+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Ho%C3%A0n+Ki%E1%BA%BFm+H%C3%A0+N%E1%BB%99i',
    'dress_code': 'Hồng Pastel / Trắng / Thanh lịch (Trang phục dạ tiệc)',
    'hotline': '090 123 4567 (Ban Tổ Chức)',
    'description': 'Kính mời toàn thể các chị em tham dự bữa tiệc buffet ấm cúng, sang trọng nhân ngày Phụ nữ Việt Nam 20/10 với nhiều tiết mục văn nghệ đặc biệt và quà tặng bất ngờ từ phái nam công ty!'
}

content = "// Dữ liệu tự động đồng bộ từ file CSV\n"
content += "const EVENT_INFO = " + json.dumps(event_info, ensure_ascii=False, indent=2) + ";\n\n"
content += "const RECIPIENTS_DATA = " + json.dumps(recipients, ensure_ascii=False, indent=2) + ";\n"

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Đã cập nhật thành công {len(recipients)} người nhận với thơ AI cá nhân hóa vào data.js!")
