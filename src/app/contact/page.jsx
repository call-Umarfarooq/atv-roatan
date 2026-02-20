import React from 'react';
import Image from 'next/image';
import { MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: "Contact Us - Roatan ATV Buggy and Golf Cart Adventure Tours",
  description: "Get in touch with us for your next adventure in Roatan.",
};

const ContactPage = () => {
  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/hero.png"
          alt="Contact Us - Roatan ATV Tours"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-24 relative z-10">
          <div className="mb-4">
             <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white/90 text-sm tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                Contact Us
             </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
            Get In <span className="text-[#15531B] italic font-serif px-3 rounded-lg mr-1 ml-1 ">Touch</span><br />
            With Us
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </section>

      {/* 2. Map Section (Full Width) */}
      <section className="w-full h-[400px] bg-gray-200 relative overflow-hidden">
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
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Contact Form */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-[#ffffff] text-2xl font-bold mb-8 bg-white/10 px-4 py-2 rounded-lg inline-block">Send Us A Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15531B] border border-transparent transition-all"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15531B] border border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15531B] border border-transparent transition-all"
                />
              </div>

              <div>
                <textarea 
                  placeholder="Message" 
                  rows={6}
                  className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#15531B] border border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#15531B] text-white font-bold text-lg py-4 rounded-full hover:bg-[#0e3d14] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
              >
                Send Now
              </button>
            </form>
          </div>

          {/* Right: Info Text */}
          <div className="space-y-6">
             <span className="inline-block px-4 py-1 rounded-full border border-[#15531B]/30 text-[#15531B] font-semibold text-sm bg-[#15531B]/5">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Get In Touch With <br />
              <span className="text-[#15531B] italic font-serif">ATV Roatan</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Have questions or need help planning your next trip? Contact us and let's make your travel experience hassle-free!
            </p>

            <div className="pt-6">
              <h4 className="text-xl font-bold text-[#1a1a1a] mb-4">Why Reach Out To Us?</h4>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Personalized Travel Planning",
                  "Fast & Secure Booking",
                  "24/7 Customer Support",
                  "Local Travel Experts",
                  "Exclusive Travel Deals"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-[#15531B] shrink-0 fill-[#15531B]/10" />
                    <span className="text-[#1a1a1a] font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#1a1a1a] text-xl font-bold mb-3">Office Address</h4>
            <p className="text-gray-600 text-sm mb-8 h-10">
              Prefer to visit our office? Our travel experts are ready to assist you.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#15531B]/10 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-[#15531B]" />
              </div>
              <span className="text-[#1a1a1a] font-semibold">Roatan, Honduras</span>
            </div>
          </div>

          {/* Card 2: Message Us */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#1a1a1a] text-xl font-bold mb-3">Message Us</h4>
            <p className="text-gray-600 text-sm mb-8 h-10">
              Send us your travel queries, and our team will reply as soon as possible!
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#15531B]/10 flex items-center justify-center shrink-0">
                <Mail size={24} className="text-[#15531B]" />
              </div>
              <span className="text-[#1a1a1a] font-semibold break-all">info@atvroatan.com</span>
            </div>
          </div>

          {/* Card 3: Call Us */}
          <div className="bg-[#f8faf9] border border-[#e9edea] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#1a1a1a] text-xl font-bold mb-3">Call Us Now</h4>
            <p className="text-gray-600 text-sm mb-8 h-10">
              Need assistance? Call us, and we'll make your travel planning hassle-free!
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#15531B]/10 flex items-center justify-center shrink-0">
                <Phone size={24} className="text-[#15531B]" />
              </div>
              <span className="text-[#1a1a1a] font-semibold">+504 1234-5678</span>
            </div>
          </div>

        </div>
      </section>

      

    </main>
  );
};

export default ContactPage;
