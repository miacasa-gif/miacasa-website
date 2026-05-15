# MiaCasa — Setup Guide

## Required Environment Variables

Before deploying, set these in **Netlify → Site Settings → Environment variables**:

| Variable | Description |
|---|---|
| `GOOGLE_SHEETS_URL` | Your Google Apps Script deployment URL |
| `ADMIN_USER` | Admin panel login email |
| `ADMIN_PASSWORD` | Admin panel password (use a strong password) |
| `ADMIN_TOKEN` | Auth token for protected API actions — generate with `openssl rand -hex 32` |

**Never commit real values to source control.** Use `.env.example` as a reference template only.

## Deployment

1. Push to GitHub
2. Connect to Netlify
3. Set all four environment variables above in Netlify dashboard
4. Deploy

## Local Development

Netlify CLI can inject env vars locally:
```bash
npm install -g netlify-cli
netlify dev
```

Create a `.env` file (gitignored) with your local values.
