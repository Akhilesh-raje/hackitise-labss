import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Users, FileText, Layout, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ inquiries: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [inq, app] = await Promise.all([
          api.get('/contact'),
          api.get('/applications')
        ]);
        setStats({
          inquiries: inq.data?.length || 0,
          applications: app.data?.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">
            Command <span className="text-theme-primary">Center</span>
          </h1>
          <p className="text-sm text-theme-text-muted font-medium mt-1">
            Welcome back, <span className="text-theme-primary font-bold">{user?.name}</span>. Internal systems are operational.
          </p>
        </div>
        
        <button 
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-white transition-all w-max"
        >
          <LogOut size={14} /> Terminate Session
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Unread Intel', value: stats.inquiries, icon: Terminal, color: 'theme-primary' },
          { label: 'Candidate Pool', value: stats.applications, icon: Users, color: 'theme-secondary' },
          { label: 'System Guard', value: 'Active', icon: Shield, color: 'green-500' },
          { label: 'Reports', value: stats.inquiries + stats.applications, icon: FileText, color: 'theme-primary' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="neo-card p-6 relative overflow-hidden group border border-theme-border hover:border-theme-primary/30 transition-all text-left"
          >
            <div className={`absolute -right-4 -top-4 w-20 h-20 bg-theme-primary/5 rounded-full blur-xl group-hover:bg-theme-primary/10 transition-all`} />
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color === 'theme-primary' ? 'theme-primary' : stat.color === 'theme-secondary' ? 'theme-secondary' : 'green-500'}/10 flex items-center justify-center text-${stat.color === 'theme-primary' ? 'theme-primary' : stat.color === 'theme-secondary' ? 'theme-secondary' : 'green-500'}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-theme-text-strong">
                  {loading ? <Loader2 size={16} className="animate-spin inline" /> : stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 neo-card p-6 min-h-[400px]">
          <h3 className="text-lg font-bold text-theme-text-strong mb-6 flex items-center gap-2">
             <Terminal size={18} className="text-theme-primary" /> Active Feed
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-theme-text-muted italic">No active data streams at this moment. Initiating sync...</p>
          </div>
        </div>
        
        <div className="neo-card p-6">
          <h3 className="text-lg font-bold text-theme-text-strong mb-6">System Health</h3>
          <div className="space-y-6">
            {[
              { label: 'Mainframe', status: 'Optimal', level: 98 },
              { label: 'Encryption', status: 'AES-256', level: 100 },
              { label: 'Firewall', status: 'Active', level: 85 },
              { label: 'Database', status: 'Connected', level: 92 },
            ].map((system, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest leading-none">
                  <span className="text-theme-text-strong">{system.label}</span>
                  <span className="text-theme-primary">{system.status}</span>
                </div>
                <div className="h-1.5 w-full bg-theme-border/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${system.level}%` }}
                    className="h-full bg-theme-primary shadow-glow-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
