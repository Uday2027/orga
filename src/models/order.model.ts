import mongoose, { Schema } from 'mongoose';

const OrderItemSchema = new Schema({
  product: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    images: [{ url: { type: String }, publicId: { type: String } }],
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
});

const OrderSchema = new Schema(
  {
    items: [OrderItemSchema],
    customer: CustomerSchema,
    deliveryMethod: { type: String, required: true },
    deliveryCharge: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
