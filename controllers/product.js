import { product } from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const {
      name,
      stock,
      images,
      brand,
      category,
      price,
      ratings,
      description,
      gender,
      offer,
      sizes,
    } = req.body;
    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login Again Token Expired",
    //   });
    // }
    const productData = await product.create({
      name,
      stock,
      images,
      brand,
      category,
      price,
      description,
      ratings,
      gender,
      offer,
      sizes,
    });
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product Add sucsessfully!",
      });
    } else {
      res.status(200).json({
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
    const productData = await product.find({});
    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product fetched sucsessfully!",
        data: { productData },
      });
    } else {
      res.status(200).json({
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

 
    if (!id) {
      res.status(200).json({
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
      res.status(200).json({
        status: false,
        message: "Product not fetched sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "getProduct by id error");
  }
};

export const ProductByCategoryId = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;
    const { gender, minPrice, maxPrice, minRating, sortBy } = req.query;

  

    // Check if ID is provided
    if (!id) {
      return res.status(200).json({
        status: false,
        message: "ID is required",
      });
    }

    // Construct the query
    const query = {
      $or: [{ category: id }, { brand: id }],
      isActive: true,
    };

    // Add gender filter if provided
    if (gender) {
      query.gender = gender;
    }

    // Add price range filter if provided
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      const rating = Number(minRating);
      if (!isNaN(rating)) {
        query["ratings"] = {
          $elemMatch: { rating: { $gte: rating } },
        };
      }
    }

    // Add sorting option if provided
    const sortOptions = {};
    if (sortBy) {
      const sortDirection = sortBy.startsWith("-") ? -1 : 1;
      const sortField = sortBy.replace("-", "");
      sortOptions[sortField] = sortDirection;
    }

    // Fetch the products with filtering and sorting
    const productData = await product.find(query).sort(sortOptions);

    if (productData.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Products fetched successfully!",
        data: { productData },
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "No products found!",
      });
    }
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const token = req.cookies.AuthToken;
    const { id } = req.params;

    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login Again Token Expired",
    //   });
    // }
    if (!id) {
      res.status(200).json({
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
      res.status(200).json({
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
    const {
      name,
      stock,
      images,
      brand,
      category,
      price,
      ratings,
      description,
      gender,
      offer,
      sizes,
    } = req.body;
    const { id } = req.params;
    // if (!token) {
    //   res.status(401).json({
    //     status: false,
    //     message: "login Again Token Expired",
    //   });
    // }
    const productData = await product.findByIdAndUpdate({
      _id: id,
    });
    productData.name = name;
    productData.stock = stock;
    productData.images = images;
    productData.brand = brand;
    productData.category = category;
    productData.price = price;
    productData.description = description;
    productData.ratings = ratings;
    productData.gender = gender;
    productData.offer = offer;
    productData.sizes = sizes;
    await productData.save();

    if (productData) {
      res.status(201).json({
        status: true,
        message: "Product Updated sucsessfully!",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Product not Updated sucsessfully!",
      });
    }
  } catch (error) {
    console.log(error, "Add Product Error");
  }
};

// export const searchProducts = async (searchTerm) => {
//   try {
//     const products = await product.find({
//       $or: [
//         { name: { $regex: searchTerm, $options: 'i' } },
//         { description: { $regex: searchTerm, $options: 'i' } }
//       ]
//     });
//     return products;
//   } catch (error) {
//     console.error('Error searching products:', error);
//     throw error;
//   }
// };
