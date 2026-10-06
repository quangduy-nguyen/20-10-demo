// Dữ liệu được tự động đồng bộ từ file DanhSach_30_ChiEm.xlsx
const EVENT_INFO = {
  "title": "DẠ TIỆC TÔN VINH PHÁI ĐẸP 20/10",
  "subtitle": "\"Rạng Rỡ Như Hoa - Tỏa Sáng Yêu Thương\"",
  "date_text": "18:30 - Thứ Ba, ngày 20/10/2026",
  "iso_start": "2026-10-20T18:30:00+07:00",
  "iso_end": "2026-10-20T21:30:00+07:00",
  "location_name": "Nhà hàng Maison Sen Buffet",
  "location_address": "61 Trần Hưng Đạo, P. Phan Chu Trinh, Q. Hoàn Kiếm, Hà Nội",
  "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Maison+Sen+Buffet+61+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o+Ho%C3%A0n+Ki%E1%BA%BFm+H%C3%A0+N%E1%BB%99i",
  "dress_code": "Hồng Pastel / Trắng / Thanh lịch (Trang phục dạ tiệc)",
  "hotline": "090 123 4567 (Ban Tổ Chức)",
  "description": "Kính mời toàn thể các chị em tham dự bữa tiệc buffet ấm cúng, sang trọng nhân ngày Phụ nữ Việt Nam 20/10!"
};

