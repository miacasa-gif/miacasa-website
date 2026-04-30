// ================================================================
// BOOKING.JS - Booking engine with availability check
// ================================================================

const API_URL = '/api/log-booking';
const EXTRA_GUEST_FEE = 100000;
const INCLUDED_GUESTS = 2;

// Room capacity mapping
const ROOM_CAPACITY = {
    "Spring Room": 3,
    "Summer Room": 3,
    "Autumn Room": 3,
    "Entire Apartment (3 king beds)": 6
};

let currentAvailabilityStatus = { available: false, checked: false };

// Room to property mapping
function getPropertyFromRoom(room) {
    const map = {
        "Spring Room": "MiaCasaHanoi",
        "Summer Room": "MiaCasaHanoi",
        "Autumn Room": "MiaCasaHanoi",
        "Entire Apartment (3 king beds)": "MiaCasaOldQuarter"
    };
    return map[room] || "MiaCasaHanoi";
}

// PROPERTIES DATA
const PROPERTIES = [
    {
        id: 'hanoi',
        name: 'MiaCasaHanoi',
        badge: 'Rooms with Kitchenette',
        location: '92 Ngh. 51 Ng. Linh Quang, Văn Chương, Văn Miếu – Quốc Tử Giám, Hà Nội',
        desc: 'Three private boho rooms — Spring, Summer, and Autumn — each with attached bathroom and kitchenette.',
        maxGuests: 8,
        maxGuestsPerRoom: 3,
        rating: '4.9',
        priceNote: 'From 750,000₫ (~$30 USD) / room / night',
        vn: {
            badge: 'Phòng có bếp nhỏ',
            desc: 'Ba phòng boho riêng tư — Xuân, Hạ và Thu — mỗi phòng có phòng tắm riêng và bếp nhỏ.',
            priceNote: 'Từ 750.000₫ (~30 USD) / phòng / đêm',
            rooms: ['Phòng Xuân', 'Phòng Hạ', 'Phòng Thu']
        },
        heroImg: 'https://res.cloudinary.com/dczfocztf/image/upload/c_scale,w_600,f_auto,q_60/v1775638632/DSC_6634_pwmg8r.jpg',
        pageUrl: 'miacasa-hanoi.html',
        rooms: ['Spring Room', 'Summer Room', 'Autumn Room']
    },
    {
        id: 'oldquarter',
        name: 'MiaCasaOldQuarter',
        badge: 'Whole Apartment',
        location: '38 P. Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm, Hà Nội',
        desc: 'A whole apartment in the heart of the Old Quarter. Two beds on the main level and one in the upper attic.',
        maxGuests: 6,
        rating: '4.8',
        priceNote: 'From 1,200,000₫ (~$48 USD) / night · Base rate for 2 guests',
        vn: {
            badge: 'Toàn bộ căn hộ',
            desc: 'Toàn bộ căn hộ giữa lòng Phố Cổ. Hai giường ở tầng chính và một giường ở gác xép phía trên.',
            priceNote: 'Từ 1.200.000₫ (~48 USD) / đêm · Giá cơ bản cho 2 khách',
            rooms: ['Toàn bộ căn hộ (3 giường đôi)']
        },
        heroImg: 'https://res.cloudinary.com/dczfocztf/image/upload/c_scale,w_600,f_auto,q_60/v1775735576/att.dQ-7EPkykJ12fIQMeB_uBO8MXd0D5gsS8gmaVrRL7Rg_e86yd8.jpg',
        pageUrl: 'miacasa-oldquarter.html',
        rooms: ['Entire Apartment (3 king beds)']
    }
];

// PRICING ENGINE
const SPECIAL_RANGES = [
    ['2025-01-28', '2025-02-04'], ['2026-02-14', '2026-02-21'],
    ['2025-08-30', '2025-09-03'], ['2026-08-30', '2026-09-03'],
    ['2025-12-23', '2025-12-27'], ['2026-12-23', '2026-12-27']
];

function isSpecialDay(dateStr) {
    const d = new Date(dateStr);
    for (const [s, e] of SPECIAL_RANGES) {
        if (d >= new Date(s) && d <= new Date(e)) return true;
    }
    return false;
}

function isWeekendNight(dateStr) {
    const day = new Date(dateStr).getDay();
    return day === 5 || day === 6;
}

