// ================================================================
// ADMIN.JS - Admin panel functionality for MiaCasa
// Works with log-booking.js on Netlify free tier
// ================================================================

const API_URL = '/api/log-booking';
let adminLang = localStorage.getItem('mia_admin_lang') || 'en';

// Translation object for admin panel
const ADMIN_TRANSLATIONS = {
  en: {
    'login-logo': 'MiaCasa Admin',
    'login-sub': 'Owner access only',
    'lbl-username': 'Username',
    'lbl-password': 'Password',
    'btn-signin': 'Sign In',
    'login-error': 'Incorrect username or password.',
    'admin-page-title': 'Property Management',
    'admin-page-sub': 'Open or close rooms · Set custom prices for specific dates',
    'tab-rooms': 'Room Status',
    'tab-prices': 'Price Overrides',
    'logout': 'Sign out',
    'rs-form-title': 'Set room availability for date range',
    'lbl-rs-room': 'Room',
    'lbl-rs-from': 'From date',
    'lbl-rs-to': 'To date',
    'lbl-rs-status': 'Status',
    'lbl-rs-note': 'Note (optional)',
    'btn-rs-apply': 'Apply',
    'rs-list-title': 'Current room status rules',
    'no-rules': 'No room status rules set. All rooms are open by default.',
    'ov-form-title': 'Add price override',
    'lbl-ov-room': 'Room',
    'lbl-ov-rule-type': 'Rule type',
    'lbl-ov-from': 'From date',
    'lbl-ov-to': 'To date',
    'lbl-ov-weekdays': 'Apply on weekdays',
    'lbl-ov-months': 'Apply in months',
    'lbl-ov-price': 'Price per night (VND)',
    'lbl-ov-note': 'Note (optional)',
    'btn-ov-add': 'Add Override',
    'ov-list-title': 'Active price overrides',
    'no-overrides': 'No price overrides set. Standard rates apply.',
    'room-spring': 'Spring Room (MCH)',
    'room-summer': 'Summer Room (MCH)',
    'room-autumn': 'Autumn Room (MCH)',
    'room-oq': 'OldQuarter Apartment',
    'th-room': 'Room',
    'th-from': 'From',
    'th-to': 'To',
    'th-status': 'Status',
    'th-note': 'Note',
    'th-price': 'Price / night',
    'th-usd': '~USD',
    'th-rule': 'Rule',
    'rule-once': 'Specific dates',
    'rule-weekday': 'Recurring weekdays',
    'opt-rs-closed': '🔒 Closed (unavailable)',
    'opt-rs-open': '🔓 Open (available)',
    'maintenance-on': 'Turn Maintenance Off',
    'maintenance-off': 'Turn Maintenance On',
    'maintenance-on-status': 'ON',
    'maintenance-off-status': 'OFF'
  },
  vn: {
    'login-logo': 'Quản trị MiaCasa',
    'login-sub': 'Chỉ dành cho chủ nhà',
    'lbl-username': 'Tên đăng nhập',
    'lbl-password': 'Mật khẩu',
    'btn-signin': 'Đăng nhập',
    'login-error': 'Tên đăng nhập hoặc mật khẩu không đúng.',
    'admin-page-title': 'Quản lý chỗ nghỉ',
    'admin-page-sub': 'Mở hoặc đóng phòng · Đặt giá tùy chỉnh cho các ngày cụ thể',
    'tab-rooms': 'Trạng thái phòng',
    'tab-prices': 'Giá tùy chỉnh',
    'logout': 'Đăng xuất',
    'rs-form-title': 'Đặt tình trạng phòng theo khoảng ngày',
    'lbl-rs-room': 'Phòng',
    'lbl-rs-from': 'Từ ngày',
    'lbl-rs-to': 'Đến ngày',
    'lbl-rs-status': 'Trạng thái',
    'lbl-rs-note': 'Ghi chú (tuỳ chọn)',
    'btn-rs-apply': 'Áp dụng',
    'rs-list-title': 'Danh sách quy tắc trạng thái phòng',
    'no-rules': 'Chưa có quy tắc nào. Tất cả phòng đang mở mặc định.',
    'ov-form-title': 'Thêm giá tùy chỉnh',
    'lbl-ov-room': 'Phòng',
    'lbl-ov-rule-type': 'Loại quy tắc',
    'lbl-ov-from': 'Từ ngày',
    'lbl-ov-to': 'Đến ngày',
    'lbl-ov-weekdays': 'Áp dụng vào thứ',
    'lbl-ov-months': 'Áp dụng trong tháng',
    'lbl-ov-price': 'Giá mỗi đêm (VND)',
    'lbl-ov-note': 'Ghi chú (tuỳ chọn)',
    'btn-ov-add': 'Thêm',
    'ov-list-title': 'Giá tùy chỉnh hiện tại',
    'no-overrides': 'Chưa có giá tùy chỉnh. Áp dụng giá tiêu chuẩn.',
    'room-spring': 'Phòng Xuân (MCH)',
    'room-summer': 'Phòng Hạ (MCH)',
    'room-autumn': 'Phòng Thu (MCH)',
    'room-oq': 'Căn hộ Phố Cổ',
    'th-room': 'Phòng',
    'th-from': 'Từ ngày',
    'th-to': 'Đến ngày',
    'th-status': 'Trạng thái',
    'th-note': 'Ghi chú',
    'th-price': 'Giá / đêm',
    'th-usd': '~USD',
    'th-rule': 'Quy tắc',
    'rule-once': 'Ngày cụ thể',
    'rule-weekday': 'Lặp lại theo thứ',
    'opt-rs-closed': '🔒 Đóng (không nhận khách)',
    'opt-rs-open': '🔓 Mở (nhận khách)',
    'maintenance-on': 'Tắt chế độ bảo trì',
    'maintenance-off': 'Bật chế độ bảo trì',
    'maintenance-on-status': 'BẬT',
    'maintenance-off-status': 'TẮT'
  }
};

