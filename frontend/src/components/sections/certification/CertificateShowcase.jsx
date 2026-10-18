import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Loader2 } from 'lucide-react';
import { FadeIn } from '../../ui/AnimationUtils';
import { api } from '../../../utils/api';

const CertificateShowcase = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await api.get('/certificates/recent');
        setCertificates(response.data || []);
      } catch (error) {
        console.error('Failed to fetch recent certificates:', error);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={12} /> Recent Certifications
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">
            Recently Certified Professionals
          </h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Join hundreds of certified cybersecurity professionals
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin text-theme-primary" />
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-theme-text-muted font-bold">No recent certificates to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.certificateId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="neo-card p-6 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>

                <div className="space-y-1">
                  <h4 className="font-black text-theme-text-strong text-sm">{cert.courseName}</h4>
                  <p className="text-xs font-mono font-bold text-theme-text-muted">{cert.courseCode}</p>
                </div>

                <div className="pt-3 border-t border-theme-border/50">
                  <p className="text-xs text-theme-text-muted font-medium">
                    Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-theme-text-muted font-medium">Duration: {cert.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-white font-bold shadow-glow-primary hover:opacity-90 transition-opacity"
          >
            Start Your Certification Journey
          </motion.a>
        </div>
      </FadeIn>
    </div>
  );
};

export default CertificateShowcase;
