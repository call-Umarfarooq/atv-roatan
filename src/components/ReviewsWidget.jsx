"use client";
import React, { useEffect } from 'react';

const ReviewsWidget = () => {
  useEffect(() => {
    // Function to load the Beaver Reviews script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://reviews.beaver.codes/widget/web-google-reviews.js";
      script.async = true;
      script.id = "beaver-reviews-script";
      document.body.appendChild(script);
    };

    // If script already exists, we might need to remove and re-add or just re-run
    // Some widgets auto-initialize on DOM nodes. If it doesn't re-init, we re-inject.
    const existingScript = document.getElementById('beaver-reviews-script');
    if (existingScript) {
      existingScript.remove();
    }
    loadScript();

    return () => {
      const script = document.getElementById('beaver-reviews-script');
      if (script) script.remove();
    };
  }, []);

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-[32px] font-bold text-[#1a1a1a] mb-2">
          What Our Guests Say
        </h2>
        <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Don't just take our word for it. Read honest reviews from travelers who have experienced the magic of Roatan with us
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div data-instance-id="PyN41i3Dnr8orSp5czzI">
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
