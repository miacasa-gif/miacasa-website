// ================================================================
// CALENDAR.JS - Calendar management with language support
// Updated to use Google Script for iCal feeds
// ================================================================

/* const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlgyCXc-S80tKtUgoX_8ZxnSRZl3rlCGoyaswB5NbK5cSqaoApZsHH8mg72Vmnok1pFA/exec'; */
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
const ROOM_CALS = [
    {
        id: 'spring',
        name: 'Spring Room',
        name_vn: 'Phòng Xuân',
        property: 'MiaCasaHanoi',
        embedSrc: '87a5f7749b35560f564c62ec0ee8cf00101a6e331907f34effbd803846638607%40group.calendar.google.com',
        icalLinks: [
            { platform: 'Google', platform_vn: 'Google', url: `https://calendar.google.com/calendar/ical/87a5f7749b35560f564c62ec0ee8cf00101a6e331907f34effbd803846638607%40group.calendar.google.com/public/basic.ics` },
            { platform: 'Airbnb', platform_vn: 'Airbnb', url: `https://www.airbnb.co.in/calendar/ical/1368525470549843347.ics?t=ab8805eed77f47349e0a8b4bc253ed31` },
            { platform: 'Booking', platform_vn: 'Booking', url: `https://ical.booking.com/v1/export/t/e655bb8a-06ee-4c83-afba-de8d58d9acda.ics` },
            { platform: 'MiaCasa', platform_vn: 'MiaCasa', isDynamic: true, roomId: 'Spring Room' }
        ]
    },
    {
        id: 'summer',
        name: 'Summer Room',
        name_vn: 'Phòng Hạ',
        property: 'MiaCasaHanoi',
        embedSrc: '26d50548c42e4b8e731240566110420643aa4bce48233af14e62233a888438c0%40group.calendar.google.com',
        icalLinks: [
            { platform: 'Google', platform_vn: 'Google', url: `https://calendar.google.com/calendar/ical/26d50548c42e4b8e731240566110420643aa4bce48233af14e62233a888438c0%40group.calendar.google.com/public/basic.ics` },
            { platform: 'Airbnb', platform_vn: 'Airbnb', url: `https://www.airbnb.co.in/calendar/ical/1150577368273097590.ics?t=74f453c9face42b39955c6b180edbb13` },
            { platform: 'Booking', platform_vn: 'Booking', url: `https://ical.booking.com/v1/export/t/4b9f52e0-6940-4e88-9a46-edc2f0cc8edb.ics` },
            { platform: 'MiaCasa', platform_vn: 'MiaCasa', isDynamic: true, roomId: 'Summer Room' }
        ]
    },
    {
        id: 'autumn',
        name: 'Autumn Room',
        name_vn: 'Phòng Thu',
        property: 'MiaCasaHanoi',
        embedSrc: 'b7be4b233604c94b69c4a7f95e13e61e9bac756c20b255d402d817071481ff24%40group.calendar.google.com',
        icalLinks: [
            { platform: 'Google', platform_vn: 'Google', url: `https://calendar.google.com/calendar/ical/b7be4b233604c94b69c4a7f95e13e61e9bac756c20b255d402d817071481ff24%40group.calendar.google.com/public/basic.ics` },
            { platform: 'Airbnb', platform_vn: 'Airbnb', url: `https://www.airbnb.co.in/calendar/ical/1149901131702910023.ics?t=ac0829aecf2b49479aa6006fee841048` },
            { platform: 'Booking', platform_vn: 'Booking', url: `https://ical.booking.com/v1/export/t/a9e95444-5fd3-49ee-b0a0-15e2a3f82af9.ics` },
            { platform: 'MiaCasa', platform_vn: 'MiaCasa', isDynamic: true, roomId: 'Autumn Room' }
        ]
    },
    {
        id: 'oldquarter',
        name: 'MiaCasa Old Quarter',
        name_vn: 'MiaCasa Phố Cổ',
        property: 'MiaCasaOldQuarter',
        embedSrc: '81d1ef063261354d380e1f80b38325d413a118e15b1819b9b8aff47fa1069f79%40group.calendar.google.com',
        icalLinks: [
            { platform: 'Google', platform_vn: 'Google', url: `https://calendar.google.com/calendar/ical/81d1ef063261354d380e1f80b38325d413a118e15b1819b9b8aff47fa1069f79%40group.calendar.google.com/public/basic.ics` },
            { platform: 'Airbnb', platform_vn: 'Airbnb', url: `https://www.airbnb.co.in/calendar/ical/1444661721704448383.ics?t=cce83927bc29402eb49e1b816d4293bb` },
            { platform: 'Booking', platform_vn: 'Booking', url: `https://ical.booking.com/v1/export/t/eb318a0d-65ba-45e8-b3e0-53d59c08b135.ics` },
            { platform: 'MiaCasa', platform_vn: 'MiaCasa', isDynamic: true, roomId: 'Entire Apartment (3 king beds)' }
        ]
    }
];

