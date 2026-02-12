
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ActivityForm from '@/components/admin/ActivityForm';

export default function EditActivityPage() {
  const params = useParams();
  const { slug } = params;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/activities/${slug}`);
        const data = await res.json();
        if (data.success) {
          setActivity(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch activity:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchActivity();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!activity) return <div>Activity not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <ActivityForm initialData={activity} isEdit={true} />
    </div>
  );
}
