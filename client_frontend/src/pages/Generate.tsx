import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  type AspectRatio,
  colorSchemes,
  type ThumbnailStyle,
  type IThumbnail,
} from "../assest/assets";
import AspectRationSelector from "../components/AcpectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchema from "../components/ColorSchema";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import api from "../config/api";
export default function Generate() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnil, setThumbnil] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemaId, setColorSchemaId] = useState<String>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdown, setStyleDropdown] = useState(false);

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error("Please login to generate thumbnail");
    if (!title.trim()) return toast.error("Title is required");

    try {
      setLoading(true);

      const api_payload = {
        title: title, // top title
        topic: title, // center text
        additionalPrompt: additionalDetails,
        aspectRatio: aspectRatio,
        colorScheme: colorSchemaId,
        style: style,
      };

      const { data } = await api.post("/api/thumbnil/generate", api_payload);

      if (data?.imageUrl) {
        setThumbnil({
          image_url: data.imageUrl,
          aspect_ratio: aspectRatio,
          title: title,
        } as IThumbnail);

        toast.success(data.message || "Thumbnail generated");
      } else {
        toast.error("Image URL not returned from server");
      }
    } catch (error: any) {
      console.error("Generate error:", error);
      toast.error("Failed to generate thumbnail");
    } finally {
      setLoading(false); // 🔥 MOST IMPORTANT LINE
    }
  };
  const fetchThumnil = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnil/${id}`);
      setThumbnil(data?.thumbnil as IThumbnail);
      setLoading(!data?.thumbnil?.image_url);
      setAdditionalDetails(data?.thumbnil?.user_prompt);
      setColorSchemaId(data?.thumbnil?.color_scheme);
      setAspectRatio(data?.thumbnil?.aspect_ratio);
      setStyle(data?.thumbnil?.style);
    } catch (err: any) {
      console.error("Error fetching thumbnil:", err);
      toast.error("Error fetching thumbnil");
    }
  };
  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumnil();
    }
    if (id && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumnil();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [id, isLoggedIn, loading]);
  useEffect(() => {
    if (!id && isLoggedIn) {
      setThumbnil(null);
    }
  });

  return (
    <>
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl max-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* {left pannel} */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-zinc-300 mb-1">
                    Create your thumbnil
                  </h1>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="E.g.,10 tips for better sleep"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-pink-500
                                "
                    />
                    <div>
                      <span className="text-xs text-zinc-400">
                        {title.length}/100{" "}
                      </span>
                    </div>
                  </div>
                  <AspectRationSelector
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />
                  {/* StyleSelector */}
                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropdown}
                    setIsOpen={setStyleDropdown}
                  />
                  <ColorSchema
                    value={colorSchemaId}
                    onChange={setColorSchemaId}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      {" "}
                      Additional prompts
                      <span className="text-zinc-400">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Add any specific preferences..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 
  placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    />
                  </div>
                </div>

                {!id && (
                  <button
                    onClick={handleGenerate}
                    className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 hover:from-pink-700 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Generating..." : "Generate Thumbnil"}
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Preview
                </h2>
                <PreviewPanel
                  thumbnil={thumbnil}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