// Room definitions
const ROOMS = [
  { id: 'spring', name: 'Spring Room', property: 'MiaCasaHanoi' },
  { id: 'summer', name: 'Summer Room', property: 'MiaCasaHanoi' },
  { id: 'autumn', name: 'Autumn Room', property: 'MiaCasaHanoi' },
  { id: 'oldquarter', name: 'Entire Apartment (3 queen beds)', property: 'MiaCasaOldQuarter' }
];

const PRICE_RULE_PREFIX = 'MIA_PRICE_RULE:';
const WEEKDAY_NAMES = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  vn: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
};
const MONTH_NAMES = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  vn: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
};

// ================================================================
// TOKEN MANAGEMENT
// ================================================================

function getToken() {
  return sessionStorage.getItem('mia_admin_token') || '';
}

function setToken(token) {
  sessionStorage.setItem('mia_admin_token', token);
}

function clearToken() {
  sessionStorage.removeItem('mia_admin_token');
  sessionStorage.removeItem('mia_admin_logged_in');
  sessionStorage.removeItem('mia_admin_user');
}

// ================================================================
// LOGIN & LOGOUT
// ================================================================

async function doLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');

  if (!user || !pass) {
    errEl.textContent = adminLang === 'vn' ? 'Vui lòng nhập tên đăng nhập và mật khẩu.' : 'Please enter username and password.';
    errEl.style.display = 'block';
    return;
  }

  const loginBtn = document.getElementById('btn-signin');
  loginBtn.disabled = true;
  loginBtn.textContent = adminLang === 'vn' ? 'Đang đăng nhập...' : 'Signing in...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'login',
        username: user,
        password: pass
      })
    });

    const json = await response.json();

    if (json.status === 'ok') {
      setToken(json.token);
      sessionStorage.setItem('mia_admin_logged_in', '1');
      sessionStorage.setItem('mia_admin_user', user);
      showAdmin();
    } else {
      errEl.textContent = json.message || (adminLang === 'vn' ? 'Tên đăng nhập hoặc mật khẩu không đúng.' : 'Incorrect username or password.');
      errEl.style.display = 'block';
    }
  } catch (error) {
    // If we get a network/fetch error, it's usually the Netlify function crashing
    // (env vars not set) rather than a true CORS issue — show the actual message
    const msg = error.message || '';
    let errorMessage = adminLang === 'vn'
      ? 'Không thể kết nối. Kiểm tra biến môi trường Netlify (ADMIN_USER, ADMIN_PASSWORD, ADMIN_TOKEN).'
      : 'Cannot connect. Check Netlify environment variables (ADMIN_USER, ADMIN_PASSWORD, ADMIN_TOKEN) are set.';
    errEl.textContent = errorMessage;
    errEl.style.display = 'block';
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = adminLang === 'vn' ? 'Đăng nhập' : 'Sign In';
  }
}

function doLogout() {
  clearToken();
  document.getElementById('admin-wrap').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  
  // Clear login form
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').style.display = 'none';
}

