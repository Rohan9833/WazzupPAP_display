import nodemailer from 'nodemailer';
import { env, isEmailConfigured } from '../config/env.js';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

let transporter;

function getTransporter() {
  if (!isEmailConfigured) {
    throw new Error('SMTP is not configured. Set EMAIL_HOST, EMAIL_USER, EMAIL_PASS, and EMAIL_TO.');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.secure,
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    });
  }

  return transporter;
}

export async function sendDemoRequestNotification(data) {
  const transport = getTransporter();

  const fields = [
    ['Full name', data.fullName],
    ['Pharmaceutical company', data.company],
    ['Designation', data.designation],
    ['Email address', data.email],
    ['Contact number', data.phone],
    ['Message', data.message || 'Not provided'],
  ];

  const text = [
    'A new WazzupPAP demo request was submitted.',
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  const rows = fields.map(([label, value]) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>`).join('');

  await transport.sendMail({
    from: env.email.from,
    to: env.email.to,
    replyTo: data.email,
    subject: `New WazzupPAP demo request — ${data.fullName}`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0f172a;">
        <h2 style="margin:0 0 8px;color:#05245c;">New WazzupPAP demo request</h2>
        <p style="margin:0 0 20px;color:#64748b;">A visitor submitted the Request a demo form.</p>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">${rows}</table>
      </div>`,
  });

  console.info('[email] Demo request notification sent.');
}
