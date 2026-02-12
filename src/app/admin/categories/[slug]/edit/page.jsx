
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';

export default function EditCategoryPage() {
  const params = useParams();
  const { slug } = params;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(`/api/categories/${slug}`);
        const data = await res.json();
        if (data.success) {
          setCategory(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch category:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <CategoryForm initialData={category} isEdit={true} />
    </div>
  );
}
