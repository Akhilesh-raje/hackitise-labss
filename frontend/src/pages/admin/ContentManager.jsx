import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Clock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  X,
  Save,
  Loader2
} from 'lucide-react';
import { api } from '../../utils/api';

const ContentManager = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Configuration for different content types
  const config = {
    blog: { icon: 'BookOpen', color: 'theme-primary', fields: ['title', 'description', 'slug', 'icon', 'color'] },
    jobs: { icon: 'Briefcase', color: 'theme-secondary', fields: ['title', 'location', 'type', 'skills', 'color', 'order'] },
    faqs: { icon: 'HelpCircle', color: 'theme-primary', fields: ['question', 'answer', 'order'] },
    testimonials: { icon: 'MessageSquare', color: 'theme-secondary', fields: ['name', 'role', 'text', 'rating', 'color'] },
    'case-studies': { icon: 'ShieldCheck', color: 'theme-primary', fields: ['title', 'problem', 'action', 'result', 'icon', 'color', 'order'] },
  };

  const currentConfig = config[type] || config.blog;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/content/${type}/all`); // Admin endpoint to get all (including unpublished)
      if (response.success) {
        setItems(response.data);
      }
    } catch (err) {
      // Fallback if /all doesn't exist yet or fails
      try {
        const fallbackRes = await api.get(`/${type === 'blog' ? 'blog' : type === 'case-studies' ? 'case-studies' : type}`);
        if(fallbackRes.success) setItems(fallbackRes.data);
      } catch (e) {
        setError('Failed to load frequency stream.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const togglePublish = async (id, currentStatus) => {
    try {
      await api.put(`/${type === 'blog' ? 'blog' : type === 'case-studies' ? 'case-studies' : type}/${id}`, { published: !currentStatus });
      setItems(items.map(i => i._id === id ? { ...i, published: !currentStatus } : i));
    } catch (err) {
      alert('Override failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to purge this data segment?')) return;
    try {
      await api.delete(`/${type === 'blog' ? 'blog' : type === 'case-studies' ? 'case-studies' : type}/${id}`);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      alert('Erasure failed.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    const newItem = { published: true };
    currentConfig.fields.forEach(f => newItem[f] = f === 'skills' ? [] : '');
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const endpoint = `/${type === 'blog' ? 'blog' : type === 'case-studies' ? 'case-studies' : type}`;
      let response;
      if (editingItem._id) {
        response = await api.put(`${endpoint}/${editingItem._id}`, editingItem);
      } else {
        response = await api.post(endpoint, editingItem);
      }
      
      if (response.success) {
        fetchItems();
        setIsModalOpen(false);
      }
    } catch (err) {
      alert('Save cycle interrupted: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = items.filter(item => 
    Object.values(item).some(val => 
      typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return <div className="p-8"><p className="text-theme-primary animate-pulse font-bold uppercase tracking-widest">Synchronizing Encrypted Data...</p></div>;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-theme-text-strong uppercase tracking-widest flex items-center gap-3">
            <span className={`text-${currentConfig.color}`}>{type.replace('-', ' ')}</span> Records
          </h1>
          <p className="text-sm text-theme-text-muted font-medium mt-1">
            Maintain site integrity by updating core intel segments.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-${currentConfig.color}/10 text-${currentConfig.color} border border-${currentConfig.color}/20 font-black uppercase tracking-widest text-xs hover:bg-${currentConfig.color} hover:text-white transition-all shadow-glow-${currentConfig.color === 'theme-primary' ? 'primary' : 'secondary'}`}
        >
          <Plus size={18} /> Add New Entry
        </motion.button>
      </div>

      <div className="neo-card p-6">
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" size={18} />
          <input 
            type="text"
            placeholder="Filter data streams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border/50 text-[10px] font-black text-theme-text-muted uppercase tracking-widest">
                <th className="px-4 py-4">Descriptor</th>
                <th className="px-4 py-4">Visibility</th>
                <th className="px-4 py-4">Last Updated</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/30">
              {filtered.map((item) => (
                <tr key={item._id} className="group hover:bg-theme-primary/5 transition-all">
                  <td className="px-4 py-5">
                    <div className="font-bold text-theme-text-strong text-sm">{item.title || item.question || item.name}</div>
                    <div className="text-[10px] text-theme-text-muted mt-1 uppercase tracking-tighter truncate max-w-[200px]">
                      {item.description || item.answer || item.role || item.problem}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <button 
                      onClick={() => togglePublish(item._id, item.published)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        item.published 
                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      {item.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {item.published ? 'Live' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-5 text-xs text-theme-text-muted font-medium">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 text-theme-text-muted hover:text-theme-primary transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-theme-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-10 text-center text-sm text-theme-text-muted italic">No records active in this segment.</div>}
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-theme-bg/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="neo-card w-full max-w-2xl p-8 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-theme-text-strong uppercase tracking-widest">
                  {editingItem?._id ? 'Modify' : 'Initialize'} {type.replace('-', ' ')}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-theme-text-muted hover:text-theme-text-strong">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={saveItem} className="space-y-6">
                {currentConfig.fields.map(field => (
                  <div key={field} className="space-y-2">
                    <label className="text-[10px] font-black text-theme-text-strong uppercase tracking-widest block">{field}</label>
                    {field === 'description' || field === 'answer' || field === 'text' || field === 'problem' || field === 'action' || field === 'result' ? (
                      <textarea 
                        value={editingItem[field]}
                        onChange={(e) => setEditingItem({...editingItem, [field]: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium resize-none"
                        rows={4}
                      />
                    ) : field === 'skills' ? (
                      <input 
                        type="text"
                        value={Array.isArray(editingItem[field]) ? editingItem[field].join(', ') : editingItem[field]}
                        onChange={(e) => setEditingItem({...editingItem, [field]: e.target.value.split(',').map(s => s.trim())})}
                        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium"
                        placeholder="Comma separated skills..."
                      />
                    ) : (
                      <input 
                        type={field === 'order' || field === 'rating' ? 'number' : 'text'}
                        value={editingItem[field]}
                        onChange={(e) => setEditingItem({...editingItem, [field]: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-primary/50 transition-all font-medium"
                      />
                    )
                    }
                  </div>
                ))}

                <div className="pt-6 border-t border-theme-border/30 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-theme-text-muted hover:text-theme-text-strong transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-theme-primary text-theme-text-inverse font-black uppercase tracking-widest text-xs shadow-glow-primary hover:opacity-90 transition-all disabled:opacity-70"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Commit Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManager;
