import QrGlyph from '../mockups/QrGlyph.jsx';
import { Stethoscope, Check, ShieldCheck, Clock, Smartphone, FileText, QrCode, Scale, Lock, MessageCircleOff } from 'lucide-react';

const doctorPoints = [
  'Requested by the MR through WazzupPAP on WhatsApp',
  'Given once, with a single tap. The tap itself is the digital confirmation',
  'Covers conducting patient assessments and receiving reports and related communication on WhatsApp',
  'Stored automatically with timestamp, mobile number and consent text',
  'Confirmed instantly by auto-reply',
];

const privacyPoints = [
  { icon: Smartphone, t: 'No patient mobile numbers are collected' },
  { icon: MessageCircleOff, t: 'Nothing is sent to the patient’s WhatsApp' },
  { icon: QrCode, t: 'Patients open their branded report from a QR code or download link' },
];

function ConsentRecord() {
  return (
    <div
      className="relative rounded-[1.5rem] bg-ink p-5 text-haze shadow-[0_40px_80px_-30px_rgb(1_21_73/0.6)] sm:p-6"
      role="img"
      aria-label="Sample stored doctor consent record with timestamp, masked mobile number and confirmation"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.85rem] font-semibold text-white">
          <ShieldCheck className="h-4 w-4 text-[#5fe0b4]" aria-hidden /> Consent record
        </span>
        <span className="rounded-full bg-leaf px-2.5 py-0.5 text-[0.72rem] font-semibold text-white">Recorded</span>
      </div>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[0.85rem]">
        <dt className="text-haze/70">Doctor</dt>
        <dd className="text-white">Dr. Anil Mehta</dd>
        <dt className="text-haze/70">Brand</dt>
        <dd className="text-white">BRAND-X Pharma</dd>
        <dt className="text-haze/70">Mobile</dt>
        <dd className="text-white">+91 98•• •••• 21</dd>
        <dt className="text-haze/70">Timestamp</dt>
        <dd className="flex items-center gap-1.5 text-white"><Clock className="h-3.5 w-3.5 text-haze/70" aria-hidden /> 22 Nov 2026, 10:42:18</dd>
        <dt className="text-haze/70">Consent text</dt>
        <dd className="flex items-center gap-1.5 text-white"><FileText className="h-3.5 w-3.5 text-haze/70" aria-hidden /> Stored with the record</dd>
      </dl>
      <div className="mt-5 rounded-xl bg-white/[0.06] px-4 py-3 text-[0.85rem] text-white ring-1 ring-inset ring-white/10">
        “Doctor consent successfully recorded.”
        <span className="mt-0.5 block text-[0.72rem] text-haze/70">Auto-reply sent on WhatsApp</span>
      </div>
      <p className="mt-3 text-[0.72rem] text-haze/60">Sample record. Fictitious details.</p>
    </div>
  );
}

export default function Consent() {
  return (
    <section id="consent" className="relative bg-paper py-24 sm:py-32" aria-labelledby="consent-title">
      <div className="container-x">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-8">
          <h2 id="consent-title" className="display-lg max-w-[18em] text-[clamp(1.35rem,4.8vw,2.25rem)] leading-tight">
            Doctor consent, captured inside WhatsApp
          </h2>
          <p className="lede max-w-[28em] lg:pb-2">
            Every program is verified by the doctor’s prior consent. Patient details stay out of it.
          </p>
        </div>

        <div className="mt-6 grid gap-3 lg:mt-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Doctor */}
          <article className="edge-card relative overflow-hidden rounded-[1.5rem] p-3 shadow-[0_30px_60px_-40px_rgb(1_21_73/0.45)] sm:p-5">
            <div className="flex items-center gap-4">
              <span className="icon-gem grid h-12 w-12 place-items-center rounded-2xl">
                <Stethoscope className="h-6 w-6 text-[#7beac3]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="display-md !text-[1.6rem]">Doctor consent</h3>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_minmax(0,17rem)] md:items-start">
              <ul className="space-y-2.5">
                {doctorPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-[1rem] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" strokeWidth={2.2} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <ConsentRecord />
            </div>
            <p className="mt-4 flex items-center gap-2 border-t border-mist pt-3 text-[0.75rem] font-medium text-ink whitespace-nowrap">
              <Scale className="h-4 w-4 shrink-0 text-leaf-deep" strokeWidth={1.8} aria-hidden />
              Aligned with UCPMP and data privacy guidelines.
            </p>
          </article>

          {/* Patient privacy */}
          <article className="surface-night grain relative overflow-hidden rounded-[1.5rem] p-3 text-haze shadow-[0_30px_60px_-30px_rgb(1_21_73/0.6)] sm:p-5">
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf shadow-[0_12px_30px_-10px_rgb(0_156_109/0.8)]">
                  <Lock className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="display-md !text-[1.6rem] !text-white">Patient privacy</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {privacyPoints.map(({ icon: Icon, t }) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-[#7beac3] ring-1 ring-inset ring-white/15">
                      <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                    </span>
                    <span className="pt-1.5 text-[1rem] leading-snug text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-white p-3 text-ink shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)] sm:p-4" aria-hidden>
                <QrGlyph className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" seed={9} />
                <span>
                  <span className="block text-[0.95rem] font-semibold">GERD Self-Assessment report</span>
                  <span className="mt-0.5 block text-[0.85rem] text-slate">BRAND-X. Participant 0008</span>
                  <span className="mt-2.5 inline-flex rounded-full bg-glass px-3 py-1 text-[0.78rem] font-semibold text-leaf-deep">Scan to open report</span>
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
