"use client";
import React, { useEffect, useState } from 'react';
import { Check, X, Eye, EyeOff, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const toggleVisibility = async (slug, currentStatus) => {
    setUpdating(slug);
    try {
      const res = await fetch(`/api/categories/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_on_home: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
        setCategories(prev => prev.map(c => 
          c.slug === slug ? { ...c, show_on_home: !currentStatus } : c
        ));
      } else {
        alert('Failed to update category visibility.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating.');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Featured Categories</h1>
          <p className="text-gray-500">Pick which categories appear on the homepage</p>
        </div>
        <Link 
            href="/admin/categories"
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
            <LayoutTemplate size={16} /> Manage Categories
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-[#1a1a1a] text-sm uppercase">Home Page Categories</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
              <thead className="bg-white border-b border-gray-100 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                      <th className="px-6 py-4">Category Name</th>
                      <th className="px-6 py-4">Slug</th>
                      <th className="px-6 py-4 text-center">Visible on Home</th>
                      <th className="px-6 py-4 text-right">Action</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {loading ? (
                      <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading Categories...</td></tr>
                  ) : categories.length === 0 ? (
                      <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No categories found.</td></tr>
                  ) : (
                      categories.map(category => (
                          <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-[#1a1a1a]">{category.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                              <td className="px-6 py-4 text-center">
                                  {category.show_on_home !== false ? (
                                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                          <Check size={12} /> Yes
                                      </span>
                                  ) : (
                                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs font-bold">
                                          <X size={12} /> No
                                      </span>
                                  )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <button
                                      onClick={() => toggleVisibility(category.slug, category.show_on_home !== false)}
                                      disabled={updating === category.slug}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 justify-center ml-auto transition-colors disabled:opacity-50 ${
                                        category.show_on_home !== false 
                                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                        : 'bg-[#00694B]/10 text-[#00694B] hover:bg-[#00694B]/20'
                                      }`}
                                  >
                                      {updating === category.slug ? (
                                        "Updating..."
                                      ) : category.show_on_home !== false ? (
                                        <><EyeOff size={14} /> Hide</>
                                      ) : (
                                        <><Eye size={14} /> Show</>
                                      )}
                                  </button>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
