import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import AuthRouter from "./Routes/AuthRouter.js";
import UserRouter from "./Routes/UserRoutes.js";
import ThumbnilRouter from "./Routes/ThumbnilRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ai-thumbanil-generator-client-types.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    databaseConnected: mongoose.connection.readyState === 1,
    env: {
      mongoUrl: Boolean(process.env.MONGO_URL),
      jwtSecret: Boolean(process.env.JWT_SECRET),
      cloudinaryName: Boolean(process.env.CLOUDINARY_NAME),
      cloudinaryApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
      cloudinaryApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
      openRouterApiKey: Boolean(process.env.OPENROUTER_API_KEY),
      clientUrl: Boolean(process.env.CLIENT_URL),
    },
  });
});

app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectDB();
    return next();
  } catch {
    return res.status(503).json({
      message: "Database is not connected. Please check MONGO_URL in deployment environment variables.",
    });
  }
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/thumbnil", ThumbnilRouter);
const port = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection failed during startup:", err);
  }

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