async function showAdmin() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-wrap').style.display = 'block';
  
  const userName = sessionStorage.getItem('mia_admin_user') || 'Admin';
  document.getElementById('admin-greeting').textContent = 
    adminLang === 'vn' ? `Xin chào, ${userName}!` : `Welcome, ${userName}!`;
  updatePriceRuleFields();
  
  // Load all data
  await Promise.all([
    renderRoomStatusList(),
    renderOverrides(),
    loadMaintenanceStatus()
  ]);
}

// ================================================================
// TAB SWITCHING
// ================================================================

function switchTab(name, btn) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + name).classList.add('active');
  
  // Refresh data when switching tabs
  if (name === 'rooms') {
    renderRoomStatusList();
  } else if (name === 'prices') {
    renderOverrides();
  } else if (name === 'cancellations') {
    loadPendingCancellations();
  }
}

// ================================================================
// ROOM STATUS MANAGEMENT
// ================================================================

async function getRoomStatus() {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getRoomStatus', token: getToken() })
  });
  const data = await res.json();
  // Make sure we return an array
  return data.data || [];
}

async function addRoomStatus() {
  const room = document.getElementById('rs-room').value;
  const from = document.getElementById('rs-from').value;
  const to = document.getElementById('rs-to').value;
  const status = document.getElementById('rs-status').value;
  const note = document.getElementById('rs-note').value.trim();

  const errBar = document.getElementById('rooms-error-bar');
  const saveBar = document.getElementById('rooms-save-bar');
  
  errBar.style.display = 'none';
  saveBar.style.display = 'none';

  // Validation
  if (!room || !from || !to) {
    errBar.textContent = adminLang === 'vn' ? 'Vui lòng chọn phòng và cả hai ngày.' : 'Please select a room and both dates.';
    errBar.style.display = 'block';
    return;
  }
  
  if (new Date(to) < new Date(from)) {
    errBar.textContent = adminLang === 'vn' ? 'Ngày kết thúc phải bằng hoặc sau ngày bắt đầu.' : 'End date must be on or after start date.';
    errBar.style.display = 'block';
    return;
  }

  // Disable button
  const applyBtn = document.getElementById('btn-rs-apply');
  applyBtn.disabled = true;
  applyBtn.textContent = adminLang === 'vn' ? 'Đang xử lý...' : 'Processing...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'updateRoomStatus', 
        room, from, to, status, note, 
        token: getToken() 
      })
    });
    const json = await res.json();

    if (json.status === 'ok') {
      saveBar.textContent = adminLang === 'vn' ? '✓ Đã cập nhật trạng thái phòng' : '✓ Room status updated';
      saveBar.style.display = 'block';
      setTimeout(() => saveBar.style.display = 'none', 4000);
      
      // Clear form
      document.getElementById('rs-note').value = '';
      document.getElementById('rs-from').value = '';
      document.getElementById('rs-to').value = '';
      document.getElementById('rs-status').value = 'open';
      
      // Refresh list
      await renderRoomStatusList();
    } else {
      errBar.textContent = 'Error: ' + (json.message || 'Unknown error');
      errBar.style.display = 'block';
    }
  } catch (error) {
    errBar.textContent = 'Error: ' + error.message;
    errBar.style.display = 'block';
  } finally {
    applyBtn.disabled = false;
    applyBtn.textContent = adminLang === 'vn' ? 'Áp dụng' : 'Apply';
  }
}

async function deleteRoomStatus(id) {
  if (!confirm(adminLang === 'vn' ? 'Xóa quy tắc này?' : 'Delete this rule?')) {
    return;
  }
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deleteRoomStatus', id, token: getToken() })
    });
    await renderRoomStatusList();
  } catch (error) {
    console.error('Delete error:', error);
    alert(adminLang === 'vn' ? 'Xóa thất bại. Vui lòng thử lại.' : 'Delete failed. Please try again.');
  }
}

