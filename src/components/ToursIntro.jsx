"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ToursIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <div className="max-w-4xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 text-center">
            
            <div className="prose max-w-none text-gray-700">
                <div className={`text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-medium md:!line-clamp-none ${isExpanded ? '' : 'line-clamp-3'}`}>
                  Discover the beauty of Roatan with our premier ATV buggy and golf cart tours. Explore pristine beaches, lush jungles, and vibrant local culture with our expert guides. Whether you're seeking adrenaline-pumping off-road trails, a relaxing scenic drive, or a combination of island activities, we have the perfect adventure for you.
                </div>
                
                {/* Mobile only show more button */}
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="md:hidden text-[#00694B] font-bold text-sm mb-4 inline-block hover:underline"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>

                <p className="text-sm md:text-base text-gray-500">
                  Browse our full list of excursions below and use the "Sort" feature to find exactly what you're looking for.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center border-t border-gray-100 pt-6">
                <Link 
                    href="/contact"
                    className="px-8 py-3 bg-[#00694B] text-white rounded-full font-bold text-center hover:bg-[#005a3c] transition-colors shadow-lg"
                >
                    Contact for Group Booking
                </Link>
                 <Link 
                    href="/"
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full font-bold text-center hover:bg-gray-200 transition-colors"
                >
                    Back to Home
                </Link>
            </div>

        </div>
      </div>
  );
}
