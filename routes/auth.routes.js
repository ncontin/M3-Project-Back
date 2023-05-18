const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
/* 
const saltRounds = 10; */

// POST  /auth/signup

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  // Generate the salt
  const salt = bcryptjs.genSaltSync(13);
  // Hash the password
  const passwordHash = bcryptjs.hashSync(req.body.password, salt);
  try {
    await User.create({ username: req.body.username, password: passwordHash });
    res.status(201).json({ message: "New user created" });
  } catch (error) {
    console.log(error);
  }
});

// POST  /auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Check if username or password are provided as empty string
  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Does user exists
  const potentialUser = await User.findOne({ username: req.body.username });
  if (potentialUser) {
    // Is the password correct
    if (bcryptjs.compareSync(req.body.password, potentialUser.password)) {
      // Password IS correct
      const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      // Send the token as the response
      res.status(200).json({ authToken: authToken });
    } else {
      // Password ISN'T correct
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } else {
    // No user found
    res.status(401).json({ message: "User not found." });
    return;
  }
});

// GET  /auth/verify



module.exports = router;
