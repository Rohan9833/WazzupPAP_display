/**
 * Device frame. Contents scale with the frame width via container query units,
 * so the same screen renders crisply at any size.
 */
export default function PhoneFrame({ children, className = '', label }) {
  return (
    <div
      className={`relative isolate aspect-[9/19] rounded-[13%/6.2%] bg-[linear-gradient(145deg,#2b3550,#0b1430_45%,#1c2742)] p-[3.2%] shadow-[0_50px_100px_-30px_rgb(1_21_73/0.55),0_18px_40px_-20px_rgb(1_21_73/0.45)] ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[1.2%] top-[20%] h-[6%] w-[1.4%] rounded-l bg-[#1c2742]" />
      <span aria-hidden className="absolute -left-[1.2%] top-[29%] h-[9%] w-[1.4%] rounded-l bg-[#1c2742]" />
      <span aria-hidden className="absolute -right-[1.2%] top-[25%] h-[12%] w-[1.4%] rounded-r bg-[#1c2742]" />
      <div
        className="relative h-full w-full overflow-hidden rounded-[10.5%/5%] bg-white"
        style={{ containerType: 'inline-size' }}
        aria-hidden={label ? true : undefined}
      >
        <div className="h-full" style={{ fontSize: '4.3cqw' }}>
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-30 flex h-[2.6em] items-center justify-between px-[1.9em] text-[0.82em] font-semibold text-ink">
            <span>9:41</span>
            <span className="flex items-center gap-[0.35em]">
              <svg viewBox="0 0 18 12" className="h-[0.85em]" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5" width="3" height="7" rx="1" />
                <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <span className="inline-block h-[0.95em] w-[1.9em] rounded-[0.3em] ring-1 ring-ink/70 p-[0.12em]">
                <span className="block h-full w-[78%] rounded-[0.15em] bg-ink" />
              </span>
            </span>
          </div>
          {/* dynamic island */}
          <div className="absolute left-1/2 top-[0.6em] z-40 h-[1.75em] w-[6.6em] -translate-x-1/2 rounded-full bg-[#050a18]" />
          {children}
        </div>
      </div>
    </div>
  );
}
