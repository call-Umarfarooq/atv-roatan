import React from 'react';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import { getImageUrl } from '@/utils/imageUrl';
import GalleryGrid from '@/components/GalleryGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Gallery - Roatan ATV Buggy and Golf Cart Adventure Tours",
  description: "Explore our gallery of past tours and beautiful views in Roatan.",
};

export default async function GalleryPage() {
  const apiUrl = process.env.API_BASE_URL || 'http://127.0.0.1:3000';
  
  const res = await fetch(`${apiUrl}/api/admin/tours?status=all`, { cache: 'no-store' });
  let tours = [];
  if (res.ok) {
    const data = await res.json();
    tours = data.data || [];
  }

  // Build flat list of all images from all tours
  const allImages = [];
  for (const tour of tours) {
    if (tour.image_url) {
      allImages.push({
        src: getImageUrl(tour.image_url),
        alt: tour.image_alt || tour.title,
        tourTitle: tour.title,
        slug: tour.slug,
      });
    }
    if (Array.isArray(tour.gallery)) {
      tour.gallery.forEach((imgUrl, i) => {
        if (imgUrl) {
          allImages.push({
            src: getImageUrl(imgUrl),
            alt: (tour.gallery_alts?.[i]) || `${tour.title} photo ${i + 1}`,
            tourTitle: tour.title,
            slug: tour.slug,
          });
        }
      });
    }
  }

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[350px] md:min-h-[400px]">
        <Image
          src="/images/hero.png"
          alt="Gallery - Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-24 z-10">
          <div className="mb-3 md:mb-4">
            <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/30 text-white/90 text-xs md:text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
              Our Gallery
            </span>
          </div>
          <h1 className="text-white h11 tracking-tight mb-4 md:mb-6 drop-shadow-lg leading-tight">
            Moments To Remember
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Take a look at the thrilling adventures and beautiful scenery experienced by our guests on the trails of Roatan.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[#00694B] font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3 block">
            Tour Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
            See The <span className="text-[#00694B] italic font-uber-move">Adventure</span>
          </h2>
          
        </div>

        <GalleryGrid images={allImages} />
      </section>
    </main>
  );
}
