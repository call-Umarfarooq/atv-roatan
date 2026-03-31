import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, ChevronRight, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full  overflow-x-hidden">
      {/* Top CTA Section */}
      <section 
        className="relative text-center py-16 md:py-24 px-5 sm:px-6 bg-no-repeat bg-center"
        style={{ 
          backgroundImage: "url('/images/footer-backgroud.jpeg')",
          backgroundSize: "100% 100%"
        }}
      >
        <div className="max-w-4xl mx-auto  rounded-2xl p-6 sm:p-10   shadow-2xl">
          <h2 className="sm:text-3xl sm:font-bold text-[24px] font-bold text-white mb-3 md:mb-4 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
           Book the <span className="text-[#4ade80] italic">Best</span> Adventure Tours in Roatan Today
          </h2>
          <p className="text-gray-100 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
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

      {/* Main Footer Section */}
      <div className="relative bg-[#00694B] text-white pb-12   px-5 sm:px-6">
        
        {/* Left Side Decoration - Tree & Sloth (Now using transparent PNG) */}
        <img 
          src="/images/bg-trans.png" 
          alt="Jungle decoration left" 
          className="absolute left-[-2rem] md:left-0 bottom-0 w-[200px] sm:w-[100px] md:w-[250px] lg:w-[280px] object-contain z-20 pointer-events-none drop-shadow-2xl mix-blend-normal"
        />

        {/* Right Side Decoration - ATVs */}
        <div className="absolute right-[-10%] sm:right-0 top-0 bottom-0 w-[120%] sm:w-[70%] md:w-[55%] lg:w-[48%] xl:w-[40%] z-0 pointer-events-none">
          <img 
            src="/images/footer-rightside.png" 
            alt="ATV riders" 
            className="w-full h-full object-cover object-left md:opacity-100"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)'
            }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full md:w-[65%] lg:w-[60%] xl:w-[70%] px-2 sm:px-2 md:px-1">
          
          {/* Texts Flex Container - properly spaced to slide behind the absolute decoration image */}
          <div className="w-full flex flex-col md:flex-row justify-between gap-10 sm:gap-8 relative z-10 pt-4 pr-4 sm:pr-8 md:pr-12 pl-[40px] sm:pl-[80px] md:pl-[120px] lg:pl-[140px] xl:pl-[160px]">
            
            {/* Column 1: Brand & Contact */}
            <div className="footer-col shrink-0 min-w-[200px] max-w-[280px]">
              <div className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight italic">
                 ATV Roatan
              </div>
              <div className="flex flex-col gap-4 text-white/90 text-sm leading-relaxed">
                  <Link href={"https://maps.app.goo.gl/aZUsRT1JTetqxSrg7"} target="_blank" className="flex items-start gap-3 hover:text-white transition-colors">
                      <MapPin size={18} className="shrink-0 mt-0.5" />
                      <p>Roatan Adventure Park, 34101 Coxen Hole, Roatan, Honduras</p>
                  </Link>
              </div>
              <div className="flex gap-4 mt-6 md:mt-8">
                <a href="https://www.facebook.com/atvjungletoursroatan" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://x.com/AtvPark" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="https://www.instagram.com/atvjungletours" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Easy Links */}
            <div className="footer-col shrink-0 min-w-[150px]">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-8">Easy Links</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><Link href="/" className="text-white/80 font-medium hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem] uppercase">Home</Link></li>
                <li><Link href="/tours" className="text-white/80 font-medium hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem] uppercase">All Tours</Link></li>
                <li><Link href="/gift-cards" className="text-white/80 font-medium hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem] uppercase">Gift Cards</Link></li>
                <li><Link href="https://maps.app.goo.gl/aZUsRT1JTetqxSrg7" target="_blank" className="text-white/80 font-medium hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem] uppercase">Reviews</Link></li>
                <li><Link href="/contact" className="text-white/80 font-medium hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem] uppercase">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Support Links */}
            <div className="footer-col shrink-0 min-w-[150px]">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-8">Support Links</h3>
                <ul className="space-y-3 md:space-y-4">
              <li><Link href="/help" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Help Center</Link></li>
              <li><Link href="/faqs" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">FAQs</Link></li>
              <li><Link href="/booking" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Booking</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Privacy Policy</Link></li>
              <li><Link href="/support" className="text-white/70 hover:text-white hover:pl-2 transition-all text-sm md:text-[0.95rem]">Online Support</Link></li>
            </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#00694B] border-t border-white/10 px-5 sm:px-6 py-6 md:py-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs text-white/50 gap-2 sm:gap-4 lg:pl-[350px]">
          <p>&copy; 2026 Roatan ATV Buggy Tours</p>
          <p className="hidden sm:block">Copyright &copy; 2026. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
