
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
    specialRequirements: String
  },
  pickupDetails: {
      meetingPoint: String,
      isPickup: Boolean,
      pickupLocation: String,
      cruiseShip: String,
      disembarkationTime: String,
      boardingTime: String,
      dropOffLocation: String,
      dateOfArrival: String,
      timeOfArrival: String,
      cruiseShipName: String,
      placeOfStay: String,
      orderNotes: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentType: {
      type: String,
      enum: ['pay_now', 'reserve_now'],
      default: 'pay_now'
  },
  paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'deposit_paid', 'authorized'],
      default: 'unpaid'
  },
  externalPaymentId: String,
  selectedExtras: {
      type: Map,
      of: Number
  }
}, {
  timestamps: true,
});

// Force model recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Booking;
}

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
