const mongoose = require("mongoose"); // app connection to MongoDB
const validator = require("validator");
const bcrypt = require("bcrypt");

// User Authentication Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required "],
    unique: true, // The users can not have the same username with each other
  },
  email: {
    type: String,
    required: [true, "Email is required "],
    unique: true,
    lowercase: true, // The users can not have the same email with each other
    validate: [
      validator.isEmail,
      "Invalid Email! Please provide a valid email: ",
    ], // Email format
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password is required "],
    minlength: 8, // At leasr 8 characters
  },
  role: { type: String, enum: ["admin", "guest"], required: true },
  createdAt: { type: Date, default: Date.now },
});

// Middleware Function

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
