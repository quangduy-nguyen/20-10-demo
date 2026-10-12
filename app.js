/**
 * THIỆP CHÚC MỪNG 20/10 CÁ NHÂN HÓA
 * Script xử lý hiệu ứng phong bao 3D, popup lá thư 3s & xác nhận tham dự
 */

// Cấu hình URL Webhook Google Sheet (Nếu muốn tự động lưu phản hồi vào Google Sheet)
const GOOGLE_SHEET_WEBHOOK_URL = '';

let currentPerson = null;
let isMusicPlaying = false;
let isOpening = false;

// Chuyển link ảnh Google Drive sang dạng hiển thị trực tiếp
function formatImageUrl(url) {
  if (!url) return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && url.includes('drive.google.com')) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}

// Lấy danh xưng và tên gọi thân mật (VD: Chị Nga, Em Mai, Chị Hương)
function getShortRecipientName(person) {
  if (!person) return '';
  const parts = person.ho_ten.trim().split(' ');
  const firstName = parts[parts.length - 1];
  let prefix = 'Chị';
  if (person.id.startsWith('em_')) prefix = 'Em';
  else if (person.id.startsWith('ban_')) prefix = 'Bạn';
  else if (person.id.startsWith('chi_')) prefix = 'Chị';
  return `${prefix} ${firstName}`;
}

document.addEventListener('DOMContentLoaded', () => {
  initNaturalPetals();
  loadCurrentRecipient();
  setupEventListeners();
  initSeatingChart();
});

/**
 * 1. Hiệu ứng cánh hoa rơi tự nhiên (Organic Fluttering Breeze)
 */
function initNaturalPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const PETAL_COUNT = 20;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 12 + 10; // 10px - 22px
    const left = Math.random() * 105 - 2; // -2% to 103%
    const duration = Math.random() * 6 + 8; // 8s - 14s bay bổng
    const delay = Math.random() * 12;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.35}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    container.appendChild(petal);
  }
}

/**
 * 2. Đọc ID người nhận từ URL (?id=...) và nạp dữ liệu
 */
function loadCurrentRecipient() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Tìm trong danh sách dữ liệu
  if (id && typeof RECIPIENTS_DATA !== 'undefined') {
    currentPerson = RECIPIENTS_DATA.find(p => p.id === id);
  }

  // Nếu không có param hoặc sai ID, mặc định lấy người đầu tiên
  if (!currentPerson && typeof RECIPIENTS_DATA !== 'undefined' && RECIPIENTS_DATA.length > 0) {
    currentPerson = RECIPIENTS_DATA[0];
  }

  if (!currentPerson) return;

  // Cập nhật tên lá thư popup 3s: Chị Nguyễn Thúy Linh (Trưởng ban) hoặc Ms. [Tên đầy đủ] cho các chị em
  const letterToName = document.getElementById('letter-to-name');
  if (letterToName) {
    if (currentPerson.id === 'chi_thuy_linh') {
      letterToName.textContent = `Chị ${currentPerson.ho_ten}`;
    } else {
      letterToName.textContent = `Ms. ${currentPerson.ho_ten}`;
    }
  }

  // Điền dữ liệu vào thiệp chi tiết bên trong
  const cardName = document.getElementById('card-person-name');
  const cardGreeting = document.getElementById('card-person-greeting');
  const cardImage = document.getElementById('card-person-image');

  if (cardName) {
    if (currentPerson.id === 'chi_thuy_linh') {
      cardName.textContent = `Chị ${currentPerson.ho_ten}`;
    } else {
      cardName.textContent = currentPerson.ho_ten;
    }
  }
  if (cardGreeting) cardGreeting.textContent = currentPerson.loi_chuc;

  if (cardImage) {
    const cacheBuster = '?v=20261012c';
    let baseImgUrl = formatImageUrl(currentPerson.link_anh);
    cardImage.src = baseImgUrl.includes('?') ? `${baseImgUrl}&v=20261012c` : `${baseImgUrl}${cacheBuster}`;
    
    cardImage.onerror = () => {
      // 1. Thử tìm file avatar ở thư mục gốc (avatar_[id].jpg)
      if (!cardImage.dataset.triedRoot) {
        cardImage.dataset.triedRoot = 'true';
        cardImage.src = `avatar_${currentPerson.id}.jpg${cacheBuster}`;
        return;
      }
      // 2. Thử trong thư mục con avatars/[id].jpg
      if (!cardImage.dataset.triedFolder) {
        cardImage.dataset.triedFolder = 'true';
        cardImage.src = `avatars/${currentPerson.id}.jpg${cacheBuster}`;
        return;
      }
      // 3. Fallback nếu không tìm thấy ảnh
      cardImage.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
    };
  }

  // Điền thông tin sự kiện an toàn
  if (typeof EVENT_INFO !== 'undefined') {
    const elTimeHighlight = document.getElementById('event-time-highlight');
    if (elTimeHighlight) elTimeHighlight.textContent = '18:30';
    const elDateFull = document.getElementById('event-date-full');
    if (elDateFull) elDateFull.textContent = 'Thứ 4, ngày 14/10/2026';
    const elLocName = document.getElementById('event-location-name');
    if (elLocName) elLocName.textContent = 'Sheraton Hanoi West';
    const elLocAddr = document.getElementById('event-location-address');
    if (elLocAddr) elLocAddr.textContent = 'Số 36 đường Lê Đức Thọ';

    const mapsBtn = document.getElementById('btn-google-maps');
    if (mapsBtn && EVENT_INFO.google_maps_url) mapsBtn.href = EVENT_INFO.google_maps_url;
  }
}

