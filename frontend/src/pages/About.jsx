import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Target, Award, Users, MapPin, Globe, ArrowRight, Lock, Wifi, Zap, Terminal, Shield, Cpu, Database, Eye } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, CyberGrid } from '../components/ui/AnimationUtils';

// Team Image Imports
import nikunjImg from '../assets/team/nikunj-kaushik.jpeg';
import adityaImg from '../assets/team/aditya-jha.jpg';
import suryanshImg from '../assets/team/suryansh-deshwal.jpeg';
import drSaryuImg from '../assets/team/dr-saryu-mishra.jpg';
import drHnImg from '../assets/team/dr-hn-dutta.jpg';
import drDeepakImg from '../assets/team/dr-deepak.jpg';
import yugalImg from '../assets/team/yugal-pathak.avif';
import namanImg from '../assets/team/naman.jpeg'



/* ──────────────── FLOATING CYBER ICONS ──────────────── */

const FloatingIcons = () => {
  const icons = [
    { Icon: Lock, x: '10%', y: '20%', delay: 0 },
    { Icon: Shield, x: '85%', y: '30%', delay: 1 },
    { Icon: Cpu, x: '75%', y: '70%', delay: 2 },
    { Icon: Database, x: '15%', y: '75%', delay: 0.5 },
    { Icon: Terminal, x: '50%', y: '15%', delay: 1.5 },
    { Icon: Wifi, x: '90%', y: '60%', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5 hidden sm:block">
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-theme-primary/10"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={32} />
        </motion.div>
      ))}
    </div>
  );
};

/* ──────────────── TERMINAL TYPING EFFECT ──────────────── */

