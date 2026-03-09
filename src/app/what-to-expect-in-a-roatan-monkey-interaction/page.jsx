import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'What to Expect in a Roatan Monkey Interaction?',
  description: 'Learn what to expect during a Capuchin Monkey interaction on your ATV Roatan tour. A once-in-a-lifetime experience at a rescued monkeys and sloths sanctuary.',
};

export default function MonkeyInteractionPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
          What to expect in a Roatan Monkey Interaction?
        </h1>

        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src="/images/FB_IMG_1542324078120.jpg"
            alt="Roatan Monkey Interaction - Capuchin monkey at rescued animals sanctuary"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-5 text-gray-700 text-base leading-relaxed">

          <p>
            The Capuchin Monkey encounters during ATV Roatan tours are sure to provide your family or group with non-stop smiles. This is a truly exotic experience that can be enjoyed by people of all ages and activity levels.
          </p>

          <p>
            This once-in-a-lifetime opportunity of a monkey interaction takes place in a Rescued Monkeys and Sloths sanctuary where you will get up close and personal with the curious white-faced cappuccinos and have very instagrammable selfies of you taken.
          </p>

          <p>
            The white-faced Capuchin monkeys housed in the Rescued animals park are monkeys rescued from illegal zoos and from the hands of animal poachers. They are sent to the sanctuary facility, where they have an examination by a veterinarian, are provided care and medicines when necessary, are well fed and loved by their caretakers and trainers.
          </p>

          <p>
            When you visit the sanctuary, a park educator will provide a brief presentation on the species, particularities of the capuchin monkey you&apos;ll interact with, and the challenges these animals face in the wild.
          </p>

          <p>
            Following, paying customers in small groups will enter the monkey encounter enclosure for a private experience where supervised by its handler you will interact with the monkey.
          </p>

          <p>
            Capuchin Monkeys are playful and social animals, and during your interaction don&apos;t get surprised if they climb all over everyone, jumping from person to person as they&apos;d go from tree to tree.
          </p>

          <p>
            Monkeys may poke inside your pockets, so make sure to leave all your valuables, glasses, and jewelry with other family members outside the enclosure or in our storage area. Don&apos;t bring inside food or beverages, because they will try to take it from you. Monkeys may climb to your shoulders or head and wrap their tail around your neck to keep their balance.
          </p>

          <p>
            Monkeys do not like to be grabbed by strangers, because this reminds them of their regular vaccination visits by the vet. If you want to pet a monkey, ask its handler and he will gladly assist you.
          </p>

          <p>
            Capuchin Monkeys look adorable, but they are territorial animals, distinctly marking a central area of their territory with urine and defending it against intruders. While these monkeys are not known to be aggressive, they will respond if they feel provoked.
          </p>

          <p>
            Capuchin monkeys in the Sanctuary are still wild animals and may become upset, angry, or scared, causing them to adopt aggressive behaviors. Preventing aggressive behavior is the best method to avoid trouble during your tour.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-4">
            How to avoid aggressive behavior in a monkey?
          </h2>

          <p>
            Monkeys can easily become frightened by loud noises or fast movements, you should always move slowly and confidently, remaining calm while inside the enclosure, and follow carefully the directives provided by your tour guide and the monkey&apos;s caretaker.
          </p>

          <p>
            Visitors are warned not to feed the monkeys or have anything valuable on them, to prevent them from getting violent or breaking your belongings.
          </p>

          <p>
            Common human behaviors that denote friendliness, such as smiling, making eye contact, touching, or petting their tail are gestures that can provoke a monkey.
          </p>

          <p>
            There are many behaviors that monkeys can display under stress, from whistles and arm gestures to showing their teeth or biting.
          </p>

          <p>
            You should be aware that smiling in a monkey is not a sign of happiness. Monkeys smile or show their teeth when they are scared.
          </p>

          <p>
            Jumping up and down or banging objects can be a show of strength and intimidation. A sharp whistling can also indicate that the monkey feels threatened.
          </p>

          <p>
            Don&apos;t yell at, sing to, grab, tease or heckle the monkey. Keep your motions minimal and never react with quick or jerky movements around it, the monkey could end up scratching your skin with its nails, or biting you.
          </p>

          <p>
            In the rare case a monkey bite occurs, is very unlikely to give rise to a Rabies infection. If it did occur, then it would create a medical, veterinary, and public health precedent on the island.
          </p>

          <p className="font-semibold text-gray-900">
            Want to try it? Follow the links below to book!
          </p>

          <ul className="space-y-2 list-disc list-inside text-[#00694B]">
            <li>
              <Link href="/product/roatan-monkeys-sloths-eco-nature-park-atv-buggy-thrills-private-beach" className="hover:underline">
                Roatan Monkeys/Sloths @ Eco-Nature Park + ATV/Buggy Thrills &amp; Private Beach
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:underline">
                Mayan Zipline &amp; ATV/Buggy Adventure + Pet monkeys/sloths &amp; Chocolate factory visit @ Westend village beach
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:underline">
                Island SightSeeing + Private Beach + pet &amp; play monkeys/sloths/birds - Zipline &amp; ATV or Buggy Optional
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:underline">
                Roatan &ldquo;Rescued Monkeys &amp; Sloths&rdquo; sanctuary + ATV or Buggy Adventure (Beach Optional)
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:underline">
                ROATAN Best Dune Buggy Excursion: Sloths Sanctuary &amp; Sunset on Private Raw Beach
              </Link>
            </li>
          </ul>

          <p>
            <Link href="/tours" className="text-[#00694B] font-semibold hover:underline">
              Go back to Blog
            </Link>
          </p>

          <p className="text-gray-400 text-sm pt-2">02.09.2021</p>

        </div>
      </div>
    </main>
  );
}
