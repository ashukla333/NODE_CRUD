import { product } from "../models/product.js";
import { Order } from "../models/order.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Cart } from "../models/cart.js";


export const ProcessOrder = async (req, res) => {
  const { cartItems } = req.body;

  try {
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cartItems) {
      // Fetch the product data
      const productData = await product.findById(cartItem.productId);
      if (!productData) {
        return res.status(400).json({
          status: false,
          error: `Product not found: ${cartItem.productId}`,
        });
      }

      // Check if size-specific information is provided
      const sizeInfo = productData.sizes?.find(
        (size) => size.size === cartItem.size
      );
      if (!sizeInfo) {
        return res.status(400).json({
          status: false,
          error: `Size not available for product: ${cartItem.productId}`,
        });
      }

      if (sizeInfo.stock < cartItem.quantity) {
        return res.status(400).json({
          status: false,
          error: `Insufficient stock for size ${cartItem.size} of ${productData.name}`,
        });
      }

      // Calculate item total
      const itemTotal = productData.price * cartItem.quantity;
      totalAmount += itemTotal;

      // Add item details to orderItems array
      orderItems.push({
        productId: productData._id,
        name: productData.name,
        size: cartItem.size, // Include size information
        quantity: cartItem.quantity,
        price: productData.price,
        total: itemTotal,
      });

      // Optionally update the size-specific stock
      sizeInfo.stock -= cartItem.quantity;
      await productData.save();
    }

    // Return the processed order details
    res.status(200).json({
      status: true,
      orderItems,
      totalAmount,
      message: "Order processed successfully!",
    });
  } catch (error) {
    console.error("Process Order error:", error);
    res.status(500).json({ status: false, error: "Failed to process order" });
  }
};

export const getOrderByUser = async (req, res) => {
  const token = req.cookies.AuthToken;
  const { id } = req.params;
  try {
    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login required",
    //   });
    // }
    if (!id) {
      res.status(402).json({
        status: false,
        message: "id is required",
      });
    }
    const order = await Order.find({ userId: id });
    if (order) {
      res.status(200).json({
        status: true,
        message: "order fetched sucssesfully!",
        data: order,
      });
    }
    if (!order) {
      res.status(500).json({
        status: false,
        message: "order not fetched sucssesfully!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

  try {
    // Initialize Razorpay instance using environment variables
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Frontend key ID
      key_secret: process.env.RAZORPAY_KEY_SECRET, // Backend secret key
    });

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1, // Auto capture
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save the order details in your database
    const order = new Order({
      userId: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "Pending",
      razorpayOrderId: razorpayOrder.id, // Save Razorpay order ID
    });

    const savedOrder = await order.save();
      // Clear the cart after placing the order
      await Cart.findOneAndUpdate(
        { userId: req.user._id },
        { $set: { items: [] } },  // Clear the cart items
        { new: true }
      );

    // Respond with the saved order and Razorpay order ID
    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: savedOrder,
      razorpayOrderId: razorpayOrder.id, // Send this to the frontend
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      status: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

export const CreateOrder = async (req, res) => {
  const { amount, currency } = req.body;
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: "order_rcptid_11",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log("Received Order ID:", orderId);
  console.log("Received Payment ID:", paymentId);
  console.log("Received Signature:", signature);
  try {
    // Generate the signature using Razorpay secret key
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    console.log("Generated Signature:", generatedSignature);
    console.log(process.env.RAZORPAY_KEY_SECRET,"process.env.RAZORPAY_KEY_SECRET");
    
    if (generatedSignature === signature) {
      // Payment verified successfully
      res
        .status(200)
        .json({ status: true, message: "Payment verified successfully." });
    } else {
      // Payment verification failed
      res
        .status(400)
        .json({ status: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred during payment verification.",
    });
  }
};
