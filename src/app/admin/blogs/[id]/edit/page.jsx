"use client";
import React, { useEffect, useState } from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { useParams } from 'next/navigation';

export default function EditBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then(r => r.json())
      .then(d => { if (d.success) setBlog(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#00694B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading post...</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="text-center py-20 text-gray-500">Blog post not found.</div>
  );

  return <BlogForm initialData={blog} isEdit={true} />;
}
