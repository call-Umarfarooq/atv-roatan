import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Carnival Mardi Gras Arrives in Roatan for the First Time',
  description: 'The Carnival Mardi Gras cruise ship docked this Wednesday in Roatan carrying more than four thousand tourists who enjoyed the island\'s tourism offering.',
};

export default function CarnivalMardiGrasPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          Carnival Mardi Gras arrives in Roatan for the first time
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/carnival_mardi_gras.jpg"
            alt="Carnival Mardi Gras cruise ship"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            From Cozumel and Costa Maya, the cruise ship of the Carnival Mardi Gras line, docked this Wednesday in Roatan carrying more than four thousand tourists who enjoyed the island&apos;s tourism offering.
          </p>

          <p>
            Tourism in Honduras begins to gain more strength in recent days after the arrival of several cruise ships to the paradisiacal island of Roat&aacute;n.
          </p>

          <p>
            Arriving from Cozumel and Costa Maya, the Carnival Mardi Gras cruise ship docked for the first time on the island today Wednesday bringing more than four thousand tourists who enjoyed the island&apos;s tour offerings.
          </p>

          <p>
            &quot;We are satisfied and very happy to see how, little by little, the island receives cruise ships and cruise passengers at its different ports,&quot; said Nicole Marder, Minister of Tourism moments later, when tourists got off one of the largest ships. of the world.
          </p>

          <p>
            This massive cruise ship is one of the newest and hottest in the Carnival Cruise Line fleet.
          </p>

          <p>
            She is powered by liquefied natural gas and holds the record for being one of the ten largest ships in the world.
          </p>

          <p>
            Tourists looking for an exciting adventure in Roatan will enjoy Dune Buggy or ATV jungle tours and white sand beaches with crystal clear waters. In addition, the ziplines and rescued animal sanctuaries are more of the most sought attractions of the Honduran island.
          </p>

          <p>
            <Link href="/tours" className="text-[#00694B] font-semibold hover:underline">
              Go back to Blog
            </Link>
          </p>

          <p className="text-gray-400 text-sm pt-2">11.08.2021</p>

        </div>
      </div>
    </main>
  );
}
