"use client";
import React, { useEffect, useRef } from 'react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const ReviewsWidget = () => {
  const widgetRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (widgetRef.current && !isLoaded.current) {
      isLoaded.current = true;
      const script = document.createElement('script');
      script.src = "https://reviews.beaver.codes/widget/web-google-reviews.js";
      script.async = true;
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <section className="w-full py-10 md:py-16 px-4">

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
        <StaggeredTextReveal
          el="h2"
          className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1a1a1a] mb-2"
          text="What Our Guests Say"
        />
        <div className="w-14 md:w-20 h-1 bg-[#00694B] mx-auto rounded-full mb-3" />
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Don't just take our word for it. Read honest reviews from travelers who have experienced the magic of Roatan with us.
        </p>
      </div>

      {/* Widget */}
      <div className="max-w-7xl mx-auto w-full overflow-hidden">
        <div
          ref={widgetRef}
          data-instance-id="PyN41i3Dnr8orSp5czzI"
          className="w-full"
        >
          <style dangerouslySetInnerHTML={{ __html: `
            /* Text colours */
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_review-footer,
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_text,
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating,
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_name {
              color: #000 !important;
              fill: #000 !important;
              stroke: #000 !important;
            }

            /* Star icons */
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating img,
            [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating svg {
              filter: brightness(0) !important;
            }

            /* Mobile: prevent cards from overflowing viewport */
            @media (max-width: 640px) {
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] {
                overflow-x: hidden !important;
              }

              /* Shrink any hard-coded width containers inside the widget */
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] > *,
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="container"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="wrapper"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="card"] {
                max-width: 100% !important;
                min-width: 0 !important;
                box-sizing: border-box !important;
              }

              /* Scale down any large font sizes the widget may inject */
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="title"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="heading"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="name"] {
                font-size: clamp(13px, 3.5vw, 18px) !important;
              }

              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="text"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="review"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="body"] {
                font-size: clamp(12px, 3vw, 15px) !important;
              }

              /* If the widget uses a horizontal scroll container, keep it contained */
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="scroll"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="carousel"],
              [data-instance-id="PyN41i3Dnr8orSp5czzI"] [class*="slider"] {
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
            }
          `}} />
        </div>
      </div>
    </section>
  );
};

export default ReviewsWidget;
