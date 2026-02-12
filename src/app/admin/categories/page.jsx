
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function CategoriesPage() {
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

  const handleDelete = async (slug) => {
      if(!confirm('Are you sure you want to delete this category?')) return;
      
      try {
          const res = await fetch(`/api/categories/${slug}`, { method: 'DELETE' });
          if(res.ok) {
              setCategories(prev => prev.filter(c => c.slug !== slug));
          } else {
              alert('Failed to delete');
          }
      } catch (err) {
          console.error(err);
          alert('Error deleting');
      }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Categories</h1>
            <p className="text-gray-500">Manage your categories</p>
        </div>
        <Link 
            href="/admin/categories/new"
            className="bg-[#008481] hover:bg-[#006966] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
            <Plus size={18} /> Add New Category
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-4xl">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-[#1a1a1a]">All Categories</h2>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search categories..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008481]" />
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                    ) : categories.length === 0 ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No categories found. Create one!</td></tr>
                    ) : (
                        categories.map(category => (
                            <tr key={category._id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-[#1a1a1a]">{category.name}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{category.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/categories/${category.slug}/edit`}>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(category.slug)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-red-500 transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
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
