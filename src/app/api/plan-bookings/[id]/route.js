import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlanBooking from '@/models/PlanBooking';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const booking = await PlanBooking.findById(id).lean();
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
