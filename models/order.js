// models/Order.js

import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  quantity: Number,
  price: Number,
  total: Number,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [orderItemSchema],
  shippingAddress: String,
  paymentMethod: String,
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);

