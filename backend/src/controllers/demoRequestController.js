import { validateDemoRequest } from '../validation/demoRequest.js';
import { sendDemoRequestNotification } from '../services/emailService.js';

export async function createDemoRequest(req, res) {
  const body = req.body ?? {};

  // Honeypot: do not send emails for bot submissions, but avoid exposing the honeypot.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true, message: 'Thank you. Your demo request has been received.' });
  }

  const { data, errors } = validateDemoRequest(body);
  if (!data) {
    return res.status(422).json({
      ok: false,
      message: 'Some details need attention. Check the highlighted fields.',
      errors,
    });
  }

  try {
    // Send only. The request is intentionally not written to a database, file, or other storage.
    await sendDemoRequestNotification(data);
    return res.status(200).json({
      ok: true,
      message: 'Your demo request email has been sent successfully.',
    });
  } catch (err) {
    console.error('[email] Demo request email failed:', err.message);
    return res.status(503).json({
      ok: false,
      message: 'We could not send your demo request right now. Please try again shortly.',
    });
  }
}
