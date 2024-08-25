import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  CreateOrder,
  ProcessOrder,
  getOrderByUser,
  verifyPayment,
  placeOrder,
  DeleteOrder,
} from "../controllers/order.js";

const router = express.Router();

router.post("/processOrder", isAuthenticated, ProcessOrder);
router.get("/:id", isAuthenticated, getOrderByUser);
router.delete("/:id", isAuthenticated, DeleteOrder);
router.post("/placeOrder", isAuthenticated, placeOrder);
router.post("/create-order", isAuthenticated, CreateOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);
export default router;
