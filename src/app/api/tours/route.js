
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// Public: currently returning all tours so the frontend search matches the page display
export async function GET() {
  await dbConnect();
  try {
    const tours = await Tour.find({});
    return NextResponse.json({ success: true, data: tours });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// New tour always starts as 'pending' — admin must approve
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const tour = await Tour.create({ ...body, status: 'pending' });
    return NextResponse.json({ success: true, data: tour }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

