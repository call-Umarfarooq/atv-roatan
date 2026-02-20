import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function GET(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const booking = await Booking.findById(id).populate('tour');
        
        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, data: booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
