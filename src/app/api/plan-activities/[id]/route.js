import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlanActivity from '@/models/PlanActivity';

// PUT /api/plan-activities/[id] — admin updates an activity
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const activity = await PlanActivity.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!activity) return NextResponse.json({ success: false, error: 'Activity not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE /api/plan-activities/[id]
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await PlanActivity.findByIdAndUpdate(params.id, { isActive: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
