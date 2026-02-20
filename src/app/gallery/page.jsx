import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: "Gallery - Roatan ATV Buggy and Golf Cart Adventure Tours",
  description: "Explore our gallery of past tours and beautiful views in Roatan.",
};

const images = [
  { src: "/images/icon1.jpg.jpeg", alt: "ATV Tour 1" },
  { src: "/images/icon2.jpeg", alt: "ATV Tour 2" },
  { src: "/images/icon3.jpeg", alt: "ATV Tour 3" },
  { src: "/images/icon4.jpeg", alt: "ATV Tour 4" },
  { src: "/images/1.png", alt: "ATV Action" },
  { src: "/images/icon5.jpeg", alt: "ATV Tour 5" },
  { src: "/images/icon6.jpeg", alt: "ATV Tour 6" },
  { src: "/images/icon7.jpeg", alt: "ATV Tour 7" },
];

const GalleryPage = () => {
  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero.png"
          alt="Gallery - Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-24 z-10">
          <div className="mb-4">
             <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white/90 text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                Our Gallery
             </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
            Moments To <span className="text-[#15531B] italic font-serif px-3 rounded-lg mr-1 ml-1 ">Remember</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
            Take a look at the thrilling adventures and beautiful scenery experienced by our guests on the trails of Roatan.
          </p>
        </div>
      </section>

      {/* 2. Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-[#15531B] font-semibold text-sm tracking-wider uppercase mb-3 block">
            Tour Highlights
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
            See The <span className="text-[#15531B] italic font-serif">Adventure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative w-full h-64 rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
