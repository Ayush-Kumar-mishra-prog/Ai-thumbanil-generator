// Controller for get all user Thumbnils
import { Request, Response } from "express";
import Thumbnil from "../models/Thumbnil.js";
export const getUserThumbnils = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const thumbnils = await Thumbnil.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ thumbnils });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Controller for generate thumbnil
export const generateThumbnil = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const {id} = req.params;
       const thumbnil = await Thumbnil.findOne({ _id: id, userId });
      

        
        res.status(201).json({ thumbnil });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};