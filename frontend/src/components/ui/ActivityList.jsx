import React from 'react';
import { ShieldAlert, Activity, Database, Zap, Lock } from 'lucide-react';

const activities = [
  { id: 1, title: 'Unauthorized Login Attempt Blocked', time: '1m ago', icon: Lock, color: 'text-rose-500', bg: 'bg-rose-100', severity: 'Critical' },
  { id: 2, title: 'Firewall Rule Triggered', time: '12m ago', icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-100', severity: 'Medium' },
  { id: 3, title: 'Suspicious IP Detected (Russia)', time: '45m ago', icon: Zap, color: 'text-rose-500', bg: 'bg-rose-100', severity: 'Critical' },
  { id: 4, title: 'Malware Signature Identified', time: '2h ago', icon: Database, color: 'text-theme-secondary-dark', bg: 'bg-theme-secondary/20', severity: 'Medium' },
  { id: 5, title: 'Network Spike Detected', time: '4h ago', icon: Activity, color: 'text-theme-primary-dark', bg: 'bg-theme-primary/20', severity: 'Low' },
];

const ActivityList = () => {
  return (
    <div className="neo-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-theme-primary-dark text-lg">System Logs</h3>
        <button className="text-xs font-semibold text-theme-secondary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4 flex-1">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-theme-bg shadow-neo-in group cursor-pointer border border-transparent hover:border-theme-secondary/20 transition-all">
              <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shadow-sm shrink-0`}>
                <Icon className={item.color} size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-semibold text-theme-text truncate group-hover:text-theme-primary-dark transition-colors">{item.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-theme-text-muted font-medium">{item.time}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    item.severity === 'Critical' ? 'bg-rose-100 text-rose-600' :
                    item.severity === 'Medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-theme-primary/20 text-theme-primary-dark'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityList;
