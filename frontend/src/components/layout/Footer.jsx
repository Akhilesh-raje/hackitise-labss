import React from 'react';
import Logo from '../ui/Logo';
import { Mail, Phone, MapPin, Linkedin, Instagram, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-theme-border/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12 px-4">
        <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4 text-theme-text-strong">
               <Logo size={38} />
            </div>
            <p className="text-theme-text-muted text-sm max-w-sm font-bold leading-relaxed">Defense intelligence for a volatile digital world. Securing enterprises globally.</p>
        </div>
        
        <div>
            <h4 className="font-bold text-theme-text-strong mb-5 uppercase tracking-widest text-[10px]">Services</h4>
            <ul className="space-y-3">
                <li><a href="/services#offensive" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm font-bold">Consulting</a></li>
                <li><a href="/services#training" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm font-bold">Training</a></li>
                <li><a href="/services#rnd" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm font-bold">Research</a></li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold text-theme-text-strong mb-5 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-3">
                <li><a href="/about" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm font-bold">About</a></li>
                <li><a href="/careers" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm font-bold">Careers</a></li>
                <li><a href="/contact" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm font-bold">Contact</a></li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-theme-text-strong mb-5 uppercase tracking-widest text-[10px]">Contact Us</h4>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <Phone size={16} className="text-theme-primary mt-1 shrink-0" />
                    <a href="tel:+919354903995" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm font-bold">+91 9354903995</a>
                </li>
                <li className="flex items-start gap-3">
                    <Mail size={16} className="text-theme-secondary mt-1 shrink-0" />
                    <a href="mailto:info@hackitiselabs.in" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm font-bold">info@hackitiselabs.in</a>
                </li>
            </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-theme-border/30 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-[10px] text-theme-text-muted font-bold uppercase tracking-widest">&copy; 2026 Hackitise Labs.</p>
              {/* 
              <div className="flex gap-6">
                  <a href="/contact" className="text-[10px] text-theme-text-muted hover:text-theme-primary font-black uppercase tracking-tighter">Privacy</a>
                  <a href="/contact" className="text-[10px] text-theme-text-muted hover:text-theme-primary font-black uppercase tracking-tighter">Terms</a>
              </div>
              */}
          </div>

          <div className="flex gap-4">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/hackitise-labs/', label: 'LinkedIn' },
                { Icon: Instagram, href: 'https://www.instagram.com/hackitiselabs', label: 'Instagram' },
                { Icon: Shield, href: 'https://signal.me/#eu/xTN3os84AaS6UoXSgxCLRMDFBIdq7P89U0MUxR0A2ldwiTUAHRBIEo7M6Mfl05i4', label: 'Signal' }
              ].map(({ Icon, href, label }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border flex items-center justify-center text-theme-text-muted hover:text-theme-primary hover:border-theme-primary/30 transition-all shadow-neo-out"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
          </div>
      </div>
    </footer>
  );
};

export default Footer;
