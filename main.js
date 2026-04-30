// ================================================================
// MAIN.JS - Core functionality for public pages
// Depends on: lang.js (TRANSLATIONS, currentLang, setLang)
// ================================================================

// ================================================================
// NAVIGATION
// ================================================================

function toggleMenu() {
    const ul = document.querySelector('.nav-links');
    if (ul) {
        ul.classList.toggle('show');
    }
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPath === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// ================================================================
// BACK TO TOP BUTTON
// ================================================================

function initBackToTop() {
    // Check if button already exists
    if (document.querySelector('.back-to-top')) return;
    
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================================================================
// CALENDAR MODAL
// ================================================================

let activeModal = null;

function openCalendarModal(calendarUrl, title) {
    // Remove existing modal if any
    if (activeModal) {
        activeModal.remove();
        activeModal = null;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove(); activeModal = null;">×</button>
            <iframe src="${calendarUrl}" title="${title} Calendar"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    activeModal = modal;
    modal.style.display = 'flex';
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            activeModal = null;
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape' && activeModal) {
            activeModal.remove();
            activeModal = null;
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// ================================================================
// REVIEWS PAGINATION (Load More)
// ================================================================

// This will be populated by the reviews data from each page
window.reviewsData = window.reviewsData || [];
window.reviewsShown = window.reviewsShown || 6;
window.activeReviewFilter = window.activeReviewFilter || 'all';

function loadMoreReviews() {
    window.reviewsShown += 3;
    if (typeof renderReviews === 'function') {
        renderReviews();
    }
}

// ================================================================
// SCROLL REVEAL
// ================================================================

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08 });

function initScrollReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        scrollObserver.observe(el);
    });
}

// ================================================================
// CHATBOT FUNCTIONALITY
// ================================================================

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.toggle('open');
    }
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const message = input?.value.trim();
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        const reply = getChatbotReply(message);
        addChatMessage(reply, 'bot');
    }, 500);
}

function quickReply(message) {
    addChatMessage(message, 'user');
    setTimeout(() => {
        const reply = getChatbotReply(message);
        addChatMessage(reply, 'bot');
    }, 300);
}

function addChatMessage(message, type) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}`;
    msgDiv.textContent = message;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getChatbotReply(message) {
    const m = message.toLowerCase();
    
    // These will be populated by the booking.js or page-specific data
    if (window.chatbotResponses) {
        if (m.includes('price') || m.includes('cost') || m.includes('how much')) {
            return window.chatbotResponses.price();
        }
        if (m.includes('property') || m.includes('stay') || m.includes('room')) {
            return window.chatbotResponses.props();
        }
        if (m.includes('where') || m.includes('location') || m.includes('address')) {
            return window.chatbotResponses.locs();
        }
        if (m.includes('cancel') || m.includes('refund')) {
            return window.chatbotResponses.cancel();
        }
        if (m.includes('check')) {
            return window.chatbotResponses.checkin();
        }
        if (m.includes('wifi') || m.includes('internet')) {
            return window.chatbotResponses.wifi();
        }
        if (m.includes('book')) {
            return window.chatbotResponses.book();
        }
    }
    
    const lang = window.currentLang || 'en';
    if (lang === 'vn') {
        return 'Cảm ơn! Liên hệ qua miacasahanoi@gmail.com hoặc biểu mẫu Liên hệ. Chúng tôi trả lời trong vòng 2 giờ! 🌿';
    }
    return 'Thanks! Reach us at miacasahanoi@gmail.com or use the Contact form. We reply within 2 hours! 🌿';
}

// ================================================================
// CONTACT FORM - WhatsApp
// ================================================================

function sendWhatsApp() {
    const name = document.getElementById('contact-name')?.value?.trim() || '';
    const email = document.getElementById('contact-email')?.value?.trim() || '';
    const prop = document.getElementById('contact-prop-sel')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || '';
    const message = document.getElementById('contact-message')?.value?.trim() || '';
    
    if (!name || !message) {
        alert(currentLang === 'vn' ? 'Vui lòng điền tên và tin nhắn.' : 'Please fill in your name and message.');
        return;
    }
    
    const text = `Hi MiaCasa! 👋\n\n*Name:* ${name}\n*Email:* ${email || 'not provided'}\n*Property:* ${prop}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    const url = 'https://wa.me/84869922261?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
    
    const confirmMsg = document.getElementById('contact-confirm');
    if (confirmMsg) {
        confirmMsg.style.display = 'block';
        setTimeout(() => {
            confirmMsg.style.display = 'none';
        }, 3000);
    }
}

