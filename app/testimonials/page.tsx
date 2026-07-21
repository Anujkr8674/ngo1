"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Heart } from "lucide-react";
import testimonialsData from "../data/testimonials.json";

const MotionCard = motion.div;

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-10-480x343.jpg"
            alt="Testimonials Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-soft bg-[#DCCFF8] text-[#444444]"
            >
              <Heart className="w-3.5 h-3.5 text-[#444444]" />
              Voice of the People
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Video Testimonials
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              Hear directly from our members, students, and supporters sharing their journey of collective actions and hope.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-16 px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 border border-foreground/10 shadow-premium flex flex-col gap-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {testimonialsData.map((item, idx) => (
              <MotionCard
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                key={item.name}
                onClick={() => setActiveVideo(item.video)}
                className="w-full h-[400px] rounded-[2.5rem] group cursor-pointer border border-[#B8C5D6] hover:border-[#90BCE6] shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col bg-[#E8ECF2] hover:bg-[#CFE8FF] overflow-hidden relative"
              >
                <img referrerPolicy="no-referrer"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-premium"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-premium">
                  <div className="w-14 h-14 rounded-full backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center shadow-lg text-white">
                    <Play className="w-6 h-6 fill-current text-white ml-1" />
                  </div>
                </div>
                {/* Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest font-sans opacity-75">Supporter Story</span>
                  <h4 className="font-display font-bold text-lg leading-tight">{item.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs backdrop-blur-md bg-white/20 border border-white/20 w-fit px-2.5 py-1 rounded-full font-semibold uppercase mt-1">
                    <Play className="w-2.5 h-2.5 fill-current" /> Play Video
                  </div>
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-premium"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={activeVideo}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
