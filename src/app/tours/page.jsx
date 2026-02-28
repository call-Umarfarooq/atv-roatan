import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import PopularTours from '@/components/PopularTours';
import ToursIntro from '@/components/ToursIntro';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export const metadata = {
  // General & SEO
  title: "Roatan ATV Tours – Best Excursions & Adventures",
  description: "Discover top ATV tours in Roatan. Ride the beach and jungle trails with expert guides. Book your unforgettable adventure today!",
  applicationName: "ATV Roatan",
  keywords: [
"adventure tours",
"roatan adventure tours",
"adventure touring motorcycle",
"tours honduras",
"honduras tours",
"tours en roatan honduras",
"roatan honduras tours",
"tours en honduras",
"honduras tour guide",
"roatan excursions and tours",
"roatan excursions west bay tours",
"roatan excursions & tours",
"roatan tours excursions"
  ],
  generator: "Next.js",
  creator: "Roatan ATV Buggy and Golf Cart Adventure Tours",
  authors: [{ name: "Roatan ATV Buggy and Golf Cart Adventure Tours", url: "" }],

  // Indexing & Canonical URL
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/tours",
  },

  metadataBase: new URL('https://roatanatvbuggytours.com'),

  // Favicon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  // Open Graph (for Facebook, Discord, etc.)
  openGraph: {
    type: 'website',
    url: '/tours',
    title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
    description: 'Roatan shore excursions, ATV buggy tours, family friendly Roatan tours',
    siteName: 'ATV Roatan',
    images: [
      {
        url: '/assets/Banner.png',
      },
    ],
  },

  // Twitter Card (for X/Twitter)
  twitter: {
    card: 'summary_large_image',
    site: '@ATVRoatan',
    title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
    description: 'Roatan shore excursions, ATV buggy tours, family friendly Roatan tours',
    images: ['/assets/Banner.png'],
  },
};


export default async function AllToursPage() {
  await dbConnect();

  // Fetch all tours and lean them for the client
  const tours = await Tour.find({}).lean();

  return (
    <main className="bg-white min-h-screen pb-32 sm:pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[300px] md:h-[60vh] md:min-h-[400px]">
        <img
          src="/images/hero.png"
          alt="All Roatan Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20">
          <h1 className="text-white text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg font-uber-move">
            All Tours
          </h1>
          <div className="w-24 h-1 bg-[#00694B] rounded-full"></div>
        </div>
        
        {/* Back Button */}
        <Link 
            href="/"
            className="absolute top-4 left-4 md:top-8 md:left-8 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2.5 md:p-3 rounded-full text-white transition-all mt-16 md:mt-24"
        >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Link>
      </div>

      {/* Intro Description Box (Overlapping Hero) */}
      <ToursIntro />

      {/* Roatan All-Inclusive Information */}
      <div className="max-w-7xl mx-auto px-4 mt-10 text-left relative z-10">
        <div className="bg-[#f8faf9] border border-[#e9edea] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 space-y-4 lg:space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[#00694B]/30 text-[#00694B] font-semibold text-sm bg-[#00694B]/5">
                   Featured Passes
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">Roatan <span className="text-[#00694B] italic font-uber-move whitespace-nowrap">All-Inclusive</span></h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    Roatan offers several All-Inclusive day passes. The majority of these packages are located at resort properties on West Bay Beach, a 20-30 minutes scenic drive from the Port of Roatan and the Mahogany Bay Cruise Center.
                </p>
            </div>
            
            <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 w-full lg:max-w-lg space-y-3 md:space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Pickup</span>
                    <span className="text-[#1a1a1a] font-bold text-right text-sm md:text-base">Cruise Port or Resort</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Duration</span>
                    <span className="text-[#1a1a1a] font-bold text-sm md:text-base">3-6 hr</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Minimum Age</span>
                    <span className="text-[#1a1a1a] font-bold text-sm md:text-base">3+</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Activity Level</span>
                    <span className="text-[#1a1a1a] font-bold text-sm md:text-base">Easy</span>
                </div>
                <div className="pt-3 text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-[#00694B] uppercase">Included:</span> Roundtrip transportation, All-Inclusive Package (food & drink), Beach Day Pass, location amenities, and activities.
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-bold text-red-600 uppercase">Not Included:</span> See Packages
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

