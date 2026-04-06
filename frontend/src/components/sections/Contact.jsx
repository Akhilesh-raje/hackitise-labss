import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, SectionHeader } from './AnimationUtils';

const Contact = () => {
  return (
    <section className="mt-24 mb-20 px-4" id="contact">
      <SectionHeader title="Secure Your Future" badge="Contact Us" icon={Mail} />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="left">
          <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-theme-text-strong">Get in Touch</h3>
                <p className="text-theme-text-muted text-lg max-w-md leading-relaxed">
                  Reach out to our defense team. Average response time: <span className="text-theme-primary font-bold">&lt;1 hour.</span>
                </p>
              </div>
              
              <ul className="space-y-6">
                  {[
                    { icon: Mail, label: 'Email', value: 'secure@hackitiselabs.com', color: 'primary' },
                    { icon: Phone, label: 'Phone', value: '+1 (555) 019-2831', color: 'secondary' },
                    { icon: MapPin, label: 'Location', value: 'Cyber Hub, NY', color: 'primary' }
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-5 text-theme-text font-medium group"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-theme-bg shadow-neo-out flex items-center justify-center text-theme-${item.color === 'primary' ? 'primary-dark' : 'secondary-dark'} shrink-0 group-hover:shadow-glow-${item.color === 'primary' ? 'primary' : 'secondary'} transition-all`}>
                            <item.icon size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-theme-text-muted uppercase tracking-widest">{item.label}</span>
                          <span className="text-lg text-theme-text-strong">{item.value}</span>
                        </div>
                    </motion.li>
                  ))}
              </ul>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div className="neo-card p-8 lg:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-theme-primary/10 transition-colors" />
              
              <form className="flex flex-col space-y-6 relative z-10" onSubmit={e => e.preventDefault()}>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-theme-text-muted uppercase tracking-wider ml-2">Full Name</label>
                     <motion.input 
                       whileFocus={{ y: -2 }}
                       type="text" placeholder="John Doe" required 
                       className="w-full bg-theme-bg rounded-2xl px-6 py-4 border border-transparent outline-none shadow-neo-in text-theme-text placeholder:text-theme-text-muted/30 focus:border-theme-primary/30 transition-all font-medium" 
                     />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-theme-text-muted uppercase tracking-wider ml-2">Work Email</label>
                     <motion.input 
                       whileFocus={{ y: -2 }}
                       type="email" placeholder="john@company.com" required 
                       className="w-full bg-theme-bg rounded-2xl px-6 py-4 border border-transparent outline-none shadow-neo-in text-theme-text placeholder:text-theme-text-muted/30 focus:border-theme-secondary/30 transition-all font-medium" 
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-theme-text-muted uppercase tracking-wider ml-2">Security Needs</label>
                     <motion.textarea 
                       whileFocus={{ y: -2 }}
                       placeholder="Describe your security goals..." 
                       rows="4" required 
                       className="w-full bg-theme-bg rounded-2xl px-6 py-4 border border-transparent outline-none shadow-neo-in text-theme-text placeholder:text-theme-text-muted/30 focus:border-theme-primary/30 transition-all font-medium resize-none text-sm"
                     ></motion.textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="mt-4 px-10 py-5 rounded-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse font-black text-lg shadow-glow-primary transition-all flex justify-center items-center gap-3 group"
                  >
                      Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
              </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