/**
 * 3. Hiệu ứng mở phong bao: Nắp lật mở -> Popup lá thư 3s -> Hiện thiệp chính
 */
function handleOpenEnvelope() {
  if (isOpening) return;
  isOpening = true;

  const wrapper = document.getElementById('envelope-wrapper');
  const letterPopup = document.getElementById('letter-popup');
  const envelopeSection = document.getElementById('envelope-section');
  const greetingSection = document.getElementById('full-greeting-section');

  // Bật nhạc nền
  playBackgroundMusic();

  // Nắp phong bao lật mở 3D
  if (wrapper) wrapper.classList.add('is-open');

  // Bắn pháo hoa rực rỡ
  fireConfetti();

  // Sau 450ms khi nắp mở ra, hiện popup lá thư (From Anh em TCKT To Ms. [Tên đầy đủ])
  setTimeout(() => {
    if (letterPopup) {
      letterPopup.classList.add('active');
    }

    // Hiển thị lá thư trong đúng 3 giây (3000ms) để người nhận kịp đọc
    setTimeout(() => {
      // Ẩn popup lá thư
      if (letterPopup) {
        letterPopup.classList.remove('active');
      }

      // Chuyển sang giao diện thiệp chính
      setTimeout(() => {
        if (envelopeSection) envelopeSection.classList.add('hidden');
        if (greetingSection) {
          greetingSection.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 350);
    }, 3000);
  }, 450);
}

/**
 * 4. Đăng ký các sự kiện tương tác
 */
function setupEventListeners() {
  // Click vào phong bao là mở thiệp
  const wrapper = document.getElementById('envelope-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', handleOpenEnvelope);
  }

  // Nút bật/tắt nhạc
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', toggleBackgroundMusic);
  }
}

