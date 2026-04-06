import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, UserCircle } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from './AnimationUtils';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Thompson',
      role: 'CISO, FinTech Solutions',
      text: 'Hackitise Labs transformed our security posture. Their VAPT revealed vulnerabilities we didn\'t even know existed. Their response time is unmatched.',
      rating: 5,
      color: 'theme-primary'
    },
    {
      name: 'David Chen',
      role: 'Tech Lead, Global Commerce',
      text: 'The AI-powered threat detection they built for us has automated 90% of our monitoring. It\'s like having a 24/7 elite defense team in the cloud.',
      rating: 5,
      color: 'theme-secondary-dark'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Engineering Director',
      text: 'Their advanced training workshops are exactly what our team needed. Practical, hands-on, and based on real-world cyber battle scenarios.',
      rating: 5,
      color: 'theme-primary-dark'
    }
  ];

  return (
    <section className="mt-20 px-4">
      <SectionHeader title="Trusted by Global Teams" badge="Testimonials" icon={Star} />
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="neo-card p-8 group relative overflow-hidden h-full flex flex-col hover:shadow-glow-primary transition-all border border-theme-border/50 hover:border-theme-primary/30"
            >
                {/* Quote Icon Background */}
                <div className="absolute top-4 right-4 text-theme-primary/5 -z-10 group-hover:scale-110 group-hover:opacity-10 transition-all">
                  <Quote size={80} />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-theme-secondary text-theme-secondary" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-theme-text-muted italic mb-8 relative z-10 leading-relaxed text-lg">
                  "{t.text}"
                </p>

                {/* Author info */}
                <div className="mt-auto flex items-center gap-4 border-t border-theme-border/5 pt-6 relative z-10">
                   <div className={`w-12 h-12 rounded-full ${t.color === 'theme-primary' ? 'bg-theme-primary' : t.color === 'theme-secondary-dark' ? 'bg-theme-secondary-dark' : 'bg-theme-primary-dark'} flex items-center justify-center text-theme-text-inverse shadow-glow-primary`}>
                      <UserCircle size={28} />
                   </div>
                   <div>
                      <h4 className="font-bold text-theme-text-strong">{t.name}</h4>
                      <p className="text-xs text-theme-text-muted">{t.role}</p>
                   </div>
                </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default Testimonials;
