import { v2 as cloudinary } from "cloudinary";
import {GoogleGenAI} from "@google/genai";
import OpenAI from 'openai';

// Configure Cloudinary using environment variables.
// Ensure CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET are set.
const ai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optional: Google GenAI client was removed from dependencies.
// We export a nullable `ai` so controllers can optionally use it when available.

export { cloudinary };
export default ai;
