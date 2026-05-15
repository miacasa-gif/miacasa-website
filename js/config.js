// /js/config.js - Universal configuration
// All API calls go through the Netlify function proxy (/api/log-booking)
// The Google Sheets URL is stored as a server-side environment variable only

// Helper function for API calls - routes through the Netlify serverless function
async function callAPI(action, data = {}) {
  const payload = { action, ...data };

  const response = await fetch('/api/log-booking', {
    method: 'POST',
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
