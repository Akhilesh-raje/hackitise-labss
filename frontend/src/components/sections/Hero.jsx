import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Activity, GitBranch, Lock, Wifi, Terminal, Shield, Cpu } from 'lucide-react';
import { useRef } from 'react';

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
              href="#audit"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-theme-primary-dark to-theme-primary text-theme-text-inverse font-bold text-base md:text-lg shadow-glow-primary flex items-center justify-center gap-2"
            >
              <ShieldAlert size={20} /> Get Security Audit
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#training"
              className="px-6 py-3.5 md:px-8 md:py-4 rounded-full bg-theme-bg shadow-neo-out text-theme-secondary-dark font-bold text-base md:text-lg hover:shadow-neo-in transition-all text-center"
            >
              Start Learning
            </motion.a>
          </motion.div>
        </div>

        {/* Right Animated Cyber UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden md:flex justify-center items-center relative h-full w-full py-8"
        >
           <div className="relative w-full max-w-sm lg:max-w-md h-72 md:h-80 glass-card rounded-3xl p-6 border border-theme-primary/30 shadow-glow-primary flex flex-col justify-between overflow-hidden group">
               {/* Radar Sweep Effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-theme-primary/5 via-transparent to-theme-secondary-dark/5 opacity-50" />
               <motion.div
                 className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/20 rounded-full blur-3xl"
                 animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                 transition={{ duration: 3, repeat: Infinity }}
               />

               {/* Top Bar */}
               <div className="flex justify-between items-center relative z-10 mb-4 border-b border-theme-border/50 pb-4">
                  <div className="text-theme-primary font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-2">
                     <motion.span
                       className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-500"
                       animate={{ opacity: [1, 0.3, 1] }}
                       transition={{ duration: 1.5, repeat: Infinity }}
                     />
                     LIVE INTERCEPT
                  </div>
                  <div className="text-theme-text-muted text-[10px] md:text-xs font-mono">NODE: HX-992</div>
               </div>

               {/* Central Animation */}
               <div className="flex-1 relative z-10 flex flex-col items-center justify-center scale-90 md:scale-100">
                  <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-theme-secondary-dark flex items-center justify-center shadow-[0_0_20px_rgba(108,99,255,0.2)] md:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
                      >
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-theme-primary" />
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Activity size={24} className="text-theme-primary" />
                          </motion.div>
                      </div>
                  </div>
               </div>

               {/* Bottom Logs - Hidden on smaller tablets if needed, or just smaller text */}
               <div className="relative z-10 mt-4 md:mt-6 space-y-1.5 md:space-y-2 font-mono text-[9px] md:text-[10px] text-theme-text-muted">
                   {[
                     { prefix: 'sys', color: 'text-theme-primary', msg: 'Analyzing streams...' },
                     { prefix: 'warn', color: 'text-amber-500', msg: 'Anomaly at 192.168.1.105' },
                     { prefix: 'crit', color: 'text-rose-500', msg: 'Neutralizing breach...' }
                   ].map((log, i) => (
                     <motion.div
                       key={i}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 1 + i * 0.6 }}
                       className="flex items-center gap-2"
                     >
                       <span className={log.color}>{log.prefix}&gt;</span> {log.msg}
                       {i === 2 && <span className="text-theme-primary ml-1">OK</span>}
                     </motion.div>
                   ))}
               </div>
           </div>
           
           {/* Floating element */}
           <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
             className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 h-16 md:w-20 md:h-20 glass-card rounded-2xl flex items-center justify-center shadow-neo-out text-theme-secondary-dark"
           >
               <GitBranch size={20} md={24} />
           </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
