const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

const { setUser } = require("../service/auth");
const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json(userAdded);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials !!!" });
    }

    const token = setUser(user);

    // Set the cookie with appropriate options
    res.cookie("uid", token, {
      httpOnly: true, // Prevents JavaScript access to cookies
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Ensures cookies are sent in a first-party context
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 1 day
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/logout", (req, res) => {
  // Clear the cookie by setting it to an empty value and an expiration date in the past
  res.cookie("uid", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = userRouter;
