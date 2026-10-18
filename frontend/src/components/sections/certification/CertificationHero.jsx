import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle } from 'lucide-react';

const CertificationHero = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-theme-primary/5 via-transparent to-transparent -z-10" />

      <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-theme-primary/10 text-theme-primary-dark font-bold text-xs md:text-sm border border-theme-primary/20"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
            <Award size={16} />
          </motion.div>
          Certification Portal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-theme-text-strong leading-[1.1] tracking-tight"
        >
          Get Your <br className="hidden sm:block" />
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark uppercase tracking-widest">
              Cybersecurity Certificate
            </span>
            <motion.span
              className="absolute -bottom-1 md:-bottom-2 left-0 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-theme-text-muted leading-relaxed font-semibold max-w-2xl mx-auto"
        >
          Request, verify, and showcase your professional cybersecurity certifications
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-6"
        >
          {[
            { icon: Shield, text: 'Industry Recognized' },
            { icon: CheckCircle, text: 'Verified Credentials' },
            { icon: Award, text: 'Professional Growth' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-theme-text">
              <item.icon size={20} className="text-theme-primary" />
              <span className="font-bold text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationHero;
