import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Cpu, CheckCircle2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, SectionHeader } from './AnimationUtils';

const Services = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Cybersecurity Consulting',
      desc: 'Designed for enterprises and startups.',
      items: ['Vulnerability Assessment', 'Penetration Testing (VAPT)', 'Incident Response'],
      result: 'Hardened infrastructure and compliance.',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Training & Education',
      desc: 'Designed for professionals and students.',
      items: ['Advanced Courses', 'Hands-on Workshops', 'Industry Certifications'],
      result: 'Job-ready practical skills.',
      color: 'secondary',
      id: 'training',
    },
    {
      icon: Cpu,
      title: 'Research & Tools',
      desc: 'Designed for defense teams.',
      items: ['Custom Security Tools', 'Threat Intelligence', 'Ongoing R&D'],
      result: 'Proactive defense mechanisms.',
      color: 'primary',
    },
  ];

  return (
    <section className="mt-12 md:mt-20" id="services">
      <SectionHeader title="What We Do" badge="Core Services" icon={ShieldCheck} />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((svc, idx) => (
          <StaggerItem key={idx}>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-6 md:p-8 flex flex-col group border border-theme-border hover:border-theme-primary hover:shadow-glow-primary bg-theme-card/80 h-full transition-colors"
              id={svc.id}
            >
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-theme-bg shadow-neo-out flex items-center justify-center text-theme-${svc.color === 'secondary' ? 'secondary-dark' : 'primary'} group-hover:bg-theme-${svc.color === 'secondary' ? 'secondary-dark' : 'primary'} group-hover:text-theme-text-inverse transition-colors delay-100`}
                >
                  <svc.icon size={28} md={32} />
                </motion.div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-theme-text-strong mb-2">{svc.title}</h3>
              <p className="text-theme-text-muted text-sm mb-6 leading-relaxed">{svc.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {svc.items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold text-theme-text">
                    <CheckCircle2 size={16} className={`text-theme-${svc.color === 'secondary' ? 'secondary-dark' : 'primary'} mt-0.5 shrink-0`} /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs md:text-sm font-bold text-theme-secondary-dark p-3 rounded-xl bg-theme-bg shadow-neo-in">
                Result: {svc.result}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default Services;
