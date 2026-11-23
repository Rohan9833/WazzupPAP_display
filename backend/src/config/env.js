import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV || 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: Number.parseInt(process.env.PORT || '5000', 10),
  // Comma-separated list of origins allowed to call the API from a browser.
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  // Number of reverse proxies in front of the app (for correct client IPs in rate limiting).
  trustProxy: Number.parseInt(process.env.TRUST_PROXY || '0', 10),
  rateLimit: {
    windowMinutes: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '15', 10),
    maxRequests: Number.parseInt(process.env.RATE_LIMIT_MAX || '5', 10),
  },
  email: {
    from: process.env.EMAIL_FROM || 'WazzupPAP <edetailer@digilateral.com>',
    host: process.env.EMAIL_HOST || '',
    port: Number.parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: String(process.env.EMAIL_SECURE || 'false').toLowerCase() === 'true',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    to: process.env.EMAIL_TO || 'info@digilateral.com',
  },
};

export const isEmailConfigured = Boolean(
  env.email.host && env.email.user && env.email.pass && env.email.to,
);
