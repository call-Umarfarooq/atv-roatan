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
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-700 bg-blue-50/50 px-2 py-1.5 rounded-lg border border-blue-100">
            <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 border border-white shadow-sm">
                 <div className="text-white text-[6px] font-bold text-center leading-none">
                    BEST<br/>PRICE
                </div>
            </div>
            <span className="leading-tight font-medium">Best Price Guarantee: We'll refund 110% of the difference!</span>
        </div>

        {/* Back to Ship Guarantee */}
        <div className="flex items-center gap-2 mb-3 text-xs text-[#115e3b] bg-[#f1fcf4] px-2 py-1.5 rounded-lg border border-[#e9edea]">
            <ShieldCheck size={16} className="text-[#115e3b] shrink-0" />
            <span className="leading-tight font-bold">100% Back to Ship Guarantee</span>
        </div>

        <div className="grow"></div>

        {/* Footer: Duration & Button */}
        <div className="flex items-center justify-between mt-2">
       
        <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-medium leading-tight mb-0.5">from</span>
            <div className="flex items-baseline gap-1">
                {cutoff_price && (
                    <span className="text-gray-400 text-sm line-through decoration-gray-400 decoration-1">
                        {currency}{cutoff_price}
                    </span>
                )}
                <span className="text-[#1a1a1a] font-extrabold text-2xl leading-none">{currency}{price}</span>
            </div>
        </div>
           <Link href={`/product/${slug}`} className="bg-[#00694B] cursor-pointer hover:bg-[#1f4232] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
               Book Now 
           </Link>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TourCard;

