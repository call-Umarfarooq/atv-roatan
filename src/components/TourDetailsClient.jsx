"use client";
import React, { useState, useEffect } from 'react';
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
            <div className="flex flex-wrap items-center text-[13.5px] mb-6 gap-x-2.5">
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
                  <button
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                    className="absolute top-3 left-3 bg-white/90 hover:bg-white text-[#1a1a1a] p-2 rounded-full shadow-sm transition-colors"
                  >
                    <Share size={15} />
                  </button>
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
                      className="relative w-full h-[44px] rounded-full overflow-hidden cursor-pointer bg-[#00694B] text-white flex items-center justify-center gap-1.5 font-bold text-xs hover:bg-[#1f4232] transition-colors shrink-0"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                      See More 
                    </button>
                  )}

                </div>

                {/* Main Hero Image */}
                <div className="flex-1 relative rounded-xl overflow-hidden group">
                  <img src={getImageUrl(images[currentImageIndex])} className="w-full h-full object-cover transition-opacity duration-300" alt={imageAlts[currentImageIndex] || tour.title} />
                  <div className="absolute top-4 right-4 flex gap-3">
                    <button onClick={handleShare} className="bg-white hover:bg-gray-100 text-[#1a1a1a] px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-sm transition-colors text-sm">
                      <Share size={16} /> Share
                    </button>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ChevronLeft size={20} className="text-[#1a1a1a]" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ChevronRight size={20} className="text-[#1a1a1a]" />
                  </button>
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
              <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a]">Overview</h2>
              <p className="text-[#1a1a1a] leading-relaxed mb-6 text-[16px]">
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
                  <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] group-hover:underline">What's Included</h2>
                  <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.whatsIncluded ? 'rotate-180' : ''}`} />
              </div>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.whatsIncluded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                 <div className="overflow-hidden">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                       {/* Included */}
                       <div>
                           <h3 className="font-medium mb-3">Included</h3>
                            <div className="space-y-4">
                                 {tour.what_to_include &&
                                   (showAllIncluded ? tour.what_to_include : tour.what_to_include.slice(0, 3)).map((item, i) => (
                                     <div key={i} className="flex items-start gap-3">
                                         <Check size={16} className="text-[#1a1a1a] mt-1 shrink-0" strokeWidth={2} />
                                         <span className="text-[#1a1a1a]">{item}</span>
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
                                <h3 className="font-medium text-[#1a1a1a] mb-4">Not Included</h3>
                                <div className="space-y-3">
                                    {tour.exclusions.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                            <span className="text-gray-600">{item}</span>
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
                    <h3 className="sm:text-2xl sm:font-normal text-[20px] font-medium  text-[#1a1a1a] mb-1">The Best Price Guarantee</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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
                    <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] group-hover:underline">Meeting and Pickup</h2>
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
                     <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] group-hover:underline">Itinerary</h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.itinerary ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.itinerary ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                         <div className="relative border-l-2 border-black ml-3 space-y-10 pb-4">
                             
                             {tour.itinerary && tour.itinerary.map((stop, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">{i + 1}</div>
                                    <h3 className="text-lg font-medium text-[#1a1a1a] leading-none mb-1">{stop.title}</h3>
                                    
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

                                    <p className={`text-[#1a1a1a] mt-1 text-[15px] leading-relaxed ${expandedStops.has(i) ? '' : 'line-clamp-2'}`}>
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
                     <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] group-hover:underline">Additional Info </h2>
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
                                          <span>{info}</span>
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
                                 <h3 className="font-bold text-[#1a1a1a] mb-2">Cancellation Policy</h3>
                                 <div className="bg-[#fcf8f2] p-4 rounded-lg border border-[#e0d6c5] text-[#1a1a1a]">
                                     <p>{tour.cancellation_policy}</p>
                                 </div>
                             </div>
                         )}

                         {/* FAQ */}
                         {tour.faq && tour.faq.length > 0 && (
                             <div>
                                 <h3 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] mb-3">Frequently Asked Questions</h3>
                                 <div className="space-y-4">
                                     {tour.faq.map((item, i) => (
                                         <div key={i} className="border-b last:border-0 border-gray-200 pb-4 last:pb-0">
                                             <p className="font-medium text-[#1a1a1a] mb-1">{item.question}</p>
                                             <p className="text-gray-700 text-sm">{item.answer}</p>
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
                     <button className="px-5 py-2 rounded-full border border-[#1a1a1a] bg-white text-[#1a1a1a] font-bold whitespace-nowrap hover:bg-gray-50">
                       All
                     </button>
                     {tour.tags.map((tag, i) => (
                       <button key={i} className="px-4 py-2 rounded-full bg-[#dff7eb] text-[#1a1a1a] font-medium whitespace-nowrap flex items-center gap-2 hover:bg-[#cbf2e0] transition-colors">
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
                 <h2 className="sm:text-2xl sm:font-bold text-[20px] font-medium text-[#1a1a1a] sm:mb-6 mb-2">You might also like...</h2>
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

