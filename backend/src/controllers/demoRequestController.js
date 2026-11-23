import { DemoRequest } from '../models/DemoRequest.js';
import { validateDemoRequest } from '../validation/demoRequest.js';
import { sendDemoRequestNotification } from '../services/emailService.js';

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

export async function createDemoRequest(req, res, next) {
  try {
    const body = req.body ?? {};

    // Honeypot: real visitors never see or fill this field.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return res.status(201).json({ ok: true, message: 'Thank you. Your demo request has been received.' });
    }

    const { data, errors } = validateDemoRequest(body);
    if (!data) {
      return res.status(422).json({
        ok: false,
        message: 'Some details need attention. Check the highlighted fields.',
        errors,
      });
    }

    // Absorb accidental double-submits without creating duplicate leads or emails.
    const recent = await DemoRequest.findOne({
      email: data.email,
      createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    })
      .select('_id')
      .lean();

    if (!recent) {
      await DemoRequest.create({
        ...data,
        meta: {
          userAgent: String(req.get('user-agent') || '').slice(0, 300),
          referrer: String(req.get('referer') || '').slice(0, 300),
        },
      });

      // Email failure must not lose the saved lead or fail the form submission.
      try {
        await sendDemoRequestNotification(data);
      } catch (emailError) {
        console.error('[email] Failed to send demo request notification:', emailError.message);
      }
    }

    // Deliberately return no record data: the lead database is never exposed via the API.
    return res.status(201).json({
      ok: true,
      message: 'Thank you. Your demo request has been received.',
    });
  } catch (err) {
    return next(err);
  }
}