const MCH_RATES = { weekday: 750000, weekend: 800000, special: 900000 };
const MCOQ_RATES = { weekday: 1200000, weekend: 1350000, special: 1400000 };

function nightRate(dateStr, propId) {
    const r = propId === 'hanoi' ? MCH_RATES : MCOQ_RATES;
    if (isSpecialDay(dateStr)) return r.special;
    if (isWeekendNight(dateStr)) return r.weekend;
    return r.weekday;
}

function calcTotal(propId, checkIn, checkOut, guests) {
    const ci = new Date(checkIn), co = new Date(checkOut);
    if (isNaN(ci) || isNaN(co) || co <= ci) return null;
    
    let nights = 0, baseTotal = 0;
    const d = new Date(ci);
    while (d < co) {
        baseTotal += nightRate(d.toISOString().slice(0, 10), propId);
        nights++;
        d.setDate(d.getDate() + 1);
    }
    
    let extra = 0;
    if (guests > INCLUDED_GUESTS) {
        extra = (guests - INCLUDED_GUESTS) * EXTRA_GUEST_FEE * nights;
    }
    return { nights, baseTotal, extra, total: baseTotal + extra };
}

// BOOKING ID GENERATOR
const ROOM_CODE = {
    'Spring Room': 'SPR', 'Summer Room': 'SUM', 'Autumn Room': 'AUT',
    'Entire Apartment (3 king beds)': 'OLQ'
};
const PROP_CODE = { 'hanoi': 'MCH', 'oldquarter': 'MCOQ' };

function getBookingCounter(key) {
    const v = parseInt(localStorage.getItem('mia_ctr_' + key) || '0') + 1;
    localStorage.setItem('mia_ctr_' + key, v);
    return v;
}

function makeBookingId(propId, room) {
    const pc = PROP_CODE[propId] || 'MIA';
    const rc = ROOM_CODE[room] || 'GEN';
    const n = getBookingCounter(pc + '_' + rc);
    return pc + '-' + rc + '-' + String(n).padStart(4, '0');
}

// UI HELPERS
function fmtVND(n) { return n.toLocaleString('vi-VN') + '₫'; }
function fmtUSD(n) { return '$' + (n / 25000).toFixed(0); }
function fmtDateVN(dateStr) {
    if (!dateStr) return '—';
    const parts = dateStr.split('-');
    if (parts.length === 3) return parts[2] + '/' + parts[1] + '/' + parts[0];
    return dateStr;
}

let activeProp = 'hanoi';
let currentBookingId = '';
let currentBookingKey = '';
let lastPriceResult = null;
let selectedPayTab = 'paypal';

// ================================================================
// RENDER FUNCTIONS - MOVE THESE UP BEFORE INITIALIZATION
// ================================================================

function getField(p, field, lang) {
    if (lang === 'vn' && p.vn && p.vn[field] !== undefined) return p.vn[field];
    return p[field];
}

