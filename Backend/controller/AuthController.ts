// Controller for authentication-related operations
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id.toString();
    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    };
    res
      .status(201)
      .json({ message: "User registered successfully", user: safeUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.password) {
      console.error("No password hash found for user");
      return res.status(500).json({ message: "Server error" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();
    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};

// controller for User verification
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