async function renderRoomStatusList() {
  const container = document.getElementById('room-status-list');
  container.innerHTML = '<p style="color:var(--ink-light);">Loading...</p>';
  
  try {
    const rows = await getRoomStatus();
    
    // FIX: Check if rows is an array
    if (!rows || !Array.isArray(rows)) {
      console.log('Room status data is not an array:', rows);
      container.innerHTML = `<p class="no-overrides">${ADMIN_TRANSLATIONS[adminLang]['no-rules']}</p>`;
      return;
    }
    
    if (rows.length === 0) {
      container.innerHTML = `<p class="no-overrides">${ADMIN_TRANSLATIONS[adminLang]['no-rules']}</p>`;
      return;
    }
    
    // Sort by from date descending (newest first)
    rows.sort((a, b) => new Date(b[2]) - new Date(a[2]));
    
    const AL = ADMIN_TRANSLATIONS[adminLang];
    container.innerHTML = `
      <table class="overrides-table">
        <thead>
          <tr>
            <th>${AL['th-room']}</th>
            <th>${AL['th-from']}</th>
            <th>${AL['th-to']}</th>
            <th>${AL['th-status']}</th>
            <th>${AL['th-note']}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => {
            const isClosed = r[3] === 'closed';
            const statusLabel = isClosed ? ADMIN_TRANSLATIONS[adminLang]['opt-rs-closed'] : ADMIN_TRANSLATIONS[adminLang]['opt-rs-open'];
            return `
            <tr>
              <td>${escapeHtml(r[0])}</td>
              <td>${formatDateForDisplay(r[1])}</td>
              <td>${formatDateForDisplay(r[2])}</td>
              <td><span style="font-weight:500;color:${isClosed ? '#991B1B' : '#065F46'}">${statusLabel}</span></td>
              <td style="color:var(--ink-light);">${escapeHtml(r[4] || '—')}</td>
              <td><button class="del-btn" onclick="deleteRoomStatus('${r[5]}')">✕</button></td>
            </tr>
          `;
          }).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Render error:', error);
    container.innerHTML = '<p style="color:#991B1B;">Failed to load room status. Please refresh the page.</p>';
  }
}

// ================================================================
// PRICE OVERRIDES MANAGEMENT
// ================================================================

async function fetchOverrides() {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getPriceOverrides', token: getToken() })
  });
  const data = await res.json();
  // Make sure we return an array
  return data.data || [];
}

function updatePriceRuleFields() {
  const type = document.getElementById('ov-rule-type')?.value || 'date';
  const showRecurring = type === 'weekday';
  const weekdayField = document.getElementById('ov-weekday-field');
  const monthField = document.getElementById('ov-month-field');
  const toLabel = document.getElementById('lbl-ov-to');
  const fromInput = document.getElementById('ov-from');
  const toInput = document.getElementById('ov-to');

  if (weekdayField) weekdayField.style.display = showRecurring ? 'flex' : 'none';
  if (monthField) monthField.style.display = showRecurring ? 'flex' : 'none';
  if (toLabel) {
    toLabel.textContent = showRecurring
      ? (adminLang === 'vn' ? 'Đến ngày (hiệu lực)' : 'To date (active until)')
      : ADMIN_TRANSLATIONS[adminLang]['lbl-ov-to'];
  }

  if (showRecurring && fromInput && toInput && !fromInput.value && !toInput.value) {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    fromInput.value = formatDateInput(today);
    toInput.value = formatDateInput(nextYear);
  }
}

function getCheckedValues(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input:checked`))
    .map(input => Number(input.value))
    .filter(value => Number.isFinite(value));
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildPriceRuleNote(note, ruleType) {
  const cleanNote = note.replace(new RegExp(`\\s*${PRICE_RULE_PREFIX}.*$`), '').trim();
  if (ruleType !== 'weekday') return cleanNote;

  const days = getCheckedValues('ov-weekdays');
  const months = getCheckedValues('ov-months');
  const rule = {
    type: 'weekday',
    days,
    months: months.length ? months : [1,2,3,4,5,6,7,8,9,10,11,12]
  };

  return `${cleanNote ? cleanNote + ' ' : ''}${PRICE_RULE_PREFIX}${JSON.stringify(rule)}`;
}

function parsePriceRuleNote(note) {
  const raw = String(note || '');
  const index = raw.indexOf(PRICE_RULE_PREFIX);
  if (index === -1) return { userNote: raw, rule: null };

  const userNote = raw.slice(0, index).trim();
  const encoded = raw.slice(index + PRICE_RULE_PREFIX.length).trim();
  try {
    return { userNote, rule: JSON.parse(encoded) };
  } catch (e) {
    return { userNote: raw, rule: null };
  }
}

function compactNumberList(values, labels) {
  if (!Array.isArray(values) || values.length === 0) return '—';
  return values
    .slice()
    .sort((a, b) => a - b)
    .map(value => labels[value] || labels[value - 1] || value)
    .join(', ');
}

