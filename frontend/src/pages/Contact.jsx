import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Shield, Mail, Phone, MapPin, Send, ArrowRight,
  GraduationCap, Briefcase, FlaskConical,
  Linkedin, Instagram, MessageCircle,
  Lock, Cpu, Database, Terminal, Eye,
  CheckCircle, Loader2
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, CyberGrid } from '../components/ui/AnimationUtils';

/* ═══════════════════════════════════════════════════════════
   FLOATING CYBER ICONS (background decoration)
   ═══════════════════════════════════════════════════════════ */
const FloatingIcons = () => {
  const icons = [
    { Icon: Lock, x: '6%', y: '20%', delay: 0 },
    { Icon: Shield, x: '90%', y: '30%', delay: 1 },
    { Icon: Cpu, x: '80%', y: '70%', delay: 2 },
    { Icon: Database, x: '10%', y: '75%', delay: 0.5 },
    { Icon: Terminal, x: '50%', y: '12%', delay: 1.5 },
    { Icon: Eye, x: '94%', y: '55%', delay: 2.5 },
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
   CONTACT FORM
   ═══════════════════════════════════════════════════════════ */
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate submission
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Your Name*
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Your Email Address*
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Phone Number*
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number with country code"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
          Your Message*
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message here"
          className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-all w-full sm:w-max justify-center ${
          status === 'sent'
            ? 'bg-gradient-to-r from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary'
            : 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary hover:opacity-90'
        } disabled:opacity-70`}
      >
        {status === 'idle' && (<>Submit Your Inquiry <Send size={16} /></>)}
        {status === 'sending' && (<><Loader2 size={16} className="animate-spin" /> Sending...</>)}
        {status === 'sent' && (<><CheckCircle size={16} /> Sent Successfully!</>)}
      </motion.button>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════
   INFO CARD (for the 3-column section)
   ═══════════════════════════════════════════════════════════ */
const InfoCard = ({ icon: Icon, title, children, color = 'primary' }) => (
  <StaggerItem>
    <motion.div
      whileHover={{ y: -6 }}
      className="neo-card p-6 md:p-8 space-y-4 md:space-y-5 group cursor-default h-full relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        color === 'primary' ? 'from-theme-primary/5' :
        color === 'secondary' ? 'from-theme-secondary/5' : 'from-yellow-500/5'
      } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <motion.div
        whileHover={{ rotate: 10 }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 transition-shadow ${
          color === 'primary' ? 'bg-theme-primary/10 text-theme-primary group-hover:shadow-glow-primary' :
          color === 'secondary' ? 'bg-theme-secondary/10 text-theme-secondary group-hover:shadow-glow-secondary' :
          'bg-yellow-500/10 text-yellow-400'
        }`}
      >
        <Icon size={24} />
      </motion.div>

      <h3 className="text-xl font-black text-theme-text-strong relative z-10">{title}</h3>

      <div className="relative z-10">
        {children}
      </div>

      <div className="absolute bottom-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
        <Icon size={56} />
      </div>
    </motion.div>
  </StaggerItem>
);

/* ═══════════════════════════════════════════════════════════════════
   ██  MAIN CONTACT PAGE
   ═══════════════════════════════════════════════════════════════════ */
