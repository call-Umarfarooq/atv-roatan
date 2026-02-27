import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, ChevronRight, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top CTA Section */}
      <section 
        className="relative text-center py-16 md:py-24 px-5 sm:px-6 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(18, 18, 18, 1)), url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200')" 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 md:mb-4 leading-tight">
           Book the <span className="text-[#00694B] italic">Best</span> Adventure Tours in Roatan Today
          </h2>
          <p className="text-gray-300 md:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            Reserve your spot now and experience the thrill, culture, and beauty of Honduras with professional local guides you can trust. Small groups. Limited availability.
          </p>
          <Link 
            href="/claim-gift" 
            className="inline-flex items-center gap-2 bg-[#00694B] hover:bg-[#005a40] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Let's Get Started <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* Middle Grid Section */}
      <div className="bg-[#00694B] text-white py-12 md:py-20 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-24">
          
          {/* Column 1: Brand & Contact */}
          <div className="footer-col col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight italic">
               ATV Roatan
            </div>
            <div className="flex flex-col gap-4 text-white/80 text-sm leading-relaxed max-w-xs">
                <Link href={"https://www.google.com/maps/place/ATV+Dune+Buggy+ROATAN+Eco-Jungle+Adventure+Tours/@16.3456999,-86.4813591,17z/data=!4m6!3m5!1s0x8f69e5bf4a59efa3:0xa0efd3ab20c41c7e!8m2!3d16.3456999!4d-86.4787842!16s%2Fg%2F11g8wgzth0?entry=tts&g_ep=EgoyMDI1MDgxNy"} className="flex items-start gap-3 hover:text-white transition-colors">
                    <MapPin size={18} className="shrink-0 mt-0.5" />
                    <p>Roatan Adventure Park, 34101 Coxen Hole, Roatan, Honduras</p>
                </Link>
            </div>
            <div className="flex gap-4 mt-6 md:mt-8">
              <a href="https://www.facebook.com/atvjungletoursroatan" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/AtvPark" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/atvjungletours" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Easy Links */}
          <div className="footer-col">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-8">Easy Links</h3>
            <ul className="space-y-3 md:space-y-4">
              <li><Link href="/" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Home</Link></li>
              <li><Link href="/tours" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">All Tours</Link></li>
              <li><Link href="https://maps.app.goo.gl/aZUsRT1JTetqxSrg7" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Reviews</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="footer-col">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-8">Support Links</h3>
            <ul className="space-y-3 md:space-y-4">
              <li><Link href="/help" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Help Center</Link></li>
              <li><Link href="/booking" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Booking</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Privacy Policy</Link></li>
              <li><Link href="/support" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Online Support</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#00694B] border-t border-white/10 px-5 sm:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs text-white/50 gap-2 sm:gap-4">
          <p>&copy; 2026 Roatan ATV Buggy Tours</p>
          <p className="hidden sm:block">Copyright &copy; 2026. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
