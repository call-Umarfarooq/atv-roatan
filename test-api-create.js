const http = require('http');

const testTours = [
  {
    title: "Test Tour 1: Roatan Jungle Adventure",
    description: "An amazing adventure through the jungle with ATVs and sloths.",
    duration: "3 hours",
    base_price: 85,
    adultPrice: 85,
    adultAgeRange: "12-65",
    childPrice: 45,
    childAgeRange: "5-11",
    min_age: 5,
    max_guests: 12,
    image_url: "https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/zipline_d4k2s1.jpg",
    gallery: ["https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/zipline_d4k2s1.jpg"],
    booking_options: {
      reserve_now_pay_later: true,
      free_cancellation: true,
      policy_text: "Free cancellation up to 48 hours before the trip."
    },
    exclusions: ["Lunch", "Towels"],
    what_to_include: ["Safety Gear", "Water"],
    itinerary: [
        { title: "Start", description: "Meet at the port", duration: "15m", stop_type: "Stop" },
        { title: "Jungle", description: "Ride through the trees", duration: "2h", stop_type: "Stop" }
    ],
    faq: [
        { question: "Is it safe?", answer: "Yes, fully guided." }
    ]
  },
  {
    title: "Test Tour 2: Island Beach Break",
    description: "Relax on the pristine beaches of Roatan.",
    duration: "5 hours",
    base_price: 50,
    adultPrice: 50,
    adultAgeRange: "10-99",
    childPrice: 25,
    childAgeRange: "3-9",
    min_age: 3,
    max_guests: 20,
    image_url: "https://res.cloudinary.com/drbtv4wfq/image/upload/v1738734689/sloth_t5l3s2.jpg",
    booking_options: {
      reserve_now_pay_later: false,
      free_cancellation: false // Should hide the text in widget
    },
    exclusions: ["Drinks", "Snorkel Gear"],
    what_to_include: ["Beach Chair", "Umbrella"]
  }
];

function postTour(tour) {
  return new Promise((resolve, reject) => {
    // Generate a unique slug to avoid duplicates
    const slug = tour.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const payload = JSON.stringify({ ...tour, slug });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/tours',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
            resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function runTest() {
  console.log(`Testing API at http://localhost:3000/api/tours...`);

  for (const tour of testTours) {
    try {
      console.log(`Creating: ${tour.title}...`);
      const result = await postTour(tour);

      if (result.status === 201 && result.data.success) {
        console.log(`✅ SUCCESS: Created ${result.data.data.title}`);
        console.log(`   ID: ${result.data.data._id}`);
        console.log(`   Slug: ${result.data.data.slug}`);
      } else {
        console.error(`❌ FAILED (Status ${result.status}):`);
        console.error(result.data);
      }
    } catch (err) {
      console.error(`❌ NETWORK ERROR:`, err.message);
    }
    console.log('---');
  }
}

runTest();
