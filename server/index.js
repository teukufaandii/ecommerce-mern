import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./lib/db.js";

//routes
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
