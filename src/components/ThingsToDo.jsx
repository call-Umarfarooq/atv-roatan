"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

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
    }, 2500);
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
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      let nextScrollLeft;
      if (direction === 'left') {
        nextScrollLeft = container.scrollLeft - scrollAmount;
      } else {
        nextScrollLeft = container.scrollLeft >= maxScrollLeft - 10 ? 0 : container.scrollLeft + scrollAmount;
      }

      container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
    }
  };

  const handleArrowClick = (direction) => {
    stopAutoScroll();
    scroll(direction);
    // Resume auto-scroll after 5s of inactivity
    setTimeout(startAutoScroll, 5000);
  };

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6 md:mb-12 text-center">
        <StaggeredTextReveal
          el="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3"
          text="Things to Do in Roatan"
        />
        <div className="w-14 md:w-20 h-1 bg-[#00694B] mx-auto rounded-full" />
        <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl mx-auto">
          Discover the best activities and experiences Roatan has to offer, curated just for you.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {/* Left Arrow — always visible on mobile (not hover-only) */}
        <button
          onClick={() => handleArrowClick('left')}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-[#00694B] hover:bg-[#00694B] hover:text-white transition-all duration-300
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100
            [.group:hover_&]:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory px-4 sm:px-8 w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activities.map((activity) => (
            <Link
              key={activity._id}
              href={`/activities/${activity.slug}`}
              className="flex-none w-[78vw] sm:w-[calc(50vw-44px)] md:w-[calc(33.333vw-37px)] lg:w-[calc(25vw-34px)] snap-center sm:snap-start group/card relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] shadow-md cursor-pointer transition-transform hover:-translate-y-1 duration-300"
            >
              <img
                src={getImageUrl(activity.image)}
                alt={activity.title}
                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-8">
                <h3 className="text-white font-bold text-lg sm:text-2xl leading-tight mb-0 group-hover/card:mb-2 transition-all duration-300">
                  {activity.title}
                </h3>
                {/* Description — on mobile always slightly visible, on desktop reveals on hover */}
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-150 mt-1">
                      {activity.description || "Explore this amazing experience in Roatan with the best local guides."}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleArrowClick('right')}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-[#00694B] hover:bg-[#00694B] hover:text-white transition-all duration-300
            opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* View All */}
      <div className="flex justify-center mt-5 md:mt-8 px-4">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#00694B] text-white rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#005a3c]"
        >
          View All Activities
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default ThingsToDo;
