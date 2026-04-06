import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter, FadeIn } from './AnimationUtils';

const Proof = () => {
  return (
    <FadeIn>
      <section className="mt-12 md:mt-20 relative p-0.5 md:p-1 rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary-dark via-theme-secondary-dark to-theme-primary-dark opacity-10 blur-xl pointer-events-none" />
          
          <div className="neo-card p-8 md:p-12 lg:p-16 bg-gradient-to-br from-theme-primary-dark to-[#000000] border border-theme-primary/30 shadow-glow-primary">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10 md:divide-white/20">
                  <div className="text-center px-4 py-4 sm:py-0">
                      <AnimatedCounter target={1800000} suffix="+" label="Professionals Trained" />
                  </div>
                  <div className="text-center px-4 py-8 sm:py-0">
                      <AnimatedCounter target={15200000} suffix="+" label="Threats Analyzed" />
                  </div>
                  <div className="text-center px-4 py-4 sm:py-0">
                      <AnimatedCounter target={4200} suffix="+" label="Organizations Secured" />
                  </div>
              </div>
          </div>
      </section>
    </FadeIn>
  );
};

export default Proof;
