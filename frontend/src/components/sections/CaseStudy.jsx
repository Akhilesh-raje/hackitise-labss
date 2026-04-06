import React from 'react';
import { Building2, ShoppingCart, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem, SectionHeader } from './AnimationUtils';

const CaseStudy = () => {
  const cases = [
    {
      title: 'Financial Sector',
      problem: 'Critical infrastructure targeted by advanced spear-phishing.',
      action: 'Deployed proprietary AI detection and trained staff on defense protocols.',
      result: 'Prevented the attack, secured the org network within 48 hours.',
      icon: Building2,
      color: 'primary'
    },
    {
      title: 'E-Commerce',
      problem: 'Continuous data scraping and zero-day injection attempts.',
      action: 'Built a custom monitoring and detection system.',
      result: '99.9% malicious traffic blocked automatically.',
      icon: ShoppingCart,
      color: 'secondary'
    }
  ];

  return (
    <section className="mt-20">
      <SectionHeader title="Real Impact" badge="Case Studies" icon={ArrowRight} />
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <StaggerItem key={i}>
            <div className={`neo-card p-8 relative overflow-hidden group hover:border-theme-${c.color === 'primary' ? 'primary' : 'secondary-dark'} transition-all hover:shadow-glow-${c.color === 'primary' ? 'primary' : 'secondary'} h-full`}>
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-theme-${c.color === 'primary' ? 'primary' : 'secondary'}/10 rounded-full blur-2xl group-hover:bg-theme-${c.color === 'primary' ? 'primary' : 'secondary'}/20 transition-all pointer-events-none`} />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`w-12 h-12 rounded-xl border border-theme-border shadow-neo-out bg-theme-bg flex items-center justify-center text-theme-${c.color === 'primary' ? 'primary' : 'secondary-dark'} group-hover:scale-110 transition-transform`}>
                        <c.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-theme-text-strong">Case Study: {c.title}</h3>
                </div>
                
                <div className="space-y-4 text-sm relative z-10">
                    <p><strong className="text-theme-text-strong bg-theme-primary/10 px-2 py-1 rounded inline-block mb-1">Problem:</strong> <br/><span className="text-theme-text-muted">{c.problem}</span></p>
                    <p><strong className="text-theme-text-strong bg-theme-secondary/10 px-2 py-1 rounded inline-block mb-1">Action:</strong> <br/><span className="text-theme-text-muted">{c.action}</span></p>
                    <p><strong className={`text-theme-text-strong bg-theme-${c.color === 'primary' ? 'primary-dark' : 'secondary-dark'}/10 px-2 py-1 rounded inline-block mb-1`}>Result:</strong> <br/><span className={`text-theme-${c.color === 'primary' ? 'primary-dark' : 'secondary-dark'} font-bold`}>{c.result}</span></p>
                </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default CaseStudy;

