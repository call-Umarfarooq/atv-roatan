import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlanActivity from '@/models/PlanActivity';

// GET /api/plan-activities — returns all active activities
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region'); // 'east' | 'west' | null

    const query = { isActive: true };
    if (region && ['east', 'west'].includes(region)) {
      query.region = region;
    }

    const activities = await PlanActivity.find(query)
      .sort({ region: 1, sortOrder: 1, name: 1 })
      .lean();

    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error('[GET /api/plan-activities]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/plan-activities — admin creates an activity
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const activity = await PlanActivity.create(body);
    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/plan-activities]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
