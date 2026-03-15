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
  pp,
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
        <h3 className="font-bold text-[12px] leading-[16px] text-gray-900 my-[10px]">
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
          <div className={` flex  hover:bg-[#00694B] hover:text-white items-center text-[#00694B] text-center  text-[10px] sm:text-xs font-bold ${pp? "px-1 py-1 gap-1" : "px-2.5 py-1.5 gap-2 "} rounded-full w-full shadow-md border border-[#00694B] leading-tight mb-0.5 relative overflow-hidden`}>
            Best Price Guarantee:
           110% refund
         </div>
         {/* "of the difference" right-aligned below banner */}
         <div className=" capitalize text-[12px] text-gray-600 text-right  mb-1">of the difference</div>

        <div className="grow"></div>

        {/* Footer: Pricing & Button */}
        <div className="mt-1 flex flex-col gap-2 relative">
            
            <div className="flex items-end justify-between gap-2 w-full">
                <div className="flex flex-col min-w-0">
                    
                    <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="font-bold text-[12px] leading-[16px]
      text-gray-900 my-[10px]">From {currency}{price}</span>
                        {cutoff_price && (
                            <span className="text-gray-400 text-xs sm:text-sm line-through font-medium truncate">
                                {currency}{cutoff_price}
                            </span>
                        )}
                    </div>
                </div>
                
                <Link href={`/product/${slug}`} className="bg-[#00694B] shrink-0 whitespace-nowrap cursor-pointer hover:bg-[#1f4232] text-white px-3 sm:px-3 py-1 rounded-[32px] transition-all text-[14px] flex items-center gap-1.5 shadow-md">
                    <svg width="20" height="20" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                    BOOK NOW 
                </Link>
            </div>
            {/* Bottom amber trust text */}
            <div className="text-gray-400 text-[10px] flex justify-center capitalize  mt-1">
              Book with Confidence&nbsp;·&nbsp;100% Free Cancellation
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TourCard;

