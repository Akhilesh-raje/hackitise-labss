import React from 'react';
import { ChevronLeft, ChevronRight, Activity, Shield, Users, Server } from 'lucide-react';

const carouselItems = [
  { id: 1, title: 'Network Traffic', desc: 'Real-time packet monitoring', icon: Activity, color: 'text-theme-secondary-dark' },
  { id: 2, title: 'Firewall Rules', desc: 'Active policies: 442', icon: Shield, color: 'text-theme-primary-dark' },
  { id: 3, title: 'Active Sessions', desc: 'Users monitored: 1,204', icon: Users, color: 'text-amber-500' },
  { id: 4, title: 'Server Health', desc: 'All systems operational', icon: Server, color: 'text-rose-500' },
  { id: 5, title: 'Intrusion Blocked', desc: '24 attempts stopped', icon: Shield, color: 'text-theme-secondary' },
  { id: 6, title: 'Malware Scans', desc: 'All nodes clean', icon: Activity, color: 'text-theme-primary' },
];

const Carousel = () => {
  return (
    <div className="relative mt-8 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-theme-primary-dark px-2">Quick Metrics</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-theme-card shadow-neo-out flex items-center justify-center text-theme-text-muted hover:text-theme-secondary-dark active:shadow-neo-in transition-all">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-theme-card shadow-neo-out flex items-center justify-center text-theme-text-muted hover:text-theme-secondary-dark active:shadow-neo-in transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar px-2 snap-x snap-mandatory">
        {carouselItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="min-w-[280px] neo-card p-6 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(20,92,94,0.15)] transition-all cursor-pointer snap-start border border-transparent hover:border-theme-primary/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl pointer-events-none group-hover:bg-theme-primary/10 transition-colors" />
              
              <div className="w-12 h-12 rounded-2xl bg-theme-card shadow-neo-out flex items-center justify-center mb-6">
                <Icon className={item.color} size={24} />
              </div>
              
              <div>
                <h4 className="font-bold text-theme-text text-lg">{item.title}</h4>
                <p className="text-theme-text-muted text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
