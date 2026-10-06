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

  // Cập nhật tên lá thư popup 3s: From Ban TCKT To [Tên người nhận]
  const letterToName = document.getElementById('letter-to-name');
  if (letterToName) {
    letterToName.textContent = getShortRecipientName(currentPerson);
  }

  // Điền dữ liệu vào thiệp chi tiết bên trong
  const cardName = document.getElementById('card-person-name');
  const cardTitle = document.getElementById('card-person-title');
  const cardGreeting = document.getElementById('card-person-greeting');
  const cardImage = document.getElementById('card-person-image');

  if (cardName) cardName.textContent = currentPerson.ho_ten;
  if (cardTitle) cardTitle.textContent = currentPerson.chuc_danh;
  if (cardGreeting) cardGreeting.textContent = currentPerson.loi_chuc;

  if (cardImage) {
    cardImage.src = formatImageUrl(currentPerson.link_anh);
    cardImage.onerror = () => {
      // Fallback nếu ảnh drive hoặc link ngoài chưa public
      const match = currentPerson.link_anh ? currentPerson.link_anh.match(/\/d\/([a-zA-Z0-9_-]+)/) : null;
      if (match && !cardImage.dataset.triedFallback) {
        cardImage.dataset.triedFallback = 'true';
        cardImage.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
      } else {
        cardImage.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
      }
    };
  }

  // Điền thông tin sự kiện
  if (typeof EVENT_INFO !== 'undefined') {
    document.getElementById('event-title').textContent = EVENT_INFO.title;
    document.getElementById('event-subtitle').textContent = EVENT_INFO.subtitle;
    document.getElementById('event-date').textContent = EVENT_INFO.date_text;
    document.getElementById('event-location-name').textContent = EVENT_INFO.location_name;
    document.getElementById('event-location-address').textContent = EVENT_INFO.location_address;
    document.getElementById('event-dresscode').textContent = EVENT_INFO.dress_code;

    const mapsBtn = document.getElementById('btn-google-maps');
    if (mapsBtn) mapsBtn.href = EVENT_INFO.google_maps_url;
  }

  // Cấu hình link Google Calendar
  updateGoogleCalendarLink();

  // Kiểm tra nếu người này đã gửi xác nhận trước đó
  const savedRsvp = localStorage.getItem(`rsvp_${currentPerson.id}`);
  if (savedRsvp) {
    try {
      const data = JSON.parse(savedRsvp);
      const radio = document.querySelector(`input[name="rsvp_status"][value="${data.status}"]`);
      if (radio) radio.checked = true;
      const noteElem = document.getElementById('rsvp-note');
      if (noteElem) noteElem.value = data.note || '';
    } catch (e) {}
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

  // Sau 450ms khi nắp mở ra, hiện popup lá thư (From TCKT To [Tên người nhận])
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
 * 4. Tạo đường link Google Calendar
 */
function updateGoogleCalendarLink() {
  const btn = document.getElementById('btn-google-calendar');
  if (!btn || !currentPerson || typeof EVENT_INFO === 'undefined') return;

  const title = encodeURIComponent(EVENT_INFO.title);
  const location = encodeURIComponent(`${EVENT_INFO.location_name}, ${EVENT_INFO.location_address}`);
  const details = encodeURIComponent(
    `Kính mời ${currentPerson.ho_ten} tham dự Dạ tiệc chúc mừng ngày Phụ nữ Việt Nam 20/10.\n` +
    `Địa điểm: ${EVENT_INFO.location_name} (${EVENT_INFO.location_address})\n` +
    `Trang phục: ${EVENT_INFO.dress_code}\n` +
    `Bản đồ chỉ đường: ${EVENT_INFO.google_maps_url}`
  );
  const dates = '20261020T113000Z/20261020T143000Z';

  btn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * 5. Xử lý Form Xác Nhận Tham Dự (2 options)
 */
function handleRsvpSubmit(e) {
  e.preventDefault();
  if (!currentPerson) return;

  const statusInput = document.querySelector('input[name="rsvp_status"]:checked');
  const noteInput = document.getElementById('rsvp-note');
  if (!statusInput) return;

  const statusVal = statusInput.value; // "Sẽ tham dự" hoặc "Không tham dự"
  const noteVal = noteInput ? noteInput.value.trim() : '';

  const rsvpRecord = {
    id: currentPerson.id,
    ho_ten: currentPerson.ho_ten,
    chuc_danh: currentPerson.chuc_danh,
    status: statusVal,
    note: noteVal,
    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
  };

  // 1. Lưu vào LocalStorage
  localStorage.setItem(`rsvp_${currentPerson.id}`, JSON.stringify(rsvpRecord));

  // 2. Gửi về Google Sheet Webhook (nếu BTC đã cấu hình)
  if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
    try {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpRecord)
      }).catch(err => console.log('Sheet Webhook sync:', err));
    } catch (err) {}
  }

  // Bắn pháo hoa nếu chọn tham dự
  if (statusVal === 'Sẽ tham dự') {
    fireConfetti();
    showToast(`🌸 Tuyệt vời! Cảm ơn ${currentPerson.ho_ten} đã xác nhận tham dự!`);
  } else {
    showToast(`Cảm ơn ${currentPerson.ho_ten} đã gửi phản hồi cho Ban Tổ Chức!`);
  }

  // Khóa nút để tránh bấm nhiều lần
  const submitBtn = document.getElementById('btn-submit-rsvp');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã Gửi Xác Nhận';
    submitBtn.classList.replace('from-rose-600', 'from-emerald-600');
    submitBtn.classList.replace('to-pink-600', 'to-teal-600');
  }
}

/**
 * 6. Đăng ký các sự kiện tương tác
 */
function setupEventListeners() {
  // Chỉ cần click vào phong bao (bất cứ vị trí nào trên phong bì hoặc con dấu) là mở thiệp
  const wrapper = document.getElementById('envelope-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', handleOpenEnvelope);
  }

  // Nút bật/tắt nhạc
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', toggleBackgroundMusic);
  }

  // Form xác nhận tham dự
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }
}

/**
 * 7. Phát nhạc nền
 */
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  audio.play().then(() => {
    isMusicPlaying = true;
    if (icon) icon.classList.add('spin-slow');
  }).catch(() => {});
}

function toggleBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    isMusicPlaying = true;
    if (icon) icon.classList.add('spin-slow');
    showToast('🎵 Đang phát nhạc nền');
  } else {
    audio.pause();
    isMusicPlaying = false;
    if (icon) icon.classList.remove('spin-slow');
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
