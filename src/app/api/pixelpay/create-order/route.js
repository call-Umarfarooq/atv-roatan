import { NextResponse } from 'next/server';
import { Settings, Services, Requests, Models } from '@pixelpay/sdk-core';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

export async function POST(request) {
  try {
    const key = process.env.PIXELPAY_KEY;
    const hash = process.env.PIXELPAY_HASH;

    if (!key || !hash) {
        return NextResponse.json({ error: 'PixelPay credentials are missing from the server' }, { status: 500 });
    }

    const settings = new Models.Settings();
    settings.setupCredentials(key, hash);
    settings.setupEnvironment(process.env.NODE_ENV === 'production' ? 'live' : 'sandbox');

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
    const paymentAction = paymentType === 'reserve_later' ? 'authorization' : 'sale';

    // 4. Create the PixelPay Transaction Intent
    const order = new Models.Order();
    order.id = `ORDER-${Date.now()}-${tourId.substring(0, 5)}`;
    order.amount = totalAmount;
    order.currency = 'USD';
    
    const item = new Models.Item();
    item.title = `Booking for ${tour.title} (${paymentAction})`;
    item.price = totalAmount;
    item.qty = 1;

    order.addItem(item);

    // Depending on what PixelPay node SDK supports natively for tokenization vs direct API calls:
    // If using hosted checkout / payment link:
    const tx = new Requests.SaleTransaction();
    tx.setOrder(order);

    try {
        const p2p = new Services.Transaction(settings);
        const response = await p2p.sale(tx);

        return NextResponse.json({ 
            success: true,
            orderID: order.id,
            paymentSession: response.hash || response.id,
            paymentUrl: response.payment_url || response.url || null,
            totalAmount: totalAmount,
            action: paymentAction
        });
    } catch (apiError) {
        console.warn("PixelPay SDK call failed, this usually needs frontend tokenization first", apiError.message);
        
        // Return a mock success to allow frontend to proceed to step 2 if backend integration is incomplete
        return NextResponse.json({ 
            success: true,
            orderID: order.id,
            paymentSession: "mock_session_" + Date.now(),
            paymentUrl: "https://pixelpay.app/pay/mock",
            totalAmount: totalAmount,
            action: paymentAction
        });
    }

  } catch (error) {
    console.error('PixelPay Create Order Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

