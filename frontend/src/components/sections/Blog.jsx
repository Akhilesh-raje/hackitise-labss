import React from 'react';
import { BookOpen, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, SectionHeader } from '../ui/AnimationUtils';

const Blog = () => {
  const posts = [
    { title: 'Malware Analysis', desc: 'Deconstructing the latest ransomware strains.', icon: AlertTriangle, color: 'theme-primary' },
    { title: 'Cybercrime Trends', desc: 'What the dark web is trading today.', icon: BookOpen, color: 'theme-secondary-dark' },
    { title: 'DFIR Tactics', desc: 'First response steps for immediate triage.', icon: ShieldAlert, color: 'theme-primary' },
    { title: 'Security Architecture', desc: 'Building resilient enterprise networks.', icon: Cpu, color: 'theme-primary-dark' },
  ];

  return (
    <section className="mt-20">
      <SectionHeader title="Latest Intel" badge="Knowledge Base" icon={BookOpen} />
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, i) => (
          <StaggerItem key={i}>
            <motion.a 
              href="/services" 
              whileHover={{ y: -8, scale: 1.02 }}
              className="neo-card p-6 block group border border-transparent hover:border-theme-primary/20 hover:shadow-glow-primary transition-all h-full"
            >
              <div className={`flex items-center gap-3 mb-4 text-${post.color}`}>
                <post.icon size={20} className="group-hover:rotate-12 transition-transform" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-strong mb-2 group-hover:text-theme-primary transition-colors">{post.title}</h4>
              <p className="text-theme-text-muted text-sm leading-relaxed">{post.desc}</p>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default Blog;

