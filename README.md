# WazzupPAP microsite

Single-page marketing microsite for **WazzupPAP**, Verified Patient Assessment Programs, a digiLATERAL product.
It has a working **Request a private demo** form that stores leads in MongoDB.

```
wazzuppap/
├── frontend/   React 19 + Vite + Tailwind CSS 4 + Motion + Lucide
└── backend/    Node.js + Express 5 + Mongoose (MongoDB)
```

## Requirements

- Node.js 18.18 or later (tested on Node 22)
- A MongoDB database: MongoDB Atlas (recommended) or self-hosted MongoDB 6+

## Run locally

**1. Backend**

```bash
cd backend
cp .env.example .env        # then set MONGODB_URI
npm install
npm run dev                 # http://localhost:5000
```

Check it's running: `curl http://localhost:5000/api/health` should return `{"ok":true,"database":"up"}`.

**2. Frontend** (in a second terminal)

```bash
cd frontend
cp .env.example .env        # defaults are fine for local work
npm install
npm run dev                 # http://localhost:5173
```

In development, Vite proxies `/api/*` to the backend, so the form works with no CORS setup.

**Tests**

```bash
cd backend && npm test      # server-side validation tests
cd frontend && npm run lint
```

## Environment variables

### backend/.env

| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | yes | MongoDB connection string. Use a DB user with `readWrite` on this database only. |
| `PORT` | no | API port (default `5000`). |
| `NODE_ENV` | no | `production` in production. |
| `CORS_ORIGINS` | no | Comma-separated browser origins allowed to call the API, e.g. `https://www.example.com`. |
| `TRUST_PROXY` | no | `1` when behind one reverse proxy or load balancer, so rate limiting sees real client IPs. |
| `RATE_LIMIT_WINDOW_MINUTES` / `RATE_LIMIT_MAX` | no | Demo form limit per IP (default 5 per 15 minutes). |

### frontend/.env

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Public API URL with no trailing slash, e.g. `https://api.example.com`. Leave empty if `/api` is served from the same domain. |
| `VITE_DEV_API_PROXY` | Development only: where `npm run dev` sends `/api`. |

`VITE_*` values are compiled into public JavaScript. Never put secrets in the frontend `.env`. `.env` files are git-ignored.

## API

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/health` | Liveness and database status. |
| `POST` | `/api/demo-requests` | Body: `fullName`, `company`, `designation`, `email`, `phone`, `message` (optional). Returns `201`, `422` with per-field `errors`, `429` when rate-limited, `503` if the database is down. |

There is deliberately **no endpoint that reads or lists leads**. Read leads directly in MongoDB (Atlas UI, Compass or `mongosh`) from the `demorequests` collection, or connect them to your CRM.

### Security in place

- Validation on both client and server (server is authoritative; non-string payloads are rejected, so operator injection like `{"$gt": ""}` fails validation)
- Work-email check (personal mailbox domains are rejected)
- Rate limits: 60 API requests per minute per IP, plus the stricter demo-form limit
- Helmet security headers, CORS allow-list, 10 kB JSON body limit, `x-powered-by` removed
- Honeypot field for basic bot filtering; repeat submissions from the same email within 10 minutes are not duplicated
- No secrets in code; all configuration via environment variables

## Deploy

**Frontend** builds to static files:

```bash
cd frontend && npm run build    # output: frontend/dist
```

Host `dist/` on any static host (Netlify, Vercel static, Cloudflare Pages, S3 + CloudFront, or Nginx). Set `VITE_API_BASE_URL` at build time if the API lives on a different domain.

**Backend** runs as a Node service (Render, Railway, a VPS with PM2, etc.):

```bash
cd backend && npm ci --omit=dev && NODE_ENV=production npm start
```

Set `MONGODB_URI`, `CORS_ORIGINS` (your site's origin) and `TRUST_PROXY=1` on the host. On MongoDB Atlas, restrict network access to your server's IPs.

**Single-server option (Nginx):** serve `frontend/dist` as the site root and proxy `/api/` to the Node process. Then `VITE_API_BASE_URL` can stay empty and CORS is not involved.

```nginx
location /api/ { proxy_pass http://127.0.0.1:5000; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }
location / { root /var/www/wazzuppap/dist; try_files $uri /index.html; }
```

Before launch, add your production domain to `index.html` as a canonical link and make the `og:image` URL absolute.

## Design notes

- **Logo:** `frontend/public/brand/wazzuppap-logo.png` is the supplied file, byte-for-byte unchanged. The supplied artwork has wide white margins, so the `Logo` component frames it with CSS (`object-fit`) and always sits it on white. The file itself is never edited. A tighter, transparent-background export of the official logo would let it sit on navy sections too.
- **Palette:** navy `#011549` and green `#009C6D` are sampled from the logo, with cool paper `#F4F7FB`, mist `#DDE4EF` and slate `#4A5677` as supporting tones.
- **Type:** Bricolage Grotesque (display) and Figtree (body), self-hosted via Fontsource. No external font requests.
- **Visuals:** every product visual (phone, application sheets, report, Head Office laptop, QR glyph) is built in HTML/CSS/SVG in `src/components/mockups/`. They stay sharp at any size, keep text as real HTML, and show no proprietary screens, assessment questions, workflows or client data. The QR glyph is decorative and not scannable.
- **Motion:** one load sequence in the hero (the application sheet rising over the chat), plus transitions that respond to clicks (experience tabs, menu, form states). All motion respects `prefers-reduced-motion`.
- **Messenger chrome** in the mockups is deliberately generic and unbranded. The footer carries a WhatsApp trademark notice; have it reviewed by your legal team.
