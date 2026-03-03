"use client";
import React, { useEffect } from 'react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const ELFSIGHT_APP_ID = "elfsight-app-ff87f495-c30c-416d-960a-5d8d01fc8490";

const ReviewsWidget = () => {
  useEffect(() => {
    // Load the Elfsight platform script once
    if (document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) return;

    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="w-full py-10 px-4">

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
        <StaggeredTextReveal
          el="h2"
          className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1a1a1a] mb-2"
          text="What Our Guests Say"
        />
        <div className="w-14 md:w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-3" />
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Read honest reviews from travelers who have experienced the magic of Roatan with us.
        </p>
      </div>

      {/* Hide Elfsight branding footer */}
      <style>{`
        .eapps-widget-toolbar,
        .eapps-link,
        [class*="eapps-google-reviews-footer"],
        [class*="eapps-google-reviews-title-container"],
        .eapps-google-reviews-footer,
        a[href*="elfsight.com"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>

      {/* Elfsight Google Reviews Widget */}
      <div className="max-w-7xl mx-auto w-full relative">
        <div className={ELFSIGHT_APP_ID} data-elfsight-app-lazy></div>
        {/* White cover to hide Elfsight branding footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '32px',
            background: '#ffffff',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      </div>

    </section>
  );
};

export default ReviewsWidget;
