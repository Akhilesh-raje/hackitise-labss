import React from 'react';
import { Search, Mic, SlidersHorizontal, Plus } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4">
      {/* Search Input Container */}
      <div className="flex-1 neo-card flex items-center px-6 py-4">
        <Search className="text-theme-text-muted mr-4" size={20} />
        <input 
          type="text" 
          placeholder="Search vulnerabilities, reports, threats, or CVEs..." 
          className="flex-1 bg-transparent border-none outline-none text-theme-primary-dark placeholder-gray-400 font-medium"
        />
        <div className="flex items-center gap-3 border-l border-gray-300 pl-4 ml-4">
          <button className="text-theme-text-muted hover:text-theme-secondary-dark transition-colors">
            <Mic size={20} />
          </button>
          <button className="text-theme-text-muted hover:text-theme-primary-dark transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>
      
      {/* Action Button */}
      <button className="h-[60px] w-[60px] shrink-0 rounded-full flex items-center justify-center bg-gradient-to-tr from-theme-secondary to-theme-secondary-dark text-theme-text-inverse shadow-glow-secondary hover:scale-105 transition-transform">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
