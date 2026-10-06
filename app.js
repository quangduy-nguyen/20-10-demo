/**
 * THIỆP CHÚC MỪNG 20/10 CÁ NHÂN HÓA
 * Script xử lý tương tác, hiệu ứng, âm nhạc, lịch và khảo sát tham dự
 */

// Trạng thái ứng dụng
// Cấu hình Webhook Google Sheet (Nếu muốn tự động lưu phản hồi vào Google Sheet)
// Hướng dẫn xem trong file google-apps-script.js
const GOOGLE_SHEET_WEBHOOK_URL = '';

let currentRecipientIndex = 0;
let isMusicPlaying = false;

// Khởi tạo ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  initRecipientsDropdown();
  parseUrlAndLoadRecipient();
  setupEventListeners();
  updateRsvpStats();
});

/**
 * 1. Hiệu ứng cánh hoa bay lơ lửng
 */
function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const PETAL_COUNT = 24;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 14 + 10; // 10px - 24px
    const left = Math.random() * 100; // 0% - 100%
    const duration = Math.random() * 8 + 7; // 7s - 15s
    const delay = Math.random() * 10; // 0s - 10s
    const opacity = Math.random() * 0.5 + 0.35;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.opacity = opacity;
    petal.style.animationDuration = `${duration}s, ${Math.random() * 3 + 2}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

    container.appendChild(petal);
  }
}

/**
 * 2. Đổ danh sách 30 người vào thẻ Select
 */
function initRecipientsDropdown() {
  const select = document.getElementById('recipient-select');
  if (!select || !RECIPIENTS_DATA) return;

  select.innerHTML = '';
  RECIPIENTS_DATA.forEach((person, index) => {
    const option = document.createElement('option');
    option.value = person.id;
    option.textContent = `${index + 1}. ${person.ho_ten} (${person.chuc_danh})`;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    switchRecipientById(selectedId);
  });
}

/**
 * 3. Đọc query param ?id=... từ URL
 */
function parseUrlAndLoadRecipient() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    const index = RECIPIENTS_DATA.findIndex(p => p.id === id);
    if (index !== -1) {
      currentRecipientIndex = index;
    }
  }

  loadRecipientData(currentRecipientIndex);
}

/**
 * 4. Tải dữ liệu cá nhân hóa người nhận lên giao diện
 */
function loadRecipientData(index) {
  if (index < 0 || index >= RECIPIENTS_DATA.length) index = 0;
  currentRecipientIndex = index;

  const person = RECIPIENTS_DATA[index];
  if (!person) return;

  // Cập nhật thẻ Select
  const select = document.getElementById('recipient-select');
  if (select) select.value = person.id;

  // Cập nhật phong bì chưa mở
  document.getElementById('envelope-recipient-name').textContent = person.ho_ten;
  document.getElementById('envelope-recipient-title').textContent = person.chuc_danh;

  // Cập nhật card chính
  document.getElementById('person-name').textContent = person.ho_ten;
  document.getElementById('person-title').textContent = person.chuc_danh;
  document.getElementById('person-greeting').textContent = person.loi_chuc;
  document.getElementById('person-ai-poem').textContent = person.ai_poem || `Chúc ${person.ho_ten} ngày 20/10 ngập tràn niềm vui, xinh đẹp và luôn hạnh phúc!`;

  // Ảnh chân dung
  const imgElem = document.getElementById('person-image');
  if (imgElem) {
    imgElem.src = person.link_anh;
    imgElem.onerror = () => {
      // Fallback ảnh nếu link bị lỗi
      imgElem.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
    };
  }

  // Cập nhật thông tin sự kiện tiệc
  if (EVENT_INFO) {
    document.getElementById('event-title').textContent = EVENT_INFO.title;
    document.getElementById('event-subtitle').textContent = EVENT_INFO.subtitle;
    document.getElementById('event-date').textContent = EVENT_INFO.date_text;
    document.getElementById('event-location-name').textContent = EVENT_INFO.location_name;
    document.getElementById('event-location-address').textContent = EVENT_INFO.location_address;
    document.getElementById('event-dresscode').textContent = EVENT_INFO.dress_code;
    
    // Nút Google Maps
    const mapsBtn = document.getElementById('btn-google-maps');
    if (mapsBtn) mapsBtn.href = EVENT_INFO.google_maps_url;
  }

  // Cập nhật shortcut Google Calendar
  updateGoogleCalendarLink(person);

  // Cập nhật modal AI Song
  document.getElementById('modal-song-name').textContent = person.ho_ten;
  document.getElementById('modal-song-lyrics').textContent = `(Lời 1 - Dành tặng ${person.ho_ten})\nSớm mai ngát hương, tiếng cười xôn xao,\n${person.ho_ten} dịu dàng tựa ánh trăng sao.\n${person.chuc_danh} rạng rỡ thanh tao,\nTháng mười trao trọn ngọt ngào yêu thương!\n\n(Điệp khúc)\nChúc em/chị mãi xinh tươi như hoa ban mai,\nCon đường tương lai nở rộ muôn màu,\n20 tháng 10 đong đầy hạnh phúc,\nNụ cười rạng rỡ bên bạn bè thân thương!`;

  const promptElem = document.getElementById('modal-ai-prompt');
  if (promptElem) {
    promptElem.textContent = `Vietnamese pop acoustic cheerful song, warm female vocals, lyrics celebrating ${person.ho_ten} (${person.chuc_danh}) on Vietnamese Women's Day 20-10, sweet joyful melody`;
  }

  // Cập nhật lại form khảo sát nếu đã từng vote trước đó
  const savedRsvp = localStorage.getItem(`rsvp_${person.id}`);
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    if (savedRsvp) {
      const data = JSON.parse(savedRsvp);
      const radio = rsvpForm.querySelector(`input[name="rsvp_status"][value="${data.status}"]`);
      if (radio) radio.checked = true;
      const noteInput = document.getElementById('rsvp-note');
      if (noteInput) noteInput.value = data.note || '';
    } else {
      const defaultRadio = rsvpForm.querySelector('input[name="rsvp_status"][value="yes"]');
      if (defaultRadio) defaultRadio.checked = true;
      const noteInput = document.getElementById('rsvp-note');
      if (noteInput) noteInput.value = '';
    }
  }

  // Cập nhật nút copy link
  const copyBtnText = document.getElementById('copy-btn-text');
  if (copyBtnText) copyBtnText.textContent = `Sao chép link (${person.ho_ten.split(' ').pop()})`;
}

