'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ship, MapPin, Clock, Users, ShieldCheck, Anchor,
  ChevronDown, ChevronRight, Star, Waves, Sun,
  Camera, Fish, TreePine, Bike, Umbrella, PawPrint,
  ArrowRight, Info, Navigation, CreditCard, Globe,
  Phone, CheckCircle2, ShoppingBag, Zap, Utensils, Calendar
} from 'lucide-react';

/* â”€â”€ Excursion Categories (Specific to Isla Tropicale / Mahogany Bay) â”€â”€ */
const excursionCategories = [
  { icon: <Bike size={28} />, title: "ATV Jungle Adventure", description: "Ride through muddy trails and lush jungle canopies.", color: "from-emerald-500 to-emerald-700" },
  { icon: <PawPrint size={28} />, title: "Sloth & Monkey Parks", description: "Hold a sloth and meet playful monkeys â€“ a Roatan must-do!", color: "from-amber-500 to-amber-700" },
  { icon: <Umbrella size={28} />, title: "Beach Breaks", description: "Relax at West Bay or private island resorts.", color: "from-cyan-500 to-cyan-700" },
  { icon: <TreePine size={28} />, title: "Zipline Canopy Tours", description: "Fly high above the trees with stunning ocean views.", color: "from-green-500 to-green-700" },
  { icon: <Waves size={28} />, title: "Snorkel & Boat Tours", description: "Discover the vibrant coral reef and shipwrecks.", color: "from-blue-500 to-blue-700" },
  { icon: <Sun size={28} />, title: "Little French Key", description: "Exclusive private island day passes with lunch & drinks.", color: "from-teal-500 to-teal-700" },
  { icon: <Camera size={28} />, title: "Island Highlights", description: "Sightseeing tours including the Rum Factory & Chocolate Factory.", color: "from-rose-500 to-rose-700" },
  { icon: <Star size={28} />, title: "All-Inclusive Combos", description: "Combine ATVs, Ziplines, and Sloths for one low price.", color: "from-violet-500 to-violet-700" },
];

/* â”€â”€ FAQ Data â”€â”€ */
const faqData = [
  {
    question: "Where exactly is Isla Tropicale (Mahogany Bay)?",
    answer: "Isla Tropicale (formerly Mahogany Bay) is located in Dixon Cove on the south side of Roatan, about 3 miles (10-15 min drive) from the other port in Coxen Hole. It is a private port primarily for Carnival Corporation ships."
  },
  {
    question: "How do I meet my tour guide at Isla Tropicale?",
    answer: "It's easy! Guides are not allowed inside the private terminal gates. You will simply walk through the shopping area, exit the main gate and walk down the hill to the main road. Our guides will be waiting there with a sign with your name. We provide detailed video instructions upon booking."
  },
  {
    question: "Is the 'Magical Flying Beach Chair' included?",
    answer: "No, the chairlift to Mahogany Beach is an extra cost (approx. $14/adult) purchased through the cruise line. However, you can walk to the beach for free via the nature trail."
  },
  {
    question: "How far is West Bay Beach from this port?",
    answer: "West Bay Beach is about a 30-45 minute drive from Isla Tropicale/Mahogany Bay, depending on traffic. Our excursions include round-trip transportation so you don't have to worry about taxis."
  },
  {
    question: "Do you offer a Back-to-Ship Guarantee?",
    answer: "Yes! For every tour booked with us, we guarantee to have you back at the port gate at least 1 hour before your ship's departure time. We track ship schedules daily."
  }
];

