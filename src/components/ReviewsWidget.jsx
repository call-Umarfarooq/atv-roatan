"use client";
import React, { useEffect, useRef } from 'react';

const ReviewsWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      const script = document.createElement('script');
      script.src = "https://reviews.beaver.codes/widget/web-google-reviews.js";
      script.async = true;
      widgetRef.current.appendChild(script);

      return () => {
        try {
          if (widgetRef.current && widgetRef.current.contains(script)) {
            widgetRef.current.removeChild(script);
          }
        } catch (e) {
          console.error("Error removing script", e);
        }
      };
    }
  }, []);

  return (
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-[32px] font-bold text-[#1a1a1a] mb-2">
          What Our Guests Say
        </h2>
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Don't just take our word for it. Read honest reviews from travelers who have experienced the magic of Roatan with us
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex justify-center w-full">
        <div ref={widgetRef} data-instance-id="PyN41i3Dnr8orSp5czzI" className="w-full">
            <style dangerouslySetInnerHTML={{ __html: `
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_review-footer,
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_text,
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating,
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_name {
                    color: #000 !important;
                    fill: #000 !important;
                    stroke: #000 !important;
                }

                /* If stars or icons don't change */
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating img,
                [data-instance-id="PyN41i3Dnr8orSp5czzI"] .beaver-widget_rating svg {
                    filter: brightness(0) !important;
                }
            `}} />
        </div>
      </div>
    </div>
  );
};

export default ReviewsWidget;