function renderProperties() {
    console.log('renderProperties called');
    const grid = document.getElementById('properties-grid');
    
    // If this page doesn't have properties grid, exit immediately
    if (!grid) {
        console.log('No properties grid on this page - skipping renderProperties');
        return;
    }
    console.log('grid element:', grid);
    
    if (!grid) {
        console.error('properties-grid element not found!');
        return;
    }
    
    const lang = window.currentLang || 'en';
    grid.innerHTML = '';
    
    // Force grid styling to ensure visibility
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    grid.style.gap = '2rem';
    grid.style.marginTop = '1rem';
    
    PROPERTIES.forEach((p) => {
        const badge = getField(p, 'badge', lang);
        const desc = getField(p, 'desc', lang);
        const rooms = getField(p, 'rooms', lang);
        
        const card = document.createElement('div');
        card.className = 'property-card';
        // Add inline styles as fallback
        card.style.border = '1px solid var(--border, #e0ddd5)';
        card.style.borderRadius = '4px';
        card.style.overflow = 'hidden';
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        card.style.background = 'white';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        
        // Build the notice HTML only for Old Quarter
        let noticeHtml = '';
        if (p.id === 'oldquarter') {
            noticeHtml = `
                <div style="margin-top: 1rem; padding: 0.5rem; background: #f5efe6; border-radius: 4px;">
                    <p style="font-size: 0.65rem; color: #6b5c47; margin: 0;" data-t="oldquarter-notice">
                        ⚠ Heads up: The neighbourhood is lively and can be noisy at night. Access is via steep stairs — not ideal for young children, elderly guests, or anyone with mobility concerns.
                    </p>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="property-img" style="height: 240px; overflow: hidden; position: relative; flex-shrink: 0;">
                <img src="${p.heroImg}" alt="${p.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="property-badge" style="position: absolute; top: 1rem; left: 1rem; background: #c17a5a; color: white; font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 2px;">${badge}</div>
            </div>
            <div class="property-body" style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1;">
                <div class="property-name" style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #2c2416; margin-bottom: 0.2rem;">${p.name}</div>
                <div class="property-loc" style="font-size: 0.75rem; color: #c17a5a; letter-spacing: 0.05em; margin-bottom: 0.9rem;">📍 ${p.location}</div>
                <p class="property-desc" style="font-size: 0.88rem; color: #6b5c47; line-height: 1.8; margin-bottom: 1.25rem; flex: 1;">${desc}</p>
                <div class="property-meta" style="display: flex; justify-content: space-between; text-align: center; margin-bottom: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(193, 122, 90, 0.2);">
                    <div class="meta-item" style="flex: 1; text-align: center;">
                        <span class="meta-num" style="font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: #c17a5a; display: block;">${rooms.length}</span>
                        <span class="meta-lbl" style="font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: #6b5c47; display: block;">${rooms.length > 1 ? (lang === 'vn' ? 'Phòng' : 'Rooms') : (lang === 'vn' ? 'Căn hộ' : 'Unit')}</span>
                    </div>
                    <div class="meta-item" style="flex: 1; text-align: center;">
                        <span class="meta-num" style="font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: #c17a5a; display: block;">1–${p.maxGuests}</span>
                        <span class="meta-lbl" style="font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: #6b5c47; display: block;">${lang === 'vn' ? 'Khách' : 'Guests'}</span>
                    </div>
                    <div class="meta-item" style="flex: 1; text-align: center;">
                        <span class="meta-num" style="font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: #c17a5a; display: block;">${p.rating}★</span>
                        <span class="meta-lbl" style="font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: #6b5c47; display: block;">${lang === 'vn' ? 'Đánh giá' : 'Rating'}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <a href="${p.pageUrl}" class="btn-outline" style="flex: 1; background: transparent; color: #2c2416; padding: 0.85rem 2rem; border: 1px solid #6b5c47; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; text-decoration: none; display: inline-block; text-align: center;">${lang === 'vn' ? 'Khám phá →' : 'Explore →'}</a>
                    <a href="#booking" class="btn-primary" style="flex: 1; background: #c17a5a; color: white; padding: 0.85rem 2rem; border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; text-decoration: none; display: inline-block; text-align: center;" onclick="if(typeof selectAndScroll === 'function') selectAndScroll('${p.id}'); else window.location.href='#booking';">${lang === 'vn' ? 'Đặt ngay →' : 'Book Now →'}</a>
                </div>
                ${noticeHtml}
            </div>
        `;
        grid.appendChild(card);
    });
    
    console.log('Properties rendered successfully, cards added:', PROPERTIES.length);
}

function renderBookingSelector() {
    const sel = document.getElementById('booking-prop-sel');
    if (!sel) return;
    
    const lang = window.currentLang || 'en';
    sel.innerHTML = '';
    
    PROPERTIES.forEach((p, i) => {
        const badge = getField(p, 'badge', lang);
        const btn = document.createElement('button');
        btn.className = 'prop-select-btn' + (i === 0 ? ' active' : '');
        btn.id = 'bsb-' + p.id;
        btn.onclick = () => selectProp(p.id);
        btn.setAttribute('data-prop', p.id === 'hanoi' ? 'hanoi' : 'oldquarter');
        btn.innerHTML = `<span class="pbn">${p.name}</span><span class="pbs">${badge} · ${p.rating}★</span>`;
        sel.appendChild(btn);
    });
}

// ================================================================
// CORE FUNCTIONS - Define these BEFORE they're called
// ================================================================

function selectProp(id) {
    console.log('selectProp called with id:', id);
    activeProp = id;
    document.querySelectorAll('.prop-select-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('bsb-' + id);
    if (activeBtn) activeBtn.classList.add('active');
    
    const p = PROPERTIES.find(x => x.id === id);
    const lang = window.currentLang || 'en';
    const rooms = getField(p, 'rooms', lang);
    const roomSelect = document.getElementById('room-type-sel');
    if (roomSelect) {
        roomSelect.innerHTML = rooms.map(r => `<option>${r}</option>`).join('');
    }
    
    const bookingMaxGuests = p.maxGuestsPerRoom || p.maxGuests;
    const guestWord = lang === 'vn' ? 'Khách' : 'Guest';
    const guestWordPl = lang === 'vn' ? 'Khách' : 'Guests';
    const guestSelect = document.getElementById('guests-sel');
    if (guestSelect) {
        guestSelect.innerHTML = Array.from({ length: bookingMaxGuests }, (_, i) => 
            `<option value="${i + 1}">${i + 1} ${i === 0 ? guestWord : guestWordPl}</option>`
        ).join('');
    }
    
    const priceNote = getField(p, 'priceNote', lang);
    const pricingNote = document.getElementById('pricing-note');
    if (pricingNote) {
        pricingNote.innerHTML = `💡 ${priceNote}. ${lang === 'vn' ? 'Giá phụ thuộc vào ngày, số lượng khách và độ dài lưu trú. Chúng tôi luôn đưa ra mức giá tốt nhất có thể.' : 'Final pricing depends on dates, number of guests, and length of stay. We\'ll always share the best available direct rate.'}`;
    }
    
    updateAvailabilityAndUI();
}

function selectAndScroll(id) {
    selectProp(id);
    setTimeout(() => {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    }, 50);
}

// ================================================================
// AVAILABILITY CHECKING FUNCTIONS
// ================================================================

async function checkRoomAvailability(room, checkIn, checkOut) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'checkRoomAvailability',
                room: room,
                checkIn: checkIn,
                checkOut: checkOut
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Availability check failed:', error);
        return { available: true };
    }
}

