import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import accountRoutes from "./routes/account.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", accountRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
