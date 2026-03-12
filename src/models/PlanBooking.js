import mongoose from 'mongoose';

const PlanBookingSchema = new mongoose.Schema({
  customer: {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, default: '' },
    specialRequirements: { type: String, default: '' },
  },
  arrivalDate:   { type: Date, required: true },
  departureDate: { type: Date, required: true },
  totalDays:     { type: Number, required: true },
  travelers: {
    adults:   { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants:  { type: Number, default: 0 },
  },
  days: [new mongoose.Schema({
    dayNumber: { type: Number, required: true },
    date:      { type: Date },
    region:    { type: String, default: null },   // east | west | null (no enum so null is valid)
    activities: [new mongoose.Schema({
      activityId:    { type: mongoose.Schema.Types.ObjectId, ref: 'PlanActivity' },
      name:          { type: String, required: true },
      price:         { type: Number, required: true },
      durationHours: { type: Number, required: true },
      region:        { type: String },
      emoji:         { type: String, default: '🌴' },
    }, { _id: false })],
    hoursUsed: { type: Number, default: 0 },
    dayTotal:  { type: Number, default: 0 },
  }, { _id: false })],
  subtotal:        { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  discountAmount:  { type: Number, default: 0 },
  totalPrice:      { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'deposit_paid', 'authorized'],
    default: 'unpaid',
  },
  paymentGateway: {
    type: String,
    default: 'unknown',
  },
  externalPaymentId: { type: String, default: '' },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.PlanBooking;
}

export default mongoose.models.PlanBooking || mongoose.model('PlanBooking', PlanBookingSchema);
