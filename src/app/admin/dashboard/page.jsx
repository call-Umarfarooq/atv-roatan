
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, MoreVertical } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function DashboardPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch('/api/tours');
        const data = await res.json();
        if (data.success) {
          setTours(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const handleDelete = async (slug) => {
      if(!confirm('Are you sure you want to delete this tour?')) return;
      
      try {
          const res = await fetch(`/api/tours/${slug}`, { method: 'DELETE' });
          if(res.ok) {
              setTours(prev => prev.filter(t => t.slug !== slug));
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
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Experiences</h1>
            <p className="text-gray-500">Manage your tours and activities</p>
        </div>
        <Link 
            href="/admin/tours/new"
            className="bg-[#15531B] hover:bg-[#006966] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
            <Plus size={18} /> Add New Experience
        </Link>
      </div>

      {/* Stats Cards (Optional for "CMS feel") */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Experiences</h3>
              <p className="text-3xl font-bold text-[#1a1a1a]">{tours.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Bookings</h3>
              <p className="text-3xl font-bold text-[#1a1a1a]">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-[#1a1a1a]">$0</p>
          </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-[#1a1a1a]">All Tours</h2>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search tours..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#15531B]" />
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Duration</th>
                        <th className="px-6 py-4">Featured</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                    ) : tours.length === 0 ? (
                        <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No tours found. Create one!</td></tr>
                    ) : (
                        tours.map(tour => (
                            <tr key={tour._id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                            <img src={getImageUrl(tour.image_url)} alt="" className="w-full h-full object-cover" />
                                        </div>
                                            <Link href={`/roatan/${tour.slug}`} target="_blank" className="hover:text-[#15531B] transition-colors block">
                                                <div className="font-medium text-[#1a1a1a] truncate max-w-[200px]">{tour.title}</div>
                                                <div className="text-xs text-gray-500 hover:underline">{tour.slug}</div>
                                            </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-[#1a1a1a]">${tour.base_price}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{tour.duration}</td>
                                <td className="px-6 py-4">
                                    {tour.is_featured ? (
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Featured</span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Standard</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/tours/${tour.slug}/edit`}>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(tour.slug)}
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