/**
 * 5. Chuyển người nhận theo ID
 */
function switchRecipientById(id) {
  const index = RECIPIENTS_DATA.findIndex(p => p.id === id);
  if (index !== -1) {
    currentRecipientIndex = index;
    loadRecipientData(currentRecipientIndex);

    // Cập nhật URL mà không reload trang
    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }
}

/**
 * 6. Đăng ký các sự kiện tương tác
 */
function setupEventListeners() {
  // Nút mở thiệp từ phong bì
  const btnOpen = document.getElementById('btn-open-envelope');
  if (btnOpen) {
    btnOpen.addEventListener('click', openEnvelope);
  }

  // Nút đóng lại phong bì
  const btnReopen = document.getElementById('btn-reopen-envelope');
  if (btnReopen) {
    btnReopen.addEventListener('click', () => {
      document.getElementById('card-content-section').classList.add('hidden');
      document.getElementById('envelope-section').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Đã đóng lại phong bì!');
    });
  }

  // Nút chuyển Người trước / Người sau
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      let newIdx = currentRecipientIndex - 1;
      if (newIdx < 0) newIdx = RECIPIENTS_DATA.length - 1;
      switchRecipientById(RECIPIENTS_DATA[newIdx].id);
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      let newIdx = currentRecipientIndex + 1;
      if (newIdx >= RECIPIENTS_DATA.length) newIdx = 0;
      switchRecipientById(RECIPIENTS_DATA[newIdx].id);
    });
  }

  // Bật/tắt nhạc
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // Sao chép link cá nhân
  const btnCopyLink = document.getElementById('btn-copy-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', copyPersonalLink);
  }

  // Sao chép lời chúc
  const btnCopyGreeting = document.getElementById('btn-copy-greeting');
  if (btnCopyGreeting) {
    btnCopyGreeting.addEventListener('click', copyGreetingText);
  }

  // Nút Apple / Outlook .ics
  const btnIcs = document.getElementById('btn-download-ics');
  if (btnIcs) {
    btnIcs.addEventListener('click', downloadIcsFile);
  }

  // Nút Nhắc hẹn Zalo
  const btnZalo = document.getElementById('btn-zalo-reminder');
  if (btnZalo) {
    btnZalo.addEventListener('click', copyZaloReminder);
  }

  // Khảo sát RSVP submit
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }

  // Modals
  setupModals();
}

/**
 * 7. Mở phong bì thư và bắn pháo hoa
 */
function openEnvelope() {
  const envelopeSec = document.getElementById('envelope-section');
  const cardSec = document.getElementById('card-content-section');

  // Bật nhạc nền
  playMusic();

  // Bắn pháo hoa rực rỡ
  fireConfetti();

  // Chuyển view
  envelopeSec.classList.add('hidden');
  cardSec.classList.remove('hidden');

  // Cuộn mượt
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 8. Trình phát nhạc nền
 */
function playMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  audio.play().then(() => {
    isMusicPlaying = true;
    if (icon) icon.classList.add('animate-spin-slow');
  }).catch((err) => {
    console.log('Autoplay blocked by browser policy:', err);
  });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    isMusicPlaying = true;
    if (icon) icon.classList.add('animate-spin-slow');
    showToast('🎵 Đang phát nhạc nền!');
  } else {
    audio.pause();
    isMusicPlaying = false;
    if (icon) icon.classList.remove('animate-spin-slow');
    showToast('🔇 Đã tắt nhạc!');
  }
}