// ================================================================
// MAINTENANCE MODE CHECK
// ================================================================

async function checkMaintenanceMode() {
  try {
    const res = await fetch('/api/log-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getMaintenanceMode' })
    });
    const json = await res.json();
    if (json.value === 'on') {
      window.location.href = '/maintenance.html';
    }
  } catch (e) {
  }
}


// ================================================================
// POPULATE CONTACT FORM DROPDOWNS
// ================================================================

function populateContactDropdowns() {
    // Populate property dropdown in contact form
    const propSelect = document.getElementById('contact-prop-sel');
    if (propSelect && propSelect.options.length <= 1) {
        const lang = window.currentLang || 'en';
        const properties = [
            { value: 'MiaCasa Hanoi', textEn: 'MiaCasa Hanoi (Near Train Street)', textVn: 'MiaCasa Hà Nội (Gần Phố Tàu)' },
            { value: 'MiaCasa Old Quarter', textEn: 'MiaCasa Old Quarter (Hoan Kiem)', textVn: 'MiaCasa Phố Cổ (Hoàn Kiếm)' },
            { value: 'Not sure yet', textEn: 'Not sure yet', textVn: 'Chưa chắc chắn' }
        ];
        
        // Clear existing options (keep first if it's a placeholder)
        propSelect.innerHTML = '';
        
        // Add options
        properties.forEach(prop => {
            const option = document.createElement('option');
            option.value = prop.value;
            option.textContent = lang === 'vn' ? prop.textVn : prop.textEn;
            propSelect.appendChild(option);
        });
    }
    
    // Populate booking room dropdown if it exists and is empty
    const roomSelect = document.getElementById('room-type-sel');
    if (roomSelect && roomSelect.options.length <= 1) {
        const lang = window.currentLang || 'en';
        const rooms = [
            { value: 'Spring Room', textEn: '🌸 Spring Room (MiaCasa Hanoi)', textVn: '🌸 Phòng Xuân (MiaCasa Hà Nội)' },
            { value: 'Summer Room', textEn: '☀️ Summer Room (MiaCasa Hanoi)', textVn: '☀️ Phòng Hạ (MiaCasa Hà Nội)' },
            { value: 'Autumn Room', textEn: '🍂 Autumn Room (MiaCasa Hanoi)', textVn: '🍂 Phòng Thu (MiaCasa Hà Nội)' },
            { value: 'Entire Apartment (3 king beds)', textEn: '🏠 Entire Old Quarter Apartment (up to 6 guests)', textVn: '🏠 Toàn bộ căn hộ Phố Cổ (tối đa 6 khách)' }
        ];
        
        roomSelect.innerHTML = '';
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room.value;
            option.textContent = lang === 'vn' ? room.textVn : room.textEn;
            roomSelect.appendChild(option);
        });
    }
    
    // Populate guests dropdown if it exists and is empty
    const guestsSelect = document.getElementById('guests-sel');
    if (guestsSelect && guestsSelect.options.length <= 1) {
        for (let i = 1; i <= 6; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i === 1 ? '1 guest' : `${i} guests`;
            guestsSelect.appendChild(option);
        }
    }
}


