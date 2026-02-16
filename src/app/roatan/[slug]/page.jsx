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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: 'Tour Not Found | ATV Roatan',
      description: 'The requested tour could not be found.'
    }
  }

  return {
    title: `${tour.title} | ATV Roatan Tours`,
    description: tour.description?.substring(0, 160) || 'Book the best ATV tours in Roatan.',
    openGraph: {
      title: tour.title,
      description: tour.description?.substring(0, 160),
      images: [tour.image_url],
    },
  }
}

export default async function TourDetailsPage({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  return <TourDetailsClient initialTour={tour} />;
}