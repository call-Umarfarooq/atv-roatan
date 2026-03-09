import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Cayos Cochinos is a Must-See Destination for Lovers of Marine Nature',
  description: 'Cayos Cochinos is an island destination formed by a group of two main islets and 13 smaller cays of coral origin, 37.5 kilometers away from Roatan.',
};

export default function CayosCochinosPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          Cayos Cochinos is a must-see destination for lovers of marine nature
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/sea-star-cayos-cochi.jpg"
            alt="Cayos Cochinos - Caribbean Marine Sanctuary, Honduras"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            Cayos Cochinos is an island destination formed by a group of two main islets and 13 smaller cays of coral origin, 37.5 kilometers away from Roatan, and it is a must-see Caribbean destination to put on your list of marine nature. We will tell you why.
          </p>

          <p>
            These small keys, also know as Hog Keys, are officially registered as a marine sanctuary and since they are a protected area on the second largest coral reef in the world, are barely populated by a couple of hundred people. This feature ensures a quiet and relaxed visit away from the noise and large masses of tourists.
          </p>

          <p>
            In fact, it is visited on excursions that include snorkeling experiences departing from Roatán, La Ceiba, and Nueva Armenia, generally.
          </p>

          <p>
            Cayos Cochinos has a flora and fauna more related to the mainland than to the islands in the bay. They are surrounded by white, powdery sandy beaches, optimal for the nesting of the Hawksbill sea turtle.
          </p>

          <p>
            Among its terrestrial fauna, the Cayos Cochinos&apos; Boa is famous, distinguished by its pink coloration. The vegetation of both keys is shrubby and is in an excellent state of conservation. These keys are also famous for the abundance of their fishing. Its coral reefs are modest and do not form a continuous barrier around the keys.
          </p>

          <p>
            Some of the keys or atolls are privately owned, and in Chachahuate key there is a small community of Garifuna fishermen where you can have lunch, enjoying a tasty just-caught fish fried in coconut oil, accompanied with rice and beans, and slices of fried plantain. You can also enjoy the Guifiti, a famous Garifuna drink prepared with roots, leaves, and bark of plants and liquor that has medicinal and allegedly, aphrodisiac properties.
          </p>

          <p>
            Likewise, you can buy local handicrafts made in your presence. In front of the key, you can enjoy a bath and at the same time snorkel in its crystal clear waters. If you want to spend more time in this paradise, you can stay at the hotel located in Cayo Mayor.
          </p>

          <p>
            To get to Cayos Cochinos from Roatan, we at ATV Roatan offer departures for families and groups in comfortable vessels. To book this excursion, get in touch with us{' '}
            <Link href="/contact" className="text-[#00694B] font-semibold hover:underline">
              HERE
            </Link>
            .
          </p>

          <p className="text-gray-400 text-sm pt-2">18.09.2021</p>

        </div>
      </div>
    </main>
  );
}
