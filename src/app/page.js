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
import Link from "next/link";
import LiveBookingNotification from "@/components/LiveBookingNotification";

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
  let serializedMoreCategories = [];
  let serializedActivities = [];

  try {
    await dbConnect();

    const [toursRaw, categoriesRaw, activitiesRaw] = await Promise.all([
      Tour.find({ status: { $in: ['approved', 'active', null, undefined] } }).lean(),
      Category.find({}).lean(),
      mongoose.models.Activity ? mongoose.models.Activity.find({}).lean() : Promise.resolve([]),
    ]);

    serializedTours = JSON.parse(JSON.stringify(toursRaw));
    const allParsedCategories = JSON.parse(JSON.stringify(categoriesRaw));
    serializedCategories = allParsedCategories.filter(c => c.show_on_home !== false);
    serializedMoreCategories = allParsedCategories.filter(c => c.show_on_home === false);
    serializedActivities = JSON.parse(JSON.stringify(activitiesRaw));
  } catch (err) {
    console.error('Home page DB error:', err.message);
  }

  return (
    <main className="bg-white ">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[60vh] flex items-center justify-center pb-8">
        <video
          id="hero-bg-video"
          src="/images/atv-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <script dangerouslySetInnerHTML={{ __html: `document.getElementById('hero-bg-video').playbackRate = 0.6;` }} />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Text content */}
        <div className="relative z-10 w-full max-w-[68rem] mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-8 mt-4">
          
          {/* Top Label */}
          <span className="block text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]  drop-shadow-md">
            Operated By Roatan Eco-Adventures
          </span>

          {/* Main Title */}
          <StaggeredTextReveal
            el="h1"
            className="text-white  text-3xl sm:text-3xl md:text-4xl  leading-[1.1] lg:leading-[60px] font-[500] tracking-[0.2px] mb-3 lg:mb-0 drop-shadow-lg capitalize"
            text="Roatan's Most Fun Eco-Adventure on Wheels"
          />

          {/* Sub-headline */}
          <p className="text-white/90 text-sm md:text-lg leading-relaxed transition-all duration-300 opacity-100 relative z-10">
            Ride ATVs, buggies and golf carts through Roatan's jungle trails and ocean-view roads with small groups, local guides and flexible tour times.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 mt-2 w-full sm:w-auto">
            <a
              href="/plan"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-1.5 sm:py-1.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#00694B] hover:bg-[#005a3c] shadow-[0_0_20px_rgba(0,105,75,0.4)] hover:shadow-[0_0_25px_rgba(0,105,75,0.6)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-xl">🧭</span> Build Your Adventure
            </a>
            <a
              href="/tours"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-1.5 sm:py-1.5 rounded-full text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              View All Tours
            </a>
          </div>

          {/* Supporting Bullets */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90 text-sm sm:text-base font-semibold drop-shadow-md pb-8">
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> Free cruise-ship pickup</div>
            <span className="hidden md:block text-white/40">•</span>
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> ATV, buggy and golf cart options</div>
            <span className="hidden md:block text-white/40">•</span>
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> Photo-ready jungle &amp; beach stops</div>
          </div>
          
          {/* 3-Step Build Your Adventure Strip (above fold) */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-1 sm:mt-4 relative z-20 pb-8">
             <Link href="/plan" className="group flex flex-col items-center px-4 py-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏍️</div>
                <h3 className="text-white font-bold text-base mb-0.5">1. Choose your ride</h3>
                <p className="text-white/80 text-xs">ATV · Buggy · Golf Cart</p>
             </Link>
             <Link href="/plan" className="group flex flex-col items-center px-4 py-1 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🗺️</div>
                <h3 className="text-white font-bold text-base mb-0.5">2. Pick your route</h3>
                <p className="text-white/80 text-xs">Jungle · Beach · Combo</p>
             </Link>
             <Link href="/plan" className="group flex flex-col items-center px-4 py-1 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🕐</div>
                <h3 className="text-white font-bold text-base mb-0.5">3. Select time &amp; ship</h3>
                <p className="text-white/80 text-xs">Morning · Midday · Afternoon</p>
             </Link>
          </div>

        </div>
      </section>
      <FeatureHighlights />
      {/* Client Component for Filtering */}
      <div className="relative w-full overflow-hidden">
        <FloatingElements />
        <div className="relative z-10">
          <HomeClient initialTours={serializedTours} categories={serializedCategories} moreCategories={serializedMoreCategories} />
        </div>
      </div>

      <WhyChooseUs />
      <ThingsToDo activities={serializedActivities} />

      <ReviewsWidget />
      <ReviewLinks />
      <LiveBookingNotification />
    </main>
  );
}

