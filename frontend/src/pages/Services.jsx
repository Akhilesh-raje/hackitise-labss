import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Shield, Crosshair, Globe, Smartphone, Cloud, Bot,
  FileCheck, Scale, Lock, Fingerprint, Heart,
  GraduationCap, School, Building2, Briefcase,
  FlaskConical, Lightbulb,
  Box, Search, ShieldAlert, ArrowRight, Zap, Terminal,
  ExternalLink, Cpu, Database, Eye, Wifi
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, CyberGrid } from '../components/ui/AnimationUtils';

/* ═══════════════════════════════════════════════════════════
   FLOATING CYBER ICONS (background decoration)
   ═══════════════════════════════════════════════════════════ */
const FloatingIcons = () => {
  const icons = [
    { Icon: Lock, x: '8%', y: '15%', delay: 0 },
    { Icon: Shield, x: '88%', y: '25%', delay: 1 },
    { Icon: Cpu, x: '78%', y: '65%', delay: 2 },
    { Icon: Database, x: '12%', y: '72%', delay: 0.5 },
    { Icon: Terminal, x: '50%', y: '10%', delay: 1.5 },
    { Icon: Eye, x: '92%', y: '55%', delay: 2.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5 hidden sm:block">
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-theme-primary/10"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.2, 0.08], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={28} />
        </motion.div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTION CTA BUTTON (reusable in every section)
   ═══════════════════════════════════════════════════════════ */
const SectionCTA = ({ label, href = '#contact', variant = 'primary' }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={`inline-flex items-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-sm transition-all w-full sm:w-max justify-center ${
      variant === 'primary'
        ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary hover:opacity-90'
        : 'neo-card text-theme-text-muted hover:text-theme-primary border border-theme-border hover:border-theme-primary/30'
    }`}
  >
    {label} <ArrowRight size={16} />
  </motion.a>
);

/* ═══════════════════════════════════════════════════════════
   SERVICE CARD (clean: icon → title → description)
   ═══════════════════════════════════════════════════════════ */
const ServiceCard = ({ icon: Icon, title, description, color = 'primary', badge }) => (
  <StaggerItem>
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="neo-card p-6 md:p-7 space-y-4 group cursor-default h-full relative overflow-hidden"
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        color === 'primary' ? 'from-theme-primary/5' : 'from-theme-secondary/5'
      } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          badge === 'Coming Soon'
            ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
            : 'bg-theme-primary/10 text-theme-primary border border-theme-primary/20'
        }`}>
          {badge}
        </div>
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10 }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 transition-shadow ${
          color === 'primary'
            ? 'bg-theme-primary/10 text-theme-primary group-hover:shadow-glow-primary'
            : 'bg-theme-secondary/10 text-theme-secondary group-hover:shadow-glow-secondary'
        }`}
      >
        <Icon size={24} />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-black text-theme-text-strong relative z-10">{title}</h3>

      {/* Description */}
      <p className="text-sm text-theme-text-muted font-medium leading-relaxed relative z-10">{description}</p>

      {/* Corner decoration */}
      <div className="absolute bottom-3 right-3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Icon size={56} />
      </div>
    </motion.div>
  </StaggerItem>
);

/* ═══════════════════════════════════════════════════════════
   TRAINING CARD (header strip → numbered items → CTA)
   ═══════════════════════════════════════════════════════════ */
