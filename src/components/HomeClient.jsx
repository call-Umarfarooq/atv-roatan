"use client";
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from '@/components/TourCard';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const HomeClient = ({ initialTours, categories, moreCategories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const carouselRef = useRef();

  const filteredTours = useMemo(() => {
    if (selectedCategory === 'All') {
      return [...initialTours].sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return 0;
      });
    }
    return initialTours.filter(tour => {
      const tourCategories = tour.categories || [];
      const oldCategory = tour.category;
      const hasCategory = tourCategories.some(c => (typeof c === 'string' ? c : c._id) === selectedCategory);
      const matchesOld = oldCategory && (typeof oldCategory === 'string' ? oldCategory : oldCategory._id) === selectedCategory;
      return hasCategory || matchesOld;
    });
  }, [selectedCategory, initialTours]);

  const getCardWidth = () =>
    window.innerWidth < 640 ? window.innerWidth * 0.85 + 16 : 340;

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = getCardWidth();
    carouselRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = getCardWidth();
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const handleCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const cardWidth = getCardWidth();
    const index = Math.round(carouselRef.current.scrollLeft / cardWidth);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleCarouselScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleCarouselScroll);
  }, [handleCarouselScroll]);

  // Reset active index when filtered tours change
  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [filteredTours]);

  return (
    <div>
      {/* ── Category Filter Section ── */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto">
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
              {[...categories, ...moreCategories].map((category) => (
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

          {/* Filter Pills — wrap on mobile */}
          <div className="flex justify-center flex-wrap gap-2 px-1 pb-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 sm:px-6 py-1 sm:py-1.5 text-[13px] sm:text-sm rounded-full font-semibold tracking-tight transition-all whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'bg-[#80E142] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 sm:px-6 py-1 sm:py-1.5 text-[13px] sm:text-sm rounded-full font-semibold tracking-tight transition-all whitespace-nowrap ${
                    selectedCategory === category._id
                      ? 'bg-[#80E142] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
              {moreCategories.length > 0 && (
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className={`px-4 sm:px-6 py-1 sm:py-1.5 text-[13px] sm:text-sm rounded-full font-semibold tracking-tight transition-all whitespace-nowrap border flex items-center gap-1 ${
                      showMore || moreCategories.some(c => c._id === selectedCategory)
                        ? 'bg-gray-100 border-gray-300 text-gray-800'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {moreCategories.some(c => c._id === selectedCategory) ? 'More (Active)' : 'More'}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMore && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)}></div>
                      <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-max min-w-[200px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 flex flex-col items-stretch overflow-hidden">
                        {moreCategories.map((category) => (
                          <button
                            key={category._id}
                            onClick={() => {
                              setSelectedCategory(category._id);
                              setShowMore(false);
                            }}
                            className={`px-5 py-3 text-sm sm:text-base text-left tracking-tighter transition-colors whitespace-nowrap ${
                              selectedCategory === category._id
                                ? 'bg-[#00694B]/10 text-[#00694B] font-semibold border-l-4 border-[#00694B]'
                                : 'font-medium text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
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
              className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 bg-white text-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll('next')}
              className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 bg-white text-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all focus:outline-none"
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
                  className="w-[85vw] max-w-[320px] sm:w-[300px] sm:max-w-none snap-start flex-shrink-0"
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

            {/* Mobile dots — clickable, show on small screens only */}
            <div className="flex sm:hidden justify-center gap-1.5 mt-4 px-4">
              {filteredTours.slice(0, Math.min(filteredTours.length, 6)).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={`block rounded-full bg-[#00694B] transition-all duration-300 ${
                    i === activeIndex ? 'w-5 h-1.5 opacity-100' : 'w-1.5 h-1.5 opacity-25'
                  }`}
                />
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
