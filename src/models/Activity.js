import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this activity.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this activity.'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  image_alt: {
    type: String,
    default: '',
  },
  meta_title: {
    type: String,
    default: '',
  },
  meta_description: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Force model recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Activity;
}

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

