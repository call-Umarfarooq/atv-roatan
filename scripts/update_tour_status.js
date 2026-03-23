const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/MONGODB_URI=(.*)/);
const MONGO_URI = match ? match[1].trim() : null;

if (!MONGO_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const TourSchema = new mongoose.Schema({}, { strict: false });
const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    // Update tours that do not have a status or have an invalid status
    const result = await Tour.updateMany(
      { status: { $nin: ['approved', 'pending', 'rejected'] } },
      { $set: { status: 'approved' } }
    );

    console.log(`Matched ${result.matchedCount} tours, updated ${result.modifiedCount} tours.`);

    // Also update tours where status doesn't exist at all (the above should catch it, but just in case)
    const result2 = await Tour.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'approved' } }
    );
    console.log(`Secondary pass: Matched ${result2.matchedCount} tours, updated ${result2.modifiedCount} tours.`);

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
    process.exit(0);
  }
}

run();
