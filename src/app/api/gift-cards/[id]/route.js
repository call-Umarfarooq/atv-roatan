import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    await dbConnect();
    const giftCard = await GiftCard.findById(resolvedParams.id).lean();
    if (!giftCard || !giftCard.is_active) {
        return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: giftCard });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
