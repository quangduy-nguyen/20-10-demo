// Dữ liệu Sơ Đồ Chỗ Ngồi 56 Ghế - Tiệc 20/10 tại Sheraton Hanoi West
// Trích xuất và chuẩn hóa từ SO_DO_CHO_NGOI_20-10.xlsx

const SEATING_MAP_DATA = {
  venue: "Sheraton Hanoi West",
  address: "Số 36 đường Lê Đức Thọ, P. Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
  total_seats: 56,
  
  // Danh sách các cụm bàn theo đúng vị trí trên sơ đồ mặt bằng
  tables: [
    // --- DÃY 1: KHU GHẾ ĐỆM CÓ DỰA (B10, B11, B12, B13) ---
    {
      id: "table_b10",
      code: "B10",
      name: "Bàn B10",
      type: "booth",
      desc: "Ghế đệm có dựa (Gần khu buffet)",
      top_row: [
        { seat: 1, name: "Nguyễn Thị Thanh Nhàn", recipient_id: "chi_thanh_nhan" },
        { seat: 2, name: "Trương Thị Huyền Trang", recipient_id: "em_huyen_trang" }
      ],
      bottom_row: [
        { seat: 16, name: "Nguyễn Trung Anh" },
        { seat: 15, name: "Hồ Sỹ Ngọc" }
      ]
    },
    {
      id: "table_b11",
      code: "B11",
      name: "Bàn B11",
      type: "booth",
      desc: "Ghế đệm có dựa (Gần khu buffet)",
      top_row: [
        { seat: 3, name: "Phan Thị Hồng Hạnh", recipient_id: "chi_hong_hanh" },
        { seat: 4, name: "Trịnh Ngọc Quang Anh" }
      ],
      bottom_row: [
        { seat: 14, name: "Nguyễn Đình Phán" },
        { seat: 13, name: "Ngô Đình Mạnh" }
      ]
    },
    {
      id: "table_b12",
      code: "B12",
      name: "Bàn B12",
      type: "booth",
      desc: "Ghế đệm có dựa (Gần khu buffet)",
      top_row: [
        { seat: 5, name: "Hoàng Thị Thu Hiền", recipient_id: "chi_thu_hien" },
        { seat: 6, name: "Nguyễn Ngọc Huyền", recipient_id: "em_ngoc_huyen" }
      ],
      bottom_row: [
        { seat: 12, name: "Trần Thái Hạnh" },
        { seat: 11, name: "Đoàn Mạnh Văn" }
      ]
    },
    {
      id: "table_b13",
      code: "B13",
      name: "Bàn B13",
      type: "booth",
      desc: "Ghế đệm có dựa (Gần khu buffet)",
      top_row: [
        { seat: 7, name: "Nguyễn Lan Anh", recipient_id: "em_lan_anh" },
        { seat: 8, name: "Nguyễn Thị Vân", recipient_id: "chi_thanh_van" }
      ],
      bottom_row: [
        { seat: 10, name: "Phan Tiến Dũng" },
        { seat: 9, name: "Nguyễn Ngọc Anh" }
      ]
    },

    // --- DÃY 2: DÃY GIỮA ---
    {
      id: "table_mid_left",
      code: "BÀN GHÉP (GIỮA TRÁI)",
      name: "Bàn Giữa Trái",
      type: "cluster",
      desc: "Bàn ghép (Cạnh Backdrop Sân Khấu)",
      top_row: [
        { seat: 33, name: "Nguyễn Hải Đăng" },
        { seat: 34, name: "Chu Thị Hồ Loan", recipient_id: "chi_ho_loan" },
        { seat: 35, name: "Hoàng Minh Thu", recipient_id: "chi_minh_thu" }
      ],
      bottom_row: [
        { seat: 38, name: "Phạm Văn Tùng" },
        { seat: 37, name: "Trần Văn Chung" },
        { seat: 36, name: "Trần Đức Trung" }
      ]
    },
    {
      id: "table_mid_wood",
      code: "BÀN DÀI BẰNG GỖ",
      name: "Bàn Dài Bằng Gỗ",
      type: "wood_long",
      desc: "Bàn dài bằng gỗ (Trung tâm phòng tiệc)",
      top_row: [
        { seat: 17, name: "Phạm Sơn" },
        { seat: 18, name: "Nguyễn Thị Minh Hồng", recipient_id: "chi_minh_hong" },
        { seat: 19, name: "Trần Thanh Hương", recipient_id: "chi_thanh_huong" },
        { seat: 20, name: "Lê Thùy Linh", recipient_id: "em_thuy_linh" }
      ],
      bottom_row: [
        { seat: 24, name: "Nguyễn Đức Giang" },
        { seat: 23, name: "Lê Xuân Giang" },
        { seat: 22, name: "Nguyễn Thanh Hải" },
        { seat: 21, name: "Nguyễn Duy Trọng" }
      ]
    },
    {
      id: "table_mid_right",
      code: "2 BÀN GHÉP (GIỮA PHẢI)",
      name: "Bàn Giữa Phải",
      type: "cluster",
      desc: "2 bàn ghép (Khu giữa bên phải)",
      top_row: [
        { seat: 25, name: "Bùi Văn Thung" },
        { seat: 26, name: "Trương Thị Thanh Hà", recipient_id: "chi_thanh_ha" },
        { seat: 27, name: "Nguyễn Thu Hà", recipient_id: "chi_thu_ha" },
        { seat: 28, name: "Kiều Đức Quảng" }
      ],
      bottom_row: [
        { seat: 32, name: "Bùi Hoàng Duy" },
        { seat: 31, name: "Nguyễn Tiến Mạnh" },
        { seat: 30, name: "Phạm Văn Nam" },
        { seat: 29, name: "Khuất Duy Thành" }
      ]
    },

    // --- DÃY 3: DÃY DƯỚI (GẦN CỬA VIEW CÂY XANH) ---
    {
      id: "table_bot_left",
      code: "2 BÀN GHÉP (DƯỚI TRÁI)",
      name: "Bàn Dưới Trái",
      type: "cluster",
      desc: "2 bàn ghép (Dưới bên trái)",
      top_row: [
        { seat: 39, name: "Trần Trung Thành" },
        { seat: 40, name: "Đỗ Hồng Phong" },
        { seat: 41, name: "Đinh Thị Quỳnh Hoa", recipient_id: "chi_quynh_hoa" }
      ],
      bottom_row: [
        { seat: 44, name: "Nguyễn Hương Mai", recipient_id: "em_huong_mai" },
        { seat: 43, name: "Dương Hải Vũ" },
        { seat: 42, name: "Nguyễn Thị Thúy Nga", recipient_id: "chi_thuy_nga" }
      ]
    },
    {
      id: "table_bot_mid",
      code: "2 BÀN GHÉP (DƯỚI GIỮA)",
      name: "Bàn Dưới Giữa (Bàn Lãnh Đạo)",
      type: "vip",
      desc: "2 bàn ghép VIP (Khu vực trung tâm dưới)",
      top_row: [
        { seat: 45, name: "Nguyễn Thị Việt Hằng", recipient_id: "chi_viet_hang" },
        { seat: 46, name: "Phạm Thị Hồng Minh", recipient_id: "chi_hong_minh" },
        { seat: 47, name: "Đỗ Thị Thu Hằng", recipient_id: "chi_thu_hang" }
      ],
      bottom_row: [
        { seat: 50, name: "PB (Phó Ban)" },
        { seat: 49, name: "Nguyễn Thúy Linh (Trưởng Ban)", recipient_id: "chi_thuy_linh", is_tb: true },
        { seat: 48, name: "PB (Phó Ban)" }
      ]
    },
    {
      id: "table_bot_right",
      code: "2 BÀN GHÉP (DƯỚI PHẢI)",
      name: "Bàn Dưới Phải",
      type: "cluster",
      desc: "2 bàn ghép (Dưới bên phải)",
      top_row: [
        { seat: 51, name: "Quang Duy" },
        { seat: 52, name: "Tiến Dũng" },
        { seat: 53, name: "Trần Thu Hằng", recipient_id: "chi_thu_hang_cst" }
      ],
      bottom_row: [
        { seat: 56, name: "Đinh Hồng Quang" },
        { seat: 55, name: "Cao Thanh Hoa", recipient_id: "chi_thanh_hoa" },
        { seat: 54, name: "Lý Vĩnh Hưng" }
      ]
    }
  ]
};

