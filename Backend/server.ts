import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import AuthRouter from "./Routes/AuthRouter.js";
import UserRouter from "./Routes/UserRoutes.js";
import ThumbnilRouter from "./Routes/ThumbnilRoutes.js";

await connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://ai-thumbanil-generator-client-types.vercel.app",
    ],
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/thumbnil", ThumbnilRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
