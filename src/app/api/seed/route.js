
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

export async function GET() {
  await dbConnect();

  const seedData = {
    slug: 'roatan-zipline-adventure-original',
    title: 'Roatan Ziplining Adventure and Sloths and Monkeys plus City Tour',
    description: "Get ready for the ultimate Roatan shore excursion! This comprehensive tour combines the thrill of ziplining through the jungle canopy with heartwarming encounters with sloths and monkeys. You'll also enjoy a guided city tour to learn about the island's rich culture and history. Perfect for families and adventure seekers alike.",
    duration: '4 hours',
    base_price: 119,
    adultPrice: 119,
    adultAgeRange: "12-99",
    childPrice: 99,
    childAgeRange: "4-11",
    min_age: 5,
    max_guests: 15,
    is_featured: true,
    image_url: 'https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/sloth_t5l3s2.jpg',
    gallery: [
       'https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/sloth_t5l3s2.jpg',
       'https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/zipline_d4k2s1.jpg'
    ],
    gallery: [
      'https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/sloth_t5l3s2.jpg',
      'https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/zipline_d4k2s1.jpg'
    ],
    what_to_include: [
      "Round-trip transportation from cruise port or hotel",
      "Professional local guide",
      "Zipline gear and safety briefing",
      "Entrance fees to Sloth & Monkey Park",
      "Bottled water"
    ],
    exclusions: [
      "Lunch (available for purchase)",
      "Gratuities",
      "Souvenirs"
    ],
    booking_options: {
        reserve_now_pay_later: true,
        free_cancellation: true,
        policy_text: "up to 24 hours before the experience starts (local time)"
    },
    cancellation_policy: "For a full refund, you must cancel at least 24 hours before the experience's start time. If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded. As a weather-dependent experience, if it's canceled due to poor weather, you'll be offered a different date or a full refund.",
    meeting_point: "For cruise ship passengers: Walk past the main port gate and look for the 'ATV Roatan' sign. Our guides will be wearing green shirts.",
    pickup_info: "We pick up from all Roatan cruise ports (Mahogany Bay & Coxen Hole) and major hotels. Please specify your location at booking.",
    faq: [
        { question: "Is there a weight limit for the zipline?", answer: "Yes, the maximum weight limit is 275 lbs (125 kg) and the minimum is 50 lbs." },
        { question: "Can pregnant women participate?", answer: "For safety reasons, pregnant women cannot participate in the zipline portion but can enjoy the animal park and city tour." }
    ],
    additional_info: [
      "Confirmation will be received at time of booking",
      "Not wheelchair accessible",
      "Stroller accessible",
      "Infants must sit on laps during transport",
      "Most travelers can participate"
    ],
    tags: ["Adventure", "Wildlife", "Family Friendly", "Sightseeing"],
    itinerary: [
      {
        title: "Pickup from Port/Hotel",
        description: "Meet your friendly local guide and board our air-conditioned van.",
        duration: "30 mins",
        stop_type: "Pass By",
        admission_included: "Admission Ticket Free"
      },
      {
        title: "Roatan Jungle Zipline",
        description: "Soar through the jungle canopy on 12 different ziplines! Enjoy breathtaking views of the ocean and lush forest.",
        duration: "1 hour 30 mins",
        stop_type: "Stop",
        admission_included: "Admission Ticket Included"
      },
      {
        title: "Sloth & Monkey Hangout",
        description: "Get up close and personal with adorable sloths, playful monkeys, and colorful macaws. Great photo opportunities!",
        duration: "45 mins",
        stop_type: "Stop",
        admission_included: "Admission Ticket Included"
      },
      {
        title: "Chocolate & Rum Factory",
        description: "Taste delicious local chocolate and rum cake. Learn about the production process.",
        duration: "30 mins",
        stop_type: "Stop",
        admission_included: "Admission Ticket Free"
      }
    ],
    extraServices: [
        { name: "Photography Package", price: "50" },
        { name: "Lunch Upgrade", price: "25" }
    ]
  };

  try {
    // Check if exists
    const existing = await Tour.findOne({ slug: seedData.slug });
    if (existing) {
        return NextResponse.json({ success: true, message: 'Tour already exists', data: existing });
    }

    const tour = await Tour.create(seedData);
    return NextResponse.json({ success: true, message: 'Seeded successfully', data: tour });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

