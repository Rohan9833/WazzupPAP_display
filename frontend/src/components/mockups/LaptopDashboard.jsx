import { LayoutDashboard, Settings2, Stethoscope, ClipboardList, Users, UserCheck, Send, ShieldCheck, ShieldX, Radio, Clock, FileCheck2, Activity } from 'lucide-react';

/*
  Head Office Admin Portal on a laptop, modelled on the real portal.
  Three views: overview, doctor consent and assessments. All figures, names and
  numbers are fictitious sample data.
*/

const card = 'rounded-[0.8em] bg-white shadow-[0_1px_2px_rgb(1_21_73/0.06)]';

const SEGMENTS = [
  { label: 'No GERD', pct: 31, color: '#3db37a' },
  { label: 'Mild', pct: 18, color: '#f2b330' },
  { label: 'Moderate', pct: 27, color: '#ee7d3a' },
  { label: 'Severe', pct: 24, color: '#d9473b' },
];
const ARCS = SEGMENTS.map((s, i) => ({ ...s, offset: 25 - SEGMENTS.slice(0, i).reduce((sum, x) => sum + x.pct, 0) }));

const REGIONS = [
  ['Mumbai', 412, '#d9473b'],
  ['Delhi', 376, '#ee7d3a'],
  ['Pune', 298, '#f2b330'],
  ['Chennai', 251, '#3db37a'],
  ['Kolkata', 214, '#6a4bc4'],
  ['Hyderabad', 187, '#3d8bd9'],
  ['Bengaluru', 166, '#2bb3a3'],
  ['Ahmedabad', 142, '#e0569b'],
  ['Lucknow', 118, '#8a9a2b'],
];

function Donut({ total = '2,436', label = 'assessed' }) {
  return (
    <svg viewBox="0 0 42 42" className="h-full w-full" aria-hidden>
      <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgb(1 21 73 / 0.06)" strokeWidth="5" />
      {ARCS.map((s) => (
        <circle key={s.label} cx="21" cy="21" r="15.9" fill="none" stroke={s.color} strokeWidth="5" strokeDasharray={`${s.pct - 0.6} ${100 - s.pct + 0.6}`} strokeDashoffset={s.offset} />
      ))}
      <text x="21" y="21" textAnchor="middle" fontSize="6" fontWeight="700" fill="#011549">{total}</text>
      <text x="21" y="26.5" textAnchor="middle" fontSize="2.8" fill="rgb(1 21 73 / 0.5)">{label}</text>
    </svg>
  );
}