// Update dropdowns when language changes
function updateDropdownsOnLangChange() {
    const propSelect = document.getElementById('contact-prop-sel');
    const roomSelect = document.getElementById('room-type-sel');
    const lang = window.currentLang || 'en';
    
    // Update property dropdown
    if (propSelect) {
        const properties = [
            { value: 'MiaCasa Hanoi', textEn: 'MiaCasa Hanoi (Near Train Street)', textVn: 'MiaCasa Hà Nội (Gần Phố Tàu)' },
            { value: 'MiaCasa Old Quarter', textEn: 'MiaCasa Old Quarter (Hoan Kiem)', textVn: 'MiaCasa Phố Cổ (Hoàn Kiếm)' },
            { value: 'Not sure yet', textEn: 'Not sure yet', textVn: 'Chưa chắc chắn' }
        ];
        
        const currentValue = propSelect.value;
        propSelect.innerHTML = '';
        properties.forEach(prop => {
            const option = document.createElement('option');
            option.value = prop.value;
            option.textContent = lang === 'vn' ? prop.textVn : prop.textEn;
            propSelect.appendChild(option);
        });
        if (currentValue) propSelect.value = currentValue;
    }
    
    // Update room dropdown
    if (roomSelect && roomSelect.options.length > 0) {
        const rooms = [
            { value: 'Spring Room', textEn: '🌸 Spring Room (MiaCasa Hanoi)', textVn: '🌸 Phòng Xuân (MiaCasa Hà Nội)' },
            { value: 'Summer Room', textEn: '☀️ Summer Room (MiaCasa Hanoi)', textVn: '☀️ Phòng Hạ (MiaCasa Hà Nội)' },
            { value: 'Autumn Room', textEn: '🍂 Autumn Room (MiaCasa Hanoi)', textVn: '🍂 Phòng Thu (MiaCasa Hà Nội)' },
            { value: 'Entire Apartment (3 king beds)', textEn: '🏠 Entire Old Quarter Apartment (up to 6 guests)', textVn: '🏠 Toàn bộ căn hộ Phố Cổ (tối đa 6 khách)' }
        ];
        
        const currentValue = roomSelect.value;
        roomSelect.innerHTML = '';
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room.value;
            option.textContent = lang === 'vn' ? room.textVn : room.textEn;
            roomSelect.appendChild(option);
        });
        if (currentValue) roomSelect.value = currentValue;
    }
}

// Register language change hook
if (typeof registerTranslationHook === 'function') {
    registerTranslationHook(updateDropdownsOnLangChange);
}

// ================================================================
// INITIALIZATION
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initBackToTop();
    initScrollReveal();
    checkMaintenanceMode();
    
    // Populate contact form dropdowns
    populateContactDropdowns();
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links')?.classList.remove('show');
        });
    });
    
    // Close mobile menu on window resize (if screen becomes large)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            document.querySelector('.nav-links')?.classList.remove('show');
        }
    });
    
    // Enter key for chat input
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChat();
        });
    }
});

// Register translation hook for dynamic content
if (typeof registerTranslationHook === 'function') {
    registerTranslationHook(function(lang) {
        // Update any dynamic elements that need translation
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.setAttribute('aria-label', lang === 'vn' ? 'Lên đầu trang' : 'Back to top');
        }
    });
}

// Mobile navigation toggle
function toggleMobileNav() {
  const menu = document.getElementById('mobileNavMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
  const fabNav = document.querySelector('.fab-nav');
  const menu = document.getElementById('mobileNavMenu');
  if (fabNav && menu && !fabNav.contains(event.target) && menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('.section-nav a, .fab-nav-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileNavMenu');
        if (mobileMenu) mobileMenu.classList.remove('show');
        
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Scroll spy - highlight active section in nav
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.section-nav a, .fab-nav-menu a');
  
  let current = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth scroll for navigation links
document.querySelectorAll('.section-nav a, .fab-nav-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        const mobileMenu = document.getElementById('mobileNavMenu');
        if (mobileMenu) mobileMenu.classList.remove('show');
        
        const targetPosition = target.offsetTop - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Mobile navigation toggle
function toggleMobileNav() {
  const menu = document.getElementById('mobileNavMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
  const fabNav = document.querySelector('.fab-nav');
  const menu = document.getElementById('mobileNavMenu');
  if (fabNav && menu && !fabNav.contains(event.target) && menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});

// Scroll spy - highlight active section
function updateActiveNav() {
  const sections = document.querySelectorAll('.nav-anchor');
  const navLinks = document.querySelectorAll('.section-nav a, .fab-nav-menu a');
  
  let current = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + 100;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);