import { Wishlist } from "../models/wishlist.js";

export const createWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    return res
      .status(200)
      .json({ status: true, message: "Product added to wishlist" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error adding product to wishlist",
      error,
    });
  }
};

export const getWishlistByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.AuthToken;
    if (!token) {
      res.status(401).json({
        status: false,
        message: "login required",
      });
    }
    const wishlist = await Wishlist.findOne({ user: id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    return res
      .status(200)
      .json({
        status: true,
        message: " fetching wishlist sucsessfully!",
        data: wishlist,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

export const removeWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ status: false, message: "Wishlist not found" });
    }
    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    );
    await wishlist.save();
    return res
      .status(200)
      .json({ status: true, message: "Product removed from wishlist" });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        message: "Error removing product from wishlist",
        error,
      });
  }
};