function Stat({ icon: Icon, label, value, tint }) {
  return (
    <div className={`${card} flex items-center gap-[0.5em] p-[0.6em]`}>
      <span className={`grid h-[2.1em] w-[2.1em] shrink-0 place-items-center rounded-[0.5em] ${tint}`}>
        <Icon className="h-[1.05em] w-[1.05em]" />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.7em] text-ink/55">{label}</span>
        <span className="block text-[1.1em] font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}

const T = {
  green: 'bg-[#e8f7ef] text-[#0a8a5c]',
  blue: 'bg-[#eef2fb] text-[#2b4a9b]',
  amber: 'bg-[#fdf3e6] text-[#b86a10]',
  red: 'bg-[#fdecea] text-[#b03224]',
  violet: 'bg-[#f1ecfb] text-[#5b3db0]',
};

/* ---------- Overview ---------- */

function Overview() {
  const max = REGIONS[0][1];
  return (
    <>
      <div className="grid grid-cols-4 gap-[0.7em]">
        {[
          ['Assessments this month', '2,436', 'of 10,000 monthly limit', '#011549'],
          ['Participating doctors', '612', 'with prior consent', '#009c6d'],
          ['Active MRs', '148', 'across 36 HQs', '#e08a1e'],
        ].map(([l, v, n, c]) => (
          <div key={l} className={`${card} p-[0.8em]`}>
            <span className="block text-[0.75em] text-ink/55">{l}</span>
            <span className="block text-[1.65em] font-bold leading-tight" style={{ color: c }}>{v}</span>
            <span className="block text-[0.7em] text-ink/45">{n}</span>
          </div>
        ))}
        <div className={`${card} p-[0.8em]`}>
          <span className="block text-[0.75em] text-ink/55">Usage</span>
          <span className="block text-[1.65em] font-bold leading-tight text-[#6a4bc4]">24.4%</span>
          <span className="mt-[0.35em] block h-[0.35em] rounded-full bg-ink/10">
            <span className="block h-full w-[24.4%] rounded-full bg-[#6a4bc4]" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-[0.5em]">
        <Stat icon={Users} label="MRs signed in" value="96" tint={T.green} />
        <Stat icon={UserCheck} label="Doctors added" value="734" tint={T.blue} />
        <Stat icon={Send} label="Consent sent" value="701" tint={T.amber} />
        <Stat icon={ShieldCheck} label="Approved" value="612" tint={T.green} />
        <Stat icon={ShieldX} label="Declined" value="14" tint={T.red} />
        <Stat icon={Radio} label="Live camps" value="11" tint={T.violet} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.25fr] gap-[0.7em]">
        <div className={`${card} flex flex-col p-[0.9em]`}>
          <span className="text-[0.9em] font-semibold text-ink">Camp summary</span>
          <div className="mt-[0.4em] flex min-h-0 flex-1 items-center gap-[1em]">
            <div className="aspect-square h-full max-h-[13em]">
              <Donut />
            </div>
            <ul className="space-y-[0.45em] text-[0.8em]">
              {SEGMENTS.map((s) => (
                <li key={s.label} className="flex items-center gap-[0.45em] text-ink/75">
                  <span className="h-[0.7em] w-[0.7em] rounded-full" style={{ background: s.color }} />
                  {s.label} <span className="font-semibold text-ink">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${card} p-[0.9em]`}>
          <span className="text-[0.9em] font-semibold text-ink">Region-wise assessments</span>
          <div className="mt-[0.8em] space-y-[0.72em]">
            {REGIONS.map(([name, v, c]) => (
              <div key={name} className="flex items-center gap-[0.6em] text-[0.78em]">
                <span className="w-[5.5em] shrink-0 text-ink/70">{name}</span>
                <span className="relative h-[0.6em] flex-1 rounded-full bg-ink/[0.06]">
                  <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(v / max) * 100}%`, background: c }} />
                </span>
                <span className="w-[2.2em] text-right font-semibold text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Doctor consent ---------- */

const TREND_SENT = [12, 18, 15, 26, 31, 28, 35, 41, 38, 46, 52, 49, 58, 63];
const TREND_OK = [10, 15, 13, 22, 27, 25, 31, 37, 35, 41, 48, 45, 53, 59];
const toPath = (arr, max = 70) =>
  arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (arr.length - 1)) * 100} ${38 - (v / max) * 34}`).join(' ');

const CONSENTS = [
  ['Rahul Verma', 'Andheri', 'Dr. Anil Mehta', 'General Practice', '22 Nov, 10:42', 'Approved'],
  ['Sneha Kulkarni', 'Pune 02', 'Dr. Kavita Rao', 'Gastroenterology', '22 Nov, 10:15', 'Approved'],
  ['Arjun Nair', 'Chennai 01', 'Dr. S. Iyer', 'Internal Medicine', '22 Nov, 09:57', 'Pending'],
  ['Imran Shaikh', 'Delhi 03', 'Dr. P. Malhotra', 'General Practice', '21 Nov, 18:20', 'Approved'],
  ['Neha Joshi', 'Ahmedabad', 'Dr. R. Shah', 'Physician', '21 Nov, 17:02', 'Approved'],
];

function ConsentView() {
  return (
    <>
      <div className="grid grid-cols-4 gap-[0.6em]">
        <Stat icon={Send} label="Consent sent" value="701" tint={T.blue} />
        <Stat icon={ShieldCheck} label="Approved" value="612" tint={T.green} />
        <Stat icon={Clock} label="Pending" value="75" tint={T.amber} />
        <Stat icon={ShieldX} label="Declined" value="14" tint={T.red} />
      </div>
      <div className={`${card} p-[0.9em]`}>
        <div className="flex items-center justify-between">
          <span className="text-[0.9em] font-semibold text-ink">Consent trend</span>
          <span className="flex gap-[0.9em] text-[0.7em] text-ink/60">
            <span className="flex items-center gap-[0.3em]"><span className="h-[0.6em] w-[0.6em] rounded-full bg-[#3d8bd9]" />Sent</span>
            <span className="flex items-center gap-[0.3em]"><span className="h-[0.6em] w-[0.6em] rounded-full bg-[#3db37a]" />Approved</span>
          </span>
        </div>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-[0.5em] h-[7em] w-full" aria-hidden>
          {[10, 20, 30].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(1 21 73 / 0.06)" strokeWidth="0.3" />)}
          <path d={`${toPath(TREND_OK)} L100 40 L0 40 Z`} fill="rgb(61 179 122 / 0.12)" />
          <path d={toPath(TREND_SENT)} fill="none" stroke="#3d8bd9" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <path d={toPath(TREND_OK)} fill="none" stroke="#3db37a" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className={`${card} min-h-0 flex-1 overflow-hidden p-[0.9em]`}>
        <span className="text-[0.9em] font-semibold text-ink">Consent activity</span>
        <table className="mt-[0.5em] w-full text-left text-[0.72em]">
          <thead className="text-ink/50">
            <tr>{['MR', 'HQ', 'Doctor', 'Specialty', 'Consent time', 'Status'].map((h) => <th key={h} className="border-b border-ink/8 pb-[0.4em] font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="text-ink/80">
            {CONSENTS.map((r) => (
              <tr key={r[2]}>
                {r.slice(0, 5).map((c, i) => <td key={i} className="border-b border-ink/5 py-[0.45em]">{c}</td>)}
                <td className="border-b border-ink/5 py-[0.45em]">
                  <span className={`rounded-full px-[0.6em] py-[0.1em] text-[0.9em] font-semibold ${r[5] === 'Approved' ? T.green : T.amber}`}>{r[5]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Assessments ---------- */

const DAILY = [38, 52, 47, 61, 58, 72, 66, 80, 74, 91, 86, 98, 93, 104, 99, 112, 108, 96, 118, 124, 115, 131];

function AssessmentsView() {
  const max = Math.max(...DAILY);
  return (
    <>
      <div className="grid grid-cols-6 gap-[0.5em]">
        <Stat icon={ClipboardList} label="Assessed" value="2,436" tint={T.blue} />
        <Stat icon={Activity} label="Mild" value="438" tint={T.amber} />
        <Stat icon={Activity} label="Moderate" value="658" tint={T.amber} />
        <Stat icon={Activity} label="Severe" value="585" tint={T.red} />
        <Stat icon={ShieldCheck} label="Positive" value="1,681" tint={T.violet} />
        <Stat icon={FileCheck2} label="Reports generated" value="2,436" tint={T.green} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_2fr] gap-[0.7em]">
        <div className={`${card} flex flex-col p-[0.9em]`}>
          <span className="text-[0.9em] font-semibold text-ink">Outcome breakdown</span>
          <div className="mx-auto mt-[0.6em] aspect-square w-[70%]">
            <Donut />
          </div>
          <ul className="mt-[0.6em] grid grid-cols-2 gap-[0.35em] text-[0.75em]">
            {SEGMENTS.map((s) => (
              <li key={s.label} className="flex items-center gap-[0.4em] text-ink/75">
                <span className="h-[0.65em] w-[0.65em] rounded-full" style={{ background: s.color }} />
                {s.label} <span className="font-semibold text-ink">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${card} flex flex-col p-[0.9em]`}>
          <div className="flex items-center justify-between">
            <span className="text-[0.9em] font-semibold text-ink">Assessments trend (daily)</span>
            <span className="text-[0.7em] text-ink/50">Last 22 days</span>
          </div>
          <div className="mt-[0.8em] flex flex-1 items-end gap-[0.35em] border-b border-ink/10 pb-[0.2em]">
            {DAILY.map((v, i) => (
              <span key={i} className="flex flex-1 flex-col justify-end gap-[0.1em]" style={{ height: `${(v / max) * 100}%` }}>
                <span className="block flex-[0.3] rounded-t-[0.2em] bg-[#d9473b]/80" />
                <span className="block flex-[0.7] rounded-b-[0.1em] bg-[#3db37a]" />
              </span>
            ))}
          </div>
          <span className="mt-[0.5em] flex gap-[1em] text-[0.7em] text-ink/60">
            <span className="flex items-center gap-[0.3em]"><span className="h-[0.6em] w-[0.6em] rounded-full bg-[#3db37a]" />Total assessed</span>
            <span className="flex items-center gap-[0.3em]"><span className="h-[0.6em] w-[0.6em] rounded-full bg-[#d9473b]" />Severe</span>
          </span>
        </div>
      </div>
    </>
  );
}

