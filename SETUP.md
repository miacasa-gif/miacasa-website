# MiaCasa — Setup Guide

## Required Environment Variables

Set these in **Netlify → Site Settings → Environment variables**:

| Variable | Description |
|---|---|
| `GOOGLE_SHEETS_URL` | Your Google Apps Script deployment URL |
| `ADMIN_USER` | Admin panel login email |
| `ADMIN_PASSWORD` | Admin panel password |
| `GAS_ADMIN_TOKEN` | The `ADMIN_TOKEN` value from your `Code.gs` file |

## What is GAS_ADMIN_TOKEN?

Open your `Code.gs` in Google Apps Script. Find this line near the top:

```js
const ADMIN_TOKEN = "super_secure_token_123";
```

Copy that value and set it as `GAS_ADMIN_TOKEN` in Netlify.
It lets the Netlify function authenticate with Google Apps Script for admin actions
(room status, price overrides, cancellations).

## Deployment

1. Push to GitHub
2. Connect to Netlify
3. Set all 4 environment variables above
4. Deploy
5. Trigger a new deploy after setting env vars: Deploys → Trigger deploy → Deploy site