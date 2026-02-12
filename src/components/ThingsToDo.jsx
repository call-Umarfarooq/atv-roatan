import React from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';

const ThingsToDo = ({ activities }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Things to Do in Roatan</h2>
            <div className="w-20 h-1 bg-[#008481] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover the best activities and experiences Roatan has to offer, curated just for you.</p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <Link key={activity._id} href={`/activities/${activity.slug}`} className="group relative rounded-xl overflow-hidden aspect-4/5 shadow-md hover:shadow-xl transition-all cursor-pointer">
              <img 
                src={getImageUrl(activity.image)} 
                alt={activity.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                      <h3 className="text-white font-bold text-xl md:text-2xl leading-tight group-hover:underline decoration-2 underline-offset-4">
                          {activity.title}
                      </h3>
                  </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ThingsToDo;
