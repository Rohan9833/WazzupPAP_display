import { useMemo } from 'react';

function buildCells(seed) {
  const n = 21;
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  const out = [];
  let state = seed * 9301 + 49297;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      state = (state * 9301 + 49297) % 233280;
      if (!inFinder(x, y) && state / 233280 > 0.52) out.push([x, y]);
    }
  }
  return out;
}

/** Decorative QR-style glyph (not a scannable code). */
export default function QrGlyph({ className = '', color = '#011549', seed = 7 }) {
  const cells = useMemo(() => buildCells(seed), [seed]);

  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.2" fill={color} />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="0.8" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill={color} />
    </g>
  );

  return (
    <svg viewBox="-1 -1 23 23" className={className} aria-hidden="true">
      <rect x="-1" y="-1" width="23" height="23" rx="2" fill="#fff" />
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.22" fill={color} />
      ))}
    </svg>
  );
}
