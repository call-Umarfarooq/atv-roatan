import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import Category from "@/models/Category";
import Activity from "@/models/Activity";

const BASE_URL = "https://atvroatan.com";

export default async function sitemap() {
  await dbConnect();

  // Fetch dynamic collections
  const tours = await Tour.find({}, 'slug updatedAt').lean();
  const categories = await Category.find({}, 'slug updatedAt').lean();
  const activities = await Activity.find({}, 'slug updatedAt').lean();


  // Generate dynamic URLs for Categories
  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: category.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Generate dynamic URLs for Products (using same Tour data)
  const productUrls = tours.map((tour) => ({
    url: `${BASE_URL}/product/${tour.slug}`,
    lastModified: tour.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Generate dynamic URLs for Activities
  const activityUrls = activities.map((activity) => ({
    url: `${BASE_URL}/activities/${activity.slug}`,
    lastModified: activity.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Define static fallback routes in `src/app`
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/faqs',
    '/gallery',
    '/plan',
    '/privacy',
    '/tours',
    '/port-of-roatan',
    '/isla-tropicale-cruise-ship-port',
    '/claim-gift',
    "activities",
    '/what-to-expect-in-a-roatan-monkey-interaction',
    '/utila-is-an-excellent-destination-for-sn',
    '/try-our-best-roatan-shore-excursion-for',
    '/three-cruise-ships-packed-with-tourists',
    '/things-that-you-see-in-roatan-the-free',
    '/port-of-roatan-cruise-ship-schedule',
    '/isla-tropicale-cruise-ship-port-schedule',
    '/carnival-mardi-gras-arrives-in-roatan-for',
    
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.6,
  }));

  return [...staticRoutes, ...categoryUrls, ...productUrls, ...activityUrls];
}
