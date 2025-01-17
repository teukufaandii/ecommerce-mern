import express from "express";
import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
import { adminRoutes, protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

// admin get routes
router.get("/", protectRoutes, adminRoutes, getAllProducts);

// admin post routes
router.post("/", protectRoutes, adminRoutes, createProducts);

// admin delete routes
router.delete("/:id", protectRoutes, adminRoutes, deleteProducts);

// user get routes
router.get("/featured", getFeaturedProducts);

export default router;
