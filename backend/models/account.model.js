import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: ["customer", "staff", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
