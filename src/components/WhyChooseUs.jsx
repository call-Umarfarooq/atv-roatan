'use client';

import React from 'react';
import { Headset, ShieldCheck, Leaf, Map, Check, X } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Headset size={28} className="text-[#00694B]" />,
      title: "Always Here for You",
      description: "24/7 support for your travel needs.",
      bg: "bg-red-50",
    },
    {
      icon: <ShieldCheck size={28} className="text-[#00694B]" />,
      title: "Your Safety Guaranteed",
      description: "Fully insured tours with Ship-Back Guarantee.",
      bg: "bg-green-50",
    },
    {
      icon: <Leaf size={28} className="text-[#00694B]" />,
      title: "Sustainability",
      description: "Eco-conscious tours that respect nature and communities.",
      bg: "bg-yellow-50",
    },
    {
      icon: <Map size={28} className="text-[#00694B]" />,
      title: "Local Expertise",
      description: "Discover through the eyes of passionate local experts.",
      bg: "bg-blue-50",
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
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <StaggeredTextReveal
            el="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3"
            text="Why to choose ATV Roatan?"
          />
          <div className="w-16 h-1 bg-[#00694B] mx-auto rounded-full" />
        </div>

        {/* Features — 2×2 on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-10 md:mb-20">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full ${feature.bg} flex items-center justify-center mb-3 sm:mb-6 transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-[#1a1a1a] mb-1 sm:mb-3 leading-snug">{feature.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed hidden sm:block">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

            {/* Table Header */}
            <div className="bg-[#00694B] px-4 py-4 md:p-6 text-center">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-snug">
                Why Book Direct with the Fleet Owners?
              </h3>
            </div>

            {/* ── Desktop: table ── */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-bold text-gray-700 w-1/3">Feature</th>
                    <th className="p-4 font-bold text-[#00694B] w-1/3 bg-[#00694B]/5">ATV Roatan (Direct)</th>
                    <th className="p-4 font-bold text-gray-500 w-1/3">OTAs (Viator / Expedia)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                      <td className="p-4 font-bold text-[#00694B] bg-[#00694B]/5">
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
