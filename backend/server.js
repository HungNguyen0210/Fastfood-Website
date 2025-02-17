import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express().json);
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
