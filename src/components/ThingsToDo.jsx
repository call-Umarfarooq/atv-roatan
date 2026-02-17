"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ThingsToDo = ({ activities }) => {
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  React.useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollIntervalRef.current = setInterval(() => {
      scroll('right');
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  if (!activities || activities.length === 0) return null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 300; 
      const gap = 24; 
      const scrollAmount = cardWidth + gap;
      
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      let nextScrollLeft;
      if (direction === 'left') {
          nextScrollLeft = container.scrollLeft - scrollAmount;
      } else {
          // If at end, loop back to start
          if (container.scrollLeft >= maxScrollLeft - 10) { // buffer
              nextScrollLeft = 0;
          } else {
              nextScrollLeft = container.scrollLeft + scrollAmount;
          }
      }

      container.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      
        {/* Header - Centered */}
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Things to Do in Roatan</h2>
            <div className="w-20 h-1 bg-[#15531B] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover the best activities and experiences Roatan has to offer, curated just for you.</p>
        </div>

        {/* Carousel Container - Full Width */}
        <div 
            className="relative group w-full"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
        >
            {/* Left Button */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-[#15531B] hover:bg-[#15531B] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Activities Carousel */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-8 w-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {activities.map((activity) => (
                <Link 
                    key={activity._id} 
                    href={`/activities/${activity.slug}`} 
                    className="flex-none w-[85vw] sm:w-[400px] snap-center sm:snap-start group/card relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer transition-transform hover:-translate-y-1 duration-300"
                >
                  <img 
                    src={getImageUrl(activity.image)} 
                    alt={activity.title} 
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-2xl mb-2 leading-tight translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                          {activity.title}
                      </h3>
                      <p className="text-white/90 text-sm font-medium line-clamp-3 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 delay-75">
                        {activity.description || "Explore this amazing experience in Roatan with the best local guides."}
                      </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Button */}
            <button 
                onClick={() => scroll('right')}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-[#15531B] hover:bg-[#15531B] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
            <Link href="/activities" className="inline-flex items-center gap-2 px-8 py-3 bg-[#15531B] text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#006f6c]">
                View All Activities
                <ArrowRight size={20} />
            </Link>
        </div>
    </section>
  );
};

export default ThingsToDo;
