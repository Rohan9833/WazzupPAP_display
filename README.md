# WazzupPAP microsite

Single-page marketing microsite for **WazzupPAP**, Verified Patient Assessment Programs, a digiLATERAL product.

The **Request a private demo** form validates the request and sends it by SMTP email. Form submissions are not stored in MongoDB, files, or any other database.

```
wazzuppap/
├── frontend/   React 19 + Vite + Tailwind CSS 4 + Motion + Lucide
└── backend/    Node.js + Express 5
```

## Requirements

- Node.js 18.18 or later
- SMTP credentials for the mailbox used to send notifications

## Run locally

**1. Backend**

```bash
cd backend
cp .env.example .env        # fill in SMTP credentials
npm install
npm run dev                 # http://localhost:5000
```

Check it is running: `curl http://localhost:5000/api/health`. The response reports whether SMTP is configured.

**2. Frontend** (in a second terminal)

```bash
cd frontend
cp .env.example .env        # defaults are fine for local work
npm install
npm run dev                 # http://localhost:5173
```

In development, Vite proxies `/api/*` to the backend.

**Tests**

```bash
cd backend && npm test
cd frontend && npm run lint
```

## Environment variables

### backend/.env

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | no | API port (default `5000`). |
| `NODE_ENV` | no | `production` in production. |
| `CORS_ORIGINS` | no | Comma-separated browser origins allowed to call the API. |
| `TRUST_PROXY` | no | `1` when behind one reverse proxy/load balancer, so rate limiting sees real client IPs. |
| `RATE_LIMIT_WINDOW_MINUTES` / `RATE_LIMIT_MAX` | no | Demo form rate limit (default 5 per 15 minutes). |
| `EMAIL_FROM` | no | Sender display/address. |
| `EMAIL_TO` | yes for sending | Notification recipient (defaults to `info@digilateral.com`). |
| `EMAIL_HOST` | yes for sending | SMTP server host. |
| `EMAIL_PORT` | yes for sending | SMTP port (usually 465 or 587). |
| `EMAIL_SECURE` | yes for sending | `true` for TLS on port 465; `false` for STARTTLS on port 587. |
| `EMAIL_USER` | yes for sending | SMTP authentication username. |
| `EMAIL_PASS` | yes for sending | SMTP password/app password. |

The visitor's submitted email address is automatically used as `Reply-To`.

`VITE_*` values are compiled into public JavaScript. Never put SMTP secrets in frontend environment variables. `.env` files are git-ignored.

## API

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/health` | Liveness and SMTP configuration status. |
| `POST` | `/api/demo-requests` | Body: `fullName`, `company`, `designation`, `email`, `phone`, `message` (optional). Sends an email; returns `200` on successful send, `422` with validation errors, `429` when rate-limited, or `503` when SMTP sending fails. |

The API does not save, list, or read demo submissions. It emails the submitted details to the notification inbox and discards the request after handling it.

## Security in place

- Server-side validation (non-string payloads rejected)
- Personal email addresses are accepted
- Rate limits: 60 API requests per minute per IP, plus the stricter demo-form limit
- Helmet security headers, CORS allow-list, 10 kB JSON body limit, `x-powered-by` removed
- Honeypot field for basic bot filtering
- SMTP secrets only on backend; never expose them to frontend

## Deploy

**Frontend** builds to static files:

```bash
cd frontend && npm run build
```

**Backend** runs as a Node service:

```bash
cd backend && npm install --omit=dev && NODE_ENV=production npm start
```

Set `CORS_ORIGINS` to the website's origin and SMTP variables on the server. For a single-server Nginx setup, proxy `/api/` to the Node process and serve the frontend static build.

## Design notes

- **Logo:** `frontend/public/brand/wazzuppap-logo.png` is the supplied file, byte-for-byte unchanged.
- **Palette:** navy `#011549` and green `#009C6D`, with cool paper and slate supporting tones.
- **Type:** Bricolage Grotesque (display) and Figtree (body), self-hosted.
- **Visuals:** product visuals are HTML/CSS/SVG mockups.
- **Motion:** transitions respect `prefers-reduced-motion`.
