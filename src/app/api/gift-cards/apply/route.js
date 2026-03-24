import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PurchasedGiftCard from '@/models/PurchasedGiftCard';

export async function POST(request) {
  try {
    await dbConnect();
    const { code, cartTotal } = await request.json();

    if (!code) {
        return NextResponse.json({ success: false, error: 'Please enter a code' }, { status: 400 });
    }

    const giftCard = await PurchasedGiftCard.findOne({ code: code.toUpperCase() });

    if (!giftCard) {
        return NextResponse.json({ success: false, error: 'Invalid gift card code' }, { status: 404 });
    }

    if (giftCard.status !== 'active') {
        return NextResponse.json({ success: false, error: `This gift card is ${giftCard.status}` }, { status: 400 });
    }

    if (giftCard.remaining_balance <= 0) {
        return NextResponse.json({ success: false, error: 'This gift card has zero balance' }, { status: 400 });
    }

    // Determine how much can be applied
    const discountAmount = Math.min(giftCard.remaining_balance, cartTotal);

    return NextResponse.json({ 
        success: true, 
        data: {
            code: giftCard.code,
            remaining_balance: giftCard.remaining_balance,
            discount_amount: discountAmount
        } 
    });

  } catch (error) {
    console.error('Apply Gift Card Error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
