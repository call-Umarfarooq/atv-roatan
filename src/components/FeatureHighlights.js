import React from 'react';
import { Anchor, ShieldCheck, UserCheck, Car, Trees, Mountain } from 'lucide-react';

const features = [
  {
    icon: <Anchor className="w-8 h-8 text-[#008481]" />,
    title: 'Back to Ship\nGuarantee',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#008481]" />,
    title: 'Full Refund\nShip Fail to Dock',
  },
  {
    icon: <UserCheck className="w-8 h-8 text-[#008481]" />,
    title: 'Roatan Local Tour\nOperator',
  },
  {
    icon: <Car className="w-8 h-8 text-[#008481]" />,
    title: 'Roatan ATV\nBuggy Tours',
  },
  {
    icon: <Trees className="w-8 h-8 text-[#008481]" />,
    title: 'Roatan Monkey\nand Sloth Hangout',
  },
  {
    icon: <Mountain className="w-8 h-8 text-[#008481]" />,
    title: 'Roatan Zipline\nJungle Tours',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="w-full bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">Our Highlights</h2>
           <div className="w-16 h-1 bg-[#008481] mx-auto rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-white group-hover:shadow-md transition-all">
                {feature.icon}
              </div>
              <p className="text-sm font-bold text-[#1a1a1a] leading-tight whitespace-pre-line group-hover:text-[#008481] transition-colors">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
