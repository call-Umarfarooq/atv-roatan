import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this category.'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this category.'],
    unique: true,
  },
}, {
  timestamps: true,
});

// Force model recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Category;
}

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
