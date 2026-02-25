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

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

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
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src="/images/hero.png"
          alt="Roatan ATV Adventure Tours"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-light tracking-wide mb-4 drop-shadow-md">
            Roatan Shore Excursions
          </h1>
          <span className="text-white/90 text-sm md:text-xl uppercase tracking-widest mb-2 font-medium">Operated By</span>
          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
            Roatan ATV Buggy and Golf Cart Adventure Tours
          </h2>
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

