// ================================================================
// INVOICE.JS - Invoice generation functionality
// ================================================================

// ================================================================
// Use global Google Script URL from config.js
// ================================================================
const INVOICE_API_URL = '/api/log-booking';

function showInvoiceStatus(id, msg) {
  ['inv-loading', 'inv-success', 'inv-fail'].forEach(function(x) {
    var el = document.getElementById(x);
    if (el) {
      el.style.display = 'none';
      el.textContent = '';
    }
  });
  var el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

async function requestInvoice() {
  var bookingId = document.getElementById('inv-booking-id').value.trim().toUpperCase();
  var email = document.getElementById('inv-email').value.trim().toLowerCase();
  var errBid = document.getElementById('err-booking-id');
  var errEm = document.getElementById('err-email');

  // Reset errors
  if (errBid) errBid.style.display = 'none';
  if (errEm) errEm.style.display = 'none';
  document.getElementById('inv-booking-id')?.classList.remove('error');
  document.getElementById('inv-email')?.classList.remove('error');
  document.getElementById('pdf-preview').style.display = 'none';
  document.getElementById('pdf-dl').style.display = 'none';

  var valid = true;
  if (!bookingId) {
    if (errBid) errBid.style.display = 'block';
    document.getElementById('inv-booking-id')?.classList.add('error');
    valid = false;
  }
  if (!email || !email.includes('@')) {
    if (errEm) errEm.style.display = 'block';
    document.getElementById('inv-email')?.classList.add('error');
    valid = false;
  }
  if (!valid) return;

  showInvoiceStatus('inv-loading', '⏳ Looking up your booking…');

  try {
    var resp = await fetch(INVOICE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getInvoice', bookingId: bookingId, email: email })
    });
    var data = await resp.json();

    if (data.status !== 'ok' || !data.booking) {
      showInvoiceStatus('inv-fail', '❌ ' + (data.message || 'No booking found with that ID and email. Please check and try again.'));
      return;
    }

    var b = data.booking;
    showInvoiceStatus('inv-success', '✓ Booking found! Generating your invoice…');

    var pdfHtml = buildInvoiceHTML(b);
    var blob = new Blob([pdfHtml], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var frame = document.getElementById('pdf-frame');
    if (frame) frame.src = url;
    document.getElementById('pdf-preview').style.display = 'block';

    var dl = document.getElementById('pdf-download');
    if (dl) {
      dl.href = url;
      dl.download = 'MiaCasa-Invoice-' + bookingId + '.html';
    }
    document.getElementById('pdf-dl').style.display = 'block';

    showInvoiceStatus('inv-success', '✓ Invoice ready! You can preview it below or download.');
  } catch (e) {
    showInvoiceStatus('inv-fail', '❌ Something went wrong. Please try again or contact us on WhatsApp.');
  }
}

function buildInvoiceHTML(b) {
  var isHanoi = (b.property || '').toLowerCase().includes('hanoi') || (b.bookingId || '').startsWith('MCH');
  var accentColor = isHanoi ? '#C4713A' : '#6B8C6B';

  function row(label, value) {
    return `<tr><td style="padding:9px 16px;font-size:12px;color:#888;width:45%;border-bottom:1px solid #f0ebe5;">${label}</td>
            <td style="padding:9px 16px;font-size:13px;color:#2C2416;font-weight:500;border-bottom:1px solid #f0ebe5;">${value || '—'}</td></tr>`;
  }

  var invoiceNum = 'INV-' + (b.bookingId || '—');
  var issuedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  var amountFormatted = formatVNDInvoice(b.amount);

  var roomLine = '';
  if (isHanoi && b.room) {
    roomLine = row('Room', b.room);
  }

  return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<title>Invoice ' + invoiceNum + '</title>' +
    '<style>@page{size:A4;margin:0}body{margin:0;font-family:"Helvetica Neue",Arial,sans-serif;background:#fff;color:#2C2416;}' +
    '@media print{.no-print{display:none}}</style></head><body>' +
    '<div style="max-width:700px;margin:0 auto;padding:0;">' +

    '<div style="background:' + accentColor + ';padding:40px 48px 32px;">' +
    '  <div style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:white;letter-spacing:0.04em;">MiaCasa Homestays</div>' +
    '  <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:4px;letter-spacing:0.1em;text-transform:uppercase;">' + (b.property || '') + '</div>' +
    '  <div style="font-size:32px;font-weight:300;color:white;margin-top:20px;letter-spacing:-0.01em;">Invoice</div>' +
    '</div>' +

    '<div style="background:#FAF7F3;padding:20px 48px;display:flex;justify-content:space-between;border-bottom:2px solid ' + accentColor + ';">' +
    '  <div><div style="font-size:10px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:2px;">Invoice Number</div>' +
    '       <div style="font-size:14px;font-weight:600;">' + invoiceNum + '</div></div>' +
    '  <div style="text-align:right"><div style="font-size:10px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:2px;">Issued</div>' +
    '       <div style="font-size:14px;">' + issuedDate + '</div></div>' +
    '</div>' +

    '<table style="width:100%;border-collapse:collapse;margin-top:0;">' +
    row('Guest Name', b.guestName) +
    row('Email', b.guestEmail) +
    row('Phone', b.guestPhone) +
    row('Property', b.property) +
    roomLine +
    row('Booking ID', b.bookingId) +
    row('Check-in', b.checkIn) +
    row('Check-out', b.checkOut) +
    row('Number of nights', b.nights ? b.nights + (b.nights == 1 ? ' night' : ' nights') : '—') +
    row('Number of guests', b.guests ? b.guests + (b.guests == 1 ? ' guest' : ' guests') : '—') +
    '</table>' +

    '<div style="margin:32px 48px;padding:20px 24px;background:' + accentColor + ';border-radius:4px;display:flex;justify-content:space-between;align-items:center;">' +
    '  <div style="font-size:12px;color:rgba(255,255,255,0.8);letter-spacing:0.08em;text-transform:uppercase;">Total Amount Paid</div>' +
    '  <div style="font-size:24px;font-weight:600;color:white;">' + amountFormatted + '</div>' +
    '</div>' +

    '<div style="margin:0 48px 20px;display:flex;gap:12px;">' +
    '  <div style="padding:5px 14px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;background:#E6F4EA;color:#2D6A4F;">PAID</div>' +
    '  <div style="padding:5px 14px;border-radius:20px;font-size:11px;background:#F0EBE5;color:#7C5C3E;">' + ((b.paymentMethod || '—')) + '</div>' +
    '</div>' +

    '<div style="margin:0 48px;padding:24px 0;border-top:1px solid #e8e0d8;">' +
    '  <div style="font-size:11px;color:#aaa;line-height:1.8;">' +
    '    MiaCasa Homestays · Hanoi, Vietnam · miacasahanoi@gmail.com · +84 869 922 261<br>' +
    '    This invoice was automatically generated. For questions, contact us via WhatsApp.' +
    '  </div>' +
    '</div>' +

    '<div class="no-print" style="padding:16px 48px 40px;text-align:right;">' +
    '  <button onclick="window.print()" style="background:' + accentColor + ';color:white;border:none;padding:10px 24px;font-size:13px;border-radius:3px;cursor:pointer;">🖨 Print / Save as PDF</button>' +
    '</div>' +

    '</div></body></html>';
}

function formatVNDInvoice(amount) {
  if (!amount) return '—';
  var n = parseInt(amount.toString().replace(/[^0-9]/g, ''));
  if (isNaN(n)) return amount;
  return n.toLocaleString('vi-VN') + ' ₫';
}

// Pre-fill from URL params (e.g., if linked from booking confirmation)
(function() {
  var params = new URLSearchParams(window.location.search);
  var bidInput = document.getElementById('inv-booking-id');
  var emailInput = document.getElementById('inv-email');
  if (params.get('bid') && bidInput) bidInput.value = params.get('bid');
  if (params.get('email') && emailInput) emailInput.value = params.get('email');
})();

// Export for global access
window.requestInvoice = requestInvoice;
