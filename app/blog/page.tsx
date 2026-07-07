"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import blogsData from "../data/blogs.json";

// Categories mapping based on topics in blogs
const categories = [
  { id: "all", label: "All Stories" },
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "environment", label: "Environment" }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter logic
  const filteredBlogs = blogsData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.paragraphs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesCategory = true;
    if (activeCategory === "education") {
      matchesCategory = blog.slug.includes("education") || blog.slug.includes("student");
    } else if (activeCategory === "healthcare") {
      matchesCategory = blog.slug.includes("medical") || blog.slug.includes("cancer");
    } else if (activeCategory === "environment") {
      matchesCategory = blog.slug.includes("plantation") || blog.slug.includes("coastal");
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Blog Listing Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold  flex items-center gap-2 px-4 py-1.5 rounded-full  shadow-soft bg-[#DCCFF8] text-[#444444]">
              <BookOpen className="w-4 h-4 text-[#444444]" />
              The Live 4 Help Journal
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Web Posts
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Detailed reports, milestones, and on-ground transformations written by our team and field volunteers.
            </p>

            {/* Search Bar */}

          </div>
        </div>
      </section>

      {/* Category selector */}
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${activeCategory === cat.id
                ? "bg-primary text-[#444444] shadow-soft"
                : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft hover:"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-foreground/50 text-sm">
              No articles match your search criteria. Try a different term.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog, idx) => {
                // Calculate reading time (roughly 200 words per minute)
                const totalWords = blog.paragraphs.reduce((acc, p) => acc + p.split(" ").length, 0);
                const readTime = Math.max(1, Math.ceil(totalWords / 200));

                return (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    key={blog.slug}
                    className="group flex flex-col justify-between rounded-[2.5rem] bg-white shadow-soft border border-[#C1D6C1] min-h-[500px] hover:-translate-y-2 hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300 overflow-hidden pb-6"
                  >
                    <div className="flex flex-col flex-1">
                      {/* Image */}
                      {blog.images && blog.images.length > 0 && (
                        <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0">
                          <img referrerPolicy="no-referrer"
                            src={blog.images[0]}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-premium"
                          />
                        </div>
                      )}
                      {/* Body */}
                      <div className="pt-6 px-6 flex flex-col h-full flex-grow justify-between">
                        <div className="flex flex-col gap-2.5 flex-grow">
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-foreground/50 uppercase">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blog.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime} Min Read</span>
                          </div>
                          <h2 className="font-display font-bold text-lg md:text-xl text-foreground leading-snug group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h2>
                          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                            {blog.paragraphs[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 mt-6">
                      <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-foreground group/btn w-fit">
                        Read full story
                        <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
