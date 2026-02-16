"use client";
import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from '@/components/TourCard';

const HomeClient = ({ initialTours, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const carouselRef = useRef();

  const filteredTours = useMemo(() => {
    return selectedCategory === 'All' 
      ? initialTours 
      : initialTours.filter(tour => tour.category === selectedCategory || tour.category?._id === selectedCategory);
  }, [selectedCategory, initialTours]);

  return (
    <div>
      {/* Category Filter */}
       <section className="bg-white ">
         <div className="max-w-7xl mx-auto px-4">
           
           {/* Section Heading */}
           <div className="text-center mb-8">
             <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
               Choose Your Adventure
             </h2>
             <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
               Explore the hidden gems of Roatan with our expertly guided tours. From adrenaline-pumping rides to relaxing wildlife encounters.
             </p>
           </div>

           {/* Filter Buttons */}
           <div className="flex justify-center overflow-x-auto no-scrollbar pb-2">
             <div className="flex gap-3 min-w-max px-2">
               <button 
                 onClick={() => setSelectedCategory('All')}
                 className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
                   selectedCategory === 'All' 
                     ? 'bg-[#15531B] text-white shadow-md' 
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                 }`}
               >
                 All
               </button>
               {categories.map((category) => (
                 <button 
                   key={category._id}
                   onClick={() => setSelectedCategory(category._id)}
                   className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
                     selectedCategory === category._id 
                       ? 'bg-[#15531B] text-white shadow-md' 
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                   }`}
                 >
                   {category.name}
                 </button>
               ))}
             </div>
           </div>
         </div>
       </section>

       {/* Tours Carousel */}
       <section className="max-w-7xl mx-auto px-4 py-12 relative group">
          {filteredTours.length > 0 ? (
            <div className="relative">
                {/* Left Arrow */}
                <button 
                    onClick={() => carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' })}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button 
                    onClick={() => carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' })}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Scroll Container */}
                <div 
                    ref={carouselRef}
                    className="flex gap-6 overflow-x-auto pb-8 -mb-8 snap-x snap-mandatory scrollbar-hide px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {filteredTours.map((tour) => (
                        <div key={tour._id} className="min-w-[300px] sm:min-w-[300px] snap-start">
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
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No tours found in this category.</p>
            </div>
          )}
       </section>
       </div>
  );
};

export default HomeClient;
