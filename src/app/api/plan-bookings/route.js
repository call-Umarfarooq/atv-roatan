import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlanBooking from '@/models/PlanBooking';
import { sendPlanBookingEmail } from '@/lib/mail';

// POST /api/plan-bookings — create a plan booking after payment succeeds
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      customer,
      arrivalDate,
      departureDate,
      totalDays,
      travelers,
      days,
      subtotal,
      discountPercent,
      discountAmount,
      totalPrice,
      paymentStatus,
      paymentGateway,
      externalPaymentId,
    } = body;

    // Sanitize days — remove client-only fields (addedAt) & handle null region
    const cleanDays = (days || []).map(d => ({
      dayNumber: d.dayNumber,
      date: d.date ? new Date(d.date) : undefined,
      region: d.region || undefined,
      hoursUsed: d.hoursUsed || 0,
      dayTotal: d.dayTotal || 0,
      activities: (d.activities || []).map(a => ({
        activityId: a.activityId || undefined,
        name: a.name,
        price: a.price,
        durationHours: a.durationHours,
        region: a.region || undefined,
        emoji: a.emoji || '🌴',
      })),
    }));

    // Build the booking document
    const booking = await PlanBooking.create({
      customer,
      arrivalDate: new Date(arrivalDate),
      departureDate: new Date(departureDate),
      totalDays,
      travelers,
      days: cleanDays,
      subtotal,
      discountPercent: discountPercent || 0,
      discountAmount: discountAmount || 0,
      totalPrice,
      status: 'confirmed',
      paymentStatus: paymentStatus || 'paid',
      paymentGateway: paymentGateway || 'unknown',
      externalPaymentId: externalPaymentId || '',
    });

    // Send confirmation emails (non-blocking)
    sendPlanBookingEmail(booking).catch(console.error);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/plan-bookings]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// GET /api/plan-bookings — admin lists all plan bookings
export async function GET() {
  try {
    await dbConnect();
    const bookings = await PlanBooking.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
