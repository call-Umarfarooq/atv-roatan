import React from 'react';
import { 
  Search, 
  Globe, 
  Gift, 
  UserRound, 
  ChevronDown 
} from 'lucide-react'; //

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Discover */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex flex-col items-start leading-none">
            <span className="text-2xl font-black text-[#00694B] tracking-tighter">Atv </span>
            <span className="text-[8px] text-gray-500 font-medium">Roatan</span>
          </div>
          
          <button className="hidden md:flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-[#00694B]">
            Discover
            <ChevronDown size={16} /> {/* */}
          </button>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={20} strokeWidth={2.5} className="text-gray-900" /> {/* */}
          </div>
          <input
            type="text"
            placeholder="Roatan"
            className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent shadow-sm placeholder:text-gray-900 font-medium"
          />
        </div>

        {/* Right Section: Icons & Profile */}
        <div className="flex items-center gap-4 shrink-0 text-gray-700">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Globe size={24} /> {/* */}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Gift size={24} /> {/* */}
          </button>
          
          <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>
          
          <button className="flex items-center gap-1 p-1 pr-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow">
            <div className="bg-gray-200 rounded-full p-1">
              <UserRound size={20} className="text-gray-600" /> {/* */}
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;