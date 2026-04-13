import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Lock, Wifi, Terminal, Shield, Fingerprint, Scan, Key, Eye, Database, Crosshair } from 'lucide-react';
import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const FloatingIcon = ({ Icon, x, y, delay }) => (
  <motion.div
    className="absolute text-theme-primary/10"
    style={{ left: x, top: y }}
    animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Icon size={24} />
  </motion.div>
);

const Hero = () => {
  const ref = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="neo-card w-full overflow-hidden relative min-h-[500px] flex items-center p-6 md:p-10 lg:p-12">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-theme-secondary-dark/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 border-[40px] md:border-[60px] border-theme-primary/10 rounded-full pointer-events-none blur-2xl md:blur-3xl" />

      {/* Floating cyber icons - hidden on very small screens for clarity */}
      <div className="hidden sm:block">
        <FloatingIcon Icon={Lock} x="5%" y="15%" delay={0} />
        <FloatingIcon Icon={Shield} x="92%" y="20%" delay={1} />
        <FloatingIcon Icon={Wifi} x="88%" y="75%" delay={2} />
        <FloatingIcon Icon={Terminal} x="8%" y="80%" delay={0.5} />
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-primary/30 to-transparent pointer-events-none z-0"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-5 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-theme-primary/10 text-theme-primary-dark font-bold text-xs md:text-sm shadow-neo-in w-max"
          >
             <motion.span
               className="w-2 h-2 rounded-full bg-theme-primary"
               animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
             Hackitise Labs – Cyber Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-theme-text-strong leading-[1.1] md:leading-tight tracking-tight"
          >
            We Don't Just Detect Threats &mdash;<br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark font-extrabold uppercase">
                We Neutralize Them.
              </span>
              <motion.span
                className="absolute -bottom-1 md:-bottom-2 left-0 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-theme-text-muted leading-relaxed font-semibold max-w-lg"
          >
            Advanced cybersecurity training, consulting, and AI-powered threat intelligence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 pt-4 md:pt-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/contact"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-theme-primary-dark to-theme-primary text-theme-text-inverse font-bold text-base md:text-lg shadow-glow-primary flex items-center justify-center gap-2"
            >
              <ShieldAlert size={20} /> Get Security Audit
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/services#training"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-theme-bg shadow-neo-out text-theme-secondary-dark font-bold text-base md:text-lg hover:shadow-neo-in transition-all text-center"
            >
              Start Learning
            </motion.a>
          </motion.div>
        </div>

        {/* Right Animated Logo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden md:flex justify-center items-center relative h-full w-full py-8"
        >
          <div className="relative flex items-center justify-center" style={{ width: '360px', height: '360px' }}>

            {/* === CONCENTRIC CIRCLE RIPPLES (theme-aware colors) === */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${140 + i * 50}px`,
                  height: `${140 + i * 50}px`,
                  border: `${i === 0 ? '2px' : '1.5px'} solid`,
                  borderColor: isDark
                    ? `rgba(0, 240, 255, ${0.30 - i * 0.04})`
                    : `rgba(0, 100, 160, ${0.35 - i * 0.05})`,
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: isDark
                    ? [0.4 - i * 0.05, 0.75 - i * 0.07, 0.4 - i * 0.05]
                    : [0.5 - i * 0.06, 0.85 - i * 0.08, 0.5 - i * 0.06],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }}
              />
            ))}

            {/* Expanding ripple wave (sonar ping) */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                border: isDark ? '2px solid rgba(0, 240, 255, 0.5)' : '2px solid rgba(0, 100, 160, 0.6)',
              }}
              animate={{ scale: [1, 3], opacity: [0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
            />
            {/* Second sonar ping */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                border: isDark ? '1.5px solid rgba(0, 240, 255, 0.3)' : '1.5px solid rgba(0, 100, 160, 0.4)',
              }}
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5, repeatDelay: 1 }}
            />

            {/* === CROSSHAIR OVERLAY === */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 360 360">
              {/* Crosshair lines */}
              <motion.line x1="180" y1="30" x2="180" y2="90" stroke={isDark ? 'rgba(0,240,255,0.15)' : 'rgba(0,100,160,0.2)'} strokeWidth="1" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.line x1="180" y1="270" x2="180" y2="330" stroke={isDark ? 'rgba(0,240,255,0.15)' : 'rgba(0,100,160,0.2)'} strokeWidth="1" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.line x1="30" y1="180" x2="90" y2="180" stroke={isDark ? 'rgba(0,240,255,0.15)' : 'rgba(0,100,160,0.2)'} strokeWidth="1" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.line x1="270" y1="180" x2="330" y2="180" stroke={isDark ? 'rgba(0,240,255,0.15)' : 'rgba(0,100,160,0.2)'} strokeWidth="1" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
              {/* Corner brackets */}
              <motion.path d="M60,60 L60,40 L80,40" fill="none" stroke={isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)'} strokeWidth="1.5" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
              <motion.path d="M300,60 L300,40 L280,40" fill="none" stroke={isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)'} strokeWidth="1.5" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
              <motion.path d="M60,300 L60,320 L80,320" fill="none" stroke={isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)'} strokeWidth="1.5" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 1.5 }} />
              <motion.path d="M300,300 L300,320 L280,320" fill="none" stroke={isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)'} strokeWidth="1.5" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} />
            </svg>

            {/* === ROTATING HEX GRID (subtle background) === */}
            <motion.svg
              className="absolute w-72 h-72 pointer-events-none"
              viewBox="0 0 300 300"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ opacity: isDark ? 0.06 : 0.08 }}
            >
              {/* Hexagon shapes */}
              <polygon points="150,30 190,55 190,105 150,130 110,105 110,55" fill="none" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.8" />
              <polygon points="150,170 190,195 190,245 150,270 110,245 110,195" fill="none" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.8" />
              <polygon points="220,100 260,125 260,175 220,200 180,175 180,125" fill="none" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.8" />
              <polygon points="80,100 120,125 120,175 80,200 40,175 40,125" fill="none" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.8" />
            </motion.svg>

            {/* === SCANNING SWEEP LINE === */}
            <motion.div
              className="absolute w-full h-px pointer-events-none z-10"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(0,100,160,0.5), transparent)',
              }}
              animate={{ top: ['20%', '80%', '20%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* === CYBER SECURITY ELEMENTS floating around === */}

            {/* Floating Shield icon - top right */}
            <motion.div
              className="absolute z-10"
              style={{ top: '8%', right: '5%', color: isDark ? 'rgba(0,240,255,0.3)' : 'rgba(0,100,160,0.35)' }}
              animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Shield size={22} />
            </motion.div>

            {/* Floating Lock icon - bottom left */}
            <motion.div
              className="absolute z-10"
              style={{ bottom: '12%', left: '5%', color: isDark ? 'rgba(0,240,255,0.25)' : 'rgba(0,100,160,0.3)' }}
              animate={{ y: [0, 8, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Lock size={18} />
            </motion.div>

            {/* Floating Terminal icon - top left */}
            <motion.div
              className="absolute z-10"
              style={{ top: '15%', left: '8%', color: isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.28)' }}
              animate={{ y: [0, -8, 0], x: [0, 4, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Terminal size={16} />
            </motion.div>

            {/* Floating Wifi icon - bottom right */}
            <motion.div
              className="absolute z-10"
              style={{ bottom: '8%', right: '12%', color: isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)' }}
              animate={{ y: [0, 6, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Wifi size={18} />
            </motion.div>

            {/* Floating Fingerprint - right center */}
            <motion.div
              className="absolute z-10"
              style={{ top: '35%', right: '2%', color: isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)' }}
              animate={{ y: [0, -6, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <Fingerprint size={20} />
            </motion.div>

            {/* Floating Key - left center */}
            <motion.div
              className="absolute z-10"
              style={{ top: '60%', left: '2%', color: isDark ? 'rgba(0,240,255,0.2)' : 'rgba(0,100,160,0.25)' }}
              animate={{ y: [0, 7, 0], rotate: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
              <Key size={16} />
            </motion.div>

            {/* Floating Eye - bottom center */}
            <motion.div
              className="absolute z-10"
              style={{ bottom: '3%', left: '45%', color: isDark ? 'rgba(0,240,255,0.18)' : 'rgba(0,100,160,0.22)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            >
              <Eye size={16} />
            </motion.div>

            {/* Floating Database - top center */}
            <motion.div
              className="absolute z-10"
              style={{ top: '3%', left: '55%', color: isDark ? 'rgba(0,240,255,0.18)' : 'rgba(0,100,160,0.22)' }}
              animate={{ y: [0, -5, 0], opacity: [0.1, 0.28, 0.1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <Database size={15} />
            </motion.div>

            {/* Binary text fragments */}
            {[
              { text: '01101001', top: '5%', left: '20%', delay: 0 },
              { text: '10010110', top: '90%', right: '18%', delay: 1.5 },
              { text: '11001010', top: '42%', left: '-2%', delay: 3 },
              { text: '00110111', top: '52%', right: '-2%', delay: 2 },
              { text: '01010011', top: '22%', right: '8%', delay: 1 },
              { text: '10101100', bottom: '18%', left: '18%', delay: 2.5 },
            ].map((bin, i) => (
              <motion.span
                key={`bin-${i}`}
                className="absolute font-mono text-[9px] select-none z-10"
                style={{
                  top: bin.top, left: bin.left, right: bin.right, bottom: bin.bottom,
                  color: isDark ? 'rgba(0,240,255,0.18)' : 'rgba(0,100,160,0.2)',
                }}
                animate={{ opacity: [0.05, 0.3, 0.05] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: bin.delay }}
              >
                {bin.text}
              </motion.span>
            ))}

            {/* Data node dots on the rings */}
            {[
              { angle: 30, radius: 110, size: 4, delay: 0 },
              { angle: 120, radius: 130, size: 3, delay: 1 },
              { angle: 210, radius: 95, size: 5, delay: 0.5 },
              { angle: 300, radius: 145, size: 3, delay: 2 },
              { angle: 75, radius: 155, size: 4, delay: 1.5 },
              { angle: 250, radius: 120, size: 3, delay: 2.5 },
              { angle: 160, radius: 100, size: 4, delay: 0.8 },
              { angle: 340, radius: 115, size: 3, delay: 1.8 },
            ].map((node, i) => (
              <motion.div
                key={`node-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  background: isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(0, 100, 160, 0.55)',
                  boxShadow: isDark ? '0 0 8px rgba(0, 240, 255, 0.5)' : '0 0 8px rgba(0, 100, 160, 0.4)',
                  left: `calc(50% + ${Math.cos((node.angle * Math.PI) / 180) * node.radius}px - ${node.size / 2}px)`,
                  top: `calc(50% + ${Math.sin((node.angle * Math.PI) / 180) * node.radius}px - ${node.size / 2}px)`,
                }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
              />
            ))}

            {/* Connection lines between nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: isDark ? 0.1 : 0.15 }}>
              <motion.line x1="50%" y1="25%" x2="85%" y2="40%" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.5" animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
              <motion.line x1="15%" y1="55%" x2="35%" y2="80%" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.5" animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1.5 }} />
              <motion.line x1="65%" y1="75%" x2="85%" y2="55%" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.5" animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2.5 }} />
              <motion.line x1="25%" y1="25%" x2="45%" y2="15%" stroke={isDark ? '#00f0ff' : '#006490'} strokeWidth="0.5" animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 3 }} />
            </svg>

            {/* === GLOW AURA BEHIND LOGO === */}
            <motion.div
              className="absolute z-15 rounded-full"
              style={{
                width: '140px',
                height: '140px',
                background: isDark
                  ? 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, rgba(0,240,255,0.08) 40%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0,100,160,0.15) 0%, rgba(0,100,160,0.06) 40%, transparent 70%)',
                filter: isDark ? 'blur(8px)' : 'blur(6px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Secondary glow pulse */}
            <motion.div
              className="absolute z-15 rounded-full"
              style={{
                width: '200px',
                height: '200px',
                background: isDark
                  ? 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)'
                  : 'radial-gradient(circle, rgba(0,100,160,0.06) 0%, transparent 60%)',
                filter: 'blur(12px)',
              }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* === STATIC LOGO (theme-aware: white for dark, black for light) === */}
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100, damping: 12 }}
              style={{
                filter: isDark
                  ? 'drop-shadow(0 0 20px rgba(0,240,255,0.35)) drop-shadow(0 0 40px rgba(0,240,255,0.15))'
                  : 'drop-shadow(0 0 15px rgba(0,100,160,0.2)) drop-shadow(0 0 30px rgba(0,100,160,0.08))',
              }}
            >
              <img
                src={isDark ? '/favicon.png' : '/favicon-black.png'}
                alt="Hackitise Labs"
                className="w-28 h-28 lg:w-36 lg:h-36 object-contain select-none"
                draggable="false"
              />
            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
