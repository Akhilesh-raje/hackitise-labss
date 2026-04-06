import React from 'react';
import { Shield, TrendingUp, Activity } from 'lucide-react';

const InfoCards = () => {
  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      
      {/* Overview Card */}
      <div className="neo-card flex-1 p-5 flex items-center justify-between group hover:shadow-neo-in transition-all cursor-pointer border border-transparent hover:border-theme-secondary/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-secondary/20 to-theme-secondary-dark/20 flex items-center justify-center text-theme-secondary-dark group-hover:scale-110 transition-transform">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider">Threat Overview</h4>
            <div className="text-xl font-extrabold text-theme-primary-dark">2,845 alerts</div>
          </div>
        </div>
      </div>

      {/* Insights Card */}
      <div className="neo-card flex-1 p-5 flex items-center justify-between group hover:shadow-neo-in transition-all cursor-pointer border border-transparent hover:border-theme-primary/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-primary-dark/20 flex items-center justify-center text-theme-primary-dark group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider">Attack Growth</h4>
            <div className="text-xl font-extrabold text-theme-secondary-dark">+14.2% / week</div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="neo-card flex-1 p-5 flex items-center justify-between group hover:shadow-neo-in transition-all cursor-pointer border border-transparent hover:border-amber-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider">System Health</h4>
            <div className="text-xl font-extrabold text-theme-text-strong">92/100 score</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InfoCards;
