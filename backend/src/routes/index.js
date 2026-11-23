import { Router } from 'express';
import { createDemoRequest } from '../controllers/demoRequestController.js';
import { demoRequestLimiter } from '../middleware/rateLimiters.js';
import { isEmailConfigured } from '../config/env.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, email: isEmailConfigured ? 'configured' : 'not_configured' });
});

// Email-only endpoint. Submitted form data is never persisted.
router.post('/demo-requests', demoRequestLimiter, createDemoRequest);

export default router;
