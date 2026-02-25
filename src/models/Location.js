
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a location name.'],
    unique: true,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Hotel', 'Port', 'Other'],
    default: 'Hotel',
  },
  google_maps_url: {
    type: String,
  }
}, {
  timestamps: true,
});

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Location;
}

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);