const IslaTropicalePort = () => {
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
          src="/images/hero.png" // Placeholder
          alt="Isla Tropicale Cruise Port - Mahogany Bay Roatan"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/80 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">Isla Tropicale Port</span>
            </nav>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#0e3d14] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg border border-white/20 backdrop-blur-md">
            <Anchor size={14} />
            <span>Formerly Mahogany Bay Cruise Center</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-lg">
            Isla Tropicale Port
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed mb-8 font-light">
            The exclusive Carnival Corporation cruise destination in Roatan. <br className="hidden md:block"/>
            Serving Carnival, Princess, Holland America, Costa, and P&O.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#excursions"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0e3d14] rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Excursions
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/isla-tropicale-cruise-ship-port-schedule"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0e3d14]/80 backdrop-blur-sm hover:bg-[#0e3d14] text-white border border-white/20 rounded-full font-bold transition-all duration-300"
            >
              <Calendar size={18} />
              View Ship Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OVERVIEW & FEATURES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">Welcome to Isla Tropicale</h2>
                <div className="h-1 w-20 bg-[#00694B] rounded-full"></div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Located in Dixon Cove, approximately 3 miles east of Coxen Hole, the <strong>Isla Tropicale Cruise Ship Port</strong> (formerly Mahogany Bay) is a state-of-the-art facility spanning 20 acres.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This private destination is designed exclusively for Carnival Corporation cruise ships. It features a duty-free shopping village, bars, restaurants, and a dedicated chairlift system transporting guests to the private Mahogany Beach.
              </p>
              
              <div className="bg-[#00694B]/5 border border-[#00694B]/10 rounded-xl p-5 mt-4">
                 <h4 className="font-bold text-[#00694B] mb-2 flex items-center gap-2">
                    <Info size={18} />
                    Meeting Your Independent Tour Guide
                 </h4>
                 <p className="text-sm text-gray-700">
                    Independent operators (like us) cannot pick up inside the private terminal. You must walk through the shopping area, up the hill to the main gate, and down to the main road to meet us. Only cruise line excursions pick up inside.
                 </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Feature Card: Chairlift */}
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="shrink-0 w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Magical Flying Beach Chair</h3>
                        <p className="text-sm text-gray-600 mt-1">A scenic chairlift ride soaring 67 feet high, connecting the retail center directly to the beach ($14/adults).</p>
                    </div>
                </div>

                 {/* Feature Card: Beach */}
                 <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                        <Umbrella size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Mahogany Beach</h3>
                        <p className="text-sm text-gray-600 mt-1">An 800ft white sand beach with calm waters, volleyball courts, and private cabana rentals.</p>
                    </div>
                </div>

                 {/* Feature Card: Shopping */}
                 <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="shrink-0 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Shopping & Dining</h3>
                        <p className="text-sm text-gray-600 mt-1">Home to Diamonds International, Del Sol, Fat Tuesday, and local artisan markets.</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          EXCURSION CATEGORIES
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="excursions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Shore Excursions from Isla Tropicale</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Skip the crowded cruise line tours. Book a private or small group adventure with us â€” 
              we pick up right outside the main gate!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {excursionCategories.map((cat, i) => (
              <Link
                href="/activities"
                key={i}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Corner Detail */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cat.color} opacity-5 rounded-bl-[100px] group-hover:opacity-10 transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#00694B] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[#00694B] text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>View Tours</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00694B] text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#0e3d14]"
            >
              Browse All Activities
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FAQ SECTION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-6"></div>
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
                    openFaq === i ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
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
          CTA & SCHEDULE LINK
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
       <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/hero.png" // Placeholder
          alt="Book Roatan Excursions"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e3d14]/90 via-[#0e3d14]/80 to-[#00694B]/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Arriving at Isla Tropicale?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Check the port schedule to see if your ship is docking here, or browse our top-rated excursions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/isla-tropicale-cruise-ship-port-schedule"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#00694B] rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
              <Calendar size={20} />
              View Port Schedule
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 text-lg"
            >
              <Phone size={20} />
              Contact Us
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
             <div className="flex items-center gap-2"><Star size={16} className="text-[#FFD700]"/> <span>4.9/5 Rating</span></div>
             <div className="flex items-center gap-2"><ShieldCheck size={16}/> <span>Ship Return Guarantee</span></div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default IslaTropicalePort;
