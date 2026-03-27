import mongoose from "mongoose";
export interface IThumbnil extends Document {
  userId: string;
  title: string;
  description?: string;
  style:
    | "Bold & Graphic"
    | "Tech/Futuristic"
    | "Minimalist"
    | "Photorealistic"
    | "Illustrated";
  aspect_ratio?: "16:9" | "1:1" | "9:16";
  color_scheme?:
    | "vibrant"
    | "sunset"
    | "forest"
    | "neon"
    | "purple"
    | "monochrome"
    | "ocean"
    | "pastel";
  text_overlay?: boolean;
  image_url?: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ThumbnilSchema = new mongoose.Schema<IThumbnil>(
  {
    userId: { type: String, required: false, ref: "User" },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    style: {
      type: String,
      required: true,
      enum: [
        "Bold & Graphic",
        "Tech/Futuristic",
        "Minimalist",
        "Photorealistic",
        "Illustrated",
      ]
    },
    aspect_ratio: {
      type: String,
      default: "16:9",
      enum: ["16:9", "1:1", "9:16"]

    },
    color_scheme: {
      type: String,
      enum: [
        "vibrant",
        "sunset",
        "forest",
        "neon",
        "purple",
        "monochrome",
        "ocean",
        "pastel",
      ]
    },
    text_overlay: { type: Boolean, default: false },
    image_url: { type: String },
    prompt_used: { type: String },
    user_prompt: { type: String },
    isGenerating: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Thumbnil = mongoose.model<IThumbnil>("Thumbnil", ThumbnilSchema);
export default Thumbnil;
