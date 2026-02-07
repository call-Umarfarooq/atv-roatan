
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, X, Upload, Image as ImageIcon, Video } from 'lucide-react';


export default function TourForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration: '',
    base_price: '',
    adultPrice: '',
    adultAgeRange: '',
    childPrice: '',
    childAgeRange: '',
    min_age: '',
    max_guests: '',
    is_featured: false,
    image_url: '',
    gallery: [],
    itinerary: [],
    pickup_info: '',
    what_to_include: [],
    exclusions: [], // New
    cancellation_policy: '', // New
    meeting_point: '', // New
    faq: [],
    booking_options: {
        reserve_now_pay_later: false,
        free_cancellation: true,
        policy_text: 'up to 24 hours before the experience starts (local time)'
    }, 
    additional_info: [],
    tags: [],
    extraServices: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
          ...prev,
          ...initialData,
          booking_options: { ...prev.booking_options, ...(initialData.booking_options || {}) }
      }));
    }
  }, [initialData]);


  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')   // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
        const newData = {
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        };

        // Auto-generate slug if title changes
        if (name === 'title') {
            newData.slug = generateSlug(value);
        }

        return newData;
    });
  };

  const handleBookingOptionChange = (e) => {
      const { name, checked } = e.target;
      setFormData(prev => ({
          ...prev,
          booking_options: {
              ...prev.booking_options,
              [name]: checked
          }
      }));
  }

  // --- Array Handlers (Generic) ---
  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  // --- Complex Array Handlers (Itinerary, FAQ, Extra Services) ---
  const handleComplexArrayChange = (index, field, subField, value) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [subField]: value };
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addComplexItem = (field, initialObj) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], initialObj] }));
  };

  // --- File Upload ---
  const handleFileUpload = async (e, type = 'image') => {
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
        if (type === 'main') {
            setFormData(prev => ({ ...prev, image_url: result.url }));
        } else if (type === 'gallery') {
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, result.url] }));
        }
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
      const url = isEdit ? `/api/tours/${initialData.slug}` : '/api/tours';
      const method = isEdit ? 'PUT' : 'POST';

      // Sanitize payload: remove _id and system fields to prevent DB errors
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
        router.push('/admin/dashboard');
        router.refresh(); // Refresh server components
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
         <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Experience' : 'New Experience'}</h1>
         <div className="flex gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button 
                type="submit" 
                disabled={loading || uploading}
                className="bg-[#00aa6c] hover:bg-[#008f5b] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
                <Save size={18} /> {loading ? 'Saving...' : 'Save Experience'}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Basic Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Basic Information</h2>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00aa6c] focus:border-transparent outline-none text-[#1a1a1a]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00aa6c] focus:border-transparent outline-none text-[#1a1a1a]" placeholder="e.g. 4 hours" />
                        </div>
                      </div>

                      {/* Booking Options */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h3 className="text-sm font-bold text-gray-900 mb-3">Booking Options</h3>
                          <div className="space-y-3">
                              <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-[#00aa6c] transition-colors">
                                  <input type="checkbox" name="reserve_now_pay_later" checked={formData.booking_options.reserve_now_pay_later} onChange={handleBookingOptionChange} className="mt-1 w-4 h-4 text-[#00aa6c] rounded border-gray-300 focus:ring-[#00aa6c]" />
                                  <div>
                                      <span className="block text-sm font-bold text-gray-900">Reserve Now & Pay Later</span>
                                      <span className="block text-xs text-gray-500">Allow customers to book without immediate payment.</span>
                                  </div>
                              </label>

                              <div className="p-3 bg-white border border-gray-200 rounded-lg hover:border-[#00aa6c] transition-colors">
                                  <label className="flex items-start gap-3 cursor-pointer mb-2">
                                      <input type="checkbox" name="free_cancellation" checked={formData.booking_options.free_cancellation} onChange={handleBookingOptionChange} className="mt-1 w-4 h-4 text-[#00aa6c] rounded border-gray-300 focus:ring-[#00aa6c]" />
                                      <div>
                                          <span className="block text-sm font-bold text-gray-900">Free Cancellation</span>
                                          <span className="block text-xs text-gray-500">Allow customers to cancel for free.</span>
                                      </div>
                                  </label>
                                  
                                  {formData.booking_options.free_cancellation && (
                                      <div className="ml-7 mt-2">
                                          <label className="block text-xs font-bold text-gray-700 mb-1">Policy Text <span className="text-gray-400 font-normal">(shown in widget)</span></label>
                                          <input 
                                              name="policy_text" 
                                              value={formData.booking_options.policy_text || ''} 
                                              onChange={(e) => setFormData(prev => ({ ...prev, booking_options: { ...prev.booking_options, policy_text: e.target.value } }))}
                                              className="w-full p-2 border rounded text-sm text-[#1a1a1a]" 
                                              placeholder="e.g. up to 24 hours before..."
                                          />
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00aa6c] focus:border-transparent outline-none text-[#1a1a1a]" />
                      </div>
                  </div>
              </div>

               {/* Itinerary */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-[#1a1a1a]">Itinerary</h2>
                    <button type="button" onClick={() => addComplexItem('itinerary', { title: '', description: '', duration: '' })} className="text-[#00aa6c] text-sm font-bold flex items-center gap-1"><Plus size={16} /> Add Stop</button>
                  </div>
                  <div className="space-y-4">
                      {formData.itinerary.map((stop, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-lg relative group">
                              <button type="button" onClick={() => removeArrayItem(i, 'itinerary')} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16}/></button>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                  <input placeholder="Stop Title" value={stop.title} onChange={(e) => handleComplexArrayChange(i, 'itinerary', 'title', e.target.value)} className="p-2 border rounded bg-white text-[#1a1a1a]" />
                                  <input placeholder="Duration" value={stop.duration} onChange={(e) => handleComplexArrayChange(i, 'itinerary', 'duration', e.target.value)} className="p-2 border rounded bg-white text-[#1a1a1a]" />
                              </div>
                              <textarea placeholder="Description" value={stop.description} onChange={(e) => handleComplexArrayChange(i, 'itinerary', 'description', e.target.value)} className="w-full p-2 border rounded bg-white text-[#1a1a1a]" rows={2} />
                          </div>
                      ))}
                  </div>
              </div>

              {/* What's Included & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-[#1a1a1a]">Included</h2>
                        <button type="button" onClick={() => addArrayItem('what_to_include')} className="text-[#00aa6c] text-sm font-bold"><Plus size={16} /></button>
                      </div>
                      <div className="space-y-2">
                          {formData.what_to_include.map((item, i) => (
                              <div key={i} className="flex gap-2">
                                  <input value={item} onChange={(e) => handleArrayChange(i, e.target.value, 'what_to_include')} className="flex-1 p-2 border rounded-lg text-[#1a1a1a]" />
                                  <button type="button" onClick={() => removeArrayItem(i, 'what_to_include')} className="text-gray-400 hover:text-red-500"><X size={18}/></button>
                              </div>
                          ))}
                      </div>
                  </div>

                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-red-600">Not Included</h2>
                        <button type="button" onClick={() => addArrayItem('exclusions')} className="text-red-500 text-sm font-bold"><Plus size={16} /></button>
                      </div>
                      <div className="space-y-2">
                          {formData.exclusions.map((item, i) => (
                              <div key={i} className="flex gap-2">
                                  <input 
                                    value={item} 
                                    onChange={(e) => handleArrayChange(i, e.target.value, 'exclusions')} 
                                    className="flex-1 p-2 border rounded-lg text-[#1a1a1a] placeholder-gray-400"
                                    placeholder="e.g. Lunch, Gratuities"
                                  />
                                  <button type="button" onClick={() => removeArrayItem(i, 'exclusions')} className="text-gray-400 hover:text-red-500"><X size={18}/></button>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

               {/* Policies & FAQ */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Policies & FAQ</h2>
                   
                   <div className="mb-6">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
                        <textarea name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} rows={3} className="w-full p-2 border rounded-lg text-[#1a1a1a]" placeholder="e.g. Free cancellation up to 24 hours in advance." />
                   </div>

                   <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-700">FAQ</label>
                        <button type="button" onClick={() => addComplexItem('faq', { question: '', answer: '' })} className="text-[#00aa6c] text-sm font-bold flex items-center gap-1"><Plus size={16} /> Add Question</button>
                      </div>
                      <div className="space-y-4">
                          {formData.faq.map((item, i) => (
                              <div key={i} className="p-4 bg-gray-50 rounded-lg relative group">
                                   <button type="button" onClick={() => removeArrayItem(i, 'faq')} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16}/></button>
                                   <input placeholder="Question" value={item.question} onChange={(e) => handleComplexArrayChange(i, 'faq', 'question', e.target.value)} className="w-full p-2 border rounded-lg mb-2 text-[#1a1a1a]" />
                                   <textarea placeholder="Answer" value={item.answer} onChange={(e) => handleComplexArrayChange(i, 'faq', 'answer', e.target.value)} className="w-full p-2 border rounded-lg text-[#1a1a1a]" rows={2} />
                              </div>
                          ))}
                      </div>
                   </div>
               </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
              
              {/* Media */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Media</h2>
                  
                  {/* Main Image */}
                  <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                      <div className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-[#00aa6c] transition-colors">
                          {formData.image_url ? (
                              <img src={formData.image_url} alt="Main" className="w-full h-full object-cover" />
                          ) : (
                              <div className="text-center text-gray-400">
                                  <ImageIcon className="mx-auto mb-2" />
                                  <span className="text-xs">Upload Image</span>
                              </div>
                          )}
                          <input type="file" onChange={(e) => handleFileUpload(e, 'main')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                      </div>
                  </div>

                  {/* Gallery */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gallery</label>
                      <div className="grid grid-cols-3 gap-2">
                          {formData.gallery.map((img, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                                  <img src={img} alt="" className="w-full h-full object-cover" />
                                  <button type="button" onClick={() => removeArrayItem(i, 'gallery')} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"><X size={12}/></button>
                              </div>
                          ))}
                          <div className="aspect-square rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center relative hover:border-[#00aa6c] transition-colors">
                              <Plus className="text-gray-400" />
                              <input type="file" onChange={(e) => handleFileUpload(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                          </div>
                      </div>
                  </div>
              </div>

              {/* Pricing */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Pricing & Capacity</h2>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)</label>
                          <input type="number" name="base_price" value={formData.base_price} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Price</label>
                              <input type="number" name="adultPrice" value={formData.adultPrice} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Age Range</label>
                              <input type="text" name="adultAgeRange" value={formData.adultAgeRange} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" placeholder="e.g. 12-99" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Child Price</label>
                              <input type="number" name="childPrice" value={formData.childPrice} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Child Age Range</label>
                              <input type="text" name="childAgeRange" value={formData.childAgeRange} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" placeholder="e.g. 4-11" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                              <input type="number" name="max_guests" value={formData.max_guests} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                              <input type="number" name="min_age" value={formData.min_age} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                          </div>
                      </div>
                  </div>
              </div>

               {/* Tags & Pickup */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        {/* Simplified tag input for demo, could be array input like above */}
                       <input 
                            value={formData.tags.join(', ')} 
                            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                            className="w-full p-2 border rounded-lg text-[#1a1a1a]" 
                            placeholder="Wildlife, Family, Adventure"
                        />
                   </div>
                    <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Information</label>
                          <textarea name="pickup_info" value={formData.pickup_info} onChange={handleChange} rows={3} className="w-full p-2 border rounded-lg text-[#1a1a1a]" />
                      </div>
                     <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Point</label>
                          <input name="meeting_point" value={formData.meeting_point} onChange={handleChange} className="w-full p-2 border rounded-lg text-[#1a1a1a]" placeholder="Specific meeting point instructions" />
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                          <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 text-[#00aa6c] rounded border-gray-300 focus:ring-[#00aa6c]" />
                          <label className="text-sm font-medium text-gray-700">Mark as Featured</label>
                      </div>
               </div>
                
                 {/* Additional Info */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-[#1a1a1a]">Additional Info</h2>
                        <button type="button" onClick={() => addArrayItem('additional_info')} className="text-[#00aa6c] text-sm font-bold"><Plus size={16} /></button>
                      </div>
                      <div className="space-y-2">
                          {formData.additional_info.map((item, i) => (
                              <div key={i} className="flex gap-2">
                                  <input value={item} onChange={(e) => handleArrayChange(i, e.target.value, 'additional_info')} className="flex-1 p-2 border rounded-lg text-[#1a1a1a]" />
                                  <button type="button" onClick={() => removeArrayItem(i, 'additional_info')} className="text-gray-400 hover:text-red-500"><X size={18}/></button>
                              </div>
                          ))}
                      </div>
                  </div>

          </div>
      </div>
    </form>
  );
}

