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
import FloatingElements from "@/components/FloatingElements";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';


export const metadata = {
  // General & SEO
  title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
  description: "ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.",
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
  authors: [{ name: "Roatan ATV Buggy and Golf Cart Adventure Tours", url: "https://atvroatan.com" }],

  // Indexing & Canonical URL
  robots: {
    index: true,
    follow: true,
  },

  

  metadataBase: new URL('https://atvroatan.com'),

  // Favicon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  // Open Graph (for Facebook, Discord, etc.)
  openGraph: {
    type: 'website',
    url: '/',
    title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
    description: 'ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.',
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
    title: "Roatan Shore Excursions & Honduras Tours | ATV Roatan",
    description: 'ATV Roatan offers the best Roatan shore excursions and Honduras tours. Book a local tour guide for buggy, adventures & cruise excursions luxury experience.',
    images: ['/assets/Banner.png'],
  },
};

export default async function Home() {
  let serializedTours = [];
  let serializedCategories = [];
  let serializedActivities = [];

  try {
    await dbConnect();

    const [toursRaw, categoriesRaw, activitiesRaw] = await Promise.all([
      Tour.find({ status: { $in: ['approved', 'active', null, undefined] } }).lean(),
      Category.find({}).lean(),
      mongoose.models.Activity ? mongoose.models.Activity.find({}).lean() : Promise.resolve([]),
    ]);

    serializedTours = JSON.parse(JSON.stringify(toursRaw));
    serializedCategories = JSON.parse(JSON.stringify(categoriesRaw)).filter(c => c.show_on_home !== false);
    serializedActivities = JSON.parse(JSON.stringify(activitiesRaw));
  } catch (err) {
    console.error('Home page DB error:', err.message);
  }

  return (
    <main className="bg-white ">
      {/* Hero Section */}
      <section className="relative  w-full h-[45vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[420px]">
        <video
          src="/images/atv-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-fill object-top"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* Top Label */}
            <span className="block text-white/90 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3 md:mb-5 drop-shadow-md">
            Operated By Roatan ATV Buggy and Golf Cart Adventure Tours
            </span>
            
            {/* Main Title */}
            <StaggeredTextReveal
              el="h1"
            className="text-white h11 text-4xl sm:text-5xl md:text-6xl lg:text-[60px] leading-[1.1] lg:leading-[42px] font-[500] tracking-[0.2px] mb-6 lg:mb-0 drop-shadow-lg"

              text="Roatan Shore Excursions and Private Tours"
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

            {/* CTA Buttons */}
            <div className="flex mb-8 sm:mb-0 flex-wrap items-center justify-center gap-1 sm:gap-3 mt-4 sm:mt-5">
              <a
                href="/category/build-your-own-roatan-private-tour"
                className="flex items-center gap-2 px-5 py-1 sm:py-2.5 rounded-full  text-[10px] sm:text-sm sm:font-bold text-white bg-[#00694B] hover:bg-[#005a3c] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Cruiseship Passenger
              </a>
              <a
                href="/plan"
                className="flex items-center gap-2 px-5 py-1 sm:py-2.5 rounded-full text-[10px] sm:text-sm sm:font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
              Long Stay in Roatan
              </a>
            </div>

          </div>
        </div>
      </section>
      <FeatureHighlights />
      {/* Client Component for Filtering */}
      <div className="relative w-full overflow-hidden">
        <FloatingElements />
        <div className="relative z-10">
          <HomeClient initialTours={serializedTours} categories={serializedCategories} />
        </div>
      </div>
      
      <WhyChooseUs />
      <ThingsToDo activities={serializedActivities} />

      <ReviewsWidget />
      <ReviewLinks />
    </main>
  );
}

