"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutGrid } from 'lucide-react';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#15531B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#15531B]">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#1a1a1a] font-medium">Categories</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">Explore Roatan by Category</h1>
            <p className="text-gray-600 text-lg max-w-2xl">
                Browse our curated collections of adventures. From thrilling ATV rides to relaxing beach excursions, find the perfect experience for your trip.
            </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <Link 
                    key={category._id} 
                    href={`/category/${category.slug}`}
                    className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-[#15531B] mb-6 group-hover:bg-[#15531B] group-hover:text-white transition-colors">
                        <LayoutGrid size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#15531B] transition-colors">{category.name}</h2>
                    <p className="text-gray-500 line-clamp-3 mb-6">
                        {category.description || `Discover our wide range of ${category.name} activities and make the most of your visit to Roatan.`}
                    </p>
                    <div className="flex items-center gap-2 text-[#15531B] font-bold text-sm">
                        Explore Category <ChevronRight size={16} />
                    </div>
                </Link>
            ))}
        </div>

        {categories.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">No categories found. Please check back later.</p>
            </div>
        )}
      </div>
    </main>
  );
}
