
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch('/api/activities');
        const data = await res.json();
        if (data.success) {
          setActivities(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const handleDelete = async (slug) => {
      if(!confirm('Are you sure you want to delete this activity?')) return;
      
      try {
          const res = await fetch(`/api/activities/${slug}`, { method: 'DELETE' });
          if(res.ok) {
              setActivities(prev => prev.filter(a => a.slug !== slug));
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
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Activities</h1>
            <p className="text-gray-500">Manage your activities</p>
        </div>
        <Link 
            href="/admin/activities/new"
            className="bg-[#008481] hover:bg-[#006966] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
            <Plus size={18} /> Add New Activity
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-[#1a1a1a]">All Activities</h2>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search activities..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#008481]" />
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                    ) : activities.length === 0 ? (
                        <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No activities found. Create one!</td></tr>
                    ) : (
                        activities.map(activity => (
                            <tr key={activity._id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                            <img src={getImageUrl(activity.image)} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="font-medium text-[#1a1a1a] truncate max-w-[200px]">{activity.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{activity.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/activities/${activity.slug}/edit`}>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-600 transition-colors" title="Edit">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(activity.slug)}
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
