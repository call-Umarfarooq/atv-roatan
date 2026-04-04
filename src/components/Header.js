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
  // { label: 'Gallery', href: '/gallery' },
  // { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Roatan Shore Excursions', type: 'dropdown_excursions' },
  { label: 'Roatan Cruise Ports', type: 'dropdown' },
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
  const [ctaDropdownOpen, setCtaDropdownOpen] = useState(false);
  const ctaRef = useRef(null);
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
      if (ctaRef.current && !ctaRef.current.contains(e.target)) {
        setCtaDropdownOpen(false);
      }
    };
    if (searchOpen || ctaDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen, ctaDropdownOpen]);

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
      <header className="w-full bg-[#0B1E14] sticky top-0 z-[60]">
        {/* ── Top Bar (Utility) ── */}
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo + Text Stack */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/logo-atv.jpeg"
                alt="Roatan Eco-Adventures"
                width={50}
                height={50}
                className="object-contain w-10 h-10 sm:w-[50px] rounded-full sm:h-[50px]"
              />
              <div className="flex flex-col">
                <span className="text-[#F5A623] font-bold text-sm sm:text-[18px] leading-tight">Roatan Eco-Adventures</span>
                <span className="text-[#8CB399] text-[9px] sm:text-xs leading-tight">Roatan ATV, Buggy &amp; Golf Car Adventure</span>
              </div>
            </a>
          </div>

          {/* Right: Phone + Hours + CTA (Desktop) / CTA + Phone (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Phone + Hours (Desktop Only) */}
            <div className="hidden md:flex flex-col items-end mr-2">
              <a href="tel:+50412345678" className="text-[#F5A623] font-bold text-lg hover:text-[#d98f1c] transition-colors flex items-center gap-1.5">
                <Phone size={18} fill="currentColor" /> +504 1234-5678
              </a>
              <span className="text-[#8CB399] text-xs font-medium">Open Daily · 7 AM – 6 PM</span>
            </div>

            {/* Mobile Phone Tap to Call */}
            <a href="tel:+50412345678" className="md:hidden text-[#F5A623] hover:text-[#d98f1c] transition-colors p-1" aria-label="Call us">
              <Phone size={20} fill="currentColor" />
            </a>

            {/* Build Your Adventure CTA */}
            <div className="relative" ref={ctaRef}>
              <motion.button
                  onClick={() => setCtaDropdownOpen(!ctaDropdownOpen)}
                  animate={{
                    boxShadow: ['0 0 15px 2px rgba(245, 166, 35, 0.6)', '0 0 4px 1px rgba(245, 166, 35, 0.2)', '0 0 15px 2px rgba(245, 166, 35, 0.6)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-xs sm:text-sm font-bold text-[#0B1E14] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#F5A623' }}
                >
                  <Map size={16} className="text-[#0B1E14]" /> <span className="hidden sm:inline">Build Your Adventure</span>
                  <span className="sm:hidden">Build</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${ctaDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {ctaDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-[250px] sm:w-[250px] bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
                  >
                    <a href="/plan" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0" onClick={() => setCtaDropdownOpen(false)}>
                      <Map className="text-blue-500 shrink-0" size={24} />
                      <div className="flex flex-col text-left">
                        <span className="text-[15px] font-semibold text-gray-700 leading-tight">Long stay in roatan</span>
                        <span className="text-xs text-gray-500 mt-0.5">Build a custom day plan</span>
                      </div>
                    </a>
                    <a href="#" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0" onClick={() => setCtaDropdownOpen(false)}>
                      <Ship className="text-blue-500 shrink-0" size={24} />
                      <div className="flex flex-col text-left">
                        <span className="text-[15px] font-semibold text-gray-700 leading-tight">Cruiseship passenger</span>
                        <span className="text-xs text-gray-500 mt-0.5">Create your Roatan experience</span>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden text-[#F5A623] hover:opacity-80 transition-opacity p-1 ml-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Bottom Bar (Nav Strip) - Desktop Only ── */}
        <div className="hidden md:block bg-[#123321] text-white overflow-visible">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
            {/* Left Links */}
            <nav className="flex items-center gap-6">
              {navLinksLeft.map((link) => {
                if (link.type === 'dropdown' || link.type === 'dropdown_excursions') {
                  const isExcursions = link.type === 'dropdown_excursions';
                  const dropdownId = isExcursions ? 'excursions' : 'ports';
                  
                  const isActive = !isExcursions && pathname && (
                    pathname.startsWith('/port-of-roatan') ||
                    pathname.startsWith('/isla-tropicale')
                  );
                  return (
                    <div
                      key={link.label}
                      className="relative flex items-center h-full"
                      onMouseEnter={() => setActiveDropdown(dropdownId)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 ${activeDropdown === dropdownId || isActive ? 'text-[#F5A623]' : 'text-[#8CB399] hover:text-[#F5A623]'}`}>
                        {link.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === dropdownId ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === dropdownId && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 ${isExcursions ? 'w-[770px] max-w-[95vw]' : 'w-[540px]'}`}
                          >
                            <div className={`bg-white rounded-xl shadow-2xl p-4 grid ${isExcursions ? 'grid-cols-7 gap-3' : 'grid-cols-4 gap-4'} border border-gray-100 relative`}>
                              <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
                              
                              {isExcursions ? (
                                activities.length > 0 ? (
                                  activities.map((activity) => (
                                    <a
                                      key={activity._id}
                                      href={`/activities/${activity.slug}`}
                                      className="flex flex-col items-center gap-2 group/card"
                                    >
                                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover/card:shadow-md transition-shadow">
                                        <Image
                                          src={activity.iconImage || activity.image || '/images/placeholder.jpg'}
                                          alt={activity.shortTitle || activity.title}
                                          fill
                                          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                                        />
                                      </div>
                                      <span className="text-[10px] font-bold text-gray-800 text-center uppercase leading-tight group-hover/card:text-[#00694B] transition-colors">{activity.shortTitle || activity.title}</span>
                                    </a>
                                  ))
                                ) : (
                                  <div className="col-span-7 text-center text-sm text-gray-500 py-4">Loading excursions...</div>
                                )
                              ) : (
                                <>
                                  <a href="/port-of-roatan" className="flex flex-col gap-2 group/card">
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover/card:shadow-md transition-shadow">
                                      <Image src="/images/PortofRoatanWesternCaribbean.jpg.jpeg" alt="Port of Roatan" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-800 text-center group-hover/card:text-[#00694B] transition-colors leading-tight">Port of Roatan</span>
                                  </a>
                                  <a href="/port-of-roatan-cruise-ship-schedule" className="flex flex-col gap-2 group/card">
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-blue-50 flex items-center justify-center group-hover/card:bg-blue-100 transition-colors shadow-sm group-hover/card:shadow-md">
                                      <Image src="/images/PortofRoataCruiseShipSchedule.webp" alt="Port of Roatan" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-800 text-center group-hover/card:text-[#00694B] transition-colors leading-tight">Roatan Schedule</span>
                                  </a>
                                  <a href="/isla-tropicale-cruise-ship-port" className="flex flex-col gap-2 group/card">
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover/card:shadow-md transition-shadow">
                                      <Image src="/images/IsaTropicaleCruiseShipPortWesternCaribbean.jpg.jpeg" alt="Isla Tropicale" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-800 text-center group-hover/card:text-[#00694B] transition-colors leading-tight">Isla Tropicale</span>
                                  </a>
                                  <a href="/isla-tropicale-cruise-ship-port-schedule" className="flex flex-col gap-2 group/card">
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-green-50 flex items-center justify-center group-hover/card:bg-green-100 transition-colors shadow-sm group-hover/card:shadow-md">
                                      <Image src="/images/IslaTropicaleCruiseShipPortSchedule.jpg.jpeg" alt="Isla Tropicale" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-800 text-center group-hover/card:text-[#00694B] transition-colors leading-tight">Tropicale Schedule</span>
                                  </a>
                                </>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href + '/'));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-[#F5A623] border-b-2 border-[#F5A623] pb-0.5' : 'text-[#8CB399] hover:text-[#F5A623]'}`}
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
                      className="text-sm font-semibold tracking-wide transition-colors text-[#8CB399] hover:text-[#F5A623]"
                    >
                      {link.label}
                    </a>
                  ))}
               </nav>
               
               {/* Search - Using the existing search logic */}
               <div ref={searchRef} className="relative flex items-center pl-2 border-l border-[#8CB399]/20">
                  <div className={`relative flex items-center transition-all duration-300 ${searchOpen ? 'w-64' : 'w-5'}`}>
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="text-[#8CB399] hover:text-[#F5A623] transition-colors relative z-10"
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
                                <div className="flex-1 flex flex-col justify-center">
                                  <h4 className="text-sm font-[400] text-gray-800 line-clamp-1">{tour.title}</h4>
                                  <div className="flex items-center justify-between mt-0.5">
                                    <p className="text-xs text-[#00694B] font-medium">View Tour</p>
                                    {(tour.adultPrice || tour.base_price) && (
                                      <p className="text-xs font-bold text-gray-700"><span className="text-xs font-bold text-gray-700">From</span> ${tour.adultPrice || tour.base_price}</p>
                                    )}
                                  </div>
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
                    if (link.type === 'dropdown' || link.type === 'dropdown_excursions') return null; // Handled below in accordions
                    const isExternal = link.href?.startsWith('http');
                    const isActive = !isExternal && link.href && (
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
