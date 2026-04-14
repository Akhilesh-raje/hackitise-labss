import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Clock, Download, FileText, Search, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { api } from '../../utils/api';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApps = async () => {
    try {
      const response = await api.get('/applications');
      if (response.success) {
        setApps(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, { status });
      setApps(prev => prev.map(item => item._id === id ? { ...item, status } : item));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filtered = apps.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8"><p className="text-theme-primary animate-pulse font-bold uppercase tracking-widest">Scanning Databases...</p></div>;

  const getFullResumeUrl = (path) => {
    if (!path) return null;
    // Backend is on port 4000
    const BASE = 'http://localhost:4000';
    return `${BASE}/uploads/${path.split('\\').pop().split('/').pop()}`;
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">
          Recruitment <span className="text-theme-secondary">Pipeline</span>
        </h1>
        <p className="text-sm text-theme-text-muted font-medium mt-1">
          Review operative candidates and evaluate mission-ready talent.
        </p>
      </div>

      <div className="neo-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" size={18} />
            <input 
              type="text"
              placeholder="Search by candidate, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-theme-text-muted uppercase tracking-widest mr-2">Status Key:</span>
            <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">Received</span>
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest">Reviewing</span>
            <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">Interview</span>
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest">Rejected</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border/50 text-[10px] font-black text-theme-text-muted uppercase tracking-widest">
                <th className="px-4 py-4">Operative Identity</th>
                <th className="px-4 py-4">Applied Role</th>
                <th className="px-4 py-4">Asset (Resume)</th>
                <th className="px-4 py-4 text-center">Protocol Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/30">
              {filtered.map((item) => (
                <tr key={item._id} className="group hover:bg-theme-secondary/5 transition-all">
                  <td className="px-4 py-5">
                    <div className="font-bold text-theme-text-strong text-sm">{item.name}</div>
                    <div className="text-xs text-theme-text-muted flex items-center gap-2 mt-1">
                      <Mail size={12} className="text-theme-secondary" /> {item.email}
                    </div>
                    <div className="text-[10px] text-theme-text-muted font-medium mt-2 flex items-center gap-1">
                      <Clock size={10} /> {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-[11px] font-black text-theme-text-strong uppercase tracking-tight">
                      {item.role || 'Open Application'}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    {item.resumePath ? (
                      <a 
                        href={getFullResumeUrl(item.resumePath)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-theme-primary hover:underline group/file"
                      >
                        <FileText size={14} className="group-hover/file:scale-110 transition-transform" />
                        Download Asset
                        <Download size={14} />
                      </a>
                    ) : (
                      <span className="text-xs text-theme-text-muted italic flex items-center gap-2">
                        <AlertTriangle size={14} /> No file uploaded
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <select 
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded shadow-neo-out focus:outline-none border border-transparent transition-all cursor-pointer ${
                        item.status === 'received' ? 'bg-yellow-500/10 text-yellow-500' :
                        item.status === 'reviewing' ? 'bg-blue-500/10 text-blue-500' :
                        item.status === 'interviewing' ? 'bg-green-500/10 text-green-500' :
                        'bg-red-500/10 text-red-500'
                      }`}
                    >
                      <option value="received">Received</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button className="p-2 text-theme-text-muted hover:text-red-500 transition-colors" title="Purge Record">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-theme-text-muted italic">No candidate waves detected on this bandwidth.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
