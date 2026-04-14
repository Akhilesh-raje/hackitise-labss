import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  ShieldCheck, 
  LogOut, 
  Shield,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Mail, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: Briefcase, label: 'Applications', path: '/admin/applications' },
    { icon: BookOpen, label: 'Blog Posts', path: '/admin/content/blog' },
    { icon: Briefcase, label: 'Job Listings', path: '/admin/content/jobs' },
    { icon: HelpCircle, label: 'FAQs', path: '/admin/content/faqs' },
    { icon: MessageSquare, label: 'Testimonials', path: '/admin/content/testimonials' },
    { icon: ShieldCheck, label: 'Case Studies', path: '/admin/content/case-studies' },
  ];

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-theme-bg border-r border-theme-border sticky top-0 h-screen">
        <div className="p-6 border-b border-theme-border">
          <div className="flex items-center gap-2 text-theme-primary">
            <Shield size={24} />
            <span className="font-black text-xl tracking-tighter uppercase">Admin <span className="text-theme-text-strong">Portal</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-theme-primary text-theme-text-inverse shadow-glow-primary' 
                    : 'text-theme-text-muted hover:bg-theme-primary/10 hover:text-theme-primary'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-theme-border space-y-4">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary">
              <User size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-theme-text-strong truncate">{user?.name}</p>
              <p className="text-[10px] text-theme-text-muted truncate">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-theme-bg border-b border-theme-border sticky top-0 z-50">
        <div className="flex items-center gap-2 text-theme-primary">
          <Shield size={20} />
          <span className="font-black text-lg tracking-tighter uppercase">Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-theme-text-strong"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-40 bg-theme-bg md:hidden pt-20"
        >
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                    isActive 
                      ? 'bg-theme-primary text-theme-text-inverse shadow-glow-primary' 
                      : 'text-theme-text-muted border border-transparent'
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
            <button 
              onClick={logout}
              className="flex items-center gap-4 w-full px-6 py-4 rounded-xl text-lg font-bold text-red-500 mt-10"
            >
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </motion.div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
