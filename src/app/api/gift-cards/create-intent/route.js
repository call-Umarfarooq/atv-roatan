import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    await dbConnect();
    const { giftCardId } = await request.json();

    const giftCard = await GiftCard.findById(giftCardId);
    if (!giftCard || !giftCard.is_active) {
      return NextResponse.json({ error: 'Gift Card not found or inactive' }, { status: 404 });
    }

    const amount = Math.round(giftCard.price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card', 'link'],
      metadata: { type: 'gift_card_purchase', giftCardId: giftCard._id.toString() },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, amount: giftCard.price });
  } catch (error) {
    console.error('Create Intent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