function areBookingInputsFilled() {
    const room = document.getElementById('room-type-sel')?.value;
    const ci = document.getElementById('checkin')?.value;
    const co = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests-sel')?.value;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = ci ? new Date(ci) : null;
    checkInDate?.setHours(0, 0, 0, 0);
    
    const hasValidDates = ci && co && new Date(co) > new Date(ci) && checkInDate >= today;
    
    return room && hasValidDates && guests;
}

function setMinDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    
    if (checkin) {
        checkin.min = todayStr;
    }
    if (checkout) {
        checkout.min = todayStr;
    }
}

function areUserDetailsFilled() {
    const name = document.getElementById('guest-name')?.value?.trim();
    const email = document.getElementById('guest-email')?.value?.trim();
    const phone = document.getElementById('guest-phone-number')?.value?.trim();
    return name && email && phone;
}

function updateGuestOptions() {
    const room = document.getElementById('room-type-sel')?.value;
    const guestSelect = document.getElementById('guests-sel');
    if (!room || !guestSelect) return;
    
    const maxGuests = ROOM_CAPACITY[room] || 2;
    const currentValue = parseInt(guestSelect.value || '1');
    guestSelect.innerHTML = '';
    
    for (let i = 1; i <= maxGuests; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i + (i === 1 ? ' guest' : ' guests');
        guestSelect.appendChild(opt);
    }
    guestSelect.value = Math.min(currentValue, maxGuests);
    updateAvailabilityAndUI();
}

function updatePriceDisplayContent(result, ci, co, room) {
    const propName = PROPERTIES.find(p => p.id === activeProp)?.name || activeProp;
    const prVal = document.getElementById('ps-pr-val');
    const datesVal = document.getElementById('ps-dates-val');
    const extraRow = document.getElementById('ps-extrarow');
    const extraVal = document.getElementById('ps-extra-val');
    const totalVal = document.getElementById('ps-total-val');
    const bidVal = document.getElementById('ps-bid');
    
    if (prVal) prVal.textContent = propName + ' · ' + room;
    if (datesVal) datesVal.textContent = fmtDateVN(ci) + ' → ' + fmtDateVN(co) + ' (' + result.nights + ' night' + (result.nights > 1 ? 's' : '') + ')';
    
    if (result.extra > 0) {
        if (extraRow) extraRow.style.display = 'flex';
        if (extraVal) extraVal.textContent = fmtVND(result.extra) + ' (~' + fmtUSD(result.extra) + ')';
    } else {
        if (extraRow) extraRow.style.display = 'none';
    }
    
    if (totalVal) totalVal.textContent = fmtVND(result.total) + ' (~' + fmtUSD(result.total) + ')';
    if (bidVal) bidVal.textContent = currentBookingId;
}

