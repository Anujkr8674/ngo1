"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, HeartHandshake, Leaf, Compass, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

type Category = "all" | "education" | "healthcare" | "environment" | "relief";

export default function Initiatives() {
  const [filter, setFilter] = useState<Category>("all");

  const initiatives = [
    {
      id: "edu-sponsor",
      category: "education",
      title: "Underprivileged Student Sponsoring",
      desc: "Direct funding of school fees, tuition fees, book purchases, and computer coaching. Selected based on academic diligence and household economy checks.",
      details: "Currently supporting 34+ students (cumulative 100+ over the years) across 7 states. Notable cases include sponsoring IIT Chennai M.Sc. Physics student Subham Pandey and tribal village girl students in Bankura.",
      sponsor: "Patrons & General Donations",
      icon: <GraduationCap className="w-6 h-6 text-foreground" />,
      color: "bg-primary/20",
      image: "https://live4help.org/wp-content/uploads/2026/02/Students.png"
    },
    {
      id: "edu-coaching",
      category: "education",
      title: "Free Coaching Center Pilot",
      desc: "Bridging the gap during and after COVID-19 lock-downs. Set up village coaching networks where qualified volunteers teach offline and online.",
      details: "Set up a pilot project in a tribal village in Paschim Medinipur District, West Bengal to provide free offline coaching to 10 needy students. Sourced electronic gadgets for online mentoring.",
      sponsor: "Live 4 Help Volunteers",
      icon: <GraduationCap className="w-6 h-6 text-foreground" />,
      color: "bg-primary/25",
      image: "https://live4help.org/wp-content/uploads/2021/12/Free-coaching-2-300x225.jpeg"
    },
    {
      id: "health-diagnostics",
      category: "healthcare",
      title: "Clinical Diagnostics & Tests",
      desc: "Organizing medical diagnostics camps in remote villages where primary clinical tests are unavailable.",
      details: "Partnered with Thyrocare Kolkata and Erbe Medical India Pvt Ltd. Conducted blood profiles and preliminary diagnostic reports for 397+ rural residents.",
      sponsor: "M/s Erbe Medical India",
      icon: <HeartHandshake className="w-6 h-6 text-foreground" />,
      color: "bg-secondary/20",
      image: "https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg"
    },
    {
      id: "health-cancer",
      category: "healthcare",
      title: "Cancer Awareness Sessions",
      desc: "Creating awareness regarding breast and cervical cancer in rural districts to remove fear and encourage early diagnosis.",
      details: "Facilitated by CNCI statistical and epidemiological officers. Utilizing breast examination simulator models bought from patron donations to demonstrate self-exam methods.",
      sponsor: "Roymoni Smriti Foundation & Erbe CSR",
      icon: <HeartHandshake className="w-6 h-6 text-foreground" />,
      color: "bg-secondary/25",
      image: "https://live4help.org/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-27-at-6.06.01-PM.jpeg"
    },
    {
      id: "env-mangrove",
      category: "environment",
      title: "Sundarban Mangrove Restoration",
      desc: "Combatting severe cyclone damages and soil erosion in coastal West Bengal through community-led mangrove plantation.",
      details: "Planted 3000+ mangrove saplings (Sundari, Bain, Kakra, Garjan, Golpata, Dhuldhul) in vulnerable delta stretches. Standard protective bamboo/net fencing installed to keep off cattle.",
      sponsor: "M/s ABS Professional India Pvt Ltd",
      icon: <Leaf className="w-6 h-6 text-foreground" />,
      color: "bg-accent/30",
      image: "https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
    },
    {
      id: "relief-blankets",
      category: "relief",
      title: "Winter Blankets Distribution",
      desc: "Providing heavy winter protection blankets to daily wage laborers, homeless families, and children.",
      details: "Distributed 160 blankets in North 24 Parganas, 100 blankets to construction labor at Jharoda Kalan school in Delhi peak winter, and 200 blankets across rural Sundarban delta.",
      sponsor: "Patrons & Well-Wishers",
      icon: <Compass className="w-6 h-6 text-foreground" />,
      color: "bg-foreground/5",
      image: "https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg"
    }
  ];

  const filteredInitiatives = filter === "all" 
    ? initiatives 
    : initiatives.filter(i => i.category === filter);

  const categories = [
    { id: "all", label: "All Works" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "environment", label: "Environment" },
    { id: "relief", label: "Relief Work" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/12/Free-coaching-2-300x225.jpeg"
            alt="Initiatives Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60 block bg-secondary/10 px-4 py-1.5 rounded-full text-white/70 shadow-soft">
              NGO Operations
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Our Initiatives
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              From sponsoring individual classroom admissions to large-scale mangrove reforestation, explore our ongoing field initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter */}
      <section className="px-6 md:px-12 mt-16 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as Category)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
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

      {/* Grid of Cards */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredInitiatives.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="group flex flex-col justify-between p-6 rounded-[2rem] glass-panel border border-white/60 shadow-soft min-h-[520px] hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                >
                  <div className="flex flex-col gap-6">
                    {/* Featured Image */}
                    <div className="aspect-[16/10] rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                      <img referrerPolicy="no-referrer"
                        src={item.image}
                        alt={item.title}
                        
                        
                        className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-102 transition-premium"
                      />
                    </div>
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground/50">{item.category}</span>
                        <h3 className="font-display font-bold text-xl text-foreground leading-tight">{item.title}</h3>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-8 pt-4 border-t border-foreground/5 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-foreground/70">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                      <span>Sponsor: <strong>{item.sponsor}</strong></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
