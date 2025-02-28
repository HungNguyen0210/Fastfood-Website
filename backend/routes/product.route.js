import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByIsAvailable,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/isAvailable", getProductByIsAvailable);
router.get("/products/:id", getProductById);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
