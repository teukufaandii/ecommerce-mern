import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getAllCartItems,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoutes, getAllCartItems);
router.post("/", protectRoutes, addToCart);
router.delete("/", protectRoutes, removeAllFromCart);
router.put("/:id", protectRoutes, updateQuantity);

export default router;
