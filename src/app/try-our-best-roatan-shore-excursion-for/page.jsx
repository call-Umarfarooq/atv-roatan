import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Try our best Roatan shore excursion for families',
  description: 'Roatan\'s natural beauty and fun adventures rank this Caribbean island high on the shore excursion list.',
};

export default function ShoreExcursionPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          Try our best Roatan shore excursion for families
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/roatan_shore_excursion_1.jpg"
            alt="Family pointing out into the ocean from a dune buggy"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            Roatan&apos;s natural beauty and fun adventures rank this Caribbean island high on the shore excursion list. There are gorgeous beaches to enjoy at both ends of the island, exciting rainforest to explore all over, and an abundance of tropical animals to watch or interact with (such as sloths, monkeys, macaws, toucans, and butterflies). The island offers a wide variety of nature, adventure and cultural activities that will give you much to remember upon your return. Also, the friendly people of Roatan will make you feel welcome everywhere to go.
          </p>

          <p>
            Our Roatan Monkeys/Sloths @ Eco-Nature Park + ATV/Buggy Thrills + Private Beach tour is one of the best ways to explore the island and discover the best things to do in Roatan in one day. Our company offers you the very best in a custom jungle buggy adventure that you and your companions will remember forever.
          </p>

          <p>
            We only offer guided tours, and our expert team supervises the whole shore excursion. Once you arrive at our camp location, and after a short briefing, it&rsquo;s time to jump on board our fully maintained dune buggies &ndash; all 4-wheel drive with automatic gearboxes &ndash; perfect for exploring the wild jungle trails of our 15 acre natural preserve.
          </p>

          <p>
            The jungle trail route taken can vary day to day based on the makeup of the group, and depending on the season, you may get VERY wet and/or dirty on this day tour. Our bilingual local guides will show you parts of Roatan island not usually seen by a cruise tourist, and rest assured it will be an unforgettable shore excursion day out.
          </p>

          <p>
            We&rsquo;ll point out wildlife, show you a fantastic panoramic view, and discuss the history of the area in a few stops we&apos;ll make. You&rsquo;ll have the rare opportunity to try fresh cashew nuts in season and discover what life was like in Roatan in the past.
          </p>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-md">
            <Image
              src="/images/roatan_shore_excursion_2.jpg"
              alt="Two women covered in mud driving a dune buggy"
              fill
              className="object-cover"
            />
          </div>

          <p>
            Note that we encourage the participation of children on our tours but since our number one concern is your safety, we insist that all passengers must fit securely into the buggy seat harness. Generally we find children over 5 years old fit into it. For safety reasons, infants can not be held in your arms or go on your lap.
          </p>

          <p>
            There are smiles all around when the second part of the tour starts and our guests visit the sanctuary park.
          </p>

          <p>
            There, you will be able to play, pet and interact with rescued wildlife such as Sloths, Birds, White Faced Capuchin Monkeys, White Tail Deer&rsquo;s, The Paca and Agouti (Roatan Island Rabbit), Hummingbirds, etc.
          </p>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-md">
            <Image
              src="/images/roatan_shore_excursion_3.jpg"
              alt="Close up view of a capuchin monkey looking thoughtful"
              fill
              className="object-cover"
            />
          </div>

          <p>
            Also, you can walk through a Tropical Botanical Medicinal Garden with your guide demonstrating traditional natural medicinal herbs used by the locals.
          </p>

          <p>
            Animal encounters at the sanctuary are a safe and respectful animal adventure where all animal interactions are supervised by their caretakers at all times, but we have to remind you that they still are wild creatures that got adapted to being around with humans, so there are no guarantees regarding petting or playing with them.
          </p>

          <p>
            The last part of the tour, is a visit to a private beach, where you can just relax and enjoy the sun rays, walk along a strip of white powdey sand, swim in the cristalline waters of the Caribbean, or try the local food and drinks at the beach restaurant (not included).
          </p>

          <p>
            All our tours can be customized further, given that you have enough shore time on the island, other activities could be included, such as the canopy ziplines, snorkeling, a dory cruise in the mangrove channels or any other activity you could think of.
          </p>

          <p>
            What you need to do, is tell our tour guides as early in the day as possible, they will do their best to accomodate. They will also help taking photos or videos with your own phone or camera, if you request it.
          </p>

          <p>
            By the end of your tour, you will have plenty of fun pictures to share with your friends and memories to last a lifetime.
          </p>

          <p>
            <Link href="/tours" className="text-[#00694B] font-semibold hover:underline">
              Go back to Blog
            </Link>
          </p>

          <p className="text-gray-400 text-sm pt-2">28.07.2021</p>

        </div>
      </div>
    </main>
  );
}
