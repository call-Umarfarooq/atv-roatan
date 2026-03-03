"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';

export default function FaqsPage() {
  const categories = [
    {
      emoji: '🏝️',
      title: 'General Booking & Island Policies',
      faqs: [
        {
          q: 'Are there any hidden fees or extra costs?',
          a: 'No. The price you see during checkout is the final price. We believe in 100% transparency; there are no surprise fuel surcharges or hidden booking fees added to your excursion.',
        },
        {
          q: 'How do I pay for my Roatan excursion?',
          a: 'All bookings are paid in full at the time of reservation to secure your spot. The only exception to this policy is for private boat charters, which may have different deposit requirements.',
        },
        {
          q: 'Do I need to show my booking confirmation?',
          a: 'Yes. To ensure a smooth pickup, please have a digital copy of your paid invoice ready on your phone or provide a printed first page to your tour guide upon arrival at the port.',
        },
        {
          q: 'What is the cancellation and refund policy?',
          a: 'We offer a flexible booking environment. You can review our full terms regarding cancellations and weather-related refunds on our dedicated Booking Policy page.',
        },
        {
          q: 'Will my guide speak English?',
          a: 'Absolutely. Communication is key to a great experience. All of our professional drivers and guides are 100% fluent in both English and Spanish.',
        },
        {
          q: 'Should I bring cash for tips or gratuities?',
          a: 'While gratuities are not included in your tour price and are never mandatory, they are greatly appreciated by our hardworking guides. Please note that our drivers do not carry change, so we recommend bringing small bills if you plan to tip or make small purchases.',
        },
      ],
    },
    {
      emoji: '🎒',
      title: 'Preparing for Your Roatan Adventure',
      faqs: [
        {
          q: 'What should I wear and bring?',
          a: 'For the best experience, wear comfortable tropical attire: sundresses, shorts, t-shirts, and swimwear. We highly recommend bringing: High-SPF sunscreen, sunglasses, a hat, and bug spray. A beach towel, a camera (or waterproof phone case), and sturdy footwear like sandals or water shoes. A valid form of ID is recommended for all guests.',
        },
        {
          q: 'Do I need to print the meetup instructions?',
          a: 'We strongly suggest printing the Port Exit Map and watching our arrival video before you dock. While a digital copy on your phone is great, having a physical backup ensures you can find your driver even if you lack a data connection.',
        },
        {
          q: 'What currency is used in Roatan?',
          a: 'Both US Dollars (USD) and Honduran Lempiras are widely accepted across the island. Please ensure your US bills are crisp; many local establishments cannot accept torn or ripped bills. Not all vendors accept credit cards, so carrying some cash is essential.',
        },
        {
          q: 'Can I bring a wheelchair or mobility scooter?',
          a: 'Yes. We aim to be inclusive. As long as your unit is foldable or collapsible, we can accommodate it. Please notify us in advance so we can ensure the vehicle assigned to you has the necessary space. Note: Some natural island attractions may have limited accessibility.',
        },
      ],
    },
    {
      emoji: '🚢',
      title: 'Port Arrival & Departure',
      faqs: [
        {
          q: 'How do I coordinate pickup with ship time?',
          a: 'Your specific pickup time is listed on your confirmation receipt. We monitor Cruise Ship Time vs. Local Time constantly, so you don\'t have to worry about the offset. We ask that you disembark as soon as the ship is cleared and allow 10–15 minutes to meet your driver at the designated spot.',
        },
        {
          q: 'What if my ship arrives late or changes dates?',
          a: 'Don\'t worry! We are cruise ship specialists. If your ship is delayed or changes its docking date, your excursion automatically moves with it. Simply follow the standard meetup instructions when you finally dock.',
        },
        {
          q: 'Will I be back at the port in time for departure?',
          a: 'Guaranteed. We prioritize your return above all else. We ensure all guests are back at the cruise ship terminal at least one hour before your "All Aboard" time.',
        },
        {
          q: 'Where is the drop-off point?',
          a: 'On your return, we don\'t just leave you at the gate. We drop you off inside the cruise ship terminal, curbside, giving you plenty of time to browse the port shops before boarding.',
        },
      ],
    },
  ];

  const [openCat, setOpenCat] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (catI, faqI) => {
    const key = `${catI}-${faqI}`;
    setOpenFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="bg-[#fcfcfc] min-h-screen">

      {/* Hero */}
      <section className="relative w-full h-[40vh] md:h-[55vh] min-h-[360px]">
        <Image
          src="/images/hero.png"
          alt="FAQ - Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16 z-10">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full border border-white/30 text-white/90 text-xs tracking-widest uppercase bg-black/20 backdrop-blur-sm">
            Asked Questions
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg leading-tight">
            Frequently Asked <span className="text-[#00694B]">Questions</span>
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto text-sm sm:text-base">
            Expert local advice for your arrival, preparation, and port departure.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-20">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <span className="text-[#00694B] font-bold text-sm tracking-wide uppercase">FAQ&apos;s</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mt-3 mb-4">
                Ask Everything You <span className="text-[#00694B] italic">Need To Know</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                To ensure you have the best experience in Roatan, we&apos;ve organized our policies and advice into clear categories.
              </p>
              <a
                href="tel:+50412345678"
                className="inline-flex items-center gap-2 bg-[#00694B] hover:bg-[#005a3c] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Phone size={16} /> +504 1234-5678
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-2 space-y-4">
            {categories.map((cat, catI) => (
              <div key={catI} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Category header */}
                <button
                  onClick={() => setOpenCat(openCat === catI ? -1 : catI)}
                  className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors text-left group"
                >
                  <span className="text-[#1a1a1a] font-bold text-base sm:text-lg flex items-center gap-2">
                    <span>{cat.emoji}</span> {cat.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#00694B] shrink-0 transition-transform duration-300 ${openCat === catI ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Category body */}
                <div className={`overflow-hidden transition-all duration-300 ${openCat === catI ? 'max-h-[2000px]' : 'max-h-0'}`}>
                  <div className="border-t border-gray-100 divide-y divide-gray-100 px-6">
                    {cat.faqs.map((faq, faqI) => {
                      const key = `${catI}-${faqI}`;
                      const isOpen = !!openFaq[key];
                      return (
                        <div key={faqI}>
                          <button
                            onClick={() => toggleFaq(catI, faqI)}
                            className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                          >
                            <span className={`font-semibold text-[15px] leading-snug transition-colors ${isOpen ? 'text-[#00694B]' : 'text-[#1a1a1a] group-hover:text-[#00694B]'}`}>
                              {faq.q}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00694B]' : ''}`}
                            />
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="bg-[#f0f9f5] rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero.png"
              alt="Contact ATV Roatan Support"
              fill
              className="object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[18px] border-l-[#00694B] ml-1" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-block bg-white text-[#00694B] text-xs font-bold px-3 py-1 rounded-full mb-4">
              Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
              Didn&apos;t Find Your Answer?{' '}
              <span className="text-[#00694B] italic">Contact Us!</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              If you have specific questions about group rates, custom itineraries, or mobility needs, our local team is ready to help.
            </p>
            <div className="flex items-center gap-4 bg-white px-5 py-4 rounded-xl w-fit shadow-sm">
              <div className="w-11 h-11 bg-[#00694B] rounded-full flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-0.5">Call Us Anytime!</span>
                <a href="tel:+50412345678" className="text-lg font-bold text-[#1a1a1a] hover:text-[#00694B] transition-colors">
                  +504 1234-5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
