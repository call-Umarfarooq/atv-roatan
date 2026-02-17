"use client";
import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            
            {/* Menu Items */}
            <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                
                {/* Phone */}
                <div className="flex items-center gap-3">
                    <span className="bg-white px-2 py-1 rounded text-sm font-medium shadow-sm text-gray-700">Phone</span>
                    <a 
                        href="tel:+50412345678" 
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                        <Phone size={20} />
                    </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                    <span className="bg-white px-2 py-1 rounded text-sm font-medium shadow-sm text-gray-700">WhatsApp</span>
                    <Link 
                        href="https://wa.me/50412345678" 
                        target="_blank"
                        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </Link>
                </div>

            </div>

            {/* Main Toggle Button */}
            <div className="flex items-center gap-3">
                {!isOpen && (
                    <div 
                        onClick={toggleOpen}
                        className="bg-white px-5 py-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-[15px] font-semibold text-[#1a1a1a] cursor-pointer hover:bg-gray-50 transition-colors animate-fadeIn whitespace-nowrap flex items-center gap-2"
                    >
                        Chat with us <span className="text-xl">👋</span>
                    </div>
                )}
                <button 
                    onClick={toggleOpen}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,194,255,0.4)] transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-white text-gray-800 rotate-90' : 'bg-[#00C2FF] text-[#1a1a1a]'}`}
                >
                    {isOpen ? <X size={24} /> : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#1a1a1a" stroke="none">
                           <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                       </svg>
                    )}
                </button>
            </div>

        </div>
    );
};

export default WhatsAppButton;
