import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GiftCard from '@/models/GiftCard';

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    await dbConnect();
    const giftCard = await GiftCard.findById(resolvedParams.id);
    if (!giftCard) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: giftCard });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const resolvedParams = await params;
    await dbConnect();
    const body = await req.json();
    const giftCard = await GiftCard.findByIdAndUpdate(resolvedParams.id, body, {
      new: true,
      runValidators: true,
    });
    if (!giftCard) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: giftCard });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const resolvedParams = await params;
    await dbConnect();
    const giftCard = await GiftCard.findByIdAndDelete(resolvedParams.id);
    if (!giftCard) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
