'use client';
import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ClaimGiftForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reviewLink1: '',
    reviewLink2: '',
    storyLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/claim-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        reviewLink1: '',
        reviewLink2: '',
        storyLink: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="bg-white border border-[#e0e0e0] rounded-2xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center">
        <CheckCircle2 className="w-16 h-16 text-[#00694B] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-black mb-4">Request Submitted!</h2>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for sharing your experience. We will verify your links and send the gift code to your email within 12-24 hours.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="bg-[#00694B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#005a40] transition-colors"
        >
          Submit Another
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white border border-[#e0e0e0] rounded-2xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <h2 className="text-3xl font-bold text-black text-center mb-8">
        Submit Verification
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe" 
              required
              className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm">Your Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com" 
              required
              className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm">Link to Review 1 (Google/Facebook)</label>
            <input 
              type="url" 
              name="reviewLink1"
              value={formData.reviewLink1}
              onChange={handleChange}
              placeholder="https://..." 
              required
              className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm">Link to Review 2 (TripAdvisor)</label>
            <input 
              type="url" 
              name="reviewLink2"
              value={formData.reviewLink2}
              onChange={handleChange}
              placeholder="https://..." 
              required
              className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm">Link to Social Media Story</label>
            <input 
              type="url" 
              name="storyLink"
              value={formData.storyLink}
              onChange={handleChange}
              placeholder="https://instagram.com/stories/..." 
              required
              className="px-4 py-3 border border-[#e0e0e0] rounded-lg text-base outline-none focus:ring-2 focus:ring-[#00694B] focus:border-transparent transition-all"
            />
        </div>

        <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#00694B] text-white py-4 rounded-lg text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#005a40] transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Claim Gift Code</span>
                  <Send size={20} />
                </>
              )}
            </button>
        </div>
      </form>

      <p className="text-black text-center mt-8 text-sm font-semibold">
        Verification usually takes 12-24 hours. The code will be sent to your email.
      </p>
    </section>
  );
}

