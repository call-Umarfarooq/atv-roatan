'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ship, MapPin, Clock, Users, ShieldCheck, Anchor,
  ChevronDown, ChevronRight, Star, Waves, Sun,
  Camera, Fish, TreePine, Bike, Umbrella, PawPrint,
  ArrowRight, Info, Navigation, CreditCard, Globe,
  Phone, CheckCircle2
} from 'lucide-react';

/* â”€â”€ Metadata (exported from a separate layout or handled in head) â”€â”€ */

/* â”€â”€ FAQ Data â”€â”€ */
const faqData = [
  {
    question: "Which cruise lines dock at the Port of Roatan?",
    answer: "The Port of Roatan in Coxen Hole is used by Royal Caribbean, Norwegian Cruise Line, MSC Cruises, Celebrity Cruises, and Virgin Voyages. Mahogany Bay is primarily used by Carnival Cruise Line, Princess Cruises, and Holland America Line."
  },
  {
    question: "How far is the port from popular beaches?",
    answer: "West Bay Beach is approximately 20-25 minutes from Coxen Hole and 15 minutes from Mahogany Bay by taxi. West End is about 15-20 minutes from Coxen Hole. Most tour operators, including us, provide complimentary round-trip port transportation."
  },
  {
    question: "Is it safe to explore Roatan on my own?",
    answer: "Roatan is generally safe for tourists, especially in popular areas like West Bay, West End, and the cruise port zones. We recommend using official transportation and booking excursions with licensed operators. Our tours include a 100% Back-to-Ship Guarantee for your peace of mind."
  },
  {
    question: "Do I need to exchange currency?",
    answer: "US Dollars are widely accepted throughout Roatan, especially in tourist areas. The local currency is the Honduran Lempira, but you won't need it for most tourist activities. ATMs are available at both cruise terminals."
  },
  {
    question: "What should I bring for a shore excursion?",
    answer: "We recommend bringing sunscreen (reef-safe preferred), comfortable shoes, a hat, sunglasses, a towel, swimwear, and a waterproof phone case. Cash in small denominations is handy for tips and small purchases."
  },
  {
    question: "How do I get back to my cruise ship on time?",
    answer: "All our tours include a 100% Back-to-Ship Guarantee. We monitor your ship's departure time and ensure you return at least 30 minutes before sail-away. We also provide complimentary round-trip port transportation on every excursion."
  },
  {
    question: "Can I book a tour if my ship docks at Mahogany Bay instead of Coxen Hole?",
    answer: "Absolutely! We offer pickup from both Coxen Hole and Mahogany Bay cruise terminals. Simply select your port when booking, and our team will meet you right at the terminal exit."
  }
];

/* â”€â”€ Excursion Categories â”€â”€ */
const excursionCategories = [
  { icon: <Bike size={28} />, title: "ATV & Buggy Tours", description: "Off-road adventure through jungle trails and scenic hilltops.", color: "from-emerald-500 to-emerald-700" },
  { icon: <PawPrint size={28} />, title: "Animal Parks", description: "Meet sloths, monkeys, macaws, and exotic wildlife up close.", color: "from-amber-500 to-amber-700" },
  { icon: <Umbrella size={28} />, title: "Beach Breaks", description: "Relax on pristine white-sand beaches with crystal-clear waters.", color: "from-cyan-500 to-cyan-700" },
  { icon: <Waves size={28} />, title: "Snorkel Tours", description: "Explore the Mesoamerican Barrier Reef, the world's second largest.", color: "from-blue-500 to-blue-700" },
  { icon: <Fish size={28} />, title: "Fishing Charters", description: "Deep-sea and reef fishing in some of the Caribbean's best waters.", color: "from-indigo-500 to-indigo-700" },
  { icon: <TreePine size={28} />, title: "Zipline Adventures", description: "Soar through the jungle canopy on thrilling zipline courses.", color: "from-green-500 to-green-700" },
  { icon: <Camera size={28} />, title: "Island Tours", description: "Discover Roatan's culture, cuisine, and hidden gems.", color: "from-rose-500 to-rose-700" },
  { icon: <Sun size={28} />, title: "All-Inclusive", description: "Complete packages combining multiple activities in one day.", color: "from-orange-500 to-orange-700" },
];

