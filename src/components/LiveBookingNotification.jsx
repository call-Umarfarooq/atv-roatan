"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User } from "lucide-react";

// Mock Data Pool (15 bookings)
const MOCK_BOOKINGS = [
  { id: 1, name: "John R.", action: "just booked a", tour: "Sloth Hangout", emoji: "🦥", slug: "roatan-shore-excursions-and-private-tours", avatar: "11" },
  { id: 2, name: "Maria S.", action: "signed up for a", tour: "Reef Dive", emoji: "🤿", slug: "roatan-private-dolphin-encounter-swim", avatar: "12" },
  { id: 3, name: "David K.", action: "reserved a", tour: "Canopy Tour", emoji: "🐒", slug: "roatan-zipline-adventure", avatar: "33" },
  { id: 4, name: "Sarah L.", action: "is going on a", tour: "Buggy Tour", emoji: "🏎️", slug: "roatan-atv-adventures", avatar: "44" },
  { id: 5, name: "Mike T.", action: "booked a", tour: "Beach Horseback Ride", emoji: "🐎", slug: "roatan-private-horseback-riding-beach", avatar: "15" },
  { id: 6, name: "Elena V.", action: "secured a", tour: "Dolphin Swim", emoji: "🐬", slug: "roatan-private-dolphin-encounter-swim", avatar: "26" },
  { id: 7, name: "Chris B.", action: "joined a", tour: "Private Island Tour", emoji: "🏝️", slug: "build-your-own-roatan-private-tour", avatar: "17" },
  { id: 8, name: "Jessica M.", action: "reserved the", tour: "Zipline & ATV Combo", emoji: "🪂", slug: "roatan-zipline-adventure", avatar: "18" },
  { id: 9, name: "Kevin P.", action: "booked an", tour: "ATV Adventure", emoji: "🏍️", slug: "roatan-atv-adventures", avatar: "19" },
  { id: 10, name: "Ashley W.", action: "signed up for a", tour: "Sightseeing Tour", emoji: "🚌", slug: "build-your-own-roatan-private-tour", avatar: "20" },
  { id: 11, name: "Tom H.", action: "just secured a", tour: "Sloth Interaction", emoji: "🌿", slug: "roatan-shore-excursions-and-private-tours", avatar: "21" },
  { id: 12, name: "Lisa W.", action: "booked a", tour: "Buggy & Beach Day", emoji: "🏖️", slug: "roatan-atv-adventures", avatar: "22" },
  { id: 13, name: "Brian D.", action: "reserved a", tour: "Family Canopy Tour", emoji: "🐒", slug: "roatan-zipline-adventure", avatar: "23" },
  { id: 14, name: "Emily G.", action: "signed up for", tour: "Horseback Riding", emoji: "🐴", slug: "roatan-private-horseback-riding-beach", avatar: "24" },
  { id: 15, name: "Alex R.", action: "joined a", tour: "Group Dolphin Dive", emoji: "🐬", slug: "roatan-private-dolphin-encounter-swim", avatar: "25" }
];

export default function LiveBookingNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0); // Tracks which set of 4 to display

  // Handle the random show/hide of the entire popup
  useEffect(() => {
    // Initial delay before showing
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    const toggleVisibility = () => {
      if (document.hidden) return; // don't toggle if tab is inactive
      const willShow = Math.random() > 0.4; // 60% chance to be visible
      setIsVisible((prev) => !prev);
    };

    // Every 12-25 seconds, toggle visibility
    const visibilityInterval = setInterval(toggleVisibility, Math.floor(Math.random() * 13000) + 12000);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(visibilityInterval);
    };
  }, []);

  // Handle cycling through the mock users
  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (isVisible) {
        setDisplayIndex((prev) => (prev + 1) % MOCK_BOOKINGS.length);
      }
    }, 4000); // Change the top item every 4 seconds

    return () => clearInterval(slideInterval);
  }, [isVisible]);

  // Derive the 4 currently displayed bookings
  const currentBookings = [];
  for (let i = 0; i < 4; i++) {
    currentBookings.push(MOCK_BOOKINGS[(displayIndex + i) % MOCK_BOOKINGS.length]);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, x: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 z-50 w-full max-w-[340px] pointer-events-none"
        >
          {/* Subtle floating animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex flex-col gap-2 relative pointer-events-auto"
          >
            {/* Top Dashboard Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-semibold text-sm">Tour Dashboard</h3>
                <span className="text-gray-500 text-xs">Last 7 days</span>
              </div>
              
              {/* Fake Chart Wave */}
              <div className="h-12 w-full mb-3 -ml-2 -mr-2 relative flex items-center overflow-hidden">
                <svg viewBox="0 0 400 60" className="w-full h-full drop-shadow-md" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    d="M 0 40 C 50 30, 100 50, 150 20 C 200 -10, 250 40, 300 20 C 350 0, 400 30, 400 30"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="50%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Gradient Fill under wave */}
                 <svg viewBox="0 0 400 60" className="w-full h-full absolute inset-0 opacity-20 pointer-events-none" preserveAspectRatio="none">
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M 0 40 C 50 30, 100 50, 150 20 C 200 -10, 250 40, 300 20 C 350 0, 400 30, 400 30 L 400 60 L 0 60 Z"
                    fill="url(#gradientFill)"
                  />
                  <defs>
                    <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  Roatan ATV Adventure - Hot This Week! <span className="text-lg">🔥</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 font-medium">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 block"></span> 3 New Bookings Today</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 block"></span> 15 Happy Customers</span>
                </div>
              </div>
              
              {/* Optional slight hover effect */}
               <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Bottom Real-Time List Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex border border-gray-100 overflow-hidden relative">
              {/* Avatar Sidebar */}
              <div className="w-12 bg-gradient-to-b from-[#4a5d4e] to-[#2c3e30] py-4 flex flex-col items-center justify-start gap-[14px] shrink-0">
                <AnimatePresence mode="popLayout">
                  {currentBookings.map((b) => (
                    <motion.img
                      key={b.id + "avatar"}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={`https://i.pravatar.cc/100?img=${b.avatar}`}
                      alt={b.name}
                      className="w-7 h-7 rounded-full border border-white/40 shadow-sm object-cover"
                    />
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Text content */}
              <div className="p-3 w-full pr-4 relative">
                <div className="text-gray-600 text-xs font-medium mb-3 pl-1">
                  verified bookings in real-time:
                </div>
                <div className="flex flex-col gap-[14px]">
                  <AnimatePresence mode="popLayout">
                    {currentBookings.map((b) => (
                      <motion.div
                        key={b.id + "text"}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center text-[13px] leading-tight"
                      >
                       <User size={14} className="text-blue-500 fill-blue-500/20 mr-1.5 shrink-0" />
                        <span className="text-gray-900 font-bold mr-1 truncate max-w-[70px] shrink-0">{b.name}</span>
                        <span className="text-gray-600 mr-1 whitespace-nowrap">{b.action}</span>
                        <Link href={`/activities/${b.slug}`} className="text-gray-900 font-bold hover:text-emerald-600 hover:underline transition-colors truncate block">
                          {b.tour} {b.emoji}
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
