import mongoose from 'mongoose';

const PlanActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Activity name is required'],
    maxlength: 120,
  },
  region: {
    type: String,
    enum: ['east', 'west'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  // Duration in hours — admin sets this. Used for conflict detection (8h max per day)
  durationHours: {
    type: Number,
    required: true,
    min: 0.5,
    max: 8,
    default: 2,
  },
  description: {
    type: String,
    default: '',
  },
  emoji: {
    type: String,
    default: '🌴',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.PlanActivity;
}

export default mongoose.models.PlanActivity || mongoose.model('PlanActivity', PlanActivitySchema);
