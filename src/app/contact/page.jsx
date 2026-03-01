'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, Phone, CheckCircle2, Loader2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      const res = await fetch('/api/contact', {
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
        subject: '',
        message: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
            <Image
            src="/images/hero.png"
            alt="Contact Us - Roatan ATV Tours"
            fill
            priority
            className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content (Positioned relatively so it expands the section height) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 w-full h-[450px] md:h-[500px] sm:h-auto min-h-[400px]">
          <div className="mb-3 md:mb-4">
             <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/30 text-white/90 text-xs md:text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                Contact Us
             </span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 drop-shadow-lg leading-tight">
            Get In <span className="text-[#00694B] italic font-uber-move px-2 md:px-3 rounded-lg ">Touch</span><br />
            With Us
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Whether you have questions about our tours, need help with a booking, or just want to say hello, we are here to assist you and ensure you have an unforgettable adventure in Roatan.
          </p>
        </div>
      </section>

      {/* 2. Map Section (Full Width) */}
      <section className="w-full h-[250px] sm:h-[300px] md:h-[400px] bg-gray-200 relative overflow-hidden">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122394.02037148529!2d-86.58667637841103!3d16.331579624647348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6a3928eeb3d527%3A0x6bbaaba6b677a2ed!2sRoat%C3%A1n%2C%20Honduras!5e0!3m2!1sen!2sus!4v1714574971261!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[20%] contrast-[1.1]"
        ></iframe>
      </section>

      {/* 3. Main Content: Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          
          {/* Left: Contact Form */}
          <div className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative order-2 lg:order-1 mt-8 lg:mt-0">
            <h3 className="text-[#ffffff] text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-white/10 px-4 py-2 rounded-lg inline-block">Send Us A Message</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-[#00694B]/20 border border-[#00694B]/50 text-[#4ade80] rounded-lg flex items-center gap-3 text-sm sm:text-base">
                <CheckCircle2 size={20} className="shrink-0" />
                <span>Message sent successfully! We'll be in touch soon.</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    required
                    className="w-full bg-[#2a2a2a] text-white text-sm sm:text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00694B] border border-transparent transition-all"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    required
                    className="w-full bg-[#2a2a2a] text-white text-sm sm:text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00694B] border border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  required
                  className="w-full bg-[#2a2a2a] text-white text-sm sm:text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00694B] border border-transparent transition-all"
                />
              </div>

              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message" 
                  rows={5}
                  required
                  className="w-full bg-[#2a2a2a] text-white text-sm sm:text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00694B] border border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00694B] text-white flex items-center justify-center gap-2 font-bold text-base sm:text-lg py-3 sm:py-4 rounded-full hover:bg-[#0e3d14] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Now'
                )}
              </button>
            </form>
          </div>

          {/* Right: Info Text */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
             <span className="inline-block w-fit px-3 sm:px-4 py-1 rounded-full border border-[#00694B]/30 text-[#00694B] font-semibold text-xs sm:text-sm bg-[#00694B]/5">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mt-1 sm:mt-2">
              Get In Touch With <br className="hidden sm:block" />
              <span className="text-[#00694B] italic font-uber-move">ATV Roatan</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Have questions or need help planning your next trip? Contact us and let's make your travel experience hassle-free!
            </p>

            <div className="pt-4 sm:pt-6">
              <h4 className="text-lg sm:text-xl font-bold text-[#1a1a1a] mb-3 sm:mb-4">Why Reach Out To Us?</h4>
              <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6">
                Our dedicated team is passionate about delivering the ultimate offshore adventure. We ensure every detail is tailored to your excitement and safety requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Personalized Travel Planning",
                  "Fast & Secure Booking",
                  "24/7 Customer Support",
                  "Local Travel Experts",
                  "Exclusive Travel Deals"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#00694B] shrink-0 fill-[#00694B]/10 sm:w-5 sm:h-5" />
                    <span className="text-[#1a1a1a] font-medium text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#1a1a1a] text-lg sm:text-xl font-bold mb-2 sm:mb-3">Office Address</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 h-auto sm:h-10">
              Prefer to visit our office? Our travel experts are ready to assist you.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#00694B] sm:w-6 sm:h-6" />
              </div>
              <span className="text-[#1a1a1a] font-semibold text-sm sm:text-base break-words">Roatan, Honduras</span>
            </div>
          </div>

          {/* Card 2: Message Us */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#1a1a1a] text-lg sm:text-xl font-bold mb-2 sm:mb-3">Message Us</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 h-auto sm:h-10">
              Send us your travel queries, and our team will reply as soon as possible!
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-[#00694B] sm:w-6 sm:h-6" />
              </div>
              <span className="text-[#1a1a1a] font-semibold text-sm sm:text-base break-all">info@atvroatan.com</span>
            </div>
          </div>

          {/* Card 3: Call Us */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <h4 className="text-[#1a1a1a] text-lg sm:text-xl font-bold mb-2 sm:mb-3">Call Us Now</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 h-auto sm:h-10">
              Need assistance? Call us, and we'll make your travel planning hassle-free!
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00694B]/10 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-[#00694B] sm:w-6 sm:h-6" />
              </div>
              <span className="text-[#1a1a1a] font-semibold text-sm sm:text-base">+504 1234-5678</span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default ContactPage;

