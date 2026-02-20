'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Phone, ChevronRight, Play } from 'lucide-react';

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are There Any Hidden Costs or Fees?",
      answer: "NO. There are no additional costs or fees related to your booking."
    },
    {
      question: "Do I Have To Pay My Booking In Advance?",
      answer: "YES. All bookings with the exception of boat charters are paid in full."
    },
    {
      question: "Do I Need To Provide Proof Of Booking?",
      answer: "YES. Please print the first page of the paid booking invoice or have a digital copy available for your tour guide or driver upon arrival."
    },
    {
      question: "Do You Have A Refund & Cancellation Policy?",
      answer: "YES. Our refund & cancellation terms may be found on our booking policy."
    },
    {
      question: "Does The Driver & Tour Guide Speak English?",
      answer: "YES. All our drivers and guides speak fluent English and Spanish."
    },
    {
      question: "Does The Driver & Tour Guide Carry Change?",
      answer: "NO. Company policy prohibits drivers and guides to carry change."
    },
    {
      question: "Is Gratuity/Tips Included With My Excursion?",
      answer: "NO. Gratuity/tips are not included with your excursion."
    },
    {
      question: "Is Gratuity/Tips Necessary, And How Much?",
      answer: "NO. Gratuity/Tips are not necessary, amount is up to island guest."
    },
    {
      question: "What Should I Wear?",
      answer: "Comfortable clothing; bathing suit, shorts, sundress, t-shirt, tank top, sandals, tennis shoes, etc.."
    },
    {
      question: "What Do I Bring On My Excursion?",
      answer: "We recommend; hat, sunglasses, sunscreen, beach towel, camera, OFF Bug Spray, and anything excursion specific that is not provided to you."
    },
    {
      question: "Should I Bring Any Form Of Identification?",
      answer: "YES. It’s recommended you have some form of valid identification on your person."
    },
    {
      question: "Should I Print My Port Exit & Meetup Instructions?",
      answer: "YES. It’s recommended you also print the map and watch the video. A digital copy on your phone may work as well."
    },
    {
      question: "Do I Bring Cash, Credit Card, Or Both?",
      answer: "YES. For incidentals, the US Dollar is used widely, as is the Honduran Lempira. Some establishments may not accept credit cards. Ripped twenty dollar bills may not be accepted."
    },
    {
      question: "Should I Notify My Bank Or Credit Card Company?",
      answer: "YES. If you plan on using your credit card out of the United States or place of origin."
    },
    {
      question: "May I Bring My Wheelchair OR Mobility Scooter?",
      answer: "YES. Unit must fold or collapse and prior notice must be given to Discover Roatan™ Excursions & Tours. Keep in mind, not all island attractions are 100% wheelchair accessible."
    },
    {
      question: "May I Bring/Use Non Prescribed Drugs or Medications?",
      answer: "NO. DRET strictly prohibits the possession and use of any non prescribed drugs and medications during any of our excursions or tours."
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px]">
        <Image
          src="/images/hero.png"
          alt="Frequently Asked Questions - Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-24 relative z-10">
          <div className="mb-4">
             <span className="inline-block px-5 py-1.5 rounded-full border border-white/20 text-white/90 text-sm tracking-widest bg-white/10 backdrop-blur-sm">
                Asked Questions
             </span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-lg">
            Frequently Asked<br />
            <span className="text-[#15531B] italic font-serif px-2 drop-shadow-md">Questions</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Sticky info) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-6 lg:pr-8">
              <span className="inline-block px-4 py-1 rounded-full border border-[#15531B] text-[#15531B] font-bold text-xs uppercase tracking-wider bg-[#15531B]/5">
                FAQ'S
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-[1.15]">
                Ask Everything You <br />
                Need To Know
              </h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <button className="inline-flex items-center gap-2 bg-[#15531B] hover:bg-[#0e3d14] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                See More
                <ChevronRight size={18} className="text-white/80" />
              </button>
            </div>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className="border-b border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-6 flex justify-center text-[#1a1a1a]">
                            {isOpen ? <Minus size={20} className="shrink-0" /> : <Plus size={20} className="shrink-0 text-gray-400 group-hover:text-[#1a1a1a] transition-colors" />}
                        </div>
                        <span className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]'}`}>
                          {faq.question}
                        </span>
                      </div>
                    </button>
                    
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-gray-600 leading-relaxed pl-12 text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Banner: Video & Support Info */}
      <section className="max-w-7xl mx-auto px-4 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Image / Video Placeholder */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="/images/hero.png" 
                alt="Roatan Scenery" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full border border-white/50 bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer group-hover:bg-[#15531B] group-hover:border-[#15531B] transition-all duration-300 shadow-xl">
                    <Play className="text-white ml-2" fill="white" size={32} />
                 </div>
              </div>
            </div>

            {/* Right Support Info */}
            <div className="space-y-6">
               <span className="inline-block px-4 py-1 rounded-full border border-[#15531B]/20 text-[#15531B] font-bold text-xs uppercase tracking-wider bg-[#15531B]/5">
                Support
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                Don't Found Your <br />
                Queries? <span className="text-[#15531B] italic font-serif">Contact Us!</span>
              </h2>
              <p className="text-gray-600 text-[15px] leading-relaxed md:pr-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              {/* Call Card */}
              <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-6 md:p-8 flex items-center gap-6 mt-8 max-w-sm shadow-sm hover:shadow-md transition-shadow">
                 <div className="w-16 h-16 bg-[#15531B]/10 rounded-full flex items-center justify-center shrink-0">
                     <Phone className="text-[#15531B]" size={28} />
                 </div>
                 <div>
                     <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Call Us Anytime!</p>
                     <p className="text-[#1a1a1a] font-bold text-xl md:text-2xl whitespace-nowrap">(+504) 1234-5678</p>
                 </div>
              </div>
            </div>

        </div>
      </section>
    </main>
  );
};

export default FAQsPage;
