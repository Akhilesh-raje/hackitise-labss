import React from 'react';
import { Crosshair, ShieldAlert, Zap } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from '../ui/AnimationUtils';

const WhyYou = () => {
  const items = [
    { title: 'Real-World Combat', desc: 'Instructors and consultants who fight cybercrime daily, not just theorists.', icon: Crosshair, color: 'primary' },
    { title: 'Deep Expertise', desc: 'Specialization in DFIR, advanced red teaming, and cybercrime investigation.', icon: ShieldAlert, color: 'secondary' },
    { title: 'Practical & Accessible', desc: 'Research-based, highly practical methodologies that don\'t break the bank.', icon: Zap, color: 'primary' },
  ];

  return (
    <section className="mt-20">
      <SectionHeader 
        title="Why Hackitise Labs?" 
        subtitle="We bridge the gap between theory and actual cyber warfare." 
        badge="Differentiation" 
        icon={Zap} 
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <StaggerItem key={i}>
            <div className="neo-card p-8 group hover:-translate-y-2 hover:shadow-glow-primary transition-all text-center h-full">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-theme-bg shadow-neo-out flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                    item.color === 'secondary'
                      ? 'text-theme-secondary group-hover:bg-theme-secondary group-hover:text-white'
                      : 'text-theme-primary group-hover:bg-theme-primary group-hover:text-white'
                }`}>
                    <item.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-theme-text-strong mb-3">{item.title}</h4>
                <p className="text-theme-text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default WhyYou;
