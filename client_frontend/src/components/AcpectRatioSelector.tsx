import React from "react";
import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { aspectRatios, type AspectRatio } from "../assest/assets";

export default function AspectRationSelector({
  value,
  onChange,
}: {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}) {
  const icon = {
    "16:9": <RectangleHorizontal className="size-6" />,
    "1:1": <Square className="size-6" />,
    "9:16": <RectangleVertical className="size-6" />,
  } as Record<AspectRatio, React.ReactNode>;
  return (
    <>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--brand)]">
          Aspect ratio
        </label>
        <div className="flex flex-wrap gap-6">
          {aspectRatios.map((ratio) => {
            const selected = value === ratio;
            return (
              <button
                key={ratio}
                type="button"
                onClick={() => onChange(ratio)}
                className={`flex items-center gap-2 rounded-lg border border-[var(--brand)]/20 px-5
                        py-2.5 text-sm text-[var(--brand)] transition ${
                          selected ? "bg-[var(--brand)] text-[var(--paper)]" : "hover:bg-[var(--brand)]/10"
                        }`}
              >
                {icon[ratio]}
                <span className="tracking-widest">{ratio} </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
