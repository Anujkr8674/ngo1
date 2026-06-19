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
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2026/06/1.png"
            alt="Blog Listing Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60 flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full text-white/70 shadow-soft">
              <BookOpen className="w-4 h-4 text-secondary" />
              The Live 4 Help Journal
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Stories of Hope & Impact
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Detailed reports, milestones, and on-ground transformations written by our team and field volunteers.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg mt-2 shadow-soft rounded-full overflow-hidden border border-foreground/5 bg-white">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search articles and topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-sm font-sans focus:outline-none bg-transparent text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category selector */}
      <section className="px-6 md:px-12 mt-16 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-foreground text-background shadow-soft"
                  : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft hover:bg-foreground/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
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
                    className="group flex flex-col justify-between p-6 rounded-3xl glass-panel shadow-soft border border-white/60 min-h-[500px] hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                  >
                    <div className="flex flex-col gap-6">
                      {/* Image */}
                      {blog.images && blog.images.length > 0 && (
                        <div className="aspect-[4/3] rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                          <img referrerPolicy="no-referrer"
                            src={blog.images[0]}
                            alt={blog.title}
                            
                            
                            className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-103 transition-premium"
                          />
                        </div>
                      )}
                      {/* Body */}
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold tracking-wider text-foreground/50 uppercase">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{blog.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime} Min Read</span>
                        </div>
                        <h2 className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug group-hover:text-secondary transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-xs md:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                          {blog.paragraphs[0]}
                        </p>
                      </div>
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-foreground mt-8 group/btn w-fit">
                      Read full story
                      <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
