import React from 'react';
import ClaimGiftForm from '@/components/ClaimGiftForm';

export const metadata = {
  title: "Claim Your Gift Code | ATV Roatan",
  description: "Share your experience and claim a 10% OFF gift code for your friends.",
};

export default function ClaimGiftPage() {
  return (
    <main className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            Gift a Friend <span className="text-[#00694B]">10% OFF</span>
          </h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Loved your ride? Share your experience on social media and we'll send you a special discount code to gift to your friends.
          </p>
        </header>

        {/* Instruction Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Step 1 */}
          <div className="bg-[#f8f9fa] p-8 rounded-xl border border-[#e0e0e0] flex flex-col items-start transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
            <div className="w-12 h-12 bg-[#00694B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-5 shadow-sm">
              1
            </div>
            <h3 className="text-black text-xl font-bold mb-3">Post Reviews</h3>
            <p className="text-black leading-relaxed">
              Leave a review on Google, Facebook, and TripAdvisor after your tour.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f8f9fa] p-8 rounded-xl border border-[#e0e0e0] flex flex-col items-start transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
            <div className="w-12 h-12 bg-[#00694B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-5 shadow-sm">
              2
            </div>
            <h3 className="text-black text-xl font-bold mb-3">Share a Story</h3>
            <p className="text-black leading-relaxed">
              Post a video/photo story of your tour and tag <strong className="font-bold">@ATVRoatan</strong> on Instagram.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f8f9fa] p-8 rounded-xl border border-[#e0e0e0] flex flex-col items-start transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
            <div className="w-12 h-12 bg-[#00694B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-5 shadow-sm">
              3
            </div>
            <h3 className="text-black text-xl font-bold mb-3">Send Links</h3>
            <p className="text-black leading-relaxed">
              Submit the links to your posts using the form below for verification.
            </p>
          </div>

        </div>

        {/* Submission Form Component */}
        <ClaimGiftForm />

      </div>
    </main>
  );
}

