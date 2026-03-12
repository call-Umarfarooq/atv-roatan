import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';

// GET /api/admin/tours/migrate-approve
// Sets status='approved' on every tour that has no status field yet (legacy tours)
export async function GET() {
  try {
    await dbConnect();
    const result = await Tour.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'approved' } }
    );
    // Also approve any that somehow got null/undefined
    const result2 = await Tour.updateMany(
      { status: null },
      { $set: { status: 'approved' } }
    );
    return NextResponse.json({
      success: true,
      message: `Approved ${result.modifiedCount + result2.modifiedCount} existing tours`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
