import React from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';
import { ArrowRight } from 'lucide-react';

const ThingsToDo = ({ activities }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">Things to Do in Roatan</h2>
            <div className="w-20 h-1 bg-[#15531B] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover the best activities and experiences Roatan has to offer, curated just for you.</p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {activities.map((activity) => (
            <Link key={activity._id} href={`/activities/${activity.slug}`} className="group relative rounded-4xl overflow-hidden aspect-[4/4.5] shadow-lg cursor-pointer">
              <img 
                src={getImageUrl(activity.image)} 
                alt={activity.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-2xl mb-1 leading-tight">
                      {activity.title}
                  </h3>
                  <p className="text-white/80 text-sm font-medium line-clamp-2">
                    {activity.description || "Explore this amazing experience"}
                  </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
            <Link href="/activities" className="inline-flex items-center gap-2 px-8 py-3 bg-[#15531B] text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#006f6c]">
                View All Activities
                <ArrowRight size={20} />
            </Link>
        </div>

      </div>
    </section>
  );
};

export default ThingsToDo;
