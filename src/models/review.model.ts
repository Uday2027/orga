import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    initials: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