function showCancellationMessage(checkInDate) {
    const msgDiv = document.getElementById('cancellation-message');
    if (!msgDiv) return;
    
    const cancellationDate = new Date(checkInDate);
    cancellationDate.setDate(cancellationDate.getDate() - 2);
    
    const lang = window.currentLang || 'en';
    const formattedDate = cancellationDate.toLocaleDateString(lang === 'vn' ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const message = lang === 'vn' 
        ? `✓ Hủy miễn phí đến ${formattedDate}`
        : `✓ Free cancellation until ${formattedDate}`;
    
    msgDiv.innerHTML = message;
    msgDiv.style.display = 'block';
}

async function updateAvailabilityAndUI() {
    const room = document.getElementById('room-type-sel')?.value;
    const ci = document.getElementById('checkin')?.value;
    const co = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests-sel')?.value;
    
    const availabilityMsgDiv = document.getElementById('availability-message');
    const cancellationMsgDiv = document.getElementById('cancellation-message');
    const priceBox = document.getElementById('mia-price-box');
    const paymentSection = document.getElementById('mia-payment-section');
    const continueBtn = document.getElementById('booking-action-btn');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDateObj = new Date(ci);
    checkInDateObj.setHours(0, 0, 0, 0);

    if (ci && checkInDateObj < today) {
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = window.currentLang === 'vn' 
                ? '❌ Không thể chọn ngày trong quá khứ' 
                : '❌ Cannot select past dates';
            availabilityMsgDiv.className = 'unavailable';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (continueBtn) continueBtn.style.display = 'none';
        return;
    }
    
    // Check if all required inputs are filled
    if (!room || !ci || !co || !guests) {
        if (availabilityMsgDiv) {
            if (!ci || !co) {
                availabilityMsgDiv.innerHTML = '📅 Please select check-in and check-out dates';
            } else if (!room) {
                availabilityMsgDiv.innerHTML = '🏠 Please select a room';
            } else if (!guests) {
                availabilityMsgDiv.innerHTML = '👥 Please select number of guests';
            } else {
                availabilityMsgDiv.innerHTML = '📋 Please complete all booking details';
            }
            availabilityMsgDiv.className = 'loading';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (paymentSection) paymentSection.style.display = 'none';
        if (continueBtn) continueBtn.style.display = 'none';
        if (cancellationMsgDiv) cancellationMsgDiv.style.display = 'none';
        return;
    }
    
    // Validate date order
    if (new Date(co) <= new Date(ci)) {
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = '⚠️ Check-out date must be after check-in date';
            availabilityMsgDiv.className = 'unavailable';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        return;
    }
    
    // Show loading state
    if (availabilityMsgDiv) {
        availabilityMsgDiv.innerHTML = '⏳ Checking availability...';
        availabilityMsgDiv.className = 'loading';
        availabilityMsgDiv.style.display = 'block';
    }
    
    // Check availability
    const availability = await checkRoomAvailability(room, ci, co);
    currentAvailabilityStatus = availability;
    currentAvailabilityStatus.checked = true;
    
    if (!availability.available) {
        if (availabilityMsgDiv) {
            if (availability.bothPropertiesBooked) {
                availabilityMsgDiv.innerHTML = '❌ Both properties are booked for these dates. Please try different dates.';
            } else {
                availabilityMsgDiv.innerHTML = `❌ This room is booked. Try our other property or choose different dates.`;
            }
            availabilityMsgDiv.className = 'unavailable';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (paymentSection) paymentSection.style.display = 'none';
        if (continueBtn) continueBtn.style.display = 'none';
        if (cancellationMsgDiv) cancellationMsgDiv.style.display = 'none';
        return;
    }
    
    // Room is available
    if (availabilityMsgDiv) {
        availabilityMsgDiv.innerHTML = '✅ Room available! Enter your details to continue.';
        availabilityMsgDiv.className = 'available';
        availabilityMsgDiv.style.display = 'block';
    }
    
    // Generate booking ID
    const newKey = activeProp + '|' + room;
    if (!currentBookingId || currentBookingKey !== newKey) {
        currentBookingId = makeBookingId(activeProp, room);
        currentBookingKey = newKey;
    }
    
    // Calculate and show price
    const result = calcTotal(activeProp, ci, co, parseInt(guests));
    if (result) {
        lastPriceResult = result;
        updatePriceDisplayContent(result, ci, co, room);
        if (priceBox) priceBox.style.display = 'block';
    }
    
    // Check if user details are filled
    if (areUserDetailsFilled()) {
        if (continueBtn) {
            continueBtn.style.display = 'block';
            console.log('Continue button should be visible now');
            continueBtn.textContent = window.currentLang === 'vn' ? 'Continue to Payment →' : 'Continue to Payment →';
        }
        if (ci) {
            showCancellationMessage(ci);
        }
    } else {
        if (continueBtn) continueBtn.style.display = 'none';
        if (cancellationMsgDiv) cancellationMsgDiv.style.display = 'none';
    }
}

function resetBookingForm() {
    const confBox = document.getElementById('mia-confirm-box');
    const priceBox = document.getElementById('mia-price-box');
    const paySection = document.getElementById('mia-payment-section');
    const continueBtn = document.getElementById('booking-action-btn');
    
    if (confBox) confBox.style.display = 'none';
    if (priceBox) priceBox.style.display = 'none';
    if (paySection) paySection.style.display = 'none';
    if (continueBtn) continueBtn.style.display = 'none';
    
    const gn = document.getElementById('guest-name');
    const ge = document.getElementById('guest-email');
    const gp = document.getElementById('guest-phone-number');
    if (gn) gn.value = '';
    if (ge) ge.value = '';
    if (gp) gp.value = '';
    
    const ci = document.getElementById('checkin');
    const co = document.getElementById('checkout');
    if (ci) ci.value = '';
    if (co) co.value = '';
    
    lastPriceResult = null;
    currentBookingId = '';
    currentBookingKey = '';
    currentAvailabilityStatus = { available: false, checked: false };
    
    updateAvailabilityAndUI();
}

// ================================================================
// INITIALIZATION - Put this at the VERY END
// ================================================================

function initializeProperties() {
    console.log('Initializing properties...');
    if (document.getElementById('properties-grid')) {
        renderProperties();
        renderBookingSelector();
        selectProp(PROPERTIES[0].id);
        setMinDates();
        updateGuestOptions();
        updateAvailabilityAndUI();
        return true;
    }
    return false;
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProperties);
} else {
    initializeProperties();
}

// Make functions available globally
window.renderProperties = renderProperties;
window.renderBookingSelector = renderBookingSelector;
window.selectProp = selectProp;
window.selectAndScroll = selectAndScroll;
window.updateAvailabilityAndUI = updateAvailabilityAndUI;
window.updateGuestOptions = updateGuestOptions;
window.setMinDates = setMinDates;
window.resetBookingForm = resetBookingForm;
window.checkRoomAvailability = checkRoomAvailability;
window.areBookingInputsFilled = areBookingInputsFilled;
window.areUserDetailsFilled = areUserDetailsFilled;

// ================================================================
// PAYMENT & BOOKING FUNCTIONS
// ================================================================

function handleContinueToPayment() {
    console.log('handleContinueToPayment called');
    
    const paymentSection = document.getElementById('mia-payment-section');
    const continueBtn = document.getElementById('booking-action-btn');
    
    if (paymentSection) {
        paymentSection.style.display = 'block';
        console.log('Payment section displayed');
        generateQRCode();
    }
    
    if (continueBtn) {
        continueBtn.style.display = 'none';
    }
}

function selectPayTab(type) {
    console.log('selectPayTab called with:', type);
    selectedPayTab = type;
    
    const paypalPanel = document.getElementById('paypal-panel');
    const vietqrPanel = document.getElementById('vietqr-panel');
    const paypalTab = document.getElementById('pay-tab-paypal');
    const vietqrTab = document.getElementById('pay-tab-vietqr');
    
    if (paypalTab) paypalTab.classList.remove('active');
    if (vietqrTab) vietqrTab.classList.remove('active');
    
    if (type === 'paypal') {
        if (paypalPanel) paypalPanel.style.display = 'block';
        if (vietqrPanel) vietqrPanel.style.display = 'none';
        if (paypalTab) paypalTab.classList.add('active');
    } else if (type === 'vietqr') {
        if (paypalPanel) paypalPanel.style.display = 'none';
        if (vietqrPanel) vietqrPanel.style.display = 'block';
        if (vietqrTab) vietqrTab.classList.add('active');
        generateQRCode();
    }
}

function generateQRCode() {
    const qrContainer = document.getElementById('qr-img');
    if (!qrContainer) return;
    
    const amount = lastPriceResult?.total;
    const bookingId = currentBookingId;
    
    console.log('Generating QR for amount:', amount, 'booking:', bookingId);
    
    if (amount && bookingId) {
        const qrUrl = `https://img.vietqr.io/image/SACOMBANK-021091408386-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(bookingId)}&accountName=Ba%20Thi%20Bich%20Ngoc`;
        qrContainer.innerHTML = `<img src="${qrUrl}" style="width:200px;height:200px;border-radius:4px;" alt="VietQR">`;
    } else {
        qrContainer.innerHTML = '<p style="font-size:0.75rem;">Loading QR code...</p>';
    }
}

function collectBookingData() {
    const propName = PROPERTIES.find(p => p.id === activeProp)?.name || activeProp;
    const room = document.getElementById('room-type-sel')?.value;
    const ci = document.getElementById('checkin')?.value;
    const co = document.getElementById('checkout')?.value;
    const guests = parseInt(document.getElementById('guests-sel')?.value) || 1;
    const guestName = document.getElementById('guest-name')?.value?.trim() || '';
    const guestEmail = document.getElementById('guest-email')?.value?.trim() || '';
    const phoneCode = document.getElementById('guest-phone-code')?.value || '+84';
    const phoneNum = document.getElementById('guest-phone-number')?.value?.trim() || '';
    const guestPhone = phoneCode + ' ' + phoneNum;
    
    const result = lastPriceResult || calcTotal(activeProp, ci, co, guests);
    
    return {
        bookingId: currentBookingId,
        property: propName,
        room: room,
        checkIn: ci,
        checkOut: co,
        guests: guests,
        nights: result?.nights || 0,
        amount: result?.total || 0,
        guestName: guestName,
        guestEmail: guestEmail,
        guestPhone: guestPhone,
        bookedAt: new Date().toISOString(),
        paymentMethod: selectedPayTab,
        paymentStatus: 'pending'
    };
}

function saveBookingToLocal(data) {
    localStorage.setItem('mia_booking_' + data.bookingId, JSON.stringify(data));
}

function showBookingConfirmation(data) {
    const paySection = document.getElementById('mia-payment-section');
    const priceBox = document.getElementById('mia-price-box');
    const confBox = document.getElementById('mia-confirm-box');
    
    if (paySection) paySection.style.display = 'none';
    if (priceBox) priceBox.style.display = 'none';
    
    if (confBox) {
        confBox.style.display = 'block';
        const bidEl = document.getElementById('conf-bid');
        const detailsEl = document.getElementById('conf-details');
        
        if (bidEl) bidEl.textContent = 'Booking ID: ' + data.bookingId;
        if (detailsEl) {
            detailsEl.innerHTML = `
                <div><strong>Property:</strong> ${data.property}</div>
                <div><strong>Room:</strong> ${data.room}</div>
                <div><strong>Check-in:</strong> ${fmtDateVN(data.checkIn)}</div>
                <div><strong>Check-out:</strong> ${fmtDateVN(data.checkOut)}</div>
                <div><strong>Guests:</strong> ${data.guests}</div>
                <div><strong>Total:</strong> ${fmtVND(data.amount)} (~${fmtUSD(data.amount)})</div>
            `;
        }
    }
}

function validateBookingForm() {
    const ci = document.getElementById('checkin')?.value;
    const co = document.getElementById('checkout')?.value;
    const name = document.getElementById('guest-name')?.value?.trim();
    const email = document.getElementById('guest-email')?.value?.trim();
    const phone = document.getElementById('guest-phone-number')?.value?.trim();
    
    if (!ci || !co) return 'Please select check-in and check-out dates.';
    if (new Date(co) <= new Date(ci)) return 'Check-out must be after check-in.';
    if (!document.getElementById('room-type-sel')?.value) return 'Please select a room.';
    if (!name) return 'Please enter your full name.';
    if (!email || !email.includes('@')) return 'Please enter a valid email address.';
    if (!phone) return 'Please enter your phone number.';
    return null;
}

function showPayError(msg) {
    const el = document.getElementById('pay-error');
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 5000);
    }
}

