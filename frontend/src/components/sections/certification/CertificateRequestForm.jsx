import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, FileText } from 'lucide-react';
import { FadeIn } from '../../ui/AnimationUtils';
import { api } from '../../../utils/api';

const CertificateRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseName: '',
    batchId: '',
    completionDate: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await api.post('/certificates/request', formData);
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          courseName: '',
          batchId: '',
          completionDate: '',
          message: '',
        });
      }, 5000);
    } catch (err) {
      console.error('Certificate request error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us directly.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold uppercase tracking-widest mb-4">
            <FileText size={12} /> Request Certificate
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">
            Request Your Certificate
          </h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Fill out the form below and our team will review your request within 2-3 business days
          </p>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          className="neo-card p-6 md:p-10 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="cert-name" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Full Name*
              </label>
              <input
                id="cert-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="cert-email" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Email Address*
              </label>
              <input
                id="cert-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="cert-phone" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Phone Number
              </label>
              <input
                id="cert-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
            </div>

            {/* Course Name */}
            <div className="space-y-1.5">
              <label htmlFor="cert-course" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Course/Training Name*
              </label>
              <input
                id="cert-course"
                name="courseName"
                type="text"
                required
                value={formData.courseName}
                onChange={handleChange}
                placeholder="e.g., Advanced VAPT Training"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
            </div>

            {/* Batch ID */}
            <div className="space-y-1.5">
              <label htmlFor="cert-batch" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Batch ID / Session Code*
              </label>
              <input
                id="cert-batch"
                name="batchId"
                type="text"
                required
                value={formData.batchId}
                onChange={handleChange}
                placeholder="e.g., BATCH-2026-01"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
              <p className="text-xs text-theme-text-muted mt-1">Check your course materials or confirmation email for your batch ID</p>
            </div>

            {/* Completion Date */}
            <div className="space-y-1.5">
              <label htmlFor="cert-completion" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Completion Date
              </label>
              <input
                id="cert-completion"
                name="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="cert-message" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Additional Message
              </label>
              <textarea
                id="cert-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Any additional information"
                className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-all w-full justify-center ${
                status === 'sent'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-glow-secondary'
                  : 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary hover:opacity-90'
              } disabled:opacity-70`}
            >
              {status === 'idle' && (
                <>
                  Submit Request <Send size={16} />
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              )}
              {status === 'sent' && (
                <>
                  <CheckCircle size={16} /> Request Submitted!
                </>
              )}
            </motion.button>

            {status === 'sent' && (
              <p className="text-xs font-bold text-green-600 text-center mt-2">
                ✓ Check your email for confirmation. We'll review your request within 2-3 business days.
              </p>
            )}

            {status === 'error' && <p className="text-xs font-bold text-red-500 text-center mt-2">{errorMsg}</p>}
          </form>
        </motion.div>
      </FadeIn>
    </div>
  );
};

export default CertificateRequestForm;
