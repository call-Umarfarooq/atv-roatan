"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

export default function CategoryForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
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

        if (name === 'name') {
            newData.slug = generateSlug(value);
        }

        return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/categories/${initialData.slug}` : '/api/categories';
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
        router.push('/admin/categories');
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
         <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Category' : 'New Category'}</h1>
         <div className="flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button 
                type="submit" 
                disabled={loading}
                className="bg-[#008481] hover:bg-[#006966] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
                <Save size={18} /> {loading ? 'Saving...' : 'Save Category'}
            </button>
         </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Category Details</h2>
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008481] focus:border-transparent outline-none text-[#1a1a1a]" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50 text-gray-500" />
              </div>
          </div>
      </div>
    </form>
  );
}
