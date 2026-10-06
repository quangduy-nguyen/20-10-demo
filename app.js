/**
 * THIỆP CHÚC MỪNG 20/10 CÁ NHÂN HÓA
 * Script xử lý hiệu ứng mở phong bao 3D, cá nhân hóa & xác nhận tham dự
 */

// Cấu hình URL Webhook Google Sheet để tự động lưu câu trả lời vào Google Sheet
// (Hướng dẫn tạo trong file google-apps-script.js)
const GOOGLE_SHEET_WEBHOOK_URL = '';

let currentPerson = null;
let isMusicPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  loadCurrentRecipient();
  setupEventListeners();
});

/**
 * 1. Hiệu ứng cánh hoa bay lơ lửng
 */
function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const PETAL_COUNT = 22;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 14 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 7;
    const delay = Math.random() * 10;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s, ${Math.random() * 3 + 2}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

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

  // Điền dữ liệu vào phong bao bên ngoài
  const envName = document.getElementById('envelope-person-name');
  const envTitle = document.getElementById('envelope-person-title');
  const envSnippet = document.getElementById('envelope-preview-snippet');

  if (envName) envName.textContent = currentPerson.ho_ten;
  if (envTitle) envTitle.textContent = currentPerson.chuc_danh;
  if (envSnippet) envSnippet.textContent = currentPerson.loi_chuc;

  // Điền dữ liệu vào thiệp chi tiết bên trong
  const cardName = document.getElementById('card-person-name');
  const cardTitle = document.getElementById('card-person-title');
  const cardGreeting = document.getElementById('card-person-greeting');
  const cardImage = document.getElementById('card-person-image');

  if (cardName) cardName.textContent = currentPerson.ho_ten;
  if (cardTitle) cardTitle.textContent = currentPerson.chuc_danh;
  if (cardGreeting) cardGreeting.textContent = currentPerson.loi_chuc;

  if (cardImage) {
    cardImage.src = currentPerson.link_anh;
    cardImage.onerror = () => {
      cardImage.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
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
 * 3. Hiệu ứng mở phong bao thư 3D & Pop up thiệp
 */
function handleOpenEnvelope() {
  const wrapper = document.getElementById('envelope-wrapper');
  const envelopeSection = document.getElementById('envelope-section');
  const greetingSection = document.getElementById('full-greeting-section');

  // Bật nhạc nền
  playBackgroundMusic();

  // Thêm class kích hoạt animation 3D: Nắp lật mở, thiệp trượt pop-up lên
  if (wrapper) wrapper.classList.add('is-open');

  // Bắn pháo hoa rực rỡ
  fireConfetti();

  // Sau khi animation nắp mở và thiệp trượt ra hoàn tất (khoảng 850ms), hiện màn hình thiệp đầy đủ
  setTimeout(() => {
    if (envelopeSection) envelopeSection.classList.add('hidden');
    if (greetingSection) {
      greetingSection.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 900);
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
  // Ngày 20/10/2026 từ 18:30 (11:30 UTC) đến 21:30 (14:30 UTC)
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
  // Mở phong bì khi bấm vào con dấu sáp hoặc thẻ bao bì
  const seal = document.getElementById('btn-seal');
  const envContainer = document.getElementById('env-container');
  const btnOpen = document.getElementById('btn-open-envelope');

  if (seal) seal.addEventListener('click', handleOpenEnvelope);
  if (envContainer) envContainer.addEventListener('click', handleOpenEnvelope);
  if (btnOpen) btnOpen.addEventListener('click', handleOpenEnvelope);

  // Nút bật/tắt nhạc
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', toggleBackgroundMusic);
  }

  // Sao chép lời chúc
  const btnCopyGreeting = document.getElementById('btn-copy-greeting');
  if (btnCopyGreeting) {
    btnCopyGreeting.addEventListener('click', () => {
      if (!currentPerson) return;
      navigator.clipboard.writeText(currentPerson.loi_chuc).then(() => {
        showToast('💌 Đã sao chép lời chúc vào khay nhớ tạm!');
      });
    });
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
