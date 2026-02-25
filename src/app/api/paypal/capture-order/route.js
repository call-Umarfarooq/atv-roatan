import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import dbConnect from '@/lib/db';

// MUST share same environment config
function environment() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
      console.warn("PayPal missing credentials");
  }

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

    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const paypalClient = client();
    const requestCapture = new paypal.orders.OrdersCaptureRequest(orderID);
    requestCapture.requestBody({});

    const response = await paypalClient.execute(requestCapture);

    // Depending on logic, capture status varies. Generally 'COMPLETED' is good.
    if (response.result.status === 'COMPLETED') {
        const captureData = response.result;
        return NextResponse.json({ 
            success: true, 
            captureId: captureData.purchase_units[0].payments.captures[0].id,
            status: captureData.status
        });
    } else {
        return NextResponse.json({ 
            error: 'Payment not completed successfully.',
            details: response.result 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('PayPal Capture Error:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

