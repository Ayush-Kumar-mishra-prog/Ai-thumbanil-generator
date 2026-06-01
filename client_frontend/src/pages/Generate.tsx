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
import api from "../config/api";
import { useApiSettings } from "../context/apiSettingsContext";
import { useNotify } from "../context/notificationContext";

const INSUFFICIENT_CREDITS_MESSAGE =
  "Insufficient credits to generate Thumbnail try to buy more credits or use Different Account";

export default function Generate() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { provider, model, apiKey, hasApiKey } = useApiSettings();
  const { notify } = useNotify();
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
    if (!isLoggedIn) {
      notify("Please login to generate thumbnail", "error");
      navigate(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!hasApiKey) {
      notify("Please add your API key before generating", "error");
      navigate(`/apis?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!title.trim()) return notify("Title is required", "error");
    setLoading(true);

    try {
      const api_payload = {
        title, // top title
        prompt: additionalDetails,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemaId,
        style,
        text_overlay: true,
        apiProvider: provider,
        apiKey: apiKey.trim(),
        model,
      };

      const { data } = await api.post("/api/thumbnil/generate", api_payload);

      if (data.thumbnil) {
        navigate(`/generate/${data.thumbnil._id}`);
        notify(data.message);
      }
    } catch (err: any) {
      console.error("Error generating thumbnil:", err);
      const isInsufficientCredits =
        err?.response?.status === 402 ||
        err?.response?.data?.code === "INSUFFICIENT_CREDITS";

      notify(
        isInsufficientCredits
          ? INSUFFICIENT_CREDITS_MESSAGE
          : err?.response?.data?.message || "Error generating thumbnil",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchThumnil = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnil/${id}`);
      setThumbnil(data?.thumbnil as IThumbnail);
      setLoading(
        Boolean(data?.thumbnil?.isGenerating && !data?.thumbnil?.image_url),
      );
      setAdditionalDetails(data?.thumbnil?.user_prompt);
      setTitle(data?.thumbnil?.title)
      setColorSchemaId(data?.thumbnil?.color_scheme);
      setAspectRatio(data?.thumbnil?.aspect_ratio);
      setStyle(data?.thumbnil?.style);
    } catch (err: any) {
      console.error("Error fetching thumbnil:", err);
      notify("Error fetching thumbnil", "error");
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
  }, [id, isLoggedIn]);
  useEffect(() => {
    if (!id && isLoggedIn) {
      setThumbnil(null);
    }
  }, [id, isLoggedIn]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden pt-24">
        <main className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* {left pannel} */}
            <div className="space-y-6">
              <div className="space-y-6 rounded-lg border border-[var(--brand)]/15 bg-[var(--paper)] p-6 shadow-xl shadow-[var(--brand)]/10">
                <div>
                  <h1 className="mb-1 text-xl font-bold text-[var(--brand)]">
                    Create your thumbnil
                  </h1>
                  <p className="text-sm text-[var(--brand)]/65">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/5 px-4 py-3 text-sm text-[var(--brand)]">
                  Selected model: <span className="font-semibold">{model}</span>
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
                      className="w-full rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-[var(--brand)] placeholder:text-[var(--brand)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/25
                                "
                    />
                    <div>
                      <span className="text-xs text-[var(--brand)]/60">
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
                      <span className="text-[var(--brand)]/55">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Add any specific preferences..."
                      className="w-full resize-none rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-[var(--brand)] placeholder:text-[var(--brand)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/25"
                    />
                  </div>
                </div>

                {!id && (
                  <button
                    onClick={handleGenerate}
                    className="w-full rounded-lg bg-[var(--brand)] py-3.5 text-[15px] font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed"
                  >
                    {loading ? "Generating..." : "Generate Thumbnil"}
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--paper)] p-6 shadow-xl shadow-[var(--brand)]/10">
                <h2 className="mb-4 text-lg font-semibold text-[var(--brand)]">
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
