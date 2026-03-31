'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const WhyChooseUs = () => {
  const features = [
    {
      image: "/images/choose-1.png",
      title: "Always Here for You",
      description: "24/7 support for your travel needs.",
    },
    {
      image: "/images/choose-2.png",
      title: "Your Safety Guaranteed",
      description: "Fully insured tours with Ship-Back Guarantee.",
    },
    {
      image: "/images/choose-3.png",
      title: "Sustainability",
      description: "Eco-conscious tours that respect nature and communities.",
    },
    {
      image: "/images/choose-4.png",
      title: "Local Expertise",
      description: "Discover through the eyes of passionate local experts.",
    },
  ];

  const comparisonData = [
    { feature: "Price",              direct: "Lowest (Save $10–$20)",    ota: "Higher (Inc. Commission)"  },
    { feature: "Equipment",          direct: "We Own The Fleet",          ota: "Middlemen / Brokers"        },
    { feature: "Group Size",         direct: "Private / Small Group",     ota: "Large Crowds"               },
    { feature: "Maintenance Base",   direct: "On-site in Las Fuertes",   ota: "None"                       },
    { feature: "Ship Guarantee",     direct: "100% Back-to-Ship",        ota: "Basic Support"              },
  ];

  return (
    <section className="py-10 bg-white">
      {/* Why Choose Us Banner - Full Width */}
      <div 
        className="relative border-y-[4px] sm:border-y-[5px] border-[#2A4B31] overflow-hidden mb-16 bg-cover bg-center bg-no-repeat shadow-md w-full"
        style={{ backgroundImage: "url('/images/why-choose-bg.png')" }}
      >
        {/* Inner outline to mimic the double border in the image */}
        <div className="absolute inset-y-[3px] border-y-[1px] border-[#2A4B31]/60 pointer-events-none w-full"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 py-10 sm:py-16">
          {/* Heading */}
          <div className="text-center pb-10 sm:pb-14">
            <StaggeredTextReveal
              el="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5 font-serif"
              text="Why to choose ATV Roatan?"
            />
            <div className="flex items-center justify-center gap-2">
              <div className="h-[2px] w-16 sm:w-24 bg-[#2A4B31]"></div>
              <div className="w-2.5 h-2.5 rotate-45 bg-[#2A4B31]"></div>
              <div className="h-[2px] w-16 sm:w-24 bg-[#2A4B31]"></div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 items-start">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-[75%] sm:w-[85%] max-w-[200px] aspect-square relative mb-5 transition-transform duration-300 group-hover:-translate-y-2 flex items-center justify-center rounded-full overflow-hidden shadow-md bg-white border-2 border-green-50/50">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-lg lg:text-xl font-bold text-[#1a1a1a] leading-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-800 font-medium text-sm sm:text-[15px] leading-relaxed max-w-[240px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

            {/* Table Header */}
            <div className="bg-[#00694B] px-4 py-4 md:p-4 text-center">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug">
                Why Book Direct with the Fleet Owners?
              </h3>
            </div>

            {/* ── Desktop: table ── */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700 w-1/3">Feature</th>
                    <th className="p-4 font-semibold text-[#00694B] w-1/3 bg-[#00694B]/5">ATV Roatan (Direct)</th>
                    <th className="p-4 font-semibold text-gray-500 w-1/3">OTAs (Viator / Expedia)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                      <td className="p-4 font-medium text-[#00694B] bg-[#00694B]/5">
                        <span className="flex items-center gap-2">
                          <Check size={15} strokeWidth={3} />
                          {row.direct}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{row.ota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile: stacked cards ── */}
            <div className="sm:hidden divide-y divide-gray-100">
              {/* Column labels */}
              <div className="grid grid-cols-2 bg-gray-50 px-4 py-2.5">
                <span className="text-xs font-bold text-[#00694B]">✓ ATV Roatan</span>
                <span className="text-xs font-bold text-gray-400">✗ OTAs</span>
              </div>

              {comparisonData.map((row, index) => (
                <div key={index} className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">{row.feature}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Direct */}
                    <div className="flex items-start gap-1.5 bg-[#00694B]/5 rounded-lg px-2.5 py-2">
                      <Check size={13} strokeWidth={3} className="text-[#00694B] mt-0.5 shrink-0" />
                      <span className="text-[11px] font-bold text-[#00694B] leading-snug">{row.direct}</span>
                    </div>
                    {/* OTA */}
                    <div className="flex items-start gap-1.5 bg-gray-50 rounded-lg px-2.5 py-2">
                      <X size={13} strokeWidth={3} className="text-gray-400 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-gray-400 leading-snug">{row.ota}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
