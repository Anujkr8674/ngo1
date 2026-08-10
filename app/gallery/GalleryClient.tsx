"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, X, Image as ImageIcon } from "lucide-react";
import SmoothImage from "../components/SmoothImage";

export default function GalleryClient({ initialCategories, initialImages }: { initialCategories: any[], initialImages: any[] }) {
  const [filter, setFilter] = useState("all");
  const [activeImage, setActiveImage] = useState<{ src: string; caption: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const handleFilterChange = (catId: string) => {
    setFilter(catId);
    setCurrentPage(1);
  };

  const categories = [
    { id: "all", name: "All Photos" },
    ...initialCategories
  ];

  const filteredPhotos = filter === "all"
    ? initialImages
    : initialImages.filter(p => p.categoryId === filter);

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE);
  const displayedPhotos = filteredPhotos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic/L4H-Mangrove-Plantation-Photo1.jpg"
            alt="Gallery Photos Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold  flex items-center gap-2 px-4 py-1.5 rounded-full  shadow-soft bg-[#DCCFF8] text-[#444444]">
              <ImageIcon className="w-4 h-4 text-[#444444]" />
              On-Ground Moments
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Photo Gallery
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Visual glimpses capturing our diagnostic medical clinics, student support virtual/offline meetings, Sundarban mangrove plantings, and winter blanket distributions.
            </p>
          </div>
        </div>
      </section>

      {/* Category selector */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const count = cat.id === "all"
              ? initialImages.length
              : initialImages.filter(img => img.categoryId === cat.id).length;
            const label = cat.id === "all" ? `All (${count})` : `${cat.name} (${count})`;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${filter === cat.id
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft hover:"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of Images */}
      <section id="gallery-grid" className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto min-h-[400px]">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedPhotos.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.02 }}
                  key={item.id}
                  onClick={() => setActiveImage({ src: item.url, caption: item.caption || '' })}
                  className="group flex flex-col rounded-[2.5rem] bg-white shadow-soft border border-[#C1D6C1] cursor-pointer overflow-hidden pb-6 hover:-translate-y-2 hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300"
                >
                  <div className="relative aspect-square w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-gray-50">
                    <SmoothImage
                      src={item.url}
                      alt={item.caption || 'Gallery Image'}
                      aspectRatioClassName="aspect-square"
                      className="group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-premium">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg text-foreground">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 px-6 flex flex-col h-full justify-between">
                    <span className="text-xs text-foreground/80 line-clamp-2 leading-relaxed font-semibold">
                      {item.caption}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {displayedPhotos.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                No images available in this category yet.
              </div>
            )}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 pt-6 border-t border-[#C1D6C1]/50 select-none">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-white/60 disabled:opacity-20 transition-colors cursor-pointer disabled:cursor-not-allowed text-base font-medium"
                title="Previous Page"
              >
                ←
              </button>

              {(() => {
                if (totalPages <= 7) {
                  return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-white/80 text-foreground font-bold shadow-sm border border-[#C1D6C1]/50'
                          : 'text-foreground/70 hover:bg-white/40 font-medium'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ));
                }
                const range: (number | string)[] = [];
                const delta = 1;
                const left = currentPage - delta;
                const right = currentPage + delta;

                for (let i = 1; i <= totalPages; i++) {
                  if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                    range.push(i);
                  } else if (range[range.length - 1] !== "...") {
                    range.push("...");
                  }
                }

                return range.map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-foreground/40 text-xs">
                        ...
                      </span>
                    );
                  }
                  const pageNum = item as number;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-white/80 text-foreground font-bold shadow-sm border border-[#C1D6C1]/50'
                          : 'text-foreground/70 hover:bg-white/40 font-medium'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                });
              })()}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-white/60 disabled:opacity-20 transition-colors cursor-pointer disabled:cursor-not-allowed text-base font-medium"
                title="Next Page"
              >
                →
              </button>
            </div>
          )}
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
              className="absolute top-6 right-6 p-3 rounded-full hover: text-white transition-colors cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
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
                <SmoothImage
                  src={activeImage.src}
                  alt={activeImage.caption}
                  aspectRatioClassName="aspect-[4/3]"
                  className="object-contain"
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
