import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, MoreVertical, X, Reply, Lock, Smile, Paperclip, Camera, Mic, CheckCheck, Download } from 'lucide-react';
import LogoMark from '../ui/LogoMark.jsx';
import QrGlyph from './QrGlyph.jsx';

/*
  Conceptual WhatsApp screens, modelled on the real product experience.
  Content is illustrative sample data (BRAND-X is a placeholder brand; names are fictitious).
  Sign-in, trigger commands, full consent wording and the full question set are deliberately left out.
  All sizes are in em, relative to the phone's container-scaled font size.
*/

const Time = ({ children, ticks = false }) => (
  <span className="float-right ml-[0.6em] mt-[0.35em] flex items-center gap-[0.2em] text-[0.62em] leading-none text-ink/45">
    {children}
    {ticks && <CheckCheck className="h-[1.2em] w-[1.2em] text-[#53bdeb]" strokeWidth={2.4} />}
  </span>
);

function Header() {
  return (
    <div className="relative z-10 flex items-center gap-[0.55em] bg-white px-[0.7em] pb-[0.6em] pt-[2.9em] text-ink shadow-[0_1px_0_rgb(1_21_73/0.06)]">
      <ArrowLeft className="h-[1.25em] w-[1.25em] shrink-0 text-ink/80" />
      <LogoMark className="h-[2.25em] w-[2.25em] shrink-0 ring-1 ring-ink/10" />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[1em] font-semibold">WazzupPAP</span>
        <span className="block text-[0.68em] text-ink/50">Business account</span>
      </span>
      <MoreVertical className="h-[1.15em] w-[1.15em] shrink-0 text-ink/70" />
    </div>
  );
}

function Composer() {
  return (
    <div className="flex items-center gap-[0.45em] px-[0.5em] pb-[1.5em] pt-[0.45em]">
      <span className="flex h-[2.4em] flex-1 items-center gap-[0.5em] rounded-full bg-white px-[0.75em] text-[0.82em] text-ink/40 shadow-sm">
        <Smile className="h-[1.3em] w-[1.3em]" />
        <span className="flex-1">Message</span>
        <Paperclip className="h-[1.15em] w-[1.15em]" />
        <Camera className="h-[1.2em] w-[1.2em]" />
      </span>
      <span className="grid h-[2.3em] w-[2.3em] place-items-center rounded-full bg-[#1daa61] text-white">
        <Mic className="h-[1.1em] w-[1.1em]" />
      </span>
    </div>
  );
}

const In = ({ children, className = '' }) => (
  <div className={`max-w-[84%] rounded-[0.75em] rounded-tl-[0.15em] bg-white px-[0.7em] py-[0.5em] text-[0.74em] leading-[1.38] text-ink shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] ${className}`}>
    {children}
  </div>
);
const Out = ({ children, className = '' }) => (
  <div className={`ml-auto max-w-[80%] rounded-[0.75em] rounded-tr-[0.15em] bg-[#d9fdd3] px-[0.7em] py-[0.5em] text-[0.74em] leading-[1.38] text-ink shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] ${className}`}>
    {children}
  </div>
);
const DayChip = () => (
  <span className="mx-auto block w-fit rounded-[0.5em] bg-white/90 px-[0.7em] py-[0.2em] text-[0.62em] font-medium text-ink/55 shadow-sm">Today</span>
);

function ChatScreen({ children }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <Header />
      <div className="chat-wallpaper relative flex flex-1 flex-col justify-end gap-[0.5em] overflow-hidden px-[0.7em] pb-[0.3em] pt-[0.8em]">
        {children}
      </div>
      <div className="chat-wallpaper">
        <Composer />
      </div>
    </div>
  );
}

/* ---------- Screen 1: the assessment application (a WhatsApp Flow) ---------- */

const OPTIONS = ['Never', 'Occasionally', 'Sometimes', 'Often', 'Always'];

