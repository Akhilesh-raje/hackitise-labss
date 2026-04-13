import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, StaggerContainer, StaggerItem } from '../ui/AnimationUtils';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    { q: 'What exact services do you provide?', a: 'We provide VAPT, incident response, advanced cyber training, and build custom security tools.' },
    { q: 'Who is this for?', a: 'Enterprises needing hardened security, and professionals wanting practical cyber combat skills.' },
    { q: 'What makes you different?', a: 'We are active practitioners in the field. Every training and consulting engagement is based on recent real-world data.' },
    { q: 'How do I contact you?', a: 'Fill out the form below or email us directly at secure@hackitiselabs.com.' },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="mt-20 max-w-4xl mx-auto px-4">
      <SectionHeader title="FAQ" badge="Common Questions" icon={HelpCircle} />
      
      <StaggerContainer className="space-y-4">
        {faqs.map((faq, i) => (
            <StaggerItem key={i}>
                <div 
                  className={`neo-card overflow-hidden transition-all duration-300 ${activeIndex === i ? 'shadow-glow-primary border-theme-primary/30' : 'hover:border-theme-primary/10'}`}
                >
                    <button 
                      onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                      className="w-full p-6 text-left flex items-center justify-between"
                    >
                        <h4 className={`text-lg font-bold flex items-center gap-4 transition-colors ${activeIndex === i ? 'text-theme-primary' : 'text-theme-text-strong'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${activeIndex === i ? 'bg-theme-primary text-theme-text-inverse' : 'bg-theme-primary/10 text-theme-primary'}`}>
                                Q
                            </span>
                            {faq.q}
                        </h4>
                        <motion.div
                          animate={{ rotate: activeIndex === i ? 180 : 0 }}
                          className="text-theme-text-muted"
                        >
                            <ChevronDown size={20} />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        {activeIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                                <p className="px-6 pb-6 text-theme-text-muted ml-12 leading-relaxed border-t border-theme-border/5 pt-4">
                                    {faq.a}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default FAQ;
