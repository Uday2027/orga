import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
