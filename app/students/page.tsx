"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, GraduationCap } from "lucide-react";
import blogsData from "../data/blogs.json";

export default function Students() {
  // Filter for student/education related blog posts
  const studentBlogs = blogsData.filter(blog =>
    blog.slug.includes("student") || blog.slug.includes("education")
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/12/Free-coaching-2-480x360.jpeg"
            alt="Students Hero"
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
              <GraduationCap className="w-3.5 h-3.5 text-[#444444]" />
              Education & Empowerment
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Our Students
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              Discover the inspiring journeys and milestones of the students we support through our educational initiatives.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 bg-white pb-32">
        <div className="max-w-5xl mx-auto flex justify-center">
          <div className="rounded-[2.5rem] overflow-hidden shadow-premium border border-foreground/5 bg-white p-4">
            <img
              src="https://live4help.org/wp-content/uploads/2026/02/Students.png"
              alt="Live 4 Help Foundation Students"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-[2rem]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