function formatPriceRule(rule) {
  const L = ADMIN_TRANSLATIONS[adminLang];
  if (!rule || rule.type !== 'weekday') {
    return `<span class="rule-pill">${L['rule-once']}</span>`;
  }

  const dayNames = WEEKDAY_NAMES[adminLang] || WEEKDAY_NAMES.en;
  const monthNames = MONTH_NAMES[adminLang] || MONTH_NAMES.en;
  const months = Array.isArray(rule.months) ? rule.months : [];
  const monthText = months.length === 12 || months.length === 0
    ? (adminLang === 'vn' ? 'Tất cả tháng' : 'All months')
    : compactNumberList(months, monthNames);
  const dayText = compactNumberList(rule.days, dayNames);

  return `<span class="rule-pill">${L['rule-weekday']}</span><div style="margin-top:0.25rem;color:var(--ink-light);">${dayText} · ${monthText}</div>`;
}

async function addOverride() {
  const room = document.getElementById('ov-room').value;
  const ruleType = document.getElementById('ov-rule-type')?.value || 'date';
  const from = document.getElementById('ov-from').value;
  const to = document.getElementById('ov-to').value;
  const price = parseInt(document.getElementById('ov-price').value);
  const noteInput = document.getElementById('ov-note').value.trim();
  const note = buildPriceRuleNote(noteInput, ruleType);

  const errBar = document.getElementById('price-error-bar');
  const saveBar = document.getElementById('price-save-bar');
  const token = getToken();
  console.log('=== ADD OVERRIDE DEBUG ===');
  console.log('Token being sent:', token);
  console.log('Token type:', typeof token);
  errBar.style.display = 'none';
  saveBar.style.display = 'none';

  // Validation
  if (!room || !from || !to || !price) {
    errBar.textContent = adminLang === 'vn' ? 'Vui lòng điền đầy đủ thông tin.' : 'Please fill in all required fields.';
    errBar.style.display = 'block';
    return;
  }

  if (ruleType === 'weekday' && getCheckedValues('ov-weekdays').length === 0) {
    errBar.textContent = adminLang === 'vn' ? 'Vui lòng chọn ít nhất một thứ trong tuần.' : 'Please select at least one weekday.';
    errBar.style.display = 'block';
    return;
  }
  
  if (new Date(to) < new Date(from)) {
    errBar.textContent = adminLang === 'vn' ? 'Ngày kết thúc phải bằng hoặc sau ngày bắt đầu.' : 'End date must be on or after start date.';
    errBar.style.display = 'block';
    return;
  }
  
  if (price < 100000) {
    errBar.textContent = adminLang === 'vn' ? 'Giá phải lớn hơn 100,000 VND.' : 'Price must be greater than 100,000 VND.';
    errBar.style.display = 'block';
    return;
  }

  // Disable button
  const addBtn = document.getElementById('btn-ov-add');
  addBtn.disabled = true;
  addBtn.textContent = adminLang === 'vn' ? 'Đang xử lý...' : 'Processing...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'addPriceOverride', 
        room, from, to, price, note, 
        token: getToken() 
      })
    });
    const json = await res.json();

    if (json.status === 'ok') {
      saveBar.textContent = adminLang === 'vn' ? '✓ Đã thêm giá tùy chỉnh' : '✓ Override added successfully';
      saveBar.style.display = 'block';
      setTimeout(() => saveBar.style.display = 'none', 4000);
      
      // Clear form
      document.getElementById('ov-price').value = '';
      document.getElementById('ov-note').value = '';
      
      // Refresh list
      await renderOverrides();
    } else {
      errBar.textContent = 'Error: ' + (json.message || 'Unknown error');
      errBar.style.display = 'block';
    }
  } catch (error) {
    errBar.textContent = 'Error: ' + error.message;
    errBar.style.display = 'block';
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = adminLang === 'vn' ? 'Thêm' : 'Add Override';
  }
}

async function deleteOverride(id) {
  if (!confirm(adminLang === 'vn' ? 'Xóa giá tùy chỉnh này?' : 'Delete this override?')) {
    return;
  }
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deletePriceOverride', id: id, token: getToken() })
    });
    await renderOverrides();
  } catch (error) {
    console.error('Delete error:', error);
    alert(adminLang === 'vn' ? 'Xóa thất bại. Vui lòng thử lại.' : 'Delete failed. Please try again.');
  }
}

