import React from 'react';
import Image from 'next/image';

const features = [
  {
    image: '/images/image.png',
    title: 'Back to Ship\nGuarantee',
  },
  {
    image: '/images/image copy.png',
    title: 'Full Refund\nShip Fail to Dock',
  },
  {
    image: '/images/image copy 2.png',
    title: 'Roatan Local Tour \nOperator',
  },
  {
    
    image: '/images/1.png',
    title: 'Roatan ATV  \nBuggy Tours',
  },
  {
    image: '/images/image copy 4.png',
    
    title: 'Roatan Monkey and\nSloth Hangout',
  },
  {
    
    image: '/images/image copy 5.png',
    title: 'Roatan Zipline\n Jungle Tours',
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
                <p className="text-sm font-bold text-gray-800 leading-tight whitespace-pre-line group-hover:text-[#00694B] transition-colors">
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

