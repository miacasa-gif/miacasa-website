# MiaCasa Homestay Website

Official website for **MiaCasa Homestay (Hanoi, Vietnam)**
Built to support direct bookings, reduce platform commissions, and provide a seamless guest experience.

---

## 🌿 Overview

This website allows guests to:

* View rooms and properties
* Check availability and pricing
* Submit booking enquiries
* Contact the host directly via WhatsApp or email

It also includes a private **admin panel** for managing:

* Room availability (open/closed by date range)
* Price overrides
* Maintenance mode (to temporarily disable the site)

---

## 🚀 Key Features

### 🏡 Direct Booking Focus

* Prices are **10–15% cheaper** than Airbnb, Booking.com, Agoda
* No third-party commissions
* Flexible payment options (cash, bank transfer, PayPal)

### 🔧 Admin Panel

* Secure login system
* Manage room availability by date
* Set custom pricing for special dates
* Toggle **Maintenance Mode**

### 🛠 Maintenance Mode

* When enabled, the public website shows a maintenance page
* Controlled via admin panel
* Stored via backend config (API)

### 🌐 Bilingual Support

* English and Vietnamese
* Dynamic translation via JavaScript

---

## 📁 Project Structure

```
/
├── index.html          # Main website
├── admin.html          # Admin panel
├── maintenance.html    # Maintenance page
├── /api                # Backend endpoints (Netlify / serverless)
└── /assets             # Images, styles, fonts
```

---

## ⚙️ How It Works

### 1. Maintenance Mode

* Admin toggles maintenance ON/OFF
* Value stored via API (`getMaintenanceMode`, `setMaintenanceMode`)
* Frontend checks status on load
* If ON → redirects to `maintenance.html`

---

### 2. Room Availability

* Stored via API (`updateRoomStatus`)
* Supports date ranges
* Overrides default availability

---

### 3. Price Overrides

* Custom prices for specific dates
* Stored and fetched via API
* Automatically applied in booking calculations

---

## 🧪 Local Development

Since this is a static + API-based project:

1. Clone the repo
2. Open `index.html` in browser (for UI work)
3. Use a local server if needed:

```bash
npx serve .
```

4. Ensure API endpoints are configured correctly

---

## 🌍 Deployment

Recommended: **Netlify**

* Deploy as static site
* Use Netlify Functions for `/api`
* Configure redirects if needed

---

## 🔐 Security Notes

* Admin authentication uses token-based API
* Do NOT expose credentials in frontend
* Use environment variables for production

---

## 📞 Contact

**MiaCasa Homestay**
📧 [miacasahanoi@gmail.com](mailto:miacasahanoi@gmail.com)
📱 WhatsApp: +84 869 922 261

---

## ✨ Future Improvements

* Online payment integration
* Calendar sync (Airbnb, Booking.com)
* Analytics dashboard
* Better mobile UX

---

## 🧡 Philosophy

This website is designed to:

* Make our homestay **affordable and accessible for all travelers**
* Offer a **simple and transparent booking experience**
* Build a **direct and personal connection** with our guests
* Provide thoughtful stays that feel **warm, local, and genuine**

---

---
