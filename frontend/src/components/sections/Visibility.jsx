import { useState } from 'react';
import { QrCode, Send, Palette, Megaphone, Map, Users, Activity } from 'lucide-react';
import ReportDocument from '../mockups/ReportDocument.jsx';
import LaptopDashboard from '../mockups/LaptopDashboard.jsx';

const DASH_VIEWS = [
  ['overview', 'Overview'],
  ['consent', 'Doctor consent'],
  ['assessments', 'Assessments'],
];

export default function Visibility() {
  const [view, setView] = useState('overview');
  return (
    <section id="visibility" className="relative overflow-x-clip bg-white py-24 sm:py-32" aria-labelledby="vis-title">
      <div className="container-x">
        <div className="max-w-[46rem]">
          <h2 id="vis-title" className="display-lg">
            Every assessment ends in a report. Every report adds to the picture.
          </h2>
        </div>

        {/* Reports */}
        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-[420px] lg:order-2">
            <div aria-hidden className="grid-wash absolute -inset-8 rounded-[2rem] [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <ReportDocument className="relative w-[78%] rotate-[-2.5deg] rounded-sm" />
            <div
              aria-hidden
              className="absolute -bottom-6 right-0 w-[46%] rotate-[3deg] rounded-sm opacity-95 sm:-bottom-8"
            >
              <ReportDocument className="rounded-sm" brand="#0b6e8f" accent="#2bb3a3" />
            </div>
          </div>

          <div className="lg:order-1">
            <h3 className="display-md">Instant branded reports</h3>
            <p className="mt-4 max-w-[32em]">
              Every completed assessment auto-generates a PDF report with your brand name and logo in colour. The doctor
              receives it on WhatsApp, and the patient opens it from a QR code or download link.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                { icon: Palette, t: 'In your brand colours', d: 'Brand name and logo on every report, program by program.' },
                { icon: Send, t: 'Shared with the doctor', d: 'Delivered instantly to the doctor on WhatsApp.' },
                { icon: QrCode, t: 'QR code or download link', d: 'The patient scans or taps to open the report. No mobile number is collected.' },
                { icon: Megaphone, t: 'Sustained brand recall', d: 'Each report is a recurring digital touchpoint for your brand.' },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-4">
                  <span className="icon-gem grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#7beac3]">
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{t}</span>
                    <span className="block text-[0.98rem]">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Head Office */}
        <div className="surface-night grain relative mt-28 overflow-hidden rounded-[2rem] px-5 pb-12 pt-14 text-haze sm:mt-36 sm:rounded-[2.75rem] sm:px-12 sm:pb-16 sm:pt-20 lg:px-16">
          <div aria-hidden className="grid-wash-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,black,transparent)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h3 className="display-md text-sheen max-w-[16em] !text-[clamp(1.7rem,3vw,2.5rem)]">
              One Head Office view of every program, doctor and territory
            </h3>
            <p className="max-w-[34em]">
              The Head Office Admin Portal is a separate web application for your brand team. It is not the interface
              your field force uses. It brings assessment activity, doctor participation and field performance
              together in one place.
            </p>
          </div>

          <div role="tablist" aria-label="Dashboard view" className="relative mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/[0.06] p-1 ring-1 ring-inset ring-white/10 sm:mt-14">
            {DASH_VIEWS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[0.9rem] font-semibold transition-colors duration-200 sm:px-5 ${
                  view === id ? 'bg-white text-ink shadow' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative mt-8 sm:mt-10">
            <div aria-hidden className="absolute inset-x-[10%] bottom-[5%] top-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(0_156_109/0.35),transparent_65%)] blur-2xl" />
            <LaptopDashboard className="relative mx-auto max-w-[980px]" view={view} />
          </div>

          <ul className="relative mx-auto mt-14 grid max-w-[980px] gap-x-10 gap-y-8 sm:grid-cols-3">
            {[
              { icon: Activity, t: 'Every test, live', d: 'Assessments, outcomes and reports as they happen.' },
              { icon: Users, t: 'Every doctor', d: 'Consent sent, approved and pending, doctor by doctor.' },
              { icon: Map, t: 'Every MR and territory', d: 'Field-force activity by MR, HQ and region.' },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="border-t border-white/15 pt-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.07] ring-1 ring-inset ring-white/15">
                  <Icon className="h-5 w-5 text-[#7beac3]" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="mt-4 block font-semibold text-white">{t}</span>
                <span className="mt-1 block text-[0.98rem]">{d}</span>
              </li>
            ))}
          </ul>
          <p className="relative mx-auto mt-10 max-w-[980px] text-[0.82rem] text-haze/70">
            Sample data for illustration. No client data is shown.
          </p>
        </div>
      </div>
    </section>
  );
}
