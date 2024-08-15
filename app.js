import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import brandRouter from "./routes/brand.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import wishlistRouter from "./routes/wishlist.js";
import orderRouter from "./routes/order.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();
//

app.use(
  cors({
    origin: ["https://kigsvillah.vercel.app", "http://localhost:300"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

configDotenv({
  path: "./data/config.env",
});

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/task", taskRouter);
app.use("/v1/brand", brandRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/product", productRouter);
app.use("/v1/wishlist", wishlistRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/order", orderRouter);
//

app.get("/", (req, res) => {
  res.send("welcome");
});