function Radio({ on }) {
  return (
    <span className={`grid h-[1.05em] w-[1.05em] shrink-0 place-items-center rounded-full ring-[0.12em] ${on ? 'ring-[#1daa61]' : 'ring-ink/35'}`}>
      {on && <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#1daa61]" />}
    </span>
  );
}

function Question({ n, text, selected, compact = false }) {
  return (
    <div className="border-b border-ink/8 pb-[0.4em] pt-[0.7em]">
      <p className="px-[1em] text-[0.78em] font-semibold leading-snug text-ink">
        Q{n}. {text}
      </p>
      {!compact &&
        OPTIONS.map((o, i) => (
          <div key={o} className={`flex items-center justify-between px-[1em] py-[0.42em] text-[0.74em] ${i === selected ? 'bg-[#1daa61]/[0.07]' : ''}`}>
            <span className="text-ink/80">
              {i} – {o}
            </span>
            <Radio on={i === selected} />
          </div>
        ))}
    </div>
  );
}

function AssessmentScreen({ animateIn }) {
  return (
    <>
      <ChatScreen>
        <DayChip />
        <In>
          Assessment program is active for this camp.
          <Time>11:02</Time>
        </In>
        <div className="max-w-[84%] overflow-hidden rounded-[0.75em] rounded-tl-[0.15em] bg-white text-[0.74em] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
          <p className="px-[0.7em] pt-[0.5em] leading-[1.38] text-ink">
            Start a new participant assessment.<Time>11:02</Time>
          </p>
          <span className="mt-[0.3em] block border-t border-ink/10 py-[0.5em] text-center font-semibold text-[#027eb5]">Start assessment</span>
        </div>
      </ChatScreen>
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
      <motion.div
        className="absolute inset-x-0 bottom-0 top-[15.5%] z-20 flex flex-col overflow-hidden rounded-t-[1.2em] bg-white"
        initial={animateIn ? { y: '100%' } : false}
        animate={{ y: 0 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="mx-auto mt-[0.45em] block h-[0.28em] w-[2.6em] rounded-full bg-ink/15" />
        <div className="flex items-center gap-[0.7em] px-[0.9em] pb-[0.55em] pt-[0.45em]">
          <X className="h-[1.15em] w-[1.15em] shrink-0 text-ink/70" />
          <span className="flex-1 text-center text-[0.86em] font-semibold text-ink">GERD Self-Assessment</span>
          <MoreVertical className="h-[1.05em] w-[1.05em] shrink-0 text-ink/60" />
        </div>
        <div className="h-[0.22em] bg-ink/8">
          <span className="block h-full w-[38%] bg-[#1daa61]" />
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-x-0 top-0">
            <div className="flex items-center justify-between px-[1em] pt-[0.55em] text-[0.64em] text-ink/50">
              <span>Participant 0008</span>
              <span>Section 2 of 4</span>
            </div>
              <Question n={4} text="Do you sometimes subconsciously rub your chest with your hand?" selected={1} />
              <Question n={5} text="Do you ever feel sick after meals?" selected={2} />
              <Question n={6} text="Do you get heartburn after meals?" selected={1} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[3em] bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="px-[0.9em] pb-[1.4em] pt-[0.4em]">
          <span className="flex h-[2.5em] items-center justify-center rounded-full bg-[#1daa61] text-[0.82em] font-semibold text-white">Next</span>
          <p className="mt-[0.55em] text-center text-[0.58em] text-ink/45">
            Managed by digiLATERAL. <span className="text-[#027eb5]">Learn more</span>
          </p>
        </div>
      </motion.div>
    </>
  );
}

/* ---------- Screen 2: doctor approval, as the doctor sees it ---------- */

function ApprovalScreen() {
  return (
    <ChatScreen>
      <span className="mx-auto block w-fit rounded-[0.5em] bg-white/90 px-[0.7em] py-[0.2em] text-[0.62em] font-medium text-ink/55 shadow-sm">Yesterday</span>
      <In>
        Hello Dr. Mehta. BRAND-X Pharma would like to run a GERD patient assessment program at your clinic, coordinated by
        your Medical Representative.
        <Time>18:20</Time>
      </In>
      <Out>
        Please share the details.
        <Time ticks>18:34</Time>
      </Out>
      <DayChip />
      <div className="max-w-[86%] overflow-hidden rounded-[0.75em] rounded-tl-[0.15em] bg-white text-[0.74em] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
        <div className="px-[0.7em] pt-[0.55em] leading-[1.4] text-ink">
          <span className="block font-semibold">Consent Approval</span>
          <span className="block text-ink/85">
            I, Dr. Anil Mehta, consent to BRAND-X Pharma conducting patient assessments at my clinic and to receiving
            assessment reports on WhatsApp.
          </span>
          <span className="mt-[0.3em] block text-ink/55">For clinical awareness only, not for diagnosis or treatment.</span>
          <Time>10:41</Time>
        </div>
        <span className="mt-[0.4em] flex items-center justify-center gap-[0.35em] border-t border-ink/10 py-[0.45em] font-semibold text-[#027eb5]/45">
          <Reply className="h-[1em] w-[1em]" /> I Give My Consent
        </span>
        <span className="flex items-center justify-center gap-[0.35em] border-t border-ink/10 py-[0.45em] font-semibold text-[#027eb5]/45">
          <Reply className="h-[1em] w-[1em]" /> Decline
        </span>
      </div>
      <Out>
        <span className="mb-[0.35em] block rounded-[0.4em] border-l-[0.25em] border-[#1daa61] bg-black/[0.05] px-[0.5em] py-[0.25em] text-[0.92em]">
          <span className="block font-semibold text-[#1daa61]">WazzupPAP</span>
          <span className="block truncate text-ink/55">Consent Approval</span>
        </span>
        I Give My Consent
        <Time ticks>10:42</Time>
      </Out>
      <In>
        Thank you, Dr. Mehta. Your consent has been recorded. Patient assessment programs at your clinic can now begin.
        <Time>10:42</Time>
      </In>
    </ChatScreen>
  );
}

/* ---------- Screen 3: branded report delivered ---------- */

function MiniReport() {
  // Thumbnail of the first page of a branded report.
  return (
    <div className="relative h-[8.4em] overflow-hidden bg-white px-[0.7em] pt-[0.5em] text-[0.5em]" aria-hidden>
      <div className="flex items-start justify-between">
        <span>
          <span className="block font-bold text-[#4b2a86]">GERD Score Report</span>
          <span className="block text-[0.85em] text-ink/50">FSSG-based assessment</span>
        </span>
        <span className="rounded-[0.2em] bg-[#4b2a86] px-[0.4em] py-[0.1em] text-[0.85em] font-bold text-white">BRAND-X</span>
      </div>
      <span className="mt-[0.4em] block bg-[#4b2a86] px-[0.4em] py-[0.15em] text-[0.85em] font-semibold text-white">Patient ID: BX••••••0008</span>
      <div className="mt-[0.45em] rounded-[0.2em] border border-[#e9c46a] bg-[#fdf6dd] py-[0.35em] text-center">
        <span className="block font-bold text-[1.15em] text-[#4b2a86]">Total Score: 12</span>
        <span className="block text-[0.8em] text-ink/60">ARS 6, DS 6</span>
      </div>
      {['Heartburn', 'Bloating', 'Heaviness after meals'].map((q, i) => (
        <div key={q} className={`mt-[0.2em] flex justify-between px-[0.3em] py-[0.1em] ${i % 2 ? 'bg-ink/[0.05]' : ''}`}>
          <span className="text-ink/70">{q}</span>
          <span className="text-ink/60">{[2, 1, 1][i]}</span>
        </div>
      ))}
    </div>
  );
}

function ReportScreen() {
  return (
    <ChatScreen>
      <DayChip />
      <In>
        Camp started at Mehta Clinic, Andheri. Doctor consent on record.
        <Time>10:48</Time>
      </In>
      <In>
        <span className="block font-semibold">Participant 0007: assessment complete</span>
        Report shared.
        <Time>11:01</Time>
      </In>
      <In>
        <span className="block font-semibold">Participant 0008: assessment complete</span>
        Branded report generated and shared with the doctor.
        <Time>11:09</Time>
      </In>
      <div className="max-w-[82%] overflow-hidden rounded-[0.75em] rounded-tl-[0.15em] bg-white p-[0.25em] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
        <div className="overflow-hidden rounded-[0.55em] ring-1 ring-ink/10">
          <MiniReport />
          <div className="flex items-center gap-[0.5em] bg-[#f5f6f6] px-[0.55em] py-[0.5em]">
            <span className="grid h-[1.9em] w-[1.6em] shrink-0 place-items-center rounded-[0.25em] bg-[#e5483f] text-[0.5em] font-bold text-white">PDF</span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[0.66em] font-medium text-ink">GERD_Score_Report_0008.pdf</span>
              <span className="block text-[0.56em] text-ink/50">2 pages, 186 kB</span>
            </span>
            <Download className="h-[1em] w-[1em] text-ink/50" />
          </div>
        </div>
        <span className="block px-[0.45em] pb-[0.2em] text-[0.74em]">
          <Time>11:09</Time>
          &nbsp;
        </span>
      </div>
      <In className="flex items-center gap-[0.7em] !py-[0.6em]">
        <QrGlyph className="h-[4.4em] w-[4.4em] shrink-0" seed={3} />
        <span className="leading-snug">
          <span className="block font-semibold">Patient report QR</span>
          Scan to view or download. No mobile number needed.
          <Time>11:09</Time>
        </span>
      </In>
    </ChatScreen>
  );
}

/* ---------- Secure sign-in confirmation (no login form shown) ---------- */

function SignedInScreen() {
  return (
    <ChatScreen>
      <DayChip />
      <In>
        <span className="mb-[0.2em] flex items-center gap-[0.35em] font-semibold">
          <Lock className="h-[1em] w-[1em] text-[#1daa61]" /> Signed in securely
        </span>
        Welcome, Rahul Verma. You are registered for the BRAND-X GERD program, HQ Andheri.
        <Time>09:58</Time>
      </In>
      <div className="max-w-[84%] overflow-hidden rounded-[0.75em] rounded-tl-[0.15em] bg-white text-[0.74em] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
        <p className="px-[0.7em] pt-[0.5em] leading-[1.38] text-ink">
          What would you like to do?<Time>09:58</Time>
        </p>
        {['Request doctor consent', 'Select assessment test', 'View my camps'].map((a) => (
          <span key={a} className="mt-[0.3em] flex items-center justify-center gap-[0.35em] border-t border-ink/10 py-[0.5em] font-semibold text-[#027eb5]">
            <Reply className="h-[1em] w-[1em]" /> {a}
          </span>
        ))}
      </div>
    </ChatScreen>
  );
}

const SCREENS = {
  assessment: AssessmentScreen,
  approval: ApprovalScreen,
  report: ReportScreen,
  signin: SignedInScreen,
};

/** A WhatsApp conversation showing one stage of the WazzupPAP experience. */
export function AppInChat({ sheet = 'assessment', animateIn = false }) {
  const Screen = SCREENS[sheet];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sheet}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Screen animateIn={animateIn} />
      </motion.div>
    </AnimatePresence>
  );
}