async function renderOverrides() {
  const container = document.getElementById('overrides-list');
  container.innerHTML = '<p style="color:var(--ink-light);">Loading...</p>';
  
  try {
    const overrides = await fetchOverrides();

    if (!overrides || overrides.length === 0) {
      container.innerHTML = `<p class="no-overrides">${ADMIN_TRANSLATIONS[adminLang]['no-overrides']}</p>`;
      return;
    }

    // Sort by from date ascending (index 2 is the 'From' date)
    overrides.sort((a, b) => new Date(a[2]) - new Date(b[2]));
    
    const AL = ADMIN_TRANSLATIONS[adminLang];
    container.innerHTML = `
      <table class="overrides-table">
        <thead>
          <tr>
            <th>${AL['th-room']}</th>
            <th>${AL['th-rule']}</th>
            <th>${AL['th-from']}</th>
            <th>${AL['th-to']}</th>
            <th>${AL['th-price']}</th>
            <th>${AL['th-usd']}</th>
            <th>${AL['th-note']}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${overrides.map(o => {
            const parsed = parsePriceRuleNote(o[5]);
            return `
              <tr>
                <td>${escapeHtml(o[1])}</td>
                <td>${formatPriceRule(parsed.rule)}</td>
                <td>${formatDateForDisplay(o[2])}</td>
                <td>${formatDateForDisplay(o[3])}</td>
                <td style="font-weight:500;color:var(--terracotta);">${formatVND(o[4])}</td>
                <td style="color:var(--ink-light);">~$${Math.round(o[4] / 25000)}</td>
                <td style="color:var(--ink-light);">${escapeHtml(parsed.userNote || '—')}</td>
                <td><button class="del-btn" onclick="deleteOverride(${o[0]})">✕</button></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error('Render error:', error);
    container.innerHTML = '<p style="color:#991B1B;">Failed to load overrides. Please refresh the page.</p>';
  }
}

// ================================================================
// MAINTENANCE MODE
// ================================================================

async function getMaintenanceMode() {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getMaintenanceMode', token: getToken() })
  });
  const json = await res.json();
  return json.value === 'on';
}  // ← THIS CLOSING BRACE WAS MISSING!

async function setMaintenanceMode(enabled) {
  console.log('setMaintenanceMode called with:', enabled);
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'setMaintenanceMode', 
        value: enabled ? 'on' : 'off', 
        token: getToken() 
      })
    });
    
    const json = await res.json();
    return json.status === 'ok';
  } catch (error) {
    console.error('setMaintenanceMode error:', error);
    return false;
  }
}

async function toggleMaintenance() {
  const el = document.getElementById('maintenance-status');
  const btn = document.getElementById('maintenance-btn');
  
  // Get current status more reliably
  const currentText = el.textContent;
  const currentIsOn = (currentText === 'ON' || currentText === 'BẬT');
  const newValue = !currentIsOn;

  // Save original button text
  const originalText = btn.textContent;
  
  // Disable button during operation
  btn.disabled = true;
  btn.textContent = adminLang === 'vn' ? 'Đang xử lý...' : 'Processing...';

  try {
    const success = await setMaintenanceMode(newValue);
    
    if (success) {
      if (newValue) {
        el.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-on-status'] || 'ON';
        el.className = 'status-on';
        btn.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-on'] || 'Turn Maintenance Off';
      } else {
        el.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-off-status'] || 'OFF';
        el.className = 'status-off';
        btn.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-off'] || 'Turn Maintenance On';
      }
    } else {
      // Revert button text on failure
      btn.textContent = originalText;
      const errorMsg = adminLang === 'vn' ? 'Cập nhật chế độ bảo trì thất bại.' : 'Failed to update maintenance mode.';
      alert(errorMsg);
    }
  } catch (error) {
    console.error('Toggle maintenance error:', error);
    // Revert button text on error
    btn.textContent = originalText;
    const errorMsg = adminLang === 'vn' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.';
    alert(errorMsg);
  } finally {
    btn.disabled = false;
  }
}

