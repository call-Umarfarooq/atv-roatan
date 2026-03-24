import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is missing');
    }

    await dbConnect();
    const { tourId, travelers, extraServices, paymentType, totalAmount: precomputedTotal, giftCardCode } = await request.json();

    // ── Plan Booking: totalAmount passed directly (no tourId) ──
    if (!tourId && precomputedTotal) {
      const amount = Math.round(precomputedTotal * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card', 'link'],
        metadata: { type: 'plan_booking', paymentType: paymentType || 'pay_now' },
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret, totalAmount: precomputedTotal });
    }

    // 1. Fetch Tour from DB to get REAL prices
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    // 2. Calculate Total Price on Server
    let totalAmount = 0;
    
    // Base Prices
    const adultPrice = parseFloat(tour.adultPrice || tour.base_price || 0);
    const childPrice = parseFloat(tour.childPrice || 0);
    
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

    // Apply 2% Discount for Pay Now
    if (paymentType === 'pay_now') {
        totalAmount = totalAmount * 0.98;
    }

    if (giftCardCode) {
        const PurchasedGiftCard = (await import('@/models/PurchasedGiftCard')).default;
        const giftCard = await PurchasedGiftCard.findOne({ code: giftCardCode, status: 'active' });
        if (giftCard && giftCard.remaining_balance > 0) {
            totalAmount = Math.max(0, totalAmount - giftCard.remaining_balance);
        }
    }

    if (totalAmount <= 0) {
        return NextResponse.json({ clientSecret: 'free_booking', totalAmount: 0 });
    }

    // 3. Create PaymentIntent
    const intentOptions = {
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      payment_method_types: ['card', 'link'],
      metadata: {
        tourId: tourId,
        tourTitle: tour.title,
        paymentType: paymentType || 'pay_now'
      }
    };

    // If "Reserve Now", authorize the card but DO NOT capture funds
    if (paymentType === 'reserve_later') {
        intentOptions.capture_method = 'manual';
    }

    const paymentIntent = await stripe.paymentIntents.create(intentOptions);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, totalAmount });

  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

