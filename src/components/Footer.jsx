import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full font-sans">
      {/* Top CTA Section */}
      <section 
        className="relative text-center py-24 px-6 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(18, 18, 18, 1)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200')" 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Get <span className="text-[#00694B] italic">Closer</span> With Us & Get Special Promo
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Ready for an adrenaline rush? Join our professional guides for the ultimate ATV adventure across Roatan's breathtaking landscapes.
          </p>
          <Link 
            href="#" 
            className="inline-flex items-center gap-2 bg-[#00694B] hover:bg-[#005a40] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Let's Get Started <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* Middle Grid Section */}
      <div className="bg-[#00694B] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Column 1: Brand & Contact */}
          <div className="footer-col">
            <div className="text-3xl font-bold mb-6 tracking-tight italic">
               atv Roatan
            </div>
            <div className="flex flex-col gap-4 text-white/80 text-sm leading-relaxed max-w-xs">
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="shrink-0 mt-0.5" />
                    <p>Roatan, Honduras — Jl. Adventure Way,<br />No. 11 West End, 31588</p>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Easy Links */}
          <div className="footer-col">
            <h3 className="text-lg font-bold mb-8">Easy Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Home</Link></li>
              <li><Link href="/activities" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">All Tours</Link></li>
              <li><Link href="/reviews" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Reviews</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="footer-col">
            <h3 className="text-lg font-bold mb-8">Support Links</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Help Center</Link></li>
              <li><Link href="/booking" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Booking</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Privacy Policy</Link></li>
              <li><Link href="/support" className="text-white/70 hover:text-white hover:pl-2 transition-all text-[0.95rem]">Online Support</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#00694B] border-t border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>© 2026 Roatan ATV Buggy Tours</p>
          <p>Copyright © 2026. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

