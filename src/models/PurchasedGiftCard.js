import mongoose from 'mongoose';

const PurchasedGiftCardSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  initial_value: {
    type: Number,
    required: true,
    min: 0,
  },
  remaining_balance: {
    type: Number,
    required: true,
    min: 0,
  },
  buyer_name: {
    type: String,
    required: true,
  },
  buyer_email: {
    type: String,
    required: true,
  },
  recipient_name: {
    type: String,
    default: '',
  },
  recipient_email: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'used', 'cancelled'],
    default: 'active',
  },
  expires_at: {
    type: Date,
  }
}, {
  timestamps: true,
});

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.PurchasedGiftCard;
}

export default mongoose.models.PurchasedGiftCard || mongoose.model('PurchasedGiftCard', PurchasedGiftCardSchema);
