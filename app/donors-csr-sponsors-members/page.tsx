"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Eye } from "lucide-react";

export default function DonorsCSRSponsorsMembers() {
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const memberImages = [
        { src: "https://live4help.org/wp-content/uploads/2026/06/Members-1-June-18.png", title: "Patron Donors & Life Members - Sheet 1" },
        { src: "https://live4help.org/wp-content/uploads/2026/06/Members-2-June-18.png", title: "Patron Donors & Life Members - Sheet 2" },
        { src: "https://live4help.org/wp-content/uploads/2026/06/Members-3-June-18-.png", title: "Patron Donors & Life Members - Sheet 3" }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Intro Hero */}
            <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[100vh]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
                        alt="Donors & Members Hero"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="max-w-4xl mx-auto w-full z-10 relative pt-16">
                    <div className="w-full text-center flex flex-col items-center gap-6">
                        <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
                            <Sparkles className="w-4 h-4 text-[#444444]" />
                            Donors & Members
                        </span>
                        <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
                            Our Valued Partners
                        </h1>
                        <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
                            Recognizing the incredible individuals and organizations that make our mission possible.
                        </p>
                    </div>
                </div>
            </section>


            {/* Zoomable Members List */}
            <section className="py-8 px-6 md:px-12 bg-white pb-16">
                <div className="bg-[#F8E7DC] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
                    <div className="flex flex-col gap-4 max-w-xl">
                        <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-secondary" />
                            Sponsors Registry
                        </span>
                        <h3 className="font-display font-bold text-3xl text-foreground">Registered Members & Patrons</h3>
                        <p className="text-foreground/75 leading-relaxed text-sm">
                            We compile and maintain records of our life subscribers and corporate sponsors. Click below to inspect verified on-book member rolls.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                        {memberImages.map((sheet, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveImage(sheet.src)}
                                className="group flex flex-col gap-4 p-5 rounded-3xl glass-panel border border-white shadow-soft cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                            >
                                <div className="aspect-[4/5] rounded-2xl relative overflow-hidden shadow-inner">
                                    <img referrerPolicy="no-referrer"
                                        src={sheet.src}
                                        alt={sheet.title}
                                        className="w-full h-full object-cover absolute inset-0 object-top group-hover:scale-105 transition-premium"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-premium">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-foreground text-xs">
                                            <Eye className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <span className="font-semibold text-xs tracking-tight text-foreground/90">{sheet.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setActiveImage(null)}
                            className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                            aria-label="Close sheet"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="w-full max-w-2xl h-[85vh] relative rounded-2xl overflow-y-auto p-4 backdrop-blur-md border border-white/10"
                        >
                            <div className="relative w-full h-[1500px]">
                                <img referrerPolicy="no-referrer"
                                    src={activeImage}
                                    alt="Zoomed document"
                                    className="w-full h-full object-contain absolute inset-0 object-top"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
