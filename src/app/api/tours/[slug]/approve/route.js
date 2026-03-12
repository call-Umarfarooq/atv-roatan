import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// PATCH /api/tours/[slug]/approve  — body: { status: 'approved' | 'rejected' | 'pending' }
export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const { status } = await request.json();

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const tour = await Tour.findOneAndUpdate(
      { slug },
      { status },
      { new: true }
    );

    if (!tour) {
      return NextResponse.json({ success: false, error: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tour });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
