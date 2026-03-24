"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl } from '@/utils/imageUrl';

export default function GiftCardsAdmin() {
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/gift-cards')
      .then(res => res.json())
      .then(data => {
        if (data.success) setGiftCards(data.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gift card?')) return;
    try {
      const res = await fetch(`/api/admin/gift-cards/${id}`, { method: 'DELETE' });
      if (res.ok) setGiftCards(prev => prev.filter(g => g._id !== id));
    } catch (error) {
      alert('Error deleting gift card');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Gift Cards</h1>
        <Link 
          href="/admin/gift-cards/new" 
          className="bg-[#00694B] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#005a3c]"
        >
          <Plus size={20} /> New Gift Card
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-700 font-medium">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Template</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Value</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {giftCards.map(gc => (
                <tr key={gc._id} className="hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-4">
                    {gc.image ? (
                        <img src={getImageUrl(gc.image)} alt={gc.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded"></div>
                    )}
                    <div>
                      <p className="font-bold text-[#1a1a1a]">{gc.title}</p>
                    </div>
                  </td>
                  <td className="p-4 text-center font-medium text-gray-800">${gc.price}</td>
                  <td className="p-4 text-center font-bold text-[#00694B]">${gc.value}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${gc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {gc.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/admin/gift-cards/${gc._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                         <Edit size={18} />
                       </Link>
                       <button onClick={() => handleDelete(gc._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {giftCards.length === 0 && (
                <tr>
                   <td colSpan="5" className="p-8 text-center text-gray-500">No gift cards found. Create one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
