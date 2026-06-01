
// import { CheckIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
// import TiltedImage from "../components/TiltImage";
// import { motion } from "motion/react";
// import {useNavigate} from 'react-router-dom'

// export default function HeroSection() {
//     const navigate = useNavigate()
    const specialFeatures = [
        "No design skills needed",
        "Fast generation",
        "High CTR templetes",
    ];

//     return (
//         <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
//             <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600  blur-[300px]"></div>
//             <motion.a href="#" className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-44 bg-black"
//                 initial={{ y: -20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 <span className="bg-purple-600 custom-css-white text-xs px-3.5 py-1 rounded-full">
//                     NEW
//                 </span>
//                 <p className="flex items-center gap-1 text-white ">
//                     <span>Generate your first thumbnil for free </span>
//                     <ChevronRightIcon size={16} className="group-hover:translate-x-0.5 transition duration-300" />
//                 </p>
//             </motion.a>
//             <motion.h1 className="text-5xl/17 md:text-6xl/21 font-medium max-w-2xl text-center"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
//             >
//                 Ai thumbnil generator for your <span className="move-gradient px-3 rounded-xl text-nowrap cutom-css-title">Videos</span>
//             </motion.h1>
//             <motion.p className="text-base text-center text-purple-900 max-w-lg mt-6"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 Stop wasting hours on design. Get high-converting thumbnils in seconds with your advanced AI powered website.</motion.p>
//             <motion.div className="flex items-center gap-4 mt-8"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 <button onClick={()=>navigate('generate')} className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-7 h-11">
//                     Generate now
//                 </button>
//                 <button className="flex items-center gap-2 border border-pink-900 hover:bg-pink-950/50 transition rounded-full px-6 h-11">
//                     <VideoIcon strokeWidth={1} />
//                     <span>See how it works</span>
//                 </button>
//             </motion.div>

//             <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
//                 {specialFeatures.map((feature, index) => (
//                     <motion.p className="flex items-center gap-2" key={index}
//                         initial={{ y: 30, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.2, duration: 0.3 }}
//                     >
//                         <CheckIcon className="size-5 text-pink-600" />
//                         <span className="text-slate-400">{feature}</span>
//                     </motion.p>
//                 ))}
//             </div>
//             <TiltedImage />
//         </div>
//     );
// }


import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, DotIcon, VideoIcon } from "lucide-react";
import { motion } from "motion/react";
import TiltedImage from "../components/TiltImage";

export default function Hero() {
    const navigate = useNavigate()
    return (
        <section className="relative overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[56px_56px] pointer-events-none" />

            {/* Red soft glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-sm px-3.5 py-1.5 rounded-full mb-8">
                    <span className="size-1.5 bg-red-400 rounded-full" />
                    AI-Powered Social Media thumbnail generator
                </div>

                {/* Headline */}
                <motion.h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl"
                 initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}>
                    Create Ai Generated Thubnail
                    <br />
                    <span className="text-red-400 italic">For Videos.</span>
                </motion.h1>
                {/* <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-900">
                    Create Ai Generated Thubnail
                    <br />
                    <span className="text-red-400 italic">For Videos.</span>
                </h1> */}

                {/* Subheadline */}
                {/* <p className="mt-7 text-gray-500 max-w-2xl mx-auto">Scheduler lets you create, schedule, and auto-engage across all your social platforms — powered by AI that writes your captions and replies for you.</p> */}

                 <motion.p className="mt-7 text-purple-900 max-w-2xl mx-auto text-lg"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
             >
                Stop wasting hours on design. Get high-converting thumbnils in seconds with your advanced AI powered website.</motion.p>

                {/* CTAs */}

                <motion.div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
                 initial={{ y: 50, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
             >
                {/* <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"> */}
                    <button onClick={()=>navigate('generate')} className="bg-red-500 text-white rounded-full font-medium hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all">
                        Start for free <ArrowRightIcon className="size-4" />
                    </button>
                    {/* <a href="#how-it-works" className="bg-transparent text-[#333] border-[1.5px] border-black/10 rounded-full font-medium hover:bg-black/5 hover:border-black/20 inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto backdrop-blur justify-center transition-all">
                        See how it works
                    </a> */}
                     <button className="flex items-center gap-2 border border-pink-900 hover:bg-pink-950/50 hover:text-slate-300 transition rounded-full px-6 h-11">
                     <VideoIcon strokeWidth={1} />
                     <span>See how it works</span>
                </button>
                </motion.div>
                

                <p className="mt-5 text-xs text-gray-400">No credit card required · Free forever plan available</p>
            </div>

            {/* Dashboard mockup */}

             <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
                {specialFeatures.map((feature, index) => (
                     <motion.p className="flex items-center gap-2" key={index}
                         initial={{ y: 30, opacity: 0 }}
                         whileInView={{ y: 0, opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: index * 0.2, duration: 0.3 }}
                     >
                         <CheckIcon className="size-5 text-pink-600" />
                         <span className="text-slate-400">{feature}</span>
                     </motion.p>
                 ))}
             </div>
            <TiltedImage />
        </section>
    );
}
