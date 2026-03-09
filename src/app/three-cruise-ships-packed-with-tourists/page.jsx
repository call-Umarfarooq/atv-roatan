import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Three Cruise Ships Packed with Tourists Arrived in Roatan Today',
  description: 'Three cruise ships arrived in Roatan on Tuesday to revive local tourism entrepreneurs after more than a year of not receiving cruises.',
};

export default function ThreeCruiseShipsPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          Three cruise ships packed with tourists arrived in Roatan today
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/carnival_in_mahogany.jpg"
            alt="Carnival cruise ship docked in Mahogany Bay, Roatan"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            Three cruise ships arrived in Roatan on Tuesday to revive local tourism entrepreneurs.
          </p>

          <p>
            Tourists who arrived on the Symphony of the Seas and Norwegian Gem in Coxen Hole&apos;s Port of Roatan, and Carnival Vista in Mahogany Bay, will be served in the best way by the island&apos;s tour operators, and always respecting biosecurity measures.
          </p>

          <p>
            Among the shore excursion offering that those cruise passengers can enjoy, the highlights are ATV excursions and sand buggies, zip lines, visits to the monkey and sloth sanctuary, visits to the mangroves, the Gar&iacute;funas, and snorkeling.
          </p>

          <p>
            It should be noted that it has been more than a year of not receiving cruises in the Bay Islands due to the pandemic shutdown.
          </p>

          <p>
            <Link href="/tours" className="text-[#00694B] font-semibold hover:underline">
              Go back to Blog
            </Link>
          </p>

          <p className="text-gray-400 text-sm pt-2">17.08.2021</p>

        </div>
      </div>
    </main>
  );
}
