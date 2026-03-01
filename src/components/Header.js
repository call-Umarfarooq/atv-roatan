'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search, Phone, X, Mail, MapPin, Facebook, Twitter, Instagram,
  Linkedin, Youtube, ChevronDown, ShieldCheck, Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Tours', href: '/tours' },
  { label: 'Categories', href: '/category' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Reviews', href: 'https://maps.app.goo.gl/aZUsRT1JTetqxSrg7' },
];

const Header = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null); // 'excursions' | 'ports' | null
  const [tours, setTours] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tours');
        const data = await res.json();
        if (data.success) {
          setAllTours(data.data);
          setTours(data.data.slice(0, 10));
        }
        const activitiesRes = await fetch('/api/activities');
        const activitiesData = await activitiesRes.json();
        if (activitiesData.success) {
          setActivities(activitiesData.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch tours for header:', error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = allTours.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, allTours]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">

        {/* ── Top Bar ── */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="shrink-0">
            <a href="/">
              <Image
                src="/images/atv-logo.png"
                alt="ATV Roatan"
                width={40}
                height={40}
                className="object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('http');
              const isActive = !isExternal && (
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(link.href + '/')
              );
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#00694B] border-b-2 border-[#00694B] pb-0.5'
                      : 'text-gray-600 hover:text-[#00694B]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Search + Phone + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Search */}
            <div ref={searchRef} className="relative flex items-center">
              <div className={`relative flex items-center transition-all duration-300 ${searchOpen ? 'w-48 sm:w-64' : 'w-8'}`}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-gray-600 hover:text-[#00694B] transition-colors relative z-10"
                  aria-label="Toggle search"
                >
                  {searchOpen ? <X size={20} /> : <Search size={20} />}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 h-10 pl-10 pr-4 rounded-full border border-gray-300 bg-white placeholder:text-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent shadow-sm text-sm transition-all duration-300 ease-in-out ${
                    searchOpen
                      ? 'w-48 sm:w-64 opacity-100 pointer-events-auto'
                      : 'w-0 opacity-0 pointer-events-none border-transparent'
                  }`}
                />

                {/* Search Results */}
                {searchOpen && searchQuery && (
                  <div className="absolute top-12 right-0 w-72 sm:w-80 bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((tour) => (
                          <a
                            key={tour._id}
                            href={`/product/${tour.slug}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                            onClick={() => setSearchOpen(false)}
                          >
                            <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={tour.image_url || '/images/placeholder.jpg'}
                                alt={tour.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{tour.title}</h4>
                              <p className="text-xs text-[#00694B] font-medium">View Tour</p>
                            </div>
                          </a>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No tours found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Phone (hidden on small mobile) */}
            <a
              href="tel:+50412345678"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#00694B] hover:text-[#004d36] transition-colors"
            >
              <Phone size={16} />
              <span className="hidden lg:inline">+504 1234-5678</span>
            </a>

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden text-gray-700 hover:text-[#00694B] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Secondary Green Bar (Desktop only) ── */}
        <div className="hidden md:block border-t border-gray-100 bg-[#00694B] text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm font-semibold tracking-wide">

              <div className="flex items-center gap-8">

                {/* Shore Excursions */}
                <div
                  className="relative h-10 flex items-center cursor-pointer group"
                  onMouseEnter={() => setActiveDropdown('excursions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="flex items-center gap-1 hover:text-gray-200 transition-colors">
                    <span>ROATAN SHORE EXCURSIONS</span>
                    <ChevronDown size={16} />
                  </div>

                  {activeDropdown === 'excursions' && (
                    <div className="absolute top-10 left-0 w-[900px] bg-white text-gray-800 shadow-xl rounded-b-md border-t-2 border-[#004d36] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="grid grid-cols-5 gap-4 p-6">
                        {activities.length > 0 ? (
                          activities.map((activity) => (
                            <a
                              key={activity._id}
                              href={`/activities/${activity.slug}`}
                              className="flex flex-col gap-2 group/item"
                            >
                              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm group-hover/item:shadow-md transition-all">
                                <Image
                                  src={activity.image || '/images/placeholder.jpg'}
                                  alt={activity.title}
                                  fill
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <span className="text-xs font-bold text-gray-700 text-center uppercase tracking-tight group-hover/item:text-[#00694B] leading-tight">
                                {activity.title}
                              </span>
                            </a>
                          ))
                        ) : (
                          <div className="col-span-5 p-4 text-center text-gray-500">Loading activities...</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cruise Ports */}
                <div
                  className="relative h-10 flex items-center cursor-pointer group"
                  onMouseEnter={() => setActiveDropdown('ports')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="flex items-center gap-1 hover:text-gray-200 transition-colors">
                    <span>ROATAN CRUISE PORTS</span>
                    <ChevronDown size={16} />
                  </div>

                  {activeDropdown === 'ports' && (
                    <div className="absolute top-10 left-0 w-[900px] bg-white text-gray-800 shadow-xl rounded-b-md border-t-2 border-[#004d36] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="grid grid-cols-4 gap-6 p-6">
                        <a href="/port-of-roatan" className="flex flex-col gap-2 group/item">
                          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm group-hover/item:shadow-md transition-all">
                            <Image src="/images/hero.png" alt="Port of Roatan" fill className="object-cover group-hover/item:scale-105 transition-transform duration-300" />
                          </div>
                          <span className="text-sm font-bold text-gray-700 text-center group-hover/item:text-[#00694B]">Port of Roatan (Coxen Hole)</span>
                        </a>

                        <a href="/port-of-roatan-cruise-ship-schedule" className="flex flex-col gap-2 group/item">
                          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm group-hover/item:shadow-md transition-all">
                            <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                              <span className="text-4xl">📅</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-700 text-center group-hover/item:text-[#00694B]">Port of Roatan Schedule</span>
                        </a>

                        <a href="/isla-tropicale-cruise-ship-port" className="flex flex-col gap-2 group/item">
                          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm group-hover/item:shadow-md transition-all">
                            <Image src="/images/hero.png" alt="Isla Tropicale" fill className="object-cover group-hover/item:scale-105 transition-transform duration-300" />
                          </div>
                          <span className="text-sm font-bold text-gray-700 text-center group-hover/item:text-[#00694B]">Isla Tropicale (Mahogany Bay)</span>
                        </a>

                        <a href="/isla-tropicale-cruise-ship-port-schedule" className="flex flex-col gap-2 group/item">
                          <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100 shadow-sm group-hover/item:shadow-md transition-all">
                            <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
                              <span className="text-4xl">📅</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-700 text-center group-hover/item:text-[#00694B]">Isla Tropicale Schedule</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to Ship Guarantee */}
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={18} />
                <span>BACK TO SHIP GUARANTEE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-[70] md:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Image src="/images/atv-logo.png" alt="ATV Roatan" width={36} height={36} className="object-contain" />
                <button
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-[#00694B] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-4">

                {/* Main Nav Links */}
                <nav className="px-4 mb-4">
                  {navLinks.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    const isActive = !isExternal && (
                      link.href === '/'
                        ? pathname === '/'
                        : pathname === link.href || pathname.startsWith(link.href + '/')
                    );
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={closeMobileMenu}
                        className={`flex items-center py-3 px-2 text-base font-medium border-b border-gray-100 transition-colors ${
                          isActive ? 'text-[#00694B]' : 'text-gray-700 hover:text-[#00694B]'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                {/* Green Bar Items (collapsed accordion on mobile) */}
                <div className="px-4 mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Explore</p>

                  {/* Shore Excursions Accordion */}
                  <div className="border border-gray-100 rounded-lg mb-2 overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileDropdown(mobileDropdown === 'excursions' ? null : 'excursions')}
                    >
                      <span>Roatan Shore Excursions</span>
                      <motion.span animate={{ rotate: mobileDropdown === 'excursions' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileDropdown === 'excursions' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          <div className="grid grid-cols-2 gap-3 p-3">
                            {activities.length > 0 ? (
                              activities.map((activity) => (
                                <a
                                  key={activity._id}
                                  href="/#choose-your-adventure"
                                  onClick={closeMobileMenu}
                                  className="flex flex-col gap-1.5 group"
                                >
                                  <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100">
                                    <Image
                                      src={activity.image || '/images/placeholder.jpg'}
                                      alt={activity.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-xs font-bold text-gray-700 text-center uppercase leading-tight group-hover:text-[#00694B]">
                                    {activity.title}
                                  </span>
                                </a>
                              ))
                            ) : (
                              <p className="col-span-2 text-center text-sm text-gray-400 py-2">Loading...</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Cruise Ports Accordion */}
                  <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileDropdown(mobileDropdown === 'ports' ? null : 'ports')}
                    >
                      <span>Roatan Cruise Ports</span>
                      <motion.span animate={{ rotate: mobileDropdown === 'ports' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileDropdown === 'ports' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          <div className="grid grid-cols-2 gap-3 p-3">
                            <a href="/port-of-roatan" onClick={closeMobileMenu} className="flex flex-col gap-1.5 group">
                              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100">
                                <Image src="/images/hero.png" alt="Port of Roatan" fill className="object-cover" />
                              </div>
                              <span className="text-xs font-bold text-gray-700 text-center group-hover:text-[#00694B]">Port of Roatan</span>
                            </a>
                            <a href="/port-of-roatan-cruise-ship-schedule" onClick={closeMobileMenu} className="flex flex-col gap-1.5 group">
                              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-blue-50 flex items-center justify-center">
                                <span className="text-3xl">📅</span>
                              </div>
                              <span className="text-xs font-bold text-gray-700 text-center group-hover:text-[#00694B]">Roatan Schedule</span>
                            </a>
                            <a href="/isla-tropicale-cruise-ship-port" onClick={closeMobileMenu} className="flex flex-col gap-1.5 group">
                              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-gray-100">
                                <Image src="/images/hero.png" alt="Isla Tropicale" fill className="object-cover" />
                              </div>
                              <span className="text-xs font-bold text-gray-700 text-center group-hover:text-[#00694B]">Isla Tropicale</span>
                            </a>
                            <a href="/isla-tropicale-cruise-ship-port-schedule" onClick={closeMobileMenu} className="flex flex-col gap-1.5 group">
                              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-green-50 flex items-center justify-center">
                                <span className="text-3xl">📅</span>
                              </div>
                              <span className="text-xs font-bold text-gray-700 text-center group-hover:text-[#00694B]">Tropicale Schedule</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Back to Ship Guarantee badge */}
                <div className="mx-4 bg-[#00694B] text-white rounded-lg px-4 py-3 flex items-center gap-3">
                  <ShieldCheck size={20} />
                  <span className="text-sm font-bold tracking-wide">BACK TO SHIP GUARANTEE</span>
                </div>
              </div>

              {/* Drawer Footer: Phone */}
              <div className="px-5 py-4 border-t border-gray-100">
                <a
                  href="tel:+50412345678"
                  className="flex items-center justify-center gap-2 w-full bg-[#00694B] hover:bg-[#004d36] text-white rounded-lg py-3 text-sm font-semibold transition-colors"
                >
                  <Phone size={16} />
                  +504 1234-5678
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
