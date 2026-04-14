import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building, UserCheck } from 'lucide-react';
import { FadeIn } from '../ui/AnimationUtils';

const Trust = () => {
  const items = [
    { icon: Award, label: 'ISO 27001 Certified' },
    { icon: Award, label: 'ISO 9001B Certified' },
    { icon: Building, label: 'Govt Affiliated' },
    { icon: UserCheck, label: 'Top Security Mentors' },
  ];

  return (
    <FadeIn>
      <section className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-theme-border/50">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[10px] md:text-xs font-bold text-theme-text-muted uppercase tracking-widest">Recognized & Certified</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-24">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.05, y: -2 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-2 md:gap-3 cursor-default"
            >
              <item.icon className="text-theme-text-muted" size={20} md={28} />
              <span className="font-bold text-theme-text text-sm md:text-lg">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
};

export default Trust;
