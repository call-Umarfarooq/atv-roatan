import React from 'react';
import { Anchor, ShieldCheck, MapPin, Car, PawPrint, Mountain } from 'lucide-react';

const features = [
  {
    icon: <Anchor className="w-6 h-6 text-[#15531B]" />,
    title: 'Back to Ship\nGuarantee',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#15531B]" />,
    title: 'Full Refund\nGuarantee',
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#15531B]" />,
    title: 'Local\nOperator',
  },
  {
    icon: <Car className="w-6 h-6 text-[#15531B]" />,
    title: 'ATV Buggy\nTours',
  },
  {
    icon: <PawPrint className="w-6 h-6 text-[#15531B]" />,
    title: 'Sloth\nHangout',
  },
  {
    icon: <Mountain className="w-6 h-6 text-[#15531B]" />,
    title: 'Zipline\nTours',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="relative w-full px-4 -mt-16 sm:-mt-20 z-10 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl px-4 py-8 md:px-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 justify-items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group w-full"
              >
                <div className="mb-4 p-4 bg-[#E0F2F1] rounded-full group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <p className="text-sm font-bold text-gray-800 leading-tight whitespace-pre-line group-hover:text-[#15531B] transition-colors">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