async function callSheetsAPI(payload) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
    } catch (err) {
        console.warn('API error:', err);
        return { status: 'error', message: err.toString() };
    }
}

async function processPayPal() {
    const err = validateBookingForm();
    if (err) {
        showPayError(err);
        return;
    }
    
    const room = document.getElementById('room-type-sel')?.value;
    const checkIn = document.getElementById('checkin')?.value;
    const checkOut = document.getElementById('checkout')?.value;
    const guests = parseInt(document.getElementById('guests-sel')?.value) || 1;
    const guestName = document.getElementById('guest-name')?.value?.trim();
    const guestEmail = document.getElementById('guest-email')?.value?.trim();
    const phoneCode = document.getElementById('guest-phone-code')?.value || '+84';
    const phoneNum = document.getElementById('guest-phone-number')?.value?.trim() || '';
    const guestPhone = phoneCode + ' ' + phoneNum;
    
    if (!room || !checkIn || !checkOut || !guestName || !guestEmail) {
        showPayError('Please fill all required fields.');
        return;
    }
    
    const property = getPropertyFromRoom(room);
    if (!property) {
        showPayError('Unable to determine property.');
        return;
    }
    
    if (!currentBookingId) {
        showPayError('Booking ID not generated yet. Please select dates first.');
        return;
    }
    
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const amount = (() => {
        let total = 0;
        let current = new Date(checkIn);
        while (current < new Date(checkOut)) {
            total += nightRate(current.toISOString().slice(0, 10), activeProp);
            current.setDate(current.getDate() + 1);
        }
        if (guests > INCLUDED_GUESTS) {
            total += (guests - INCLUDED_GUESTS) * EXTRA_GUEST_FEE * nights;
        }
        return total;
    })();
    
    const payload = {
        action: 'createBooking',
        bookingId: currentBookingId,
        property: property,
        room: room,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        guests: guests,
        amount: amount,
        guestName: guestName,
        guestEmail: guestEmail,
        guestPhone: guestPhone,
        paymentMethod: 'paypal',
        paymentStatus: 'pending',
        bookedAt: new Date().toISOString()
    };
    
    try {
        const res = await callSheetsAPI(payload);
        if (res.status !== 'ok') {
            throw new Error(res.message || 'Failed to save booking');
        }
        
        const amountUSD = (amount / 25000).toFixed(2);
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick` +
            `&business=miacasahanoi@gmail.com` +
            `&amount=${amountUSD}` +
            `&currency_code=USD` +
            `&item_name=MiaCasa%20Booking%20${currentBookingId}` +
            `&invoice=${currentBookingId}`;
        
        window.open(paypalLink, '_blank');
        
        alert('Booking saved! Please complete payment on PayPal.');
    } catch (error) {
        showPayError(error.message);
    }
}

function confirmVietQR() {
    const err = validateBookingForm();
    if (err) {
        showPayError(err);
        return;
    }
    
    const data = collectBookingData();
    saveBookingToLocal(data);
    showBookingConfirmation(data);
}

// Make additional functions available globally
window.handleContinueToPayment = handleContinueToPayment;
window.selectPayTab = selectPayTab;
window.generateQRCode = generateQRCode;
window.collectBookingData = collectBookingData;
window.saveBookingToLocal = saveBookingToLocal;
window.showBookingConfirmation = showBookingConfirmation;
window.validateBookingForm = validateBookingForm;
window.showPayError = showPayError;
window.callSheetsAPI = callSheetsAPI;
window.processPayPal = processPayPal;
window.confirmVietQR = confirmVietQR;