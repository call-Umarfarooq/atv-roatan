"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, MapPin, ExternalLink } from 'lucide-react';

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch('/api/locations');
        const data = await res.json();
        if (data.success) setLocations(data.data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLocations(prev => prev.filter(l => l._id !== id));
      } else {
        alert('Failed to delete location.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting location.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Locations</h1>
          <p className="text-gray-500">Manage pickup & drop-off locations</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-[#1a1a1a]">All Locations ({locations.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Google Maps</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : locations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No locations found.</td>
                </tr>
              ) : (
                locations.map(location => (
                  <tr key={location._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#00694B] shrink-0" />
                        <span className="font-medium text-[#1a1a1a]">{location.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        location.type === 'Hotel'
                          ? 'bg-blue-100 text-blue-700'
                          : location.type === 'Port'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {location.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {location.address || <span className="text-gray-300 italic">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      {location.google_maps_url ? (
                        <a
                          href={location.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center gap-1 text-sm"
                        >
                          View <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-gray-300 italic text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(location._id, location.name)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
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
