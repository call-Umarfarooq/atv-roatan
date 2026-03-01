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

    const { orderID, paymentType } = await request.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const paypalClient = client();
    
    let requestAction;
    if (paymentType === 'reserve_later') {
        requestAction = new paypal.orders.OrdersAuthorizeRequest(orderID);
    } else {
        requestAction = new paypal.orders.OrdersCaptureRequest(orderID);
    }
    
    requestAction.requestBody({});

    const response = await paypalClient.execute(requestAction);

    // Depending on logic, capture status varies. Generally 'COMPLETED' is good.
    if (response.result.status === 'COMPLETED') {
        // Find the capture or authorization ID safely
        const purchaseUnit = response.result.purchase_units[0];
        const transactionId = paymentType === 'reserve_later' 
            ? purchaseUnit.payments.authorizations[0].id 
            : purchaseUnit.payments.captures[0].id;

        return NextResponse.json({ 
            success: true, 
            captureId: transactionId,
            status: response.result.status
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