// Hàm tiện ích tra cứu vị trí của khách mời theo ID hoặc Họ Tên
function getGuestSeatingInfo(recipientId, recipientName) {
  if (!SEATING_MAP_DATA || !SEATING_MAP_DATA.tables) return null;

  const normTargetName = (recipientName || "").toLowerCase().replace(/uý/g, 'úy').trim();

  for (const table of SEATING_MAP_DATA.tables) {
    const allSeats = [...table.top_row, ...table.bottom_row];
    for (const seatObj of allSeats) {
      // 1. Khớp theo ID người nhận
      if (recipientId && seatObj.recipient_id === recipientId) {
        return buildSeatResult(seatObj, table);
      }
      // 2. Khớp theo tên chuẩn hóa
      if (normTargetName) {
        const normSeatName = seatObj.name.toLowerCase().replace(/uý/g, 'úy').trim();
        if (normSeatName.includes(normTargetName) || normTargetName.includes(normSeatName)) {
          return buildSeatResult(seatObj, table);
        }
      }
    }
  }

  // Trường hợp đặc biệt nếu là chi_thuy_linh
  if (recipientId === 'chi_thuy_linh') {
    const vipTable = SEATING_MAP_DATA.tables.find(t => t.id === 'table_bot_mid');
    if (vipTable) {
      const seat49 = vipTable.bottom_row.find(s => s.seat === 49);
      if (seat49) return buildSeatResult(seat49, vipTable);
    }
  }

  return null;
}

function buildSeatResult(seatObj, table) {
  const tableMates = [...table.top_row, ...table.bottom_row]
    .filter(s => s.seat !== seatObj.seat)
    .map(s => ({ seat: s.seat, name: s.name }));

  return {
    seat: seatObj.seat,
    name: seatObj.name,
    table_id: table.id,
    table_code: table.code,
    table_name: table.name,
    table_desc: table.desc,
    table_type: table.type,
    table_mates: tableMates
  };
}
