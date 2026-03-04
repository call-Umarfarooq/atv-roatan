import Tour from '@/models/Tour';
import Location from '@/models/Location';
import dbConnect from '@/lib/db';
import TourDetailsClient from '@/components/TourDetailsClient';

async function getTour(slug) {
  await dbConnect();
  const tour = await Tour.findOne({ slug })
    .populate('pickup_configuration.pickup_locations')
    .lean();

  if (tour) {
    return JSON.parse(JSON.stringify(tour));
  }
  return null;
}

async function getRelatedTours(tour) {
  if (!tour) return [];

  // Collect category IDs from either `categories` or legacy `category`
  const categoryIds = [
    ...(tour.categories || []).map(c => (typeof c === 'string' ? c : c._id?.toString())),
    tour.category ? (typeof tour.category === 'string' ? tour.category : tour.category._id?.toString()) : null,
  ].filter(Boolean);

  if (categoryIds.length === 0) return [];

  const related = await Tour.find({
    _id: { $ne: tour._id },
    $or: [
      { categories: { $in: categoryIds } },
      { category: { $in: categoryIds } },
    ],
  })
    .limit(3)
    .lean();

  return JSON.parse(JSON.stringify(related));
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