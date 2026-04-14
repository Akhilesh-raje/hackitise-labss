import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Trash2, Search, ExternalLink } from 'lucide-react';
import { api } from '../../utils/api';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInquiries = async () => {
    try {
      const response = await api.get('/contact');
      if (response.success) {
        setInquiries(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      setInquiries(prev => prev.map(item => item._id === id ? { ...item, status } : item));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filtered = inquiries.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8"><p className="text-theme-primary animate-pulse font-bold uppercase tracking-widest">Initialising Stream...</p></div>;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest">
          Inbound <span className="text-theme-primary">Intel</span>
        </h1>
        <p className="text-sm text-theme-text-muted font-medium mt-1">
          Monitor and respond to personnel inquiries and mission requests.
        </p>
      </div>

      <div className="neo-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" size={18} />
            <input 
              type="text"
              placeholder="Search by identity or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-theme-text-muted uppercase tracking-widest mr-2">Status Key:</span>
            <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">Pending</span>
            <span className="px-2 py-1 rounded bg-theme-primary/10 text-theme-primary text-[10px] font-bold uppercase tracking-widest">Read</span>
            <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">Replied</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border/50 text-[10px] font-black text-theme-text-muted uppercase tracking-widest">
                <th className="px-4 py-4">Identity</th>
                <th className="px-4 py-4">Message Segment</th>
                <th className="px-4 py-4">Timestamp</th>
                <th className="px-4 py-4 text-center">Protocol Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/30">
              {filtered.map((item) => (
                <tr key={item._id} className="group hover:bg-theme-primary/5 transition-all">
                  <td className="px-4 py-5">
                    <div className="font-bold text-theme-text-strong text-sm">{item.name}</div>
                    <div className="text-xs text-theme-text-muted flex items-center gap-2 mt-1">
                      <Mail size={12} className="text-theme-primary" /> {item.email}
                    </div>
                    {item.phone && (
                      <div className="text-xs text-theme-text-muted flex items-center gap-2 mt-1">
                        <Phone size={12} className="text-theme-secondary" /> {item.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-xs text-theme-text-muted max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-w-md transition-all">
                      {item.message}
                    </div>
                  </td>
                  <td className="px-4 py-5 text-xs text-theme-text-muted font-medium">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <select 
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded shadow-neo-out focus:outline-none border border-transparent transition-all cursor-pointer ${
                        item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        item.status === 'read' ? 'bg-theme-primary/10 text-theme-primary' :
                        'bg-green-500/10 text-green-500'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button className="p-2 text-theme-text-muted hover:text-red-500 transition-colors" title="Remove Entry">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-theme-text-muted italic">No inquiries detected in this frequency segment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
