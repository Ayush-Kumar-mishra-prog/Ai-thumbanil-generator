
import React from "react";
import { thumbnailStyles, type ThumbnailStyle } from "../assest/assets";
import { ChevronDownIcon, CpuIcon, ImageIcon, PaintbrushIcon, SparkleIcon, SquareIcon } from "lucide-react";

export default function StyleSelector({value,onChange,isOpen,setIsOpen}:{value: ThumbnailStyle;
    onChange: (style: ThumbnailStyle)=> void;
    isOpen: boolean; setIsOpen: (open: boolean)=>void
}){
    const styleDiscriptions: Record <ThumbnailStyle, String> = {
        "Bold & Graphic": "High contrast, bold typography, striking visuals",
        "Minimalist": "Clean, simple, lots of white space",
        "Photorealistic": "Realistic lighting, camera depth, premium detail",
        "Illustrated": "Hand-drawn, artistic, creative",
        "Tech/Futuristic": "Modern, sleek, tech-inspired",
    }
    const styleIcons: Record <ThumbnailStyle, React.ReactNode> = {
        "Bold & Graphic": <SparkleIcon className="size-4" />,
        "Minimalist":<SquareIcon className="size-4" />,
        "Photorealistic": <ImageIcon className="size-4" />,
        "Illustrated": <PaintbrushIcon className="size-4" />,
        "Tech/Futuristic": <CpuIcon className="size-4" />,
    }
    
    return(
        <>
        <div className="relative space-y-3">
        <label className="block text-sm font-medium text-[var(--brand)]">Thumbnil style </label>
        <button type="button" onClick={()=>setIsOpen(!isOpen)} className="
        flex w-full items-center justify-between rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-left text-[var(--brand)] transition hover:bg-[var(--brand)]/5
        ">
            <div className="space-y-1">
                <div className="flex items-center gap-2 font-medium">
                    {styleIcons[value]}
                    <span> {value} </span>
                </div>
                <p className="text-xs text-[var(--brand)]/60"> {styleDiscriptions[value]} </p>
            </div>
              <ChevronDownIcon className={['h-5 w-5 text-[var(--brand)]/60 transition-transform',
                isOpen && 'rotate-180'
              ].join('')} />
        </button>
        {isOpen && (
            <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-[var(--brand)]/20 bg-[var(--paper)] shadow-lg">
                {thumbnailStyles.map((style)=>(
                    <button key={style} type="button" onClick={()=> {onChange(style);setIsOpen(false);}}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left text-[var(--brand)] transition hover:bg-[var(--brand)]/10">
                        <div className="mt-0 5"> {styleIcons[style]} </div>
                        <div>
                            <p className="font-medium"> {style} </p>
                            <p className="text-xs text-[var(--brand)]/60"> {styleDiscriptions[style]} </p>
                        </div>

                    </button>
                ))}
            </div>
        )}
        </div>
        </>
    )
}
