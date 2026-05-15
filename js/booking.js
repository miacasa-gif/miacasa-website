// ================================================================
// BOOKING.JS - Booking engine with availability check
// ================================================================

const API_URL = '/api/log-booking';
const EXTRA_GUEST_FEE = PRICES['extra-guest-hanoi'];
const INCLUDED_GUESTS = 2;

// Make sure PRICES is loaded
if (typeof PRICES === 'undefined') {
    window.PRICES = {
        'hanoi-spring': 750000,
        'hanoi-summer': 750000,
        'hanoi-autumn': 750000,
        'oldquarter': 1200000,
        'extra-guest-hanoi': 150000,
        'extra-guest-oldquarter': 200000
    };
}

// Room capacity mapping
const ROOM_CAPACITY = {
    "Spring Room": 3,
    "Summer Room": 3,
    "Autumn Room": 3,
    "Entire Apartment (3 king beds)": 6
};

// ================================================================
// OPTIMIZATION: Caching & Debouncing
// ================================================================
const availabilityCache = new Map();
let availabilityCheckInProgress = false;
let lastAvailabilityResult = null;
let availabilityDebounceTimer = null;
let slowConnectionTimeout = null;

let currentAvailabilityStatus = { available: false, checked: false };

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
        priceNote: 'From ' + PRICES['hanoi-spring'].toLocaleString() + '₫ / room / night',
        vn: {
            badge: 'Phòng có bếp nhỏ',
            desc: 'Ba phòng boho riêng tư — Xuân, Hạ và Thu — mỗi phòng có phòng tắm riêng và bếp nhỏ.',
            priceNote: 'Từ ' + PRICES['hanoi-spring'].toLocaleString('vi-VN') + '₫ / phòng / đêm',
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
        priceNote: 'From ' + PRICES.oldquarter.toLocaleString() + '₫ / night · Base rate for 2 guests',
        vn: {
            badge: 'Toàn bộ căn hộ',
            desc: 'Toàn bộ căn hộ giữa lòng Phố Cổ. Hai giường ở tầng chính và một giường ở gác xép phía trên.',
            priceNote: 'Từ ' + PRICES.oldquarter.toLocaleString('vi-VN') + '₫ / đêm · Giá cơ bản cho 2 khách',
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

function nightRate(dateStr, propId) {
    const hanoiRates = {
        weekday: PRICES['hanoi-spring'],
        weekend: PRICES['hanoi-weekend'],
        special: PRICES['hanoi-special']
    };
    const oqRates = {
        weekday: PRICES.oldquarter,
        weekend: PRICES['oldquarter-weekend'],
        special: PRICES['oldquarter-special']
    };
    const r = propId === 'hanoi' ? hanoiRates : oqRates;
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
        const extraFee = propId === 'hanoi' ? PRICES['extra-guest-hanoi'] : PRICES['extra-guest-oldquarter'];
        extra = (guests - INCLUDED_GUESTS) * extraFee * nights;
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
// OPTIMIZED AVAILABILITY CHECK (Non-blocking + Cached)
// ================================================================

async function checkRoomAvailability(room, checkIn, checkOut) {
    const cacheKey = `${room}_${checkIn}_${checkOut}`;
    const cached = availabilityCache.get(cacheKey);
    
    // Use cache if less than 2 minutes old
    if (cached && (Date.now() - cached.timestamp) < 120000) {
        console.log('✓ Using cached availability');
        return cached.data;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'checkRoomAvailability', room, checkIn, checkOut })
        });
        const data = await response.json();
        
        // Store in cache
        availabilityCache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });
        
        return data;
    } catch (error) {
        console.error('Availability check failed:', error);
        return { available: true };
    }
}

