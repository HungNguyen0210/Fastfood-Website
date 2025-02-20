import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import accountRoutes from "./routes/account.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // Origin cụ thể của React frontend
  credentials: true, // Cho phép gửi cookie, token
};
app.use(cors(corsOptions));

dotenv.config();
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/api", accountRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
