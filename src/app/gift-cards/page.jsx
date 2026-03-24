import React from 'react';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';
import { getImageUrl } from '@/utils/imageUrl';
import Link from 'next/link';
import StaggeredTextReveal from '@/components/StaggeredTextReveal';

export const metadata = {
  title: 'Gift Cards | ATV Roatan',
  description: 'Purchase an ATV Roatan gift card for your friends or family.',
};

export default async function GiftCardsPage() {
  await dbConnect();
  const rawCards = await GiftCard.find({ is_active: true }).sort({ price: 1 }).lean();
  const giftCards = JSON.parse(JSON.stringify(rawCards));

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-[#00694B] text-white py-16 px-4 text-center">
         <StaggeredTextReveal el="h1" className="text-4xl md:text-5xl font-bold mb-4" text="Give the Gift of Adventure" />
         <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Surprise your loved ones with an unforgettable experience in Roatan. Our gift cards never expire and can be used on any tour!
         </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
         {giftCards.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                 <p className="text-gray-500">No gift cards are available at the moment. Please check back later.</p>
             </div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {giftCards.map(gc => (
                     <div key={gc._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                         <div className="relative aspect-video bg-gray-100 overflow-hidden border-b border-gray-100 p-6 flex flex-col items-center justify-center">
                            {gc.image ? (
                                <img src={getImageUrl(gc.image)} alt={gc.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00694B]/20 to-[#00694B]/80 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white tracking-widest uppercase drop-shadow-md">ATV Roatan</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            <div className="relative z-10 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-[#00694B] shadow-lg text-xl">
                                ${gc.value}
                            </div>
                         </div>
                         <div className="p-6 flex-1 flex flex-col">
                             <h3 className="font-bold text-xl text-[#1a1a1a] mb-2">{gc.title}</h3>
                             <p className="text-gray-500 text-sm mb-6 flex-1">{gc.description || `Redeemable for $${gc.value} towards any ATV Roatan adventure.`}</p>
                             
                             <div className="flex items-center justify-between mt-auto">
                                 <div className="font-bold text-2xl text-[#1a1a1a]">
                                     ${gc.price}
                                 </div>
                                 <Link 
                                    href={`/gift-cards/checkout?id=${gc._id}`}
                                    className="bg-[#00694B] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#005a3c] transition-colors shadow-md hover:shadow-lg"
                                 >
                                    Buy Now
                                 </Link>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </main>
  );
}
