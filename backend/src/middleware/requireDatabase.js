import { isDatabaseReady } from '../config/db.js';

export function requireDatabase(req, res, next) {
  if (!isDatabaseReady()) {
    return res.status(503).json({
      ok: false,
      message: 'The service is temporarily unavailable. Try again in a few minutes.',
    });
  }
  return next();
}
