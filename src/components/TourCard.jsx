import React from 'react';
import { Heart, Star, Globe } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

const TourCard = ({ 
  image, 
  location, 
  title, 
  rating, 
  reviews, 
  price, 
  currency = "CA$" 
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getImageUrl(image)} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10">
          <Heart size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
          <Globe size={14} />
          <span>{location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
           <Star size={14} className="fill-[#00aa6c] text-[#00aa6c]" />
           <span className="text-[#1a1a1a] text-sm font-bold">{rating}</span>
           <span className="text-gray-500 text-sm">({reviews})</span>
        </div>

        {/* Title */}
        <h3 className="text-[#1a1a1a] font-bold text-lg leading-tight mb-4 group-hover:underline">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-500">from</span>
          <span className="text-[#1a1a1a] font-bold text-lg">{currency}{price}</span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