async function loadMaintenanceStatus() {
  try {
    const isOn = await getMaintenanceMode();
    const el = document.getElementById('maintenance-status');
    const btn = document.getElementById('maintenance-btn');
    
    if (isOn) {
      el.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-on-status'] || 'ON';
      el.className = 'status-on';
      btn.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-on'] || 'Turn Maintenance Off';
    } else {
      el.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-off-status'] || 'OFF';
      el.className = 'status-off';
      btn.textContent = ADMIN_TRANSLATIONS[adminLang]['maintenance-off'] || 'Turn Maintenance On';
    }
  } catch (error) {
    console.error('Load maintenance status error:', error);
  }
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================

function formatDateForDisplay(dateStr) {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ================================================================
// LANGUAGE SUPPORT
// ================================================================

function setAdminLang(lang) {
  adminLang = lang;
  localStorage.setItem('mia_admin_lang', lang);

  const enBtn = document.getElementById('lang-en');
  const vnBtn = document.getElementById('lang-vn');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');
  if (vnBtn) vnBtn.classList.toggle('active', lang === 'vn');
  const roomStatusSelect = document.getElementById('rs-status');
  if (roomStatusSelect && !roomStatusSelect.value) roomStatusSelect.value = 'open';

  const L = ADMIN_TRANSLATIONS[lang];
  if (!L) return;

  // Update all translatable elements
  const elements = {
    'login-logo': 'textContent',
    'login-sub': 'textContent',
    'lbl-username': 'textContent',
    'lbl-password': 'textContent',
    'btn-signin': 'textContent',
    'admin-page-title': 'textContent',
    'admin-page-sub': 'textContent',
    'logout-btn': 'textContent',
    'rs-form-title': 'textContent',
    'lbl-rs-room': 'textContent',
    'lbl-rs-from': 'textContent',
    'lbl-rs-to': 'textContent',
    'lbl-rs-status': 'textContent',
    'lbl-rs-note': 'textContent',
    'btn-rs-apply': 'textContent',
    'rs-list-title': 'textContent',
    'ov-form-title': 'textContent',
    'lbl-ov-room': 'textContent',
    'lbl-ov-rule-type': 'textContent',
    'lbl-ov-from': 'textContent',
    'lbl-ov-to': 'textContent',
    'lbl-ov-weekdays': 'textContent',
    'lbl-ov-months': 'textContent',
    'lbl-ov-price': 'textContent',
    'lbl-ov-note': 'textContent',
    'btn-ov-add': 'textContent',
    'ov-list-title': 'textContent'
  };

  for (const [id, prop] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el && L[id]) el[prop] = L[id];
  }

  // Update tab buttons
  const tabs = document.querySelectorAll('.admin-tab');
  if (tabs[0]) tabs[0].textContent = L['tab-rooms'];
  if (tabs[1]) tabs[1].textContent = L['tab-prices'];
  updatePriceRuleFields();

  // Update select options
  const rsSel = document.getElementById('rs-status');
  if (rsSel && rsSel.options.length >= 2) {
    rsSel.options[0].text = L['opt-rs-open'];
    rsSel.options[1].text = L['opt-rs-closed'];
  }

  // Update room select options
  const roomOptions = {
    0: L['room-spring'],
    1: L['room-summer'],
    2: L['room-autumn'],
    3: L['room-oq']
  };
  
  ['rs-room', 'ov-room'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (sel) {
      Object.entries(roomOptions).forEach(([i, text]) => {
        if (sel.options[i]) sel.options[i].text = text;
      });
    }
  });

  // Re-render lists with new language
  renderRoomStatusList();
  renderOverrides();
  loadMaintenanceStatus();
}

// ================================================================
// INITIALIZATION
// ================================================================

// Set default dates for forms
function setDefaultDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const fromInput = document.getElementById('ov-from');
  const toInput = document.getElementById('ov-to');
  
  if (fromInput) fromInput.value = today.toISOString().split('T')[0];
  if (toInput) toInput.value = tomorrow.toISOString().split('T')[0];
}

// Check if already logged in
if (sessionStorage.getItem('mia_admin_logged_in') && getToken()) {
  showAdmin();
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  setDefaultDates();
  setAdminLang(adminLang);
  
  // Login form event listeners
  const loginUser = document.getElementById('login-user');
  const loginPass = document.getElementById('login-pass');
  
  if (loginUser) {
    loginUser.addEventListener('input', () => {
      document.getElementById('login-error').style.display = 'none';
    });
  }
  
  if (loginPass) {
    loginPass.addEventListener('input', () => {
      document.getElementById('login-error').style.display = 'none';
    });
    loginPass.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') doLogin();
    });
  }
});
// ================================================================
// CANCELLATION MANAGEMENT (Admin UI)
// ================================================================

