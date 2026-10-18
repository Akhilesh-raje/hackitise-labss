import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import dpiitLogo from '../../assets/partners/dpiit.jpeg';
import glBajajLogo from '../../assets/partners/gl bajaj.jpeg';
import iso21001Logo from '../../assets/partners/iso21001.jpeg';
import iso9001Logo from '../../assets/partners/iso9001.jpeg';
import logo1 from '../../assets/partners/logo1.jpeg';
import logo2 from '../../assets/partners/logo2.jpeg';
import logo3 from '../../assets/partners/logo3.jpeg';
import logo4 from '../../assets/partners/logo4.jpeg';
import startupIndiaLogo from '../../assets/partners/startup india.jpeg';
import systemsLogo from '../../assets/partners/systems.jpeg';
import tidesLogo from '../../assets/partners/tides.jpeg';

const LogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  const logos = [
    { src: dpiitLogo, alt: 'DPIIT', url: 'https://dpiit.gov.in/' },
    { src: startupIndiaLogo, alt: 'Startup India', url: 'https://www.startupindia.gov.in/' },
    { src: iso9001Logo, alt: 'ISO 9001', url: 'https://www.iso.org/iso-9001-quality-management.html' },
    { src: iso21001Logo, alt: 'ISO 21001', url: 'https://www.iso.org/standard/66266.html' },
    { src: glBajajLogo, alt: 'GL Bajaj', url: '#' },
    { src: tidesLogo, alt: 'TIDES', url: '#' },
    { src: systemsLogo, alt: 'Systems', url: '#' },
    { src: logo1, alt: 'Partner 1', url: '#' },
    { src: logo2, alt: 'Partner 2', url: '#' },
    { src: logo3, alt: 'Partner 3', url: '#' },
    { src: logo4, alt: 'Partner 4', url: '#' },
  ];

  // Duplicate logos multiple times for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 border-y border-theme-border/30 bg-theme-bg/50 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest mb-4">
          <Award size={12} /> Network
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong uppercase tracking-widest">
          Trusted Partners & Affiliates
        </h2>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-theme-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-theme-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-12 items-center"
          animate={{
            x: [0, `-${100 / 3}%`],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <motion.a
              key={idx}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={(e) => {
                if (logo.url === '#') {
                  e.preventDefault();
                }
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 w-auto object-contain"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCarousel;
