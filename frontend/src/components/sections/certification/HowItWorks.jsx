import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileText, Award, ArrowDown } from 'lucide-react';
import { FadeIn } from '../../ui/AnimationUtils';

const HowItWorks = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: 'Complete Training',
      description: 'Attend and successfully complete your chosen cybersecurity course',
      color: 'primary',
    },
    {
      icon: FileText,
      title: 'Request Certificate',
      description: 'Fill out the certificate request form with your course and batch details',
      color: 'secondary',
    },
    {
      icon: Award,
      title: 'Receive & Verify',
      description: 'Get your verified certificate via email within 2-3 business days',
      color: 'primary',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">How It Works</h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Get certified in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Arrow (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-12 -ml-6 z-0">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-theme-primary/30"
                  >
                    <ArrowDown size={24} className="rotate-[-90deg]" />
                  </motion.div>
                </div>
              )}

              {/* Connector Arrow (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-6">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-theme-primary/30"
                  >
                    <ArrowDown size={24} />
                  </motion.div>
                </div>
              )}

              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                className="neo-card p-8 text-center relative z-10 group"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                      step.color === 'secondary'
                        ? 'from-theme-secondary to-theme-secondary-dark'
                        : 'from-theme-primary to-theme-primary-dark'
                    } shadow-glow-${step.color} flex items-center justify-center text-white`}
                  >
                    <step.icon size={36} />
                  </motion.div>
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${
                      step.color === 'secondary'
                        ? 'from-theme-secondary to-theme-secondary-dark'
                        : 'from-theme-primary to-theme-primary-dark'
                    } flex items-center justify-center text-white font-black text-sm shadow-glow-${step.color}`}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-black text-theme-text-strong mb-3">{step.title}</h3>
                <p className="text-sm text-theme-text-muted font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default HowItWorks;
