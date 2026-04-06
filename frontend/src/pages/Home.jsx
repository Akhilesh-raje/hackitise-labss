import React from 'react';
import Hero from '../components/sections/Hero';
import Trust from '../components/sections/Trust';
import Services from '../components/sections/Services';
import MainFeature from '../components/sections/MainFeature';
import Proof from '../components/sections/Proof';
import WhyYou from '../components/sections/WhyYou';
import CaseStudy from '../components/sections/CaseStudy';
import Team from '../components/sections/Team';
import Blog from '../components/sections/Blog';
import FAQ from '../components/sections/FAQ';
import Testimonials from '../components/sections/Testimonials';
import { CyberGrid } from '../components/ui/AnimationUtils';

const Home = () => {
  return (
    <main className="relative space-y-0 overflow-hidden">
      {/* Global background scan lines and grids */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <CyberGrid />
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-4 pt-12">
        <Hero />
      </section>
      
      {/* 2. TRUST & CREDIBILITY */}
      <section className="px-4">
        <Trust />
      </section>
      
      {/* 3. CORE SERVICES */}
      <section className="px-4">
        <Services />
      </section>
      
      {/* 4. PRODUCT / CAPABILITY */}
      <section className="px-4">
        <MainFeature />
      </section>
      
      {/* 5. PROOF (NUMBERS) */}
      <section className="px-4">
        <Proof />
      </section>
      
      {/* 6. WHY YOU (DIFFERENTIATION) */}
      <section className="px-4">
        <WhyYou />
      </section>
      
      {/* 7. CASE STUDIES / REAL IMPACT */}
      <section className="px-4">
        <CaseStudy />
      </section>
      
      {/* 8. TEAM / ADVISORS */}
      <section className="px-4">
        <Team />
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="px-4">
        <Testimonials />
      </section>
      
      {/* 10. KNOWLEDGE / BLOG */}
      <section className="px-4">
        <Blog />
      </section>
      
      {/* 11. FAQ */}
      <section className="px-4 pb-20">
        <FAQ />
      </section>
    </main>
  );
};

export default Home;
