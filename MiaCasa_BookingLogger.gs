// ================================================================
// MiaCasa Homestays — FULL PRODUCTION SCRIPT
// ================================================================

const SHEET_NAME   = 'Bookings';
const ADMIN_USER   = "miacasahanoi@gmail.com";
const ADMIN_PASS   = "0869922261@Mi";
const ADMIN_TOKEN  = "super_secure_token_123";

const HEADERS = [
  'Timestamp','Booking ID','Property','Room',
  'Check-in','Check-out','Nights','Guests',
  'Amount (VND)','Amount (USD ~)','Guest Name','Guest Email','Guest Phone',
  'Payment Method','Booked At','Payment Status','Payment Sent','Checkin Sent'
];

const COL = {
  timestamp:1, bookingId:2, property:3, room:4,
  checkIn:5, checkOut:6, nights:7, guests:8,
  amountVND:9, amountUSD:10, guestName:11, guestEmail:12, guestPhone:13,
  paymentMethod:14, bookedAt:15, paymentStatus:16, paymentSent:17, checkinSent:18,
};

const COLORS = {
  pending:   {bg:'#FFF3CD',text:'#856404'},
  paid:      {bg:'#D1FAE5',text:'#065F46'},
  cancelled: {bg:'#FEE2E2',text:'#991B1B'},
  refunded:  {bg:'#E0E7FF',text:'#3730A3'},
  yes:       {bg:'#D1FAE5',text:'#065F46'},
  no:        {bg:'#F3F4F6',text:'#6B7280'},
  hanoi:     {bg:'#FDF6EC'},
  oldquarter:{bg:'#EEF2FF'},
  header:    {bg:'#2c2416',text:'#f5efe6'},
};

// ================================================================
// doPost
// ================================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || '';

    // Public
    if (action === 'login') {
      if (data.username === ADMIN_USER && data.password === ADMIN_PASS) {
        return jsonOut({status:'ok', token:ADMIN_TOKEN});
      }
      return jsonOut({status:'error', message:'Invalid credentials'});
    }
    if (action === 'getInvoice')    return jsonOut(handleInvoiceRequest(data));
    if (action === 'getIcal')       return handleGetIcal(data);

    // Admin (token required)
    if (action === 'getRoomStatus')       { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(getRoomStatus()); }
    if (action === 'updateRoomStatus')    { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(updateRoomStatus(data)); }
    if (action === 'deleteRoomStatus')    { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(deleteRoomStatus(data)); }
    if (action === 'getPriceOverrides')   { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(getPriceOverrides()); }
    if (action === 'addPriceOverride')    { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(addPriceOverride(data)); }
    if (action === 'deletePriceOverride') { if(!isAuth(data)) return jsonOut(unauth()); return jsonOut(deletePriceOverride(data)); }

    // Default: save booking
    return handleBookingSave(data);
  } catch(err) {
    return jsonOut({status:'error', message:err.toString()});
  }
}

function isAuth(data) { return data && data.token === ADMIN_TOKEN; }
function unauth()     { return {status:'error', message:'Unauthorized'}; }

// ================================================================
// BOOKING SAVE
// ================================================================
function handleBookingSave(data) {
  const sheet = getOrCreateSheet();
  const amountVND = Number(data.amount) || 0;

  // Duplicate check
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const ids = sheet.getRange(2, COL.bookingId, lastRow-1).getValues();
    if (ids.some(r => r[0] === data.bookingId)) {
      return jsonOut({status:'error', message:'Duplicate booking ID'});
    }
  }

  sheet.appendRow([
    new Date(),
    data.bookingId||'', data.property||'', data.room||'',
    data.checkIn||'', data.checkOut||'',
    Number(data.nights)||'', Number(data.guests)||'',
    amountVND, (amountVND/25000).toFixed(2),
    data.guestName||'', data.guestEmail||'', data.guestPhone||'',
    data.paymentMethod||'', data.bookedAt||'',
    'pending','NO','NO',
  ]);

  const newRow = sheet.getLastRow();
  colorCodeRow(sheet, newRow, data.property||'', 'pending','NO','NO');
  sheet.autoResizeColumns(1, HEADERS.length);
  return jsonOut({status:'ok', bookingId:data.bookingId});
}

