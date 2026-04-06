import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ──── Fade In When Visible ──── */
export const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: 40 }, right: { x: -40 }, none: {} };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

/* ──── Stagger Container ──── */
export const StaggerContainer = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  );
};

/* ──── Stagger Item ──── */
export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    }}
  >
    {children}
  </motion.div>
);

/* ──── Animated Counter ──── */
export const AnimatedCounter = ({ target, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const step = Math.max(end / (duration / 16), 1);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-theme-text-muted font-bold uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
};

/* ──── Cyber Grid Background ──── */
export const CyberGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cybergrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-theme-primary" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cybergrid)" />
    </svg>
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-primary/40 to-transparent"
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

/* ──── Section Header ──── */
export const SectionHeader = ({ badge, title, subtitle, icon: Icon }) => (
  <FadeIn>
    <div className="text-center space-y-4 mb-16">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
          {Icon && <Icon size={12} />} {badge}
        </div>
      )}
      <h2 className="text-3xl lg:text-4xl font-black text-theme-text-strong">{title}</h2>
      {subtitle && <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  </FadeIn>
);
