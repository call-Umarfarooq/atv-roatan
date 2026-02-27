'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    title: 'Roatan Local Tour\nOperator',
  },
  {
    image: '/images/1.png',
    title: 'Roatan ATV\nBuggy Tours',
  },
  {
    image: '/images/image copy 4.png',
    title: 'Roatan Monkey and\nSloth Hangout',
  },
  {
    image: '/images/image copy 5.png',
    title: 'Roatan Zipline\nJungle Tours',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const FeatureHighlights = () => {
  return (
    <section className="relative w-full px-3 sm:px-4 -mt-10 sm:-mt-14 md:-mt-16 z-10 mb-8 md:mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Green accent bar at top */}
          <div className="h-1 w-full bg-gradient-to-r from-[#00694B] via-[#00a36c] to-[#00694B]" />

          {/* ── Mobile: horizontal scroll strip ── */}
          <div className="md:hidden px-2 py-5">
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex-none snap-start flex flex-col items-center text-center gap-2 w-[110px] group"
                >
                  {/* Icon circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e8f5f0] to-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <div className="relative w-10 h-10">
                      <Image
                        src={feature.image}
                        alt={feature.title.replace('\n', ' ')}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Label */}
                  <p className="text-[11px] font-bold text-gray-700 leading-tight whitespace-pre-line group-hover:text-[#00694B] transition-colors">
                    {feature.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Scroll hint dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {features.map((_, i) => (
                <span key={i} className={`block rounded-full bg-[#00694B] transition-all ${i === 0 ? 'w-4 h-1.5' : 'w-1.5 h-1.5 opacity-30'}`} />
              ))}
            </div>
          </div>

          {/* ── Tablet & Desktop: grid ── */}
          <motion.div
            className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6 px-6 lg:px-8 py-8 md:py-10 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center group w-full"
              >
                {/* Icon circle */}
                <div className="mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#e8f5f0] to-white shadow-md flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
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
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Hide scrollbar utility (inline so no extra CSS file needed) */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default FeatureHighlights;
