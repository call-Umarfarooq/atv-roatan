import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlanActivity from '@/models/PlanActivity';

// Initial East & West Roatan activities seeded from the spreadsheet.
// Admin can later edit durationHours from the admin dashboard.
const SEED_ACTIVITIES = [
  // ── East Roatan ──
  { region: 'east', name: 'Punta Gorda Sunday Funday (Garifuna Culture)', price: 40,  durationHours: 3, emoji: '🎉', description: 'Experience authentic Garifuna culture with food, music, and dance in Punta Gorda.', sortOrder: 1 },
  { region: 'east', name: 'Mangrove Channels Tour (Oakridge Caribbean)',   price: 50,  durationHours: 4, emoji: '🛶', description: 'Glide through Oakridge\'s stunning mangrove channels on a guided boat tour.', sortOrder: 2 },
  { region: 'east', name: 'East End Island Sightseeing Tour',               price: 60,  durationHours: 4, emoji: '🏝️', description: 'Explore the remote beauty of East End Roatan\'s islands and reef coastline.', sortOrder: 3 },
  { region: 'east', name: 'Horseback Riding (East)',                         price: 45,  durationHours: 3, emoji: '🐴', description: 'Ride through jungle and beach trails on the eastern side of Roatan.', sortOrder: 4 },
  { region: 'east', name: 'ATV / Buggy Jungle Adventure (East)',             price: 65,  durationHours: 4, emoji: '🏍️', description: 'Thrilling ATV or buggy ride through East Roatan\'s jungle trails and viewpoints.', sortOrder: 5 },
  { region: 'east', name: 'Beach Escape (Camp Bay / East Beaches)',          price: 35,  durationHours: 3, emoji: '🏖️', description: 'Relax on the pristine, uncrowded beaches of eastern Roatan.', sortOrder: 6 },
  { region: 'east', name: 'Local Food & Culture Experience',                 price: 40,  durationHours: 2, emoji: '🍽️', description: 'Taste authentic Honduran and Roatanese food with a local guide.', sortOrder: 7 },
  { region: 'east', name: 'Fishing Trip (East)',                             price: 90,  durationHours: 5, emoji: '🎣', description: 'Deep-sea or reef fishing adventure off the east coast of Roatan.', sortOrder: 8 },
  { region: 'east', name: 'Private Island Picnic (Pigeon Cay)',              price: 120, durationHours: 6, emoji: '🏝️', description: 'Exclusive private island picnic with snorkeling and a gourmet lunch.', sortOrder: 9 },
  { region: 'east', name: 'Snorkeling at Secret East-Side Reefs',            price: 75,  durationHours: 4, emoji: '🤿', description: 'Discover hidden reef ecosystems only locals know on the east side.', sortOrder: 10 },

  // ── West Roatan ──
  { region: 'west', name: 'Mayan Zipline Adventure (West)',                  price: 50,  durationHours: 4, emoji: '🧗', description: 'Soar through the jungle canopy on exhilarating zip lines above West Bay.', sortOrder: 1 },
  { region: 'west', name: 'Monkey & Sloth Park Visit',                       price: 25,  durationHours: 2, emoji: '🦥', description: 'Meet friendly monkeys and sloths at Roatan\'s beloved wildlife park.', sortOrder: 2 },
  { region: 'west', name: 'Butterfly & Hummingbird Sanctuary',               price: 0,   durationHours: 1, emoji: '🦋', description: 'Walk through a magical sanctuary filled with tropical butterflies and hummingbirds.', sortOrder: 3 },
  { region: 'west', name: 'Chocolate Factory Tour',                          price: 20,  durationHours: 2, emoji: '🍫', description: 'Learn how Roatan\'s famous cacao is turned into artisan chocolate and taste it fresh.', sortOrder: 4 },
  { region: 'west', name: 'Rum Factory & Local Market Tour',                 price: 20,  durationHours: 2, emoji: '🥃', description: 'Sample local rum and browse the vibrant colours of Roatan\'s craft market.', sortOrder: 5 },
  { region: 'west', name: 'Dolphin Meet & Kiss Encounter',                   price: 100, durationHours: 2, emoji: '🐬', description: 'Get up close with Atlantic bottlenose dolphins in their natural lagoon habitat.', sortOrder: 6 },
  { region: 'west', name: 'Dolphin Swim & Snorkel Experience',               price: 130, durationHours: 3, emoji: '🐬', description: 'Swim and snorkel alongside trained dolphins in crystal-clear Caribbean water.', sortOrder: 7 },
  { region: 'west', name: 'Dolphin Action Swim Adventure',                   price: 150, durationHours: 4, emoji: '🐬', description: 'The ultimate dolphin experience — foot push, belly ride, and open-water swim.', sortOrder: 8 },
  { region: 'west', name: 'Snorkeling Tour (West Bay Reef)',                  price: 80,  durationHours: 4, emoji: '🤿', description: 'Explore the world-famous West Bay Barrier Reef, one of the best in the Caribbean.', sortOrder: 9 },
  { region: 'west', name: 'Scuba Diving Experience (West)',                   price: 120, durationHours: 5, emoji: '🌊', description: 'Certified or intro scuba diving at West Roatan\'s stunning dive sites.', sortOrder: 10 },
  { region: 'west', name: 'West Bay Beach Break',                            price: 35,  durationHours: 3, emoji: '🏖️', description: 'Relax on the stunning white-sand stretch of West Bay Beach.', sortOrder: 11 },
  { region: 'west', name: 'Glass-Bottom Boat Tour',                          price: 50,  durationHours: 3, emoji: '⛵', description: 'See the vibrant reef below without getting wet on this family-friendly boat tour.', sortOrder: 12 },
  { region: 'west', name: 'ATV / Buggy Jungle Adventure (West)',             price: 65,  durationHours: 4, emoji: '🏍️', description: 'Adrenaline-packed ATV or dune buggy ride through West Roatan\'s jungle terrain.', sortOrder: 13 },
  { region: 'west', name: 'Sunset Catamaran Cruise (West)',                  price: 90,  durationHours: 3, emoji: '🌅', description: 'Watch the sun set over the Caribbean Sea on a relaxing catamaran cruise.', sortOrder: 14 },
];

export async function GET() {
  try {
    await dbConnect();
    const existing = await PlanActivity.countDocuments();
    if (existing > 0) {
      return NextResponse.json({ success: false, message: `Seed skipped — ${existing} activities already exist.` });
    }
    const created = await PlanActivity.insertMany(SEED_ACTIVITIES);
    return NextResponse.json({ success: true, message: `Seeded ${created.length} activities.`, data: created });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
