import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}. See .env.example.`);
  }
  return value.trim();
}

const nodeEnv = process.env.NODE_ENV || 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: Number.parseInt(process.env.PORT || '5000', 10),
  mongoUri: required('MONGODB_URI'),
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
};
