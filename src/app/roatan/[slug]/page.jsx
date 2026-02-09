
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
  Car
} from 'lucide-react';
import TourCard from '@/components/TourCard';
import BookingWidget from '@/components/BookingWidget';
import PickupSelector from '@/components/PickupSelector';
import { useParams } from 'next/navigation';
import { getImageUrl } from '@/utils/imageUrl';

export default function TourDetailsPage() {
  const params = useParams();
  const { slug } = params;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [expandedSections, setExpandedSections] = useState({
    whatsIncluded: true,
    meetingPickup: true,
    itinerary: true,
    additionalInfo: true
  });

  const [isPickupTextExpanded, setIsPickupTextExpanded] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      if (!slug) return;
      
      try {
        const response = await fetch(`/api/tours/${slug}`);
        const data = await response.json();
        
        if (data.success) {
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
  }, [slug]);


  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const nextImage = () => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    if (!tour?.gallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !tour) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Tour not found'}</div>;

  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image_url];

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
            <span className="hover:underline cursor-pointer">Tours</span> <span>/</span>
            <span className="text-gray-900">{tour.title}</span>
            </nav>
            <div className="text-sm font-bold flex items-center gap-1 cursor-pointer hover:underline">
                 <MessageCircle size={16} /> Chat now
            </div>
        </div>

        {/* Title Section */}
        <h1 className="text-2xl md:text-[30px] font-semibold text-[#1a1a1a] mb-3 leading-[1.2] tracking-tight">
        {tour.title}
      </h1>


        {/* Badges & Rating Row */}
      <div className="flex flex-wrap items-center text-[13.5px] mb-6 gap-x-2.5">
        
        {/* Ratings */}
        <div className="flex items-center">
          <div className="flex gap-0.5 text-[#008481]">
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
        {tour.is_featured && (
            <div className="flex items-center gap-1.5 text-[#1a1a1a]">
            <div className="relative">
                <Flame size={16} className="text-[#df3c23]" fill="#df3c23" stroke="none" />
            </div>
            <span className="font-semibold text-gray-800">Recommended by 100% of travelers</span>
            <div className="w-[15px] h-[15px] rounded-full border border-gray-400 text-gray-500 text-[9px] flex items-center justify-center font-bold cursor-help">
                i
            </div>
            </div>
        )}

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

       {/* Booking Flags / Badges */}
       {(tour.booking_options?.reserve_now_pay_later || tour.booking_options?.free_cancellation) && (
            <div className="flex gap-4 mb-6">
                {tour.booking_options?.reserve_now_pay_later && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold text-[#1a1a1a]">
                        <CreditCard size={16} /> Reserve Now & Pay Later
                    </div>
                )}
                {tour.booking_options?.free_cancellation && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold text-[#1a1a1a]">
                        <Calendar size={16} /> Free Cancellation
                    </div>
                )}
            </div>
       )}

        {/* Gallery & Sidebar Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-2">
            <div className="flex gap-3 h-[300px] md:h-[400px] lg:h-[500px] mb-6">
                
                {/* Thumbnails Strip */}
                <div className="hidden md:flex flex-col gap-3 w-36 shrink-0 overflow-y-auto no-scrollbar">
                     {images.map((img, i) => (
                        <div 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)}
                            className={`relative w-full h-[90px] rounded-lg overflow-hidden cursor-pointer transition-all ${currentImageIndex === i ? 'ring-2 ring-black opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        >
                            <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={`thumbnail ${i}`} />
                        </div>
                     ))}
                     <div className="relative w-full h-[90px] rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex flex-col items-center justify-center text-gray-700 font-bold text-xs hover:bg-gray-200">
                         <div className="bg-black/80 text-white px-2 py-1 rounded text-[10px] mb-1">See More</div>
                         + {images.length}
                     </div>
                </div>

                {/* Main Hero Image */}
                <div className="flex-1 relative rounded-xl overflow-hidden group">
                     <img src={getImageUrl(images[currentImageIndex])} className="w-full h-full object-cover transition-opacity duration-300" alt="Main Hero" />
                     
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
                    <Clock className="w-5 h-5 text-[#008481]" /> 
                    <span className="font-normal text-gray-600">{tour.duration} (approx.)</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#008481] flex items-center justify-center p-0.5">
                        <div className="w-full h-[2px] bg-[#008481]"></div>
                    </div>
                     <span className="font-normal text-gray-600">Pickup offered</span>
                </div> */}
                 <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#008481]" />
                    <span className="font-normal text-gray-600">Mobile ticket</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#008481]" />
                    <span className="font-normal text-gray-600">Offered in: <span className="underline cursor-pointer">English</span></span>
                </div>
            </div>
            
             {/* Mobile Booking Widget */}
             <div className="block lg:hidden mb-8">
                 <BookingWidget tour={tour} />
             </div>
            
             <hr className="border-gray-200 mb-8" />
            
             {/* Content Placeholders for Sections */}
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Overview</h2>
              <p className="text-[#1a1a1a] leading-relaxed mb-6 text-[16px]">
                {tour.description}
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
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                       {/* Included */}
                       <div>
                           <h3 className="font-bold mb-3">Included</h3>
                            <div className="space-y-4">
                                {tour.what_to_include && tour.what_to_include.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check size={16} className="text-[#1a1a1a] mt-1 shrink-0" strokeWidth={2} />
                                        <span className="text-[#1a1a1a]">{item}</span>
                                    </div>
                                ))}
                            </div>
                       </div>
                       
                       {/* Exclusions */}
                       {tour.exclusions && tour.exclusions.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[#1a1a1a] mb-4">Not Included</h3>
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
                        <PickupSelector configuration={tour.pickup_configuration} />
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
                             
                             {tour.itinerary && tour.itinerary.map((stop, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">{i + 1}</div>
                                    <h3 className="text-lg font-bold text-[#1a1a1a] leading-none mb-1">{stop.title}</h3>
                                    
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                        {stop.stop_type === 'Stop' ? (
                                            <span className="font-bold text-[#1a1a1a] flex items-center gap-1">
                                                <MapPin size={14} className="text-[#008481]" /> Stop
                                            </span>
                                        ) : stop.stop_type === 'Pass By' ? (
                                            <span className="italic text-gray-500 flex items-center gap-1">
                                                <Car size={14} /> Pass By
                                            </span>
                                        ) : (
                                            <span className="font-medium text-[#1a1a1a]">{stop.stop_type}</span>
                                        )}
                                        
                                        {stop.duration && <span>• {stop.duration}</span>}
                                        {stop.admission_included && (
                                            <span>• {stop.admission_included}</span>
                                        )}
                                    </div>

                                    <p className="text-[#1a1a1a] mt-1 text-[15px] leading-relaxed">
                                        {stop.description}
                                    </p>
                                </div>
                             ))}
                         </div>
                    </div>
                 </div>
             </section>

             <hr className="border-gray-200 my-6" />

             {/* Additional Info / Policies / FAQ */}
             <section>
                 <div 
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={() => toggleSection('additionalInfo')}
                >
                     <h2 className="text-2xl font-bold text-[#1a1a1a] group-hover:underline">Additional Info & FAQ</h2>
                     <ChevronDown className={`group-hover:text-gray-600 transition-transform duration-300 ${expandedSections.additionalInfo ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.additionalInfo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden space-y-8">
                        
                         {/* Additional Info List */}
                         <div>
                             <h3 className="font-bold text-[#1a1a1a] mb-3">Additional Information</h3>
                             <ul className="space-y-2 list-disc pl-5 text-[#1a1a1a]">
                                 {tour.additional_info && tour.additional_info.map((info, i) => (
                                     <li key={i}>{info}</li>
                                 ))}
                             </ul>
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
                                 <h3 className="font-bold text-[#1a1a1a] mb-3">Frequently Asked Questions</h3>
                                 <div className="space-y-4">
                                     {tour.faq.map((item, i) => (
                                         <div key={i} className="border-b last:border-0 border-gray-200 pb-4 last:pb-0">
                                             <p className="font-bold text-[#1a1a1a] mb-1">{item.question}</p>
                                             <p className="text-gray-700 text-sm">{item.answer}</p>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}
                     </div>
                 </div>
             </section>


             <hr className="border-gray-200 my-6" />

             {/* Tags */}
             <section>
                  <div className="relative mb-6 group/tags">
                     <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar items-center">
                         <button className="px-5 py-2 rounded-full border border-[#1a1a1a] bg-white text-[#1a1a1a] font-bold whitespace-nowrap hover:bg-gray-50">
                             All
                         </button>
                         {tour.tags && tour.tags.map((tag, i) => (
                             <button key={i} className="px-4 py-2 rounded-full bg-[#dff7eb] text-[#1a1a1a] font-medium whitespace-nowrap flex items-center gap-2 hover:bg-[#cbf2e0] transition-colors">
                                 <Check size={14} className="text-[#1a1a1a]" strokeWidth={2} />
                                 {tag}
                             </button>
                         ))}
                     </div>
                  </div>
             </section>

             <hr className="border-gray-200 my-6" />

             {/* You Might Also Like */}
             <section>
                 <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">You might also like...</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
                <BookingWidget tour={tour} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}