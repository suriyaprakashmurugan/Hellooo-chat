import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { sign } = jwt;
const { hash, compare } = bcrypt;

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1d",
  });
  res.json({ token, user });
});

export default router;
