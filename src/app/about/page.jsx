import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Shield, Users, Map } from 'lucide-react';

export const metadata = {
  title: "About Us - Roatan ATV Buggy and Golf Cart Adventure Tours",
  description: "Learn more about our passion for providing the best island tours in Roatan.",
};

const AboutPage = () => {
  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[350px] md:min-h-[400px]">
        <Image
          src="/images/about-us.webp"
          alt="About Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-24 z-10">
          <div className="mb-3 md:mb-4">
             <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/30 text-white/90 text-xs md:text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                About Us
             </span>
          </div>
          <h1 className="text-white h11 tracking-tight mb-4 md:mb-6 drop-shadow-lg leading-tight">
           About Roatan Buggy Tours
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Dedicated to providing unforgettable adventures and showing the true beauty of Roatan through our guided tours.
          </p>
        </div>
      </section>

      {/* 2. Main Content area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          
          {/* Left: Images / Visuals */}
          <div className="relative w-full px-4 md:px-0 mt-4 md:mt-0">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              <Image 
                src="/images/image1.jpeg" 
                alt="Roatan Adventure" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Overlay badge or image */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 md:-right-8 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full sm:rounded-2xl overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-gray-200">
              <Image 
                src="/images/image2.PNG" 
                alt="Smiling Tourists" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-4 sm:space-y-6 lg:pl-8 mt-10 lg:mt-0">
             <span className="inline-block w-fit px-3 sm:px-4 py-1 rounded-full border border-[#00694B]/30 text-[#00694B] font-semibold text-xs sm:text-sm bg-[#00694B]/5">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mt-1 sm:mt-2">
              Discover the <br className="hidden sm:block" />
              <span className="text-[#00694B] italic font-uber-move">Heart of Roatan</span>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                We are Roatan ATV, Buggy & Golf Cart Adventure Tours. We are not a booking agency — we are the <strong>Owners</strong> in Las Fuertes. At ATV Roatan, we answer the 'Why' of travel: because life is an adventure meant to be lived, not watched through a bus window.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Based in Las Fuertes, we own our fleet, maintain our own engines, and protect our own guests. When you book here, you aren't just a ticket number on a corporate spreadsheet — you are a <strong>guest in our home</strong>.
              </p>
            </div>

            {/* Our Team */}
            <div className="pt-2 sm:pt-4 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-2">Our Team</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                A group of direct descendants of the original Roatan inhabitants is the foundation of our staff. Each one of them has the most friendly attitude you'll ever meet while being on the island and is fully committed to making you enjoy your time with us.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-2">
                All our team members are bilingual English and Spanish speakers, fully trained in <strong>CPR & Mountain Rescue</strong>.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 text-xl">
                  ⛑️
                </div>
                <h4 className="text-[#1a1a1a] font-bold text-sm sm:text-base leading-snug">Port Round Trip Transport Included</h4>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 text-xl">
                  ✅
                </div>
                <h4 className="text-[#1a1a1a] font-bold text-sm sm:text-base leading-snug">Free Cancellation & Full Refund</h4>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 text-xl">
                  👨‍👩‍👧‍👦
                </div>
                <h4 className="text-[#1a1a1a] font-bold text-sm sm:text-base leading-snug">Kids & Family Friendly</h4>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 text-xl">
                  ♀️
                </div>
                <h4 className="text-[#1a1a1a] font-bold text-sm sm:text-base leading-snug">Women-Led, Family Owned</h4>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Call To Action Footer */}
      <section className="w-full bg-[#00694B] py-12 sm:py-16 mt-6 sm:mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Book now and witness the pristine beauty of Roatan through an unbeatable adventure tour.
          </p>
          <a href="/tours" className="inline-block bg-white text-[#00694B] font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:-translate-y-1 duration-300 w-full sm:w-auto">
            View Our Tours
          </a>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;

