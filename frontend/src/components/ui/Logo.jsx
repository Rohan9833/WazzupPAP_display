/**
 * Renders the official WazzupPAP logo file exactly as supplied (public/brand/wazzuppap-logo.png).
 * The file itself is never altered. The wrapper only frames it: the supplied artwork sits on a
 * white canvas with generous margins, so the frame uses object-fit to show the lockup at a
 * usable size. Always place it on a white surface, as supplied.
 */
export default function Logo({ className = '', width = 172, eager = false }) {
  return (
    <span
      className={`block overflow-hidden bg-white ${className}`}
      style={{ width, aspectRatio: '1535 / 420' }}
    >
      <img
        src={`${import.meta.env.BASE_URL}brand/wazzuppap-logo.png`}
        alt="WazzupPAP"
        width={1535}
        height={1024}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition: '50% 50.5%' }}
      />
    </span>
  );
}
