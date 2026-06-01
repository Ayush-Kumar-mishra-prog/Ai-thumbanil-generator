import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}
const app = express();

app.set("trust proxy", 1);

await connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL ||
    "https://ai-thumbanil-generator-client-types.vercel.app",
  process.env.SERVER_URL ||
    "https://ai-thumbanil-generator-server-expre.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL as string,
      collectionName: "sessions",
    }),
  }),
);

app.use((req, _res, next) => {
  console.log(
    `[req] ${req.method} ${req.originalUrl} origin=${req.headers.origin}`,
  );
  next();
});

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});
app.use("/api/auth", (await import("./Routes/AuthRouter.js")).default);
app.use("/api/thumbnil", (await import("./Routes/ThumbnilRoutes.js")).default);
app.use("/api/user", (await import("./Routes/UserRoutes.js")).default);

console.log("✓ Routes registered: /api/auth, /api/thumbnil, /api/user");

// Simplified diagnostic with longer delay for async imports
setTimeout(() => {
  try {
    const router = (app as any)._router;
    if (router?.stack) {
      const routes = router.stack
        .filter((layer: any) => layer.route)
        .map((layer: any) => {
          const methods = Object.keys(layer.route.methods)
            .map((m) => m.toUpperCase())
            .join(",");
          return `${methods} ${layer.route.path}`;
        });
      if (routes.length > 0) {
        console.log("Registered routes:", routes);
      }
    }
  } catch (err) {
    // Silent fail for diagnostic
  }
}, 3000);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
