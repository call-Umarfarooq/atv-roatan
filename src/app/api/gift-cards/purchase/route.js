import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';
import PurchasedGiftCard from '@/models/PurchasedGiftCard';
import { sendGiftCardPurchaseEmail } from '@/lib/mail';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const generateCode = () => {
    return 'GC-' + crypto.randomBytes(4).toString('hex').toUpperCase();
};

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { giftCardId, paymentIntentId, buyer_name, buyer_email, recipient_name, recipient_email, message } = body;

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json({ success: false, error: 'Payment not successful' }, { status: 400 });
    }

    const giftCard = await GiftCard.findById(giftCardId);
    if (!giftCard) return NextResponse.json({ success: false, error: 'Gift Card not found' }, { status: 404 });

    // Ensure we don't process the same intent twice
    const existing = await PurchasedGiftCard.findOne({ paymentIntentId });
    if (existing) {
        return NextResponse.json({ success: true, data: existing });
    }

    const uniqueCode = generateCode();

    const newPurchase = await PurchasedGiftCard.create({
        code: uniqueCode,
        initial_value: giftCard.value,
        remaining_balance: giftCard.value,
        buyer_name,
        buyer_email,
        recipient_name: recipient_name || '',
        recipient_email: recipient_email || '',
        message: message || '',
        paymentIntentId,
        status: 'active'
    });

    // Send email with the code
    await sendGiftCardPurchaseEmail(newPurchase, giftCard.title);

    return NextResponse.json({ success: true, data: newPurchase });
  } catch (error) {
    console.error('Purchase Gift Card Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
