"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ToursIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <div className="max-w-4xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 text-center">
            
            <div className="prose max-w-none text-gray-700">
                <div
                  className={`sm:mb-4 md:mb-4 md:!line-clamp-none ${isExpanded ? '' : 'line-clamp-3'}`}
                  style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 400, letterSpacing: '0.05px', lineHeight: '24px' }}
                >
                  Discover the beauty of Roatan with our premier ATV buggy and golf cart tours. Explore pristine beaches, lush jungles, and vibrant local culture with our expert guides. Whether you're seeking adrenaline-pumping off-road trails, a relaxing scenic drive, or a combination of island activities, we have the perfect adventure for you.
                </div>
                
                {/* Mobile only show more button */}
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="md:hidden text-[#00694B] font-bold text-sm  inline-block hover:underline"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>

               
            </div>

            {/* Action Buttons */}
            <div className=" flex flex-col sm:flex-row gap-3 justify-center   pt-4">
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
