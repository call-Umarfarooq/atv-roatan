'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, Phone, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'All Tours', href: '/tours' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Reviews', href: '/reviews' },
];

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="shrink-0">
          <Image
            src="/images/atv-logo.png"
            alt="ATV Roatan"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.active
                  ? 'text-[#00694B] border-b-2 border-[#00694B] pb-0.5'
                  : 'text-gray-600 hover:text-[#00694B]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Search & Phone */}
        <div className="flex items-center gap-4 shrink-0">
          <div ref={searchRef} className="relative flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              {searchOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Search size={20} className="text-gray-700" />
              )}
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tours..."
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 h-10 pl-10 pr-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent shadow-sm text-sm transition-all duration-300 ease-in-out ${
                searchOpen ? 'w-64 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none border-transparent'
              }`}
            />
          </div>
          <a
            href="tel:+50412345678"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#00694B] hover:text-[#004d36] transition-colors"
          >
            <Phone size={16} />
            <span>+504 1234-5678</span>
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;