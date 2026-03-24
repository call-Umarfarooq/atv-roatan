"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function GiftCardForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    value: '',
    image: '',
    is_active: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
         ...initialData,
         price: initialData.price || '',
         value: initialData.value || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else alert('Upload failed');
    } catch (err) {
      console.error(err);
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/gift-cards/${initialData._id}` : '/api/admin/gift-cards';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = { ...formData, price: Number(formData.price), value: Number(formData.value) };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        router.push('/admin/gift-cards');
        router.refresh();
      } else alert(data.error || 'Something went wrong');
    } catch (err) {
      alert('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20 p-8">
      <div className="flex justify-between items-center bg-gray-50 z-10 py-4 border-b border-gray-200 mb-8">
         <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Gift Card' : 'New Gift Card'}</h1>
         <div className="flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-200">Cancel</button>
            <button type="submit" disabled={loading || uploading} className="bg-[#00694B] text-white px-8 py-2 rounded-lg font-bold flex flex-col items-center">
                {loading ? 'Saving...' : 'Save'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Details</h2>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                      <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 text-gray-900 rounded-lg outline-none placeholder-gray-400 focus:border-[#00694B]" placeholder="$50 Gift Card" />
                  </div>
                  <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 text-gray-900 rounded-lg outline-none placeholder-gray-400 focus:border-[#00694B]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Purchase Price ($)</label>
                          <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 text-gray-900 rounded-lg outline-none placeholder-gray-400 focus:border-[#00694B]" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Gift Card Value ($)</label>
                          <input required type="number" step="0.01" name="value" value={formData.value} onChange={handleChange} className="w-full p-2 border border-gray-300 text-gray-900 rounded-lg outline-none placeholder-gray-400 focus:border-[#00694B]" />
                      </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                      <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-4 h-4 text-[#00694B] rounded focus:ring-[#00694B]" />
                      <label htmlFor="is_active" className="text-sm font-bold text-gray-700">Active (visible to customers)</label>
                  </div>
              </div>
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Image</h2>
                <div className="relative aspect-video rounded-lg bg-gray-50 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {formData.image ? (
                        <img src={getImageUrl(formData.image)} alt="Gift Card" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-gray-400">
                            <ImageIcon className="mx-auto mb-2" />
                            <span className="text-xs">Upload Image</span>
                        </div>
                    )}
                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
                {uploading && <p className="text-xs text-gray-500 mt-1 text-center">Uploading...</p>}
            </div>
        </div>
      </div>
    </form>
  );
}
