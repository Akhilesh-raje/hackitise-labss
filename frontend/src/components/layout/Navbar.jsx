import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="glass-card mx-auto max-w-6xl rounded-full px-6 py-4 flex items-center justify-between mb-8 relative z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group text-theme-text-strong hover:text-theme-primary transition-colors">
          <Logo size={36} />
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-1 bg-theme-bg/50 rounded-full p-1 shadow-neo-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                location.pathname === link.path
                  ? 'bg-theme-card shadow-neo-out text-theme-primary-dark'
                  : 'text-theme-text-muted hover:text-theme-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button onClick={cycleTheme} className="p-2.5 rounded-full bg-theme-bg shadow-neo-out text-theme-text-muted hover:text-theme-primary transition-colors" title="Toggle Theme">
            {theme === 'light' ? <Sun size={20}/> : theme === 'dark' ? <Moon size={20}/> : <Monitor size={20}/>}
          </button>
          
          <Link to="/contact" className="hidden sm:block px-6 py-2.5 rounded-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse font-bold shadow-glow-primary hover:opacity-90 transition-opacity text-sm">
            Contact Us
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full bg-theme-bg shadow-neo-out text-theme-text-muted hover:text-theme-primary transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-theme-bg/40 backdrop-blur-md"
            />
            
            {/* Menu Slide-in */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-theme-card border-l border-theme-border shadow-neo-out p-8 flex flex-col pt-24"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-4 px-6 rounded-2xl text-lg font-black transition-all ${
                        location.pathname === link.path
                          ? 'bg-theme-primary/10 text-theme-primary shadow-neo-in'
                          : 'text-theme-text-muted hover:text-theme-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-auto space-y-6"
              >
                 <div className="h-px bg-theme-border/50" />
                 <Link 
                   to="/contact" 
                   className="w-full py-4 rounded-2xl bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse font-bold shadow-glow-primary flex items-center justify-center gap-2"
                 >
                   Get Started <Menu size={18} />
                 </Link>
                 <div className="text-center">
                    <p className="text-xs text-theme-text-muted font-bold uppercase tracking-widest">Hackitise Labs © 2026</p>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


