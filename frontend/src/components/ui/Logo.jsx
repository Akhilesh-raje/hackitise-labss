import React from 'react';

/**
 * Hackitise Labs Logo — SVG recreation of the brand mark.
 * Uses currentColor so it automatically adapts to light/dark themes.
 *
 * Props:
 *  - size: icon-only height in px  (default 40)
 *  - showText: render "HACKITISE LABS" beside the mark  (default true)
 *  - className: extra wrapper classes
 */

/* ── Icon-only mark (the interlocking chain-link "H") ── */
const LogoMark = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Left chain link */}
    <rect x="8" y="14" width="36" height="72" rx="18" stroke="currentColor" strokeWidth="8" />
    {/* Right chain link */}
    <rect x="56" y="14" width="36" height="72" rx="18" stroke="currentColor" strokeWidth="8" />
    {/* Horizontal bridge connecting the two */}
    <rect x="26" y="42" width="48" height="16" rx="8" fill="currentColor" />
  </svg>
);

/* ── Full logo (mark + wordmark) ── */
const Logo = ({ size = 40, showText = true, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} />
    {showText && (
      <div className="hidden sm:flex flex-col leading-none select-none">
        <span
          className="font-black tracking-[0.18em] uppercase"
          style={{ fontSize: size * 0.42 }}
        >
          Hackitise
        </span>
        <span
          className="font-bold tracking-[0.35em] uppercase text-theme-text-muted"
          style={{ fontSize: size * 0.24 }}
        >
          Labs
        </span>
      </div>
    )}
  </div>
);

export { LogoMark };
export default Logo;
