import express from "express";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProducts,
} from "../controllers/product.controller.js";
import { adminRoutes, protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

// admin get routes
router.get("/", protectRoutes, adminRoutes, getAllProducts);

// admin post routes
router.post("/", protectRoutes, adminRoutes, createProducts);

// admin delete routes
router.delete("/:id", protectRoutes, adminRoutes, deleteProducts);

// admin patch routes
router.patch("/:id", protectRoutes, adminRoutes, toggleFeaturedProducts);

// user get routes
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);

export default router;
