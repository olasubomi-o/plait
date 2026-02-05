
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-6 flex justify-between items-center bg-transparent backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
        <span className="logo-text text-2xl md:text-3xl uppercase text-white">Plait</span>
      </div>
      <div className="relative">
        <button 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(true)}
          className="px-6 md:px-8 py-2 border border-white/20 rounded-full text-[10px] md:text-xs font-semibold tracking-widest hover:bg-white/10 transition-all uppercase text-white min-w-[120px]"
        >
          {isHovered ? 'Coming Soon' : 'Log In'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
