/**
 * Shows the icon portion of the official logo file (unaltered) inside a round
 * frame, as a WhatsApp business-profile picture would. The image is only
 * positioned and clipped with CSS; the file itself is untouched.
 */
export default function LogoMark({ className = '' }) {
  // Icon region in the 1535x1024 source: roughly x 73–403, y 321–651 (a 330px square).
  return (
    <span className={`relative block overflow-hidden rounded-full bg-white ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}brand/wazzuppap-logo.png`}
        alt=""
        aria-hidden="true"
        className="absolute max-w-none"
        style={{ width: '465.2%', left: '-22.1%', top: '-97.3%' }}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
