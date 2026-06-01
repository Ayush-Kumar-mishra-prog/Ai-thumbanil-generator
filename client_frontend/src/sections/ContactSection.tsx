
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
    return (
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle text1="Contact" text2="Grow your channel" text3="Have question about our AI? Ready to scale your views?" />
            <form onSubmit={(e) => e.preventDefault()} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full' >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 text-pink-600 font-bold'>Your name</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <UserIcon className='size-5 text-pink-950' />
                        <input name='name' type="text" placeholder='Enter your name' className='w-full p-3 outline-none text-pink-900' />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-bold text-pink-400'>Email id</p>
                    <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-pink-500'>
                        <MailIcon className='size-5 text-pink-950' />
                        <input name='email' type="email" placeholder='Enter your email' className='w-full p-3 outline-none text-pink-400' />
                    </div>
                </motion.div>

                <motion.div className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <p className='mb-2 font-bold text-pink-400'>Message</p>
                    <textarea name='message' rows={8} placeholder='Enter your message' className='focus:border-pink-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700 text-pink-400' />
                </motion.div>

                <motion.button type='submit' className='w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    Submit
                    <ArrowRightIcon className="size-5" />
                </motion.button>
            </form>
        </div>
    );
}

// import { Link, useNavigate } from "react-router-dom";
// import { ArrowRightIcon } from "lucide-react";

// export default function CTA() {
//     const navigate = useNavigate()
//     return (
//         <section className="py-20" style={{ background: "#ffffff" }}>
//             <div className="max-w-6xl mx-auto px-5 sm:px-8">
//                 <div
//                     className="relative rounded-3xl overflow-hidden p-14 sm:p-20 text-center"
//                     style={{
//                         background: "linear-gradient(145deg, #fff5f5 0%, #fef2f2 100%)",
//                         border: "1.5px solid rgba(239,68,68,0.12)",
//                     }}
//                 >
//                     {/* Glow blobs */}
//                     <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)" }} />
//                     <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)" }} />

//                     <div className="relative">
//                         <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">Ready to grow?</div>
//                         <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium text-gray-900">
//                             Create Stunning Thumbnail
//                             <br />
//                             <span className="text-red-400 italic">For Youtube</span>
//                         </h2>
//                         <p className="mt-6 text-gray-500 max-w-lg mx-auto  text-lg">Create the thumbnail using AI and grow up your Youtube channel for free.</p>

//                         <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
//                             <button onClick={()=>navigate('login')} className="bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center">
//                                 Get Started Free <ArrowRightIcon className="size-4" />
//                             </button>
//                             <a href="#pricing" className="bg-transparent text-[#333] border-[1.5px] border-black/10 rounded-full font-medium hover:bg-black/5 hover:border-black/20 inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center">
//                                 View Pricing
//                             </a>
//                         </div>

//                         <p className="mt-6 text-xs text-gray-400">No credit card required · Cancel anytime</p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
