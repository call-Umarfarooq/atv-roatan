import TourDetailsClient from '@/components/TourDetailsClient';

async function getTour(slug) {
  const apiUrl = process.env.API_BASE_URL || 'http://127.0.0.1:3000';
  const res = await fetch(`${apiUrl}/api/tours/${slug}`, { cache: 'no-store' });
  
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return null;
}

async function getRelatedTours(tour) {
  if (!tour) return [];
  const apiUrl = process.env.API_BASE_URL || 'http://127.0.0.1:3000';
  
  // Collect category IDs
  const categoryIds = [
    ...(tour.categories || []).map(c => (typeof c === 'string' ? c : c._id?.toString())),
    tour.category ? (typeof tour.category === 'string' ? tour.category : tour.category._id?.toString()) : null,
  ].filter(Boolean);

  if (categoryIds.length === 0) return [];

  // We fetch all tours since we don't have a related tours API, then filter them manually.
  // This is safe since the number of tours is relatively small.
  const res = await fetch(`${apiUrl}/api/admin/tours?status=all`, { cache: 'no-store' });
  if (res.ok) {
    const data = await res.json();
    const allTours = data.data || [];
    
    return allTours.filter(t => 
      t._id !== tour._id &&
      (
        (t.categories && t.categories.some(c => categoryIds.includes(typeof c === 'string' ? c : c._id?.toString()))) ||
        (t.category && categoryIds.includes(typeof t.category === 'string' ? t.category : t.category._id?.toString()))
      )
    ).slice(0, 3);
  }
  
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: 'Tour Not Found | ATV Roatan',
      description: 'The requested tour could not be found.'
    }
  }

  const metaTitle = tour.meta_title || `${tour.title} | ATV Roatan Tours`;
  const metaDescription = tour.meta_description || tour.description?.substring(0, 160) || 'Book the best ATV tours in Roatan.';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: tour.meta_title || tour.title,
      description: metaDescription,
      images: [{ url: tour.image_url, alt: tour.image_alt || tour.title }],
    },
  }
}

export default async function TourDetailsPage({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);
  const relatedTours = await getRelatedTours(tour);

  return <TourDetailsClient initialTour={tour} relatedTours={relatedTours} />;
}