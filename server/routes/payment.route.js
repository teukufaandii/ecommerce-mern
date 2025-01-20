import express from "express";
import { createCheckoutSession, successResponse } from "../controllers/payment.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoutes, createCheckoutSession);
router.get("/success-response", protectRoutes, successResponse)

export default router;
