// 'use client'
// import SectionTitle from "../components/SectionTitle"
// import { pricingData } from "../data/pricing";
// import type { IPricing } from "../types";
// import { CheckIcon } from "lucide-react";
// import { motion } from "motion/react";

// export default function PricingSection() {
//     return (
//         <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32">
//             <SectionTitle text1="Pricing" text2="Our Pricing Plans" text3="Choose the plan that files your creation shedule. Cancel anytime" />

//             <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
//                 {pricingData.map((plan: IPricing, index: number) => (
//                     <motion.div key={index} className={`w-72 text-center border border-pink-950 p-6 pb-16 rounded-xl ${plan.mostPopular ? 'bg-pink-950 relative' : 'bg-pink-950/30'}`}
//                         initial={{ y: 150, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//                     >
//                         {plan.mostPopular && (
//                             <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-pink-400 rounded-full">Most Popular</p>
//                         )}
//                         <p className="font-semibold">{plan.name}</p>
//                         <h1 className="text-3xl font-semibold">${plan.price}<span className="text-gray-500 font-normal text-sm">/{plan.period}</span></h1>
//                         <ul className="list-none text-slate-300 mt-6 space-y-2">
//                             {plan.features.map((feature, index) => (
//                                 <li key={index} className="flex items-center gap-2">
//                                     <CheckIcon className="size-4.5 text-pink-600" />
//                                     <p>{feature}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                         <button type="button" className={`w-full py-2.5 rounded-md font-medium mt-7 transition-all ${plan.mostPopular ? 'bg-white text-pink-600 hover:bg-slate-200' : 'bg-pink-500 hover:bg-pink-600'}`}>
//                             Get Started
//                         </button>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for creating youtube thumbnails with few limitions.",
        features: ["5 thumbnails per month", "Basic templates", "Standard AI designs", "Community support"],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "Perfect for growing your audience and automating your content creation.",
        features: ["Unlimited thumbnails", "Premium templates", "Advanced AI designs", "Priority support"],
        cta: "Start 14-day Free Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/month",
        description: "Perfect for teams and agencies managing multiple brands at scale.",
        features: ["Unlimited thumbnails", "Premium templates", "Advanced AI designs", "Priority support", "Team collaboration"],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <CircleCheckBigIcon className="size-3" />
                        Simple pricing
                    </div>
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-gray-900">
                        Plans for every stage
                        <br />
                        <span className="text-red-400 italic">of growth</span>
                    </h2>
                    <p className="mt-5 text-gray-500 max-w-md mx-auto">Start free, upgrade when you're ready. Cancel anytime — no hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                    {pricingPlans.map((plan) => (
                        <div key={plan.name} className={`rounded-2xl border p-7 flex flex-col gap-6 relative ${plan.highlight ? "bg-red-500 text-white border-red-400 shadow-2xl shadow-red-100" : "bg-white text-slate-900 border-slate-200"}`}>
                            {plan.highlight && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3.5 py-1.5 rounded-full">Most Popular</div>}
                            <div>
                                <div className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-red-100" : "text-red-500"}`}>{plan.name}</div>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className={`text-sm mb-1.5 ${plan.highlight ? "text-red-200" : "text-slate-400"}`}>{plan.period}</span>
                                </div>
                                <p className={`text-sm mt-2 leading-relaxed ${plan.highlight ? "text-red-100" : "text-slate-500"}`}>{plan.description}</p>
                            </div>

                            <ul className="space-y-2.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm">
                                        <div className={`size-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-red-400" : "bg-red-50"}`}>
                                            <CheckIcon className={`w-2.5 h-2.5 ${plan.highlight ? "text-white" : "text-red-500"}`} />
                                        </div>
                                        <span className={plan.highlight ? "text-red-50" : "text-slate-600"}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/#" className={`mt-auto text-center font-semibold text-sm px-6 py-3 rounded-full ${plan.highlight ? "bg-white text-red-500 hover:bg-red-50" : "bg-red-500 text-white hover:bg-red-600"}`}>
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
