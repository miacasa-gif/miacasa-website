// /js/config.js - Universal configuration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkHj6gfhBxcEJwhxloF2ZfLrycZbKVmbS9IHVEzRoMf4ey63qrA4iL13H7D2E8ADCZzw/exec';

// Helper function for API calls that works everywhere
async function callAPI(action, data = {}) {
  const payload = { action, ...data };
  
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return await response.json();
}
