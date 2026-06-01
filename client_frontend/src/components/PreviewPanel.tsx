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
      <div className="relative mx-auto w-full max-w-2xl overflow-hidden">
        <div className={`relative  ${aspectClasses[aspectRatio]}`}>
          {isLoading && (
            <div
              className="absolute inset-0 flex flex-col
                    items-center justify-center gap-4 bg-[var(--brand)]/10"
            >
              <Loader2Icon className="size-8 animate-spin text-[var(--brand)]/70" />
              <div className="text-center">
                <p className="text-sm font-medium text-[var(--brand)]">
                  AI is creating your thumbnil..
                </p>
                <p className="mt-1 text-xs text-[var(--brand)]/60">
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
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--brand)]/80 to-transparent p-4">
                <h3 className="mb-2 text-lg font-bold text-[var(--paper)]">
                  {thumbnil.title}
                </h3>
                {thumbnil.description && (
                  <p className="text-sm text-[var(--paper)]/80">
                    {thumbnil.description}
                  </p>
                )}
              </div>

              <div
                className="absolute inset-0 flex items-end justify-center
                         bg-[var(--brand)]/10 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <DownloadIcon className="size-4" />
                <button
                  type="button"
                  className="mb-6 flex items-center gap-2 
                            rounded bg-[var(--paper)]/90 px-5 py-2.5 text-xs font-medium text-[var(--brand)] transition
                            ring-2 ring-[var(--paper)]/40 backdrop-blur hover:scale-105 active:scale-95
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
                    justify-center gap-4 rounded-lg border-2 border-dashed border-[var(--brand)]/20
                    bg-[var(--brand)]/5"
            >
              <div
                className="max-sm:hidden flex size-20 items-center justify-center
                        rounded-full bg-[var(--brand)]/10"
              >
                <ImageIcon className="size-10 text-[var(--brand)] opacity-50" />
              </div>
              <div className="px-4 text-center">
                <p className="text-sm font-medium text-[var(--brand)]">
                  Generate your first thumbnil
                </p>
                <p className="mt-1 text-xs text-[var(--brand)]/60">
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
