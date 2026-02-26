import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Activity from '@/models/Activity';
import { getImageUrl } from '@/utils/imageUrl';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ActivitiesPage() {
  await dbConnect();
  const activities = await Activity.find({}).sort({ title: 1 }).lean();

  return (
    <main className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-uber-move">All Activities</h1>
          <div className="w-24 h-1 bg-[#00694B] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Explore all the amazing experiences Roatan has to offer.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activities.map((activity) => (
            <Link key={activity._id} href={`/activities/${activity.slug}`} className="group relative rounded-4xl overflow-hidden aspect-[4/4.5] shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full h-full">
                 <img 
                    src={getImageUrl(activity.image)} 
                    alt={activity.image_alt || activity.title} 
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
              </div>
            </Link>
          ))}
        </div>
        
        {activities.length === 0 && (
            <div className="text-center text-gray-500 py-12">
                <p>No activities found. Please check back later.</p>
            </div>
        )}
      </div>
    </main>
  );
}

