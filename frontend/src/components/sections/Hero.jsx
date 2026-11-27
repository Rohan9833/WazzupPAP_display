import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, FileText, Check } from 'lucide-react';
import Button from '../ui/Button.jsx';
import PhoneFrame from '../mockups/PhoneFrame.jsx';
import { AppInChat } from '../mockups/AppScreens.jsx';
import QrGlyph from '../mockups/QrGlyph.jsx';

const freeOf = ['No devices', 'No printers', 'No mobile app required'];

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" className="surface-night grain relative overflow-hidden pt-[88px] text-haze sm:pt-[104px]" aria-labelledby="hero-title">
      {/* Orbit lines behind the product */}
      <div aria-hidden className="pointer-events-none absolute right-[-12%] top-1/2 hidden aspect-square w-[62%] -translate-y-1/2 lg:block">
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[12%] rounded-full border border-white/[0.08]" />
        <div className="absolute inset-[24%] rounded-full border border-[#5fe0b4]/[0.14]" />
      </div>
      <div aria-hidden className="grid-wash-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_25%_40%,black,transparent)]" />

      <div className="container-x relative grid min-h-[calc(100svh-88px)] items-center gap-1.5 pb-5 pt-5 sm:min-h-0 sm:gap-14 sm:pb-24 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-8 lg:pt-4">
        <div className="contents lg:block">
          <motion.p
            {...rise(0)}
            className="order-1 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] py-1 pl-1.5 pr-2.5 text-[0.65rem] font-medium text-white/90 ring-1 ring-inset ring-white/15 backdrop-blur sm:gap-2 sm:py-1.5 sm:pl-2 sm:pr-4 sm:text-[0.9rem] lg:order-none"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf sm:h-6 sm:w-6">
              <ShieldCheck className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" aria-hidden />
            </span>
            Verified Patient Assessment Programs
          </motion.p>

          <motion.h1 {...rise(0.08)} id="hero-title" className="display-xl text-sheen order-2 mt-3 pb-1 text-[clamp(1.45rem,6.8vw,1.9rem)] leading-[1.08] tracking-tight sm:mt-5 sm:text-[inherit] sm:leading-[inherit] sm:tracking-[inherit] lg:order-none lg:mt-7">
            Patient Assessment Programs<br className="sm:hidden" />  Reimagined.
          </motion.h1>

          <motion.p {...rise(0.16)} className="order-3 mt-2 max-w-full font-display text-[clamp(0.7rem,3vw,0.82rem)] font-medium leading-tight tracking-[-0.015em] text-[#8ff0cc] whitespace-normal sm:mt-6 sm:text-[clamp(1.3rem,2.3vw,1.75rem)] sm:leading-snug lg:whitespace-nowrap lg:order-none">
            The convenience of WhatsApp. The power of an application.
          </motion.p>

          {/* <motion.p {...rise(0.22)} className="lede order-7 mt-2 max-w-[34em] text-[0.78rem] leading-[1.4] text-haze sm:order-5 sm:mt-5 sm:text-[inherit] sm:leading-[inherit] lg:order-none">
            A patient assessment app, built to live on WhatsApp. Doctor-approved programs run from sign-in to branded
            report without leaving the WhatsApp, and Head Office follows every test, doctor and MR in real time.
          </motion.p> */}

          <motion.div {...rise(0.3)} className="order-6 mt-3 flex flex-row gap-2 sm:mt-10 sm:gap-3 lg:order-none">
            <Button href="#demo" className="!min-h-11 min-w-0 flex-1 !whitespace-normal !px-2 text-[0.82rem] leading-tight sm:flex-none sm:!min-h-12 sm:!whitespace-nowrap sm:!px-6 sm:text-[0.98rem]">Request demo</Button>
            <Button href="#how" variant="ghostDark" className="!min-h-11 min-w-0 flex-1 !whitespace-normal !px-2 text-[0.82rem] leading-tight sm:flex-none sm:!min-h-12 sm:!whitespace-nowrap sm:!px-6 sm:text-[0.98rem]">See how it works</Button>
          </motion.div>

          {/* Compact mobile trust strip: replaces the tall list of pills */}
          {/* <motion.div {...rise(0.38)} className="order-8 mt-3 rounded-xl border border-white/10 bg-white/[0.035] px-2.5 py-2 sm:hidden">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] leading-tight text-white/75">
              {freeOf.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#5fe0b4]" strokeWidth={2.5} aria-hidden />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-2 border-t border-white/10 pt-2 text-[0.68rem] leading-relaxed text-white/55">
              <p>Official WhatsApp API · Doctor consent aligned</p>
              <p>No patient numbers · Monthly subscription</p>
            </div>
          </motion.div> */}

          {/* Existing larger-screen list is unchanged */}
          <motion.ul {...rise(0.38)} className="order-7 hidden gap-x-7 gap-y-2.5 border-t border-white/10 pt-6 text-[0.93rem] text-white/75 sm:mt-11 sm:flex sm:flex-wrap sm:pt-7 lg:order-none" aria-label="What you don't need">
            {freeOf.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#5fe0b4]" strokeWidth={2.4} aria-hidden />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.ul {...rise(0.44)} className="order-8 mt-5 hidden flex-wrap gap-2 text-[0.8rem] text-white/70 sm:mt-6 sm:flex lg:order-none" aria-label="Platform">
            {['Official WhatsApp Business API', 'UCPMP-aligned doctor consent', 'No patient mobile numbers', 'Month-to-month subscription'].map((t) => (
              <li key={t} className="rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-inset ring-white/10">{t}</li>
            ))}
          </motion.ul>
        </div>

        {/* Product composition */}
        <div className="relative order-4 mx-auto w-full max-w-[460px] lg:order-none lg:w-[115%] lg:max-w-none lg:-ml-[7.5%]">
          <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(0_156_109/0.42),transparent_60%)] blur-2xl" />
          <motion.div
            className="relative mx-auto w-[46%] max-w-[200px] sm:w-[58%] sm:max-w-[300px] lg:ml-auto lg:mr-[8%] lg:w-[48%] lg:max-w-[260px]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneFrame
              className="!shadow-[0_60px_120px_-30px_rgb(0_0_0/0.75),0_0_0_1px_rgb(255_255_255/0.08)]"
              label="WazzupPAP shown as an application screen opened inside a WhatsApp chat"
            >
              <AppInChat sheet="assessment" animateIn={!reduce} />
            </PhoneFrame>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute left-0 top-[36%] z-10 w-[42%] max-w-[200px] rounded-2xl bg-white/95 p-3.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/40 backdrop-blur sm:p-4 lg:left-[2%]"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex items-center gap-2 text-[0.8rem] font-semibold leading-none text-ink sm:text-[0.88rem]">
              <span className="grid h-8 w-8 shrink-0 place-items-center self-center rounded-full bg-leaf">
                <ShieldCheck className="h-4.5 w-4.5 text-white" />
              </span>
              Doctor Consent 
            </span>
            <span className="mt-2 block text-[0.72rem] leading-snug text-slate sm:text-[0.78rem]">Doctor consent Activity place before it begins</span>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute bottom-[5%] right-0 z-10 flex w-[46%] max-w-[225px] items-center gap-2.5 rounded-2xl bg-[#0a1f5c] p-3 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-inset ring-white/15 sm:p-3.5"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <QrGlyph className="h-12 w-12 shrink-0 self-center rounded sm:h-14 sm:w-14" seed={5} />
            <span>
              <span className="flex items-center gap-1 text-[0.72rem] font-semibold leading-tight sm:text-[0.8rem]">
                <FileText className="h-5 w-5 shrink-0 text-[#5fe0b4]" /> Branded Report
              </span>
              <span className="mt-0.5 block text-[0.66rem] leading-tight text-white/70 sm:text-[0.72rem]">By QR code or download link</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Verified consent disclaimer moved directly below the hero content */}
      <div className="container-x relative pb-6 sm:pb-10 lg:pb-2">
        <div className="surface-night grain relative overflow-hidden rounded-[1.5rem] p-7 text-haze sm:p-8">
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
        </div>
      </div>

      {/* Soft fade into the next section */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