async function loadPendingCancellations() {
  const container = document.getElementById('cancellations-list');
  if (!container) return;
  
  container.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading...</div>';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getPendingCancellations', token: getToken() })
    });
    
    const data = await response.json();
    
    if (!data.cancellations || data.cancellations.length === 0) {
      container.innerHTML = '<div style="background: #f5efe6; border-radius: 8px; padding: 2rem; text-align: center;"><p style="color: #6b5c47;">✅ No pending cancellation requests</p></div>';
      document.getElementById('pending-count').innerHTML = '';
      return;
    }
    
    document.getElementById('pending-count').innerHTML = `(${data.cancellations.length} pending)`;
    
    container.innerHTML = data.cancellations.map(c => `
      <div class="cancel-card" id="cancel-card-${c.bookingId}" style="background: white; border: 1px solid #e0ddd5; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div style="flex: 2;">
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <strong style="font-size: 1rem;">${c.bookingId}</strong>
              <span style="background: #fef3c7; color: #d97706; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.7rem;">PENDING</span>
            </div>
            <p style="margin-top: 0.75rem;"><strong>Guest:</strong> ${escapeHtml(c.guestName)} (${escapeHtml(c.guestEmail)})</p>
            <p><strong>Property:</strong> ${c.property} - ${c.room}</p>
            <p><strong>Check-in:</strong> ${c.checkIn}</p>
            <p><strong>Amount:</strong> ${Number(c.amount).toLocaleString('vi-VN')}₫ (${c.paymentMethod})</p>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <button onclick="showRefundForm('${c.bookingId}', ${c.amount}, '${c.paymentMethod}')" class="add-override-btn" style="width: 100%; background: #059669;">✅ Approve Refund</button>
            <button onclick="rejectCancellation('${c.bookingId}')" class="add-override-btn" style="width: 100%; margin-top: 0.5rem; background: #dc2626;">❌ Reject Request</button>
          </div>
        </div>
        
        <div id="refund-form-${c.bookingId}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0ddd5;">
          <h4>Confirm Refund</h4>
          <p>Have you manually processed the refund in ${c.paymentMethod}?</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div><label>Refund Amount (VND)</label><input type="number" id="refund-amount-${c.bookingId}" value="${c.amount}" style="width: 100%; padding: 0.5rem;"></div>
            <div><label>Reference (optional)</label><input type="text" id="refund-txn-${c.bookingId}" style="width: 100%; padding: 0.5rem;"></div>
          </div>
          <div><label>Note</label><textarea id="refund-note-${c.bookingId}" rows="2" style="width: 100%; padding: 0.5rem;"></textarea></div>
          <div style="margin-top: 1rem;"><button onclick="confirmRefund('${c.bookingId}')" class="add-override-btn" style="background: #059669;">✅ Confirm & Notify Guest</button></div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = '<div style="background: #fee2e2; padding: 1rem; border-radius: 8px;">Error loading cancellation requests</div>';
  }
}

function showRefundForm(bookingId, amount, paymentMethod) {
  document.getElementById(`refund-form-${bookingId}`).style.display = 'block';
}

async function confirmRefund(bookingId) {
  const refundAmount = document.getElementById(`refund-amount-${bookingId}`).value;
  const refundNote = document.getElementById(`refund-note-${bookingId}`).value;
  
  if (!confirm('⚠️ Have you manually processed the refund in PayPal/Bank?\n\nClick OK to confirm and notify the guest.')) return;
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'confirmRefund', bookingId, refundAmount: parseInt(refundAmount), refundNote, token: getToken() })
  });
  
  const data = await response.json();
  
  if (data.status === 'ok') {
    alert('✅ ' + data.message);
    document.getElementById(`cancel-card-${bookingId}`)?.remove();
    loadPendingCancellations();
  } else {
    alert('❌ Error: ' + data.message);
  }
}

async function rejectCancellation(bookingId) {
  // Simple reject for now - just remove from pending
  if (!confirm('Are you sure you want to reject this cancellation request?')) return;
  
  // For now, just remove from UI. You can add more logic later.
  document.getElementById(`cancel-card-${bookingId}`)?.remove();
  alert('✅ Request rejected');
  loadPendingCancellations();
}



async function debugCancellations() {
  console.log('=== DEBUGGING CANCELLATIONS ===');
  const token = getToken();
  console.log('Token exists:', !!token);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'getPendingCancellations', token: token })
  });
  
  const data = await response.json();
  console.log('API Response:', data);
  console.log('Cancellations count:', data.cancellations?.length || 0);
  
  if (data.cancellations && data.cancellations.length > 0) {
    console.log('First cancellation:', data.cancellations[0]);
  }
}

// Export for global access
window.doLogin = doLogin;
window.doLogout = doLogout;
window.switchTab = switchTab;
window.addRoomStatus = addRoomStatus;
window.deleteRoomStatus = deleteRoomStatus;
window.addOverride = addOverride;
window.deleteOverride = deleteOverride;
window.toggleMaintenance = toggleMaintenance;
window.setAdminLang = setAdminLang;
window.loadPendingCancellations = loadPendingCancellations;
window.showRefundForm = showRefundForm;
window.confirmRefund = confirmRefund;
window.rejectCancellation = rejectCancellation;
