
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { tourId, tourSlug, date, travelers, selectedExtras, customer, paymentIntentId, paymentStatus, paymentType } = body;

    // Basic Validation
    if (!tourId || !date || !travelers) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch Tour for Validation
    const tour = await Tour.findById(tourId);
    if (!tour) {
        return NextResponse.json({ success: false, error: 'Tour not found' }, { status: 404 });
    }

    // 2. Recalculate Price Server-Side
    let calculatedTotal = 0;
    const adultPrice = tour.adultPrice || tour.base_price || 0;
    const childPrice = tour.childPrice || 0;
    
    calculatedTotal += (travelers.adults || 0) * adultPrice;
    calculatedTotal += (travelers.children || 0) * childPrice;

    if (selectedExtras && tour.extraServices) {
        Object.entries(selectedExtras).forEach(([index, count]) => {
            if (count > 0 && tour.extraServices[index]) {
                const price = parseFloat(tour.extraServices[index].price) || 0;
                calculatedTotal += count * price;
            }
        });
    }

    const newBooking = await Booking.create({
        tour: tourId,
        tourSlug: tour.slug,
        tourTitle: tour.title,
        date,
        travelers,
        totalPrice: calculatedTotal, // Use server-calculated price
        selectedExtras,
        customer,
        status: 'confirmed',
        paymentStatus: paymentStatus || 'unpaid',
        paymentType: paymentType || 'pay_now',
        externalPaymentId: paymentIntentId
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
