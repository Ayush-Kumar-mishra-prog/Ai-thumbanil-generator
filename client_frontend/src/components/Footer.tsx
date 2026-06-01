import { footerData } from "../data/footer";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative mt-40 overflow-hidden border-t border-[var(--brand)]/10">
            <div className="relative z-10 flex flex-wrap justify-center gap-10 overflow-hidden px-6 py-10 text-[13px] text-[var(--brand)]/65 md:justify-between md:gap-20 md:px-16 lg:px-24 xl:px-32">
            <motion.div className="flex flex-wrap items-start gap-10 md:gap-35"
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}>
                    <div className="flex items-center justify-center">
                        <p className="text-center  text-lg bg-linear-to-r from-[var(--brand)] to-pink-400 text-transparent bg-clip-text">
                            Thumblify © {new Date().getFullYear()}. All rights reserved. 
                            <span className="text-[var(--brand)] font-bold px-3 text-md">Ayush kumar mishra</span>
                        </p>
                    </div>
            
               
            </motion.div>
            
            </div>
        </footer>
    );
}
