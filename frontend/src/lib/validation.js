/**
 * Client-side validation for the demo request form.
 * Mirrors backend/src/validation/demoRequest.js — keep the two in step.
 * The server is the source of truth; this exists for fast, friendly feedback.
 */

export const LIMITS = {
  fullName: 80,
  company: 120,
  designation: 80,
  email: 160,
  message: 1000,
};

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.in', 'hotmail.com',
  'outlook.com', 'live.com', 'msn.com', 'icloud.com', 'me.com', 'aol.com', 'rediffmail.com',
  'proton.me', 'protonmail.com', 'ymail.com', 'gmx.com', 'zoho.com', 'mail.com',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const PHONE_ALLOWED_RE = /^\+?[\d\s()-]+$/;

export const EMPTY_FORM = {
  fullName: '',
  company: '',
  designation: '',
  email: '',
  phone: '',
  message: '',
  website: '', // honeypot
};

const collapse = (v) => (v || '').replace(/\s+/g, ' ').trim();

export function validateField(name, raw) {
  const value = name === 'message' ? (raw || '').trim() : collapse(raw);
  switch (name) {
    case 'fullName':
      if (!value) return 'Enter your full name.';
      if (value.length < 2) return 'Full name must be at least 2 characters.';
      if (value.length > LIMITS.fullName) return `Full name must be ${LIMITS.fullName} characters or fewer.`;
      if (!NAME_RE.test(value)) return 'Use letters, spaces, apostrophes, full stops or hyphens only.';
      return '';
    case 'company':
      if (!value) return 'Enter your company name.';
      if (value.length < 2) return 'Company name must be at least 2 characters.';
      if (value.length > LIMITS.company) return `Company name must be ${LIMITS.company} characters or fewer.`;
      return '';
    case 'designation':
      if (!value) return 'Enter your designation.';
      if (value.length < 2) return 'Designation must be at least 2 characters.';
      if (value.length > LIMITS.designation) return `Designation must be ${LIMITS.designation} characters or fewer.`;
      return '';
    case 'email': {
      const v = value.toLowerCase();
      if (!v) return 'Enter your work email.';
      if (v.length > LIMITS.email || !EMAIL_RE.test(v)) return 'Enter a valid email address, like name@company.com.';
      if (PERSONAL_EMAIL_DOMAINS.has(v.split('@')[1])) return 'Use your company email address rather than a personal one.';
      return '';
    }
    case 'phone': {
      const digits = value.replace(/\D/g, '');
      if (!value) return 'Enter a contact number.';
      if (!PHONE_ALLOWED_RE.test(value) || digits.length < 8 || digits.length > 15) {
        return 'Enter a valid phone number with 8–15 digits, including country code if outside India.';
      }
      return '';
    }
    case 'message':
      if (value.length > LIMITS.message) return `Message must be ${LIMITS.message} characters or fewer.`;
      return '';
    default:
      return '';
  }
}

export function validateForm(values) {
  const errors = {};
  for (const key of ['fullName', 'company', 'designation', 'email', 'phone', 'message']) {
    const msg = validateField(key, values[key]);
    if (msg) errors[key] = msg;
  }
  return errors;
}
