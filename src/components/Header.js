'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search, Phone, X, Mail, MapPin, Facebook, Twitter, Instagram,
  Linkedin, Youtube, ChevronDown, ShieldCheck, Menu, Ship, Map, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinksLeft = [
  { label: 'Home', href: '/' },
  { label: 'All Tours', href: '/tours' },
  { label: 'Categories', href: '/category' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Gift Cards', href: '/gift-cards' },
];

const navLinksRight = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Reviews', href: 'https://maps.app.goo.gl/aZUsRT1JTetqxSrg7' },
];

const navLinks = [...navLinksLeft, ...navLinksRight];

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

  const handleDownloadCSV = () => {
    if (!allTours || allTours.length === 0) {
      alert("No tours available to download.");
      return;
    }

    const csvRows = [];
    // Header row
    csvRows.push(['Name', 'Slug', 'Price', 'Extra service name', 'Extra service price'].join(','));

    allTours.forEach(tour => {
      const name = `"${(tour.title || '').replace(/"/g, '""')}"`;
      const slug = `"${(tour.slug || '').replace(/"/g, '""')}"`;
      const price = tour.base_price || '';

      if (tour.extraServices && tour.extraServices.length > 0) {
        tour.extraServices.forEach((service, index) => {
          const serviceName = `"${(service.name || '').replace(/"/g, '""')}"`;
          const servicePrice = service.price || '';

          if (index === 0) {
            csvRows.push([name, slug, price, serviceName, servicePrice].join(','));
          } else {
            csvRows.push(['', '', '', serviceName, servicePrice].join(','));
          }
        });
      } else {
        csvRows.push([name, slug, price, '', ''].join(','));
      }
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tours_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          setActivities(activitiesData.data);
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
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = allTours.filter(tour => {
        const titleMatch = tour.title?.toLowerCase().includes(lowerQuery);
        const descMatch = tour.description?.toLowerCase().includes(lowerQuery);
        const locMatch = tour.marketing_badges?.location_text?.toLowerCase().includes(lowerQuery);
        const tagsMatch = tour.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

        return titleMatch || descMatch || locMatch || tagsMatch;
      });
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
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-[60]">
        {/* ── Top Bar (Utility) ── */}
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo + Text Stack */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/roatan-Eco-Adventures-logo .webp"
                alt="Roatan Eco-Adventures"
                width={50}
                height={50}
                className="object-contain w-10 h-10 sm:w-[50px] sm:h-[50px]"
              />
              <div className="flex flex-col">
                <span className="text-[#00694B] font-bold text-sm sm:text-[18px] leading-tight">Roatan Eco-Adventures</span>
                <span className="text-gray-500 text-[9px] sm:text-xs leading-tight">Roatan ATV, Buggy &amp; Golf Car Adventure</span>
              </div>
            </a>
          </div>

          {/* Right: Phone + Hours + CTA (Desktop) / CTA + Phone (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Phone + Hours (Desktop Only) */}
            <div className="hidden md:flex flex-col items-end mr-2">
              <a href="tel:+50412345678" className="text-[#00694B] font-bold text-lg hover:text-[#004d36] transition-colors flex items-center gap-1.5">
                <Phone size={18} fill="currentColor" /> +504 1234-5678
              </a>
              <span className="text-gray-500 text-xs font-medium">Open Daily · 7 AM – 6 PM</span>
            </div>

            {/* Mobile Phone Tap to Call */}
            <a href="tel:+50412345678" className="md:hidden text-[#00694B] hover:text-[#004d36] transition-colors p-1" aria-label="Call us">
              <Phone size={20} fill="currentColor" />
            </a>

            {/* Build Your Adventure CTA */}
            <motion.a
                href="/plan"
                animate={{
                  borderColor: ['rgba(0, 105, 75, 1)', 'rgba(0, 105, 75, 0.2)', 'rgba(0, 105, 75, 1)'],
                  boxShadow: ['0 0 8px 2px rgba(0, 105, 75, 0.6)', '0 0 2px 1px rgba(0, 105, 75, 0.1)', '0 0 8px 2px rgba(0, 105, 75, 0.6)'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-xs sm:text-sm font-bold border-2 text-[#00694B] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: 'white' }}
              >
                �� <span className="hidden sm:inline">Build Your Adventure</span>
                <span className="sm:hidden">Build</span>
            </motion.a>

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden text-gray-700 hover:text-[#00694B] transition-colors p-1 ml-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Bottom Bar (Nav Strip) - Desktop Only ── */}
        <div className="hidden md:block bg-[#00694B] text-white overflow-visible">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
            {/* Left Links */}
            <nav className="flex items-center gap-6">
              {navLinksLeft.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-white border-b-2 border-white pb-0.5' : 'text-white/80 hover:text-white'}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Links + Search */}
            <div className="flex items-center gap-6">
               {/* Right Nav Links */}
               <nav className="flex items-center gap-6">
                {navLinksRight.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-semibold tracking-wide transition-colors text-white/80 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
               </nav>
               
               {/* Search - Using the existing search logic */}
               <div ref={searchRef} className="relative flex items-center pl-2 border-l border-white/20">
                  <div className={`relative flex items-center transition-all duration-300 ${searchOpen ? 'w-64' : 'w-5'}`}>
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="text-white hover:text-white/80 transition-colors relative z-10"
                      aria-label="Toggle search"
                    >
                      <Search size={18} />
                    </button>

                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 h-8 pl-8 pr-8 rounded-full border-none bg-white placeholder:text-gray-500 text-gray-800 focus:outline-none shadow-xl text-sm transition-all duration-300 ease-in-out ${
                        searchOpen ? 'w-64 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'
                      }`}
                    />

                    {searchOpen && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchOpen(false);
                          setSearchResults([]);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 ${searchQuery ? 'text-gray-500 hover:text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                        aria-label="Close search"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {/* Search Results */}
                    {searchOpen && (
                      <div className="absolute top-10 right-0 w-80 bg-white rounded-md shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                        <div className="max-h-96 overflow-y-auto">
                          {(searchQuery ? searchResults : tours).length > 0 ? (
                            (searchQuery ? searchResults : tours).map((tour) => (
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
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{tour.title}</h4>
                                  <p className="text-xs text-[#00694B] font-medium">View Tour</p>
                                </div>
                              </a>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              {searchQuery ? `No tours found matching "${searchQuery}"` : "Loading tours..."}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
                    if (link.highlight) {
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 py-3 px-2 text-base font-bold border-b border-gray-100 text-[#00694B]"
                        >
                          <Map size={18} /> {link.label}
                          <span className="ml-auto text-xs bg-[#00694B] text-white px-2 py-0.5 rounded-full">New</span>
                        </a>
                      );
                    }
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        onClick={closeMobileMenu}
                        className={`flex items-center py-3 px-2 text-base font-medium border-b border-gray-100 transition-colors ${isActive ? 'text-[#00694B]' : 'text-gray-700 hover:text-[#00694B]'
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
                                  href={`/activities/${activity.slug}`}
                                  onClick={closeMobileMenu}
                                  className="flex flex-col items-center gap-1.5 group"
                                >
                                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                      src={activity.iconImage || activity.image || '/images/placeholder.jpg'}
                                      alt={activity.shortTitle || activity.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-[10px] font-semibold text-gray-700 text-center uppercase leading-tight group-hover:text-[#00694B]">
                                    {activity.shortTitle || activity.title}
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
