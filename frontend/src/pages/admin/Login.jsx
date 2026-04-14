import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CyberGrid } from '../../components/ui/AnimationUtils';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLocal, setErrorLocal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorLocal('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorLocal(result.message || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <CyberGrid />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="neo-card p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary" />
          
          <div className="text-center mb-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-theme-primary/10 flex items-center justify-center text-theme-primary mx-auto shadow-glow-primary mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">
              Admin <span className="text-theme-primary">Terminal</span>
            </h1>
            <p className="text-sm text-theme-text-muted font-medium">
              Authorized personnel only. Access is monitored and logged.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-theme-text-strong uppercase tracking-widest block pl-1">
                Identity (Email)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-theme-text-muted group-focus-within:text-theme-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hackitiselabs.in"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/30 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-theme-text-strong uppercase tracking-widest block pl-1">
                Access Key (Password)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-theme-text-muted group-focus-within:text-theme-primary transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm font-medium placeholder:text-theme-text-muted/30 focus:outline-none focus:border-theme-primary/50 focus:shadow-glow-primary transition-all"
                />
              </div>
            </div>

            {errorLocal && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2"
              >
                <ShieldAlert size={16} />
                {errorLocal}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity disabled:opacity-70"
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> Authenticating...</>
              ) : (
                <><Lock size={16} /> Initialize Login <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-theme-border/30 text-center">
            <a href="/" className="text-[10px] font-black text-theme-text-muted hover:text-theme-primary uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5">
              Discard & Return to Command Center
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
