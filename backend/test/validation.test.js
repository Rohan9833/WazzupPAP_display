import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoRequest } from '../src/validation/demoRequest.js';

const valid = {
  fullName: 'Anita Rao',
  company: 'Example Pharma Ltd',
  designation: 'Brand Manager',
  email: 'anita.rao@examplepharma.com',
  phone: '+91 98200 00000',
  message: '',
};

test('accepts a complete, valid request', () => {
  const { data, errors } = validateDemoRequest(valid);
  assert.ok(data);
  assert.deepEqual(errors, {});
});

test('requires every mandatory field', () => {
  const { data, errors } = validateDemoRequest({});
  assert.equal(data, null);
  for (const f of ['fullName', 'company', 'designation', 'email', 'phone']) assert.ok(errors[f], f);
  assert.equal(errors.message, undefined);
});

test('rejects personal email domains', () => {
  const { errors } = validateDemoRequest({ ...valid, email: 'someone@gmail.com' });
  assert.match(errors.email, /company email/);
});

test('rejects malformed phone numbers', () => {
  assert.ok(validateDemoRequest({ ...valid, phone: '12ab' }).errors.phone);
  assert.ok(validateDemoRequest({ ...valid, phone: '123' }).errors.phone);
});

test('trims and normalises input', () => {
  const { data } = validateDemoRequest({ ...valid, fullName: '  Anita   Rao ', email: 'ANITA.RAO@ExamplePharma.com ' });
  assert.equal(data.fullName, 'Anita Rao');
  assert.equal(data.email, 'anita.rao@examplepharma.com');
});

test('ignores non-string payloads safely', () => {
  const { data, errors } = validateDemoRequest({ ...valid, email: { $gt: '' } });
  assert.equal(data, null);
  assert.ok(errors.email);
});
