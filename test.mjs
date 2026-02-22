import 'dotenv/config';
import mongoose from 'mongoose';
import Booking from './src/models/Booking.js';

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(2);
    console.log(JSON.stringify(bookings.map(b => b.pickupDetails), null, 2));
    await mongoose.disconnect();
}
run();
