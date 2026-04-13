import React from 'react';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-theme-border/50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 text-theme-text-strong">
               <Logo size={38} />
            </div>
            <p className="text-theme-text-muted text-sm max-w-sm">Defense intelligence for a volatile digital world. Securing enterprises globally.</p>
        </div>
        
        <div>
            <h4 className="font-bold text-theme-text-strong mb-4 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
                <li><a href="/services#offensive" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm">Consulting</a></li>
                <li><a href="/services#training" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm">Training</a></li>
                <li><a href="/services#rnd" className="text-theme-text-muted hover:text-theme-primary transition-colors text-sm">Research</a></li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold text-theme-text-strong mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
                <li><a href="/about" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm">About</a></li>
                <li><a href="/careers" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm">Careers</a></li>
                <li><a href="/contact" className="text-theme-text-muted hover:text-theme-secondary transition-colors text-sm">Contact</a></li>
            </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-theme-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-theme-text-muted font-medium">&copy; 2026 Hackitise Labs. All rights reserved.</p>
          <div className="flex gap-4">
              <a href="/contact" className="text-xs text-theme-text-muted hover:text-theme-text">Privacy Policy</a>
              <a href="/contact" className="text-xs text-theme-text-muted hover:text-theme-text">Terms of Service</a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
