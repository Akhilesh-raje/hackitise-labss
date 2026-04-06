import React from 'react';
import { Home, LayoutGrid, Settings, User } from 'lucide-react';

const FooterNav = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card px-8 py-3 rounded-full flex items-center gap-8 border-t border-theme-border/60 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        
        <button className="flex flex-col items-center gap-1 text-theme-primary-dark group">
          <div className="p-2 rounded-full bg-theme-bg shadow-neo-in group-hover:bg-theme-card transition-colors">
            <Home size={20} />
          </div>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-secondary-dark group transition-colors">
          <div className="p-2 rounded-full hover:bg-theme-bg hover:shadow-neo-in transition-all">
            <LayoutGrid size={20} />
          </div>
        </button>

        <button className="relative flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-secondary-dark group transition-colors -top-4">
          <div className="p-4 rounded-full bg-gradient-to-tr from-theme-secondary to-theme-secondary-dark shadow-glow-secondary text-theme-text-inverse hover:scale-110 transition-transform">
            <div className="w-6 h-6 border-2 border-theme-border rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-theme-card rounded-full"></div>
            </div>
          </div>
        </button>

        <button className="flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-secondary-dark group transition-colors">
          <div className="p-2 rounded-full hover:bg-theme-bg hover:shadow-neo-in transition-all">
            <Settings size={20} />
          </div>
        </button>

        <button className="flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-secondary-dark group transition-colors">
          <div className="p-2 rounded-full hover:bg-theme-bg hover:shadow-neo-in transition-all">
            <User size={20} />
          </div>
        </button>

      </div>
    </div>
  );
};

export default FooterNav;