// ================================================================
// COLOR CODING
// ================================================================
function colorCodeRow(sheet, rowNum, property, paymentStatus, paymentSent, checkinSent) {
  sheet.getRange(rowNum,1,1,HEADERS.length)
    .setBackground((property||'').toLowerCase().includes('oldquarter') ? COLORS.oldquarter.bg : COLORS.hanoi.bg);

  const s = (paymentStatus||'pending').toLowerCase();
  const sc = ['paid','pay','payed','done'].includes(s) ? COLORS.paid
           : s==='cancelled' ? COLORS.cancelled
           : s==='refunded'  ? COLORS.refunded
           : COLORS.pending;
  sheet.getRange(rowNum,COL.paymentStatus).setBackground(sc.bg).setFontColor(sc.text).setFontWeight('bold');

  const psc = (paymentSent||'').toUpperCase()==='YES' ? COLORS.yes : COLORS.no;
  sheet.getRange(rowNum,COL.paymentSent).setBackground(psc.bg).setFontColor(psc.text).setFontWeight('bold');

  const csc = (checkinSent||'').toUpperCase()==='YES' ? COLORS.yes : COLORS.no;
  sheet.getRange(rowNum,COL.checkinSent).setBackground(csc.bg).setFontColor(csc.text).setFontWeight('bold');

  sheet.getRange(rowNum,COL.amountVND).setFontWeight('bold');
  sheet.getRange(rowNum,COL.bookingId).setFontWeight('bold');
}

function recolorAllRows() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  for (let r=2; r<=lastRow; r++) {
    colorCodeRow(sheet,r,
      sheet.getRange(r,COL.property).getValue(),
      sheet.getRange(r,COL.paymentStatus).getValue(),
      sheet.getRange(r,COL.paymentSent).getValue(),
      sheet.getRange(r,COL.checkinSent).getValue()
    );
  }
  Logger.log('Recolored '+(lastRow-1)+' rows.');
}

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName()!==SHEET_NAME) return;
  const row = e.range.getRow();
  if (row===1) return;
  colorCodeRow(sheet,row,
    sheet.getRange(row,COL.property).getValue(),
    sheet.getRange(row,COL.paymentStatus).getValue(),
    sheet.getRange(row,COL.paymentSent).getValue(),
    sheet.getRange(row,COL.checkinSent).getValue()
  );
}

// ================================================================
// ROOM STATUS  (Sheet: RoomStatus  cols: ID|Room|From|To|Status|Note)
// ================================================================
function getRoomSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('RoomStatus');
  if (!s) { s=ss.insertSheet('RoomStatus'); s.appendRow(['ID','Room','From','To','Status','Note']); }
  return s;
}

function getRoomStatus() {
  const sheet = getRoomSheet();
  const rows  = sheet.getDataRange().getValues().slice(1);
  return {status:'ok', data:rows};
}

function updateRoomStatus(data) {
  if (!data.room||!data.from||!data.to||!data.status)
    return {status:'error', message:'Missing fields'};
  const sheet = getRoomSheet();
  const id    = Date.now();
  sheet.appendRow([id, data.room, data.from, data.to, data.status, data.note||'']);
  return {status:'ok', id};
}

function deleteRoomStatus(data) {
  const sheet = getRoomSheet();
  const rows  = sheet.getDataRange().getValues();
  for (let i=1; i<rows.length; i++) {
    if (String(rows[i][0])===String(data.id)) { sheet.deleteRow(i+1); return {status:'ok'}; }
  }
  return {status:'error', message:'Not found'};
}

// ================================================================
// PRICE OVERRIDES  (Sheet: PriceOverrides  cols: ID|Room|From|To|Price|Note)
// ================================================================
function getPriceSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('PriceOverrides');
  if (!s) { s=ss.insertSheet('PriceOverrides'); s.appendRow(['ID','Room','From','To','Price','Note']); }
  return s;
}

function getPriceOverrides() {
  const rows = getPriceSheet().getDataRange().getValues().slice(1);
  return {status:'ok', data:rows};
}

function addPriceOverride(data) {
  if (!data.room||!data.from||!data.to||!data.price)
    return {status:'error', message:'Missing fields'};
  const id = Date.now();
  getPriceSheet().appendRow([id, data.room, data.from, data.to, data.price, data.note||'']);
  return {status:'ok', id};
}

function deletePriceOverride(data) {
  const sheet = getPriceSheet();
  const rows  = sheet.getDataRange().getValues();
  for (let i=1; i<rows.length; i++) {
    if (String(rows[i][0])===String(data.id)) { sheet.deleteRow(i+1); return {status:'ok'}; }
  }
  return {status:'error', message:'Not found'};
}

