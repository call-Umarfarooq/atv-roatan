
import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this tour.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this tour.'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  duration: {
    type: String,
    required: true,
  },
  base_price: {
    type: Number,
    required: true,
  },
  adultPrice: {
    type: Number,
  },
  adultAgeRange: {
    type: String, // e.g., "11-90"
  },
  childPrice: {
    type: Number,
  },
  childAgeRange: {
    type: String, // e.g., "4-10"
  },
  min_age: {
    type: Number,
  },
  max_guests: {
    type: Number,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  image_url: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
  },
  extraServices: [{
    name: String,
    price: String,
  }],
  // New Fields for Viator Parity
  exclusions: {
    type: [String],
  },
  cancellation_policy: {
    type: String,
  },
  meeting_point: {
    type: String,
  },
  faq: [{
    question: String,
    answer: String,
  }],
  booking_options: {
    reserve_now_pay_later: { type: Boolean, default: false },
    free_cancellation: { type: Boolean, default: true },
    policy_text: { type: String, default: 'up to 24 hours before the experience starts (local time)' },
  },
  // Enhanced Itinerary items
  itinerary: [{
    title: String,
    description: String,
    duration: String,
    stop_type: { type: String, enum: ['Stop', 'Pass By', 'Admission Ticket Included', 'Admission Ticket Free', 'Admission Ticket Not Included'], default: 'Stop' },
    admission_included: { type: String, default: 'Admission Ticket Included' }
  }],
  pickup_info: {
    type: mongoose.Schema.Types.Mixed,
  },
  what_to_include: {
    type: [String],
  },
  additional_info: {
    type: [String],
  },
  tags: {
    type: [String],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Tour || mongoose.model('Tour', TourSchema);