const RECIPIENTS_DATA = [
  {
    "id": "chi_nga",
    "ho_ten": "Nguyen Thị Thuý Nga",
    "chuc_danh": "Ban Tài chính - Kế toán",
    "email": "lan.nt@company.com",
    "sdt": "0901234001",
    "link_anh": "https://drive.google.com/file/d/1YWp42SWgpEiiz9uFwYYrLjYatsIcoo7t/view?usp=sharing",
    "loi_chuc": "Anh em ban TCKT chúc chị Nga ngày 20/10 thật hạnh phúc, luôn sắc sảo, tự tin và giữ vững nụ cười tươi tắn trên môi mỗi ngày!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_nga"
  },
  {
    "id": "em_mai",
    "ho_ten": "Trần Phương Mai",
    "chuc_danh": "Marketing Specialist",
    "email": "mai.tp@company.com",
    "sdt": "0901234002",
    "link_anh": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc em Mai 20/10 luôn tràn đầy nhiệt huyết, ý tưởng sáng tạo không giới hạn và nhận được thật nhiều hoa cùng quà nhé! Cảm ơn em vì luôn mang lại năng lượng tích cực cho cả team!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_mai"
  },
  {
    "id": "chi_huong",
    "ho_ten": "Lê Thu Hương",
    "chuc_danh": "Senior Developer",
    "email": "huong.lt@company.com",
    "sdt": "0901234003",
    "link_anh": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Hương 20/10 ngập tràn niềm vui, code mượt mà không một lỗi bug, dự án release thắng lợi và luôn giữ nét tươi trẻ, duyên dáng của nữ IT nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_huong"
  },
  {
    "id": "ban_ngoc",
    "ho_ten": "Phạm Bích Ngọc",
    "chuc_danh": "HR Generalist",
    "email": "ngoc.pb@company.com",
    "sdt": "0901234004",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Bích Ngọc 20/10 thật hạnh phúc, luôn tươi tắn và giữ trọn sự chu đáo, gắn kết tuyệt vời cho đại gia đình văn phòng chúng ta nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_ngoc"
  },
  {
    "id": "chi_thao",
    "ho_ten": "Hoàng Thu Thảo",
    "chuc_danh": "Giám đốc Vận hành (COO)",
    "email": "thao.ht@company.com",
    "sdt": "0901234005",
    "link_anh": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thảo ngày 20/10 thật nhiều niềm vui, luôn bản lĩnh, tỏa sáng và dẫn dắt tập thể gặt hái thêm nhiều thành công rực rỡ hơn nữa ạ!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thao"
  },
  {
    "id": "em_linh",
    "ho_ten": "Vũ Mỹ Linh",
    "chuc_danh": "UI/UX Designer",
    "email": "linh.vm@company.com",
    "sdt": "0901234006",
    "link_anh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Mỹ Linh 20/10 thật nhiều cảm hứng nghệ thuật, vẽ nên những layout triệu like và luôn xinh xắn, ngọt ngào như hiện tại nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_linh"
  },
  {
    "id": "chi_ha",
    "ho_ten": "Đặng Thanh Hà",
    "chuc_danh": "Trưởng phòng Kinh doanh",
    "email": "ha.dt@company.com",
    "sdt": "0901234007",
    "link_anh": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Hà ngày 20/10 ngập tràn sắc hoa, doanh số tháng nào cũng bùng nổ vượt KPI và cuộc sống luôn trọn vẹn yêu thương!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_ha"
  },
  {
    "id": "ban_trang",
    "ho_ten": "Bùi Quỳnh Trang",
    "chuc_danh": "Content Creator",
    "email": "trang.bq@company.com",
    "sdt": "0901234008",
    "link_anh": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Quỳnh Trang 20/10 luôn tràn đầy năng lượng tươi mới, viết đâu viral đó và nhận được cơn mưa quà tặng từ những người thương yêu!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_trang"
  },
  {
    "id": "chi_yen",
    "ho_ten": "Ngô Hải Yến",
    "chuc_danh": "QA / Tester Lead",
    "email": "yen.nh@company.com",
    "sdt": "0901234009",
    "link_anh": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Yến ngày 20/10 thật nhiều tiếng cười, công việc suôn sẻ, cuộc sống bình an và luôn giữ nét dịu dàng, chu đáo vốn có!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_yen"
  },
  {
    "id": "em_anh",
    "ho_ten": "Dương Ngọc Ánh",
    "chuc_danh": "Frontend Developer",
    "email": "anh.dn@company.com",
    "sdt": "0901234010",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Ngọc Ánh 20/10 luôn đáng yêu, pixel-perfect mọi giao diện và luôn nhận được sự cưng chiều hết mực từ người ấy nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_anh"
  },
  {
    "id": "chi_dung",
    "ho_ten": "Phan Thùy Dung",
    "chuc_danh": "Phó phòng Kế toán",
    "email": "dung.pt@company.com",
    "sdt": "0901234011",
    "link_anh": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Dung ngày 20/10 thật thư thái, nhận được nhiều lời chúc tốt đẹp nhất và luôn tươi vui, hạnh phúc bên gia đình nhỏ!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_dung"
  },
  {
    "id": "ban_hien",
    "ho_ten": "Tạ Thu Hiền",
    "chuc_danh": "Chuyên viên Tuyển dụng",
    "email": "hien.tt@company.com",
    "sdt": "0901234012",
    "link_anh": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Thu Hiền 20/10 luôn xinh tươi, tuyển đâu trúng đó, nhân tài về nườm nượp và luôn rạng ngời sức trẻ nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_hien"
  },
  {
    "id": "chi_van",
    "ho_ten": "Lý Thanh Vân",
    "chuc_danh": "Trưởng nhóm CSKH",
    "email": "van.lt@company.com",
    "sdt": "0901234013",
    "link_anh": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Vân 20/10 nhận trọn 5 sao yêu thương từ khách hàng và cả văn phòng, luôn giữ chất giọng ngọt ngào và nụ cười ấm áp!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_van"
  },
  {
    "id": "em_nhung",
    "ho_ten": "Trịnh Hồng Nhung",
    "chuc_danh": "Account Executive",
    "email": "nhung.th@company.com",
    "sdt": "0901234014",
    "link_anh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Hồng Nhung 20/10 luôn duyên dáng, chốt hợp đồng liền tay và luôn là bông hoa ngát hương rực rỡ của phòng Account!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_nhung"
  },
  {
    "id": "chi_oanh",
    "ho_ten": "Đỗ Kim Oanh",
    "chuc_danh": "Product Owner",
    "email": "oanh.dk@company.com",
    "sdt": "0901234015",
    "link_anh": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Oanh ngày 20/10 ngập tràn niềm vui, tính năng ra mắt người dùng mê mẩn và mọi điều ước đều thành hiện thực ạ!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_oanh"
  },
  {
    "id": "ban_giang",
    "ho_ten": "Hoàng Hương Giang",
    "chuc_danh": "Data Analyst",
    "email": "giang.hh@company.com",
    "sdt": "0901234016",
    "link_anh": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Hương Giang 20/10 thật hạnh phúc, biểu đồ sự nghiệp và tình duyên đều tăng trưởng dốc đứng theo cấp số nhân nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_giang"
  },
  {
    "id": "chi_quyen",
    "ho_ten": "Vũ Lệ Quyên",
    "chuc_danh": "Hành chính Nhân sự",
    "email": "quyen.vl@company.com",
    "sdt": "0901234017",
    "link_anh": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Quyên 20/10 luôn dịu dàng, an yên, văn phòng lúc nào cũng ấm áp nhờ bàn tay chăm chút chu đáo của chị ạ!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_quyen"
  },
  {
    "id": "em_tram",
    "ho_ten": "Nguyễn Bảo Trâm",
    "chuc_danh": "Graphic Designer",
    "email": "tram.nb@company.com",
    "sdt": "0901234018",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Bảo Trâm 20/10 nhận được cơn mưa quà tặng, phong cách luôn dẫn đầu xu hướng và cuộc sống ngập tràn màu sắc rực rỡ!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_tram"
  },
  {
    "id": "chi_thuy",
    "ho_ten": "Đoàn Thanh Thủy",
    "chuc_danh": "Scrum Master",
    "email": "thuy.dt@company.com",
    "sdt": "0901234019",
    "link_anh": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thủy ngày 20/10 ngập tràn năng lượng tích cực, sprint nào cũng về đích êm đềm và cuộc sống viên mãn như ý!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thuy"
  },
  {
    "id": "ban_quynh",
    "ho_ten": "Lê Diễm Quỳnh",
    "chuc_danh": "SEO Specialist",
    "email": "quynh.ld@company.com",
    "sdt": "0901234020",
    "link_anh": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Diễm Quỳnh 20/10 luôn giữ vị trí Top 1 Trending trong mắt những người yêu thương, trẻ trung và nhiều niềm vui!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_quynh"
  },
  {
    "id": "chi_loan",
    "ho_ten": "Phạm Bích Loan",
    "chuc_danh": "Chuyên viên Pháp lý",
    "email": "loan.pb@company.com",
    "sdt": "0901234021",
    "link_anh": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Loan ngày 20/10 thật hạnh phúc, luôn sắc sảo, tự tin và giữ vững nụ cười tươi tắn trên môi mỗi ngày!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_loan"
  },
  {
    "id": "em_phuong",
    "ho_ten": "Hà Mai Phương",
    "chuc_danh": "Social Media Executive",
    "email": "phuong.hm@company.com",
    "sdt": "0901234022",
    "link_anh": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Mai Phương 20/10 nhận được hàng ngàn lượt tim, xinh lung linh không cần filter và luôn là cây hài đáng yêu của công ty!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_phuong"
  },
  {
    "id": "truong_thuy_nga",
    "ho_ten": "Trương Thúy Nga",
    "chuc_danh": "Backend Developer",
    "email": "nga.tt@company.com",
    "sdt": "0901234023",
    "link_anh": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Nga ngày 20/10 tràn đầy niềm vui, hệ thống luôn ổn định 99.999% uptime và cuộc sống ngọt ngào như mong đợi!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=truong_thuy_nga"
  },
  {
    "id": "ban_uyen",
    "ho_ten": "Lâm Mỹ Uyên",
    "chuc_danh": "Chăm sóc khách hàng VIP",
    "email": "uyen.lm@company.com",
    "sdt": "0901234024",
    "link_anh": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Mỹ Uyên ngày 20/10 ngập tràn hoa tươi, luôn giữ được sự khéo léo, tinh tế và duyên dáng đốn tim mọi ánh nhìn!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_uyen"
  },
  {
    "id": "chi_hue",
    "ho_ten": "Cao Thị Huệ",
    "chuc_danh": "Kiểm toán nội bộ",
    "email": "hue.ct@company.com",
    "sdt": "0901234025",
    "link_anh": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Huệ 20/10 thật nhiều niềm vui, luôn sắc bén và rạng rỡ, gia đình hạnh phúc ấm áp và vạn sự cát tường!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_hue"
  },
  {
    "id": "em_khanh",
    "ho_ten": "Nguyễn Ngọc Khánh",
    "chuc_danh": "Video Editor",
    "email": "khanh.nn@company.com",
    "sdt": "0901234026",
    "link_anh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Ngọc Khánh 20/10 luôn tràn trề ý tưởng, render nhanh như chớp và cuộc sống có những thước phim tuyệt đẹp nhất!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_khanh"
  },
  {
    "id": "chi_tuyet",
    "ho_ten": "Võ Ánh Tuyết",
    "chuc_danh": "Senior System Admin",
    "email": "tuyet.va@company.com",
    "sdt": "0901234027",
    "link_anh": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Tuyết ngày 20/10 ấm áp, server mát rượi, cuộc sống tràn ngập niềm vui và luôn là chỗ dựa vững chãi cho hạ tầng công ty!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_tuyet"
  },
  {
    "id": "ban_thao",
    "ho_ten": "Đinh Phương Thảo",
    "chuc_danh": "Chuyên viên Đào tạo (L&D)",
    "email": "thao.dp@company.com",
    "sdt": "0901234028",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Phương Thảo 20/10 nhận được thật nhiều hoa thơm, luôn truyền cảm hứng tích cực và rạng ngời như ánh ban mai!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=ban_thao"
  },
  {
    "id": "chi_hien",
    "ho_ten": "Lương Thu Hiền",
    "chuc_danh": "Giám đốc Marketing (CMO)",
    "email": "hien.lt@company.com",
    "sdt": "0901234029",
    "link_anh": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc sếp Hiền ngày 20/10 thật nhiều sức khỏe, luôn tỏa sáng với thần thái đỉnh cao và đưa thương hiệu công ty vươn xa hơn nữa!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_hien"
  },
  {
    "id": "em_ly",
    "ho_ten": "Trần Khánh Ly",
    "chuc_danh": "Thực tập sinh Marketing",
    "email": "ly.tk@company.com",
    "sdt": "0901234030",
    "link_anh": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Khánh Ly ngày 20/10 đầu tiên tại công ty thật đáng nhớ, học hỏi được nhiều điều hay và luôn giữ trọn ngọn lửa nhiệt huyết nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_ly"
  }
];
