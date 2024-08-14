import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    const sumRatings = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.averageRating = sumRatings / this.ratings.length;
    this.numOfRatings = this.ratings.length;
  } else {
    this.averageRating = 0;
    this.numOfRatings = 0;
  }
  next();
});

export const product = mongoose.model("product", productSchema);
