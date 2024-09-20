const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// User Sign Up

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, createdAt } = req.body;
    const user = new User({
      username,
      email,
      password,
      role,
      createdAt,
    });
    await user.save();
    console.log("User registered:", user);
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// User Login

router.post("/login", async (req, res) => {
  // HTTP method POST for the user credential
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // finds the user if exists

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Checks if the user exists
      return res.status(401).json({ message: "invalid credentials" });
    }
     // Προσθέτεις αυτό το console.log
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log("User ID:", user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
