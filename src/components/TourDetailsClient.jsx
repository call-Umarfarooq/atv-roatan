"use client";
import React, { useState, useEffect, useRef } from 'react';
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
  MessageCircle,
  Car,
  X
} from 'lucide-react';
import TourCard from '@/components/TourCard';
import BookingWidget from '@/components/BookingWidget';
import PickupSelector from '@/components/PickupSelector';
import { useParams } from 'next/navigation';
import { getImageUrl } from '@/utils/imageUrl';
import ReviewsWidget from '@/components/ReviewsWidget';

export default function TourDetailsClient({ initialTour, relatedTours = [] }) {
  const params = useParams();
  const { slug } = params;

  const [tour, setTour] = useState(initialTour || null);
  const [loading, setLoading] = useState(!initialTour);
  const [error, setError] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const [showMoreGallery, setShowMoreGallery] = useState(false);
  const [showAllIncluded, setShowAllIncluded] = useState(false);
  const [showAllAdditionalInfo, setShowAllAdditionalInfo] = useState(false);
  const [expandedStops, setExpandedStops] = useState(new Set());

  const toggleStop = (i) => setExpandedStops(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const [expandedSections, setExpandedSections] = useState({
    whatsIncluded: true,
    meetingPickup: true,
    itinerary: true,
    additionalInfo: true
  });

  const [isPickupTextExpanded, setIsPickupTextExpanded] = useState(true);

  useEffect(() => {
    // If we already have initialTour (passed from server), don't fetch again
    if (initialTour) return;

    async function fetchTour() {
      if (!slug) return;
      
      try {
        const response = await fetch(`/api/tours/${slug}`);
        const data = await response.json();
        
        if (data.success) {
            console.log('Fetched Tour Data:', data.data); // Debugging
            setTour(data.data);
        } else {
            console.error(data.error);
            setError('Tour not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load tour');
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [slug, initialTour]);

  useEffect(() => {
    if (showMoreGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMoreGallery]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const images = [tour.image_url, ...(tour.gallery || [])].filter(Boolean);
  const imageAlts = [tour.image_alt || tour.title, ...(tour.gallery_alts || []).map((a, i) => a || `${tour.title} gallery ${i + 1}`)];

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    // Try Web Share API first (Mobile friendly)
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: `Check out this tour: ${tour.title}`,
          url: url
        });
        return;
      } catch (err) {
        // User cancelled or share failed, continue to clipboard
        console.log('Error sharing:', err);
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = 'fixed'; // Avoid scrolling to bottom
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      } catch (e) {
        console.error('Fallback failed:', e);
        alert('Failed to copy link');
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !tour) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Tour not found'}</div>;

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumb - Top Line */}
        <div className="flex items-center justify-between mb-4">
            <nav className="text-xs text-gray-500 flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="flex items-center p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <ChevronLeft size={16} />
                <span className="font-bold text-gray-900 ml-1">All Experiences in Roatan</span>
            </div>
            <span>&#8226;</span>
            <span className="hover:underline cursor-pointer">Home</span> <span>/</span>
            <span className="hover:underline cursor-pointer">Tours</span> <span>/</span>
            <span className="text-gray-900">{tour.title}</span>
            </nav>
            {/* <div className="text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">
                 <MessageCircle size={16} /> Chat now
            </div> */}
        </div>

        {/* Gallery & Sidebar Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2">
            {/* Title Section */}
            <h1 className="font-[500] text-[20px] md:text-[28px] text-[#1a1a1a] mb-3 not-italic" style={{ lineHeight: '32px', letterSpacing: '0.2px' }}>
              {tour.title}
            </h1>

            {/* Badges & Rating Row */}
            <div className="flex flex-wrap items-center highlightt mb-6 gap-x-2.5">
              {/* Ratings */}
              {tour.marketing_badges?.stars && (
                <div className="flex items-center">
                  <div className="flex gap-0.5 text-[#00694B]">
                    {[...Array(Math.round(tour.marketing_badges.stars))].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="text-[#1a1a1a] font-normal text-[12px]  sm:font-semibold hover:underline cursor-pointer ml-1">
                    {tour.marketing_badges?.reviews_text}
                  </span>
                </div>
              )}

              <div className="text-gray-300 sm:text-xl text-[14px] font-light">|</div>

              {/* Recommendation */}
              {tour.marketing_badges?.recommendation_text && (
                <div className="flex items-center gap-1.5 text-[#1a1a1a]">
                  <div className="relative">
                    <Flame size={16} className="text-[#df3c23]" fill="#df3c23" stroke="none" />
                  </div>
                  <span className="sm:font-semibold text-[12px]">{tour.marketing_badges?.recommendation_text}</span>
                  <div className="sm:w-[15px] sm:h-[15px] w-[10px] h-[10px] rounded-full border border-gray-400 text-gray-500 text-[9px] flex items-center justify-center font-semibold cursor-help">
                    i
                  </div>
                </div>
              )}

              {tour.marketing_badges?.badge_text && (
                <>
                   <div className="text-gray-300 sm:text-xl text-[14px] font-light">|</div>
                  {/* Badge of Excellence */}
                  <div className="flex items-center gap-2 text-[#1a1a1a]">
                    <div className="bg-[#cc9b33] rounded-full p-0.5">
                      <Award  className="text-white w-[10px] h-[10px] sm:w-[16px] sm:h-[16px]" fill="white" strokeWidth={1} />
                    </div>
                    <span className="sm:font-semibold text-[12px]">{tour.marketing_badges?.badge_text}</span>
                  </div>
                </>
              )}

              <div className="text-gray-300 sm:text-xl text-[14px] font-light">|</div>

              {/* Location */}
              <span className="sm:font-semibold text-[12px]">
                {tour.marketing_badges?.location_text || 'Roatan, Honduras'}
              </span>
            </div>

            {/* ── MOBILE Gallery Mosaic (hidden on md+) ── */}
            <div className="md:hidden mb-6">
              <div className="flex gap-1.5 h-[220px] rounded-xl overflow-hidden">
                {/* Large main image - left 60% */}
                <div
                  className="relative w-[60%] shrink-0 cursor-pointer"
                  onClick={() => { setCurrentImageIndex(0); setShowMoreGallery(true); }}
                >
                  <img
                    src={getImageUrl(images[0])}
                    className="w-full h-full object-cover"
                    alt={imageAlts[0] || tour.title}
                  />
                  {/* Share button overlay */}
                  <CircularShareMenu onShare={handleShare} />
                </div>

                {/* Right column - 2 stacked thumbnails */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {/* Top-right thumbnail */}
                  <div
                    className="relative flex-1 cursor-pointer overflow-hidden"
                    onClick={() => { setCurrentImageIndex(1); setShowMoreGallery(true); }}
                  >
                    {images[1] && (
                      <img
                        src={getImageUrl(images[1])}
                        className="w-full h-full object-cover"
                        alt={imageAlts[1] || tour.title}
                      />
                    )}
                  </div>

                  {/* Bottom-right thumbnail with "View all" overlay */}
                  <div
                    className="relative flex-1 cursor-pointer overflow-hidden"
                    onClick={() => { setCurrentImageIndex(2); setShowMoreGallery(true); }}
                  >
                    {images[2] && (
                      <>
                        <img
                          src={getImageUrl(images[2])}
                          className="w-full h-full object-cover"
                          alt={imageAlts[2] || tour.title}
                        />
                        {/* Dark overlay + "View all" text */}
                        {images.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                            <span className="text-[11px] font-bold text-center leading-tight">View all<br/>{images.length} images</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Fullscreen gallery modal moved to root */}
            </div>

            {/* ── DESKTOP Gallery (hidden on mobile) ── */}
            <div className="hidden md:flex gap-3 h-[400px] lg:h-[500px] mb-6">
                {/* Thumbnails Strip */}
                <div className="flex flex-col gap-2 w-36 shrink-0 relative">
                  {images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`relative w-full h-[90px] rounded-lg overflow-hidden cursor-pointer transition-all shrink-0 ${
                        currentImageIndex === i ? 'ring-2 ring-black opacity-100' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={imageAlts[i] || tour.title} />
                    </div>
                  ))}
                  {images.length > 4 && (
                    <button
                      onClick={() => setShowMoreGallery(v => !v)}
                      className="relative w-full rounded-full overflow-hidden cursor-pointer bg-[#00694B] text-white flex items-center justify-center gap-1.5 buttontext py-1.5 hover:bg-[#1f4232] transition-colors shrink-0"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                      See More 
                    </button>
                  )}

                </div>

                {/* Main Hero Image */}
                <div className="flex-1 relative group">
                  {/* overflow-hidden is on the inner div so orbiting share icons aren't clipped */}
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img src={getImageUrl(images[currentImageIndex])} className="w-full h-full object-cover transition-opacity duration-300" alt={imageAlts[currentImageIndex] || tour.title} />
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ChevronLeft size={20} className="text-[#1a1a1a]" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ChevronRight size={20} className="text-[#1a1a1a]" />
                    </button>
                  </div>
                  {/* Share menu sits outside overflow-hidden so orbiting icons are visible */}
                  <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10">
                    <CircularShareMenu onShare={handleShare} className="relative" />
                  </div>
                </div>
            </div>

            {/* Quick Info Bar below images */}
            <div className="flex flex-wrap gap-x-2 sm:gap-x-8 gap-y-4 text-sm text-[#1a1a1a] mb-8">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#00694B]" /> 
                    <span className="font-normal text-[12px]">{tour.duration} (approx.)</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#00694B] flex items-center justify-center p-0.5">
                        <div className="w-full h-[2px] bg-[#00694B]"></div>
                    </div>
                     <span className="font-normal text-gray-600">Pickup offered</span>
                </div> */}
                 <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-[#00694B]" />
                    <span className="font-normal text-[12px]">Mobile ticket</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#00694B]" />
                    <span className="font-normal text-[12px]">Offered in: <span className="underline cursor-pointer">English</span></span>
                </div>
            </div>
            
             {/* Mobile Booking Widget */}
             <div className="block lg:hidden sm:mb-8 mb-2">
                 <BookingWidget tour={tour} selectedPickup={selectedPickup} />
             </div>
            
             <hr className="border-gray-200 sm:mb-8 mb-2" />
            
             {/* Content Placeholders for Sections */}
            {/* Overview */}
            <section>
              <h2 className="h11 text-[#1a1a1a]">Overview</h2>
              <p className="text-[#1a1a1a] leading-relaxed mb-6 spantext">
                {tour.description}
              </p>
            </section>

             <hr className="border-gray-200 ms:my-6 my-2" />

            {/* What's Included */}
            <section>
              <div 
                className="flex items-center justify-between cursor-pointer group sm:mb-4 mb-2"
                onClick={() => toggleSection('whatsIncluded')}
              >
                  <h2 className="h11 text-[#1a1a1a] group-hover:underline">What's Included</h2>
                  <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.whatsIncluded ? 'rotate-180' : ''}`} />
              </div>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.whatsIncluded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                 <div className="overflow-hidden">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                       {/* Included */}
                       <div>
                           <h3 className=" mb-3">Included</h3>
                            <div className="space-y-4">
                                 {tour.what_to_include &&
                                   (showAllIncluded ? tour.what_to_include : tour.what_to_include.slice(0, 3)).map((item, i) => (
                                     <div key={i} className="flex items-start gap-3">
                                         <Check size={16} className="text-[#1a1a1a] mt-1 shrink-0" strokeWidth={2} />
                                         <span className="text-[#1a1a1a] spantext">{item}</span>
                                     </div>
                                 ))}
                             </div>
                             {tour.what_to_include && tour.what_to_include.length > 3 && (
                               <button
                                 onClick={() => setShowAllIncluded(v => !v)}
                                 className="mt-4 flex items-center gap-1.5 text-sm font-bold text-[#00694B] hover:underline focus:outline-none"
                               >
                                 {showAllIncluded ? (
                                   <><ChevronDown size={16} className="rotate-180" /> Show Less</>
                                 ) : (
                                   <><ChevronDown size={16} /> See More</>
                                 )}
                               </button>
                             )}
                       </div>
                       
                       {/* Exclusions */}
                       {tour.exclusions && tour.exclusions.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="h11 text-[#1a1a1a] mb-4">Not Included</h3>
                                <div className="space-y-3">
                                    {tour.exclusions.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                            <span className="text-gray-600 spantext">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                       )}
                   </div>
                 </div>
              </div>
            </section>

             {/* Best Price Guarantee */}
             <div className="flex items-start gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100 sm:my-6 my-2">
                <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                    <div className="text-white text-[10px] font-bold text-center leading-tight">
                        BEST<br/>PRICE
                    </div>
                </div>
                <div>
                    <h3 className="h11  text-[#1a1a1a] mb-1">The Best Price Guarantee</h3>
                    <p className="text-gray-600 spantext">
                        Find a better price for any excursion we offer and we will refund you 110% of the price difference!
                    </p>
                </div>
             </div>

            <hr className="border-gray-200 sm:my-6 my-2" />

             <section>
                <div 
                    className="flex items-center justify-between cursor-pointer group sm:mb-4 mb-2 "
                    onClick={() => toggleSection('meetingPickup')}
                >
                    <h2 className="h11 text-[#1a1a1a] group-hover:underline">Meeting and Pickup</h2>
                    <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.meetingPickup ? 'rotate-180' : ''}`} />
                </div>
                
                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.meetingPickup ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <PickupSelector 
                          configuration={tour.pickup_configuration} 
                          selectedLocation={selectedPickup}
                          onSelect={setSelectedPickup}
                        />
                    </div>
                </div>
             </section>

            <hr className="border-gray-200 sm:my-6 my-2" />

             {/* Itinerary */}
             <section>
                 <div 
                    className="flex items-center justify-between cursor-pointer group sm:mb-4 mb-2 "
                    onClick={() => toggleSection('itinerary')}
                >
                     <h2 className="h11 text-[#1a1a1a] group-hover:underline">Itinerary</h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.itinerary ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.itinerary ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                         <div className="relative border-l-2 border-black ml-3 space-y-10 pb-4">
                             
                             {tour.itinerary && tour.itinerary.map((stop, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">{i + 1}</div>
                                    <h3 className=" font-medium text-[#1a1a1a] leading-none mb-1">{stop.title}</h3>
                                    
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                        {stop.stop_type === 'Stop' ? (
                                            <span className="font-medium text-[#1a1a1a] flex items-center gap-1">
                                                <MapPin size={14} className="text-[#00694B]" /> Stop
                                            </span>
                                        ) : stop.stop_type === 'Pass By' ? (
                                            <span className="italic text-gray-500 flex items-center gap-1">
                                                <Car size={14} /> Pass By
                                            </span>
                                        ) : (
                                            <span className="font-medium text-[#1a1a1a]">{stop.stop_type}</span>
                                        )}
                                        
                                        {stop.duration && <span>&#8226; {stop.duration}</span>}
                                       
                                    </div>

                                    <p className={`text-[#1a1a1a] mt-1 spantext ${expandedStops.has(i) ? '' : 'line-clamp-2'}`}>
                                        {stop.description}
                                    </p>
                                    {stop.description && stop.description.length > 120 && (
                                      <button
                                        onClick={() => toggleStop(i)}
                                        className="mt-1 text-sm font-bold text-[#00694B] hover:underline focus:outline-none"
                                      >
                                        {expandedStops.has(i) ? 'Show less' : 'Read more'}
                                      </button>
                                    )}
                                </div>
                             ))}
                         </div>
                    </div>
                 </div>
             </section>

             <hr className="border-gray-200 sm:my-6 my-2" />

             {/* Additional Info / Policies / FAQ */}
             <section>
                 <div 
                    className="flex items-center justify-between cursor-pointer group sm:mb-4 mb-2"
                    onClick={() => toggleSection('additionalInfo')}
                >
                     <h2 className="h11 text-[#1a1a1a] group-hover:underline">Additional Info </h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.additionalInfo ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.additionalInfo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-8">
                        
                         {/* Additional Info List */}
                         <div>
                             <h3 className="font-medium text-[#1a1a1a] mb-3">Additional Information</h3>
                              <div className="space-y-3 text-[#1a1a1a]">
                                  {tour.additional_info &&
                                    (showAllAdditionalInfo ? tour.additional_info : tour.additional_info.slice(0, 3)).map((info, i) => (
                                      <div key={i} className="flex gap-2 items-start">
                                          <span className='spantext'>{info}</span>
                                      </div>
                                    ))}
                              </div>
                              {tour.additional_info && tour.additional_info.length > 3 && (
                                <button
                                  onClick={() => setShowAllAdditionalInfo(v => !v)}
                                  className="mt-3 flex items-center gap-1.5 text-sm font-bold text-[#00694B] hover:underline focus:outline-none"
                                >
                                  {showAllAdditionalInfo ? (
                                    <><ChevronDown size={16} className="rotate-180" /> Show Less</>
                                  ) : (
                                    <><ChevronDown size={16} /> See More </>
                                  )}
                                </button>
                              )}
                         </div>

                         {/* Cancellation Policy */}
                         {tour.cancellation_policy && (
                             <div>
                                 <h3 className="font-[500] text-[#1a1a1a] mb-2">Cancellation Policy</h3>
                                 <div className="bg-[#fcf8f2] p-4 rounded-lg border border-[#e0d6c5] text-[#1a1a1a]">
                                     <p className='spantext '>{tour.cancellation_policy}</p>
                                 </div>
                             </div>
                         )}

                         {/* FAQ */}
                         {tour.faq && tour.faq.length > 0 && (
                             <div>
                                 <h3 className="h11 text-[#1a1a1a] mb-3">Frequently Asked Questions</h3>
                                 <div className="space-y-4">
                                     {tour.faq.map((item, i) => (
                                         <div key={i} className="border-b last:border-0 border-gray-200 pb-4 last:pb-0">
                                             <p className="font-[500] text-[#1a1a1a] mb-1">{item.question}</p>
                                             <p className="text-gray-700 spantext">{item.answer}</p>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}
                     </div>
                 </div>
             </section>


             <hr className="border-gray-200 sm:my-6 my-2" />

             {/* Tags — only render section if tags exist */}
             {tour.tags && tour.tags.length > 0 && (
               <section>
                 <div className="relative mb-6 group/tags">
                   <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar items-center">
                     <button className="px-5 category-btn rounded-full border border-[#1a1a1a] bg-white text-[#1a1a1a]  whitespace-nowrap hover:bg-gray-50">
                       All
                     </button>
                     {tour.tags.map((tag, i) => (
                       <button key={i} className="px-4  rounded-full bg-[#dff7eb] text-[#1a1a1a] category-btn whitespace-nowrap flex items-center gap-2 hover:bg-[#cbf2e0] transition-colors">
                         <Check size={14} className="text-[#1a1a1a]" strokeWidth={2} />
                         {tag}
                       </button>
                     ))}
                   </div>
                 </div>
               </section>
             )}

             <ReviewsWidget />

             <hr className="border-gray-200 sm:my-6 my-2" />

             {/* You Might Also Like */}
             {relatedTours && relatedTours.length > 0 && (
               <section>
                 <h2 className="h11 text-[#1a1a1a] sm:mb-6 mb-2">You might also like...</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {relatedTours.map((related) => (
                     <TourCard
                       key={related._id}
                       slug={related.slug}
                       pp={"pp"}
                       image={related.image_url}
                       gallery={related.gallery}
                       location={related.location_text || 'Roatan, Honduras'}
                       title={related.title}
                       rating={related.marketing_badges?.stars || '0'}
                       reviews={related.marketing_badges?.reviews_text?.replace(/\D/g, '') || '0'}
                       price={related.adultPrice || related.base_price || '0'}
                       duration={related.duration}
                       description={related.overview || related.description}
                       additionalInfo={related.additional_info}
                       cutoff_price={related.cutoff_price}
                     />
                   ))}
                 </div>
               </section>
             )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
                <BookingWidget tour={tour} selectedPickup={selectedPickup} />
            </div>
          </div>

        </div>
      </main>

      {/* Unified Fullscreen Gallery Modal */}
      {showMoreGallery && (
        <div className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
            <div className="flex-1"></div>
            <div className="flex gap-6 text-white text-sm font-bold">
              <span className="border-b-2 border-white pb-1">Provider photos ({images.length})</span>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setShowMoreGallery(false)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close gallery"
              >
                <X size={20} className="text-[#1a1a1a]" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16 pb-4">
            <img
              src={getImageUrl(images[currentImageIndex])}
              className="max-h-full max-w-full object-contain"
              alt={imageAlts[currentImageIndex] || 'Tour Image'}
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length)}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-[#1a1a1a]" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(p => (p + 1) % images.length)}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-[#1a1a1a]" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 bg-black/70 text-white text-sm font-bold px-3 py-1.5 rounded">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="h-[100px] sm:h-[120px] shrink-0 bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex gap-2.5 overflow-x-auto h-full items-center no-scrollbar px-4 sm:px-8 max-w-full snap-x">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-md overflow-hidden border-2 transition-all snap-center ${
                    i === currentImageIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CircularShareMenu = ({ onShare, className = 'absolute top-3 left-3 z-50' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const leaveTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setIsOpen(false), 200);
  };

  const socialLinks = [
    { name: 'X', color: '#000000', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { name: 'Reddit', color: '#FF4500', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .883.175 1.188.467 1.21-.864 2.894-1.432 4.75-1.493l.995-4.639c.036-.169.194-.285.368-.261l2.904.611a1.26 1.26 0 0 1 1.023-.187z"/></svg> },
    { name: 'LinkedIn', color: '#0A66C2', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { name: 'Instagram', color: '#E4405F', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { name: 'GitHub', color: '#181717', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
    { name: 'YouTube', color: '#FF0000', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
    { name: 'Facebook', color: '#1877F2', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: 'WhatsApp', color: '#25D366', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.286 5.286 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
  ];

  const radius = 60;

  return (
    <div
      className={`${className} flex items-center justify-center w-10 h-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => { e.stopPropagation(); setIsOpen(o => !o); }}
    >
      {/* Central Share Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onShare(); }}
        className={`relative z-10 w-9 h-9 bg-white/90 hover:bg-white text-[#1a1a1a] rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${isOpen ? 'scale-110 shadow-lg bg-white' : ''}`}
      >
        <Share size={15} />
      </button>

      {/* Orbiting Icons */}
      {socialLinks.map((item, index) => {
        const angle = (index * (360 / socialLinks.length)) - 90;
        return (
          <div
            key={item.name}
            className="absolute top-0 left-0 w-9 h-9"
            style={{
              transition: 'transform 500ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease',
              transform: isOpen
                ? `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
                : 'rotate(0deg) translate(0px) rotate(0deg)',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
          >
            <button
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform hover:ring-2 ring-gray-100"
              style={{ color: item.color }}
              onClick={(e) => { e.stopPropagation(); onShare(); }}
              title={`Share on ${item.name}`}
            >
              {item.icon}
            </button>
          </div>
        );
      })}
    </div>
  );
};
