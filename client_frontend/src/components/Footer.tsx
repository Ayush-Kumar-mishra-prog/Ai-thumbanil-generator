import { footerData } from "../data/footer";
import { DribbbleIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden mt-40">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent" />
                <div className="absolute -top-16 -left-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
                <div className="absolute top-10 right-[-6rem] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-rose-500/15 blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 py-10 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
            <motion.div className="flex flex-wrap items-start gap-10 md:gap-35"
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <a href="#">
                    <img className="size-8 aspect-square" src="/favicon.svg" alt="footer logo" width={32} height={32} />
                </a>
                {footerData.map((section, index) => (
                    <div key={index}>
                        <p className="text-slate-100 font-semibold">{section.title}</p>
                        <ul className="mt-2 space-y-2">
                            {section.links.map((link: IFooterLink, index: number) => (
                                <li key={index}>
                                    <Link to={link.href} className="hover:text-pink-600 transition">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>
            <motion.div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
                initial={{ x: 150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                <div className="flex items-center gap-4 mt-3">
                    <a href="#" target="_blank" rel="noreferrer">
                        <DribbbleIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                        <LinkedinIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                        <TwitterIcon className="size-5 hover:text-pink-500" />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                        <YoutubeIcon className="size-6 hover:text-pink-500" />
                    </a>
                </div>
                <p className="mt-3 text-center">&copy; {new Date().getFullYear()} <a href="#">Thumblify Build By: Ayush kumar mishra</a></p>
            </motion.div>
            </div>
        </footer>
    );
}