// Background availability check (does not block UI)
function checkAvailabilityInBackground(room, ci, co) {
    if (!room || !ci || !co) return;
    if (availabilityCheckInProgress) return;
    
    availabilityCheckInProgress = true;
    
    const availabilityMsgDiv = document.getElementById('availability-message');
    if (availabilityMsgDiv && availabilityMsgDiv.innerHTML === '⏳ Checking availability...') {
        // Message already showing, don't change
    } else if (availabilityMsgDiv) {
        availabilityMsgDiv.innerHTML = '⏳ Checking availability...';
        availabilityMsgDiv.className = 'loading';
        availabilityMsgDiv.style.display = 'block';
    }
    
    // Set a timeout to show if it's taking too long
    slowConnectionTimeout = setTimeout(() => {
        if (availabilityMsgDiv && availabilityMsgDiv.innerHTML === '⏳ Checking availability...') {
            availabilityMsgDiv.innerHTML = '⏳ Still checking... you can continue filling your details';
        }
    }, 2000);
    
    checkRoomAvailability(room, ci, co).then(availability => {
        clearTimeout(slowConnectionTimeout);
        currentAvailabilityStatus = availability;
        lastAvailabilityResult = availability;
        availabilityCheckInProgress = false;
        
        if (availability.available) {
            if (availabilityMsgDiv) {
                availabilityMsgDiv.innerHTML = '✅ Room available! You can proceed.';
                availabilityMsgDiv.className = 'available';
            }
            // Show payment section if user details are already filled
            if (areUserDetailsFilled()) {
                const paymentSection = document.getElementById('mia-payment-section');
                if (paymentSection) paymentSection.style.display = 'block';
                if (typeof generateQRCode === 'function') generateQRCode();
            }
        } else {
            if (availabilityMsgDiv) {
                availabilityMsgDiv.innerHTML = availability.bothPropertiesBooked 
                    ? '❌ Both properties are booked for these dates. Please try different dates.'
                    : '❌ This room is booked. Try our other property or choose different dates.';
                availabilityMsgDiv.className = 'unavailable';
            }
            const paymentSection = document.getElementById('mia-payment-section');
            if (paymentSection) paymentSection.style.display = 'none';
        }
        
        // Update price again with confirmed availability
        const guests = document.getElementById('guests-sel')?.value;
        if (availability.available && ci && co && guests) {
            const result = calcTotal(activeProp, ci, co, parseInt(guests));
            if (result) {
                lastPriceResult = result;
                updatePriceDisplayContent(result, ci, co, room);
                const priceBox = document.getElementById('mia-price-box');
                if (priceBox) priceBox.style.display = 'block';
            }
        }
    }).catch(error => {
        clearTimeout(slowConnectionTimeout);
        console.error('Availability check error:', error);
        availabilityCheckInProgress = false;
        const availabilityMsgDiv = document.getElementById('availability-message');
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = '⚠️ Unable to check availability. Please try again.';
            availabilityMsgDiv.className = 'error';
        }
    });
}

// Debounced version to prevent multiple rapid calls
function debouncedUpdateAvailability() {
    clearTimeout(availabilityDebounceTimer);
    availabilityDebounceTimer = setTimeout(() => {
        updateAvailabilityAndUI();
    }, 500);
}

function setMinDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    if (checkin) checkin.min = todayStr;
    if (checkout) checkout.min = todayStr;
}

function areUserDetailsFilled() {
    const name = document.getElementById('guest-name')?.value?.trim();
    const email = document.getElementById('guest-email')?.value?.trim();
    const phone = document.getElementById('guest-phone-number')?.value?.trim();
    return !!(name && email && phone);
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
        year: 'numeric', month: 'long', day: 'numeric'
    });
    msgDiv.innerHTML = lang === 'vn' 
        ? `✓ Hủy miễn phí đến ${formattedDate}`
        : `✓ Free cancellation until ${formattedDate}`;
    msgDiv.style.display = 'block';
}