// ================================================================
// ICAL GENERATOR
// Generates a valid iCal feed combining:
//   1. Guest bookings from the Bookings sheet
//   2. Room closure periods from the RoomStatus sheet
//
// URL to use in Booking.com / Airbnb / Agoda:
//   https://YOUR-SCRIPT-URL/exec?action=getIcal&room=Spring+Room
//   (replace spaces with + or %20)
// ================================================================
function handleGetIcal(data) {
  const room = (data.room || '').trim();
  if (!room) {
    return ContentService.createTextOutput('ERROR: room parameter required')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  const lines = [];
  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push('PRODID:-//MiaCasa Homestays//EN');
  lines.push('CALSCALE:GREGORIAN');
  lines.push('METHOD:PUBLISH');
  lines.push('X-WR-CALNAME:MiaCasa - ' + room);
  lines.push('X-WR-TIMEZONE:Asia/Ho_Chi_Minh');

  const now = fmtIcalDate(new Date());

  // 1. Guest bookings
  const bookSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (bookSheet) {
    const rows = bookSheet.getDataRange().getValues().slice(1);
    rows.forEach(function(row) {
      const rowRoom   = (row[COL.room-1]||'').trim();
      const bookingId = row[COL.bookingId-1]||'';
      const checkIn   = row[COL.checkIn-1];
      const checkOut  = row[COL.checkOut-1];
      const guestName = row[COL.guestName-1]||'Guest';
      const status    = (row[COL.paymentStatus-1]||'').toLowerCase();

      if (rowRoom !== room) return;
      if (status === 'cancelled') return;
      if (!checkIn || !checkOut) return;

      const dtStart = fmtIcalDateOnly(new Date(checkIn));
      const dtEnd   = fmtIcalDateOnly(new Date(checkOut));

      lines.push('BEGIN:VEVENT');
      lines.push('UID:booking-' + bookingId + '@miacasahanoi.com');
      lines.push('DTSTAMP:' + now);
      lines.push('DTSTART;VALUE=DATE:' + dtStart);
      lines.push('DTEND;VALUE=DATE:' + dtEnd);
      lines.push('SUMMARY:BOOKED - ' + guestName);
      lines.push('DESCRIPTION:Booking ID: ' + bookingId);
      lines.push('STATUS:CONFIRMED');
      lines.push('END:VEVENT');
    });
  }

  // 2. Room closure periods
  const roomSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RoomStatus');
  if (roomSheet) {
    const rows = roomSheet.getDataRange().getValues().slice(1);
    rows.forEach(function(row, idx) {
      const rowRoom  = (row[1]||'').trim();
      const from     = row[2];
      const to       = row[3];
      const status   = (row[4]||'').toLowerCase();
      const note     = row[5]||'Blocked';
      const id       = row[0]||idx;

      if (rowRoom !== room) return;
      if (status !== 'closed') return;
      if (!from || !to) return;

      const dtStart = fmtIcalDateOnly(new Date(from));
      // iCal DTEND for all-day is exclusive (add 1 day)
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1);
      const dtEnd = fmtIcalDateOnly(toDate);

      lines.push('BEGIN:VEVENT');
      lines.push('UID:closure-' + id + '@miacasahanoi.com');
      lines.push('DTSTAMP:' + now);
      lines.push('DTSTART;VALUE=DATE:' + dtStart);
      lines.push('DTEND;VALUE=DATE:' + dtEnd);
      lines.push('SUMMARY:NOT AVAILABLE - ' + note);
      lines.push('STATUS:CONFIRMED');
      lines.push('END:VEVENT');
    });
  }

  lines.push('END:VCALENDAR');

  return ContentService
    .createTextOutput(lines.join('\r\n'))
    .setMimeType(ContentService.MimeType.ICAL);
}

// iCal timestamp format: 20251224T150000Z
function fmtIcalDate(d) {
  return d.getUTCFullYear()
    + pad(d.getUTCMonth()+1)
    + pad(d.getUTCDate())
    + 'T'
    + pad(d.getUTCHours())
    + pad(d.getUTCMinutes())
    + pad(d.getUTCSeconds())
    + 'Z';
}

// iCal all-day date: 20251224
function fmtIcalDateOnly(d) {
  return d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
}

function pad(n) { return n < 10 ? '0'+n : String(n); }

