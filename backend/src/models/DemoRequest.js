import mongoose from 'mongoose';
import { LIMITS } from '../validation/demoRequest.js';

const demoRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: LIMITS.fullName.max },
    company: { type: String, required: true, trim: true, maxlength: LIMITS.company.max },
    designation: { type: String, required: true, trim: true, maxlength: LIMITS.designation.max },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: LIMITS.email.max },
    phone: { type: String, required: true, trim: true, maxlength: 24 },
    message: { type: String, trim: true, maxlength: LIMITS.message.max, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    source: { type: String, default: 'microsite', maxlength: 40 },
    meta: {
      userAgent: { type: String, maxlength: 300 },
      referrer: { type: String, maxlength: 300 },
    },
  },
  { timestamps: true, versionKey: false },
);

demoRequestSchema.index({ createdAt: -1 });
demoRequestSchema.index({ email: 1, createdAt: -1 });

export const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
