import React from 'react';
import Image from 'next/image';

const features = [
  {
    image: '/images/image.png',
    title: 'Back to Ship\nGuarantee',
  },
  {
    image: '/images/image copy.png',
    title: 'Full Refund\nGuarantee',
  },
  {
    image: '/images/image copy 2.png',
    title: 'Local\nOperator',
  },
  {
    
    image: '/images/image copy 3.png',
    title: 'ATV Buggy\nTours',
  },
  {
    image: '/images/image copy 4.png',
    
    title: 'Monkey and Sloths\nHangout',
  },
  {
    
    image: '/images/image copy 5.png',
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
                <div className="mb-4 p-0 bg-[#ffffff] rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 w-20 h-20 flex items-center justify-center">
                  <div className="relative w-14 h-14">
                    <Image
                      src={feature.image}
                      alt={feature.title.replace('\n', ' ')}
                      fill
                      className="object-contain"
                    />
                  </div>
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
