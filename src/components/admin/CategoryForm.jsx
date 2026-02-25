"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function CategoryForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    image_alt: '',
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
          ...prev,
          ...initialData,
          image: initialData.image || '',
          image_alt: initialData.image_alt || '',
          meta_title: initialData.meta_title || '',
          meta_description: initialData.meta_description || '',
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
        const newData = { ...prev, [name]: value };
        if (name === 'name') newData.slug = generateSlug(value);
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
      const res = await fetch('/api/upload', { method: 'POST', body: data });
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
      {/* Top Bar */}
      <div className="flex justify-between items-center sticky top-0 bg-gray-50 z-10 py-4 border-b border-gray-200 mb-8 backdrop-blur-sm bg-opacity-90">
         <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Category' : 'New Category'}</h1>
         <div className="flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button
                type="submit"
                disabled={loading || uploading}
                className="bg-[#00694B] hover:bg-[#005a3c] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
                <Save size={18} /> {loading ? 'Saving...' : 'Save Category'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Category Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Category Details</h2>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a]" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Slug <span className="text-gray-400 font-normal text-xs">(auto-generated, editable)</span>
                      </label>
                      <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">/category/</span>
                          <input required name="slug" value={formData.slug} onChange={handleChange} className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a] font-mono text-sm" />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a]"
                        placeholder="Enter category description..."
                      />
                  </div>
              </div>
          </div>

          {/* SEO */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-1">SEO</h2>
              <p className="text-xs text-gray-400 mb-4">Controls how this category appears in search engine results.</p>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Title <span className="text-gray-400 font-normal text-xs">(recommended: 50â€“60 chars)</span>
                      </label>
                      <input
                          name="meta_title"
                          value={formData.meta_title}
                          onChange={handleChange}
                          placeholder={formData.name || 'Page title for search engines'}
                          maxLength={60}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a]"
                      />
                      <p className="text-xs text-gray-400 mt-1 text-right">{(formData.meta_title || '').length}/60</p>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Description <span className="text-gray-400 font-normal text-xs">(recommended: 150â€“160 chars)</span>
                      </label>
                      <textarea
                          name="meta_description"
                          value={formData.meta_description}
                          onChange={handleChange}
                          placeholder="Brief description for search engines"
                          maxLength={160}
                          rows={3}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a] resize-none"
                      />
                      <p className="text-xs text-gray-400 mt-1 text-right">{(formData.meta_description || '').length}/160</p>
                  </div>
              </div>
          </div>

        </div>

        {/* Right Sidebar â€” Media */}
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Media</h2>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                    <div className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-[#00694B] transition-colors">
                        {formData.image ? (
                            <img src={getImageUrl(formData.image)} alt={formData.image_alt || formData.name || 'Category'} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center text-gray-400">
                                <ImageIcon className="mx-auto mb-2" />
                                <span className="text-xs">Upload Image</span>
                            </div>
                        )}
                        <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                    {uploading && <p className="text-xs text-gray-500 mt-1 text-center animate-pulse">Uploading...</p>}
                </div>

                {/* Alt Text */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Image Alt Text</label>
                    <input
                        name="image_alt"
                        value={formData.image_alt}
                        onChange={handleChange}
                        placeholder="Describe the image for SEO & accessibility"
                        className="w-full p-2 border rounded-lg text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none"
                    />
                </div>
            </div>
        </div>

      </div>
    </form>
  );
}

