import { product } from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { name, stock, images, brand, category, price, description } =
      req.body;
    if (!token) {
      res.status(401).json({
        status: false,
        message: "login Again Token Expired",
      });
    }
    const productData = await product.create({
      name,
      stock,
      images,
      brand,
      category,
      price,
      description,
    });
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product Add sucsessfully!",
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Product not Add sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "Add Product Error");
  }
};

export const getProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    if (!token) {
      res.status(401).json({
        status: false,
        message: "login Again Token Expired",
      });
    }
    const productData = await product.find({});
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product fetched sucsessfully!",
        data: { productData },
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Product not fetched sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "getProduct error");
  }
};

export const getProductById = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;

    if (!token) {
      res.status(401).json({
        status: false,
        message: "login Again Token Expired",
      });
    }
    if (!id) {
      res.status(401).json({
        status: false,
        message: "id is required",
      });
    }
    const productData = await product.findById({ _id: id });
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product fetched sucsessfully!",
        data: { productData },
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Product not fetched sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "getProduct by id error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;

    if (!token) {
      res.status(401).json({
        status: false,
        message: "login Again Token Expired",
      });
    }
    if (!id) {
      res.status(401).json({
        status: false,
        message: "id is required",
      });
    }
    const productData = await product.findByIdAndDelete({ _id: id });
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product Deleted sucsessfully!",
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Product not found or alredy deleted sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "get Product by deleted product error");
  }
};
export const updateProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { name, stock, images, brand, category, price, description } =
      req.body;
    const { id } = req.params;
    if (!token) {
      res.status(401).json({
        status: false,
        message: "login Again Token Expired",
      });
    }
    const productData = await product.findByIdAndUpdate({
    _id:id
    });
    productData.name=name;
    productData.stock=stock;
    productData.images=images;
    productData.brand=brand;
    productData.category=category;
    productData.price=price;
    productData.description=description;
    await productData.save()
    
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product Updated sucsessfully!",
        
      });
    } else {
      res.status(402).json({
        status: false,
        message: "Product not Updated sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "Add Product Error");
  }
};
