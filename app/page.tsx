"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowUpRight,
  GraduationCap,
  Leaf,
  HeartHandshake,
  Play,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Camera
} from "lucide-react";
import Counter from "./components/Counter";
import testimonialsData from "./data/testimonials.json";
import blogsData from "./data/blogs.json";

const carouselImages = [

  "https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg",
  "https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg",
  "https://live4help.org/wp-content/uploads/2026/02/Students.png"
];

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: 100, suffix: "+", label: "Students Supported", desc: "Long-term educational funding across 11 states" },
    { value: 397, suffix: "+", label: "Medical Beneficiaries", desc: "Free medical testing & cancer screening" },
    { value: 3000, suffix: "+", label: "Trees Planted", desc: "Mangrove saplings restored in Sundarbans" },
    { value: 460, suffix: "+", label: "Blankets Distributed", desc: "Winter protection in Delhi and West Bengal" },
  ];

  const focusAreas = [
    {
      icon: <GraduationCap className="w-5 h-5 text-foreground" />,
      title: "Education Programs",
      desc: "Identifying underprivileged students to sponsor annual school fees, tuition, and basic training.",
      link: "/initiatives",
      bgColor: "bg-primary/20",
      image: "https://live4help.org/wp-content/uploads/2026/02/Students.png"
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-foreground" />,
      title: "Healthcare Camps",
      desc: "Providing free diagnostics, consultations, and cancer awareness drives in remote villages.",
      link: "/initiatives",
      bgColor: "bg-secondary/20",
      image: "https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg"
    },
    {
      icon: <Leaf className="w-5 h-5 text-foreground" />,
      title: "Plantation Drives",
      desc: "Mangrove restoration in coastal Sundarbans to counter environmental challenges & build resilience.",
      link: "/initiatives",
      bgColor: "bg-accent/25",
      image: "https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
    },
    {
      icon: <Compass className="w-5 h-5 text-foreground" />,
      title: "Relief Activities",
      desc: "Winter clothes distribution, cyclone relief support, and daily food sponsoring during lock-downs.",
      link: "/initiatives",
      bgColor: "bg-foreground/5",
      image: "https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg"
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Full-size Carousel Background */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={src}
                alt={`Live 4 Help Foundation Slide ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-102 transform transition-transform duration-[5000ms] ease-out"
              />
            </div>
          ))}
          {/* Light overlay to keep images sharp while blending with background */}
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 py-1.5 rounded-full bg-secondary/10 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 text-white/80 shadow-soft"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Registered MCA, Govt of India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-white max-w-3xl"
            >
              Live to Help,<br />
              Go Above and Beyond
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              Empowering underprivileged children, supporting elderly care, restoration of coastal environment, and bringing healthcare access where it's needed most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <Link href="/donate">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-900 bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer">
                  <Heart className="w-5 h-5 fill-slate-900/10 text-slate-900" />
                  Make an Impact
                </button>
              </Link>
              <Link href="/volunteer">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-900 bg-white hover:bg-white/90 border border-transparent transition-premium shadow-soft cursor-pointer">
                  Join as Volunteer
                  <ArrowRight className="w-4 h-4 text-slate-900/60" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide ? "w-8 bg-foreground" : "bg-foreground/30 hover:bg-foreground/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>


      {/* Impact Statistics */}
      <section className="py-20 px-6 md:px-12 bg-white/40 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={stat.label}
                className="flex flex-col gap-3 p-6 rounded-2xl glass-panel shadow-soft border border-white/50 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-semibold text-sm tracking-tight text-foreground/90">
                  {stat.label}
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="py-24 px-6 md:px-12 text-center bg-transparent">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <span className="w-10 h-0.5 bg-secondary rounded-full" />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground italic leading-normal px-4">
            &ldquo;We ourselves feel that what we are doing is just a drop in the ocean. But the ocean would be less because of that missing drop.&rdquo;
          </h2>
          <span className="font-sans font-semibold text-sm uppercase tracking-widest text-foreground/60">
            &mdash; Mother Teresa
          </span>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 px-6 md:px-12 bg-white/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">What We Do</span>
            <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground">Our Core Focus Areas</h3>
            <p className="text-foreground/75 leading-relaxed">
              We focus our energy and resources on four key impact pillars to bring systemic, meaningful change to underserved rural and urban communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((area, i) => (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={area.title}
                className="group p-0 rounded-3xl glass-panel shadow-soft border border-white/60 flex flex-col justify-between min-h-[420px] overflow-hidden hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/5 shadow-inner">
                  <img
                    src={area.image}
                    alt={area.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-premium"
                  />
                  {/* Floating icon badge */}
                  <div className={`absolute -bottom-6 left-6 w-12 h-12 rounded-2xl ${area.bgColor} flex items-center justify-center shadow-lg border border-white/45 backdrop-blur-sm group-hover:scale-110 transition-premium z-10`}>
                    {area.icon}
                  </div>
                </div>

                <div className="p-6 pt-8 flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-display font-bold text-lg text-foreground">{area.title}</h4>
                    <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">{area.desc}</p>
                  </div>
                  <Link href={area.link} className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-foreground mt-4 w-fit group/btn">
                    Learn more
                    <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-24 px-6 md:px-12 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Voice of the People</span>
              <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground">Video Testimonials</h3>
              <p className="text-foreground/70">
                Hear directly from our members, students, and supporters sharing their journey of collective actions and hope.
              </p>
            </div>
            <Link href="/about">
              <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-white hover:bg-foreground/5 border border-foreground/5 shadow-soft transition-premium cursor-pointer">
                View All Stories
              </button>
            </Link>
          </div>

          {/* Testimonial slider / grid */}
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 no-scrollbar scroll-smooth">
            {testimonialsData.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={item.name}
                onClick={() => setActiveVideo(item.video)}
                className="flex-shrink-0 w-72 h-[380px] rounded-3xl relative overflow-hidden group shadow-soft cursor-pointer hover:shadow-premium transition-premium border border-white/30"
              >
                <img referrerPolicy="no-referrer"
                  src={item.image}
                  alt={item.name}


                  className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-105 transition-premium"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-premium">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg text-foreground">
                    <Play className="w-6 h-6 fill-current text-foreground ml-1" />
                  </div>
                </div>
                {/* Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-widest font-sans opacity-75">Supporter Story</span>
                  <h4 className="font-display font-bold text-lg leading-tight">{item.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] bg-white/20 backdrop-blur w-fit px-2.5 py-1 rounded-full font-semibold uppercase mt-1">
                    <Play className="w-2.5 h-2.5 fill-current" /> Play Video
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Ground Moments Gallery Preview */}
      <section className="py-24 px-6 md:px-12 bg-white/20">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60 flex items-center gap-2">
                <Camera className="w-4 h-4 text-secondary" />
                Moments of Change
              </span>
              <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground">Action Gallery</h3>
              <p className="text-foreground/70">
                Glimpses of our operations, workshops, and distributions in rural and tribal districts.
              </p>
            </div>
            <Link href="/gallery">
              <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-white bg-foreground hover:bg-[#2c2c2c] transition-premium shadow-soft cursor-pointer">
                View Full Gallery
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: "https://live4help.org/wp-content/uploads/2024/02/Meeting-with-Subham-Pandey-225x300.jpg", caption: "IIT Chennai M.Sc. Physics student Subham Pandey" },
              { src: "https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg", caption: "Clinical diagnostic camp in Paschim Medinipur" },
              { src: "https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg", caption: "Mangrove saplings restoration campaign, Sundarbans" },
              { src: "https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg", caption: "Winter blanket and clothing distributions" }
            ].map((img, i) => (
              <div key={i} className="group p-4 rounded-3xl glass-panel border border-white shadow-soft flex flex-col gap-3 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                <div className="aspect-square rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                  <img referrerPolicy="no-referrer"
                    src={img.src}
                    alt={img.caption}


                    className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-102 transition-premium"
                  />
                </div>
                <span className="text-[11px] font-semibold text-foreground/80 leading-relaxed truncate px-1">{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Partners & Support */}
      <section className="py-24 px-6 md:px-12 bg-white/40 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Corporate Engagement</span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground">Our CSR Partnerships</h3>
            <p className="text-foreground/75 leading-relaxed">
              We collaborate with forward-looking corporate organizations to create scaled local impacts. Key initiatives like healthcare clinics, cancer screenings, and large-scale mangrove plantation are made possible through CSR programs.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full glass-panel text-foreground/80 shadow-soft">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                80G & 12A Certified
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full glass-panel text-foreground/80 shadow-soft">
                <ShieldCheck className="w-4 h-4 text-primary" />
                MCA CSR Registered
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-soft-blue border border-white flex flex-col gap-4 shadow-soft hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
              <h4 className="font-display font-bold text-xl text-foreground">M/s Erbe Medical India</h4>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Generously sponsored the Darjeeling Hills University Cancer Awareness session and rural Sundarbans diagnostic medical camps.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-soft-purple border border-white flex flex-col gap-4 shadow-soft hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
              <h4 className="font-display font-bold text-xl text-foreground">M/s ABS Professional India</h4>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Generously supported the large-scale Mangrove Plantation restoration project in coastal Sundarbans to buffer climatic storms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Magazine */}
      <section className="py-24 px-6 md:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Journal</span>
              <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground">Latest Activities & Updates</h3>
              <p className="text-foreground/70">
                Explore detailed reports and updates from our field campaigns and milestones.
              </p>
            </div>
            <Link href="/blog">
              <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-white hover:bg-foreground/5 border border-foreground/5 shadow-soft transition-premium cursor-pointer">
                View All News
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsData.slice(0, 3).map((blog) => (
              <article key={blog.slug} className="group flex flex-col gap-6 p-6 rounded-3xl glass-panel shadow-soft border border-white/60 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                {blog.images && blog.images.length > 0 && (
                  <div className="aspect-[4/3] rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                    <img referrerPolicy="no-referrer"
                      src={blog.images[0]}
                      alt={blog.title}


                      className="w-full h-full object-cover absolute inset-0 object-cover group-hover:scale-103 transition-premium"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 text-xs text-foreground/50">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>By {blog.author}</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground leading-snug group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                    {blog.paragraphs[0]}
                  </p>
                </div>
                <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-foreground mt-4 group/btn">
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sponosorship Grid */}
      <section className="py-24 px-6 md:px-12 bg-transparent">
        <div className="max-w-7xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-editorial border border-white/80 shadow-premium grid grid-cols-1 lg:grid-cols-2 gap-12 items-center hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/70">Join Our Movement</span>
            <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight leading-none">
              Let&apos;s Create a Brighter Future Together
            </h3>
            <p className="text-foreground/75 leading-relaxed">
              Every drop makes an ocean. Your small support sponsors a child&apos;s tuition fee for an entire month, helps check a senior citizen&apos;s health, or funds mangrove plantation buffers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link href="/donate">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-white bg-foreground hover:bg-[#2c2c2c] transition-premium shadow-soft cursor-pointer">
                Sponsor a Cause
              </button>
            </Link>
            <Link href="/volunteer">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-foreground bg-white hover:bg-foreground/5 border border-foreground/5 shadow-soft transition-premium cursor-pointer">
                Join our Network
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Testimonial Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-premium bg-black"
            >
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
