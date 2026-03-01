"use client";
import React, { useState } from 'react';
import { Heart, Star, MapPin, Clock, ChevronLeft, ChevronRight, ShieldCheck, Leaf, Users, Check } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';
import Link from 'next/link';

const TourCard = ({ 
  image, 
  location, 
  title, 
  rating, 
  reviews, 
  price, 
  duration,
  description,
  currency = "$" ,
  gallery,
  additionalInfo,
  cutoff_price,
  slug
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine main image and gallery
  const images = [image, ...(gallery || [])].filter(Boolean);
  const displayImage = images[currentImageIndex];

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length > 1) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <Link href={slug ? `/product/${slug}` : '#'} className="block h-full"> 
    <div 
        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={getImageUrl(displayImage)} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Top Left Badge */}
        <div className="absolute top-2 left-2 z-6 w-10 w-16">
          <img src="/images/Backto.png" alt="Back to Ship Guarantee" className="w-full h-auto drop-shadow-md" />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
            <>
                <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <ChevronLeft size={16} className="text-gray-800" />
                </button>
                <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <ChevronRight size={16} className="text-gray-800" />
                </button>
            </>
        )}
        {/* Wishlist Button */}
        <button 
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add wishlist logic here later
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10"
        >
          <Heart size={18} className="text-gray-700" />
        </button>


      </div>
    
      {/* Content Container */}
      <div className="p-3 flex flex-col grow">
        {/* Title */}
        <h3 className="text-[#1a1a1a] font-bold text-xl leading-tight mb-2 group-hover:underline line-clamp-2">
          {title}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
           <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} className={`${i < Math.round(Number(rating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
               ))}
           </div>
           <span className="text-gray-500 text-sm ml-2">( {reviews} Reviews )</span>
        </div> 
         {/* Best Price Guarantee */}
         <div className="bg-gradient-to-r from-[#115e3b] to-[#468262] flex justify-center items-center gap-2 sm:gap-2.5 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-2 py-1.5 sm:py-1 rounded-lg sm:rounded-full w-fit max-w-full shadow-md hover:shadow-lg transition-shadow border border-[#468262]/30 leading-tight mb-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none rounded-lg sm:rounded-full" />
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full w-7 h-7 flex items-center justify-center shrink-0 border-[1.5px] border-white/90 shadow-sm relative z-10">
                <div className="text-white text-[6px] font-black text-center leading-[1.1] tracking-wider">
                    BEST<br/>PRICE
                </div>
            </div> 
            
            <div className="flex flex-wrap items-baseline gap-1 relative z-10 drop-shadow-sm pb-[1px]">
                  <span className="text-emerald-50 tracking-wide">Best Price Guarantee:</span> 
                  <span className="whitespace-normal text-[#A3E635]">110% refund</span>
            </div>
         </div>

        <div className="grow"></div>

        {/* Footer: Pricing & Button */}
        <div className="mt-1 flex flex-col gap-2 relative">
            
            <div className="flex items-end justify-between gap-2 w-full">
                <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium leading-none mb-0.5 ml-0.5">from</span>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-[#153b2d] font-black text-[26px] sm:text-[32px] leading-none">{currency}{price}</span>
                        {cutoff_price && (
                            <span className="text-gray-400 text-xs sm:text-sm line-through font-medium truncate">
                                {currency}{cutoff_price}
                            </span>
                        )}
                    </div>
                </div>
                
                <Link href={`/product/${slug}`} className="bg-[#00694B] shrink-0 whitespace-nowrap cursor-pointer hover:bg-[#1f4232] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md">
                    <svg width="20" height="20" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                    BOOK NOW 
                </Link>
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TourCard;

