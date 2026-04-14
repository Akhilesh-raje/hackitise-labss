import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Shield, Crosshair, Target, Users, Rocket, Globe,
  Brain, Search, Code2, Lock, Cpu, Database, Terminal, Eye,
  ArrowRight, Send, Loader2, CheckCircle, MapPin,
  Zap, Heart, Briefcase, GraduationCap, Lightbulb,
  Fingerprint, FileSearch, Wrench, BookOpen, ChevronRight
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, CyberGrid, AnimatedCounter } from '../components/ui/AnimationUtils';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';


/* ═══════════════════════════════════════════════════════════
   FLOATING CYBER ICONS (background decoration)
   ═══════════════════════════════════════════════════════════ */
const FloatingIcons = () => {
  const icons = [
    { Icon: Lock, x: '7%', y: '18%', delay: 0 },
    { Icon: Shield, x: '89%', y: '22%', delay: 1 },
    { Icon: Cpu, x: '82%', y: '68%', delay: 2 },
    { Icon: Database, x: '11%', y: '74%', delay: 0.5 },
    { Icon: Terminal, x: '48%', y: '8%', delay: 1.5 },
    { Icon: Eye, x: '93%', y: '50%', delay: 2.5 },
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
   CTA BUTTON (reusable)
   ═══════════════════════════════════════════════════════════ */
const SectionCTA = ({ label, href = '#apply', variant = 'primary', onClick }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={`inline-flex items-center gap-2.5 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-sm transition-all w-full sm:w-max justify-center ${variant === 'primary'
        ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary hover:opacity-90'
        : 'neo-card text-theme-text-muted hover:text-theme-primary border border-theme-border hover:border-theme-primary/30'
      }`}
  >
    {label} <ArrowRight size={16} />
  </motion.a>
);

/* ═══════════════════════════════════════════════════════════
   WHY CARD (feature card for "Why Hackitise Labs")
   ═══════════════════════════════════════════════════════════ */
const WhyCard = ({ icon: Icon, title, description, color = 'primary' }) => (
  <StaggerItem>
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="neo-card p-6 md:p-7 space-y-4 group cursor-default h-full relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color === 'primary' ? 'from-theme-primary/5' : 'from-theme-secondary/5'
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <motion.div
        whileHover={{ rotate: 10 }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 transition-shadow ${color === 'primary'
            ? 'bg-theme-primary/10 text-theme-primary group-hover:shadow-glow-primary'
            : 'bg-theme-secondary/10 text-theme-secondary group-hover:shadow-glow-secondary'
          }`}
      >
        <Icon size={24} />
      </motion.div>

      <h3 className="text-lg font-black text-theme-text-strong relative z-10">{title}</h3>
      <p className="text-sm text-theme-text-muted font-medium leading-relaxed relative z-10">{description}</p>

      <div className="absolute bottom-3 right-3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Icon size={56} />
      </div>
    </motion.div>
  </StaggerItem>
);

/* ═══════════════════════════════════════════════════════════
   ROLE CARD (job listing)
   ═══════════════════════════════════════════════════════════ */
const RoleCard = ({ title, location, type, skills, color = 'primary' }) => (
  <FadeIn>
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="neo-card overflow-hidden group cursor-default relative h-full flex flex-col"
    >
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color === 'primary' ? 'from-theme-primary to-theme-primary-dark' :
          color === 'secondary' ? 'from-theme-secondary to-theme-secondary-dark' :
            'from-yellow-400 to-orange-500'
        }`} />

      <div className="p-6 md:p-8 flex-1 flex flex-col space-y-5">
        {/* Role Header */}
        <div className="space-y-3">
          <h3 className="text-xl font-black text-theme-text-strong">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-[11px] font-bold uppercase tracking-wider">
                <MapPin size={10} /> {location}
              </span>
            )}
            {type && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-secondary/10 text-theme-secondary text-[11px] font-bold uppercase tracking-wider">
                <Briefcase size={10} /> {type}
              </span>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2 flex-1">
          <p className="text-xs font-bold text-theme-text-muted uppercase tracking-wider">Required Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-xs font-bold text-theme-text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <motion.a
          href="#apply"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all w-full justify-center mt-auto ${color === 'primary' ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary' :
              color === 'secondary' ? 'bg-gradient-to-r from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary' :
                'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
            }`}
        >
          Apply Now <ArrowRight size={14} />
        </motion.a>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Briefcase size={72} />
      </div>
    </motion.div>
  </FadeIn>
);

/* ═══════════════════════════════════════════════════════════
   APPLICATION FORM
   ═══════════════════════════════════════════════════════════ */
const ApplicationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', role: '' });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('role', formData.role);
      if (resume) {
        data.append('resume', resume);
      }

      await api.postForm('/applications', data);
      
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 5000);
      setFormData({ name: '', email: '', message: '', role: '' });
      setResume(null);
      // Reset file input if possible
      e.target.reset();
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Failed to submit application. Please try again or email us directly.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="career-name" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Your Name*
        </label>
        <input
          id="career-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="career-email" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Your Email*
        </label>
        <input
          id="career-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="career-resume" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Resume / CV
        </label>
        <input
          id="career-resume"
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-theme-primary/10 file:text-theme-primary hover:file:bg-theme-primary/20 transition-all cursor-pointer"
        />

      </div>

      <div className="space-y-1.5">
        <label htmlFor="career-message" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="career-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about yourself and why you want to join…"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-all w-full sm:w-max justify-center ${status === 'sent'
            ? 'bg-gradient-to-r from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary'
            : 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary hover:opacity-90'
          } disabled:opacity-70`}
      >
        {status === 'idle' && (<>Submit Application <Send size={16} /></>)}
        {status === 'sending' && (<><Loader2 size={16} className="animate-spin" /> Sending...</>)}
        {status === 'sent' && (<><CheckCircle size={16} /> Sent Successfully!</>)}
      </motion.button>

      {status === 'error' && (
        <p className="text-xs font-bold text-red-500 mt-2">{errorMsg}</p>
      )}
    </form>
  );
};

