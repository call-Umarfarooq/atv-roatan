import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// Shared PayPal configured client
function environment() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
      console.warn("PayPal missing credentials");
  }

  // Use Sandbox Environment for development, replace with LiveEnvironment in production
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

export async function POST(request) {
  try {
    if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        return NextResponse.json({ error: 'PayPal credentials are missing from the server' }, { status: 500 });
    }

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

    totalAmount = Number(totalAmount.toFixed(2)); // format for paypal

    // 3. Create PayPal Order
    const paypalClient = client();
    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    
    paypalRequest.prefer("return=representation");
    paypalRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: tourId,
          description: tour.title.substring(0, 127), // PayPal limits desc to 127 chars
          amount: {
            currency_code: 'USD',
            value: totalAmount.toString()
          }
        }
      ]
    });

    const response = await paypalClient.execute(paypalRequest);
    
    return NextResponse.json({ 
        orderID: response.result.id,
        totalAmount: totalAmount
    });

  } catch (error) {
    console.error('PayPal Create Order Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
