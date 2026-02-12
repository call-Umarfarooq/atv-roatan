"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, X } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function ActivityForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
          ...prev,
          ...initialData,
      }));
    }
  }, [initialData]);

  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
        const newData = {
            ...prev,
            [name]: value
        };

        if (name === 'title') {
            newData.slug = generateSlug(value);
        }

        return newData;
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();

      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
          alert('Upload failed');
      }
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
      const url = isEdit ? `/api/activities/${initialData.slug}` : '/api/activities';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = { ...formData };
      if (isEdit) {
          delete payload._id;
          delete payload.createdAt;
          delete payload.updatedAt;
          delete payload.__v;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/activities');
        router.refresh();
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex justify-between items-center sticky top-0 bg-gray-50 z-10 py-4 border-b border-gray-200 mb-8 backdrop-blur-sm bg-opacity-90">
         <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Activity' : 'New Activity'}</h1>
         <div className="flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button 
                type="submit" 
                disabled={loading || uploading}
                className="bg-[#008481] hover:bg-[#006966] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
                <Save size={18} /> {loading ? 'Saving...' : 'Save Activity'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Basic Information</h2>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008481] focus:border-transparent outline-none text-[#1a1a1a]" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                          <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 text-gray-500" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea required name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008481] focus:border-transparent outline-none text-[#1a1a1a]" />
                      </div>
                  </div>
              </div>
          </div>

          <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Media</h2>
                  <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                      <div className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-[#008481] transition-colors">
                          {formData.image ? (
                              <img src={getImageUrl(formData.image)} alt="Main" className="w-full h-full object-cover" />
                          ) : (
                              <div className="text-center text-gray-400">
                                  <ImageIcon className="mx-auto mb-2" />
                                  <span className="text-xs">Upload Image</span>
                              </div>
                          )}
                          <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </form>
  );
}
