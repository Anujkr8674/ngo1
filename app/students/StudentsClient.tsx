"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Eye, X } from "lucide-react";
import { Card } from "../components/Card";

interface StudentSheet {
  id: string;
  title: string;
  src: string;
}

interface StudentsClientProps {
  initialSheets: StudentSheet[];
}

export default function StudentsClient({ initialSheets }: StudentsClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic/Free-coaching-2-480x360.jpeg"
            alt="Students Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-soft bg-[#DCCFF8] text-[#444444]">
              <GraduationCap className="w-3.5 h-3.5 text-[#444444]" />
              Education & Empowerment
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Our Students
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans">
              Discover the inspiring journeys and milestones of the students we support through our educational initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 pb-32">
        <div className="bg-[#F3EEF5] rounded-[3rem] py-10 px-6 md:py-16 md:px-10 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              Sponsor Insights
            </span>
            <h3 className="font-display font-bold text-3xl text-foreground">Registered Active Students & Alumni</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">
              We compile and publish verified records of our sponsored student accomplishments, current enrollment counts, and rosters. Click any sheet below to view in full resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {initialSheets.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-foreground/60 font-semibold text-sm">
                No student insights uploaded yet. Please check back later.
              </div>
            ) : (
              initialSheets.map((sheet, i) => (
                <Card
                  key={sheet.id || i}
                  onClick={() => setActiveImage(sheet.src)}
                  className="group pb-6 rounded-[2.5rem] border border-[#DFCFE5] shadow-soft cursor-pointer flex flex-col h-full overflow-hidden bg-white"
                >
                  <div className="aspect-[4/3] w-full rounded-b-2xl relative overflow-hidden shadow-inner shrink-0 bg-slate-50">
                    <img
                      referrerPolicy="no-referrer"
                      src={sheet.src}
                      alt={sheet.title}
                      className="w-full h-full object-cover absolute inset-0 object-top group-hover:scale-105 transition-premium"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-premium">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-foreground text-xs">
                        <Eye className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 px-6 flex flex-col h-full flex-grow">
                    <span className="font-bold text-sm tracking-tight text-slate-700 group-hover:text-purple-650 transition-colors">
                      {sheet.title}
                    </span>
                  </div>
                </Card>
              ))
            )}
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
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
              aria-label="Close sheet"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 p-2"
            >
              <img
                referrerPolicy="no-referrer"
                src={activeImage}
                alt="Zoomed student document"
                className="max-w-[88vw] max-h-[84vh] w-auto h-auto object-contain rounded-xl shadow-premium"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
