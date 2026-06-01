// Controller for authentication-related operations
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const CONFIGURATION_ERROR_MESSAGE =
  "Server authentication is not configured correctly. Please check deployment environment variables.";

const createToken = (userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
};

const handleAuthError = (
  err: unknown,
  res: Response,
  context: "registration" | "login" | "profile",
) => {
  console.error(`Error during ${context}:`, err);

  if (err instanceof Error && err.message === "JWT_SECRET is not configured") {
    return res.status(500).json({
      message: CONFIGURATION_ERROR_MESSAGE,
      code: "AUTH_CONFIG_MISSING",
    });
  }

  return res.status(500).json({ message: "Server error" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

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
    const token = createToken(newUser._id.toString());
    const safeUser = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    };
    res
      .status(201)
      .json({ message: "User registered successfully", user: safeUser, token });
  } catch (err) {
    return handleAuthError(err, res, "registration");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

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
    const token = createToken(user._id.toString());
    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ message: "Login successful", user: safeUser, token });
  } catch (err) {
    return handleAuthError(err, res, "login");
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};

// controller for User verification
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
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
    return handleAuthError(err, res, "profile");
  }
};