/**
 * 7. Phát nhạc nền (Hỗ trợ trình duyệt máy tính & di động)
 */
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  if (!audio.src || !audio.src.includes('music.mp3')) {
    audio.src = 'music.mp3';
  }
  audio.volume = 0.85;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicPlaying = true;
      if (icon) {
        icon.className = 'fa-solid fa-compact-disc text-xl spin-slow';
      }
    }).catch(err => {
      console.log('Trình duyệt cần tương tác người dùng để phát nhạc:', err);
      // Đăng ký mở khóa âm thanh ngay lần chạm / click đầu tiên của người dùng
      const unlockAudio = () => {
        audio.play().then(() => {
          isMusicPlaying = true;
          if (icon) {
            icon.className = 'fa-solid fa-compact-disc text-xl spin-slow';
          }
        }).catch(() => {});
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      };
      document.addEventListener('click', unlockAudio, { once: true });
      document.addEventListener('touchstart', unlockAudio, { once: true });
    });
  }
}

function toggleBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (icon) {
        icon.className = 'fa-solid fa-compact-disc text-xl spin-slow';
      }
      showToast('🎵 Đang phát nhạc nền');
    }).catch(err => {
      console.log('Lỗi phát nhạc:', err);
      showToast('⚠️ Không thể phát nhạc, vui lòng thử lại');
    });
  } else {
    audio.pause();
    isMusicPlaying = false;
    if (icon) {
      icon.className = 'fa-solid fa-compact-disc text-xl';
    }
    showToast('🔇 Đã tắt nhạc');
  }
}

/**
 * 8. Hiệu ứng Canvas Confetti
 */
function fireConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#f43f5e', '#fb7185', '#fbbf24', '#fbcfe8']
  });
}

/**
 * 9. Toast thông báo
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgElem = document.getElementById('toast-message');
  if (!toast || !msgElem) return;

  msgElem.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2800);
}

/**
 * =========================================================================
 * 10. SƠ ĐỒ CHỖ NGỒI CÁ NHÂN HÓA (SEATING CHART MODAL & FLOOR PLAN)
 * =========================================================================
 */
let currentSeatInfo = null;

function removeVietnameseTones(str) {
  if (!str) return '';
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim();
}

function initSeatingChart() {
  if (typeof SEATING_MAP_DATA === 'undefined') return;

  // 1. Tìm thông tin chỗ ngồi của người nhận
  if (currentPerson) {
    currentSeatInfo = getGuestSeatingInfo(currentPerson.id, currentPerson.ho_ten);
  }

  // 2. Cập nhật nút bấm trong thiệp
  const btnLabel = document.getElementById('btn-seating-label');
  const btnBadgeText = document.getElementById('btn-seating-badge-text');

  if (currentPerson && btnLabel) {
    const shortName = getShortRecipientName(currentPerson);
    btnLabel.textContent = `Vị Trí Của ${shortName}`;
  }

  if (currentSeatInfo && btnBadgeText) {
    btnBadgeText.textContent = `Ghế ${currentSeatInfo.seat} • ${currentSeatInfo.table_code || currentSeatInfo.table_name}`;
  }

  // 3. Render giao diện mặt bằng sơ đồ
  renderSeatingFloorPlan();

  // 4. Cập nhật thông tin trong Spotlight Card
  updateSpotlightCard();

  // 5. Đăng ký các sự kiện tương tác sơ đồ
  setupSeatingEventListeners();
}

function updateSpotlightCard() {
  if (!currentPerson || !currentSeatInfo) return;

  const spotlightName = document.getElementById('spotlight-guest-name');
  const spotlightAvatar = document.getElementById('spotlight-avatar');
  const spotlightTableDesc = document.getElementById('spotlight-table-desc');
  const spotlightSeatNum = document.getElementById('spotlight-seat-num');
  const spotlightMates = document.getElementById('spotlight-table-mates');

  if (spotlightName) spotlightName.textContent = currentPerson.ho_ten;
  if (spotlightAvatar) {
    const cardImg = document.getElementById('card-person-image');
    spotlightAvatar.src = cardImg ? cardImg.src : formatImageUrl(currentPerson.link_anh);
  }
  if (spotlightTableDesc) {
    spotlightTableDesc.textContent = `${currentSeatInfo.table_name} (${currentSeatInfo.table_desc})`;
  }
  if (spotlightSeatNum) spotlightSeatNum.textContent = currentSeatInfo.seat;

  if (spotlightMates) {
    if (currentSeatInfo.table_mates && currentSeatInfo.table_mates.length > 0) {
      spotlightMates.innerHTML = currentSeatInfo.table_mates.map(m => {
        return `<span class="inline-block bg-white/80 border border-rose-200 text-rose-950 font-semibold px-2 py-0.5 rounded-md text-[11px] shadow-2xs">${m.name}</span>`;
      }).join(' ');
    } else {
      spotlightMates.textContent = 'Toàn thể đồng nghiệp Ban TCKT';
    }
  }
}