const Contact = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="space-y-0 pb-20 overflow-hidden">

      {/* ══════════════════════════════════════════
           1. HERO
         ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
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
              <Mail size={14} md={16} />
            </motion.div>
            Contact Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-theme-text-strong leading-[1.1] md:leading-tight tracking-tight"
          >
            Get in Touch <br className="sm:hidden" />
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary-dark uppercase tracking-widest">
                with Us
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
            className="text-lg md:text-xl text-theme-text-muted leading-relaxed font-semibold max-w-2xl mx-auto"
          >
            Contact us for cybersecurity training and consulting inquiries.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
           2. CONTACT FORM + MAP / IMAGE
         ══════════════════════════════════════════ */}
      <section className="px-4 py-16 relative">
        <CyberGrid />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            {/* Left — Form */}
            <FadeIn direction="left">
              <motion.div
                whileHover={{ y: -4 }}
                className="neo-card p-6 md:p-8 lg:p-10 h-full"
              >
                <div className="space-y-2 mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest">
                    <Send size={12} /> Send a Message
                  </div>
                  <h2 className="text-2xl font-black text-theme-text-strong">We'd love to hear from you</h2>
                </div>
                <ContactForm />
              </motion.div>
            </FadeIn>

            {/* Right — Contact Info + Map */}
            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-6 h-full flex flex-col">
                {/* Contact details card */}
                <motion.div whileHover={{ y: -4 }} className="neo-card p-6 md:p-8 space-y-6 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                    <Phone size={12} /> Reach Us Directly
                  </div>

                  <div className="space-y-5">
                    {/* Phone numbers */}
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary flex-shrink-0 group-hover/item:bg-theme-primary group-hover/item:text-theme-text-inverse transition-colors">
                        <Phone size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-theme-text-strong">Phone</h4>
                        <a href="tel:+919354903995" className="text-sm text-theme-text-muted font-medium hover:text-theme-primary transition-colors block">+91 9354903995</a>
                        <a href="tel:+917087391099" className="text-sm text-theme-text-muted font-medium hover:text-theme-primary transition-colors block">+91 7087391099</a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-theme-secondary/10 flex items-center justify-center text-theme-secondary flex-shrink-0 group-hover/item:bg-theme-secondary group-hover/item:text-theme-text-inverse transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-theme-text-strong">Email</h4>
                        <a href="mailto:info@hackitiselabs.in" className="text-sm text-theme-text-muted font-medium hover:text-theme-secondary transition-colors">info@hackitiselabs.in</a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center text-theme-primary flex-shrink-0 group-hover/item:bg-theme-primary group-hover/item:text-theme-text-inverse transition-colors">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-theme-text-strong">Office</h4>
                        <p className="text-sm text-theme-text-muted font-medium leading-relaxed">
                          G L Bajaj Centre for Research and Incubation,<br />
                          Knowledge Park III, Greater Noida,<br />
                          Uttar Pradesh 201310, India
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="pt-4 border-t border-theme-border/50">
                    <p className="text-xs font-bold text-theme-text-muted uppercase tracking-wider mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                        { Icon: Instagram, href: '#', label: 'Instagram' },
                        { Icon: MessageCircle, href: '#', label: 'WhatsApp' },
                        { Icon: Mail, href: 'mailto:info@hackitiselabs.in', label: 'Email' },
                      ].map(({ Icon, href, label }, idx) => (
                        <motion.a
                          key={idx}
                          href={href}
                          aria-label={label}
                          whileHover={{ y: -3, scale: 1.1 }}
                          className="w-10 h-10 rounded-xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-text-muted hover:text-theme-primary hover:border-theme-primary/30 hover:shadow-glow-primary transition-all"
                        >
                          <Icon size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Map embed */}
                <motion.div whileHover={{ y: -2 }} className="neo-card overflow-hidden h-[200px]">
                  <iframe
                    title="Hackitise Labs Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5!2d77.4899!3d28.4744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc14fe6e1e5c9%3A0x3e5b28f8bbf9fe63!2sG%20L%20Bajaj%20Centre%20for%20Research%20and%20Incubation!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                </motion.div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           3. THREE PILLARS (Training / Consulting / R&D)
         ══════════════════════════════════════════ */}
      <section className="bg-theme-bg/30 py-24 border-y border-theme-border/50 relative overflow-hidden">
        <CyberGrid />
        <div className="max-w-6xl mx-auto px-4 space-y-14">
          <FadeIn>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest">
                <Briefcase size={12} /> Our Verticals
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-theme-text-strong">
                How Can We Help You?
              </h2>
              <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
                Choose the area that fits your needs — we'll connect you with the right team.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Training */}
            <InfoCard icon={GraduationCap} title="Training" color="primary">
              <p className="text-sm text-theme-text-muted font-medium leading-relaxed mb-4">
                Expert cybersecurity training for all skill levels — schools, colleges, and corporates.
              </p>
              <motion.a
                href="/services#training"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm font-bold text-theme-primary"
              >
                View Programs <ArrowRight size={14} />
              </motion.a>
            </InfoCard>

            {/* Consulting */}
            <InfoCard icon={Briefcase} title="Consulting" color="secondary">
              <div className="space-y-2 mb-4">
                <a href="tel:+919354903995" className="flex items-center gap-2 text-sm text-theme-text-muted font-medium hover:text-theme-secondary transition-colors">
                  <Phone size={14} /> +91 9354903995
                </a>
                <a href="tel:+917087391099" className="flex items-center gap-2 text-sm text-theme-text-muted font-medium hover:text-theme-secondary transition-colors">
                  <Phone size={14} /> +91 7087391099
                </a>
                <a href="mailto:info@hackitiselabs.in" className="flex items-center gap-2 text-sm text-theme-text-muted font-medium hover:text-theme-secondary transition-colors">
                  <Mail size={14} /> info@hackitiselabs.in
                </a>
              </div>
            </InfoCard>

            {/* R&D */}
            <InfoCard icon={FlaskConical} title="Research & Development" color="primary">
              <p className="text-sm text-theme-text-muted font-medium leading-relaxed mb-4">
                Have a research idea or want to collaborate? Drop your email and we'll reach out.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email for contact"
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-2.5 rounded-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse font-bold text-sm shadow-glow-primary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Submit your inquiry now <ArrowRight size={14} />
                </motion.button>
              </div>
            </InfoCard>

          </StaggerContainer>
        </div>
      </section>

    </div>
  );
};

export default Contact;