/* â”€â”€ Cruise Lines Info â”€â”€ */
const cruisePortData = [
  {
    port: "Port of Roatan &mdash; Coxen Hole",
    image: "/images/hero.png",
    description: "Located in the heart of Coxen Hole, the island's capital, the Port of Roatan (also known as Town Center at Port of Roatan) officially opened in 2007. This public port offers an authentic Roatan experience, giving passengers direct access to local shops, eateries, cultural sites, and the vibrant island atmosphere.",
    features: [
      "Accommodates 2 docked cruise ships + 4 tenders simultaneously",
      "Shopping area with local handicrafts & souvenirs",
      "Tourist information center, ATMs & restaurants",
      "Walking distance to downtown Coxen Hole",
      "Used by Royal Caribbean, Norwegian, MSC, Celebrity & Virgin Voyages"
    ],
    highlight: "Public Port \u2022 Authentic Local Experience"
  },
  {
    port: "Mahogany Bay Cruise Center",
    image: "/images/hero.png",
    description: "Inaugurated in 2009 and developed by Carnival Corporation, Mahogany Bay is a sprawling 20-acre modern cruise facility on Roatan's southern shore, approximately 10 minutes east of Coxen Hole. It features a curated resort-style experience with a shopping village, lush tropical gardens, bars, restaurants, and a private beach.",
    features: [
      "Accommodates 2 post-Panamax ships (up to 8,000 passengers)",
      "Shopping village, bars, restaurants & tropical gardens",
      "Private beach accessible by chairlift or shuttle",
      "Modern, resort-style terminal complex",
      "Used by Carnival, Princess Cruises & Holland America Line"
    ],
    highlight: "Private Port \u2022 Resort-Style Experience"
  }
];

/* â”€â”€ Port Quick Facts â”€â”€ */
const portFacts = [
  { icon: <Ship size={24} />, label: "2 Cruise Ports", sublabel: "Coxen Hole & Mahogany Bay" },
  { icon: <Users size={24} />, label: "Up to 12,000+", sublabel: "Passengers per day" },
  { icon: <Globe size={24} />, label: "8+ Cruise Lines", sublabel: "Dock at Roatan weekly" },
  { icon: <Anchor size={24} />, label: "Year-Round", sublabel: "Cruise ship arrivals" },
];

