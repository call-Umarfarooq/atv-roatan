import { NextResponse } from 'next/server';
import { PixelPay } from '@pixelpay/sdk-core';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

export async function POST(request) {
  try {
    const key = process.env.PIXELPAY_KEY;
    const hash = process.env.PIXELPAY_HASH;

    if (!key || !hash) {
        return NextResponse.json({ error: 'PixelPay credentials are missing from the server' }, { status: 500 });
    }

    const pixelpay = new PixelPay(key, hash, process.env.NODE_ENV === 'production' ? 'live' : 'sandbox');

    await dbConnect();
    const { tourId, travelers, extraServices, paymentType } = await request.json();

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

    totalAmount = Number(totalAmount.toFixed(2)); // format for PixelPay

    // 3. Define if it's a straight Sale or an Authorization (Reserve Now)
    // Most PixelPay integrations use standard sale, but let's configure the transaction request:
    const paymentAction = paymentType === 'reserve_later' ? 'authorization' : 'sale';

    // 4. Create the PixelPay Transaction Intent
    // PixelPay has an `order` or `transaction` endpoint depending on how you're routing.
    // The typical headless Node.js approach requires sending an Auth request.
    const orderRequest = {
        orderId: `ORDER-${Date.now()}-${tourId.substring(0, 5)}`,
        amount: totalAmount,
        currency: 'USD',
        description: `Booking for ${tour.title} (${paymentAction})`,
        // other params depending on specific SDK version
    };

    // To prevent immediate charge for "Reserve Now", we would use the Authorization endpoint.
    // NOTE: For pure client-side redirect, PixelPay often provides a hosted checkout link.
    // Assuming standard SDK usage for generating a session/token:
    
    const tokenResponse = await pixelpay.requests.createPaymentIntent(orderRequest);

    return NextResponse.json({ 
        success: true,
        orderID: orderRequest.orderId,
        paymentSession: tokenResponse.token || tokenResponse.id,
        paymentUrl: tokenResponse.url || null,
        totalAmount: totalAmount,
        action: paymentAction
    });

  } catch (error) {
    console.error('PixelPay Create Order Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

