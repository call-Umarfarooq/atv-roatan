import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#15531B] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Brand */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Image
                              src="/images/atv-logo.png"
                              alt="ATV Roatan"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                </div>
                <p className="text-gray-300 leading-relaxed text-sm max-w-sm">
                    Roatan ATV Buggy and Golf Cart Adventure Tours is the premier operator for shore excursions in Roatan. Safety, fun, and authentic experiences are our guarantee.
                </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className="font-bold text-lg mb-6 font-serif">Quick Links</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                    <li><Link href="/activities" className="hover:text-white transition-colors">All Tours</Link></li>
                    <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
                 <h3 className="font-bold text-lg mb-6 font-serif">Contact</h3>
                 <ul className="space-y-4 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                        <Mail size={18} className="mt-0.5" />
                        <a href="mailto:info@roatanadventures.com" className="hover:text-white transition-colors">info@roatanadventures.com</a>
                    </li>
                    <li className="flex items-start gap-3">
                        <Phone size={18} className="mt-0.5" />
                        <a href="tel:+50412345678" className="hover:text-white transition-colors">+504 1234-5678</a>
                    </li>
                    <li className="flex items-start gap-3">
                        <MapPin size={18} className="mt-0.5" />
                        <span>Main Street, Roatan</span>
                    </li>
                 </ul>
            </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Roatan ATV Buggy Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
