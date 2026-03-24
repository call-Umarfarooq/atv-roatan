import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';

export async function GET() {
  try {
    await dbConnect();
    const giftCards = await GiftCard.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: giftCards });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const giftCard = await GiftCard.create(body);
    return NextResponse.json({ success: true, data: giftCard }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
