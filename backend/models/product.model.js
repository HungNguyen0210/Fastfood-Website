import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String },
    isAvailable: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
