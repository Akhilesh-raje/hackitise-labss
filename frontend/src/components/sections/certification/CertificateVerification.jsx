import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { FadeIn } from '../../ui/AnimationUtils';
import { api } from '../../../utils/api';

const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | valid | invalid | revoked | error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setStatus('loading');
    setResult(null);
    setErrorMsg('');

    try {
      const response = await api.get(`/certificates/verify/${certificateId.trim()}`);
      
      if (response.valid) {
        setStatus('valid');
        setResult(response.certificate);
      } else if (response.certificate?.status === 'revoked') {
        setStatus('revoked');
        setResult(response.certificate);
      } else {
        setStatus('invalid');
        setErrorMsg(response.message || 'Certificate not found');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Verification failed. Please try again.');
    }
  };

  const handleReset = () => {
    setCertificateId('');
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary/10 text-theme-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <Search size={12} /> Verify Certificate
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-theme-text-strong mb-4">
            Verify Certificate Authenticity
          </h2>
          <p className="text-base md:text-lg text-theme-text-muted font-medium max-w-2xl mx-auto">
            Enter a certificate ID to instantly verify its authenticity
          </p>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          className="neo-card p-6 md:p-10 space-y-6"
        >
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cert-id" className="text-xs font-bold text-theme-text-strong uppercase tracking-wider">
                Certificate ID
              </label>
              <div className="flex gap-3">
                <input
                  id="cert-id"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                  placeholder="HACK-CERT-2026-XXXXXX"
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-mono font-medium placeholder:text-theme-text-muted/50 focus:outline-none focus:border-theme-secondary/50 focus:shadow-glow-secondary transition-all disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || !certificateId.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-theme-secondary to-theme-secondary-dark text-white font-bold text-sm shadow-glow-secondary hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="hidden sm:inline">Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      <span className="hidden sm:inline">Verify</span>
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-theme-text-muted">Example format: HACK-CERT-2026-A1B2C3</p>
            </div>
          </form>

          {/* Results */}
          {status === 'valid' && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-500 space-y-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={28} className="text-green-600" />
                <h3 className="text-xl font-black text-green-700 dark:text-green-400">Valid Certificate</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Certificate ID:</span>
                  <span className="font-mono text-green-700 dark:text-green-400">{result.certificateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Student Name:</span>
                  <span className="text-green-700 dark:text-green-400">{result.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Course:</span>
                  <span className="text-green-700 dark:text-green-400">{result.courseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Course Code:</span>
                  <span className="font-mono text-green-700 dark:text-green-400">{result.courseCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Batch ID:</span>
                  <span className="font-mono text-green-700 dark:text-green-400">{result.batchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Issue Date:</span>
                  <span className="text-green-700 dark:text-green-400">
                    {new Date(result.issueDate).toLocaleDateString()}
                  </span>
                </div>
                {result.grade && (
                  <div className="flex justify-between">
                    <span className="font-bold text-green-900 dark:text-green-300">Grade:</span>
                    <span className="text-green-700 dark:text-green-400">{result.grade}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Duration:</span>
                  <span className="text-green-700 dark:text-green-400">{result.metadata?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-green-900 dark:text-green-300">Status:</span>
                  <span className="font-bold text-green-600 dark:text-green-400 uppercase">✓ Active</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-green-700 dark:text-green-400 hover:underline font-bold"
              >
                Verify Another Certificate
              </button>
            </motion.div>
          )}

          {status === 'revoked' && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 space-y-3"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle size={28} className="text-yellow-600" />
                <h3 className="text-xl font-black text-yellow-700 dark:text-yellow-400">Certificate Revoked</h3>
              </div>
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
                This certificate has been revoked and is no longer valid.
              </p>
              <div className="text-xs text-yellow-700 dark:text-yellow-400">
                <p>Certificate ID: {result.certificateId}</p>
                <p>Student: {result.studentName}</p>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-yellow-700 dark:text-yellow-400 hover:underline font-bold"
              >
                Verify Another Certificate
              </button>
            </motion.div>
          )}

          {status === 'invalid' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-500 space-y-3"
            >
              <div className="flex items-center gap-3">
                <XCircle size={28} className="text-red-600" />
                <h3 className="text-xl font-black text-red-700 dark:text-red-400">Certificate Not Found</h3>
              </div>
              <p className="text-sm font-bold text-red-800 dark:text-red-300">{errorMsg}</p>
              <p className="text-xs text-red-700 dark:text-red-400">
                Please check the certificate ID and try again.
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-red-700 dark:text-red-400 hover:underline font-bold"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-500 space-y-3"
            >
              <div className="flex items-center gap-3">
                <XCircle size={28} className="text-red-600" />
                <h3 className="text-xl font-black text-red-700 dark:text-red-400">Verification Error</h3>
              </div>
              <p className="text-sm font-bold text-red-800 dark:text-red-300">{errorMsg}</p>
              <button
                onClick={handleReset}
                className="text-xs text-red-700 dark:text-red-400 hover:underline font-bold"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </motion.div>
      </FadeIn>
    </div>
  );
};

export default CertificateVerification;
