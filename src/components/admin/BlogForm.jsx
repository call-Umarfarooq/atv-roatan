"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, Eye, EyeOff, Bold, Italic, List, Heading2, Link as LinkIcon, Quote, Undo, Redo } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

export default function BlogForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    image_alt: '',
    meta_title: '',
    meta_description: '',
    author: 'Admin',
    status: 'draft',
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
        excerpt: initialData.excerpt || '',
        author: initialData.author || 'Admin',
        status: initialData.status || 'draft',
      }));
    }
  }, [initialData]);

  // Sync editor content to state on any input
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (initialData?.content && editor.innerHTML !== initialData.content) {
      editor.innerHTML = initialData.content || '';
    }
  }, [initialData]);

  const generateSlug = (text) =>
    text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title' && !isEdit) newData.slug = generateSlug(value);
      return newData;
    });
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
  };

  const execFormat = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  const insertHeading = () => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, 'h2');
    handleEditorInput();
  };

  const insertQuote = () => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, 'blockquote');
    handleEditorInput();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) execFormat('createLink', url);
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
        alert('Upload failed: ' + (result.error || 'Unknown error'));
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
    if (!formData.title.trim()) { alert('Title is required'); return; }
    if (!formData.slug.trim()) { alert('Slug is required'); return; }
    // Get latest content from editor
    const latestContent = editorRef.current ? editorRef.current.innerHTML : formData.content;
    if (!latestContent || latestContent === '<br>' || latestContent.trim() === '') {
      alert('Content is required'); return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        content: latestContent,
      };
      if (isEdit) {
        delete payload._id;
        delete payload.createdAt;
        delete payload.updatedAt;
        delete payload.__v;
      }

      const url = isEdit ? `/api/blogs/${initialData._id}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/blogs');
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

  const isPublished = formData.status === 'published';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center sticky top-0 bg-gray-50 z-10 py-4 border-b border-gray-200 mb-8 backdrop-blur-sm bg-opacity-90">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
        <div className="flex gap-3 items-center">
          {/* Status Toggle */}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'published' ? 'draft' : 'published' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border transition-all ${
              isPublished
                ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
            {isPublished ? 'Published' : 'Draft'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-[#00694B] hover:bg-[#005a3c] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md"
          >
            <Save size={18} /> {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Post Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title..."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a] text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-gray-400 font-normal text-xs">(auto-generated, editable)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm whitespace-nowrap">/blogs/</span>
                  <input
                    required
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt <span className="text-gray-400 font-normal text-xs">(short description shown in blog lists)</span></label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="A short summary of this blog post..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Rich Text Content Editor */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">Content <span className="text-red-500">*</span></h2>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200 mb-3">
              {[
                { icon: <Bold size={15} />, action: () => execFormat('bold'), title: 'Bold' },
                { icon: <Italic size={15} />, action: () => execFormat('italic'), title: 'Italic' },
                { icon: <Heading2 size={15} />, action: insertHeading, title: 'Heading 2' },
                { icon: <List size={15} />, action: () => execFormat('insertUnorderedList'), title: 'Bullet List' },
                { icon: <Quote size={15} />, action: insertQuote, title: 'Blockquote' },
                { icon: <LinkIcon size={15} />, action: insertLink, title: 'Insert Link' },
                { icon: <Undo size={15} />, action: () => execFormat('undo'), title: 'Undo' },
                { icon: <Redo size={15} />, action: () => execFormat('redo'), title: 'Redo' },
              ].map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={btn.action}
                  title={btn.title}
                  className="p-2 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  {btn.icon}
                </button>
              ))}
            </div>

            {/* Editor Area */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              className="min-h-[350px] p-4 border rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#00694B] prose max-w-none"
              style={{
                lineHeight: '1.8',
              }}
              placeholder="Start writing your blog content here..."
            />
            <style>{`
              [contenteditable]:empty:before {
                content: attr(placeholder);
                color: #9ca3af;
                pointer-events: none;
              }
              [contenteditable] h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; }
              [contenteditable] blockquote { border-left: 4px solid #00694B; padding-left: 1rem; color: #555; margin: 1rem 0; font-style: italic; }
              [contenteditable] ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
              [contenteditable] a { color: #00694B; text-decoration: underline; }
              [contenteditable] p { margin-bottom: 0.75rem; }
            `}</style>
          </div>

          {/* SEO */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-1">SEO</h2>
            <p className="text-xs text-gray-400 mb-4">Controls how this post appears in search engine results.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title <span className="text-gray-400 font-normal text-xs">(recommended: 50–60 chars)</span>
                </label>
                <input
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  placeholder={formData.title || 'Page title for search engines'}
                  maxLength={60}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00694B] focus:border-transparent outline-none text-[#1a1a1a]"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{(formData.meta_title || '').length}/60</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description <span className="text-gray-400 font-normal text-xs">(recommended: 150–160 chars)</span>
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

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Publish</h2>
            <div className={`flex items-center gap-3 p-3 rounded-lg ${isPublished ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${isPublished ? 'bg-green-500' : 'bg-amber-500'}`} />
              <div>
                <p className={`text-sm font-semibold ${isPublished ? 'text-green-700' : 'text-amber-700'}`}>
                  {isPublished ? 'Live — Visible to public' : 'Draft — Hidden from public'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Click the status button above to toggle</p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Cover Image</h2>
            <div className="mb-4">
              <div className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-[#00694B] transition-colors cursor-pointer">
                {formData.image ? (
                  <img
                    src={getImageUrl(formData.image)}
                    alt={formData.image_alt || formData.title || 'Blog cover'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="mx-auto mb-2" />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              {uploading && <p className="text-xs text-gray-500 mt-1 text-center animate-pulse">Uploading...</p>}
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="mt-2 text-xs text-red-500 hover:underline w-full text-center"
                >
                  Remove image
                </button>
              )}
            </div>
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

          {/* Quick Preview */}
          {(formData.title || formData.excerpt) && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Google Preview</h2>
              <div className="space-y-1">
                <p className="text-[#1a0dab] text-base hover:underline cursor-pointer line-clamp-1">
                  {formData.meta_title || formData.title || 'Blog Post Title'}
                </p>
                <p className="text-[#006621] text-xs">atvroatan.com/blogs/{formData.slug || 'your-post-slug'}</p>
                <p className="text-[#545454] text-sm line-clamp-2">
                  {formData.meta_description || formData.excerpt || 'No description provided.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
