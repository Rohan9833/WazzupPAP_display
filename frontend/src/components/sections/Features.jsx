import {
  MessageCircle,
  BadgeCheck,
  ShieldCheck,
  FileText,
  FlaskConical,
  Gauge,
  KeyRound,
  CalendarRange,
  PackageX,
  Megaphone,
} from 'lucide-react';

const FEATURES = [
  { icon: MessageCircle, t: '100% WhatsApp-based', d: 'No separate app, printer or hardware. Instantly accessible to every MR and doctor.' },
  { icon: BadgeCheck, t: 'Official WhatsApp Business API', d: 'Reliable message delivery, analytics and enterprise-level security on a trusted, compliant platform.' },
  { icon: ShieldCheck, t: 'Doctor consent, built in', d: 'Captured digitally inside WhatsApp, with one tap, before any assessment begins.' },
  { icon: FileText, t: 'Instant branded reports', d: 'Auto-generated PDFs with your brand name and logo in colour, shared instantly with the doctor and accessible to patients by QR code or link.' },
  { icon: FlaskConical, t: 'Customizable assessments', d: 'Any therapy- or brand-specific test: diabetes, respiratory, cardio, obesity and more.' },
  { icon: Gauge, t: 'Real-time dashboard', d: 'Track every test, doctor and MR live, with instant performance insights for your brand team.' },
  { icon: KeyRound, t: 'Access control flexibility', d: 'Restrict access to registered MRs only. You decide who runs the program and where.' },
  { icon: CalendarRange, t: 'Month-to-month subscription', d: 'No annual lock-ins. Start small, pause or scale anytime.' },
  { icon: PackageX, t: 'Zero hardware and logistics', d: 'No devices, printers or consumables. Activate instantly and reach all MRs across India.' },
  { icon: Megaphone, t: 'Always-on brand visibility', d: 'Every WhatsApp report is a recurring digital touchpoint, turning single interactions into sustained brand recall.' },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-paper py-24 sm:py-32" aria-labelledby="features-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 id="features-title" className="display-lg">
            Built for pharma brand teams
          </h2>
          <p className="lede max-w-[28em] lg:pb-2">
            Everything you need to launch, scale and measure a patient assessment program across your field force.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <li
              key={t}
              className="edge-card group relative overflow-hidden rounded-[1.25rem] p-3.5 shadow-[0_24px_50px_-40px_rgb(1_21_73/0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_34px_60px_-38px_rgb(1_21_73/0.55)] sm:p-5"
            >
              <span className="icon-gem grid h-10 w-10 place-items-center rounded-xl">
                <Icon className="h-5 w-5 text-[#7beac3]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">{t}</h3>
              <p className="mt-1.5 text-[0.9rem] leading-snug">{d}</p>
            </li>
          ))}

          <li className="surface-night grain relative overflow-hidden rounded-[1.5rem] p-7 text-haze sm:col-span-2 sm:p-8">
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf shadow-[0_12px_30px_-10px_rgb(0_156_109/0.8)]">
                <ShieldCheck className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-6 text-[1.15rem] font-semibold tracking-[-0.01em] !text-white">What “Verified” means</h3>
              <p className="mt-2 max-w-[38em] text-[0.96rem] leading-relaxed">
                Every WazzupPAP program runs with the participating doctor’s prior consent. “Verified” refers to that
                consent. It is not a clinical verification of individual responses, a diagnosis or a screening outcome.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
