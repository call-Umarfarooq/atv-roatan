
import { NextResponse } from 'next/server';
const Stripe = require('stripe');
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    await dbConnect();
    const { tourId, travelers, extraServices } = await request.json();

    // 1. Fetch Tour from DB to get REAL prices
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    // 2. Calculate Total Price on Server
    let totalAmount = 0;
    
    // Base Prices
    const adultPrice = tour.adultPrice || tour.base_price || 0;
    const childPrice = tour.childPrice || 0;
    
    totalAmount += (travelers.adults || 0) * adultPrice;
    totalAmount += (travelers.children || 0) * childPrice;

    // Extras
    if (extraServices && tour.extraServices) {
        Object.entries(extraServices).forEach(([index, count]) => {
            if (count > 0 && tour.extraServices[index]) {
                const price = parseFloat(tour.extraServices[index].price) || 0;
                totalAmount += count * price;
            }
        });
    }

    // Tax Calculation
    const taxRate = 0.10;
    const taxAmount = totalAmount * taxRate;
    totalAmount += taxAmount;

    // 3. Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      payment_method_types: ['card', 'affirm'],
      metadata: {
        tourId: tourId,
        tourTitle: tour.title
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, totalAmount });

  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
