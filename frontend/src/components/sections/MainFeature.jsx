import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, ShieldCheck, Activity } from 'lucide-react';
import { FadeIn, CyberGrid } from './AnimationUtils';

const MainFeature = () => {
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', msg: 'System online. Monitoring active.' },
    { id: 2, type: 'warn', msg: 'Analyzing strange payload from IP 104.28.14.9' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
        if (logs.length > 5) return;
        setLogs(prev => [...prev, { id: prev.length + 1, type: 'crit', msg: 'Threat neutralized: SQLi attempt blocked.' }]);
    }, 4000);
    return () => clearInterval(timer);
  }, [logs]);

  return (
    <div className="neo-card overflow-hidden h-full relative group p-1 w-full mt-12 md:mt-20">
      <CyberGrid />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-theme-primary/10 to-theme-secondary/20 blur-3xl rounded-full z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="glass-card w-full h-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10 lg:p-12 items-center bg-theme-bg/90">
        <FadeIn direction="left">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-[10px] md:text-xs uppercase tracking-widest w-max border border-rose-500/20 mb-4">
               <motion.span 
                 className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-500" 
                 animate={{ opacity: [1, 0.4, 1] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
               /> Live Threat Defense
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-theme-text-strong mb-6 leading-tight">
               Don't Wait for the Report.<br className="hidden sm:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary-dark to-theme-secondary-dark font-black">Watch It Stop Attacks.</span>
            </h2>
            <p className="text-theme-text-muted font-medium mb-8 text-base md:text-lg leading-relaxed">
              We don't just use tools; we build the defense intelligence. See exactly how our system interacts with and blocks ongoing zero-day threats in real-time.
            </p>
            
            <ul className="space-y-4 md:space-y-6">
              {[
                { title: 'Active AI Detection', desc: 'Predictive anomaly detection models that flag behaviors before signatures exist.', icon: ShieldCheck, color: 'primary' },
                { title: 'Automated Neutralization', desc: 'Identifies the hostile vector and automatically blackholes the incoming routing.', icon: Target, color: 'secondary' }
              ].map((feature, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="flex items-start gap-4"
                >
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-theme-bg shadow-neo-out flex items-center justify-center shrink-0 border border-theme-border/50 group/icon">
                     <feature.icon size={20} md={24} className={`text-theme-${feature.color === 'primary' ? 'primary' : 'secondary-dark'} group-hover/icon:scale-110 transition-transform`} />
                   </div>
                   <div>
                     <strong className="text-theme-text-strong text-base md:text-lg block mb-0.5 md:mb-1">{feature.title}</strong>
                     <span className="text-theme-text-muted text-xs md:text-sm">{feature.desc}</span>
                   </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </FadeIn>
        
        <FadeIn direction="right" delay={0.2}>
          <div className="relative h-full min-h-[350px] md:min-h-[400px] rounded-[1.5rem] md:rounded-[2rem] bg-[#090b10] border border-theme-primary/20 shadow-glow-primary overflow-hidden flex flex-col font-mono text-[10px] md:text-xs">
              <div className="px-5 py-3 md:px-6 md:py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <div className="flex items-center gap-2">
                      <Activity size={16} md={18} className="text-theme-primary animate-pulse" />
                      <span className="text-theme-text-inverse font-bold tracking-widest uppercase">Threat Radar</span>
                  </div>
                  <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500/20" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/20" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/50" />
                  </div>
              </div>
              
              <div className="flex-1 p-4 md:p-6 relative flex flex-col items-center justify-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border border-theme-primary/5" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 rounded-full border border-theme-primary/10" />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border border-theme-primary/20" />
                  
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-theme-primary/10 border-2 border-theme-primary flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(108,99,255,0.3)] md:shadow-[0_0_40px_rgba(108,99,255,0.4)]"
                  >
                      <Cpu size={20} md={24} className="text-theme-primary" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="absolute top-1/4 right-1/4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]" 
                  />
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute top-1/4 right-1/4 translate-x-3 -translate-y-4"
                  >
                      <div className="px-1.5 py-1 md:px-2 md:py-1 bg-rose-500/20 text-rose-500 text-[8px] md:text-[9px] rounded border border-rose-500/50 flex flex-col">
                          <span>IP: 104.28.14.9</span>
                          <span>ACT: BRUTEFORCE</span>
                      </div>
                  </motion.div>
              </div>

              <div className="h-28 md:h-32 bg-black/60 border-t border-white/5 p-3 md:p-4 overflow-hidden relative">
                  <div className="text-[8px] md:text-[10px] text-theme-primary font-bold mb-1.5 md:mb-2 uppercase tracking-wider">Terminal Logs</div>
                  <div className="space-y-1 flex flex-col">
                      {logs.map((log, i) => (
                          <motion.div 
                            key={log.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[9px] md:text-[11px] font-medium flex gap-2 md:gap-3 opacity-90"
                          >
                             <span className="text-theme-text-muted/50">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
                             <span className={`${log.type === 'info' ? 'text-theme-primary' : log.type === 'warn' ? 'text-amber-500' : 'text-rose-500'} font-bold shrink-0`}>
                                 {log.type === 'info' ? 'SYS' : log.type === 'warn' ? 'WRN' : 'CRT'}
                             </span>
                             <span className="text-gray-300 truncate">{log.msg}</span>
                          </motion.div>
                      ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />
              </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default MainFeature;
