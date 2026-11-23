import { env, isEmailConfigured } from './config/env.js';
import { createApp } from './app.js';

const app = createApp();
const server = app.listen(env.port, () => {
  console.log(`[api] WazzupPAP API listening on port ${env.port} (${env.nodeEnv})`);
  if (!isEmailConfigured) {
    console.warn('[email] SMTP is not configured. Demo requests will fail until EMAIL_* values are set.');
  }
});

const shutdown = (signal) => {
  console.log(`[api] ${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
