import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FadeIn } from '../../ui/AnimationUtils';

const CertificationFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to receive my certificate?',
      answer:
        'Once you submit your certificate request, our team will review it within 2-3 business days. Approved certificates are issued immediately via email.',
    },
    {
      question: 'Are Hackitise Labs certificates recognized?',
      answer:
        'Yes! Our certificates are industry-recognized and include verification features. Employers can instantly verify your certificate authenticity using the certificate ID on our website.',
    },
    {
      question: 'What do I need to request a certificate?',
      answer:
        'You need your full name, email address, course name, and batch ID (found in your course materials or confirmation email). Having your completion date is helpful but optional.',
    },
    {
      question: 'Can I get a physical certificate?',
      answer:
        'Digital certificates are provided by default. For physical certificates (printed and mailed), please contact us at info@hackitiselabs.in with your certificate ID.',
    },
    {
      question: 'How can employers verify my certificate?',
      answer:
        'Employers can visit our verification page, enter your certificate ID (e.g., HACK-CERT-2026-XXXXXX), and instantly see your certificate details including course name, issue date, and validity status.',
    },
    {
      question: 'What if my certificate request is rejected?',
      answer:
        'If your request is rejected, you will receive an email explaining the reason. Common reasons include incorrect batch ID or incomplete course requirements. You can contact Hr@hackitiselabs.in for clarification.',
    },
    {
      question: 'Do certificates expire?',
      answer:
        'Most certificates are valid indefinitely. However, some advanced certifications may require renewal every 2-3 years to stay current with industry standards. This will be indicated on your certificate if applicable.',
    },
    {
      question: 'Can I share my certificate on LinkedIn?',
      answer:
        'Absolutely! You can download your certificate PDF and upload it to LinkedIn under your Licenses & Certifications section. Include your certificate ID and verification link for added credibility.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle size={12} /> FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Everything you need to know about our certification process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="neo-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-theme-bg/50 transition-colors"
              >
                <span className="font-bold text-theme-text-strong pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-theme-primary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-theme-text-muted leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 p-6 neo-card">
          <p className="text-theme-text-muted font-bold mb-4">Still have questions?</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-white font-bold text-sm shadow-glow-primary hover:opacity-90 transition-opacity"
          >
            Contact Us
          </motion.a>
        </div>
      </FadeIn>
    </div>
  );
};

export default CertificationFAQ;
