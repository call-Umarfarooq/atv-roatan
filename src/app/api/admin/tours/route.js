import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// GET /api/admin/tours?status=pending|approved|rejected|all  — admin sees all tours
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');

    const query = statusFilter && statusFilter !== 'all' ? { status: statusFilter } : {};
    const tours = await Tour.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: tours });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
