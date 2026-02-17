"use client";
import React, { useState, useMemo } from 'react';
import TourCard from './TourCard';

export default function PopularTours({ initialTours }) {
  const [sortBy, setSortBy] = useState('default');

  const sortedTours = useMemo(() => {
    let sorted = [...initialTours];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.base_price - b.base_price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.base_price - a.base_price);
    }
    return sorted;
  }, [initialTours, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Popular Tours</h2>
        
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 hover:border-[#15531B] px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#15531B] focus:border-transparent text-gray-700 cursor-pointer text-sm font-medium transition-colors"
          >
            <option value="default">Sort by: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTours.map(tour => (
          <div key={tour._id} className="h-full">
            <TourCard 
                title={tour.title}
                image={tour.image_url}
                price={tour.base_price}
                duration={tour.duration}
                slug={tour.slug}
                location={tour.marketing_badges?.location_text}
                rating={tour.marketing_badges?.stars}
                reviews={tour.marketing_badges?.reviews_text?.replace(/\D/g, '') || 0}
                cutoff_price={tour.cutoff_price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
