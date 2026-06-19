"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, X, Image as ImageIcon } from "lucide-react";
import galleryData from "../data/gallery.json";

type Category = "all" | "education" | "healthcare" | "environment" | "relief";

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("all");
  const [activeImage, setActiveImage] = useState<{ src: string; caption: string } | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "environment", label: "Environment" },
    { id: "relief", label: "Relief Work" }
  ];

  const filteredPhotos = filter === "all" 
    ? galleryData 
    : galleryData.filter(p => p.category === filter);

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2024/02/L4H-Mangrove-Plantation-Photo1.jpg"
            alt="Gallery Photos Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60 flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full text-white/70 shadow-soft">
              <ImageIcon className="w-4 h-4 text-secondary" />
              On-Ground Moments
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Photo Gallery
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Visual glimpses capturing our diagnostic medical clinics, student support virtual/offline meetings, Sundarban mangrove plantings, and winter blanket distributions.
            </p>
          </div>
        </div>
      </section>

      {/* Category selector */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as Category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
                filter === cat.id
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft hover:bg-foreground/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Images */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.02 }}
                  key={item.src}
                  onClick={() => setActiveImage({ src: item.src, caption: item.caption })}
                  className="group flex flex-col gap-3 p-4 rounded-3xl glass-panel border border-white/60 shadow-soft cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                >
                  <div className="aspect-square rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                    <img referrerPolicy="no-referrer"
                      src={item.src}
                      alt={item.caption}
                      
                      
                      className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-102 transition-premium"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-premium">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg text-foreground">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-foreground/80 line-clamp-2 leading-relaxed px-1 font-medium">
                    {item.caption}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl flex flex-col items-center gap-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-premium border border-white/10 bg-black">
                <img referrerPolicy="no-referrer"
                  src={activeImage.src}
                  alt={activeImage.caption}
                  
                  className="w-full h-full object-cover absolute inset-0 object-contain"
                />
              </div>
              <p className="text-white text-sm md:text-base text-center max-w-2xl px-4 leading-relaxed font-sans">
                {activeImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