// ================================================================
// UPDATED: Non-blocking updateAvailabilityAndUI
// ================================================================
async function updateAvailabilityAndUI() {
    const room = document.getElementById('room-type-sel')?.value;
    const ci = document.getElementById('checkin')?.value;
    const co = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests-sel')?.value;
    
    const availabilityMsgDiv = document.getElementById('availability-message');
    const cancellationMsgDiv = document.getElementById('cancellation-message');
    const priceBox = document.getElementById('mia-price-box');
    const paymentSection = document.getElementById('mia-payment-section');
    const guestDetailsSection = document.getElementById('guest-details');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDateObj = ci ? new Date(ci) : null;
    if (checkInDateObj) checkInDateObj.setHours(0, 0, 0, 0);

    // Past date check
    if (ci && checkInDateObj < today) {
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = window.currentLang === 'vn' ? '❌ Không thể chọn ngày trong quá khứ' : '❌ Cannot select past dates';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (paymentSection) paymentSection.style.display = 'none';
        if (guestDetailsSection) guestDetailsSection.style.display = 'none';
        return;
    }
    
    // Check if all required inputs are filled
    if (!room || !ci || !co || !guests) {
        if (availabilityMsgDiv) {
            if (!ci || !co) availabilityMsgDiv.innerHTML = '📅 Please select check-in and check-out dates';
            else if (!room) availabilityMsgDiv.innerHTML = '🏠 Please select a room';
            else if (!guests) availabilityMsgDiv.innerHTML = '👥 Please select number of guests';
            else availabilityMsgDiv.innerHTML = '📋 Please complete all booking details';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (paymentSection) paymentSection.style.display = 'none';
        if (cancellationMsgDiv) cancellationMsgDiv.style.display = 'none';
        if (guestDetailsSection) guestDetailsSection.style.display = 'none';
        return;
    }
    
    // Validate date order
    if (new Date(co) <= new Date(ci)) {
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = '⚠️ Check-out date must be after check-in date';
            availabilityMsgDiv.style.display = 'block';
        }
        if (priceBox) priceBox.style.display = 'none';
        if (guestDetailsSection) guestDetailsSection.style.display = 'none';
        return;
    }
    
    // SHOW GUEST DETAILS SECTION IMMEDIATELY (don't wait for availability)
    if (guestDetailsSection && guestDetailsSection.style.display !== 'block') {
        guestDetailsSection.style.display = 'block';
        console.log('✅ Guest details section shown immediately');
    }
    
    // Generate booking ID immediately
    const newKey = activeProp + '|' + room;
    if (!currentBookingId || currentBookingKey !== newKey) {
        currentBookingId = makeBookingId(activeProp, room);
        currentBookingKey = newKey;
    }
    
    // Calculate and show price immediately (estimate)
    const result = calcTotal(activeProp, ci, co, parseInt(guests));
    if (result) {
        lastPriceResult = result;
        updatePriceDisplayContent(result, ci, co, room);
        if (priceBox) priceBox.style.display = 'block';
    }
    
    // Show cancellation message immediately
    if (ci) showCancellationMessage(ci);
    
    // Check availability in background (non-blocking)
    // But first, check if we have a recent cached result
    const cacheKey = `${room}_${ci}_${co}`;
    const cached = availabilityCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < 120000) {
        // Use cached result instantly
        currentAvailabilityStatus = cached.data;
        lastAvailabilityResult = cached.data;
        
        if (cached.data.available) {
            if (availabilityMsgDiv) {
                availabilityMsgDiv.innerHTML = '✅ Room available! You can proceed.';
                availabilityMsgDiv.className = 'available';
            }
            // Show payment section if user details are already filled
            if (areUserDetailsFilled()) {
                if (paymentSection) paymentSection.style.display = 'block';
                if (typeof generateQRCode === 'function') generateQRCode();
            }
        } else {
            if (availabilityMsgDiv) {
                availabilityMsgDiv.innerHTML = cached.data.bothPropertiesBooked 
                    ? '❌ Both properties are booked for these dates. Please try different dates.'
                    : '❌ This room is booked. Try our other property or choose different dates.';
                availabilityMsgDiv.className = 'unavailable';
            }
            if (paymentSection) paymentSection.style.display = 'none';
        }
    } else {
        // No cache - show loading and check in background
        if (availabilityMsgDiv) {
            availabilityMsgDiv.innerHTML = '⏳ Checking availability...';
            availabilityMsgDiv.className = 'loading';
            availabilityMsgDiv.style.display = 'block';
        }
        // Check in background (non-blocking)
        checkAvailabilityInBackground(room, ci, co);
    }
    
    // Show payment section if user details are filled AND we have availability confirmation
    if (areUserDetailsFilled() && lastAvailabilityResult && lastAvailabilityResult.available) {
        if (paymentSection && paymentSection.style.display !== 'block') {
            paymentSection.style.display = 'block';
            if (typeof generateQRCode === 'function') generateQRCode();
        }
    } else if (!areUserDetailsFilled()) {
        if (paymentSection) paymentSection.style.display = 'none';
    }
}

