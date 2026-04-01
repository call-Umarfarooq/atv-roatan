"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(d => { if (d.success) setBlogs(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) setBlogs(prev => prev.filter(b => b._id !== id));
      else alert('Failed to delete');
    } catch { alert('Error deleting'); }
  };

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setBlogs(prev => prev.map(b => b._id === blog._id ? { ...b, status: newStatus } : b));
    } catch { alert('Error updating status'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Blog Posts</h1>
          <p className="text-gray-500">Create and manage your blog content</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-[#00694B] hover:bg-[#005a3c] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#1a1a1a]">All Posts <span className="text-gray-400 font-normal text-sm">({blogs.length})</span></h2>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
              {blogs.filter(b => b.status === 'published').length} published
            </span>
            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded font-medium">
              {blogs.filter(b => b.status === 'draft').length} draft
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400">Loading...</td></tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <BookOpen className="mx-auto mb-3 text-gray-300" size={40} />
                    <p className="text-gray-500 font-medium">No blog posts yet</p>
                    <p className="text-gray-400 text-sm">Create your first post to get started</p>
                    <Link href="/admin/blogs/new" className="mt-4 inline-block text-[#00694B] font-semibold text-sm hover:underline">
                      + Write your first post
                    </Link>
                  </td>
                </tr>
              ) : blogs.map(blog => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <Link href={`/blogs/${blog.slug}`} target="_blank" className="font-medium text-[#1a1a1a] hover:text-[#00694B] hover:underline transition-colors line-clamp-1">
                        {blog.title}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">/blogs/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{blog.author || 'Admin'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(blog)}
                      title="Click to toggle status"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {blog.status === 'published' ? <Eye size={12} /> : <EyeOff size={12} />}
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM d, yyyy') : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blogs/${blog.slug}`} target="_blank" title="View on site">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link href={`/admin/blogs/${blog._id}/edit`}>
                        <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id, blog.title)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
