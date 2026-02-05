
"use client";
import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  ChevronDown,
  Calendar,
  Users,
  Globe,
  Ticket,
  ShieldCheck,
  CreditCard,
  Share,
  Heart,
  Award,
  Flame,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import TourCard from '@/components/TourCard';

export default function TourDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [expandedSections, setExpandedSections] = useState({
    whatsIncluded: true,
    meetingPickup: true,
    itinerary: true,
    additionalInfo: true
  });

  const [isPickupTextExpanded, setIsPickupTextExpanded] = useState(true);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const images = [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=10",
    "https://picsum.photos/800/600?random=11",
    "https://picsum.photos/800/600?random=12",
    "https://picsum.photos/800/600?random=13"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb - Top Line */}
        <div className="flex items-center justify-between mb-4">
            <nav className="text-xs text-gray-500 flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="flex items-center p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <ChevronLeft size={16} />
                <span className="font-bold text-gray-900 ml-1">All Experiences in Roatan</span>
            </div>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Home</span> <span>/</span>
            <span className="hover:underline cursor-pointer">Things to do in Honduras</span> <span>/</span>
            <span className="hover:underline cursor-pointer">Things to do in Roatan</span> <span>/</span>
            <span className="hover:underline cursor-pointer">Roatan Tours</span> <span>/</span>
            <span className="text-gray-900">Roatan Cruise Ports</span>
            </nav>
            <div className="text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">
                 <MessageCircle size={16} /> Chat now
            </div>
        </div>

        {/* Title Section */}
        <h1 className="text-[30px] font-semibold text-[#1a1a1a] mb-3 leading-[1.2] tracking-tight">
        Roatan Zipline Adventure, Sloths & Monkeys,Chocolate Factory Tour
      </h1>

      {/* Badges & Rating Row */}
      <div className="flex flex-wrap items-center text-[13.5px] mb-6 gap-x-2.5">
        
        {/* Ratings */}
        <div className="flex items-center">
          <div className="flex gap-0.5 text-[#00aa6c]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="text-[#1a1a1a] font-bold hover:underline cursor-pointer ml-2">
            106 Reviews
          </span>
        </div>

        <div className="text-gray-300 text-xl font-light">|</div>

        {/* Recommendation */}
        <div className="flex items-center gap-1.5 text-[#1a1a1a]">
          <div className="relative">
            {/* Custom styled Flame icon to match Viator UI */}
            <Flame size={16} className="text-[#df3c23]" fill="#df3c23" stroke="none" />
          </div>
          <span className="font-semibold text-gray-800">Recommended by 100% of travelers</span>
          <div className="w-[15px] h-[15px] rounded-full border border-gray-400 text-gray-500 text-[9px] flex items-center justify-center font-bold cursor-help">
            i
          </div>
        </div>

        <div className="text-gray-300 text-xl font-light">|</div>

        {/* Badge of Excellence */}
        <div className="flex items-center gap-2 text-[#1a1a1a]">
          <div className="bg-[#cc9b33] rounded-full p-0.5">
            <Award size={13} className="text-white" fill="white" strokeWidth={1} />
          </div>
          <span className="text-gray-600 font-medium">Badge of Excellence</span>
        </div>

        <div className="text-gray-300 text-xl font-light">|</div>

        {/* Location */}
        <span className="text-[#1a1a1a] font-medium hover:underline cursor-pointer">
          Roatan, Honduras
        </span>
      </div>

        {/* Gallery & Sidebar Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-2">
            <div className="flex gap-3 h-[400px] md:h-[500px] mb-6">
                
                {/* Thumbnails Strip */}
                <div className="hidden md:flex flex-col gap-3 w-36 shrink-0 overflow-y-auto no-scrollbar">
                     {images.map((img, i) => (
                        <div 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)}
                            className={`relative w-full h-[90px] rounded-lg overflow-hidden cursor-pointer transition-all ${currentImageIndex === i ? 'ring-2 ring-black opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt={`thumbnail ${i}`} />
                        </div>
                     ))}
                     <div className="relative w-full h-[90px] rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex flex-col items-center justify-center text-gray-700 font-bold text-xs hover:bg-gray-200">
                         <div className="bg-black/80 text-white px-2 py-1 rounded text-[10px] mb-1">See More</div>
                         + 15
                     </div>
                </div>

                {/* Main Hero Image */}
                <div className="flex-1 relative rounded-xl overflow-hidden group">
                     {/* Animated Image Transition could go here, but keeping it simple for now */}
                     <img src={images[currentImageIndex]} className="w-full h-full object-cover transition-opacity duration-300" alt="Main Hero" />
                     
                     {/* Overlay Buttons */}
                     <div className="absolute top-4 right-4 flex gap-3">
                         <button className="bg-white hover:bg-gray-100 text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm transition-colors text-sm">
                             <Share size={16} /> Share
                         </button>
                         <button className="bg-white hover:bg-gray-100 text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm transition-colors text-sm">
                             <Heart size={16} /> Add to Wishlist
                         </button>
                     </div>

                     {/* Navigation Arrows */}
                     <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                     >
                         <ChevronLeft size={20} className="text-[#1a1a1a]" />
                     </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                     >
                         <ChevronRight size={20} className="text-[#1a1a1a]" />
                     </button>
                </div>
            </div>

            {/* Quick Info Bar below images */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-[#1a1a1a] mb-8">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#00aa6c]" /> 
                    <span className="font-normal text-gray-600">4 hours (approx.)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#00aa6c] flex items-center justify-center p-0.5">
                        <div className="w-full h-[2px] bg-[#00aa6c]"></div>
                    </div>
                     <span className="font-normal text-gray-600">Pickup offered</span>
                </div>
                <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#00aa6c]" />
                    <span className="font-normal text-gray-600">Mobile ticket</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#00aa6c]" />
                    <span className="font-normal text-gray-600">Offered in: <span className="underline cursor-pointer">English and 1 more</span></span>
                </div>
            </div>
            
             <hr className="border-gray-200 mb-8" />
            
             {/* Content Placeholders for Sections */}
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Overview</h2>
              <p className="text-[#1a1a1a] leading-relaxed mb-6 text-[16px]">
                Combine a zipline adventure, a visit with monkeys and sloths, and a sightseeing tour of Roatan on this single private tour. You'll get the most out of your time on the island by booking a comprehensive tour that includes all the must-dos. Zip through the jungle canopy, learn about the local wildlife, and snap photos of the best viewpoints, all with a private guide to provide commentary and personalized attention.
              </p>
            </section>

             <hr className="border-gray-200 my-6" />

            {/* What's Included */}
            <section>
              <div 
                className="flex items-center justify-between cursor-pointer group mb-4"
                onClick={() => toggleSection('whatsIncluded')}
              >
                  <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:underline">What's Included</h2>
                  <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.whatsIncluded ? 'rotate-180' : ''}`} />
              </div>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.whatsIncluded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                 <div className="overflow-hidden">
                   <div className="space-y-4 mb-6">
                     {[
                       "Private transportation",
                       "Air-conditioned vehicle",
                       "All Fees and Taxes"
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Check size={16} className="text-[#1a1a1a]" strokeWidth={2} />
                            <span className="text-[#1a1a1a]">{item}</span>
                        </div>
                     ))}
                   </div>
                 </div>
              </div>
            </section>

            <hr className="border-gray-200 my-6" />

             <section>
                <div 
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={() => toggleSection('meetingPickup')}
                >
                    <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:underline">Meeting and Pickup</h2>
                    <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.meetingPickup ? 'rotate-180' : ''}`} />
                </div>
                
                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.meetingPickup ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="border border-gray-200 rounded-lg p-6">
                             
                             {/* Pickup Points Header */}
                             <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 flex justify-center"><Users size={20} className="text-[#00aa6c]" /></div>
                                <span className="font-bold text-[#1a1a1a]">Pickup points</span>
                             </div>
        
                             {/* Search Input */}
                             <div className="mb-6">
                                 <label className="block text-[#1a1a1a] mb-2 font-normal">Select a pickup point</label>
                                 <div className="relative">
                                     <input 
                                        type="text" 
                                        placeholder="Type to search" 
                                        className="w-full border border-gray-300 rounded-md py-3 pl-4 pr-10 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                                     />
                                     <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                     </div>
                                 </div>
                             </div>
        
                             {/* Pickup Details */}
                             <div className="mb-2">
                                 <h3 className="font-bold text-[#1a1a1a] mb-2">Pickup details</h3>
                                 <div className={`text-[#1a1a1a] text-sm leading-relaxed space-y-4 transition-all duration-300 ${isPickupTextExpanded ? '' : 'line-clamp-3'}`}>
                                     <p>
                                        At Mahogany Bay Port, we will pick you up 1 hour after your ship has docked. Once you disembarked your ship, you will proceed to the Main Exit gate, where your driver and guide will be waiting for you holding a sign with our company logo saying "Roatán Breakaway Tours" . You will walk up the concrete hill and down to the exit gate. You can also take a cab to the gate if you do not want to walk.
                                     </p>
                                     <p>
                                        For Coxen Hole, Port Roatan. We will pick you up 1 hour after your ship has docked. Once you are ready to disembark your ship, please proceed to Exit Gate #2, where your driver and guide will be waiting for you holding a sign with our company "Roatán Breakaway Tours". Once you disembarked your ship, you will just walk past all the vendors and to the Exit gate. At the exit, you will just look across the street for the company logo, "Roatán Breakaway Tours."
                                     </p>
                                 </div>
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); setIsPickupTextExpanded(!isPickupTextExpanded); }}
                                    className="flex items-center gap-1 text-[#1a1a1a] font-bold text-sm mt-3 hover:underline"
                                >
                                     {isPickupTextExpanded ? 'Read less' : 'Read more'} <ChevronDown className={`transition-transform duration-300 ${isPickupTextExpanded ? 'rotate-180' : ''}`} size={16} />
                                 </button>
                             </div>
                        </div>
        
                        <div className="mt-8">
                             <div className="flex items-center gap-2 mb-2">
                                <Clock size={20} className="text-[#00aa6c]" />
                                <h3 className="font-bold text-[#1a1a1a]">Arranged start time</h3>
                             </div>
                             <p className="text-[#1a1a1a] mb-4">Confirm time with the local provider in advance of your experience.</p>
                             <div className="text-[#1a1a1a] font-bold">
                                 <p>07/11/2023 - 02/24/2027</p>
                                 <p className="mt-1">Monday - Sunday : 7:00 AM - 4:00 PM</p>
                             </div>
                        </div>
                    </div>
                </div>
             </section>

            <hr className="border-gray-200 my-6" />

             {/* Itinerary */}
             <section>
                 <div 
                    className="flex items-center justify-between cursor-pointer group mb-4 "
                    onClick={() => toggleSection('itinerary')}
                >
                     <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:underline">Itinerary</h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.itinerary ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.itinerary ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                         <div className="relative border-l-2 border-black ml-3 space-y-10 pb-4">
                             
                             {/* Stop 1 */}
                             <div className="relative pl-8">
                                 <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">1</div>
                                 <h3 className="text-lg font-bold text-[#1a1a1a] leading-none">Port Of Roatan</h3>
                                 <p className="text-[#1a1a1a] mt-1 text-[15px]">
                                     You will be picked up at the port and taking on a car ride to the Zipline Facility and Animal Sanctuary
                                 </p>
                                 <div className="text-sm text-gray-500 mt-1">
                                     15 minutes • Admission Ticket Free
                                 </div>
                             </div>
        
                             {/* Stop 2 */}
                             <div className="relative pl-8">
                                 <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">2</div>
                                 <h3 className="text-lg font-bold text-[#1a1a1a] leading-none">Jungle Top Adventures Zipline</h3>
                                 <p className="text-[#1a1a1a] mt-1 text-[15px]">
                                     Guest will do Ziplining and visit the animal sanctuary.
                                 </p>
                                 <div className="text-sm text-gray-500 mt-1">
                                     2 hours • Admission Ticket Included
                                 </div>
                             </div>
        
                              {/* Stop 3 */}
                              <div className="relative pl-8">
                                 <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">3</div>
                                 <h3 className="text-lg font-bold text-[#1a1a1a] leading-none">The Roatan Chocolate Factory</h3>
                                 <p className="text-[#1a1a1a] mt-1 text-[15px]">
                                     Guest will visit the Chocolate factory for tasting and learning about the history of the cacao seed and chocolate making.
                                 </p>
                                 <div className="text-sm text-gray-500 mt-1">
                                     45 minutes • Admission Ticket Included
                                 </div>
                             </div>
        
                             {/* Stop 4 */}
                              <div className="relative pl-8">
                                 <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">4</div>
                                 <h3 className="text-lg font-bold text-[#1a1a1a] leading-none">Roatan Rum Company</h3>
                                 <p className="text-[#1a1a1a] mt-1 text-[15px]">
                                     Guest will visit the Rum cake Factory for tasting and samples all different types of local made flavored Island rum.
                                 </p>
                                 <div className="text-sm text-gray-500 mt-1">
                                     45 minutes • Admission Ticket Included
                                 </div>
                             </div>
        
                             {/* Stop 5 */}
                              <div className="relative pl-8">
                                 <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">5</div>
                                 <h3 className="text-lg font-bold text-[#1a1a1a] leading-none">Port Of Roatan</h3>
                                 <p className="text-[#1a1a1a] mt-1 text-[15px]">
                                     You will be drop off inside the Port nearest to your ship.
                                 </p>
                                 <div className="text-sm text-gray-500 mt-1">
                                     15 minutes • Admission Ticket Free
                                 </div>
                             </div>
                         </div>
                    </div>
                 </div>
             </section>

             <hr className="border-gray-200 my-6" />

             {/* Additional Info */}
             <section>
                 <div 
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={() => toggleSection('additionalInfo')}
                >
                     <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:underline">Additional Info</h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.additionalInfo ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.additionalInfo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                             <ul className="space-y-4 list-disc pl-5 text-[#1a1a1a]">
                                 <li>Confirmation will be received at time of booking</li>
                                 <li>Wheelchair accessible</li>
                                 <li>Stroller accessible</li>
                             </ul>
                             <ul className="space-y-4 list-disc pl-5 text-[#1a1a1a]">
                                 <li>Transportation is wheelchair accessible</li>
                                 <li>Not recommended for travelers with back problems</li>
                                 <li>Not recommended for pregnant travelers</li>
                             </ul>
                         </div>
                     </div>
                 </div>
             </section>

             <hr className="border-gray-200 my-6" />

             {/* Why travelers loved this */}
             <section>
                 <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold text-[#1a1a1a]">Why travelers loved this</h2>
                        <div className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[10px] flex items-center justify-center font-normal cursor-pointer">i</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="bg-[#00aa6c] p-0.5 rounded text-white"><Star size={12} fill="white" stroke="none" /></div>
                        <span className="font-bold text-[#1a1a1a]">4.9</span>
                        <span className="text-gray-500 underline text-sm cursor-pointer">106 Reviews</span>
                    </div>
                 </div>

                 {/* Tags Scroll */}
                 <div className="relative mb-6 group/tags">
                    <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar items-center">
                        <button className="px-5 py-2 rounded-full border border-[#1a1a1a] bg-white text-[#1a1a1a] font-bold whitespace-nowrap hover:bg-gray-50">
                            All
                        </button>
                        {[
                            "Great food", 
                            "Informative experience", 
                            "Wildlife", 
                            "Engaging activities", 
                            "Family fun"
                        ].map((tag, i) => (
                            <button key={i} className="px-4 py-2 rounded-full bg-[#dff7eb] text-[#1a1a1a] font-medium whitespace-nowrap flex items-center gap-2 hover:bg-[#cbf2e0] transition-colors">
                                <Check size={14} className="text-[#1a1a1a]" strokeWidth={2} />
                                {tag}
                            </button>
                        ))}
                    </div>
                     <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center border border-gray-100 opacity-0 group-hover/tags:opacity-100 transition-opacity">
                         <ChevronRight size={20} className="text-gray-600" />
                     </button>
                 </div>

                 {/* Reviews Horizontal Scroll */}
                 <div className="relative group/reviews">
                     <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                         {/* Card 1 */}
                         <div className="min-w-[260px] md:max-w-[300px] border border-gray-200 rounded-xl p-5 shrink-0 hover:shadow-lg transition-shadow bg-white">
                             <div className="flex items-center gap-1 text-[#00aa6c] mb-3">
                                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" stroke="none" />)}
                                 <span className="text-gray-500 text-sm ml-2">Jill_H • Jan 2026</span>
                             </div>
                             <p className="text-[#1a1a1a] text-sm leading-relaxed mb-3 line-clamp-4">
                                 We had a great time on our excursion! First time Zip lining and it was so much fun! The staff was great! We got to see the monkeys, sloths, and parrots. Then we got to visit the rum and chocolate factories. Our guide, Omar was an amazi...
                             </p>
                             <button className="text-[#1a1a1a] font-bold text-sm underline decoration-1 hover:decoration-2">Read more</button>
                         </div>

                         {/* Card 2 */}
                         <div className="min-w-[260px] md:max-w-[300px] border border-gray-200 rounded-xl p-5 shrink-0 hover:shadow-lg transition-shadow bg-white">
                             <div className="flex items-center gap-1 text-[#00aa6c] mb-3">
                                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" stroke="none" />)}
                                 <span className="text-gray-500 text-sm ml-2">neesieak • Dec 2025</span>
                             </div>
                             <p className="text-[#1a1a1a] text-sm leading-relaxed mb-3 line-clamp-4">
                                 Amazing!!! Alfred was our driver. He went above and beyond all day. Answering all our questions. Taking us to amazing photo spots. Explaining the culture, history everything. Rum tour was good, brought bottles home. Ziplining was super f...
                             </p>
                             <button className="text-[#1a1a1a] font-bold text-sm underline decoration-1 hover:decoration-2">Read more</button>
                         </div>
                     </div>
                      <button className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center border border-gray-100 z-10 opacity-0 group-hover/reviews:opacity-100 transition-opacity">
                         <ChevronRight size={20} className="text-[#1a1a1a]" />
                     </button>
                 </div>
             </section>

             <hr className="border-gray-200 my-6" />

             {/* You Might Also Like */}
             <section>
                 <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">You might also like...</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <TourCard
                        image="https://picsum.photos/400/300?random=20"
                        location="Roatan, Honduras"
                        title="Roatan Island Tour: Monkeys, Sloths & Snorkel"
                        rating="4.8"
                        reviews="220"
                        price="119"
                     />
                     <TourCard 
                        image="https://picsum.photos/400/300?random=21"
                        location="Roatan, Honduras"
                        title="Private Catamaran Cruise with Open Bar"
                        rating="4.9"
                        reviews="156"
                        price="229"
                     />
                     <TourCard 
                        image="https://picsum.photos/400/300?random=22"
                        location="Roatan, Honduras"
                        title="Zipline & Beach Break Adventure"
                        rating="4.7"
                        reviews="89"
                        price="89"
                     />
                 </div>
             </section>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
                <div className="border border-gray-200 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 bg-white overflow-hidden">
                    
                    <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-gray-500">From</span>
                            <span className="text-2xl font-bold text-[#1a1a1a]">CA$122.86</span>
                            <span className="text-sm text-gray-500">per person</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                             <div className="border border-[#00aa6c] rounded-full p-0.5"><Check size={8} className="text-[#00aa6c]" strokeWidth={4} /></div>
                             <span className="text-sm text-[#1a1a1a]">Discounted rates for kids</span>
                        </div>
                    </div>

                    {/* Date/Travelers Inputs */}
                    <div className="flex gap-2 mb-4">
                        <div className="flex-1 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-black active:border-[#00aa6c] transition-colors relative">
                             <label className="text-xs text-gray-500 font-bold block mb-1">Date</label>
                             <div className="font-bold text-[#1a1a1a] text-sm">Fri, Feb 6</div>
                             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                         <div className="w-1/3 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-black active:border-[#00aa6c] transition-colors relative">
                             <label className="text-xs text-gray-500 font-bold block mb-1">Travelers</label>
                             <div className="font-bold text-[#1a1a1a] text-sm flex items-center gap-1"><Users size={14} /> 2</div>
                             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                    </div>

                    <button className="w-full bg-[#00704a] hover:bg-[#005c3d] text-white font-bold py-3.5 rounded-full transition-colors text-lg mb-4 shadow-sm">
                        Check Availability
                    </button>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5">
                                <Check size={12} className="text-[#00aa6c]" strokeWidth={3} />
                            </div>
                             <p className="text-sm text-gray-600"><span className="font-bold text-gray-900 underline decoration-dotted">Free cancellation</span> up to 24 hours before the experience starts (local time)</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5">
                                <Check size={12} className="text-[#00aa6c]" strokeWidth={3} />
                            </div>
                             <p className="text-sm text-gray-600"><span className="font-bold text-gray-900 underline decoration-dotted">Reserve Now and Pay Later</span> - Secure your spot while staying flexible</p>
                        </div>
                    </div>
                </div>

                {/* Fire Badge / Book Ahead */}
                <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                    <div className="bg-[#fff9e6] p-2 rounded-full">
                        <Flame size={20} className="text-[#d93a26]" fill="#d93a26" />
                    </div>
                     <div>
                         <p className="font-bold text-[#1a1a1a] text-sm">Book ahead!</p>
                         <p className="text-sm text-gray-600">On average, this is booked 52 days in advance.</p>
                     </div>
                </div>

                <div className="text-right text-gray-500 text-xs mt-2 flex items-center justify-end gap-1">
                    <Ticket size={12} /> Lowest Price Guarantee
                </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}