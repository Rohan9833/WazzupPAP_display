import { Router } from 'express';
import { createDemoRequest } from '../controllers/demoRequestController.js';
import { demoRequestLimiter } from '../middleware/rateLimiters.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { isDatabaseReady } from '../config/db.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, database: isDatabaseReady() ? 'up' : 'down' });
});

// Write-only endpoint. There is intentionally no route that lists or reads leads.
router.post('/demo-requests', demoRequestLimiter, requireDatabase, createDemoRequest);

export default router;
