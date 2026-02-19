
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/atv-roatan';

const TourSchema = new mongoose.Schema({
  title: String,
  slug: String,
});

// Prevent overwrite error if model already exists (unlikely in script)
const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);

async function listTours() {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    
    // Check if collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    const tours = await Tour.find({}, 'title slug');
    console.log('Tours found:', tours.length);
    tours.forEach(t => console.log(`- Title: "${t.title}", Slug: "${t.slug}"`));
    
    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('Error:', error);
  }
}

listTours();
