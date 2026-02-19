"use client";
import React, { useEffect, useState } from 'react';
import TourForm from '@/components/admin/TourForm';

export default function EditTourClient({ slug }) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await fetch(`/api/tours/${slug}`);
        const data = await res.json();
        if (data.success) {
            setTour(data.data);
        } else {
            setError(data.error || 'Failed to fetch tour data');
        }
      } catch (err) {
          console.error('Failed to load tour', err);
          setError(err.message || 'Network error');
      } finally {
          setLoading(false);
      }
    }
    if(slug) fetchTour();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error} <br/> Slug: {slug}</div>;
  if (!tour) return <div>Tour not found (Slug: {slug})</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <TourForm initialData={tour} isEdit={true} />
    </div>
  );
}