/**
 * 9. Hiệu ứng Canvas Confetti
 */
function fireConfetti() {
  if (typeof confetti !== 'function') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f43f5e', '#fda4af', '#fbbf24'] });
  fire(0.2, { spread: 60, colors: ['#e11d48', '#fbcfe8', '#f59e0b'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ff80bf', '#ffd1dc'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

/**
 * 10. Shortcut Google Calendar
 */
function updateGoogleCalendarLink(person) {
  const btn = document.getElementById('btn-google-calendar');
  if (!btn || !EVENT_INFO) return;

  const title = encodeURIComponent(EVENT_INFO.title);
  const location = encodeURIComponent(`${EVENT_INFO.location_name}, ${EVENT_INFO.location_address}`);
  const details = encodeURIComponent(
    `Thư mời tham dự Dạ tiệc chúc mừng ngày Phụ nữ Việt Nam 20/10 gửi tới ${person.ho_ten}.\n` +
    `Địa điểm: ${EVENT_INFO.location_name}\n` +
    `Trang phục: ${EVENT_INFO.dress_code}\n` +
    `Bản đồ chỉ đường: ${EVENT_INFO.google_maps_url}`
  );
  // Ngày 20/10/2026 từ 18:30 (11:30 UTC) đến 21:30 (14:30 UTC)
  const dates = '20261020T113000Z/20261020T143000Z';

  btn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * 11. Tải file iCalendar .ics cho Apple Calendar / Outlook
 */
function downloadIcsFile() {
  const person = RECIPIENTS_DATA[currentRecipientIndex];
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//20-10 Party Invitation//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:20-10-event-' + Date.now() + '@company.com',
    'DTSTAMP:20261006T000000Z',
    'DTSTART:20261020T113000Z',
    'DTEND:20261020T143000Z',
    'SUMMARY:' + (EVENT_INFO.title || 'Dạ tiệc 20/10'),
    'DESCRIPTION:' + `Dạ tiệc tôn vinh phái đẹp 20/10 gửi tới ${person.ho_ten}. Trang phục: ${EVENT_INFO.dress_code}`,
    'LOCATION:' + `${EVENT_INFO.location_name}, ${EVENT_INFO.location_address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Thiep-Moi-20-10-Maison-Sen.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('🍏 Đã tải file lịch .ics cho Apple/Outlook!');
}

/**
 * 12. Sao chép nhắc hẹn gửi Zalo
 */
function copyZaloReminder() {
  const person = RECIPIENTS_DATA[currentRecipientIndex];
  const reminderText = 
`🌸 [NHẮC HẸN 20/10] DẠ TIỆC TÔN VINH PHÁI ĐẸP 🌸
Kính gửi: ${person.ho_ten} (${person.chuc_danh})
⏰ Thời gian: ${EVENT_INFO.date_text}
📍 Địa điểm: ${EVENT_INFO.location_name} - ${EVENT_INFO.location_address}
👗 Trang phục: ${EVENT_INFO.dress_code}
🗺️ Link Google Maps: ${EVENT_INFO.google_maps_url}
💌 Link thiệp cá nhân: ${window.location.origin}${window.location.pathname}?id=${person.id}

Hẹn gặp chị/em tối 20/10 thật rạng rỡ nhé! ❤️`;

  navigator.clipboard.writeText(reminderText).then(() => {
    showToast('💬 Đã sao chép nội dung nhắc hẹn Zalo!');
  });
}

/**
 * 13. Xử lý Form Khảo sát (RSVP Poll)
 */
function handleRsvpSubmit(e) {
  e.preventDefault();
  const person = RECIPIENTS_DATA[currentRecipientIndex];
  const form = e.target;
  const statusInput = form.querySelector('input[name="rsvp_status"]:checked');
  const noteInput = document.getElementById('rsvp-note');

  if (!statusInput) return;

  const rsvpRecord = {
    id: person.id,
    ho_ten: person.ho_ten,
    chuc_danh: person.chuc_danh,
    status: statusInput.value,
    note: noteInput ? noteInput.value.trim() : '',
    timestamp: new Date().toISOString()
  };

  // Lưu vào localStorage
  localStorage.setItem(`rsvp_${person.id}`, JSON.stringify(rsvpRecord));

  // Gửi tới Google Sheet Webhook (nếu đã cấu hình)
  if (typeof GOOGLE_SHEET_WEBHOOK_URL !== 'undefined' && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
    try {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpRecord)
      }).catch(err => console.log('Webhook Sheet error:', err));
    } catch (err) {}
  }

  // Bắn pháo hoa ăn mừng
  fireConfetti();

  // Hiển thị thông báo
  const statusTextMap = {
    'yes': 'tham gia',
    'maybe': 'đang sắp xếp',
    'no': 'bận việc'
  };
  showToast(`🎉 Cảm ơn ${person.ho_ten} đã phản hồi (${statusTextMap[statusInput.value]})!`);

  // Cập nhật lại thống kê hiển thị
  updateRsvpStats();
}

/**
 * 14. Thống kê kết quả Poll
 */
function updateRsvpStats() {
  let yes = 24; // Mock base count for demo
  let maybe = 4;
  let no = 1;

  // Đếm thêm dữ liệu từ localStorage
  RECIPIENTS_DATA.forEach(p => {
    const item = localStorage.getItem(`rsvp_${p.id}`);
    if (item) {
      try {
        const data = JSON.parse(item);
        if (data.status === 'yes') yes++;
        else if (data.status === 'maybe') maybe++;
        else if (data.status === 'no') no++;
      } catch (err) {}
    }
  });

  const total = yes + maybe + no;
  const yesPct = Math.round((yes / total) * 100);
  const maybePct = Math.round((maybe / total) * 100);
  const noPct = 100 - yesPct - maybePct;

  const elTotal = document.getElementById('rsvp-total-count');
  if (elTotal) elTotal.textContent = `${total} phản hồi`;

  const elYesPct = document.getElementById('stat-yes-pct');
  const elYesBar = document.getElementById('stat-yes-bar');
  if (elYesPct) elYesPct.textContent = `${yesPct}% (${yes} người)`;
  if (elYesBar) elYesBar.style.width = `${yesPct}%`;

  const elMaybePct = document.getElementById('stat-maybe-pct');
  const elMaybeBar = document.getElementById('stat-maybe-bar');
  if (elMaybePct) elMaybePct.textContent = `${maybePct}% (${maybe} người)`;
  if (elMaybeBar) elMaybeBar.style.width = `${maybePct}%`;

  const elNoPct = document.getElementById('stat-no-pct');
  const elNoBar = document.getElementById('stat-no-bar');
  if (elNoPct) elNoPct.textContent = `${noPct}% (${no} người)`;
  if (elNoBar) elNoBar.style.width = `${noPct}%`;
}

/**
 * 15. Setup Modals (Bài hát AI & Video)
 */
function setupModals() {
  // Modal AI Song
  const btnOpenSong = document.getElementById('btn-open-ai-song');
  const modalSong = document.getElementById('ai-song-modal');
  const btnCloseSong = document.getElementById('close-ai-song');

  if (btnOpenSong && modalSong) {
    btnOpenSong.addEventListener('click', () => {
      modalSong.classList.remove('hidden');
      modalSong.classList.add('flex');
    });
  }
  if (btnCloseSong && modalSong) {
    btnCloseSong.addEventListener('click', () => {
      modalSong.classList.add('hidden');
      modalSong.classList.remove('flex');
    });
  }

  // Modal Video
  const btnOpenVideo = document.getElementById('btn-open-video');
  const modalVideo = document.getElementById('video-modal');
  const btnCloseVideo = document.getElementById('close-video');
  const videoElem = document.getElementById('greeting-video');

  if (btnOpenVideo && modalVideo) {
    btnOpenVideo.addEventListener('click', () => {
      modalVideo.classList.remove('hidden');
      modalVideo.classList.add('flex');
      if (videoElem) videoElem.play();
    });
  }
  if (btnCloseVideo && modalVideo) {
    btnCloseVideo.addEventListener('click', () => {
      modalVideo.classList.add('hidden');
      modalVideo.classList.remove('flex');
      if (videoElem) videoElem.pause();
    });
  }

  // Đóng modal khi bấm nền đen
  [modalSong, modalVideo].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          if (videoElem) videoElem.pause();
        }
      });
    }
  });
}

/**
 * 16. Tiện ích Sao Chép Link & Toast
 */
function copyPersonalLink() {
  const person = RECIPIENTS_DATA[currentRecipientIndex];
  const url = `${window.location.origin}${window.location.pathname}?id=${person.id}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(`🔗 Đã sao chép link thiệp cho ${person.ho_ten}!`);
  });
}

function copyGreetingText() {
  const person = RECIPIENTS_DATA[currentRecipientIndex];
  navigator.clipboard.writeText(person.loi_chuc).then(() => {
    showToast('💌 Đã sao chép lời chúc vào khay nhớ tạm!');
  });
}

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
