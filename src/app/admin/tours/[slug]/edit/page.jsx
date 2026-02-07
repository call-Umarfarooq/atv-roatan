
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TourForm from '@/components/admin/TourForm';

export default function EditTourPage() {
  const params = useParams(); // Next.js 15+ needs await for params in Server Components, but this is Client Component so useParams() hook works directly.
  const { slug } = params;
  
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await fetch(`/api/tours/${slug}`);
        const data = await res.json();
        if (data.success) {
            setTour(data.data);
        }
      } catch (error) {
          console.error('Failed to load tour');
      } finally {
          setLoading(false);
      }
    }
    if(slug) fetchTour();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <TourForm initialData={tour} isEdit={true} />
    </div>
  );
}
