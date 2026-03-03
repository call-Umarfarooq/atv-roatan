
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Location from '@/models/Location';

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const deleted = await Location.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Location deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