const fallbackJobs = [
  {
    title: 'Cybersecurity Analyst Intern',
    location: 'Remote / Hybrid',
    type: 'Internship',
    skills: ['Networking', 'Basic Security', 'Linux', 'Wireshark'],
    color: 'primary',
  },
  {
    title: 'Security Researcher',
    location: 'Remote',
    type: 'Full-time / Part-time',
    skills: ['Malware Analysis', 'Scripting', 'OSINT', 'Threat Intel'],
    color: 'secondary',
  },
  {
    title: 'Full Stack Developer (Security Tools)',
    location: 'Remote / On-site',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'APIs', 'Python', 'Docker'],
    color: 'accent',
  },
];


/* ═══════════════════════════════════════════════════════════════════
   ██  MAIN CAREERS PAGE
   ═══════════════════════════════════════════════════════════════════ */
const Careers = () => {
  const { data: jobs } = useApiData('/jobs', fallbackJobs);
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
              <Target size={14} />
            </motion.div>
            We're Hiring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-theme-text-strong leading-[1.1] md:leading-tight tracking-tight"
          >
            Join the Frontlines of <br className="sm:hidden" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark uppercase tracking-widest">
                Cybersecurity
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
            Build, defend, and innovate against real-world cyber threats with Hackitise Labs.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base text-theme-text-muted leading-relaxed font-medium max-w-2xl mx-auto"
          >
            At Hackitise Labs, we are shaping the future of cybersecurity through cutting-edge research, real-world threat intelligence, and hands-on training. Whether you're a beginner or an experienced professional, we provide an environment where you can learn, grow, and make a real impact in securing digital systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <SectionCTA label="View Open Positions" href="#positions" />
            <SectionCTA label="Apply Now" href="#apply" variant="secondary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
           2. WHY HACKITISE LABS
         ══════════════════════════════════════════ */}
      <section id="why-us" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest border border-theme-primary/20">
                <Zap size={12} /> Why Join Us
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Why Hackitise Labs?
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                We aren't your average cybersecurity company. Here's what sets us apart.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <WhyCard
              icon={Shield}
              title="Real-World Impact"
              description="Work on actual cyber threats, not just theory. Every project has real-world consequences."
              color="primary"
            />
            <WhyCard
              icon={Brain}
              title="Learn from Experts"
              description="Collaborate with mentors and professionals in DFIR, cybercrime, and security research."
              color="secondary"
            />
            <WhyCard
              icon={Rocket}
              title="Growth & Innovation"
              description="Get hands-on experience with tools, labs, and real-world scenarios that push your limits."
              color="primary"
            />
            <WhyCard
              icon={Globe}
              title="Meaningful Work"
              description="Contribute to securing individuals, organizations, and digital infrastructure worldwide."
              color="secondary"
            />
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           3. WHAT YOU'LL WORK ON
         ══════════════════════════════════════════ */}
      <section className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4 space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest border border-theme-secondary/20">
                <Terminal size={12} /> Day to Day
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                What You'll Work On
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Real cyber work, from day one. No busy work — only mission-critical operations.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div whileHover={{ y: -4 }} className="neo-card p-8 lg:p-12 relative overflow-hidden group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-theme-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 space-y-6">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: Crosshair, label: 'Threat Detection & Analysis', desc: 'Identify and neutralize emerging threats in real time.' },
                    { icon: Search, label: 'Vulnerability Assessment & Pen Testing', desc: 'Break systems before attackers do.' },
                    { icon: FileSearch, label: 'Digital Forensics & Cybercrime Investigation', desc: 'Uncover evidence and trace digital criminals.' },
                    { icon: Code2, label: 'Security Tool Development', desc: 'Build offensive and defensive cyber tools.' },
                    { icon: BookOpen, label: 'Awareness & Training Programs', desc: 'Educate the next generation of cyber defenders.' },
                  ].map((item, idx) => (
                    <StaggerItem key={idx}>
                      <motion.div
                        whileHover={{ y: -3, scale: 1.03 }}
                        className="neo-card p-5 flex flex-col items-center text-center gap-3 group/item cursor-default border border-theme-border hover:border-theme-primary/30 transition-all h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover/item:bg-theme-primary group-hover/item:text-theme-text-inverse transition-colors">
                          <item.icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-theme-text-strong">{item.label}</span>
                        <span className="text-xs text-theme-text-muted font-medium">{item.desc}</span>
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
           4. OPEN POSITIONS
         ══════════════════════════════════════════ */}
      <section id="positions" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest border border-theme-primary/20">
                <Briefcase size={12} /> Open Roles
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Open Positions
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Find the role that fits your passion and skills. Every position is a chance to make real impact.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <RoleCard
                key={idx}
                title={job.title}
                location={job.location}
                type={job.type}
                skills={job.skills}
                color={job.color}
              />
            ))}
          </div>


          <FadeIn delay={0.2}>
            <div className="text-center pt-4">
              <p className="text-sm text-theme-text-muted font-medium mb-4">Don't see the right fit? We're always looking for talent.</p>
              <SectionCTA label="Send Open Application" href="#apply" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           5. WHO WE'RE LOOKING FOR
         ══════════════════════════════════════════ */}
      <section className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4 space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest border border-theme-secondary/20">
                <Users size={12} /> Ideal Candidates
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Who We're Looking For
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traits */}
            <FadeIn direction="left">
              <motion.div whileHover={{ y: -4 }} className="neo-card p-6 md:p-8 space-y-5 h-full">
                <h3 className="text-xl font-black text-theme-text-strong">Traits We Value</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Heart, text: 'Passionate about cybersecurity' },
                    { icon: Brain, text: 'Problem-solvers and critical thinkers' },
                    { icon: Lightbulb, text: 'Willing to learn and adapt' },
                    { icon: Target, text: 'Strong interest in real-world applications' },
                  ].map((item, idx) => (
                    <motion.li key={idx} whileHover={{ x: 4 }} className="flex items-center gap-3 group/item cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-theme-primary/10 flex items-center justify-center text-theme-primary flex-shrink-0 group-hover/item:bg-theme-primary group-hover/item:text-theme-text-inverse transition-colors">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-bold text-theme-text-muted group-hover/item:text-theme-text-strong transition-colors">{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>

            {/* Who can apply */}
            <FadeIn direction="right" delay={0.15}>
              <motion.div whileHover={{ y: -4 }} className="neo-card p-6 md:p-8 space-y-5 h-full">
                <h3 className="text-xl font-black text-theme-text-strong">Who Can Apply</h3>
                <ul className="space-y-4">
                  {[
                    { icon: GraduationCap, text: 'Students looking for real-world exposure', tag: 'Students' },
                    { icon: Briefcase, text: 'Professionals seeking impactful work', tag: 'Professionals' },
                    { icon: Search, text: 'Researchers pushing the boundaries', tag: 'Researchers' },
                  ].map((item, idx) => (
                    <motion.li key={idx} whileHover={{ x: 4 }} className="flex items-center gap-3 group/item cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-theme-secondary/10 flex items-center justify-center text-theme-secondary flex-shrink-0 group-hover/item:bg-theme-secondary group-hover/item:text-theme-text-inverse transition-colors">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider">{item.tag}</span>
                        <span className="text-sm font-medium text-theme-text-muted block">{item.text}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           6. CULTURE
         ══════════════════════════════════════════ */}
      <section className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-4xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest border border-theme-primary/20">
                <Fingerprint size={12} /> Our DNA
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Our Culture
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div whileHover={{ y: -4 }} className="neo-card p-8 lg:p-14 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary via-theme-secondary to-theme-primary" />

              <div className="relative z-10 space-y-6 text-center">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-theme-text-inverse shadow-glow-primary mx-auto"
                >
                  <Fingerprint size={32} />
                </motion.div>

                <blockquote className="text-lg md:text-xl text-theme-text font-semibold leading-relaxed max-w-2xl mx-auto italic">
                  "We believe in learning by doing, experimenting with real-world scenarios, and pushing boundaries. At Hackitise Labs, collaboration, curiosity, and innovation drive everything we do. We don't just teach cybersecurity — <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary font-black not-italic">we live it.</span>"
                </blockquote>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  {['Collaboration', 'Curiosity', 'Innovation', 'Learning by Doing'].map((value, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="px-4 py-2 rounded-full bg-theme-bg border border-theme-border text-xs font-bold text-theme-text-muted uppercase tracking-wider hover:border-theme-primary/30 hover:text-theme-primary transition-all cursor-default"
                    >
                      {value}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           8. APPLY / REACH OUT
         ══════════════════════════════════════════ */}
      <section id="apply" className="px-4 py-24 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest border border-theme-primary/20">
                <Send size={12} /> Get In Touch
              </div>
              <h2 className="text-4xl font-black text-theme-text-strong">
                Apply or Reach Out
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Interested in joining us? Send your resume or query and we'll get back to you.
              </p>
            </div>
          </FadeIn>

          <div className="flex justify-center">
            {/* Direct Email + Info */}
            <FadeIn delay={0.15}>
              <div className="space-y-6 max-w-2xl w-full">
                <motion.div whileHover={{ y: -4 }} className="neo-card p-6 md:p-12 space-y-8 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest w-max">
                    <Send size={12} /> Direct email
                  </div>

                  <div className="space-y-5 w-full">
                    <div className="flex flex-col items-center gap-4 md:gap-6 group/item">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-theme-text-inverse shadow-glow-primary">
                        <Send size={24} className="md:w-7 md:h-7" />
                      </div>
                      <div className="w-full">
                        <h4 className="text-[10px] md:text-sm font-bold text-theme-text-strong mb-2 uppercase tracking-tighter">Careers Email</h4>
                        <a
                          href="mailto:Hr@hackitiselabs.in"
                          className="text-lg sm:text-2xl md:text-3xl font-black text-theme-primary hover:text-theme-primary-dark transition-colors break-all sm:break-normal"
                        >
                          Hr@hackitiselabs.in
                        </a>
                        <p className="text-xs md:text-sm text-theme-text-muted font-medium mt-3 max-w-sm mx-auto">Send your resume, portfolio, or any questions directly to our team.</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-theme-border/50" />

                  <div className="space-y-4 w-full text-left max-w-sm mx-auto">
                    <h4 className="text-[10px] md:text-sm font-bold text-theme-text-strong text-center mb-6 uppercase tracking-widest">What to Include</h4>
                    {[
                      'Your updated resume / CV',
                      'Role you\'re interested in',
                      'Brief intro about yourself',
                      'Portfolio or GitHub links (optional)',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-theme-secondary/10 flex items-center justify-center text-theme-secondary flex-shrink-0">
                          <ChevronRight size={12} />
                        </div>
                        <span className="text-xs md:text-sm text-theme-text-muted font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick stat bar */}
                <motion.div whileHover={{ y: -2 }} className="neo-card p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-theme-secondary/10 flex items-center justify-center text-theme-secondary flex-shrink-0">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-theme-text-strong">Response Time</p>
                    <p className="text-xs text-theme-text-muted font-medium">We typically respond within 2–3 business days.</p>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           9. FINAL CTA
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
                Your skills can help secure the <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">digital world.</span>
              </h2>
              <p className="text-lg text-theme-text-muted font-medium max-w-xl mx-auto">
                This is not just a job — this is a cybersecurity mission.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <SectionCTA label="Join Hackitise Labs" href="#apply" />
                <SectionCTA label="View Open Positions" href="#positions" variant="secondary" />
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Careers;
