import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoutes = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoutes middleware", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export const adminRoutes = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden - You are not an admin" });
  }
};
