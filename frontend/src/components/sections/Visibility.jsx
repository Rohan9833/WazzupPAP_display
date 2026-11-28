import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QrCode, Send, Palette, Megaphone, Map, Users, Activity } from 'lucide-react';
import ReportDocument from '../mockups/ReportDocument.jsx';
import LaptopDashboard from '../mockups/LaptopDashboard.jsx';

const DASH_VIEWS = ['overview', 'consent', 'assessments'];

export default function Visibility() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);
  const view = DASH_VIEWS[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % DASH_VIEWS.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <section id="visibility" className="relative overflow-x-clip bg-white py-12 sm:py-16 lg:py-8" aria-labelledby="vis-title">
      <div className="container-x">
        {/* <div className="max-w-[46rem]">
          <h2 id="vis-title" className="display-lg !text-[clamp(1.55rem,5.5vw,2.25rem)] leading-[1.08]">
            Every assessment ends in a report. Every report adds to the picture.
          </h2>
        </div> */}

        {/* Reports */}
        {/* <div className="mt-8 grid items-center gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-6">
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
            <ul className="mt-5 space-y-3">
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
        </div> */}

        {/* Head Office */}
        <div className="surface-night grain relative mt-12 overflow-hidden rounded-[2rem] px-4 pb-4 pt-8 text-haze sm:mt-16 sm:rounded-[2.75rem] sm:px-8 sm:pb-10 sm:pt-10 lg:mt-10 lg:px-8 lg:py-6">
          <div aria-hidden className="grid-wash-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,black,transparent)]" />
          <div className="relative grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-x-10 lg:gap-y-2">
            <h3 className="display-md text-sheen max-w-[16em] !text-[clamp(1.9rem,2.5vw,2.15rem)] lg:col-start-1 lg:row-start-1">
               Head Office View 
            </h3>
            <p className="max-w-[34em] text-[0.9rem] leading-relaxed sm:text-[0.95rem] lg:col-start-1 lg:row-start-2">
              The Head Office Admin Portal is a separate web application for your brand team.  It brings assessment activity, doctor participation and field performance
              together in one place.
            </p>
          </div>

          <div
            className="relative mt-4 touch-pan-y sm:mt-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const deltaX = event.changedTouches[0]?.clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(deltaX) < 45) return;
              setActiveSlide((current) =>
                deltaX < 0
                  ? (current + 1) % DASH_VIEWS.length
                  : (current - 1 + DASH_VIEWS.length) % DASH_VIEWS.length
              );
            }}
          >
            <div aria-hidden className="absolute inset-x-[10%] bottom-[5%] top-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(0_156_109/0.35),transparent_65%)] blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <LaptopDashboard className="relative mx-auto max-w-[980px] lg:max-w-[800px] desktop-dashboard-compact" view={view} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-3 flex items-center justify-center gap-2 lg:col-start-2 lg:row-start-3 lg:mt-0" role="group" aria-label="Dashboard carousel slides">
            {DASH_VIEWS.map((slide, index) => (
              <button
                key={slide}
                type="button"
                aria-label={`Show dashboard slide ${index + 1}`}
                aria-pressed={activeSlide === index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-7 bg-[#5fe0b4]' : 'w-2 bg-white/35 hover:bg-white/60'}`}
              />
            ))}
          </div>

          <ul className="relative mx-auto mt-8 grid max-w-[980px] gap-x-6 gap-y-5 sm:grid-cols-3 lg:col-span-2 lg:row-start-4 lg:mt-5 lg:max-w-[800px]">
            {[
              { icon: Activity, t: 'Every Test, Live', d: 'Assessments, Outcomes and Reports as they happen.' },
              { icon: Users, t: 'Every Doctor', d: 'Consent sent, approved and pending, doctor by doctor.' },
              { icon: Map, t: 'Every MR and Territory', d: 'Field-force activity by MR, HQ and region.' },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex items-center gap-3 border-t border-white/15 pt-3 sm:block sm:pt-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] ring-1 ring-inset ring-white/15 sm:h-10 sm:w-10">
                  <Icon className="h-[1.1rem] w-[1.1rem] text-[#7beac3] sm:h-5 sm:w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold leading-tight text-white sm:mt-4">{t}</span>
                  <span className="mt-0.5 block text-[0.92rem] leading-snug sm:mt-1 sm:text-[0.98rem]">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="relative mx-auto text-center mt-5 max-w-[980px] text-[0.6rem] lg:col-span-2 lg:row-start-5 lg:mt-3 lg:max-w-[800px] text-haze/70">
            Sample data for illustration. No client data is shown.
          </p>
        </div>
      </div>
    </section>
  );
}
