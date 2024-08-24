import { Cart } from "../models/cart.js";

export const createCart = async (req, res) => {
  const { userId, productId, quantity, size } = req.body;

  try {
    if (!userId) {
      return res
        .status(200)
        .json({ success: false, message: "User ID is required" });
    }
    if (!productId || !size) {
      return res
        .status(200)
        .json({ success: false, message: "Product ID and size are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      if (quantity) {
        cart.items[itemIndex].quantity += quantity;
      }
    } else {
      cart.items.push({ productId, quantity: quantity || 1, size });
    }

    await cart.save();

    res.status(200).json({ status: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to add item to cart" });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({
      status: true,
      message: " fetch cart successfully!",
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ status: false, message: "Failed to fetch cart" });
  }
};

export const removeCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ status: false, message: "Cart not found" });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ status: false, message: "Item not found in cart" });
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ status: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to remove item from cart" });
  }
};


export const getCartData = async (req, res) => {
    const { id } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId: id });
  
      if (!cart) {
        return res
          .status(404)
          .json({ status: false, message: "Cart not found" });
      }

      res.status(200).json({
        status: true,
        message: "fetch cart successfully!",
        data: cart,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ status: false, message: "Failed to fetch cart" });
    }
  };