const VIEWS = {
  overview: { title: 'GERD Assessment Dashboard', nav: 0, C: Overview },
  consent: { title: 'Doctor Consent Tracker', nav: 2, C: ConsentView },
  assessments: { title: 'Assessment Overview', nav: 3, C: AssessmentsView },
};

export default function LaptopDashboard({ className = '', view = 'overview' }) {
  const { title, nav, C } = VIEWS[view];
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label={`Sample Head Office Admin Portal: ${title}. Fictitious data.`}
    >
      <div className="relative mx-auto w-[88%] rounded-t-[1.6%_2.6%] bg-[#1b2440] p-[1.4%] pb-[1.8%] shadow-[0_40px_80px_-40px_rgb(1_21_73/0.6)]">
        <span className="absolute left-1/2 top-[0.6%] h-[1%] w-[1%] -translate-x-1/2 rounded-full bg-white/20" />
        <div className="aspect-[16/10] overflow-hidden rounded-[0.6%] bg-[#f3f5fa]" style={{ containerType: 'inline-size' }}>
          <div className="flex h-full" style={{ fontSize: '1.32cqw' }}>
            <div className="flex w-[15%] flex-col gap-[0.35em] bg-ink p-[1em] text-[0.85em]">
              <span className="text-[1.15em] font-bold tracking-wide text-white">WAZZUP PAP</span>
              <span className="mb-[0.9em] text-[0.78em] text-haze">GERD Assessment Console</span>
              {[
                [LayoutDashboard, 'Dashboard'],
                [Settings2, 'Operations'],
                [Stethoscope, 'Doctor Consent'],
                [ClipboardList, 'Assessments'],
              ].map(([Icon, item], i) => (
                <span key={item} className={`flex items-center gap-[0.5em] rounded-[0.5em] px-[0.6em] py-[0.5em] ${i === nav ? 'bg-[#5b5be6] font-semibold text-white' : 'text-haze'}`}>
                  <Icon className="h-[1.1em] w-[1.1em]" /> {item}
                </span>
              ))}
              <span className="mt-auto flex items-center gap-[0.5em] rounded-[0.6em] bg-white/[0.06] p-[0.5em]">
                <span className="grid h-[2em] w-[2em] place-items-center rounded-full bg-[#5b5be6] text-[0.8em] font-bold text-white">BM</span>
                <span className="leading-tight">
                  <span className="block text-[0.85em] font-semibold text-white">Brand Manager</span>
                  <span className="block text-[0.75em] text-haze">BRAND-X Pharma</span>
                </span>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-[0.8em] overflow-hidden p-[1.2em]">
              <div className={`${card} flex items-center justify-between px-[1.1em] py-[0.8em]`}>
                <div>
                  <span className="block text-[1.3em] font-bold text-ink">{title}</span>
                  <span className="text-[0.8em] text-ink/50">BRAND-X Pharma. Sample data.</span>
                </div>
                <div className="flex items-center gap-[0.4em] text-[0.8em]">
                  {['All regions', 'This month'].map((f) => (
                    <span key={f} className="rounded-[0.5em] bg-[#f3f5fa] px-[0.8em] py-[0.4em] text-ink/70 ring-1 ring-ink/10">{f}</span>
                  ))}
                  <span className="rounded-[0.5em] bg-[#5b5be6] px-[0.9em] py-[0.4em] font-semibold text-white">Export PDF</span>
                </div>
              </div>
              <C />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-[2.2%] min-h-2 w-full rounded-b-[40%_100%] bg-[linear-gradient(#cfd6e4,#9aa6bf)]">
        <span className="absolute left-1/2 top-0 h-1/2 w-[12%] -translate-x-1/2 rounded-b-md bg-[#8792ad]" />
      </div>
    </div>
  );
}
