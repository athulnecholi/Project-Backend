const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User_model");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existsing = await User.findOne({ email });
    if (existsing) {
      return res.status(400).json({ msg: "user already exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedpassword,
      role,
    });
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});
//signin 
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No user!!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports=router;