function initCalendars() {
    console.log('initCalendars called');
    
    const calTabsCont = document.getElementById('cal-tabs');
    const calFramesCont = document.getElementById('cal-frames');
    
    if (!calTabsCont || !calFramesCont) {
        console.log('Calendar containers not found');
        return;
    }
    
    // Get language from localStorage
    const currentLang = localStorage.getItem('mia_lang') || 'en';
    console.log('Current language for calendars:', currentLang);
    
    calTabsCont.innerHTML = '';
    calFramesCont.innerHTML = '';
    
    ROOM_CALS.forEach((room, index) => {
        // Choose name based on language
        const roomName = currentLang === 'vn' ? room.name_vn : room.name;
        
        // Tab button
        const tab = document.createElement('button');
        tab.className = 'cal-tab' + (index === 0 ? ' active' : '');
        tab.textContent = roomName;
        tab.onclick = () => switchCalendar(room.id, tab);
        calTabsCont.appendChild(tab);
        
        // Calendar panel
        const panel = document.createElement('div');
        panel.className = 'cal-frame-wrap' + (index === 0 ? ' active' : '');
        panel.id = 'cal-' + room.id;
        
        const googleCalUrl = `https://calendar.google.com/calendar/embed?src=${room.embedSrc}&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&bgcolor=%23ffffff&color=%23c17a5a&hl=${currentLang === 'vn' ? 'vi' : 'en'}`;
        
        // Set text based on language
        let viewText, descText, openText, subscribeText, availabilityText;
        
        if (currentLang === 'vn') {
            viewText = `Xem lịch ${roomName}`;
            descText = 'Mở lịch trong cửa sổ mới — đồng bộ thời gian thực';
            openText = 'Mở lịch →';
            subscribeText = 'Đăng ký / đồng bộ với ứng dụng lịch của bạn';
            availabilityText = 'Lịch trống theo thời gian thực';
        } else {
            viewText = `View ${roomName} Calendar`;
            descText = 'Opens calendar in modal — live availability synced in real time';
            openText = 'Open Calendar →';
            subscribeText = 'Subscribe / sync with your calendar app';
            availabilityText = 'Live availability';
        }
        
        // Build iCal links - including dynamic MiaCasa feed from Google Script
        const icalLinksHtml = (room.icalLinks || []).map(link => {
            let url = link.url;
            let platformName = currentLang === 'vn' ? (link.platform_vn || link.platform) : link.platform;
            
            // For dynamic MiaCasa feed from Google Script
            if (link.isDynamic && link.roomId) {
                // Encode room name for URL
                const encodedRoom = encodeURIComponent(link.roomId);
                url = `${GOOGLE_SCRIPT_URL}?action=getIcal&room=${encodedRoom}`;
                platformName = currentLang === 'vn' ? 'Lịch MiaCasa' : 'MiaCasa iCal';
            }
            
            return `<a href="${url}" target="_blank" rel="noopener" 
                       style="display:inline-flex;align-items:center;gap:6px;padding:0.35rem 0.85rem;border:1px solid var(--border);border-radius:2px;font-size:0.72rem;color:var(--ink-light);text-decoration:none;transition:all 0.2s;"
                       onmouseover="this.style.borderColor='var(--terracotta)';this.style.color='var(--terracotta)'"
                       onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-light)'">
                        ${platformName} ${currentLang === 'vn' ? '↓' : '↓'}
                    </a>`;
        }).join('');
        
        panel.innerHTML = `
            <div class="cal-frame-header">
                <span class="cal-frame-title">${roomName}</span>
                <span class="cal-frame-sub">${room.property} · ${availabilityText}</span>
            </div>
            <div style="padding:1.5rem;background:white;">
                <button onclick="openCalendarModal('${googleCalUrl}', '${roomName.replace(/'/g, "\\'")}')" 
                        style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;padding:1.25rem 1.5rem;background:var(--sand);border:1px solid var(--border);border-radius:4px;text-decoration:none;margin-bottom:1.5rem;transition:box-shadow 0.2s;width:100%;cursor:pointer;">
                    <div style="text-align:left;">
                        <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:var(--ink);margin-bottom:3px;">${viewText}</div>
                        <div style="font-size:0.78rem;color:var(--ink-light);">${descText}</div>
                    </div>
                    <div style="background:var(--terracotta);color:white;padding:0.55rem 1.2rem;border-radius:2px;font-size:0.78rem;font-weight:500;letter-spacing:0.06em;white-space:nowrap;">${openText}</div>
                </button>
                ${icalLinksHtml ? `<div style="margin-bottom:0.75rem;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-light);">${subscribeText}</div>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${icalLinksHtml}</div>` : ''}
            </div>
        `;
        calFramesCont.appendChild(panel);
    });
}

function switchCalendar(id, activeTab) {
    document.querySelectorAll('.cal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cal-frame-wrap').forEach(f => f.classList.remove('active'));
    activeTab.classList.add('active');
    const target = document.getElementById('cal-' + id);
    if (target) target.classList.add('active');
}

// Function to refresh calendars when language changes
function refreshCalendars() {
    console.log('Refreshing calendars due to language change');
    initCalendars();
}

// Listen for language change events
window.addEventListener('languageChanged', function(e) {
    console.log('languageChanged event received:', e.detail);
    setTimeout(refreshCalendars, 100);
});

// Also listen for storage events (in case language changes in another tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'mia_lang') {
        console.log('Storage event - language changed to:', e.newValue);
        setTimeout(refreshCalendars, 100);
    }
});

console.log('calendar.js loaded');