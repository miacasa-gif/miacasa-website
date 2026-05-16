// ================================================================
// LOG-BOOKING.JS - Netlify Function Proxy to Google Script
// ================================================================
// Required env vars (Netlify → Site Settings → Environment variables):
//   GOOGLE_SHEETS_URL  — your Google Apps Script deployment URL
//   ADMIN_USER         — admin login email
//   ADMIN_PASSWORD     — admin login password
//
// ADMIN_TOKEN is NO LONGER needed as an env var.
// A session token is derived from credentials at login time.
// ================================================================

const GOOGLE_SHEETS_URL  = process.env.GOOGLE_SHEETS_URL;
const ADMIN_USER         = process.env.ADMIN_USER;
const ADMIN_PASSWORD     = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS;
// GAS_ADMIN_TOKEN: the ADMIN_TOKEN value from your Google Apps Script (Code.gs)
// Set this in Netlify env vars. It's used when forwarding admin actions to GAS.
const GAS_ADMIN_TOKEN    = process.env.GAS_ADMIN_TOKEN;

// Derive a stable session token from credentials using Node's built-in crypto.
// No env var needed — as long as ADMIN_USER and ADMIN_PASSWORD are set,
// the same token is produced every time, so stored sessions stay valid across deploys.
const crypto = require('crypto');
function makeSessionToken() {
  return crypto
    .createHmac('sha256', ADMIN_PASSWORD || 'fallback')
    .update(ADMIN_USER || 'admin')
    .digest('hex');
}

function isValidToken(token) {
  if (!token) {
    console.log('isValidToken: No token provided');
    return false;
  }
  
  const expectedToken = makeSessionToken();
  const isValid = token === expectedToken;
  
  console.log('isValidToken check:', {
    receivedToken: token,
    expectedToken: expectedToken,
    matches: isValid,
    receivedLength: token.length,
    expectedLength: expectedToken.length
  });
  
  return isValid;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
}

function ok(data)   { return { statusCode: 200, headers: corsHeaders(), body: JSON.stringify(data) }; }
function unauth()   { return { statusCode: 401, headers: corsHeaders(), body: JSON.stringify({ status: 'error', message: 'Unauthorized' }) }; }
function badReq(m)  { return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ status: 'error', message: m }) }; }

async function callGAS(payload) {
  // For admin actions, we NEED to send the token to GAS
  // For public actions, there's no token to send anyway
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), // Send the FULL payload including token
      signal: controller.signal
    });
    clearTimeout(timeout);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch(e) {
      console.error('GAS returned non-JSON:', text.slice(0, 200));
      return { status: 'error', message: 'Google Script returned an invalid response. It may be waking up — please try again in a few seconds.' };
    }
  } catch(e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      return { status: 'error', message: 'Request timed out. Google Script is taking too long — please try again.' };
    }
    throw e;
  }
}

// For admin actions that GAS protects with isAuth(), inject the GAS token
async function callAdminGAS(payload) {
  return callGAS({ ...payload, token: GAS_ADMIN_TOKEN });
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: JSON.stringify({ status: 'error', message: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch(e) {
    return badReq('Invalid JSON');
  }

  const { action, token } = body;

  try {

    // ── PUBLIC ACTIONS (no token needed) ──────────────────────────

    // Debug endpoint — shows which env vars are present without revealing values
    // Remove this block once everything is working
    if (action === 'debugEnv') {
      return ok({
        status: 'ok',
        env: {
          GOOGLE_SHEETS_URL: !!GOOGLE_SHEETS_URL,
          ADMIN_USER: !!ADMIN_USER,
          ADMIN_PASSWORD: !!ADMIN_PASSWORD,
          // Show first 4 chars of each to confirm correct value is set
          ADMIN_USER_hint: ADMIN_USER ? ADMIN_USER.slice(0, 4) + '...' : 'NOT SET',
          ADMIN_PASSWORD_hint: ADMIN_PASSWORD ? ADMIN_PASSWORD.slice(0, 2) + '***' : 'NOT SET',
          GOOGLE_SHEETS_URL_hint: GOOGLE_SHEETS_URL ? GOOGLE_SHEETS_URL.slice(0, 30) + '...' : 'NOT SET',
        }
      });
    }


    if (action === 'debugToken') {
  const testToken = makeSessionToken();
  return ok({ 
    status: 'ok', 
    expectedToken: testToken,
    hasAdminPass: !!process.env.ADMIN_PASSWORD,
    adminPassLength: process.env.ADMIN_PASSWORD?.length
  });
}

    if (action === 'login') {
      const { username, password } = body;
      if (!ADMIN_USER || !ADMIN_PASSWORD) {
        return ok({ status: 'error', message: 'Admin credentials not configured. Set ADMIN_USER and ADMIN_PASSWORD in Netlify environment variables.' });
      }
      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        return ok({ status: 'ok', token: makeSessionToken() });
      }
      return ok({ status: 'error', message: 'Incorrect username or password.' });
    }

    if (action === 'checkRoomAvailability') {
      const { room, checkIn, checkOut } = body;
      const result = await callGAS({ action: 'checkRoomAvailability', room, checkIn, checkOut });
      return ok({ available: result.available === true, otherPropertyName: result.otherPropertyName || null });
    }

    if (action === 'getMaintenanceMode') {
      const result = await callGAS({ action: 'getMaintenanceMode' });
      return ok(result);
    }

    if (action === 'createBooking') {
      const result = await callGAS(body);
      return ok(result);
    }

    if (action === 'getInvoice') {
      const result = await callGAS(body);
      return ok(result);
    }

    if (action === 'requestCancellation') {
      const result = await callGAS(body);
      return ok(result);
    }

    // ── ADMIN ACTIONS (token required) ────────────────────────────

    // getPriceOverrides is public — booking page needs it without a token
    if (action === 'getPriceOverrides') {
      const result = await callGAS({ action: 'getPriceOverrides' });
      return ok(result);
    }

    if (!isValidToken(token)) return unauth();

    if (action === 'setMaintenanceMode') {
      const result = await callAdminGAS({ action: 'setMaintenanceMode', value: body.value });
      return ok(result);
    }

    if (action === 'getRoomStatus') {
      const result = await callAdminGAS({ action: 'getRoomStatus' });
      return ok(result);
    }

    if (action === 'updateRoomStatus') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    if (action === 'deleteRoomStatus') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    if (action === 'addPriceOverride') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    if (action === 'deletePriceOverride') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    if (action === 'getPendingCancellations') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    if (action === 'confirmRefund') {
      const result = await callAdminGAS(body);
      return ok(result);
    }

    // Unknown action — forward and let GAS decide
    const result = await callGAS(body);
    return ok(result);

  } catch (error) {
    console.error('Function error:', error);
    const message = !GOOGLE_SHEETS_URL
      ? 'GOOGLE_SHEETS_URL is not set. Add it in Netlify → Site Settings → Environment variables.'
      : error.message;
    return { statusCode: 500, headers: corsHeaders(), body: JSON.stringify({ status: 'error', message }) };
  }
};