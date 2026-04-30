// ================================================================
// LOG-BOOKING.JS - Netlify Function Proxy to Google Script
// ================================================================

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyL-KTne96-AxuWIj0ZrZxihFXBQe1Y8gZoIpKU5cPwe11cMOj-s2L4riHFcXfyVdTU8g/exec";

let pendingPayments = new Map();

const ADMIN_USER = 'miacasahanoi@gmail.com';
const ADMIN_PASSWORD = '0869922261@Mi';
const ADMIN_TOKEN = 'super_secure_token_123';

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
}

exports.handler = async function(event) {
  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: corsHeaders(),
      body: JSON.stringify({ status: "error", message: "Method not allowed" })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ status: "error", message: "Invalid JSON" })
    };
  }

  const { action } = body;

  try {
    // ========== LOGIN ==========
    if (action === 'login') {
      const { username, password } = body;
      if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
        return {
          statusCode: 200,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'ok', token: ADMIN_TOKEN })
        };
      } else {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Invalid credentials' })
        };
      }
    }

    // ========== CHECK ROOM AVAILABILITY ==========
    if (action === 'checkRoomAvailability') {
      const { room, checkIn, checkOut } = body;
      
      console.log('Checking availability:', { room, checkIn, checkOut });
      
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: 'checkRoomAvailability',
          room: room,
          checkIn: checkIn,
          checkOut: checkOut
        })
      });
      
      const result = await response.json();
      console.log('Google Sheets result:', result);
      
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify({ 
          available: result.available === true,
          bothPropertiesBooked: result.bothPropertiesBooked || false,
          otherPropertyName: result.otherPropertyName || null
        })
      };
    }

    // ========== MAINTENANCE MODE ==========
    if (action === 'getMaintenanceMode') {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'getMaintenanceMode' })
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    if (action === 'setMaintenanceMode') {
      const { value, token } = body;
      if (token !== ADMIN_TOKEN) {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Unauthorized' })
        };
      }
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'setMaintenanceMode', value: value })
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    // ========== ROOM STATUS ==========
    if (action === 'getRoomStatus') {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'getRoomStatus' })
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    if (action === 'updateRoomStatus') {
      const { token } = body;
      if (token !== ADMIN_TOKEN) {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Unauthorized' })
        };
      }
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    if (action === 'deleteRoomStatus') {
      const { token } = body;
      if (token !== ADMIN_TOKEN) {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Unauthorized' })
        };
      }
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    // ========== PRICE OVERRIDES ==========
    if (action === 'getPriceOverrides') {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'getPriceOverrides' })
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    if (action === 'addPriceOverride') {
      const { token } = body;
      if (token !== ADMIN_TOKEN) {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Unauthorized' })
        };
      }
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    if (action === 'deletePriceOverride') {
      const { token } = body;
      if (token !== ADMIN_TOKEN) {
        return {
          statusCode: 401,
          headers: corsHeaders(),
          body: JSON.stringify({ status: 'error', message: 'Unauthorized' })
        };
      }
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    // ========== INVOICE ==========
    if (action === 'getInvoice') {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    // ========== CREATE BOOKING ==========
    if (action === 'createBooking') {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify(result)
      };
    }

    // ========== DEFAULT - Forward to Google Sheets ==========
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  }
};