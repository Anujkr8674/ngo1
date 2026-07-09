"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, HeartHandshake, Leaf, Compass, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, MotionCard } from "../components/Card";

type Category = "all" | "education" | "healthcare" | "environment" | "relief";

export default function Initiatives() {
 const [filter, setFilter] = useState<Category>("all");

 const initiatives = [
 {
 id: "edu-sponsor",
 category: "education",
 title: "Underprivileged Student Sponsoring",
 desc: "Direct support for school/semester fees, books, stationaries, tuition fees, and transport expenses for students at risk of dropping out.",
 details: "Currently supporting 28 needy students from six states of India (Delhi, West Bengal, Orissa, Uttarakhand, Uttar Pradesh, Bihar), of which 57% (16) are girls.",
 sponsor: "Patrons & General Donations",
 icon: <GraduationCap className="w-6 h-6 text-foreground" />,
 color: "",
 image: "https://live4help.org/wp-content/uploads/2026/02/Students.png"
 },
 {
 id: "edu-coaching",
 category: "education",
 title: "Free Coaching Center Pilot",
 desc: "Launched a pilot project in a village in Paschim Medinipur district of West Bengal to provide free offline coaching to needy students.",
 details: "Provides free academic support to 10 needy students who cannot afford tuition fees, engaging local volunteers to bridge the educational gap.",
 sponsor: "Live 4 Help Volunteers",
 icon: <GraduationCap className="w-6 h-6 text-foreground" />,
 color: "",
 image: "https://live4help.org/wp-content/uploads/2021/12/Free-coaching-2-300x225.jpeg"
 },
 {
 id: "health-diagnostics",
 category: "healthcare",
 title: "Clinical Diagnostics & Tests",
 desc: "Organizing medical camps in remote villages to provide free medical tests and create general healthcare awareness.",
 details: "Benefited 225 adults in 2022 through free tests and preliminary screenings, supported by Erbe Medical India Pvt. Ltd. CSR funding.",
 sponsor: "M/s Erbe Medical India",
 icon: <HeartHandshake className="w-6 h-6 text-foreground" />,
 color: "",
 image: "https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg"
 },
 {
 id: "health-cancer",
 category: "healthcare",
 title: "Cancer Awareness Sessions",
 desc: "Creating cancer awareness sessions in villages of West Bengal to help school children and rural residents recognize early signs.",
 details: "Facilitated by Dr. Shyamsundar Mondal (retired ex. HOD, Department of Epidemiology & Biostatistics at Chittaranjan National Cancer Institute, Kolkata).",
 sponsor: "Roymoni Smriti Foundation & Erbe CSR",
 icon: <HeartHandshake className="w-6 h-6 text-foreground" />,
 color: "",
 image: "https://live4help.org/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-27-at-6.06.01-PM.jpeg"
 },
 {
 id: "env-mangrove",
 category: "environment",
 title: "Sundarban Mangrove Restoration",
 desc: "Mangrove plantation drive in the Sundarbans of West Bengal to revive critical coastal protection destroyed during Cyclone Amphan.",
 details: "Planted approximately 3000 mangrove saplings in 2021-2022. Area fenced to protect from cattle; committed to a 3-year maintenance cycle, with plants reaching 6-8 ft in height.",
 sponsor: "M/s ABS Professional India Pvt Ltd",
 icon: <Leaf className="w-6 h-6 text-foreground" />,
 color: "",
 image: "https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
 },
 {
 id: "relief-blankets",
 category: "relief",
 title: "Winter Blankets Distribution",
 desc: "Distributing blankets during the winter season to daily wage migrant laborers, construction workers, and villagers.",
 details: "Privileged to support more than 300 underprivileged people through these winter drives over the last three years.",
 sponsor: "Patrons & Well-Wishers",
 icon: <Compass className="w-6 h-6 text-foreground" />,
 color: "",
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
 <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
 {/* Full-size Hero Background */}
 <div className="absolute inset-0 z-0">
 <img
 src="https://live4help.org/wp-content/uploads/2021/12/Free-coaching-2-300x225.jpeg"
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
 <section className="py-8 px-6 md:px-12 bg-white pb-16">
 <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setFilter(cat.id as Category)}
 className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
 filter === cat.id
 ? "bg-primary text-[#444444] shadow-soft"
 : "bg-white text-foreground/80 hover:text-foreground border border-foreground/5 shadow-soft hover:"
 }`}
 >
 {cat.label}
 </button>
 ))}
 </div>
 </section>

 {/* Grid of Cards */}
 <section className="py-8 px-6 md:px-12 bg-white pb-16">
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
 className="group flex flex-col justify-between rounded-[2.5rem] border border-[#C1D6C1] overflow-hidden pb-6 min-h-[520px]"
 >
 <div className="flex flex-col flex-grow">
 {/* Featured Image */}
 <div className="relative aspect-[16/10] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0">
 <img referrerPolicy="no-referrer"
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
 <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
 {item.icon}
 </div>
 <div className="flex flex-col">
 <span className="text-xs uppercase tracking-widest font-semibold text-foreground/50">{item.category}</span>
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
