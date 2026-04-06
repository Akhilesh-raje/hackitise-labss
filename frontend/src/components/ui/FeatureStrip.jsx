import React, { useState } from 'react';

const tabs = ['Overview', 'Analytics', 'Reports', 'Settings', 'Integrations'];

const FeatureStrip = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 hide-scrollbar pt-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300
            ${activeTab === tab 
              ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-theme-text-inverse shadow-glow-primary scale-105'
              : 'neo-card text-theme-text-muted hover:text-theme-primary-dark hover:shadow-neo-in border-transparent'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FeatureStrip;