/* â”€â”€ Component â”€â”€ */
const PortOfRoatan = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src="/images/hero.png"
          alt="Port of Roatan &mdash; Cruise Ship Terminal"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/80 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">Port of Roatan</span>
            </nav>
          </div>
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <Anchor size={16} className="text-white" />
            <span className="text-white text-sm font-medium tracking-wide">Cruise Port Guide</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-lg">
            Port of Roatan
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Your complete guide to Roatan's cruise ship terminals, shore excursions, and everything you need to know for an unforgettable island experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#excursions"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00694B] hover:bg-[#0e3d14] text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Shore Excursions
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#ports"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/30 rounded-full font-bold transition-all duration-300"
            >
              <MapPin size={18} />
              View Port Details
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PORT QUICK FACTS STRIP
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative w-full px-4 -mt-16 z-10 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 md:px-10 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {portFacts.map((fact, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-[#00694B]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-[#00694B]">{fact.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{fact.label}</h3>
                  <p className="text-gray-500 text-sm">{fact.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PORT OVERVIEW
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Welcome to the Port of Roatan</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Roatan, the largest of Honduras' Bay Islands, is one of the most popular cruise ship destinations 
              in the Western Caribbean. With two world-class cruise terminals, pristine beaches, the world's 
              second-largest barrier reef, and an incredible range of shore excursions, Roatan offers something 
              for every traveler.
            </p>
          </div>

          {/* Two-column info */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="/images/hero.png"
                alt="Aerial view of Roatan Island"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={18} />
                  <span className="font-medium">Roatan, Bay Islands, Honduras</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">The Caribbean's Premier Cruise Destination</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every week, thousands of cruise ship passengers arrive at Roatan's two cruise terminals &mdash; 
                  the <strong>Port of Roatan</strong> in Coxen Hole and <strong>Mahogany Bay</strong> Cruise Center &mdash; 
                  ready to explore everything this stunning island has to offer.
                </p>
                <p>
                  Whether you're looking for thrilling ATV adventures through jungle trails, relaxing beach 
                  breaks at West Bay, snorkeling along the Mesoamerican Barrier Reef, or getting up close with 
                  sloths and monkeys, Roatan has it all.
                </p>
                <p>
                  As a <strong>local, family-owned tour operator</strong>, we provide premium shore excursions 
                  with complimentary port pickup and our signature <strong>100% Back-to-Ship Guarantee</strong> &mdash; 
                  so you can explore worry-free.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 p-4 bg-[#00694B]/5 rounded-xl border border-[#00694B]/10">
                <ShieldCheck size={24} className="text-[#00694B] shrink-0" />
                <div>
                  <p className="font-bold text-[#00694B] text-sm">100% Back-to-Ship Guarantee</p>
                  <p className="text-gray-500 text-xs">We monitor your departure time and ensure you're back 30+ minutes early.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CRUISE TERMINALS (THE TWO PORTS)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="ports" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Roatan Cruise Ship Terminals</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Roatan has two cruise ship ports. Depending on your cruise line, you'll dock at one of these terminals.
              We offer pickup from both locations.
            </p>
          </div>

          <div className="space-y-12">
            {cruisePortData.map((port, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300`}
              >
                <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative aspect-[4/3] md:aspect-auto min-h-[300px] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <Image
                      src={port.image}
                      alt={port.port}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#00694B] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        <Anchor size={14} />
                        {port.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">{port.port}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{port.description}</p>
                    <ul className="space-y-3">
                      {port.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[#00694B] mt-0.5 shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SHORE EXCURSION CATEGORIES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="excursions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Shore Excursions & Tours</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the best of Roatan with our curated shore excursions. From thrilling adventures 
              to relaxing beach days &mdash; we have something for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {excursionCategories.map((cat, i) => (
              <Link
                href="/"
                key={i}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative gradient corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cat.color} opacity-5 rounded-bl-[100px] group-hover:opacity-10 transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#00694B] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[#00694B] text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00694B] text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#0e3d14]"
            >
              View All Shore Excursions
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CRUISE LINE INFORMATION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Cruise Lines at Roatan</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Major cruise lines dock at Roatan weekly. Here's where your ship will arrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coxen Hole Cruise Lines */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-[#00694B] p-6">
                <div className="flex items-center gap-3">
                  <Anchor size={24} className="text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Coxen Hole Port</h3>
                    <p className="text-white/70 text-sm">Town Center at Port of Roatan</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    { line: "Royal Caribbean International", note: "Primary user &mdash; typically docks at pier" },
                    { line: "Norwegian Cruise Line", note: "May tender when multiple ships present" },
                    { line: "MSC Cruises", note: "Regular weekly calls" },
                    { line: "Celebrity Cruises", note: "Part of Royal Caribbean Group" },
                    { line: "Virgin Voyages", note: "Newer addition to the port" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <Ship size={18} className="text-[#00694B] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#1a1a1a] text-sm">{item.line}</p>
                        <p className="text-gray-400 text-xs">{item.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mahogany Bay Cruise Lines */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-[#0e3d14] p-6">
                <div className="flex items-center gap-3">
                  <Anchor size={24} className="text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Mahogany Bay</h3>
                    <p className="text-white/70 text-sm">Carnival Corporation Cruise Center</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    { line: "Carnival Cruise Line", note: "Primary user &mdash; developed by Carnival Corp." },
                    { line: "Princess Cruises", note: "Part of Carnival Corporation" },
                    { line: "Holland America Line", note: "Part of Carnival Corporation" },
                    { line: "P&O Cruises", note: "Occasional calls" },
                    { line: "Cunard Line", note: "Seasonal itineraries" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <Ship size={18} className="text-[#0e3d14] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#1a1a1a] text-sm">{item.line}</p>
                        <p className="text-gray-400 text-xs">{item.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          TRANSPORTATION & TIPS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Getting Around Roatan</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Essential tips for navigating the island during your cruise ship port call.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Navigation size={28} />,
                title: "Taxi Service",
                description: "Taxis are the primary transport for cruise passengers. Agree on the fare beforehand &mdash; meters are not used.",
                tip: "Tip: Negotiate before boarding"
              },
              {
                icon: <Ship size={28} />,
                title: "Water Taxis",
                description: "Scenic and affordable water taxi service runs between West End and West Bay Beach throughout the day.",
                tip: "~$3 per person, one-way"
              },
              {
                icon: <CreditCard size={28} />,
                title: "Currency & Payments",
                description: "US Dollars are widely accepted. ATMs are available at both cruise terminals for cash withdrawals.",
                tip: "Carry small bills for tips"
              },
              {
                icon: <Clock size={28} />,
                title: "Time Management",
                description: "Most excursions last 3-5 hours, giving you plenty of time to explore and return safely to your ship.",
                tip: "We guarantee ship return"
              }
            ].map((tip, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-[#00694B]/10 flex items-center justify-center mb-5 text-[#00694B] group-hover:bg-[#00694B] group-hover:text-white transition-all duration-300">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{tip.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{tip.description}</p>
                <div className="flex items-center gap-2 text-[#00694B] text-xs font-bold bg-[#00694B]/5 rounded-lg px-3 py-2">
                  <Info size={14} />
                  <span>{tip.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FAQ SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about visiting the Port of Roatan on your cruise.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  openFaq === i ? 'border-[#00694B]/30 shadow-lg' : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className={`font-bold text-sm md:text-base pr-4 transition-colors ${
                    openFaq === i ? 'text-[#00694B]' : 'text-[#1a1a1a] group-hover:text-[#00694B]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openFaq === i ? 'bg-[#00694B] text-white rotate-180' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CTA SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Explore Roatan Shore Excursions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00694B]/90 via-[#00694B]/80 to-[#0e3d14]/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <ShieldCheck size={16} className="text-[#FFD700]" />
            <span className="text-white text-sm font-medium">100% Back-to-Ship Guarantee on Every Tour</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Explore Roatan?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book directly with us &mdash; a local, family-owned operator &mdash; and save up to $20 per person 
            compared to cruise line excursions or OTAs. Pickup from both ports included.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#00694B] rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
              Browse All Tours
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:+50412345678"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 text-lg"
            >
              <Phone size={20} />
              Call Us Now
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#FFD700]" />
              <span>4.9/5 Rating (500+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>Fully Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Family Owned & Operated</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default PortOfRoatan;
