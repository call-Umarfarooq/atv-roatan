import React from 'react';
import Link from 'next/link';
import { Facebook } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

const ReviewLinks = () => {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <StaggeredTextReveal 
          el="h2" 
          className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1a1a1a] mb-6 md:mb-8 font-uber-move" 
          text="Reviews for Us" 
        />
        
        {/* Buttons: grid on mobile (1 col or 2 col), flex row on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-sm sm:max-w-none mx-auto">
          
          {/* Google */}
          <Link 
            href="https://www.google.com/maps/place/ATV+Dune+Buggy+ROATAN+Eco-Jungle+Adventure+Tours/@16.3456999,-86.4813591,17z/data=!4m6!3m5!1s0x8f69e5bf4a59efa3:0xa0efd3ab20c41c7e!8m2!3d16.3456999!4d-86.4787842!16s%2Fg%2F11g8wgzth0?entry=tts&g_ep=EgoyMDI1MDgxNy" 
            target="_blank"
            className="group flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-8 md:py-3 rounded-full border-2 border-[#EA4335] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-[#1a1a1a] text-base md:text-lg">Google</span>
          </Link>

          {/* TripAdvisor */}
          <Link 
            href="https://www.tripadvisor.com/Attraction_Review-g292019-d14192427-Reviews-ATV_Buggy_Jungle_Tours-Roatan_Bay_Islands.html" 
            target="_blank"
            className="group flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-8 md:py-3 rounded-full border-2 border-[#00aa6c] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
             <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-[#00aa6c] shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3zm10 0c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-2 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/> 
             </svg>
             <span className="font-bold text-[#1a1a1a] text-base md:text-lg">TripAdvisor</span>
          </Link>

          {/* Facebook */}
          <Link 
            href="https://www.facebook.com/atvjungletoursroatan/" 
            target="_blank"
            className="group flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-8 md:py-3 rounded-full border-2 border-[#1877F2] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <Facebook className="w-5 h-5 md:w-6 md:h-6 text-[#1877F2] fill-[#1877F2] shrink-0" />
            <span className="font-bold text-[#1a1a1a] text-base md:text-lg">Facebook</span>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default ReviewLinks;

