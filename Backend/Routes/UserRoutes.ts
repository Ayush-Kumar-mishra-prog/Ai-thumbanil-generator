import express from "express";
import { generateThumbnil } from "../controller/UserController.js";
import { getUserThumbnils } from "../controller/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const UserRouter = express.Router();

UserRouter.get("/thumbnil/:id", isAuthenticated, generateThumbnil);
UserRouter.get("/thumbnils", isAuthenticated, getUserThumbnils);
export default UserRouter;
