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
  // { icon: BadgeCheck, t: 'Official WhatsApp Business API', d: 'Reliable message delivery, analytics and enterprise-level security on a trusted, compliant platform.' },
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
    <section id="features" className="relative bg-paper py-12 sm:py-16 lg:py-6" aria-labelledby="features-title">
      <div className="container-x">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-8">
          <h2 id="features-title" className="display-lg">
            Built for pharma brand teams
          </h2>
          <p className="lede max-w-[28em] lg:pb-2">
            Everything you need to launch, scale and measure a patient assessment program across your field force.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:mt-4 lg:grid-cols-4 lg:gap-2">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <li
              key={t}
              className="edge-card group relative flex items-center gap-3 overflow-hidden rounded-[1.25rem] p-3 shadow-[0_24px_50px_-40px_rgb(1_21_73/0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_34px_60px_-38px_rgb(1_21_73/0.55)] sm:gap-4 sm:p-4"
            >
              <span className="icon-gem grid h-14 w-14 shrink-0 place-items-center rounded-xl sm:h-16 sm:w-16">
                <Icon className="h-7 w-7 text-[#7beac3] sm:h-8 sm:w-8" strokeWidth={1.7} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.05rem]">{t}</h3>
                <p className="mt-1 text-[0.82rem] leading-snug sm:text-[0.9rem]">{d}</p>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}
