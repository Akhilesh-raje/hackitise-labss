import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Hackitise Labs Logo — Component-based horizontal branding.
 * Combines the high-quality PNG icon with dynamic typography for 
 * perfect scaling and reliable theme-switching.
 *
 * Props:
 *  - size: icon height in px  (default 40)
 *  - showText: render wordmark beside the icon (default true)
 *  - className: extra wrapper classes
 *  - variant: 'auto' | 'light' | 'dark' — force a color variant
 */

const LogoMark = ({ size = 40, variant = 'auto' }) => {
  const { theme } = useTheme();
  
  // Resolve active variant
  let activeVariant = variant;
  if (variant === 'auto') {
    // If it's system theme, we need to respect the actual theme applied to root
    const root = window.document.documentElement;
    activeVariant = root.classList.contains('dark') ? 'light' : 'dark';
  }

  // Assets
  const whiteIcon = new URL('../../assets/branding/HACKITISE ICON WHITE.png', import.meta.url).href;
  const blackIcon = new URL('../../assets/branding/HACKITISE ICON BLACK.png', import.meta.url).href;

  const src = activeVariant === 'light' ? whiteIcon : blackIcon;

  return (
    <img 
      src={src} 
      alt="Hackitise Icon" 
      width={size} 
      height={size} 
      style={{ width: size, height: size, objectFit: 'contain' }} 
      className="select-none pointer-events-none"
    />
  );
};

const Logo = ({ size = 40, showText = true, className = '', variant = 'auto' }) => {
  const { theme } = useTheme();
  
  // Resolve active theme color for text
  // variant='light' means white logo (for dark bg)
  // variant='dark' means black logo (for light bg)
  let activeVariant = variant;
  if (variant === 'auto') {
    const root = window.document.documentElement;
    activeVariant = root.classList.contains('dark') ? 'light' : 'dark';
  }

  const textColor = activeVariant === 'light' ? 'text-white' : 'text-theme-text-strong';
  const mutedColor = activeVariant === 'light' ? 'text-white/60' : 'text-theme-text-muted';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} variant={variant} />
      
      {showText && (
        <div className="flex flex-col leading-none select-none">
          <span
            className={`font-black tracking-[0.16em] uppercase ${textColor}`}
            style={{ fontSize: size * 0.45 }}
          >
            Hackitise
          </span>
          <span
            className={`font-bold tracking-[0.32em] uppercase ${mutedColor}`}
            style={{ fontSize: size * 0.26 }}
          >
            Labs
          </span>
        </div>
      )}
    </div>
  );
};

/* ── Vertical logo (full stacked PNG) ── */
const LogoVertical = ({ height = 120, variant = 'auto', className = '' }) => {
  const whiteVertical = new URL('../../assets/branding/WHITE-WITHOUT-BG.png', import.meta.url).href;
  const blackVertical = new URL('../../assets/branding/BLACK-WITHOUT-Bg.png', import.meta.url).href;

  let activeVariant = variant;
  if (variant === 'auto') {
    const root = window.document.documentElement;
    activeVariant = root.classList.contains('dark') ? 'light' : 'dark';
  }

  const src = activeVariant === 'light' ? whiteVertical : blackVertical;

  return (
    <div className={className}>
      <img
        src={src}
        alt="Hackitise Labs"
        height={height}
        style={{ height, width: 'auto', objectFit: 'contain' }}
        className="select-none"
      />
    </div>
  );
};

export { LogoMark, LogoVertical };
export default Logo;
