"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, HeartHandshake, Leaf, Compass, Calendar, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { Card, MotionCard } from "../components/Card";

interface InitiativeCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
}

interface Initiative {
  id: string;
  title: string;
  desc: string;
  details: string;
  sponsor: string;
  image: string;
  categoryId: string;
  category: InitiativeCategory;
}

interface InitiativesClientProps {
  initialCategories: InitiativeCategory[];
  initialInitiatives: Initiative[];
}

export function renderCategoryIcon(iconName: string, className = "w-6 h-6") {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className={className} />
    case 'HeartHandshake': return <HeartHandshake className={className} />
    case 'Leaf': return <Leaf className={className} />
    case 'Compass': return <Compass className={className} />
    case 'Sparkles': return <Sparkles className={className} />
    case 'HelpCircle': return <HelpCircle className={className} />
    default: return <Sparkles className={className} />
  }
}

export default function InitiativesClient({ initialCategories, initialInitiatives }: InitiativesClientProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredInitiatives = filter === "all"
    ? initialInitiatives
    : initialInitiatives.filter(i => i.category.slug === filter);

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic/Free-coaching-2-480x360.jpeg"
            alt="Initiatives Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold block px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              NGO Operations
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Our Initiatives
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              From sponsoring individual classroom admissions to large-scale mangrove reforestation, explore our ongoing field initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${filter === "all"
                ? "bg-primary text-[#444444] shadow-soft"
                : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft"
              }`}
          >
            All Works
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.slug)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${filter === cat.slug
                  ? "bg-primary text-[#444444] shadow-soft"
                  : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Cards */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredInitiatives.map((item) => (
                <MotionCard
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  key={item.id}
                  className="group flex flex-col justify-between rounded-[2.5rem] border border-[#C1D6C1] overflow-hidden pb-6 min-h-[520px] bg-white"
                >
                  <div className="flex flex-col flex-grow">
                    {/* Featured Image */}
                    <div className="relative aspect-[16/10] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-50">
                      <img
                        referrerPolicy="no-referrer"
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-premium"
                      />
                    </div>
                    {/* Content */}
                    <div className="pt-6 px-6 flex flex-col flex-grow justify-between">
                      <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            {renderCategoryIcon(item.category.iconName, "w-6 h-6 text-slate-700")}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/50">
                              {item.category.name}
                            </span>
                            <h3 className="font-display font-bold text-xl text-slate-800 leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        {/* Text */}
                        <div className="flex flex-col gap-3">
                          <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                          {item.details && (
                            <p className="text-xs text-foreground/60 leading-relaxed">
                              {item.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer metadata */}
                      <div className="mt-8 pt-4 border-t border-foreground/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-foreground/70">
                          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                          <span>Sponsor: <strong>{item.sponsor}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
