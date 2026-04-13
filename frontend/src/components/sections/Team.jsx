import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Code } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from '../ui/AnimationUtils';
import nikunjImg from '../../assets/team/nikunj-kaushik.jpeg';
import adityaImg from '../../assets/team/aditya-jha.jpg';
import suryanshImg from '../../assets/team/suryansh-deshwal.jpeg';

const Team = () => {
  const members = [
    {
      name: 'NIKUNJ KAUSHIK',
      role: 'Co-Founder and Director',
      quote: 'Defensive dynamo — the ultimate shield against cyber chaos, making hackers think twice.',
      type: 'Defensive Dynamo',
      img: nikunjImg,
      color: 'text-theme-primary',
      bg: 'bg-theme-primary/10',
      border: 'border-theme-primary/30',
      icon: Shield
    },
    {
      name: 'ADITYA JHA',
      role: 'Co-Founder and Director',
      quote: 'Offensive Overload — wielding exploits like a magician turning vulnerabilities into victory.',
      type: 'Offensive Overload',
      img: adityaImg,
      color: 'text-theme-secondary-dark',
      bg: 'bg-theme-secondary/10',
      border: 'border-theme-secondary/30',
      icon: Zap
    },
    {
      name: 'SURYANSH DESHWAL',
      role: 'Co-Founder and CTO',
      quote: 'Code crusader — architecting resilient systems and turning complex challenges into secure, scalable solutions.',
      type: 'Code Crusader',
      img: suryanshImg,
      color: 'text-theme-primary',
      bg: 'bg-theme-primary/10',
      border: 'border-theme-primary/30',
      icon: Code
    },
  ];

  return (
    <section className="mt-20 px-4">
      <SectionHeader title="Led By Experts" badge="Core Leadership" icon={Shield} />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mt-8">
        {members.map((m, i) => (
          <StaggerItem key={i}>
            <motion.div
              whileHover={{ y: -10 }}
              className={`neo-card p-8 lg:p-10 flex flex-col items-center text-center space-y-6 group relative overflow-hidden h-full border border-transparent hover:${m.border} hover:shadow-glow-primary transition-all`}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Photo */}
              <div className="relative mb-4">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className={`w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-theme-primary shadow-glow-primary z-10 relative`}
                >
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 border-2 border-dashed border-theme-secondary/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 border border-dotted border-theme-primary/10 rounded-full"
                />
              </div>

              {/* Info */}
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-theme-text-strong tracking-tight">{m.name}</h3>
                <div className={`${m.color} font-bold text-xs lg:text-sm uppercase tracking-widest`}>{m.role}</div>
              </div>

              {/* Quote card */}
              <div className="relative glass-card p-5 lg:p-6 border border-theme-primary/10 w-full z-10 mt-auto">
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse text-[10px] font-black rounded-full uppercase tracking-tighter shadow-glow-primary`}>
                  {m.type}
                </div>
                <p className="italic text-theme-text-muted font-medium pt-2 text-sm leading-relaxed">
                  "{m.quote}"
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default Team;

