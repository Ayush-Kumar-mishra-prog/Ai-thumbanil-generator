import { useEffect, useState } from "react";
import { type IThumbnail } from "../assest/assets";
import { useNavigate } from "react-router-dom";
import { DownloadIcon, TrashIcon } from "lucide-react";
import { useAuth } from "../context/authContext";
import api from "../config/api";
import { useNotify } from "../context/notificationContext";

export default function MyGeneration() {
  const { isLoggedIn } = useAuth();
  const { notify } = useNotify();
  const navigate = useNavigate();
  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const [thumbnils, setThumbnil] = useState<IThumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fetchThumnil = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/user/thumbnils");
      setThumbnil(data.thumbnils || []);
    } catch (err: any) {
      console.log(err);
      notify(err?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = (image_url: string) => {
    if (!image_url) return;
    const link = document.createElement("a");
    link.href = image_url.replace("/upload/", "/upload/fl_attachment/");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this thumbnil?",
      );
      if (!confirm) return;
      const { data } = await api.delete(`/api/thumbnil/delete/${id}`);
      notify(data.message);
      fetchThumnil();
    } catch (err: any) {
      console.log(err);
      notify(err?.response?.data?.message || "Something went wrong", "error");
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchThumnil();
    } else {
      navigate("/login?redirect=/my-generation");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <div className="relative mt-32 min-h-screen overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--brand)]">My Generations</h1>
          <p className="mt-1 text-sm text-[var(--brand)]/65">
            View and manage all your AI- Generated thumbnails
          </p>
        </div>
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[260px] animate-pulse rounded-lg border border-[var(--brand)]/10 bg-[var(--brand)]/5"
              />
            ))}
          </div>
        )}
        {!loading && thumbnils.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-[var(--brand)]">
              No Thumbnils
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)]/65">
              Generate your first thumbnil to see it here
            </p>
          </div>
        )}
        {!loading && thumbnils.length > 0 && (
          <div
            className="columns-1 sm:columns-2 lg:columns-3
                 2xl:columns-4 gap-8"
          >
            {thumbnils.map((thumb: IThumbnail) => {
              const aspectClasses =
                aspectRatioClassMap[thumb.aspect_ratio || "16:9"];
              const imageUnavailable = !thumb.image_url || imageErrors[thumb._id];
              return (
                <div
                  key={thumb._id}
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="group relative mb-8 cursor-pointer rounded-lg border border-[var(--brand)]/15 bg-[var(--paper)] shadow-xl shadow-[var(--brand)]/10 transition"
                >
                  <div
                    className={`relative overflow-hidden
                                     rounded-t-lg ${aspectClasses} bg-[var(--brand)]/10`}
                  >
                    {!imageUnavailable ? (
                      <img
                        src={thumb.image_url}
                        alt={thumb.title}
                        onError={() =>
                          setImageErrors((current) => ({
                            ...current,
                            [thumb._id]: true,
                          }))
                        }
                        className="w-full
                                            h-full object-cover group-hover:scale-105 transition-transform
                                             duration-300"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center
                                             justify-center text-sm text-[var(--brand)]/60"
                      >
                        {thumb.isGenerating ? "Generating..." : "Image unavailable"}
                      </div>
                    )}
                    {thumb.isGenerating && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-[var(--brand)]/70 text-sm font-medium text-[var(--paper)]"
                      >
                        Generating...
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-[var(--brand)]">
                      {thumb.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-[var(--brand)]/65">
                      <span className="rounded bg-[var(--brand)]/10 px-2 py-0.5">
                        {thumb.style}
                      </span>
                      <span className="rounded bg-[var(--brand)]/10 px-2 py-0.5">
                        {thumb.color_scheme}
                      </span>
                      <span className="rounded bg-[var(--brand)]/10 px-2 py-0.5">
                        {thumb.aspect_ratio}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--brand)]/50">
                      {thumb.createdAt ? new Date(thumb.createdAt).toDateString() : "Recently created"}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute
                                     bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex
                                      gap-1.5"
                  >
                    <TrashIcon
                      onClick={() => handleDelete(thumb._id)}
                      className="size-6 rounded bg-[var(--brand)]/70 p-1 text-[var(--paper)] transition-all hover:bg-[var(--brand-dark)]"
                    />

                    <DownloadIcon
                      onClick={() => handleDownload(thumb.image_url || "")}
                      className="size-6 rounded bg-[var(--brand)]/70 p-1 text-[var(--paper)] transition-all hover:bg-[var(--brand-dark)]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
