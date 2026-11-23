import QrGlyph from './QrGlyph.jsx';

/*
  Sample branded assessment report, modelled on a real WazzupPAP GERD (FSSG) report.
  BRAND-X, the doctor and the participant are fictitious. Only part of the report is shown;
  the rest fades out so the full layout and question set are not published.
*/

const ROWS = [
  ['Do you get heartburn?', 'Sometimes', 2],
  ['Does your stomach get bloated?', 'Occasionally', 1],
  ['Does your stomach feel heavy after meals?', 'Occasionally', 1],
  ['Do you ever feel sick after meals?', 'Occasionally', 1],
  ['Do you get heartburn after meals?', 'Occasionally', 1],
  ['Do you feel full while eating meals?', 'Often', 3],
];

export default function ReportDocument({ className = '', brand = '#4b2a86', accent = '#f08a24', faded = true }) {
  return (
    <div
      className={`relative aspect-[1/1.414] overflow-hidden bg-white shadow-[0_40px_80px_-40px_rgb(1_21_73/0.5),0_2px_6px_rgb(1_21_73/0.08)] ${className}`}
      style={{ containerType: 'inline-size' }}
      role="img"
      aria-label="Sample branded GERD score report showing brand header, participant ID, doctor, total score with sub-scores, score interpretation and the first assessment responses"
    >
      <div className="flex h-full flex-col px-[6%] pt-[5%]" style={{ fontSize: '2.45cqw' }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-[1em]">
          <div className="flex-1 text-center">
            <span className="block text-[1.75em] font-bold leading-tight" style={{ color: brand }}>
              GERD Score Report
            </span>
            <span className="block text-[0.95em] font-semibold" style={{ color: brand }}>
              (FSSG-Based Assessment)
            </span>
          </div>
          <span className="rounded-[0.25em] px-[0.6em] py-[0.2em] text-[1em] font-extrabold tracking-wide text-white" style={{ background: brand }}>
            BRAND-X
          </span>
        </div>
        <div className="mt-[0.9em] flex h-[0.35em]">
          <span className="flex-1" style={{ background: brand }} />
          <span className="w-[18%]" style={{ background: accent }} />
        </div>

        <span className="mt-[1em] block text-[0.95em] font-bold text-ink">Participant No: 0008</span>
        <span className="mt-[0.4em] block px-[0.8em] py-[0.45em] text-[0.95em] font-semibold text-white" style={{ background: brand }}>
          Participant ID: BXGERD••••••0008
        </span>
        <div className="mt-[0.5em] flex border-b border-ink/10 pb-[0.5em] text-[0.95em] font-semibold text-ink">
          <span className="flex-1 border-r border-ink/20">Doctor: Dr. Anil Mehta</span>
          <span className="flex-1 pl-[1em]">Specialty: General Practice</span>
        </div>

        {/* Score */}
        <div className="mt-[0.9em] border border-[#e9c46a] bg-[#fdf6dd] px-[1em] py-[0.7em] text-center">
          <span className="block text-[1.6em] font-bold italic" style={{ color: brand }}>
            Total Score: 12
          </span>
          <span className="mt-[0.2em] block text-[0.82em] text-ink/70">Acid Reflux Symptoms Score (ARS): 6</span>
          <span className="block text-[0.82em] text-ink/70">Dysmotility / Dyspepsia Symptoms Score (DS): 6</span>
        </div>

        <ul className="mt-[0.8em] list-disc space-y-[0.15em] bg-ink/[0.05] py-[0.7em] pl-[2.2em] pr-[1em] text-[0.8em] text-ink/75">
          <li>The total score is the sum of the ARS and DS scores.</li>
          <li>Total score of 8 or more indicates probable GERD.</li>
          <li>Score 10–12 is moderate GERD.</li>
        </ul>

        {/* Responses */}
        <div className="mt-[0.9em] text-[0.82em]">
          <div className="flex px-[0.7em] py-[0.45em] font-semibold text-white" style={{ background: brand }}>
            <span className="flex-1">FSSG Assessment</span>
            <span className="w-[22%]">Frequency</span>
            <span className="w-[9%] text-right">Score</span>
          </div>
          {ROWS.map(([q, f, s], i) => (
            <div key={q} className={`flex px-[0.7em] py-[0.45em] text-ink/80 ${i % 2 ? 'bg-ink/[0.05]' : ''}`}>
              <span className="flex-1 pr-[0.5em]">{q}</span>
              <span className="w-[22%]">{f}</span>
              <span className="w-[9%] text-right">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pb-[4%]">
          <span className="text-[0.72em] text-ink/45">System generated report</span>
          <QrGlyph className="h-[5.5em] w-[5.5em]" seed={11} />
        </div>
      </div>

      {faded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[46%] items-end justify-center bg-gradient-to-t from-white from-35% via-white/90 to-transparent pb-[8%]">
          <span className="rounded-full bg-ink px-[1em] py-[0.4em] text-[2.4cqw] font-semibold text-white">Sample report</span>
        </div>
      )}
    </div>
  );
}
