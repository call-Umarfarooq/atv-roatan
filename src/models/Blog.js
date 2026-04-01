import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog.'],
    maxlength: [150, 'Title cannot be more than 150 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog.'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog.'],
  },
  excerpt: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
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
  author: {
    type: String,
    default: 'Admin',
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Force model recompilation in dev to pick up schema changes
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Blog;
}

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
