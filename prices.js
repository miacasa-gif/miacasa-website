// Centralized Price Configuration
// Admin can update prices here and they will reflect site-wide

// Centralized Price Configuration
const PRICES = {
    // Base prices (per night)
    'hanoi-spring': 650000,
    'hanoi-summer': 650000,
    'hanoi-autumn': 650000,
    'hanoi-weekend': 700000,    // ADD THIS
    'hanoi-special': 800000,    // ADD THIS
    'oldquarter': 1000000,
    'oldquarter-weekend': 1250000,  // ADD THIS
    'oldquarter-special': 1300000,  // ADD THIS
    
    // Extra guest charges (per person per night beyond base)
    'extra-guest-hanoi': 100000,
    'extra-guest-oldquarter': 100000,
    
    // Discounts
    'weekly-discount': 10,
    'monthly-discount': 15,
    'direct-booking-savings': 15,
    
    // Platform comparison prices
    'airbnb-price-hanoi': 880000,
    'airbnb-price-oldquarter': 1410000,
    'booking-price-hanoi': 850000,
    'booking-price-oldquarter': 1380000
};

// Helper functions
function getPrice(property, roomType = null) {
  if (property === 'hanoi') {
    return PRICES['hanoi-spring']; // All Hanoi rooms same price
  }
  if (property === 'oldquarter') {
    return PRICES.oldquarter;
  }
  return 0;
}

function getExtraGuestCharge(property) {
  if (property === 'hanoi') return PRICES['extra-guest-hanoi'];
  if (property === 'oldquarter') return PRICES['extra-guest-oldquarter'];
  return 0;
}

function getFormattedPrice(property, roomType = null, lang = 'en') {
  const price = getPrice(property, roomType);
  const formatter = new Intl.NumberFormat(lang === 'vn' ? 'vi-VN' : 'en-US');
  return `${formatter.format(price)}₫`;
}

function getSavingsBadge(property, lang = 'en') {
  if (property === 'hanoi') {
    const airbnbPrice = PRICES['airbnb-price-hanoi'];
    const ourPrice = PRICES['hanoi-spring'];
    const saved = Math.round(((airbnbPrice - ourPrice) / airbnbPrice) * 100);
    return lang === 'vn' ? `Tiết kiệm ${saved}% so với Airbnb` : `Save ${saved}% vs Airbnb`;
  } else {
    const airbnbPrice = PRICES['airbnb-price-oldquarter'];
    const ourPrice = PRICES.oldquarter;
    const saved = Math.round(((airbnbPrice - ourPrice) / airbnbPrice) * 100);
    return lang === 'vn' ? `Tiết kiệm ${saved}% so với Airbnb` : `Save ${saved}% vs Airbnb`;
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRICES, getPrice, getFormattedPrice, getSavingsBadge, getExtraGuestCharge };
}
