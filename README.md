# MiaCasa Homestays Website

A fast, multilingual boutique homestay website for [MiaCasa Hanoi](https://miacasahanoi.com) built with vanilla HTML, CSS, and JavaScript.

The project focuses on:

* Direct bookings without OTA commissions
* Dynamic room pricing and admin controlled overrides
* Multilingual support (English / Vietnamese)
* SEO optimized travel content
* Mobile first responsive design
* Lightweight performance focused architecture
* Google Sheets powered booking management

---

## Live Website

* Production: [miacasahanoi.com](https://miacasahanoi.com?utm_source=chatgpt.com)
* Legacy Netlify URL: [miacasa.netlify.app](https://miacasa.netlify.app?utm_source=chatgpt.com)

---

## Features

### Property Booking System

* Multiple properties:

  * MiaCasa Hanoi
  * MiaCasa Old Quarter
* Room selection
* Dynamic nightly pricing
* Seasonal and weekend rates
* Admin controlled price overrides
* Booking total calculation
* Extra guest pricing
* Booking ID generation
* Availability checking

### Admin Features

* Google Sheets integration
* Price override management
* Booking logging
* Recurring pricing rules
* Admin dashboard

### SEO & Content

* SEO optimized blog system
* Structured travel guides
* Multilingual blog support
* Internal linking strategy
* Open Graph metadata
* Mobile optimized layouts

### UI / UX

* Fully responsive
* Language toggle
* Sticky booking CTA
* Optimized mobile experience
* Lightweight animations
* Performance optimized images

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend / Services

* Google Apps Script
* Google Sheets
* Netlify Hosting
* Cloudinary Image CDN

### Infrastructure

* Netlify deployment
* Porkbun DNS
* Cloudinary media hosting

---

## Project Structure

```bash
/
├── index.html
├── old-quarter.html
├── miacasa-hanoi.html
├── blog.html
├── css/
│   ├── style.css
│   └── blog.css
├── js/
│   ├── booking.js
│   ├── prices.js
│   ├── main.js
│   └── translations.js
├── api/
│   └── log-booking
├── images/
└── README.md
```

---

## Dynamic Pricing Logic

The booking system supports:

* Base weekday pricing
* Weekend pricing
* Special event pricing
* Admin override pricing
* Recurring weekday/month pricing rules

### Pricing Priority

```text
Price Override
↓
Special Day Rate
↓
Weekend Rate
↓
Default Weekday Rate
```

Overrides are fetched from Google Sheets and become the single source of truth across:

* Booking engine
* Property cards
* Compare sections
* Price estimate widgets

---

## Language System

The website supports:

* English
* Vietnamese

Language switching is handled using:

```html
.en-only
.vn-only
```

and:

```javascript
document.documentElement.setAttribute("data-lang", lang);
```

---

## Performance

### Current Lighthouse Scores

#### Desktop

* Performance: 100
* LCP: ~0.6s
* CLS: 0.014

#### Mobile

* Performance: ~90+
* LCP: ~3.8s on Slow 4G
* CLS: 0.012

Optimizations include:

* WebP image delivery
* Lazy loading
* Minimal JavaScript
* Optimized CSS
* Cloudinary CDN
* Responsive images

---

## Deployment

### Netlify

The site is deployed on Netlify.

### Custom Domain Setup

Domain managed via Porkbun.

DNS configuration:

```text
ALIAS @ → apex-loadbalancer.netlify.com
CNAME www → your-site.netlify.app
```

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/miacasa-homestays/miacasa-website.git
```

Open locally:

```bash
cd miacasa-website
```

Then launch with any static server:

```bash
python -m http.server
```

or use VS Code Live Server.

---

## Environment / Integrations

The project integrates with:

* Google Apps Script endpoints
* Google Sheets
* Cloudinary image hosting

Make sure API endpoints are configured correctly before deployment.

---

## Future Improvements

* Online payments
* Real time availability sync
* Full CMS integration
* AI powered travel recommendations
* Enhanced analytics dashboard
* Multi currency support

---

## License

Private project for MiaCasa Homestays.

All rights reserved.

---

## Author

Built for [MiaCasa Homestays](https://miacasahanoi.com?utm_source=chatgpt.com) in Hanoi.
