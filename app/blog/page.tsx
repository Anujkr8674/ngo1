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
 Stories of Hope & Impact
 </h1>
 <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
 Detailed reports, milestones, and on-ground transformations written by our team and field volunteers.
 </p>

 {/* Search Bar */}

 </div>
 </div>
 </section>

 {/* Category selector */}
 <section className="py-8 px-6 md:px-12 bg-white pb-16">
 <div className="bg-[#FFF6ED] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${activeCategory === cat.id
 ? "bg-foreground text-background shadow-soft"
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
 <div className="bg-[#F5FAF5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto">
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
 className="group flex flex-col justify-between p-6 rounded-3xl bg-white shadow-soft border border-foreground/5 min-h-[500px] hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <div className="flex flex-col gap-6">
 {/* Image */}
 {blog.images && blog.images.length > 0 && (
 <div className="aspect-[4/3] rounded-2xl relative overflow-hidden shadow-inner">
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
 <h2 className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug group-hover:text-blue-600 transition-colors">
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