function renderSeatingFloorPlan() {
  if (!SEATING_MAP_DATA || !SEATING_MAP_DATA.tables) return;

  const rowBooth = document.getElementById('row-booth-tables');
  const rowMiddle = document.getElementById('row-middle-tables');
  const rowBottom = document.getElementById('row-bottom-tables');

  if (rowBooth) rowBooth.innerHTML = '';
  if (rowMiddle) rowMiddle.innerHTML = '';
  if (rowBottom) rowBottom.innerHTML = '';

  SEATING_MAP_DATA.tables.forEach(table => {
    const isMyTable = currentSeatInfo && currentSeatInfo.table_id === table.id;

    // Dãy 1: B10, B11, B12, B13
    if (['table_b10', 'table_b11', 'table_b12', 'table_b13'].includes(table.id) && rowBooth) {
      const tableEl = createTableElement(table, isMyTable, 'col-span-1');
      rowBooth.appendChild(tableEl);
    }
    // Dãy 2: Giữa trái (3 col), Bàn dài gỗ (6 col), Giữa phải (3 col)
    else if (['table_mid_left', 'table_mid_wood', 'table_mid_right'].includes(table.id) && rowMiddle) {
      let colSpan = 'col-span-12 md:col-span-4';
      if (table.id === 'table_mid_wood') colSpan = 'col-span-12 md:col-span-5';
      else if (table.id === 'table_mid_left') colSpan = 'col-span-12 md:col-span-3';
      else if (table.id === 'table_mid_right') colSpan = 'col-span-12 md:col-span-4';

      const tableEl = createTableElement(table, isMyTable, colSpan);
      rowMiddle.appendChild(tableEl);
    }
    // Dãy 3: Dưới trái, Dưới giữa (VIP), Dưới phải
    else if (['table_bot_left', 'table_bot_mid', 'table_bot_right'].includes(table.id) && rowBottom) {
      const tableEl = createTableElement(table, isMyTable, 'col-span-1');
      rowBottom.appendChild(tableEl);
    }
  });
}

function createTableElement(table, isMyTable, colClass) {
  const container = document.createElement('div');
  container.className = `table-card-container flex flex-col justify-between ${colClass} ${isMyTable ? 'is-my-table' : ''}`;
  container.id = `table-dom-${table.id}`;

  // 1. Hàng ghế phía trên
  const topRowEl = document.createElement('div');
  topRowEl.className = 'flex items-center justify-around gap-1.5 mb-2';
  table.top_row.forEach(seat => {
    topRowEl.appendChild(createChairElement(seat, table));
  });
  container.appendChild(topRowEl);

  // 2. Mặt bàn ở giữa
  const surfaceEl = document.createElement('div');
  let surfaceClass = 'table-surface-bar';
  if (table.type === 'wood_long') surfaceClass += ' wood-surface';
  else if (table.type === 'vip') surfaceClass += ' vip-surface';
  surfaceEl.className = surfaceClass;
  surfaceEl.innerHTML = `<i class="fa-solid fa-utensils text-[10px] opacity-70 mr-1"></i>${table.name}`;
  container.appendChild(surfaceEl);

  // 3. Hàng ghế phía dưới
  const botRowEl = document.createElement('div');
  botRowEl.className = 'flex items-center justify-around gap-1.5 mt-2';
  table.bottom_row.forEach(seat => {
    botRowEl.appendChild(createChairElement(seat, table));
  });
  container.appendChild(botRowEl);

  return container;
}