// ================================================================
// INVOICE
// ================================================================
function handleInvoiceRequest(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return {status:'error', message:'Sheet not found.'};
  const rows  = sheet.getDataRange().getValues();
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i=1; i<rows.length; i++) {
    const bookingId  = rows[i][COL.bookingId-1];
    const guestEmail = (rows[i][COL.guestEmail-1]||'').toLowerCase();
    const checkOut   = new Date(rows[i][COL.checkOut-1]); checkOut.setHours(0,0,0,0);
    const payStatus  = (rows[i][COL.paymentStatus-1]||'').toLowerCase();

    if (bookingId===data.bookingId && guestEmail===(data.email||'').toLowerCase()) {
      if (checkOut>today) return {status:'error', message:'Invoice available only after checkout.'};
      if (payStatus==='cancelled') { sendInvoiceEmail(rows[i],true); return {status:'success'}; }
      if (!['paid','pay','payed','done'].includes(payStatus)) return {status:'error', message:'Payment not completed yet.'};
      sendInvoiceEmail(rows[i],false);
      return {status:'success'};
    }
  }
  return {status:'error', message:'Booking not found or email mismatch.'};
}

function sendInvoiceEmail(row, isCancelled) {
  const bookingId=row[COL.bookingId-1], guestName=row[COL.guestName-1], email=row[COL.guestEmail-1];
  const amount=isCancelled?0:row[COL.amountVND-1];
  const vnd=Number(amount).toLocaleString('vi-VN'), usd=(Number(amount)/25000).toFixed(0);

  const doc=DocumentApp.create('Invoice_'+bookingId);
  const body=doc.getBody();
  body.appendParagraph('MiaCasa Homestays — Invoice').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  const table=body.appendTable([
    ['Booking ID',bookingId],['Guest Name',guestName],
    ['Property',row[COL.property-1]],['Room',row[COL.room-1]],
    ['Check-in',String(row[COL.checkIn-1])],['Check-out',String(row[COL.checkOut-1])],
    ['Guests',String(row[COL.guests-1])],
    ['Total Paid',isCancelled?'CANCELLED':vnd+'₫ (~$'+usd+' USD)'],
  ]);
  table.setBorderWidth(0.5);
  for(let r=0;r<table.getNumRows();r++) table.getCell(r,0).setBackgroundColor('#f5efe6').setBold(true);
  if(isCancelled) body.appendParagraph('\nNOTE: Booking was cancelled.').setForegroundColor('#991B1B');
  body.appendParagraph('\nThank you for staying with MiaCasa Homestays!').setItalic(true);
  doc.saveAndClose();
  const pdf=DriveApp.getFileById(doc.getId()).getAs('application/pdf');
  MailApp.sendEmail({to:email,subject:'Invoice — '+bookingId+' | MiaCasa Homestays',
    body:'Hi '+guestName+',\n\nPlease find your invoice attached.\n\nWarm regards,\nMiaCasa Homestays',attachments:[pdf]});
  DriveApp.getFileById(doc.getId()).setTrashed(true);
}

// ================================================================
// HELPERS
// ================================================================
function getOrCreateSheet() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  let sheet=ss.getSheetByName(SHEET_NAME);
  if(!sheet) sheet=ss.insertSheet(SHEET_NAME);
  if(sheet.getLastRow()===0){
    sheet.appendRow(HEADERS);
    const hr=sheet.getRange(1,1,1,HEADERS.length);
    hr.setFontWeight('bold').setBackground(COLORS.header.bg).setFontColor(COLORS.header.text);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  if (action === 'getIcal') return handleGetIcal(e.parameter);
  return jsonOut({status:'ok', message:'MiaCasa API is live', timestamp:new Date().toISOString()});
}

// ================================================================
// TEST FUNCTIONS
// ================================================================
function testLog() {
  const fake={postData:{contents:JSON.stringify({
    bookingId:'MCH-SPR-TEST-'+Date.now(),property:'MiaCasaHanoi',room:'Spring Room',
    checkIn:'2025-12-24',checkOut:'2025-12-27',nights:3,guests:2,amount:2700000,
    guestName:'Test Guest',guestEmail:'test@example.com',guestPhone:'+84 912 345 678',
    paymentMethod:'paypal',bookedAt:new Date().toISOString(),
  })}};
  Logger.log(doPost(fake).getContent());
}

function testLogin() {
  const fake={postData:{contents:JSON.stringify({action:'login',username:ADMIN_USER,password:ADMIN_PASS})}};
  Logger.log(doPost(fake).getContent());
}

function testIcal() {
  // Call: https://YOUR-URL/exec?action=getIcal&room=Spring+Room
  const fake={parameter:{action:'getIcal',room:'Spring Room'}};
  const result=doGet(fake);
  Logger.log(result.getContent().substring(0,500));
}
