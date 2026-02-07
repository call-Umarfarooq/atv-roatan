
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  tourSlug: {
    type: String,
    required: true,
  },
  tourTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'deposit_paid'],
      default: 'unpaid'
  }
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
