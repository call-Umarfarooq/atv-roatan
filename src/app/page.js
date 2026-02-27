import Image from "next/image";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import Category from "@/models/Category";
import HomeClient from "@/components/HomeClient";
import FeatureHighlights from "@/components/FeatureHighlights";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThingsToDo from "@/components/ThingsToDo";
import mongoose from "mongoose";
import "@/models/Activity"; // Ensure model is registered
import ReviewLinks from "@/components/ReviewLinks";
import ReviewsWidget from "@/components/ReviewsWidget";
import StaggeredTextReveal from "@/components/StaggeredTextReveal";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';


export const metadata = {
  // General & SEO
  title: "ATV Roatan – Jungle Buggy & Island Tours in Honduras",
  description: "Roatan shore excursions, ATV buggy tours, family friendly Roatan tours",
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
  authors: [{ name: "Roatan ATV Buggy and Golf Cart Adventure Tours", url: "https://roatanatvbuggytours.com" }],

  // Indexing & Canonical URL
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://roatanatvbuggytours.com/tours",
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
    url: '/',
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

export default async function Home() {
  await dbConnect();

  const tours = await Tour.find({}).populate('categories').populate('activities').sort({ createdAt: -1 }).lean();
  const categories = await Category.find({}).sort({ name: 1 }).lean();

  // Serialization to simple objects
  const serializedTours = JSON.parse(JSON.stringify(tours));
  const serializedCategories = JSON.parse(JSON.stringify(categories));
console.log(tours);
  /* Fetch Activities */
  const activities = await mongoose.models.Activity.find({}).sort({ title: 1 }).lean();
  const serializedActivities = JSON.parse(JSON.stringify(activities));

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[420px]">
        <Image
          src="/images/hero.png"
          alt="Roatan ATV Adventure Tours"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* Top Label */}
            <span className="block text-white/90 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 md:mb-5 drop-shadow-md">
              Operated By Roatan ATV Buggy Tours
            </span>
            
            {/* Main Title */}
            <StaggeredTextReveal
              el="h1"
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[60px] leading-[1.1] font-uber-move font-bold tracking-tight mb-6 md:mb-6 drop-shadow-lg"
              text="Roatan Shore Excursions"
            />
            
            {/* Activities Pill Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-white/90 text-xs sm:text-sm md:text-base font-medium tracking-wide bg-gradient-to-r from-transparent via-black/30 to-transparent px-6 sm:px-10 py-2 sm:py-3 rounded-full backdrop-blur-[2px] border border-white/10 shadow-xl w-fit">
              <span>ATV</span>
              <span className="text-[#4ade80] opacity-80">•</span>
              <span>Buggy</span>
              <span className="text-[#4ade80] opacity-80">•</span>
              <span>Wildlife</span>
              <span className="text-[#4ade80] opacity-80">•</span>
              <span>Beach</span>
              <span className="text-[#4ade80] opacity-80">•</span>
              <span>Ziplines</span>
            </div>

          </div>
        </div>
      </section>
      <FeatureHighlights />
      {/* Client Component for Filtering */}
      <HomeClient initialTours={serializedTours} categories={serializedCategories} />
      
      <WhyChooseUs />

      <ThingsToDo activities={serializedActivities} />
      
      <ReviewsWidget />
      <ReviewLinks />
    </main>
  );
}

