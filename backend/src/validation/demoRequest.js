/**
 * Server-side validation for demo requests.
 * Mirrors the rules in frontend/src/lib/validation.js — keep the two in step.
 */

export const LIMITS = {
  fullName: { min: 2, max: 80 },
  company: { min: 2, max: 120 },
  designation: { min: 2, max: 80 },
  email: { max: 160 },
  phone: { minDigits: 8, maxDigits: 15 },
  message: { max: 1000 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const PHONE_ALLOWED_RE = /^\+?[\d\s()-]+$/;

function clean(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanMultiline(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function lengthCheck(errors, field, value, label, { min, max }) {
  if (!value) {
    errors[field] = `Enter your ${label}.`;
  } else if (min && value.length < min) {
    errors[field] = `${capitalise(label)} must be at least ${min} characters.`;
  } else if (max && value.length > max) {
    errors[field] = `${capitalise(label)} must be ${max} characters or fewer.`;
  }
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * @returns {{ data: object|null, errors: Record<string,string> }}
 */
export function validateDemoRequest(body = {}) {
  const errors = {};

  const data = {
    fullName: clean(body.fullName),
    company: clean(body.company),
    designation: clean(body.designation),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    message: cleanMultiline(body.message),
  };

  lengthCheck(errors, 'fullName', data.fullName, 'full name', LIMITS.fullName);
  if (!errors.fullName && !NAME_RE.test(data.fullName)) {
    errors.fullName = 'Use letters, spaces, apostrophes, full stops or hyphens only.';
  }

  lengthCheck(errors, 'company', data.company, 'company name', LIMITS.company);
  lengthCheck(errors, 'designation', data.designation, 'designation', LIMITS.designation);

  if (!data.email) {
    errors.email = 'Enter your email address.';
  } else if (data.email.length > LIMITS.email.max || !EMAIL_RE.test(data.email)) {
    errors.email = 'Enter a valid email address, like name@company.com.';
  }

  const digits = data.phone.replace(/\D/g, '');
  if (!data.phone) {
    errors.phone = 'Enter a contact number.';
  } else if (
    !PHONE_ALLOWED_RE.test(data.phone) ||
    digits.length < LIMITS.phone.minDigits ||
    digits.length > LIMITS.phone.maxDigits
  ) {
    errors.phone = 'Enter a valid phone number with 8–15 digits, including country code if outside India.';
  }

  if (data.message.length > LIMITS.message.max) {
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;
  }

  return Object.keys(errors).length ? { data: null, errors } : { data, errors };
}