function resetBookingForm() {
    document.getElementById('mia-confirm-box')?.setAttribute('style', 'display: none');
    document.getElementById('mia-price-box')?.setAttribute('style', 'display: none');
    document.getElementById('mia-payment-section')?.setAttribute('style', 'display: none');
    
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
    lastAvailabilityResult = null;
    availabilityCache.clear(); // Clear cache on reset
    
    updateAvailabilityAndUI();
}

// ================================================================
// RENDER FUNCTIONS
// ================================================================

function getField(p, field, lang) {
    if (lang === 'vn' && p.vn && p.vn[field] !== undefined) return p.vn[field];
    return p[field];
}

function renderProperties() {
    const grid = document.getElementById('properties-grid');
    if (!grid) return;
    
    let lang = window.currentLang;
    if (!lang) {
        try {
            lang = localStorage.getItem('mia_lang') || 'en';
        } catch(e) {
            lang = 'en';
        }
    }
    
    const hanoiPrice = (typeof PRICES !== 'undefined' && PRICES['hanoi-spring']) ? PRICES['hanoi-spring'] : 750000;
    const oldquarterPrice = (typeof PRICES !== 'undefined' && PRICES.oldquarter) ? PRICES.oldquarter : 1200000;
    
    const properties = [
        {
            id: 'hanoi',
            name: lang === 'vn' ? 'MiaCasa Hà Nội' : 'MiaCasa Hanoi',
            badge: lang === 'vn' ? 'Phòng có bếp nhỏ' : 'Rooms with Kitchenette',
            location: lang === 'vn' ? '92 Ngõ 51 Ng. Linh Quang, Văn Chương' : '92 Ngh. 51 Ng. Linh Quang, Văn Chương',
            desc: lang === 'vn' ? '3 phòng riêng gần Phố Tàu & Văn Miếu' : '3 private rooms near Train Street & Văn Miếu',
            price: hanoiPrice,
            maxGuests: 8,
            rating: '4.9',
            roomsLabel: lang === 'vn' ? 'Phòng' : 'Rooms',
            guestsLabel: lang === 'vn' ? 'Khách' : 'Guests',
            ratingLabel: lang === 'vn' ? 'Đánh giá' : 'Rating',
            saveLabel: lang === 'vn' ? 'Tiết kiệm 15%' : 'Save 15%',
            exploreBtn: lang === 'vn' ? 'Khám phá →' : 'Explore →',
            bookBtn: lang === 'vn' ? 'Đặt ngay →' : 'Book Now →',
            link: 'miacasa-hanoi.html',
            img: 'https://res.cloudinary.com/dczfocztf/image/upload/c_scale,w_600,f_auto,q_60/v1775638632/DSC_6634_pwmg8r.jpg'
        },
        {
            id: 'oldquarter',
            name: lang === 'vn' ? 'MiaCasa Phố Cổ' : 'MiaCasa Old Quarter',
            badge: lang === 'vn' ? 'Toàn bộ căn hộ' : 'Whole Apartment',
            location: '38 P. Lương Ngọc Quyến, Hoàn Kiếm',
            desc: lang === 'vn' ? 'Toàn bộ căn hộ giữa lòng Phố Cổ' : 'Full apartment in the heart of Old Quarter',
            price: oldquarterPrice,
            maxGuests: 6,
            rating: '4.8',
            roomsLabel: lang === 'vn' ? 'Phòng' : 'Rooms',
            guestsLabel: lang === 'vn' ? 'Khách' : 'Guests',
            ratingLabel: lang === 'vn' ? 'Đánh giá' : 'Rating',
            saveLabel: lang === 'vn' ? 'Tiết kiệm 15%' : 'Save 15%',
            exploreBtn: lang === 'vn' ? 'Khám phá →' : 'Explore →',
            bookBtn: lang === 'vn' ? 'Đặt ngay →' : 'Book Now →',
            link: 'miacasa-oldquarter.html',
            img: 'https://res.cloudinary.com/dczfocztf/image/upload/c_scale,w_600,f_auto,q_60/v1775735576/att.dQ-7EPkykJ12fIQMeB_uBO8MXd0D5gsS8gmaVrRL7Rg_e86yd8.jpg'
        }
    ];
    
    grid.innerHTML = properties.map(prop => `
        <div class="property-card">
            <div class="property-img">
                <img src="${prop.img}" alt="${prop.name}" loading="lazy">
                <div class="property-badge">${prop.badge}</div>
            </div>
            <div class="property-body">
                <div class="property-name">${prop.name}</div>
                <div class="property-loc">📍 ${prop.location}</div>
                <p class="property-desc">${prop.desc}</p>
                <div class="property-meta">
                    <div class="meta-item"><span class="meta-num">3</span><span class="meta-lbl">${prop.roomsLabel}</span></div>
                    <div class="meta-item"><span class="meta-num">1–${prop.maxGuests}</span><span class="meta-lbl">${prop.guestsLabel}</span></div>
                    <div class="meta-item"><span class="meta-num">${prop.rating}★</span><span class="meta-lbl">${prop.ratingLabel}</span></div>
                </div>
                <div class="price-prominent">
                    <span class="currency">${lang === 'vn' ? 'từ' : 'from'}</span>
                    <span class="amount">${prop.price.toLocaleString()}₫</span>
                    <span class="night">/${lang === 'vn' ? 'đêm' : 'night'}</span>
                    <span class="price-save-badge">${prop.saveLabel}</span>
                </div>
                <div class="property-buttons">
                    <a href="${prop.link}" class="btn-outline">${prop.exploreBtn}</a>
                    <a href="javascript:void(0)" class="btn-primary" onclick="selectAndScroll('${prop.id}'); return false;">${prop.bookBtn}</a>
                </div>
            </div>
        </div>
    `).join('');
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
        btn.innerHTML = `<span class="pbn">${p.name}</span><span class="pbs">${badge} · ${p.rating}★</span>`;
        sel.appendChild(btn);
    });
}

