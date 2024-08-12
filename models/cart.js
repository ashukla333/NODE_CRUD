import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default to 1 if quantity is not provided
  },
  size: {
    type: String, // Adjust as needed based on your size options
    required: true,
  },
});

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [CartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = mongoose.model('Cart', CartSchema);

