import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
import type { AspectRatio, IThumbnail } from "../assest/assets";

export default function PreviewPanel({
  thumbnil,
  isLoading,
  aspectRatio,
}: {
  thumbnil: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const onDownload = () => {
  if (!thumbnil?.image_url) return;

  const url = thumbnil.image_url.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

  return (
    <>
      <div className="relative mx-auto w-full max-w-2xl">
        <div className={`relative  ${aspectClasses[aspectRatio]}`}>
          {isLoading && (
            <div
              className="absolute inset-0 flex flex-col
                    items-center justify-center gap-4 bg-black/25"
            >
              <Loader2Icon className="size-8 animate-spin text-zinc-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-200">
                  AI is creating your thumbnil..
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  This may take 10-20 seconds
                </p>
              </div>
            </div>
          )}
          {!isLoading && thumbnil?.image_url && (
            <div className="group relative h-full w-full">
              <img
                src={thumbnil?.image_url}
                alt={thumbnil.title}
                className="
                        h-full w-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg font-bold mb-2">
                  {thumbnil.title}
                </h3>
                {thumbnil.description && (
                  <p className="text-white/80 text-sm">
                    {thumbnil.description}
                  </p>
                )}
              </div>

              <div
                className="absolute inset-0 flex items-end justify-center
                         bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <DownloadIcon className="size-4" />
                <button
                  type="button"
                  className="mb-6 flex items-center gap-2 
                            rounded px-5 py-2.5 text-xs font-medium transition bg-white/30
                            ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95
                             "
                  onClick={onDownload}
                >
                  Download thumbnil
                </button>
              </div>
            </div>
          )}
          {!isLoading && !thumbnil?.image_url && (
            <div
              className="absolute inset-0 m-2 flex flex-col items-center 
                    justify-center gap-4 rounded-lg border-2 border-dashed border-white/20
                    bg-white/10"
            >
              <div
                className="max-sm:hidden flex size-20 items-center justify-center
                        rounded-full bg-white/10"
              >
                <ImageIcon className="size-10 text-white opacity-50" />
              </div>
              <div className="px-4 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  Generate your first thumbnil
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Fill out the form and click Generate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
