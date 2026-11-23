import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const tooMany = (message) => (req, res) => res.status(429).json({ ok: false, message });

// Broad limit for every API route.
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: tooMany('Too many requests. Wait a minute and try again.'),
});

// Strict limit on the demo request form.
export const demoRequestLimiter = rateLimit({
  windowMs: env.rateLimit.windowMinutes * 60 * 1000,
  limit: env.rateLimit.maxRequests,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: tooMany(
    `You've sent several requests in a short time. Try again in ${env.rateLimit.windowMinutes} minutes.`,
  ),
});
