import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteThumbnil, generateThumbnil } from "../controller/ThumbnailCotroller.js";
const ThumbnilRouter = express.Router();


ThumbnilRouter.post("/generate", isAuthenticated, generateThumbnil);
ThumbnilRouter.delete("/delete/:id", isAuthenticated, deleteThumbnil);

export default ThumbnilRouter;
