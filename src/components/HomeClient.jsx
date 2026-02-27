"use client";
import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from '@/components/TourCard';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const HomeClient = ({ initialTours, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const carouselRef = useRef();

  const filteredTours = useMemo(() => {
    return selectedCategory === 'All'
      ? initialTours
      : initialTours.filter(tour => {
          const tourCategories = tour.categories || [];
          const oldCategory = tour.category;
          const hasCategory = tourCategories.some(c => (typeof c === 'string' ? c : c._id) === selectedCategory);
          const matchesOld = oldCategory && (typeof oldCategory === 'string' ? oldCategory : oldCategory._id) === selectedCategory;
          return hasCategory || matchesOld;
        });
  }, [selectedCategory, initialTours]);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    // Use card width (~85vw on mobile, 320px on desktop)
    const amount = window.innerWidth < 640 ? window.innerWidth * 0.82 : 340;
    carouselRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ── Category Filter Section ── */}
      <section className="bg-white pt-6 pb-4 md:pt-10 md:pb-6">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section Heading */}
          <div className="text-center mb-5 md:mb-8">
            <StaggeredTextReveal
              el="h2"
              className="text-2xl sm:text-3xl md:text-4xl font-uber-move font-bold text-[#1a1a1a] mb-2 md:mb-4"
              text="Choose Your Adventure"
            />

            {/* Descriptions */}
            <div className="relative min-h-10 md:min-h-12 max-w-2xl mx-auto">
              <p className={`text-gray-500 text-sm md:text-lg leading-relaxed transition-all duration-300 ${
                selectedCategory === 'All' ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 -z-10 pointer-events-none'
              }`}>
                Explore the hidden gems of Roatan with our expertly guided tours. From adrenaline-pumping rides to relaxing wildlife encounters.
              </p>
              {categories.map((category) => (
                <p
                  key={`desc-${category._id}`}
                  className={`text-gray-500 text-sm md:text-lg leading-relaxed transition-all duration-300 ${
                    selectedCategory === category._id ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 -z-10 pointer-events-none'
                  }`}
                >
                  {category.description || `Explore our ${category.name} collection and discover the best of Roatan.`}
                </p>
              ))}
            </div>
          </div>

          {/* Filter Pills — horizontal scroll on mobile */}
          <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar pb-1">
            <div className="flex gap-2 min-w-max px-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 sm:px-6 py-1.5 sm:py-2.5 text-sm sm:text-base rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'bg-[#00694B] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 sm:px-6 py-1.5 sm:py-2.5 text-sm sm:text-base rounded-full font-bold transition-all whitespace-nowrap ${
                    selectedCategory === category._id
                      ? 'bg-[#00694B] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tours Carousel ── */}
      <section className="max-w-7xl mx-auto px-0 sm:px-4 py-6 md:py-10 relative">
        {filteredTours.length > 0 ? (
          <div className="relative">

            {/* Arrows — hidden on mobile, visible md+ */}
            <button
              onClick={() => scroll('prev')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 bg-white text-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll('next')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 bg-white text-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight size={22} />
            </button>

            {/* Scroll Container */}
            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto py-6 -my-6 snap-x snap-mandatory px-4 sm:px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredTours.map((tour) => (
                <div
                  key={tour._id}
                  // 82vw on mobile so next card peeks through — 300px fixed on sm+
                  className="min-w-[82vw] sm:min-w-[300px] max-w-[82vw] sm:max-w-none snap-start flex-shrink-0"
                >
                  <TourCard
                    slug={tour.slug}
                    image={tour.image_url}
                    gallery={tour.gallery}
                    location={tour.location_text || 'Roatan, Honduras'}
                    title={tour.title}
                    rating={tour.marketing_badges?.stars || '0'}
                    reviews={tour.marketing_badges?.reviews_text?.replace(/\D/g, '') || '0'}
                    price={tour.adultPrice || tour.base_price || '0'}
                    duration={tour.duration}
                    description={tour.overview || tour.description}
                    additionalInfo={tour.additional_info}
                    cutoff_price={tour.cutoff_price}
                  />
                </div>
              ))}
            </div>

            {/* Mobile swipe hint — show on small screens only */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-4 px-4">
              {filteredTours.slice(0, Math.min(filteredTours.length, 6)).map((_, i) => (
                <span key={i} className={`block rounded-full bg-[#00694B] ${i === 0 ? 'w-5 h-1.5' : 'w-1.5 h-1.5 opacity-25'}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-base">No tours found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeClient;
