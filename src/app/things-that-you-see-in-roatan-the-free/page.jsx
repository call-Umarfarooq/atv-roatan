import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Things that you see in Roatan: the free-roaming horses',
  description: 'Learn about the free-roaming horses in Roatan, a unique part of the island experience that reflects its history and culture.',
};

export default function RoatanHorsesPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          Things that you see in Roatan: the free-roaming horses
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/roatan-horses.jpg"
            alt="Free-roaming horses on the island of Roatan"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            Roatan has recently been developed from a small village to a world-class vacation destination that&apos;s rich with jungle adventures, encounters with rescued animals and all types of water sports.
          </p>

          <p>
            Sometimes, a dune buggy tour around the island can show us some flashes of that recent past living among us.
          </p>

          <p>
            Horse breeders are common on the island. Many times, you can find their herds of horses roaming free on the streets, walking down the sidewalk, next to the beach, or in the bush.
          </p>

          <p>
            Those horses are branded and belong to different families. However, local owners usually don&apos;t have enough land to sustain and feed them. So, sometimes the horses roam free, but when they are needed, the owners know where to find them.
          </p>

          <p>
            As a result of the encounter, you have to be careful when driving your dune buggy, but they are another of the things that makes this island so special.
          </p>

          <p>
            <Link href="/tours" className="text-[#00694B] font-semibold hover:underline">
              Go back to Blog
            </Link>
          </p>

          <p className="text-gray-400 text-sm pt-2">11.07.2021</p>

        </div>
      </div>
    </main>
  );
}
