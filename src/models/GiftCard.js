import mongoose from 'mongoose';

const GiftCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this gift card.'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Please provide the purchase price.'],
    min: 0,
  },
  value: {
    type: Number,
    required: [true, 'Please provide the gift card value.'],
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.GiftCard;
}

export default mongoose.models.GiftCard || mongoose.model('GiftCard', GiftCardSchema);
