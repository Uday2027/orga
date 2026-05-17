import mongoose, { Schema } from 'mongoose';

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String },
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    images: [ProductImageSchema],
    category: { type: String, required: true },
    tags: [{ type: String }],
    stock: { type: Number, required: true, min: 0, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isActive: 1 });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
