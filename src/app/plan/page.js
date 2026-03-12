import PlanBuilder from '@/components/PlanBuilder';

export const metadata = {
  title: 'Build Your Adventure | ATV Roatan — Custom Multi-Day Tour Planner',
  description: 'Design your perfect Roatan stay! Pick activities day-by-day across East and West Roatan — ATV, snorkeling, dolphins, ziplines, beaches and more. Instant pricing with a 10% long-stay discount.',
  openGraph: {
    title: 'Build Your Own Roatan Adventure',
    description: 'Day-by-day itinerary planner for your Roatan stay. Choose East or West, pick activities, get instant pricing.',
    url: '/plan',
    siteName: 'ATV Roatan',
  },
};

export default function PlanPage() {
  return <PlanBuilder />;
}
