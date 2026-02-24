import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Tour from "@/models/Tour";
import TourCard from '@/components/TourCard';
import { notFound } from 'next/navigation';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function CategoryDetailPage({ params }) {
  await dbConnect();
  const { slug } = await params;

  // 1. Fetch Category
  const category = await Category.findOne({ slug }).lean();
  if (!category) {
    notFound();
  }

  // 2. Fetch associated tours
  const tours = await Tour.find({ categories: category._id }).sort({ createdAt: -1 }).lean();

  // Serialization
  const serializedCategory = JSON.parse(JSON.stringify(category));
  const serializedTours = JSON.parse(JSON.stringify(tours));

  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-[#15531B]">Home</Link>
                <ChevronRight size={14} />
                <Link href="/category" className="hover:text-[#15531B]">Categories</Link>
                <ChevronRight size={14} />
                <span className="text-[#1a1a1a] font-medium">{serializedCategory.name}</span>
            </nav>
            <Link href="/category" className="flex items-center gap-2 text-sm font-bold text-[#15531B] hover:underline">
                <ArrowLeft size={16} /> Back to All Categories
            </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">{serializedCategory.name}</h1>
            <div className="max-w-3xl">
                <p className="text-gray-600 text-lg leading-relaxed">
                    {serializedCategory.description || `Explore our curated selection of ${serializedCategory.name} tours in Roatan. We work with the best local guides to ensure you have an unforgettable experience.`}
                </p>
            </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serializedTours.map((tour) => (
                <div key={tour._id} className="h-full">
                    <TourCard
                        slug={tour.slug}
                        image={tour.image_url}
                        gallery={tour.gallery}
                        location={tour.location_text || tour.marketing_badges?.location_text || 'Roatan, Honduras'}
                        title={tour.title}
                        rating={tour.marketing_badges?.stars || '0'}
                        reviews={tour.marketing_badges?.reviews_text?.replace(/\D/g, '') || '0'}
                        price={tour.adultPrice || tour.base_price || '0'}
                        duration={tour.duration}
                        description={tour.overview || tour.description}
                        additionalInfo={tour.additional_info}
                        cutoff_price={tour.cutoff_price}
                    />
                </div>
            ))}
        </div>

        {serializedTours.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="mb-4 text-gray-400">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">No tours found</h3>
                <p className="text-gray-500 mt-2">We haven't added any tours to this category yet. Check back soon!</p>
                <Link href="/" className="mt-8 inline-block bg-[#15531B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#006966] transition-colors">
                    Browse All Adventures
                </Link>
            </div>
        )}
      </div>
    </main>
  );
}
