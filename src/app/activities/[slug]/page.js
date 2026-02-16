import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ActivityDescription from '@/components/ActivityDescription';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Activity from '@/models/Activity'; 
import Tour from '@/models/Tour';
import TourCard from '@/components/TourCard';
import { getImageUrl } from '@/utils/imageUrl';
import { ArrowLeft, MapPin, Clock, CheckCircle } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function ActivityDetailsPage({ params }) {
  const { slug } = await params;
  await dbConnect();

  const activity = await Activity.findOne({ slug }).lean();

  if (!activity) {
    notFound();
  }

  // Fetch tours related to this activity
  const tours = await Tour.find({ activity: activity._id }).lean();

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src={getImageUrl(activity.image)}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-serif">
            {activity.title}
          </h1>
          <div className="w-24 h-1 bg-[#15531B] rounded-full"></div>
        </div>
        
        {/* Back Button */}
        <Link 
            href="/activities"
            className="absolute top-8 left-8 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all"
        >
            <ArrowLeft size={24} />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            
            <ActivityDescription description={activity.description} />

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-100 pt-6">
                <Link 
                    href="/contact"
                    className="px-8 py-3 bg-[#15531B] text-white rounded-full font-bold text-center hover:bg-[#006f6c] transition-colors shadow-lg"
                >
                    Contact for Booking
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

      {/* Related Tours Section */}
      {tours.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Popular Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map(tour => (
                    <div key={tour._id} className="h-full">
                        <TourCard 
                            title={tour.title}
                            image={tour.image_url}
                            price={tour.base_price}
                            duration={tour.duration}
                            slug={tour.slug}
                            location={tour.marketing_badges?.location_text}
                            rating={tour.marketing_badges?.stars}
                            reviews={tour.marketing_badges?.reviews_text?.replace(/\D/g, '') || 0}
                            cutoff_price={tour.cutoff_price}
                        />
                    </div>
                ))}
            </div>
        </div>
      )}
    </main>
  );
}