// ================================================================
// CORE FUNCTIONS
// ================================================================

function selectProp(id) {
    activeProp = id;
    document.querySelectorAll('.prop-select-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('bsb-' + id);
    if (activeBtn) activeBtn.classList.add('active');
    
    const p = PROPERTIES.find(x => x.id === id);
    const lang = window.currentLang || 'en';
    const rooms = getField(p, 'rooms', lang);
    const roomSelect = document.getElementById('room-type-sel');
    if (roomSelect) roomSelect.innerHTML = rooms.map(r => `<option>${r}</option>`).join('');
    
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
    // Select the property
    selectProp(id);
    
    // Scroll to booking section after a short delay
    setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 150);
    
    // Always return false to prevent link jump
    return false;
}

// ================================================================
// PAYMENT & BOOKING FUNCTIONS
// ================================================================

function selectPayTab(type) {
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
    } else {
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
        bookingId: currentBookingId, property: propName, room: room,
        checkIn: ci, checkOut: co, guests: guests, nights: result?.nights || 0,
        amount: result?.total || 0, guestName, guestEmail, guestPhone,
        bookedAt: new Date().toISOString(), paymentMethod: selectedPayTab, paymentStatus: 'pending'
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
            detailsEl.innerHTML = `<div><strong>Property:</strong> ${data.property}</div><div><strong>Room:</strong> ${data.room}</div><div><strong>Check-in:</strong> ${fmtDateVN(data.checkIn)}</div><div><strong>Check-out:</strong> ${fmtDateVN(data.checkOut)}</div><div><strong>Guests:</strong> ${data.guests}</div><div><strong>Total:</strong> ${fmtVND(data.amount)} (~${fmtUSD(data.amount)})</div>`;
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
        const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
    } catch (err) {
        return { status: 'error', message: err.toString() };
    }
}

