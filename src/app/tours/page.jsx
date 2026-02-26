import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import PopularTours from '@/components/PopularTours';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "All Tours - Roatan ATV Buggy and Golf Cart Adventure Tours",
  description: "Explore our full selection of ATV buggy, golf cart tours, and excursions across Roatan.",
};

export default async function AllToursPage() {
  await dbConnect();

  // Fetch all tours and lean them for the client
  const tours = await Tour.find({}).lean();

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src="/images/hero.png"
          alt="All Roatan Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg font-uber-move">
            All Tours
          </h1>
          <div className="w-24 h-1 bg-[#00694B] rounded-full"></div>
        </div>
        
        {/* Back Button */}
        <Link 
            href="/"
            className="absolute top-8 left-8 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all mt-16 md:mt-24"
        >
            <ArrowLeft size={24} />
        </Link>
      </div>

      {/* Intro Description Box (Overlapping Hero) */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            
            <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed mb-6 font-medium">
                  Discover the beauty of Roatan with our premier ATV buggy and golf cart tours. Explore pristine beaches, lush jungles, and vibrant local culture with our expert guides. Whether you're seeking adrenaline-pumping off-road trails, a relaxing scenic drive, or a combination of island activities, we have the perfect adventure for you.
                </p>
                <p className="text-gray-500">
                  Browse our full list of excursions below and use the "Sort" feature to find exactly what you're looking for.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-100 pt-8">
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

      {/* Roatan All-Inclusive Information */}
      <div className="max-w-7xl mx-auto px-4 mt-10 text-left relative z-10">
        <div className="bg-[#f8faf9] border border-[#e9edea] rounded-3xl p-4 md:p-4 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[#00694B]/30 text-[#00694B] font-semibold text-sm bg-[#00694B]/5">
                   Featured Passes
                </div>
                <h2 className="text-4xl font-bold text-[#1a1a1a]">Roatan <span className="text-[#00694B] italic font-uber-move">All-Inclusive</span></h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    Roatan offers several All-Inclusive day passes. The majority of these packages are located at resort properties on West Bay Beach, a 20-30 minutes scenic drive from the Port of Roatan and the Mahogany Bay Cruise Center.
                </p>
            </div>
            
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full lg:max-w-lg space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Pickup</span>
                    <span className="text-[#1a1a1a] font-bold text-right">Cruise Port or Resort</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Duration</span>
                    <span className="text-[#1a1a1a] font-bold">3-6 hr</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Minimum Age</span>
                    <span className="text-[#1a1a1a] font-bold">3+</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Activity Level</span>
                    <span className="text-[#1a1a1a] font-bold">Easy</span>
                </div>
                <div className="pt-3 text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-[#00694B]">INCLUDED:</span> Roundtrip transportation, All-Inclusive Package (food & drink), Beach Day Pass, location amenities, and activities.
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-bold text-red-600">NOT Included:</span> See Packages
                </div>
            </div>
        </div>
      </div>

      {/* Grid of All Tours */}
      <div className="py-8">
        {tours && tours.length > 0 ? (
          <PopularTours initialTours={tours} />
        ) : (
          <div className="text-center text-gray-500 py-12">
            No tours available at the moment.
          </div>
        )}
      </div>

    </main>
  );
}

