import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../../ui/AnimationUtils';
import { api } from '../../../utils/api';

const AvailableCertifications = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | Beginner | Intermediate | Advanced

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('/certificates/programs');
        setPrograms(response.data || []);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = filter === 'all' ? programs : programs.filter((p) => p.level === filter);

  const getLevelColor = (level) => {
    if (level === 'Beginner') return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (level === 'Intermediate') return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={12} /> Certification Programs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">
            Available Certifications
          </h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Choose from our industry-recognized cybersecurity certification programs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === level
                  ? 'bg-theme-primary text-white shadow-glow-primary'
                  : 'bg-theme-bg text-theme-text-muted hover:text-theme-primary border border-theme-border'
              }`}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin text-theme-primary" />
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-theme-text-muted font-bold">No programs found</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPrograms.map((program) => {
              const IconComponent = Icons[program.icon] || Award;
              return (
                <StaggerItem key={program._id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`glass-card p-6 md:p-8 flex flex-col group border border-theme-border transition-all bg-theme-card/80 h-full hover:border-theme-${
                      program.color === 'secondary' ? 'secondary' : 'primary'
                    } hover:shadow-glow-${program.color === 'secondary' ? 'secondary' : 'primary'}`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-theme-bg shadow-neo-out flex items-center justify-center transition-all ${
                          program.color === 'secondary'
                            ? 'text-theme-secondary group-hover:bg-theme-secondary'
                            : 'text-theme-primary group-hover:bg-theme-primary'
                        } group-hover:text-white`}
                      >
                        <IconComponent size={28} />
                      </motion.div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(program.level)}`}
                      >
                        {program.level}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-theme-text-strong">{program.title}</h3>
                      <p className="text-sm text-theme-text font-mono font-bold opacity-75">{program.code}</p>
                      <p className="text-theme-text-muted text-sm leading-relaxed">{program.description}</p>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs text-theme-text-muted font-bold">
                          <Clock size={14} className="text-theme-primary" />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-theme-text-muted font-bold">
                          <TrendingUp size={14} className="text-theme-primary" />
                          {program.level}
                        </div>
                      </div>

                      {program.skills && program.skills.length > 0 && (
                        <div className="pt-3">
                          <p className="text-xs font-bold text-theme-text-strong mb-2">Skills Covered:</p>
                          <div className="flex flex-wrap gap-2">
                            {program.skills.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-theme-bg rounded-lg text-xs font-semibold text-theme-text"
                              >
                                {skill}
                              </span>
                            ))}
                            {program.skills.length > 4 && (
                              <span className="px-2 py-1 text-xs font-semibold text-theme-text-muted">
                                +{program.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-theme-border/50">
                      <div className="text-2xl font-black text-theme-text-strong">
                        ₹{program.price.toLocaleString('en-IN')}
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          href="/contact"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-theme-primary to-theme-primary-dark text-white font-bold text-sm shadow-glow-primary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                          Enroll Now <ArrowRight size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </FadeIn>
    </div>
  );
};

export default AvailableCertifications;