async function processPayPal() {
    const err = validateBookingForm();
    if (err) { showPayError(err); return; }
    if (!currentBookingId) { showPayError('Booking ID not generated yet. Please select dates first.'); return; }

    const data = collectBookingData();
    const payload = {
        ...data,
        action: 'createBooking',
        paymentMethod: 'paypal',
        paymentStatus: 'pending',
        language: window.currentLang || 'en',
        bookedAt: new Date().toISOString()
    };

    try {
        const res = await callSheetsAPI(payload);
        if (res.status !== 'ok') throw new Error(res.message || 'Failed to save booking');
        const amountUSD = (data.amount / 25000).toFixed(2);
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=miacasahanoi@gmail.com&amount=${amountUSD}&currency_code=USD&item_name=MiaCasa%20Booking%20${currentBookingId}&invoice=${currentBookingId}`;
        window.open(paypalLink, '_blank');
        alert('Booking saved! Please complete payment on PayPal.');
    } catch (error) {
        showPayError(error.message);
    }
}

async function confirmVietQR() {
    const err = validateBookingForm();
    if (err) { showPayError(err); return; }
    if (!currentBookingId) { showPayError('Booking ID not generated yet. Please select dates first.'); return; }

    const data = collectBookingData();
    const payload = {
        ...data,
        action: 'createBooking',
        paymentMethod: 'vietqr',
        paymentStatus: 'pending',
        language: window.currentLang || 'en',
        bookedAt: new Date().toISOString()
    };

    try {
        const res = await callSheetsAPI(payload);
        if (res.status !== 'ok') throw new Error(res.message || 'Failed to save booking');
    } catch (error) {
        showPayError('Could not save booking: ' + error.message + '. Please try again or contact us on WhatsApp.');
        return;
    }

    saveBookingToLocal(data);
    showBookingConfirmation(data);
}

// ================================================================
// INITIALIZATION
// ================================================================

function initializeProperties() {
    if (document.getElementById('properties-grid')) {
        renderProperties();
        renderBookingSelector();
        selectProp(PROPERTIES[0].id);
        setMinDates();
        updateGuestOptions();
        updateAvailabilityAndUI();
    }
}

function setupPaymentEventListeners() {
    const paypalTab = document.getElementById('pay-tab-paypal');
    const vietqrTab = document.getElementById('pay-tab-vietqr');
    const paypalPayBtn = document.getElementById('paypal-pay-btn');
    const vietqrConfirmBtn = document.getElementById('vietqr-confirm-btn');
    
    if (paypalTab) paypalTab.onclick = () => selectPayTab('paypal');
    if (vietqrTab) vietqrTab.onclick = () => selectPayTab('vietqr');
    if (paypalPayBtn) paypalPayBtn.onclick = () => processPayPal();
    if (vietqrConfirmBtn) vietqrConfirmBtn.onclick = () => confirmVietQR();
}

// Auto-show payment when guest details are filled (non-blocking)
function setupAutoPayment() {
    const inputs = ['guest-name', 'guest-email', 'guest-phone-number', 'checkin', 'checkout', 'room-type-sel', 'guests-sel'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Use debounced version to prevent rapid calls
            el.addEventListener('change', () => debouncedUpdateAvailability());
            el.addEventListener('input', () => debouncedUpdateAvailability());
            el.addEventListener('keyup', () => debouncedUpdateAvailability());
        }
    });
}

// Start everything
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeProperties();
        setupPaymentEventListeners();
        setupAutoPayment();
    });
} else {
    initializeProperties();
    setupPaymentEventListeners();
    setupAutoPayment();
}

// Make functions available globally
window.renderProperties = renderProperties;
window.renderBookingSelector = renderBookingSelector;
window.selectProp = selectProp;
window.selectAndScroll = selectAndScroll;
window.updateAvailabilityAndUI = updateAvailabilityAndUI;
window.updateGuestOptions = updateGuestOptions;
window.resetBookingForm = resetBookingForm;
window.selectPayTab = selectPayTab;
window.generateQRCode = generateQRCode;
window.processPayPal = processPayPal;
window.confirmVietQR = confirmVietQR;