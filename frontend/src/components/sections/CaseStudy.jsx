import React from 'react';
import { Building2, ShoppingCart, ArrowRight, GraduationCap } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from '../ui/AnimationUtils';
import { useApiData } from '../../hooks/useApiData';

const iconMap = { Building2, ShoppingCart, GraduationCap };

const fallbackCases = [
  {
    title: 'Financial Sector',
    problem: 'Critical infrastructural vulnerability detected by intense network pentesting.',
    action: 'Secured and updated network architecture and implemented latest protocol and versions of network devices. Added firewalls and IDS.',
    result: 'Prevented the attack, secured the org network within a week.',
    icon: 'Building2', color: 'primary',
  },
  {
    title: 'E-Commerce',
    problem: 'High-traffic platform experiencing persistent automated data scraping and sophisticated zero-day injection attempts targeting customer databases.',
    action: 'Developed a custom AI-driven behavior monitoring system. Implemented advanced WAF rules, intelligent rate limiting, and real-time anomaly detection to neutralize botnet activity.',
    result: '99.9% malicious traffic blocked automatically without impacting legitimate users.',
    icon: 'ShoppingCart', color: 'secondary',
  },
  {
    title: 'Educational Sector',
    problem: 'Reported database alteration of student marks on ERP.',
    action: 'Conducted an immediate VAPT analysis and reported 28 severe bugs. Performed code review and implemented logical temporary fixes to stop attacks.',
    result: 'University got time to update their system without getting attacked.',
    icon: 'GraduationCap', color: 'primary',
  },
];

const CaseStudy = () => {
  const { data: cases } = useApiData('/case-studies', fallbackCases);

  return (
    <section className="mt-20">
      <SectionHeader title="Real Impact" badge="Case Studies" icon={ArrowRight} />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((c, i) => {
          const CaseIcon = typeof c.icon === 'string' ? (iconMap[c.icon] || Building2) : c.icon;
          return (
          <StaggerItem key={i}>
            <div className={`neo-card p-8 relative overflow-hidden group hover:border-theme-${c.color === 'primary' ? 'primary' : 'secondary'} transition-all hover:shadow-glow-${c.color} h-full flex flex-col`}>
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-theme-${c.color === 'primary' ? 'primary' : 'secondary'}/10 rounded-full blur-2xl group-hover:bg-theme-${c.color === 'primary' ? 'primary' : 'secondary'}/20 transition-all pointer-events-none`} />

              <div className="flex items-center gap-4 mb-6 relative z-10 h-16 sm:h-auto">
                <div className={`w-12 h-12 rounded-xl border border-theme-border shadow-neo-out bg-theme-bg flex items-center justify-center shrink-0 text-theme-${c.color === 'primary' ? 'primary' : 'secondary-dark'} group-hover:scale-110 transition-transform`}>
                  <CaseIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-theme-text-strong leading-tight">Case Study: {c.title}</h3>
              </div>

              <div className="space-y-6 text-sm relative z-10 flex-1 flex flex-col">
                <p className="flex-1"><strong className="text-theme-text-strong bg-theme-primary/10 px-2 py-1 rounded inline-block mb-1">Problem:</strong> <br /><span className="text-theme-text-muted leading-relaxed">{c.problem}</span></p>
                <p className="flex-1"><strong className="text-theme-text-strong bg-theme-secondary/10 px-2 py-1 rounded inline-block mb-1">Action:</strong> <br /><span className="text-theme-text-muted leading-relaxed">{c.action}</span></p>
                <div className="mt-auto pt-4 border-t border-theme-border/30">
                  <p><strong className={`text-theme-text-strong bg-theme-${c.color === 'primary' ? 'primary-dark' : 'secondary-dark'}/10 px-2 py-1 rounded inline-block mb-1`}>Result:</strong> <br /><span className={`text-theme-${c.color === 'primary' ? 'primary-dark' : 'secondary-dark'} font-bold`}>{c.result}</span></p>
                </div>
              </div>
            </div>
          </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

export default CaseStudy;

