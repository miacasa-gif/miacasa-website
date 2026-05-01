// ================================================================
// ADMIN.JS - Admin panel functionality for MiaCasa
// Works with log-booking.js on Netlify free tier
// ================================================================

const API_URL = '/api/log-booking';
console.log('📡 Admin API URL:', API_URL);
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
    'lbl-ov-from': 'From date',
    'lbl-ov-to': 'To date',
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
    'lbl-ov-from': 'Từ ngày',
    'lbl-ov-to': 'Đến ngày',
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
  { id: 'oldquarter', name: 'Entire Apartment (3 king beds)', property: 'MiaCasaOldQuarter' }
];

// ================================================================
// TOKEN MANAGEMENT
// ================================================================

function getToken() {
  // Check both storage locations
  const token = localStorage.getItem('admin_token') || sessionStorage.getItem('mia_admin_token');
  return token;
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
    console.log('Attempting login to:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
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

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    const json = await response.json();
    console.log('Response data:', json);

    if (json.status === 'ok') {
      setToken(json.token);
      sessionStorage.setItem('mia_admin_logged_in', '1');
      sessionStorage.setItem('mia_admin_user', user);
      console.log('✅ Login successful! Showing admin panel...');
      showAdmin();
    } else {
      errEl.textContent = json.message || (adminLang === 'vn' ? 'Tên đăng nhập hoặc mật khẩu không đúng.' : 'Incorrect username or password.');
      errEl.style.display = 'block';
      console.error('Login failed:', json);
    }
  } catch (error) {
    console.error('❌ Login error details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    let errorMessage = adminLang === 'vn' 
      ? 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra URL Google Script.' 
      : 'Cannot connect to server. Please check Google Script URL.';
    
    if (error.message.includes('CORS')) {
      errorMessage = adminLang === 'vn'
        ? 'Lỗi CORS. Vui lòng đảm bảo Google Script được deploy với quyền truy cập "Anyone".'
        : 'CORS error. Please ensure Google Script is deployed with "Anyone" access.';
    }
    
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
          ${rows.map(r => `
            <tr>
              <td>${escapeHtml(r[0])}</td>
              <td>${formatDateForDisplay(r[1])}</td>
              <td>${formatDateForDisplay(r[2])}</td>
              <td><span style="font-weight:500;color:${r[3] === 'closed' ? '#991B1B' : '#065F46'}">${r[3] === 'closed' ? '🔒 Closed' : '🔓 Open'}</span></td>
              <td style="color:var(--ink-light);">${escapeHtml(r[4] || '—')}</td>
              <td><button class="del-btn" onclick="deleteRoomStatus('${r[5]}')">✕</button></td>
            </tr>
          `).join('')}
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

async function addOverride() {
  const room = document.getElementById('ov-room').value;
  const from = document.getElementById('ov-from').value;
  const to = document.getElementById('ov-to').value;
  const price = parseInt(document.getElementById('ov-price').value);
  const note = document.getElementById('ov-note').value.trim();

  const errBar = document.getElementById('price-error-bar');
  const saveBar = document.getElementById('price-save-bar');
  
  errBar.style.display = 'none';
  saveBar.style.display = 'none';

  // Validation
  if (!room || !from || !to || !price) {
    errBar.textContent = adminLang === 'vn' ? 'Vui lòng điền đầy đủ thông tin.' : 'Please fill in all required fields.';
    errBar.style.display = 'block';
    return;
  }
  
  if (new Date(to) <= new Date(from)) {
    errBar.textContent = adminLang === 'vn' ? 'Ngày kết thúc phải sau ngày bắt đầu.' : 'End date must be after start date.';
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

    if (overrides.length === 0) {
      container.innerHTML = `<p class="no-overrides">${ADMIN_TRANSLATIONS[adminLang]['no-overrides']}</p>`;
      return;
    }

    // Sort by from date ascending
    overrides.sort((a, b) => new Date(a.from) - new Date(b.from));
    
    const AL = ADMIN_TRANSLATIONS[adminLang];
    container.innerHTML = `
      <table class="overrides-table">
        <thead>
          <tr>
            <th>${AL['th-room']}</th>
            <th>${AL['th-from']}</th>
            <th>${AL['th-to']}</th>
            <th>${AL['th-price']}</th>
            <th>${AL['th-usd']}</th>
            <th>${AL['th-note']}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${overrides.map(o => `
            <tr>
              <td>${escapeHtml(o.room)}</td>
              <td>${formatDateForDisplay(o.from)}</td>
              <td>${formatDateForDisplay(o.to)}</td>
              <td style="font-weight:500;color:var(--terracotta);">${formatVND(o.price)}</td>
              <td style="color:var(--ink-light);">~$${Math.round(o.price / 25000)}</td>
              <td style="color:var(--ink-light);">${escapeHtml(o.note || '—')}</td>
              <td><button class="del-btn" onclick="deleteOverride(${o.id})">✕</button></td>
            </tr>
          `).join('')}
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
    
    console.log('setMaintenanceMode response status:', res.status);
    const json = await res.json();
    console.log('setMaintenanceMode FULL response data:', JSON.stringify(json, null, 2));
    console.log('json.status:', json.status);
    console.log('json.status type:', typeof json.status);
    console.log('json.status === "ok"?', json.status === 'ok');
    
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
  
  console.log('Toggle maintenance - current:', currentIsOn, 'new:', newValue);

  // Save original button text
  const originalText = btn.textContent;
  
  // Disable button during operation
  btn.disabled = true;
  btn.textContent = adminLang === 'vn' ? 'Đang xử lý...' : 'Processing...';

  try {
    const success = await setMaintenanceMode(newValue);
    console.log('setMaintenanceMode success:', success);
    
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
      console.log('Maintenance mode toggled successfully to:', newValue ? 'ON' : 'OFF');
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
    'lbl-ov-from': 'textContent',
    'lbl-ov-to': 'textContent',
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

  // Update select options
  const rsSel = document.getElementById('rs-status');
  if (rsSel && rsSel.options.length >= 2) {
    rsSel.options[0].text = L['opt-rs-closed'];
    rsSel.options[1].text = L['opt-rs-open'];
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
          <div style="margin-top: 1rem;">
            <button onclick="confirmRefund('${c.bookingId}')" class="add-override-btn" style="background: #059669;">✅ Confirm & Notify Guest</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    container.innerHTML = '<div style="background: #fee2e2; padding: 1rem; border-radius: 8px;">Error loading cancellation requests</div>';
  }
}

function showRefundForm(bookingId) {
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
  if (!confirm('Are you sure you want to reject this cancellation request?')) return;
  document.getElementById(`cancel-card-${bookingId}`)?.remove();
  alert('✅ Request rejected. Guest will be notified.');
  loadPendingCancellations();
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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