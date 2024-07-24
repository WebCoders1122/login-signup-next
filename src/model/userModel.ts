import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Username"],
    unique: [true, "This username already taken"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: [true, "This email already registered"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
  },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema); // if users model not exits in db then create new one otherwise not
