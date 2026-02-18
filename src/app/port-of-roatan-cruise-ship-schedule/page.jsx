'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Clock, Ship, MapPin, Search,
  ArrowRight, AlertCircle, Info, Download, Filter,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Mock Schedule Data ── */
// Generates some realistic looking data for 2025-2026
const generateScheduleParams = () => {
  const ships = [
    { name: "Wonder of the Seas", line: "Royal Caribbean" },
    { name: "Norwegian Bliss", line: "Norwegian Cruise Line" },
    { name: "MSC Seascape", line: "MSC Cruises" },
    { name: "Celebrity Apex", line: "Celebrity Cruises" },
    { name: "Harmony of the Seas", line: "Royal Caribbean" },
    { name: "Norwegian Escape", line: "Norwegian Cruise Line" },
    { name: "Valiant Lady", line: "Virgin Voyages" },
    { name: "Jewel of the Seas", line: "Royal Caribbean" },
    { name: "MSC Meraviglia", line: "MSC Cruises" },
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const data = [];

  // Generate 20 entries
  for (let i = 0; i < 20; i++) {
    const ship = ships[Math.floor(Math.random() * ships.length)];
    const month = months[Math.floor(Math.random() * months.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    const year = Math.random() > 0.5 ? 2025 : 2026;
    
    data.push({
      id: i,
      date: `${month} ${day}, ${year}`,
      dayOfWeek: new Date(`${month} ${day}, ${year}`).toLocaleDateString('en-US', { weekday: 'long' }),
      ship: ship.name,
      line: ship.line,
      arrival: "08:00 AM",
      departure: "05:00 PM",
      status: "Scheduled"
    });
  }
  
  // Sort by date equivalent (rough sort for demo)
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const scheduleData = generateScheduleParams();

const PortOfRoatanCruiseShipSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Logic
  const filteredData = scheduleData.filter(item => 
    item.ship.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.line.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="bg-gray-50 min-h-screen">
      
      {/* ═══════════════════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero.png" // Placeholder
          alt="Port of Roatan Cruise Ship Schedule"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#15531B] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg border border-[#15531B]/50">
            <Calendar size={14} />
            <span>2025 - 2026 Season</span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wide mb-4 drop-shadow-lg">
            Port of Roatan Cruise Schedule
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Find arrival and departure times for all major cruise lines docking at Coxen Hole.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTENT CONTAINER
      ═══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-10">
        
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Port of Roatan (Coxen Hole)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                This schedule applies specifically to the <strong>Town Center at Port of Roatan</strong> in Coxen Hole. 
                Ships from Royal Caribbean, Norwegian, MSC, Celebrity, and Virgin Voyages typically dock here.
              </p>
              
              <div className="flex flex-wrap gap-3">
                 <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md text-sm font-medium border border-amber-100">
                    <AlertCircle size={16} />
                    <span>Schedules subject to change</span>
                 </div>
                 <Link href="/port-of-roatan" className="inline-flex items-center gap-2 text-[#15531B] bg-[#15531B]/5 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#15531B]/10 transition-colors">
                    <Info size={16} />
                    <span>View Port Guide</span>
                 </Link>
              </div>
            </div>
            
            <div className="w-full md:w-auto bg-blue-50 border border-blue-100 rounded-xl p-5 md:min-w-[300px]">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Ship size={18} />
                Looking for Mahogany Bay?
              </h3>
              <p className="text-blue-800/80 text-sm mb-3">
                Carnival, Princess, and Holland America ships usually dock at Mahogany Bay (Isla Tropicale).
              </p>
              <Link href="#" className="text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1">
                View Mahogany Bay Schedule
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SCHEDULE TABLE
        ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-[#15531B]" />
              Schedule Arrivals
            </h3>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search ship or date..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#15531B]/50 focus:border-[#15531B] text-sm"
                />
              </div>
              
              {/* Filter Button (Visual only for now) */}
              <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#15531B] transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-gray-200">Date</th>
                  <th className="p-4 font-semibold border-b border-gray-200">Cruise Ship</th>
                  <th className="p-4 font-semibold border-b border-gray-200">Arrival</th>
                  <th className="p-4 font-semibold border-b border-gray-200">Departure</th>
                  <th className="p-4 font-semibold border-b border-gray-200 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length > 0 ? (
                  currentData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="p-4 text-gray-800 text-sm">
                        <div className="font-bold">{row.date}</div>
                        <div className="text-xs text-gray-500">{row.dayOfWeek}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#1a1a1a]">{row.ship}</div>
                        <div className="text-xs text-gray-500">{row.line}</div>
                      </td>
                      <td className="p-4 text-sm font-medium text-emerald-700">
                        {row.arrival}
                      </td>
                      <td className="p-4 text-sm font-medium text-red-700">
                        {row.departure}
                      </td>
                      <td className="p-4 text-center">
                        <Link 
                          href="/activities" 
                          className="inline-flex items-center justify-center px-4 py-1.5 bg-[#15531B] text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#0e3d14] shadow-md"
                        >
                          Book Tours
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No scheduled arrivals found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {currentData.length} of {filteredData.length} arrivals</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium text-gray-900">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CTA FOOTER
        ═══════════════════════════════════════════════════════ */}
        <div className="mt-16 bg-[#15531B] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Your Adventure!</h2>
            <p className="text-white/80 mb-8 text-lg">
              Maximize your time in Roatan. Book your shore excursions in advance with our 
              <strong> 100% Back-to-Ship Guarantee</strong>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/activities"
                className="px-8 py-3.5 bg-white text-[#15531B] font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Shore Excursions
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-3.5 bg-[#15531B] border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default PortOfRoatanCruiseShipSchedule;