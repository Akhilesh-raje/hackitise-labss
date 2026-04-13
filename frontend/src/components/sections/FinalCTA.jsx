import React from 'react';
import { ShieldAlert, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../ui/AnimationUtils';

const FinalCTA = () => {
  return (
    <section className="mt-24 relative group overflow-hidden rounded-[4rem] p-1" id="audit">
       <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-theme-secondary-dark/20 to-theme-primary-dark/20 animate-pulse blur-3xl opacity-50" style={{animationDuration: '4s'}} />
      
      <FadeIn direction="none">
        <div className="neo-card w-full h-full relative z-10 flex flex-col items-center text-center p-12 lg:p-24 bg-[#0a0f12] border border-rose-500/20 text-white shadow-[0_0_50px_rgba(244,63,94,0.1)]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative mb-8">
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 border-4 border-rose-500 rounded-full" 
              />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="w-24 h-24 rounded-full bg-rose-500/10 border-2 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.3)] flex items-center justify-center relative z-10"
              >
                <ShieldAlert className="text-rose-500" size={48} />
              </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight"
          >
            Your system may already be <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 uppercase tracking-wider">compromised.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-2xl mb-12 font-medium text-gray-400"
          >
            Cybercriminals don't wait for your next quarterly review. Discover your zero-day vulnerabilities before they hit the dark web.
          </motion.p>
          
          <motion.a 
            whileHover={{ scale: 1.05, shadow: '0 0 50px rgba(244,63,94,0.6)' }}
            whileTap={{ scale: 0.98 }}
            href="/contact" 
            className="px-12 py-5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-lg flex items-center gap-3 shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all"
          >
            Get Free Security Scan <Crosshair size={22} className="animate-pulse" />
          </motion.a>
        </div>
      </FadeIn>
    </section>
  );
};

export default FinalCTA;
