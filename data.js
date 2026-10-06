// Danh sách chị em Ban Tài chính và thông tin dạ tiệc 20/10
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
  "description": "Kính mời toàn thể các chị em Ban Tài chính tham dự bữa tiệc buffet ấm cúng, sang trọng nhân ngày Phụ nữ Việt Nam 20/10!"
};

const RECIPIENTS_DATA = [
  {
    "id": "chi_thuy_nga",
    "ho_ten": "Nguyễn Thị Thuý Nga",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "ngantt16@viettel.com.vn",
    "sdt": "0986665222",
    "link_anh": "https://drive.google.com/file/d/1YWp42SWgpEiiz9uFwYYrLjYatsIcoo7t/view?usp=sharing",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Thúy Nga luôn xinh đẹp, rạng rỡ, nhiều sức khỏe và hạnh phúc! Chúc chị công tác tại Phòng Chính sách và Thuế luôn hanh thông, chính sách vẹn toàn và giữ trọn nụ cười tươi tắn mỗi ngày!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thuy_nga"
  },
  {
    "id": "chi_thuy_linh",
    "ho_ten": "Nguyễn Thúy Linh",
    "chuc_danh": "Lãnh đạo ban",
    "email": "linhnt@viettel.com.vn",
    "sdt": "0983322268",
    "link_anh": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, kính chúc sếp Thúy Linh luôn dồi dào sức khỏe, xinh đẹp, hạnh phúc và tràn đầy nhiệt huyết! Chúc sếp luôn vững vàng tay chèo, dẫn dắt Ban Tài chính gặt hái thêm nhiều thành công rực rỡ và luôn là nguồn cảm hứng tuyệt vời cho toàn thể anh chị em!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thuy_linh"
  },
  {
    "id": "chi_thu_hang",
    "ho_ten": "Đỗ Thị Thu Hằng",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hangdta@viettel.com.vn",
    "sdt": "0983100800",
    "link_anh": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thu Hằng ngày 20/10 ngập tràn niềm vui, hoa và quà! Chúc chị công việc tại Phòng Dòng tiền & Thanh khoản luôn thuận buồm xuôi gió, dòng tiền hanh thông, thanh khoản vững vàng và cuộc sống luôn viên mãn, an yên!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thu_hang"
  },
  {
    "id": "chi_minh_hong",
    "ho_ten": "Nguyễn Thị Minh Hồng",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hongnm@viettel.com.vn",
    "sdt": "0983202568",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Minh Hồng luôn tươi trẻ, duyên dáng và ngập tràn hạnh phúc! Chúc chị luôn hoàn thành xuất sắc mọi nhiệm vụ tại Phòng Dòng tiền & Thanh khoản, gia đình luôn ấm êm và ngập tràn tiếng cười!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_minh_hong"
  },
  {
    "id": "chi_thanh_huong",
    "ho_ten": "Trần Thanh Hương",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "huongtt11@viettel.com.vn",
    "sdt": "0985958899",
    "link_anh": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thanh Hương một ngày 20/10 thật ngọt ngào, nhận được nhiều tình cảm yêu thương nhất! Chúc chị luôn giữ vững sự tinh tế, chu đáo trong công tác quản lý dòng tiền và mỗi ngày đi làm đều là một ngày ngập tràn niềm vui!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thanh_huong"
  },
  {
    "id": "chi_ho_loan",
    "ho_ten": "Chu Thị Hồ Loan",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "loanch@viettel.com.vn",
    "sdt": "0964186186",
    "link_anh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Hồ Loan 20/10 ngập tràn sắc hoa, luôn xinh đẹp và rạng rỡ! Chúc chị công tác tại Phòng Kế hoạch & Ngân sách luôn chuẩn chỉnh từng số liệu, ngân sách tối ưu và cuộc sống luôn trọn vẹn yêu thương!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_ho_loan"
  },
  {
    "id": "chi_minh_thu",
    "ho_ten": "Hoàng Minh Thu",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "thuhm@viettel.com.vn",
    "sdt": "0983000289",
    "link_anh": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Minh Thu luôn tươi tắn, nhiều sức khỏe và may mắn! Chúc chị trong công việc kế hoạch ngân sách luôn hanh thông, hoàn thành xuất sắc mọi mục tiêu và luôn là đóa hoa rạng ngời của phòng!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_minh_thu"
  },
  {
    "id": "chi_quynh_hoa",
    "ho_ten": "Đinh Thị Quỳnh Hoa",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "hoadtq1@viettel.com.vn",
    "sdt": "0989086986",
    "link_anh": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Quỳnh Hoa ngày 20/10 thật nhiều niềm vui, luôn trẻ trung, ngọt ngào và hạnh phúc! Chúc chị kế hoạch ngân sách luôn chuẩn xác, công việc thuận lợi và nhận được cơn mưa quà tặng hôm nay nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_quynh_hoa"
  },
  {
    "id": "em_huong_mai",
    "ho_ten": "Nguyễn Hương Mai",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "mainh1@viettel.com.vn",
    "sdt": "0982368368",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Hương Mai 20/10 luôn xinh xắn, tràn đầy năng lượng tích cực và nhiệt huyết tuổi trẻ! Chúc em trong công việc kế hoạch và ngân sách luôn sắc sảo, tự tin và gặt hái thật nhiều thành công mới!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_huong_mai"
  },
  {
    "id": "chi_hong_minh",
    "ho_ten": "Phạm Thị Hồng Minh",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "minhpth@viettel.com.vn",
    "sdt": "0989332323",
    "link_anh": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Hồng Minh ngày 20/10 ngập tràn niềm vui và sự ngọt ngào! Chúc chị công tác tại Phòng Chính sách và Thuế luôn suôn sẻ, chuẩn xác từng điều khoản chính sách và cuộc sống luôn an yên, viên mãn!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_hong_minh"
  },
  {
    "id": "chi_thu_hang_cst",
    "ho_ten": "Trần Thu Hằng",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hangtt@viettel.com.vn",
    "sdt": "0983001608",
    "link_anh": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Thu Hằng luôn xinh đẹp, duyên dáng và nhiều sức khỏe! Chúc chị cùng đồng đội Phòng Chính sách & Thuế luôn hoàn thành xuất sắc mọi nhiệm vụ và giữ mãi nụ cười rạng ngời trên môi!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thu_hang_cst"
  },
  {
    "id": "chi_thanh_hoa",
    "ho_ten": "Cao Thanh Hoa",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hoact1@viettel.com.vn",
    "sdt": "0977293866",
    "link_anh": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thanh Hoa ngày 20/10 thật hạnh phúc, nhận được trọn vẹn yêu thương từ gia đình và đồng nghiệp! Chúc chị trong công việc chính sách & thuế luôn sắc bén, thuận lợi và vạn sự như ý!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thanh_hoa"
  },
  {
    "id": "chi_thanh_nhan",
    "ho_ten": "Nguyễn Thị Thanh Nhàn",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "nhannth@viettel.com.vn",
    "sdt": "0983399568",
    "link_anh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thanh Nhàn ngày 20/10 luôn thư thái, an yên và ngập tràn tiếng cười! Chúc chị công tác tại Phòng Giám sát Tài chính luôn tinh anh, kiểm soát chuẩn chỉnh và cuộc sống lúc nào cũng thảnh thơi, viên mãn!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thanh_nhan"
  },
  {
    "id": "chi_hong_hanh",
    "ho_ten": "Phan Thị Hồng Hạnh",
    "chuc_danh": "Phòng Quản lý Tài chính Dự án",
    "email": "hanhpth1@viettel.com.vn",
    "sdt": "0984537097",
    "link_anh": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Hồng Hạnh 20/10 thật nhiều niềm vui, luôn rạng rỡ và bản lĩnh! Chúc chị quản lý tài chính các dự án luôn thắng lợi, giải ngân mượt mà và gia đình luôn tràn ngập hạnh phúc ấm áp!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_hong_hanh"
  },
  {
    "id": "chi_thu_hien",
    "ho_ten": "Hoàng Thị Thu Hiền",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "hienhtt13@viettel.com.vn",
    "sdt": "0984328744",
    "link_anh": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Thu Hiền luôn dịu dàng, xinh tươi và nhiều niềm vui! Chúc chị công việc giám sát tài chính luôn hanh thông, số liệu chuẩn xác và nhận được thật nhiều hoa cùng quà trong ngày đặc biệt này!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thu_hien"
  },
  {
    "id": "chi_thanh_van",
    "ho_ten": "Nguyễn Thị Vân",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "vannt25@viettel.com.vn",
    "sdt": "0976050206",
    "link_anh": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Vân ngày 20/10 thật nhiều may mắn, xinh đẹp và luôn giữ nét tươi trẻ! Chúc chị tại Phòng Quản lý Dòng tiền & Thanh khoản luôn mượt mà mọi giao dịch, thanh khoản dồi dào và cuộc sống đong đầy yêu thương!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thanh_van"
  },
  {
    "id": "em_lan_anh",
    "ho_ten": "Nguyễn Lan Anh",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "anhnl@viettel.com.vn",
    "sdt": "0969643838",
    "link_anh": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Lan Anh 20/10 luôn xinh xắn, đáng yêu và ngập tràn năng lượng tươi vui! Chúc em công việc chính sách thuế luôn thuận lợi, học hỏi thêm nhiều điều hay và đón nhận cơn mưa lời chúc ngọt ngào hôm nay nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_lan_anh"
  },
  {
    "id": "chi_thanh_ha",
    "ho_ten": "Trương Thị Thanh Hà",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hattt6@viettel.com.vn",
    "sdt": "0977159818",
    "link_anh": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thanh Hà một ngày 20/10 ngập tràn sắc hoa và nụ cười rạng rỡ! Chúc chị công tác tại Phòng Chính sách & Thuế luôn suôn sẻ, hoàn thành xuất sắc mọi mục tiêu và gia đình luôn trọn vẹn hạnh phúc!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thanh_ha"
  },
  {
    "id": "chi_thu_ha",
    "ho_ten": "Nguyễn Thu Hà",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hant51@viettel.com.vn",
    "sdt": "0966221287",
    "link_anh": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc chị Thu Hà ngày 20/10 thật hạnh phúc, trẻ trung và nhiều sức khỏe! Chúc chị cùng team Dòng tiền & Thanh khoản luôn vận hành trơn tru, dòng tiền sinh sôi và cuộc sống luôn ngập tràn may mắn!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_thu_ha"
  },
  {
    "id": "em_huyen_trang",
    "ho_ten": "Trương Thị Huyền Trang",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "trangtth2@viettel.com.vn",
    "sdt": "0989110988",
    "link_anh": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Huyền Trang 20/10 luôn rạng ngời, duyên dáng và đáng yêu! Chúc em công tác tại Phòng Kế hoạch & Ngân sách luôn chủ động, tự tin, số liệu cân đối và luôn nhận được sự yêu quý từ mọi người!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_huyen_trang"
  },
  {
    "id": "em_thuy_linh",
    "ho_ten": "Lê Thùy Linh",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "linhlt49@viettel.com.vn",
    "sdt": "0962959969",
    "link_anh": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Thùy Linh 20/10 ngập tràn niềm vui, xinh đẹp rạng rỡ và luôn tràn đầy năng lượng tích cực! Chúc em tại Phòng Giám sát Tài chính luôn tinh tế, nhạy bén và gặt hái thật nhiều bước tiến mới!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_thuy_linh"
  },
  {
    "id": "em_ngoc_huyen",
    "ho_ten": "Nguyễn Ngọc Huyền",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "huyennn11@viettel.com.vn",
    "sdt": "0363242408",
    "link_anh": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Chúc Ngọc Huyền ngày 20/10 nhận được thật nhiều hoa, quà và những lời chúc yêu thương! Chúc em công việc giám sát tài chính luôn thuận buồm xuôi gió và giữ trọn nét trẻ trung, duyên dáng nhé!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=em_ngoc_huyen"
  },
  {
    "id": "chi_viet_hang",
    "ho_ten": "Nguyễn Thị Việt Hằng",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "hangnv@viettel.com.vn",
    "sdt": "0989389968",
    "link_anh": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "loi_chuc": "Nhân ngày 20/10, chúc chị Việt Hằng luôn tươi trẻ, yêu đời và hạnh phúc viên mãn! Chúc chị công tác tại Phòng Giám sát Tài chính luôn hoàn thành xuất sắc nhiệm vụ và mỗi ngày đều ngập tràn niềm vui, may mắn!",
    "link_thiep": "https://20-10-demo-fawn.vercel.app/?id=chi_viet_hang"
  }
];
