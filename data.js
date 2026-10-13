// Danh sách chị em Ban Tài chính Kế toán và thông tin tiệc 20/10
const EVENT_INFO = {
  "title": "TIỆC CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10",
  "subtitle": "\"Rạng Rỡ Như Hoa - Tỏa Sáng Yêu Thương\"",
  "date_text": "18:30 - Thứ 4, ngày 14/10/2026",
  "iso_start": "2026-10-14T18:30:00+07:00",
  "iso_end": "2026-10-14T21:30:00+07:00",
  "location_name": "Sheraton Hanoi West",
  "location_address": "Số 36 đường Lê Đức Thọ, P. Mỹ Đình 2, Q. Nam Từ Liêm, Hà Nội",
  "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Sheraton+Hanoi+West+36+L%C3%AA+%C4%90%E1%BB%A9c+Th%E1%BB%8D+H%C3%A0+N%E1%BB%99i",
  "hotline": "Ban Tổ Chức TCKT",
  "description": "Kính mời toàn thể các chị em Ban Tài chính Kế toán tham dự buổi tiệc ấm cúng, sang trọng nhân ngày Phụ nữ Việt Nam 20/10!"
};

const RECIPIENTS_DATA = [
  {
    "id": "chi_thuy_linh",
    "ho_ten": "Nguyễn Thúy Linh",
    "chuc_danh": "Lãnh đạo ban",
    "email": "linhnt@viettel.com.vn",
    "sdt": "0983322268",
    "link_anh": "avatar_chi_thuy_linh.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán kính chúc Chị luôn xinh đẹp, rạng rỡ, dồi dào sức khỏe, tràn đầy hạnh phúc và gặp thật nhiều điều tốt đẹp trong cuộc sống!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thuy_linh"
  },
  {
    "id": "chi_thuy_nga",
    "ho_ten": "Nguyễn Thị Thuý Nga",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "ngantt16@viettel.com.vn",
    "sdt": "0986665222",
    "link_anh": "avatar_chi_thuy_nga.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thị Thuý Nga luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thuy_nga"
  },
  {
    "id": "chi_thu_hang",
    "ho_ten": "Đỗ Thị Thu Hằng",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hangdta@viettel.com.vn",
    "sdt": "0983100800",
    "link_anh": "avatar_chi_thu_hang.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Đỗ Thị Thu Hằng luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thu_hang"
  },
  {
    "id": "chi_minh_hong",
    "ho_ten": "Nguyễn Thị Minh Hồng",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hongnm@viettel.com.vn",
    "sdt": "0983202568",
    "link_anh": "avatar_chi_minh_hong.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thị Minh Hồng luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_minh_hong"
  },
  {
    "id": "chi_thanh_huong",
    "ho_ten": "Trần Thanh Hương",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "huongtt11@viettel.com.vn",
    "sdt": "0985958899",
    "link_anh": "avatar_chi_thanh_huong.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Trần Thanh Hương luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thanh_huong"
  },
  {
    "id": "chi_ho_loan",
    "ho_ten": "Chu Thị Hồ Loan",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "loanch@viettel.com.vn",
    "sdt": "0964186186",
    "link_anh": "avatar_chi_ho_loan.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Chu Thị Hồ Loan luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_ho_loan"
  },
  {
    "id": "chi_minh_thu",
    "ho_ten": "Hoàng Minh Thu",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "thuhm@viettel.com.vn",
    "sdt": "0983000289",
    "link_anh": "avatar_chi_minh_thu.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Hoàng Minh Thu luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_minh_thu"
  },
  {
    "id": "chi_quynh_hoa",
    "ho_ten": "Đinh Thị Quỳnh Hoa",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "hoadtq1@viettel.com.vn",
    "sdt": "0989086986",
    "link_anh": "avatar_chi_quynh_hoa.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Đinh Thị Quỳnh Hoa luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_quynh_hoa"
  },
  {
    "id": "chi_huong_mai",
    "ho_ten": "Nguyễn Hương Mai",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "mainh1@viettel.com.vn",
    "sdt": "0982368368",
    "link_anh": "avatar_em_huong_mai.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Hương Mai luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_huong_mai"
  },
  {
    "id": "chi_hong_minh",
    "ho_ten": "Phạm Thị Hồng Minh",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "minhpth@viettel.com.vn",
    "sdt": "0989332323",
    "link_anh": "avatar_chi_hong_minh.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Phạm Thị Hồng Minh luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_hong_minh"
  },
  {
    "id": "chi_thu_hang_cst",
    "ho_ten": "Trần Thu Hằng",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hangtt@viettel.com.vn",
    "sdt": "0983001608",
    "link_anh": "avatar_chi_thu_hang_cst.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Trần Thu Hằng luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thu_hang_cst"
  },
  {
    "id": "chi_thanh_hoa",
    "ho_ten": "Cao Thanh Hoa",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hoact1@viettel.com.vn",
    "sdt": "0977293866",
    "link_anh": "avatar_chi_thanh_hoa.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Cao Thanh Hoa luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thanh_hoa"
  },
  {
    "id": "chi_thanh_nhan",
    "ho_ten": "Nguyễn Thị Thanh Nhàn",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "nhannth@viettel.com.vn",
    "sdt": "0983399568",
    "link_anh": "avatar_chi_thanh_nhan.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thị Thanh Nhàn luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thanh_nhan"
  },
  {
    "id": "chi_hong_hanh",
    "ho_ten": "Phan Thị Hồng Hạnh",
    "chuc_danh": "Phòng Quản lý Tài chính Dự án",
    "email": "hanhpth1@viettel.com.vn",
    "sdt": "0984537097",
    "link_anh": "avatar_chi_hong_hanh.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Phan Thị Hồng Hạnh luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_hong_hanh"
  },
  {
    "id": "chi_thu_hien",
    "ho_ten": "Hoàng Thị Thu Hiền",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "hienhtt13@viettel.com.vn",
    "sdt": "0984328744",
    "link_anh": "avatar_chi_thu_hien.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Hoàng Thị Thu Hiền luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thu_hien"
  },
  {
    "id": "chi_thanh_van",
    "ho_ten": "Nguyễn Thị Vân",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "vannt25@viettel.com.vn",
    "sdt": "0976050206",
    "link_anh": "avatar_chi_thanh_van.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thị Vân luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thanh_van"
  },
  {
    "id": "chi_lan_anh",
    "ho_ten": "Nguyễn Lan Anh",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "anhnl@viettel.com.vn",
    "sdt": "0969643838",
    "link_anh": "avatar_em_lan_anh.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Lan Anh luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_lan_anh"
  },
  {
    "id": "chi_thanh_ha",
    "ho_ten": "Trương Thị Thanh Hà",
    "chuc_danh": "Phòng Chính sách và Thuế",
    "email": "hattt6@viettel.com.vn",
    "sdt": "0977159818",
    "link_anh": "avatar_chi_thanh_ha.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Trương Thị Thanh Hà luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thanh_ha"
  },
  {
    "id": "chi_thu_ha",
    "ho_ten": "Nguyễn Thu Hà",
    "chuc_danh": "Phòng Quản lý Dòng tiền và Thanh khoản",
    "email": "hant51@viettel.com.vn",
    "sdt": "0966221287",
    "link_anh": "avatar_chi_thu_ha.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thu Hà luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_thu_ha"
  },
  {
    "id": "chi_huyen_trang",
    "ho_ten": "Trương Thị Huyền Trang",
    "chuc_danh": "Phòng Kế hoạch và Ngân sách",
    "email": "trangtth2@viettel.com.vn",
    "sdt": "0989110988",
    "link_anh": "avatar_em_huyen_trang.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Trương Thị Huyền Trang luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_huyen_trang"
  },
  {
    "id": "chi_le_thuy_linh",
    "ho_ten": "Lê Thùy Linh",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "linhlt49@viettel.com.vn",
    "sdt": "0962959969",
    "link_anh": "avatar_em_thuy_linh.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Lê Thùy Linh luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_le_thuy_linh"
  },
  {
    "id": "chi_ngoc_huyen",
    "ho_ten": "Nguyễn Ngọc Huyền",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "huyennn11@viettel.com.vn",
    "sdt": "0363242408",
    "link_anh": "avatar_em_ngoc_huyen.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Ngọc Huyền luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_ngoc_huyen"
  },
  {
    "id": "chi_viet_hang",
    "ho_ten": "Nguyễn Thị Việt Hằng",
    "chuc_danh": "Phòng Giám sát Tài chính",
    "email": "hangnv@viettel.com.vn",
    "sdt": "0989389968",
    "link_anh": "avatar_chi_viet_hang.jpg",
    "loi_chuc": "Nhân ngày Phụ nữ Việt Nam 20/10, Tập thể anh em nam Ban Tài chính Kế toán chúc Ms. Nguyễn Thị Việt Hằng luôn xinh tươi, rạng ngời, tràn đầy sức sống, bình an và hạnh phúc!",
    "link_thiep": "https://thiep-chuc-mung-20-10.vercel.app/?id=chi_viet_hang"
  }
];
