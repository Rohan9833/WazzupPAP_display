import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PhoneFrame from '../mockups/PhoneFrame.jsx';
import { AppInChat } from '../mockups/AppScreens.jsx';
import ReportDocument from '../mockups/ReportDocument.jsx';
import LaptopDashboard from '../mockups/LaptopDashboard.jsx';

const STEPS = [
  {
    title: 'Secure sign-in',
    body: 'Registered MRs sign in from their own WhatsApp, verified against your field-force database.',
    visual: { kind: 'phone', screen: 'signin' },
  },
  {
    title: 'Doctor consent and test selection',
    body: 'The MR requests the doctor’s consent on WhatsApp. One tap from the doctor records it, and the MR selects the assessment.',
    visual: { kind: 'phone', screen: 'approval' },
  },
  {
    title: 'Structured assessment',
    body: 'The MR runs the therapy-specific assessment in purpose-built application screens, inside WhatsApp.',
    visual: { kind: 'phone', screen: 'assessment' },
  },
  {
    title: 'Branded report, instantly',
    body: 'A branded PDF report is generated instantly and shared with the doctor. The patient gets it by QR code or download link.',
    visual: { kind: 'phone', screen: 'report' },
  },
  {
    title: 'Brand visibility and recall',
    body: 'Your brand name and logo, in colour, on every report. Each one becomes a lasting touchpoint for your brand.',
    visual: { kind: 'report' },
  },
  {
    title: 'Dashboard and tracking',
    body: 'Head Office tracks every test, doctor and MR in real time, by region and territory.',
    visual: { kind: 'dashboard' },
  },
];

function Visual({ visual }) {
  if (visual.kind === 'phone') {
    return (
      <div className="mx-auto w-[64%] max-w-[300px] sm:w-[50%] lg:w-[300px]">
        <PhoneFrame className="!shadow-[0_60px_120px_-30px_rgb(0_0_0/0.75),0_0_0_1px_rgb(255_255_255/0.08)]" label="Sample WhatsApp screen for this step">
          <AppInChat sheet={visual.screen} />
        </PhoneFrame>
      </div>
    );
  }
  if (visual.kind === 'report') {
    return (
      <div className="relative mx-auto w-[78%] max-w-[380px]">
        <ReportDocument className="rotate-[-2deg] rounded-sm" />
      </div>
    );
  }
  return <LaptopDashboard className="mx-auto w-full max-w-[640px]" />;
}

export default function Process() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const baseId = useId();

  const go = (i) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };
  const onKeyDown = (e, i) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step) {
      e.preventDefault();
      go((i + step + STEPS.length) % STEPS.length);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      go(e.key === 'Home' ? 0 : STEPS.length - 1);
    }
  };

  return (
    <section id="how" className="surface-night grain relative overflow-hidden py-12 text-haze sm:py-32" aria-labelledby="how-title">
      <div aria-hidden className="grid-wash-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_75%_50%,black,transparent)]" />
      <div className="container-x relative">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 id="how-title" className="display-lg text-sheen pb-1">
            Initiated to completed. All on WhatsApp.
          </h2>
          <p className="lede max-w-[24em] text-[0.94rem] leading-snug sm:text-inherit lg:pb-2">
            Six steps from sign-in to Head Office insight, without a separate app, a printer or a single device to ship.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-3 lg:mt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div role="tablist" aria-orientation="vertical" aria-label="WazzupPAP process" className="flex flex-col gap-2">
            {STEPS.map((s, i) => {
              const selected = i === active;
              return (
                <div key={s.title} role="presentation" className="min-w-0">
                <button
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group grid grid-cols-[auto_1fr] gap-x-3.5 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 sm:gap-x-4 sm:px-4 sm:py-3 ${
                    selected ? 'bg-white/[0.07] ring-1 ring-inset ring-white/15' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full font-display text-[1rem] font-semibold transition-colors duration-300 ${
                      selected ? 'bg-leaf text-white shadow-[0_10px_24px_-8px_rgb(0_156_109/0.9)]' : 'bg-white/[0.06] text-white/60 ring-1 ring-inset ring-white/10'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="self-center">
                    <span className={`block font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.25rem] ${selected ? 'text-white' : 'text-white/70'}`}>
                      {s.title}
                    </span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <span className="overflow-hidden">
                        <span className="block pt-1 text-[0.92rem] leading-snug">{s.body}</span>
                      </span>
                    </span>
                  </span>
                </button>
                {selected && (
                  <div className="mt-3 lg:hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Visual visual={s.visual} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
                </div>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="hidden lg:relative lg:flex lg:min-h-[640px] lg:items-center lg:justify-center"
          >
            <div aria-hidden className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgb(0_156_109/0.32),transparent_62%)] blur-2xl" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="relative w-full"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Visual visual={STEPS[active].visual} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-4 text-center text-[0.72rem] text-haze/70 sm:mt-8 sm:text-[0.82rem] lg:text-right">
          Sample screens. Brand, doctor and MR are illustrative.
        </p>
      </div>
    </section>
  );
}