const TerminalBlock = () => {
  const lines = [
    '> initializing hackitise_labs...',
    '> loading threat_intelligence modules...',
    '> scanning network perimeter...',
    '> status: ALL SYSTEMS OPERATIONAL',
    '> iso_certification: VERIFIED ✓',
    '> defense_level: MAXIMUM',
  ];

  return (
    <div className="neo-card rounded-2xl overflow-hidden border border-theme-primary/20">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-theme-bg border-b border-theme-border/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="text-xs text-theme-text-muted font-mono ml-2">hackitise@labs ~ /status</span>
      </div>
      {/* Terminal body */}
      <div className="p-4 md:p-6 font-mono text-[11px] md:text-sm space-y-2 bg-theme-pure/50 min-h-[180px] md:min-h-[240px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5, duration: 0.3 }}
            className={`${line.includes('✓') ? 'text-theme-secondary' : line.includes('MAXIMUM') ? 'text-theme-primary font-bold' : 'text-theme-text-muted'}`}
          >
            {line}
            {i === lines.length - 1 && (
              <motion.span
                className="inline-block w-2 h-4 bg-theme-primary ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────── MAIN ABOUT COMPONENT ──────────────── */

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="space-y-0 pb-20 overflow-hidden">

      {/* ═══ 1. HERO ═══ */}
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
            ISO Certified Cybersecurity Firm
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-theme-text-strong leading-[1.1] md:leading-tight tracking-tight"
          >
            About{' '}
            <br className="sm:hidden" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark uppercase tracking-widest">
                Hackitise Labs
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
            HACKITISE LABS PRIVATE LIMITED is a forward-thinking ISO certified cybersecurity firm dedicated to empowering individuals and organizations in today's fast-evolving digital world.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ ANIMATED STATS BAR ═══ */}
      <section className="px-4 py-12 md:py-16 border-y border-theme-border/30 bg-theme-bg/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          <AnimatedCounter target={100} suffix="+" label="Sessions Delivered" />
          <AnimatedCounter target={10} suffix="+" label="Clients Secured" />
          <AnimatedCounter target={10000} suffix="" label="Professionals Trained" />
        </div>
      </section>

      {/* ═══ 2. WHO WE ARE ═══ */}
      <section className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                    <Zap size={12} /> Our Identity
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong">Who We Are</h2>
                </div>
                <p className="text-lg text-theme-text-muted font-medium leading-relaxed">
                  We specialize in providing comprehensive cybersecurity trainings/workshops, expert consulting, and developing innovative security tools and solutions. With a focus on raising awareness about cyber threats and making security affordable, our mission is to equip businesses of all sizes with the knowledge and resources they need to protect their digital assets with strict maintenance of precision Data Security.
                </p>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: 'Expert Consulting', desc: 'Tailored security solutions for unique client needs', icon: ShieldCheck },
                    { title: 'Precision Data', desc: 'Strict maintenance of precision Data Security', icon: Database },
                    { title: 'Affordable Access', desc: 'Making cybersecurity a right, not a luxury', icon: Lock },
                    { title: 'Innovation', desc: 'Developing cutting-edge security tools', icon: Cpu }
                  ].map((item, idx) => (
                    <StaggerItem key={idx}>
                      <div className="flex gap-4 p-5 neo-card rounded-2xl border border-theme-primary/10 hover:border-theme-primary/30 hover:shadow-glow-primary transition-all cursor-default group">
                        <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary flex-shrink-0 group-hover:bg-theme-primary group-hover:text-theme-text-inverse transition-colors">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-theme-text-strong">{item.title}</h4>
                          <p className="text-xs text-theme-text-muted mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <TerminalBlock />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 3. MISSION & GOAL ═══ */}
      <section className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Target size={12} /> Our Purpose
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong">Mission & Goal</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="neo-card p-8 md:p-10 space-y-6 relative overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                  <Target size={120} />
                </div>
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-theme-text-inverse shadow-glow-primary"
                >
                  <Target size={28} />
                </motion.div>
                <h3 className="text-3xl font-black text-theme-text-strong">Our Mission</h3>
                <p className="text-lg text-theme-text-muted leading-relaxed font-semibold">
                  To empower every individual and organizations by raising awareness about the growing cyber threats in today's digital landscape. We aim to provide cutting-edge, affordable cybersecurity solutions for everyone.
                </p>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="neo-card p-8 md:p-10 space-y-6 relative overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                  <Eye size={120} />
                </div>
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-theme-secondary to-theme-secondary-dark flex items-center justify-center text-theme-text-inverse shadow-glow-secondary"
                >
                  <Eye size={28} />
                </motion.div>
                <h3 className="text-3xl font-black text-theme-text-strong">Our Goal</h3>
                <p className="text-lg text-theme-text-muted leading-relaxed font-semibold">
                  To bridge the gap in cybersecurity awareness and defense mechanisms by offering tailored training programs, expert consulting, and innovative security tools.
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 4. WHY CHOOSE US ═══ */}
      <section className="px-4 py-24 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                <Zap size={12} /> Why Us
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">Why Choose HACKITISE LABS?</h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto italic">
                "Cybersecurity is a right, not a luxury."
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Expertise & Innovation', desc: 'Team of skilled professionals, advisors, and mentors bringing the latest industry insights.', icon: Award, color: 'primary' },
              { title: 'Holistic Approach', desc: 'From personalized training to hands-on lab setups, we offer end-to-end support.', icon: ArrowRight, color: 'secondary' },
              { title: 'Commitment to Awareness', desc: 'Educating the masses on the importance of cyber safety to stay ahead of threats.', icon: Users, color: 'primary' },
              { title: 'Affordable Solutions', desc: 'High-quality services and tools at competitive prices for businesses of all sizes.', icon: ShieldCheck, color: 'secondary' }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="neo-card p-8 space-y-4 group cursor-default h-full relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-theme-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`text-theme-${item.color} bg-theme-${item.color}/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:shadow-glow-${item.color} transition-shadow relative z-10`}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <h4 className="text-xl font-bold text-theme-text-strong leading-tight relative z-10">{item.title}</h4>
                  <p className="text-sm text-theme-text-muted font-medium leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 5. MENTORS & ADVISORS ═══ */}
      <section className="px-4 py-24 bg-theme-bg/30 border-y border-theme-border/30 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-16">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Users size={12} /> Expert Panel
              </div>
              <h2 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">Our Mentors & Advisors</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Dr. Saryu Prasad Mishra',
                role: 'Business Advisor, Startup and Research Expert',
                exp: 'Esteemed educator and researcher, former VC at DSVV and Shridhar University. Scientist at NDRI with leadership roles at NIESBUD and IEDUP. Currently an Advisor at AKTU.',
                desc: 'Dr. Mishra brings valuable insights and mentorship to enhance our research and development initiatives.',
                icon: Award,
                img: drSaryuImg
              },
              {
                name: 'Dr. H.N. Dutta',
                role: 'Honorary Mentor, R&D Expert',
                exp: 'Retired Scientist-G from National Physical Laboratory. 30+ years R&D expertise in atmospheric instrumentation and Antarctic science. Pioneer in Acoustic Sounders.',
                desc: 'Dr. Dutta provides strategic guidance in advancing cybersecurity and R&D initiatives.',
                icon: Cpu,
                img: drHnImg
              },
              {
                name: 'Naman Jain',
                role: 'Vice-Chairman Silver Line Prestige School, Director Magnum Exports',
                exp: "Education leader driving the transformation of Indian schooling by integrating global, experiential learning models to make international-quality education accessible and future-ready.",
                desc: 'Progressive learning pioneer who is on the mission to democratise the International education system.',
                icon: Shield,
                img: namanImg
              },
              {
                name: 'Dr. Deepak (D3)',
                role: 'Honorary Mentor, Cyber Forensics & Investigation',
                exp: '15+ years in Cyber Forensics, CTI, and Cybercrime Investigation. Trained over 1.8 million professionals, including law enforcement and defense.',
                desc: 'Dr. Deepak provides strategic mentorship in the advancement of cybersecurity research and solutions.',
                icon: Terminal,
                img: drDeepakImg
              },

            ].map((mentor, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="neo-card p-8 space-y-4 border-l-4 border-l-theme-primary hover:shadow-glow-primary transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-theme-text-strong">{mentor.name}</h3>
                      <div className="text-theme-primary font-bold text-xs uppercase tracking-wider">{mentor.role}</div>
                    </div>
                    {/* Mentor Image or Icon */}
                    <div className="relative flex-shrink-0">
                      {mentor.img ? (
                        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-theme-primary/20 shadow-neo-out group-hover:border-theme-primary/50 transition-colors">
                          <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary/40 group-hover:text-theme-primary transition-colors">
                          <mentor.icon size={28} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-theme-text-muted leading-relaxed font-medium relative z-10">{mentor.exp}</p>
                  <p className="text-sm text-theme-text-strong font-bold border-t border-theme-border/50 pt-4 italic relative z-10">
                    {mentor.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 6. LEADERS & FOUNDERS ═══ */}
      <section className="px-4 py-24 relative">
        <FloatingIcons />
        <div className="max-w-6xl mx-auto space-y-16">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                <Shield size={12} /> Core Team
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong uppercase tracking-widest">Leaders & Founders</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: 'NIKUNJ KAUSHIK',
                role: 'Co-Founder and Director',
                quote: 'The ultimate shield against cyber chaos, making hackers think twice.',
                img: nikunjImg,
                gradient: 'from-theme-primary to-theme-primary-dark'
              },
              {
                name: 'ADITYA JHA',
                role: 'Co-Founder and Director',
                quote: 'Wielding exploits like a magician turning vulnerabilities into victory.',
                img: adityaImg,
                gradient: 'from-theme-secondary to-theme-secondary-dark'
              },
              {
                name: 'SURYANSH DESHWAL',
                role: 'Co-Founder and CTO',
                quote: 'Architecting resilient systems and turning complex challenges into secure, scalable solutions.',
                img: suryanshImg,
                gradient: 'from-theme-primary to-theme-secondary-dark'
              }
            ].map((leader, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="neo-card p-6 md:p-8 lg:p-10 flex flex-col items-center text-center space-y-6 group relative overflow-hidden h-full"
                >
                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />

                  {/* Photo */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 2 }}
                      className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-theme-primary shadow-glow-primary z-10 relative"
                    >
                      <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
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
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-theme-text-strong leading-tight min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center">{leader.name}</h3>
                    <div className="text-theme-primary font-bold text-[10px] md:text-xs lg:text-sm uppercase tracking-widest">{leader.role}</div>
                  </div>

                  {/* Quote card */}
                  <div className="relative glass-card p-5 border border-theme-primary/10 w-full z-10 mt-auto">
                    <p className="italic text-theme-text-muted font-medium text-xs md:text-sm leading-relaxed text-center">
                      "{leader.quote}"
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. PARTNERS ═══ */}
      <section className="px-4 py-20 border-y border-theme-border/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Globe size={12} /> Ecosystem
              </div>
              <h2 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">Trusted By & Collaborated With</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {['DPIIT', 'Startup India', 'ISO Certified', 'Academic Partner', 'Defense Systems'].map((partner, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="px-8 py-4 neo-card rounded-2xl text-xl font-black text-theme-text-muted tracking-tighter hover:text-theme-primary hover:shadow-glow-primary transition-all cursor-default"
                >
                  {partner}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 8. LOCATION / MAP ═══ */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                <MapPin size={12} /> Headquarters
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">Our Location</h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Visit us at our headquarters in Greater Noida.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -4 }} className="neo-card p-8 space-y-6 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-theme-text-inverse shadow-glow-primary">
                  <MapPin size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-theme-text-strong">G L Bajaj Centre for Research and Incubation</h3>
                  <p className="text-sm text-theme-text-muted leading-relaxed">
                    Plot No. 2, APJ Abdul Kalam Rd,<br />
                    Knowledge Park III, Greater Noida,<br />
                    Ruhallapur, Uttar Pradesh 201310, India
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-theme-secondary animate-pulse" />
                  <span className="text-theme-secondary font-bold text-xs uppercase tracking-widest">HQ — Active</span>
                </div>
                <a
                  href="https://maps.google.com/?q=G+L+Bajaj+Centre+for+Research+and+Incubation+Greater+Noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-theme-primary-dark to-theme-primary text-theme-text-inverse font-bold text-sm shadow-glow-primary hover:scale-105 transition-transform w-max"
                >
                  <MapPin size={16} /> Get Directions
                </a>
              </motion.div>

              <div className="lg:col-span-2 neo-card overflow-hidden h-[400px] lg:h-auto">
                <iframe
                  title="Hackitise Labs Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5!2d77.4899!3d28.4744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc14fe6e1e5c9%3A0x3e5b28f8bbf9fe63!2sG%20L%20Bajaj%20Centre%20for%20Research%20and%20Incubation!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
};

export default About;
