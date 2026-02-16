const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const TourSchema = new mongoose.Schema({
  title: String,
  cutoff_price: Number,
  base_price: Number,
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);

async function checkTours() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const tours = await Tour.find({}, 'title base_price cutoff_price');
  console.log('Tours found:', tours);
  
  await mongoose.disconnect();
}

checkTours().catch(console.error);