function createChairElement(seat, table) {
  const chair = document.createElement('div');
  const isMySeat = currentSeatInfo && currentSeatInfo.seat === seat.seat;

  chair.className = `chair-box ${isMySeat ? 'is-my-seat' : ''}`;
  chair.dataset.seat = seat.seat;
  chair.dataset.name = seat.name;
  chair.dataset.table = table.name;
  chair.id = `chair-${seat.seat}`;

  let pinHtml = '';
  if (isMySeat) {
    pinHtml = `<div class="seat-badge-pin"><i class="fa-solid fa-star"></i> Vị Trí Của Chị</div>`;
  }

  chair.innerHTML = `
    ${pinHtml}
    <div class="chair-num">${seat.seat}</div>
    <div class="chair-name" title="${seat.name}">${seat.name}</div>
  `;

  chair.addEventListener('click', () => {
    showToast(`🪑 Ghế ${seat.seat}: ${seat.name} (${table.name})`);
  });

  return chair;
}

function setupSeatingEventListeners() {
  const btnOpen = document.getElementById('btn-open-seating');
  const btnClose = document.getElementById('btn-close-seating');
  const btnFooterClose = document.getElementById('btn-footer-close-seating');
  const modal = document.getElementById('seating-modal');
  const btnFocus = document.getElementById('btn-focus-seat');
  const searchInput = document.getElementById('seating-search-input');

  if (btnOpen) btnOpen.addEventListener('click', openSeatingModal);
  if (btnClose) btnClose.addEventListener('click', closeSeatingModal);
  if (btnFooterClose) btnFooterClose.addEventListener('click', closeSeatingModal);

  // Click ra ngoài thẻ modal để đóng
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSeatingModal();
    });
  }

  // Phím Esc để đóng
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeSeatingModal();
    }
  });

  // Nút định vị ghế
  if (btnFocus) {
    btnFocus.addEventListener('click', () => {
      focusMySeat(true);
    });
  }

  // Tìm kiếm tên trên sơ đồ
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSeatingSearch(e.target.value);
    });
  }
}

function openSeatingModal() {
  const modal = document.getElementById('seating-modal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Hiệu ứng pháo hoa nhẹ khi mở sơ đồ
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#fb7185']
    });
  }

  // Tự động cuộn tới ghế của mình
  setTimeout(() => {
    focusMySeat(true);
  }, 350);
}

function closeSeatingModal() {
  const modal = document.getElementById('seating-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function focusMySeat(smooth = true) {
  const mySeatEl = document.querySelector('.chair-box.is-my-seat');
  if (mySeatEl) {
    mySeatEl.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'center',
      inline: 'center'
    });

    // Nhấp nháy tạo sự chú ý
    mySeatEl.classList.remove('is-my-seat');
    void mySeatEl.offsetWidth; // trigger reflow
    mySeatEl.classList.add('is-my-seat');
  }
}

function handleSeatingSearch(query) {
  const allChairs = document.querySelectorAll('.chair-box');
  const cleanQ = removeVietnameseTones(query);

  if (!cleanQ) {
    allChairs.forEach(c => {
      c.classList.remove('is-search-match', 'is-search-dimmed');
    });
    return;
  }

  allChairs.forEach(c => {
    const rawName = c.dataset.name || '';
    const seatNum = c.dataset.seat || '';
    const cleanName = removeVietnameseTones(rawName);

    if (cleanName.includes(cleanQ) || seatNum === cleanQ) {
      c.classList.add('is-search-match');
      c.classList.remove('is-search-dimmed');
    } else {
      c.classList.remove('is-search-match');
      c.classList.add('is-search-dimmed');
    }
  });
}

