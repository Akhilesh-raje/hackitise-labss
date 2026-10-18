import React from 'react';
import CertificationHero from '../components/sections/certification/CertificationHero';
import CertificateRequestForm from '../components/sections/certification/CertificateRequestForm';
import CertificateVerification from '../components/sections/certification/CertificateVerification';
import AvailableCertifications from '../components/sections/certification/AvailableCertifications';
import CertificateShowcase from '../components/sections/certification/CertificateShowcase';
import HowItWorks from '../components/sections/certification/HowItWorks';
import CertificationFAQ from '../components/sections/certification/CertificationFAQ';
import { CyberGrid } from '../components/ui/AnimationUtils';

const Certification = () => {
  return (
    <main className="relative space-y-0 overflow-hidden pb-20">
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <CyberGrid />
      </div>

      {/* 1. HERO SECTION */}
      <section className="px-4 pt-12">
        <CertificationHero />
      </section>

      {/* 2. CERTIFICATE REQUEST FORM */}
      <section className="px-4 py-16 md:py-20">
        <CertificateRequestForm />
      </section>

      {/* 3. CERTIFICATE VERIFICATION */}
      <section className="px-4 py-16 md:py-20 bg-theme-bg/30 border-y border-theme-border/50">
        <CertificateVerification />
      </section>

      {/* 4. AVAILABLE CERTIFICATIONS */}
      <section className="px-4 py-16 md:py-20">
        <AvailableCertifications />
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="px-4 py-16 md:py-20 bg-theme-bg/30 border-y border-theme-border/50">
        <HowItWorks />
      </section>

      {/* 6. CERTIFICATE SHOWCASE */}
      <section className="px-4 py-16 md:py-20">
        <CertificateShowcase />
      </section>

      {/* 7. FAQ */}
      <section className="px-4 py-16 md:py-20">
        <CertificationFAQ />
      </section>
    </main>
  );
};

export default Certification;
