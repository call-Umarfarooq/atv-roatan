import React from 'react';
import Link from 'next/link';
import { Facebook } from 'lucide-react';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';
import Image from 'next/image';

const ReviewLinks = () => {
  return (
    <section className="pb-10  bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <StaggeredTextReveal 
          el="h2" 
          className="h11 text-[#1a1a1a] mb-6 md:mb-8 font-uber-move" 
          text="Reviews for Us" 
        />
        
        {/* Buttons: grid on mobile (1 col or 2 col), flex row on md+ */}
        <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-sm sm:max-w-none mx-auto">
          
          {/* Google */}
          <Link 
            href="https://www.google.com/search?sca_esv=73000156de4ea350&rlz=1C1CHBD_enPK1126PK1126&sxsrf=ANbL-n5MmUnpMDjXyJfPyJUYVcTcg-3kyg:1772554722832&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOcTqWYuu_4iSFQ6DuVj-k0LjpBSwoGjRevmBLZdx0ItZMldeWV5oGGpNGJdgJdpajG_Xw4oxi51-nTVOLdA7ZC8t0PDRtpACHG08OUrbIeA7ClNNXAd5HBI5kMwYodSOSreXa34%3D&q=Roatan+ATV,+Buggy+%26+GolfCart+Adventure+Tours+Reviews&sa=X&ved=2ahUKEwjwu-X0kISTAxWuTqQEHWbFMtAQ0bkNegQIJBAH#lrd=0x8f69e5bf4a59efa3:0xa0efd3ab20c41c7e,3" 
            target="_blank"
            className="group flex items-center justify-center gap-1   px-6  md:px-8 rounded-full border-2 border-[#EA4335] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className=" text-[#1a1a1a] buttontext">Google</span>
          </Link>

          {/* TripAdvisor */}
          <Link 
            href="https://www.tripadvisor.com/Attraction_Review-g292019-d14192427-Reviews-ATV_Buggy_Jungle_Tours-Roatan_Bay_Islands.html" 
            target="_blank"
            className="group flex items-center justify-center gap-1  sm:gap-2.5 px-6 py-1.5 md:px-8  rounded-full border-2 border-[#00aa6c] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
             <Image src="/images/tripadviser.png" alt="TripAdvisor" width={20} height={20} className="shrink-0" />
             <span className="buttontext text-[#1a1a1a] ">TripAdvisor</span>
          </Link>

          {/* Facebook */}
          <Link 
            href="https://www.facebook.com/atvjungletoursroatan/" 
            target="_blank"
            className="group flex items-center justify-center gap-1  sm:gap-2.5 px-6 py-1.5 md:px-8  rounded-full border-2 border-[#1877F2] bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <Facebook className="w-4 h-4  text-[#1877F2] fill-[#1877F2] shrink-0" />
            <span className="buttontext text-[#1a1a1a] ">Facebook</span>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default ReviewLinks;

