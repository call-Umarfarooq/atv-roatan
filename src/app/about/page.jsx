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
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero.png"
          alt="About Roatan ATV Tours"
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
                About Us
             </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
            Who <span className="text-[#00694B] italic font-serif px-3 rounded-lg mr-1 ml-1 ">We</span> Are
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
            Dedicated to providing unforgettable adventures and showing the true beauty of Roatan through our guided tours.
          </p>
        </div>
      </section>

      {/* 2. Main Content area */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Images / Visuals */}
          <div className="relative w-full">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              <Image 
                src="/images/icon5.jpeg" 
                alt="Roatan Adventure" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Overlay badge or image */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-8 border-white shadow-2xl hidden md:block bg-gray-200">
              <Image 
                src="/images/icon2.jpeg" 
                alt="Smiling Tourists" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-6 md:pl-8">
             <span className="inline-block px-4 py-1 rounded-full border border-[#00694B]/30 text-[#00694B] font-semibold text-sm bg-[#00694B]/5">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mt-2">
              Discover the <br />
              <span className="text-[#00694B] italic font-serif">Heart of Roatan</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We started with a simple belief: the best way to experience the magic of Roatan is feeling the breeze, hearing the sounds of the jungle, and venturing off the beaten path. Over the years, we've grown into the leading provider for ATV, Dune Buggy, and Golf Cart excursions.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are an adventurous soul seeking adrenaline or a family looking for a scenic island tour, our expert local guides ensure safety, fun, and memories that will last a lifetime.
            </p>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 mt-1">
                  <Shield className="text-[#00694B]" size={24} />
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-lg mb-1">Safety First</h4>
                  <p className="text-gray-500 text-sm">Top maintained vehicles and safety gear provided.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 mt-1">
                  <Users className="text-[#00694B]" size={24} />
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-lg mb-1">Expert Guides</h4>
                  <p className="text-gray-500 text-sm">Friendly locals who know the island's best spots.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 mt-1">
                  <Map className="text-[#00694B]" size={24} />
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-lg mb-1">Scenic Routes</h4>
                  <p className="text-gray-500 text-sm">Traverse jungles, villages, and stunning coastlines.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="text-[#00694B]" size={24} />
                </div>
                <div>
                  <h4 className="text-[#1a1a1a] font-bold text-lg mb-1">Satisfaction</h4>
                  <p className="text-gray-500 text-sm">Guaranteed back-to-ship policy for cruisers.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Call To Action Footer */}
      <section className="w-full bg-[#00694B] py-16 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book now and witness the pristine beauty of Roatan through an unbeatable adventure tour.
          </p>
          <a href="/tours" className="inline-block bg-white text-[#00694B] font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:-translate-y-1 duration-300">
            View Our Tours
          </a>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;

