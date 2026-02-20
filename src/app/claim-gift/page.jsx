import React from 'react';
import { Send } from 'lucide-react'; // Replaces font-awesome paper-plane

export const metadata = {
  title: "Claim Your Gift Code | ATV Roatan",
  description: "Share your experience and claim a 10% OFF gift code for your friends.",
};

export default function ClaimGiftPage() {
  return (
    <main className="bg-white min-h-screen py-20 px-4 font-sans">
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

        {/* Submission Form Section */}
        <section className="bg-white border border-[#e0e0e0] rounded-2xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Submit Verification
          </h2>
          
          <form className="space-y-6">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  required
                  className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm">Your Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  required
                  className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Link Inputs */}
            <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm">Link to Review 1 (Google/Facebook)</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  required
                  className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm">Link to Review 2 (TripAdvisor)</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  required
                  className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-black text-sm">Link to Social Media Story</label>
                <input 
                  type="url" 
                  placeholder="https://instagram.com/stories/..." 
                  required
                  className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
                />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#00694B] text-white py-4 rounded-lg text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#005a40] transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <span>Claim Gift Code</span>
                  <Send size={20} />
                </button>
            </div>

          </form>

          <p className="text-black text-center mt-8 text-sm font-semibold">
            Verification usually takes 12-24 hours. The code will be sent to your email.
          </p>
        </section>

      </div>
    </main>
  );
}
