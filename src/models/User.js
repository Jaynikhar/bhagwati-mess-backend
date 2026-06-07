import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, },
    password: { type: String, required: true },
    address: { type: String, required: true },
    photo: {
      type: String, // image URL or file path
      default: "",
    },
    role: { type: String, default: "User" }, // user | owner
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

