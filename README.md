# MiaCasa Website

Official website for MiaCasa Homestays in Hanoi, Vietnam.

Live site: https://miacasa.netlify.app

---

## About

MiaCasa is a boutique homestay brand in Hanoi focused on calm, local, design conscious stays for travelers seeking a more personal experience than traditional hotels.

The website includes:

* Property pages
* Direct booking system
* Travel blog
* Bilingual English/Vietnamese support
* Booking management utilities
* SEO optimized travel guides

Properties:

* MiaCasa Hanoi
* MiaCasa Old Quarter

---

# Features

## Hospitality & Booking

* Direct booking flow
* PayPal integration
* VietQR payment support
* Availability checking
* Booking invoice generation
* Booking cancellation flow
* WhatsApp inquiry integration
* Mobile optimized booking UX

## Content & SEO

* Travel blog articles
* Structured data (JSON-LD)
* Open Graph metadata
* Canonical URLs
* Sitemap.xml
* Google Search Console verification
* Long form SEO content targeting Hanoi travel searches

## User Experience

* Responsive mobile first design
* Bilingual EN/VN support
* Language persistence with localStorage
* Sticky mobile booking CTA
* Smooth scroll reveal animations
* Floating navigation controls

## Design System

* Boutique hospitality inspired branding
* Cormorant + Jost typography pairing
* Terracotta and cream color palette
* Soft editorial style layouts
* Custom room and property galleries

---

# Pages

## Main Pages

* `/`
* `/miacasa-hanoi`
* `/miacasa-oldquarter`
* `/our-story`
* `/blog`

## Blog Articles

* `/best-cafes-hanoi`
* `/blog-hanoi-3-days`
* `/blog-train-street`
* `/blog-where-to-stay`

## Booking Utilities

* `/invoice`
* `/cancel-booking`

---

# Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* Netlify Hosting
* Google Sheets API
* PayPal Checkout
* VietQR Integration

No frontend framework is currently used.

---

# SEO Features

* BlogPosting schema
* LodgingBusiness schema
* FAQPage schema
* Open Graph tags
* Twitter card support
* Canonical URLs
* XML sitemap
* Optimized internal linking

---

# Localization

The website supports:

* English
* Vietnamese

Translations are managed via:

* `lang.js`

Language preference is stored using:

* `localStorage`

---

# Repository Structure

```bash
/
├── index.html
├── miacasa-hanoi.html
├── miacasa-oldquarter.html
├── our-story.html
├── blog.html
├── style.css
├── lang.js
├── script.js
├── sitemap.xml
├── robots.txt
└── assets/
```

---

# Future Improvements

Planned improvements include:

* Custom domain migration
* Breadcrumb schema
* Expanded review system
* Enhanced room comparison UX
* Performance optimization
* Reduced inline styling
* Improved booking confirmations
* Additional Hanoi travel guides

---

# Development

To run locally:

```bash
git clone https://github.com/miacasa-homestays/miacasa-website.git
cd miacasa-website
```

Open:

```bash
index.html
```

with a local development server.

Example:

```bash
python -m http.server 8000
```

---

# Brand Positioning

MiaCasa focuses on:

* calm boutique hospitality
* local Hanoi experiences
* café culture
* slow travel
* thoughtful design
* direct human connection

The goal is to create a stay experience that feels warm, personal, and authentically local.

---

# License

All content, branding, photography, and design assets are property of MiaCasa unless otherwise stated.

Unauthorized commercial reuse is prohibited.
