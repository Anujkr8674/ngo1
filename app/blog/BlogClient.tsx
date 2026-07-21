'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react'

interface BlogClientProps {
  initialBlogs: any[]
  initialCategories: any[]
}

export default function BlogClient({ initialBlogs, initialCategories }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState('all')

  // Filter logic based on dynamic DB categories
  const filteredBlogs = initialBlogs.filter(blog => {
    const titleMatch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const contentMatch = blog.content?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const excerptMatch = blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    const matchesSearch = titleMatch || contentMatch || excerptMatch

    let matchesCategory = true
    if (activeCategoryId !== 'all') {
      matchesCategory = blog.categoryId === activeCategoryId || blog.category?.id === activeCategoryId
    }

    return matchesSearch && matchesCategory
  })

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
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <BookOpen className="w-4 h-4 text-[#444444]" />
              The Live 4 Help Journal
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Web Posts
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Detailed reports, milestones, and on-ground transformations written by our team and field volunteers.
            </p>
          </div>
        </div>
      </section>

      {/* Category selector */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setActiveCategoryId('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
              activeCategoryId === 'all'
                ? 'bg-primary text-[#444444] shadow-soft font-bold'
                : 'bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft'
            }`}
          >
            All Stories ({initialBlogs.length})
          </button>

          {initialCategories.map((cat) => {
            const count = initialBlogs.filter(b => b.categoryId === cat.id || b.category?.id === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer flex items-center gap-1.5 ${
                  activeCategoryId === cat.id
                    ? 'bg-primary text-[#444444] shadow-soft font-bold'
                    : 'bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                {cat.name} ({count})
              </button>
            )
          })}
        </div>
      </section>

      {/* Magazine Grid */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-foreground/50 text-sm bg-white rounded-2xl border border-foreground/5">
              No articles found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog, idx) => {
                const blogDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'June 1, 2026'

                const isVid = blog.images && blog.images.length > 0 && blog.images[0].toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i)

                return (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    key={blog.slug}
                    className="group flex flex-col justify-between rounded-[2.5rem] bg-white shadow-soft border border-[#C1D6C1] min-h-[500px] hover:-translate-y-2 hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300 overflow-hidden pb-6 relative"
                  >
                    <div className="flex flex-col flex-1">
                      {/* Image / Video */}
                      {blog.images && blog.images.length > 0 ? (
                        <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-900">
                          {isVid ? (
                            <video src={blog.images[0]} muted className="w-full h-full object-cover group-hover:scale-105 transition-premium" />
                          ) : (
                            <img 
                              referrerPolicy="no-referrer"
                              src={blog.images[0]}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-premium animate-fade-in"
                            />
                          )}
                          {/* Category Badge on Card */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-blue-400" />
                            {blog.category?.name || 'General'}
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-100 flex items-center justify-center text-slate-400">
                          <BookOpen className="w-12 h-12 text-slate-300" />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-blue-400" />
                            {blog.category?.name || 'General'}
                          </div>
                        </div>
                      )}

                      {/* Body */}
                      <div className="pt-6 px-6 flex flex-col h-full flex-grow justify-between">
                        <div className="flex flex-col gap-2.5 flex-grow">
                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-foreground/50 uppercase">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {blogDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {blog.readTime || 3} Min Read
                            </span>
                          </div>
                          <h2 className="font-display font-bold text-lg md:text-xl text-foreground leading-snug group-hover:text-blue-600 transition-colors">
                            {blog.title || 'BLOG'}
                          </h2>
                          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                            {blog.excerpt || 'No description available.'}
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
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
