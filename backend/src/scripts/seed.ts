import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env.js';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import BlogPost from '../models/BlogPost.js';
import Testimonial from '../models/Testimonial.js';
import JobListing from '../models/JobListing.js';
import FAQ from '../models/FAQ.js';
import CaseStudy from '../models/CaseStudy.js';

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Clear existing data
  await Promise.all([
    Admin.deleteMany({}),
    BlogPost.deleteMany({}),
    Testimonial.deleteMany({}),
    JobListing.deleteMany({}),
    FAQ.deleteMany({}),
    CaseStudy.deleteMany({}),
  ]);

  // === ADMIN ===
  await Admin.create({
    email: 'admin@hackitiselabs.in',
    password: 'HackitiseAdmin@2026',
    name: 'Hackitise Admin',
    role: 'superadmin',
  });
  console.log('✅ Admin account created (admin@hackitiselabs.in / HackitiseAdmin@2026)');

  // === BLOG POSTS (from Blog.jsx) ===
  await BlogPost.insertMany([
    { title: 'Malware Analysis', description: 'Deconstructing the latest ransomware strains.', icon: 'AlertTriangle', color: 'theme-primary', slug: 'malware-analysis' },
    { title: 'Cybercrime Trends', description: 'What the dark web is trading today.', icon: 'BookOpen', color: 'theme-secondary-dark', slug: 'cybercrime-trends' },
    { title: 'DFIR Tactics', description: 'First response steps for immediate triage.', icon: 'ShieldAlert', color: 'theme-primary', slug: 'dfir-tactics' },
    { title: 'Security Architecture', description: 'Building resilient enterprise networks.', icon: 'Cpu', color: 'theme-primary-dark', slug: 'security-architecture' },
  ]);
  console.log('✅ Blog posts seeded');

  // === TESTIMONIALS (from Testimonials.jsx) ===
  await Testimonial.insertMany([
    { name: 'Sarah Thompson', role: 'CISO, FinTech Solutions', text: "Hackitise Labs transformed our security posture. Their VAPT revealed vulnerabilities we didn't even know existed. Their response time is unmatched.", rating: 5, color: 'theme-primary' },
    { name: 'David Chen', role: 'Tech Lead, Global Commerce', text: "The AI-powered threat detection they built for us has automated 90% of our monitoring. It's like having a 24/7 elite defense team in the cloud.", rating: 5, color: 'theme-secondary-dark' },
    { name: 'Emily Rodriguez', role: 'Engineering Director', text: 'Their advanced training workshops are exactly what our team needed. Practical, hands-on, and based on real-world cyber battle scenarios.', rating: 5, color: 'theme-primary-dark' },
  ]);
  console.log('✅ Testimonials seeded');

  // === JOB LISTINGS (from Careers.jsx) ===
  await JobListing.insertMany([
    { title: 'Cybersecurity Analyst Intern', location: 'Remote / Hybrid', type: 'Internship', skills: ['Networking', 'Basic Security', 'Linux', 'Wireshark'], color: 'primary', order: 1 },
    { title: 'Security Researcher', location: 'Remote', type: 'Full-time / Part-time', skills: ['Malware Analysis', 'Scripting', 'OSINT', 'Threat Intel'], color: 'secondary', order: 2 },
    { title: 'Full Stack Developer (Security Tools)', location: 'Remote / On-site', type: 'Full-time', skills: ['React', 'Node.js', 'APIs', 'Python', 'Docker'], color: 'accent', order: 3 },
  ]);
  console.log('✅ Job listings seeded');

  // === FAQs (from FAQ.jsx) ===
  await FAQ.insertMany([
    { question: 'What exact services do you provide?', answer: 'We provide VAPT, incident response, advanced cyber training, and build custom security tools.', order: 1 },
    { question: 'Who is this for?', answer: 'Enterprises needing hardened security, and professionals wanting practical cyber combat skills.', order: 2 },
    { question: 'What makes you different?', answer: 'We are active practitioners in the field. Every training and consulting engagement is based on recent real-world data.', order: 3 },
    { question: 'How do I contact you?', answer: 'Email us directly at info@hackitiselabs.in or call +91 9354903995.', order: 4 },
  ]);
  console.log('✅ FAQs seeded');

  // === CASE STUDIES (from CaseStudy.jsx) ===
  await CaseStudy.insertMany([
    {
      title: 'Financial Sector',
      problem: 'Critical infrastructural vulnerability detected by intense network pentesting.',
      action: 'Secured and updated network architecture and implemented latest protocol and versions of network devices. Added firewalls and IDS.',
      result: 'Prevented the attack, secured the org network within a week.',
      icon: 'Building2', color: 'primary', order: 1,
    },
    {
      title: 'E-Commerce',
      problem: 'High-traffic platform experiencing persistent automated data scraping and sophisticated zero-day injection attempts targeting customer databases.',
      action: 'Developed a custom AI-driven behavior monitoring system. Implemented advanced WAF rules, intelligent rate limiting, and real-time anomaly detection to neutralize botnet activity.',
      result: '99.9% malicious traffic blocked automatically without impacting legitimate users.',
      icon: 'ShoppingCart', color: 'secondary', order: 2,
    },
    {
      title: 'Educational Sector',
      problem: 'Reported database alteration of student marks on ERP.',
      action: 'Conducted an immediate VAPT analysis and reported 28 severe bugs. Performed code review and implemented logical temporary fixes to stop attacks.',
      result: 'University got time to update their system without getting attacked.',
      icon: 'GraduationCap', color: 'primary', order: 3,
    },
  ]);
  console.log('✅ Case studies seeded');

  console.log('\n🎉 Database seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