const TrainingCard = ({ icon: Icon, title, items, color, ctaLabel }) => (
  <FadeIn>
    <motion.div whileHover={{ y: -6 }} className="neo-card overflow-hidden group relative h-full flex flex-col">
      {/* Header */}
      <div className={`px-5 py-4 md:px-7 md:py-5 border-b border-theme-border/50 bg-gradient-to-r ${
        color === 'primary' ? 'from-theme-primary/10' :
        color === 'secondary' ? 'from-theme-secondary/10' : 'from-yellow-500/10'
      } to-transparent`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center ${
            color === 'primary' ? 'bg-theme-primary/15 text-theme-primary' :
            color === 'secondary' ? 'bg-theme-secondary/15 text-theme-secondary' :
            'bg-yellow-500/15 text-yellow-400'
          }`}>
            <Icon size={20} md={22} />
          </div>
          <h3 className="text-lg md:text-xl font-black text-theme-text-strong">{title}</h3>
        </div>
      </div>

      {/* Items */}
      <div className="p-5 md:p-7 space-y-5 flex-1 flex flex-col">
        <ul className="space-y-4 flex-1">
          {items.map((item, idx) => (
            <motion.li key={idx} whileHover={{ x: 4 }} className="group/item cursor-default">
              <div className="flex items-start gap-3">
                <span className={`w-5 h-5 md:w-6 md:h-6 rounded md:rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] md:text-xs font-bold mt-0.5 ${
                  color === 'primary' ? 'bg-theme-primary/10 text-theme-primary' :
                  color === 'secondary' ? 'bg-theme-secondary/10 text-theme-secondary' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <span className="text-sm font-bold text-theme-text-strong block">{item.title}</span>
                  <span className="text-xs text-theme-text-muted mt-0.5 block">{item.desc}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {ctaLabel && (
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all w-full justify-center mt-auto ${
              color === 'primary' ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary' :
              color === 'secondary' ? 'bg-gradient-to-r from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary' :
              'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
            }`}
          >
            {ctaLabel} <ArrowRight size={14} />
          </motion.a>
        )}
      </div>
    </motion.div>
  </FadeIn>
);

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD (accent top bar → icon → name → desc)
   ═══════════════════════════════════════════════════════════ */
const ProductCard = ({ name, description, icon: Icon, color, badge }) => (
  <FadeIn>
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="neo-card p-6 md:p-8 space-y-4 md:space-y-5 group cursor-default relative overflow-hidden h-full"
    >
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        color === 'primary' ? 'from-theme-primary to-theme-primary-dark' :
        color === 'secondary' ? 'from-theme-secondary to-theme-secondary-dark' :
        'from-yellow-400 to-orange-500'
      }`} />

      {badge && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
          {badge}
        </div>
      )}

      <motion.div
        whileHover={{ rotate: 12 }}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center ${
          color === 'primary' ? 'bg-gradient-to-br from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary' :
          color === 'secondary' ? 'bg-gradient-to-br from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary' :
          'bg-gradient-to-br from-yellow-400 to-orange-500 text-black'
        }`}
      >
        <Icon size={24} md={28} />
      </motion.div>

      <h3 className="text-xl md:text-2xl font-black text-theme-text-strong relative z-10">{name}</h3>
      <p className="text-xs md:text-sm text-theme-text-muted font-medium leading-relaxed relative z-10">{description}</p>

      {/* Decorative */}
      <div className="absolute bottom-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Icon size={72} />
      </div>
    </motion.div>
  </FadeIn>
);

/* ═══════════════════════════════════════════════════════════════════
   ██  MAIN SERVICES PAGE
   ═══════════════════════════════════════════════════════════════════ */
const Services = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="space-y-0 pb-20 overflow-hidden">

      {/* ══════════════════════════════════════════
           1. HERO
         ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <CyberGrid />
        <FloatingIcons />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-theme-primary/5 via-transparent to-transparent -z-10" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-theme-primary/10 text-theme-primary-dark font-bold text-xs md:text-sm border border-theme-primary/20"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              <Shield size={14} md={16} />
            </motion.div>
            Services & Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-theme-text-strong leading-[1.1] md:leading-tight tracking-tight"
          >
            Cybersecurity Services Built for <br className="sm:hidden" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark uppercase tracking-widest">
                Real-World Threats
              </span>
              <motion.span
                className="absolute -bottom-1 md:-bottom-2 left-0 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-theme-text-muted leading-relaxed font-semibold max-w-3xl mx-auto"
          >
            From offensive security testing to compliance and training — we help organizations identify, fix, and prevent cyber risks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <SectionCTA label="Get Security Audit" />
            <SectionCTA label="Contact Us" variant="secondary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
           2. OFFENSIVE SECURITY (VAPT)
         ══════════════════════════════════════════ */}
      <section id="offensive" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/20">
                <Crosshair size={12} /> Offensive Security
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Offensive Security (VAPT & Red Teaming)
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                We break in before the attackers do. Our red team identifies every exploitable weakness across your digital attack surface.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Globe}
              title="Web & Web Application Security"
              description="Identify vulnerabilities in websites and web applications before attackers do."
              color="primary"
            />
            <ServiceCard
              icon={Smartphone}
              title="Mobile Application Security"
              description="Secure mobile apps against reverse engineering, data leaks, and exploits on Android & iOS."
              color="secondary"
            />
            <ServiceCard
              icon={Wifi}
              title="API Security Testing"
              description="Detect insecure endpoints, authentication flaws, and data exposure risks in REST & GraphQL APIs."
              color="primary"
            />
            <ServiceCard
              icon={Cloud}
              title="Cloud Security"
              description="Assess misconfigurations, access control issues, and cloud infrastructure risks across AWS, Azure & GCP."
              color="secondary"
            />
            <ServiceCard
              icon={Bot}
              title="AI Security"
              description="Analyze vulnerabilities in AI systems and models to prevent misuse and exploitation."
              color="primary"
              badge="New"
            />
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="text-center pt-4">
              <SectionCTA label="Request VAPT Assessment" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           3. COMPLIANCE & GAP ANALYSIS
         ══════════════════════════════════════════ */}
      <section id="compliance" className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4 space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Scale size={12} /> Compliance
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Compliance & Risk Management (Gap Analysis)
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Navigate the regulatory maze with confidence. We assess your current posture and build a roadmap to full compliance.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Fingerprint}
              title="DPDP (India Data Protection)"
              description="Ensure compliance with India's Digital Personal Data Protection Act."
              color="secondary"
            />
            <ServiceCard
              icon={Globe}
              title="GDPR (EU)"
              description="Align systems with global data protection standards."
              color="primary"
            />
            <ServiceCard
              icon={FileCheck}
              title="ISO Standards (ISO 27001, etc.)"
              description="Implement and audit security frameworks for your organization."
              color="secondary"
            />
            <ServiceCard
              icon={Lock}
              title="Privacy by Design"
              description="Integrate privacy into system architecture from the start."
              color="primary"
            />
            <ServiceCard
              icon={Heart}
              title="HIPAA (Healthcare Security)"
              description="Protect sensitive healthcare data and meet regulatory requirements."
              color="secondary"
            />
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="text-center pt-4">
              <SectionCTA label="Get Compliance Audit" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           4. TRAINING PROGRAMS
         ══════════════════════════════════════════ */}
      <section id="training" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                <GraduationCap size={12} /> Training
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Cybersecurity Training Programs
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                From classrooms to boardrooms — we train the next wave of cyber defenders with industry-ready programs.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <TrainingCard
              icon={School}
              title="Schools"
              color="primary"
              items={[
                { title: 'Hands-on Workshops', desc: 'Interactive cybersecurity learning sessions.' },
                { title: 'Awareness Programs', desc: 'Cyber hygiene and digital safety education.' },
                { title: 'NEP-Aligned Training', desc: 'Programs designed according to New Education Policy.' },
              ]}
              ctaLabel="Enquire Now"
            />
            <TrainingCard
              icon={Building2}
              title="Colleges"
              color="secondary"
              items={[
                { title: 'Placement Training', desc: 'Industry-focused cybersecurity training.' },
                { title: 'Hands-on Workshops', desc: 'Practical labs and real-world scenarios.' },
                { title: 'Skill Development (UGC Standards)', desc: 'Structured programs aligned with academic requirements.' },
              ]}
              ctaLabel="Partner With Us"
            />
            <TrainingCard
              icon={Briefcase}
              title="Corporates"
              color="accent"
              items={[
                { title: 'Customized Corporate Training', desc: 'Security awareness and advanced training for teams.' },
                { title: 'Red Team / Blue Team Exercises', desc: 'Simulated attack & defense drills.' },
                { title: 'Incident Response Drills', desc: 'Prepare your team for real-world breaches.' },
              ]}
              ctaLabel="Contact Us"
            />
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center pt-4">
              <SectionCTA label="Book Training Program" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           5. RESEARCH & DEVELOPMENT
         ══════════════════════════════════════════ */}
      <section id="rnd" className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4 space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                <FlaskConical size={12} /> R&D
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Research & Development (R&D Solutions)
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                We develop innovative cybersecurity tools and solutions to address evolving threats.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div whileHover={{ y: -4 }} className="neo-card p-10 lg:p-14 relative overflow-hidden group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-theme-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-theme-text-inverse shadow-glow-primary"
                  >
                    <FlaskConical size={28} />
                  </motion.div>
                  <h3 className="text-2xl font-black text-theme-text-strong">Building Tomorrow's Defenses</h3>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { icon: Eye, label: 'Threat Intelligence Systems' },
                    { icon: Zap, label: 'Security Automation Tools' },
                    { icon: Bot, label: 'AI-driven Defense Mechanisms' },
                  ].map((item, idx) => (
                    <StaggerItem key={idx}>
                      <motion.div
                        whileHover={{ y: -3, scale: 1.03 }}
                        className="neo-card p-5 flex flex-col items-center text-center gap-3 group/item cursor-default border border-theme-border hover:border-theme-primary/30 transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover/item:bg-theme-primary group-hover/item:text-theme-text-inverse transition-colors">
                          <item.icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-theme-text-muted group-hover/item:text-theme-text-strong transition-colors">{item.label}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           6. PRODUCTS
         ══════════════════════════════════════════ */}
      <section id="products" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Box size={12} /> Solutions
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Our Cybersecurity Products
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Purpose-built tools engineered by our R&D team to solve real-world cybersecurity challenges.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProductCard
              name="ToRoNS"
              description="Advanced cybersecurity platform for threat detection and defense. Real-time monitoring across enterprise networks."
              icon={ShieldAlert}
              color="primary"
            />
            <ProductCard
              name="PII Analyser"
              description="Tool for identifying and protecting sensitive personal data. Automated discovery, classification, and compliance reporting."
              icon={Search}
              color="secondary"
            />
            <ProductCard
              name="CII Platform"
              description="Next-generation platform for critical infrastructure protection. Continuous monitoring and regulatory compliance."
              icon={Database}
              color="accent"
              badge="Coming Soon"
            />
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center pt-4">
              <SectionCTA label="Request Demo" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           7. FINAL CTA (CONVERSION)
         ══════════════════════════════════════════ */}
      <section className="px-4 py-20">
        <FadeIn>
          <motion.div
            whileHover={{ y: -4 }}
            className="max-w-4xl mx-auto neo-card p-12 lg:p-16 text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary via-theme-secondary to-theme-primary" />

            <div className="relative z-10 space-y-8">


              <h2 className="text-3xl lg:text-4xl font-black text-theme-text-strong">
                Your systems may already be vulnerable.
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-xl mx-auto">
                Don't wait for an attack — secure your infrastructure today.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <SectionCTA label="Get Security Audit" />
                <SectionCTA label="Contact Us" variant="secondary" />
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Services;
