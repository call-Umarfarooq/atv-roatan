
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { tourId, tourSlug, date, travelers, totalPrice, customer } = body;

    // Basic Validation
    if (!tourId || !date || !travelers || !totalPrice) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side price verification (Optional but recommended)
    // const tour = await Tour.findById(tourId);
    // const calculatedPrice = ...

    // For now, we trust the client-side price but in production, ALWAYS recalculate on server.

    const newBooking = await Booking.create({
        tour: tourId,
        tourSlug,
        tourTitle: 'Booking for ' + tourSlug, // Should actually fetch title
        date,
        travelers,
        totalPrice,
        customer: customer || { firstName: 'Guest', lastName: 'User', email: 'guest@example.com', phone: '000-000-0000' }, // Mock customer for now
        status: 'pending'
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
