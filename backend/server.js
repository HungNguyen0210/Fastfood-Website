import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import accountRoutes from "./routes/account.route.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", accountRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
