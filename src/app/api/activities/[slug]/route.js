import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Activity from '@/models/Activity';

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const activity = await Activity.findOne({ slug });

    if (!activity) {
      return NextResponse.json({ success: false, error: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const body = await request.json();
    const activity = await Activity.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!activity) {
      return NextResponse.json({ success: false, error: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    const activity = await Activity.findOneAndDelete({ slug });

    if (!activity) {
      return NextResponse.json({ success: false, error: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
