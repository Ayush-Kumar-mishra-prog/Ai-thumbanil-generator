import { Request, Response } from "express";
import Thumbnil from "../models/Thumbnil.js";
import ai from "../config/Ai.js";
import { v2 as cloudinary } from "cloudinary";
const stylePrompts = {
  "Bold & Graphic":
    "eye-catching thumbnail, bold typography, vibrant colors, expressive face, dramatic lighting, high contrast",
  "Tech/Futuristic":
    "futuristic design, glowing UI, holographic effects, cyberpunk style, sharp lighting",
  Minimalist:
    "clean layout, minimal design, lots of whitespace, simple shapes",
  Photorealistic:
    "ultra realistic, DSLR quality, natural lighting, depth of field",
  Illustrated:
    "digital illustration, cartoon style, bold outlines, vibrant colors",
};

const colorSchemeDescriptions = {
  vibrant: "high saturation, bold contrast colors",
  sunset: "orange, pink, purple sunset tones",
  forest: "green earthy tones, natural palette",
  neon: "neon glow, cyberpunk lighting",
  purple: "violet and magenta tones",
  monochrome: "black and white, high contrast",
  ocean: "blue and teal tones",
  pastel: "soft pastel colors",
};

export const generateThumbnil = async (req: Request, res: Response) => {
  let thumbnil: any;

  try {
    const { userId } = req.session;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio = "16:9",
      color_scheme,
      text_overlay,
    } = req.body;

    // ✅ Create DB entry
    thumbnil = await Thumbnil.create({
      userId,
      title,
      prompt_used: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    // ✅ Build Prompt (clean + powerful)
    let finalPrompt = `
Create a high-converting YouTube thumbnail.

Title: ${title}

Style: ${stylePrompts[style as keyof typeof stylePrompts]}

${color_scheme ? `Color: ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]}` : ""}

${user_prompt ? `Extra: ${user_prompt}` : ""}

${text_overlay ? `Text on image: "${text_overlay}"` : ""}

Make it visually striking, high CTR, bold, professional, and attention-grabbing.
`;

    //  Generate Image (Chat Completions)
    const response: any = await ai.chat.completions.create({
      model: "google/gemini-3.1-flash-image-preview",
      messages: [{ role: "user", content: finalPrompt }],
      max_tokens: 2048,
    });

    const message = response?.choices?.[0]?.message;
    if (!message) throw new Error("No image generated");

    let imageUrl: string | null = null;

    if (typeof message.content === "string") {
      imageUrl = message.content.trim();
    } else if (Array.isArray(message.content)) {
      const imagePart = message.content.find(
        (part: any) => part?.type === "image_url" && part?.image_url?.url
      );
      imageUrl = imagePart?.image_url?.url || null;
    } else if (Array.isArray(message.images) && message.images[0]?.image_url?.url) {
      imageUrl = message.images[0].image_url.url;
    }

    if (!imageUrl) throw new Error("No image generated");

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "image",
    });

    thumbnil.image_url = uploadResult.secure_url || uploadResult.url;
    thumbnil.isGenerating = false;
    await thumbnil.save();

    res
      .status(200)
      .json({ message: "Thumbnil generated successfully", thumbnil });
  } catch (err: any) {
     console.error("Error generating thumbnil:", err);
    res
      .status(500)
      .json({
        message: "Server error during thumbnil generation",
        error: err.message,
      });
    }
}

export const deleteThumbnil = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;
    await Thumbnil.findOneAndDelete({ _id: id, userId });

    res.status(200).json({ message: "Thumbnil deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting thumbnil:", err);
    res
      .status(500)
      .json({
        message: "Server error during thumbnil deletion",
        error: err.message,
      });
  }
};
