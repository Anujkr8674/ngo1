"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  HeartHandshake,
  Leaf,
  MapPin,
  Calendar,
  UserCheck,
  Building,
  Activity,
  Award,
  Users,
  CheckCircle2,
  Quote,
  Play,
  X,
  Clock,
  BookOpen,
  Tag,
  ArrowRight,
  Laptop,
  Video,
  Trophy
} from "lucide-react";
import ImpactStats from "../components/ImpactStats";
import { Card, MotionCard } from "../components/Card";
import blogsData from "../data/blogs.json";
import testimonialsData from "../data/testimonials.json";
import { getBlogPosts } from "../actions/blog";
import { getTestimonials } from "../actions/testimonial";

interface ImpactBlogSectionProps {
  title: string;
  description: string;
  categoryLink: string;
  defaultCategoryName: string;
  emptyText: string;
  posts: any[];
}

function ImpactBlogSection({
  title,
  description,
  categoryLink,
  defaultCategoryName,
  emptyText,
  posts,
}: ImpactBlogSectionProps) {
  return (
    <section className="py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 bg-[#ECE0F0] rounded-[3rem] py-8 px-4 md:py-12 md:px-8 border border-foreground/5 w-full text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-2xl text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Journal</span>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground">{title}</h3>
            <p className="text-xs sm:text-sm text-foreground/70">{description}</p>
          </div>
          <Link href={categoryLink}>
            <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-primary shadow-soft transition-premium cursor-pointer hover:-translate-y-0.5">
              View All News
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((blog, idx) => {
              const blogDate = blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                : blog.date || "June 1, 2026";

              const images = blog.images || [];
              const coverImage =
                images.length > 0
                  ? images[0] === "/logo/logo.jpg" && images.length > 1
                    ? images[1]
                    : images[0]
                  : null;
              const isVid = coverImage && coverImage.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i);
              const postTitle =
                blog.title && blog.title !== "BLOG"
                  ? blog.title
                  : blog.subheadings?.[0]?.text || "Blog Post";
              const categoryName =
                blog.category?.name ||
                (typeof blog.category === "string" ? blog.category : defaultCategoryName);
              const readTime = blog.readTime || 3;
              const excerpt =
                blog.excerpt || (blog.paragraphs && blog.paragraphs[0]) || "No description available.";

              return (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={blog.slug || idx}
                  className="group flex flex-col justify-between rounded-[2.5rem] bg-white shadow-soft border border-[#C8B4D4] min-h-[450px] hover:-translate-y-2 hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300 overflow-hidden pb-6 relative text-left"
                >
                  <div className="flex flex-col flex-1">
                    {/* Image / Video */}
                    {coverImage ? (
                      <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-900">
                        {isVid ? (
                          <video
                            src={coverImage}
                            muted
                            className="w-full h-full object-cover group-hover:scale-105 transition-premium"
                          />
                        ) : (
                          <img
                            referrerPolicy="no-referrer"
                            src={coverImage}
                            alt={postTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-premium animate-fade-in"
                          />
                        )}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-blue-400" />
                          {categoryName}
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-100 flex items-center justify-center text-slate-400">
                        <BookOpen className="w-12 h-12 text-slate-300" />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-blue-400" />
                          {categoryName}
                        </div>
                      </div>
                    )}

                    {/* Body */}
                    <div className="pt-4 px-6 flex flex-col h-full flex-grow justify-between">
                      <div className="flex flex-col gap-2 flex-grow">
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-semibold tracking-wider text-foreground/50 uppercase">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {blogDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime} Min Read
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base md:text-lg text-foreground leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {postTitle}
                        </h4>
                        <p className="text-[11px] text-foreground/70 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 mt-4">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-foreground group/btn w-fit"
                    >
                      Read full story
                      <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-xs text-foreground/60 py-6">
              {emptyText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Impact() {
  const [activeTab, setActiveTab] = useState<"education" | "healthcare" | "environment" | "relief">("education");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>(blogsData);
  const [testimonialsList, setTestimonialsList] = useState<any[]>(testimonialsData);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getBlogPosts().then((posts) => {
      if (posts && posts.length > 0) {
        setAllBlogs(posts);
      }
    }).catch(() => { });

    getTestimonials().then((list) => {
      if (list && list.length > 0) {
        setTestimonialsList(list);
      }
    }).catch(() => { });
  }, []);

  const educationBlogs = allBlogs.filter((post: any) => {
    const cat = (post.category?.name || (typeof post.category === "string" ? post.category : "") || "").toLowerCase();
    const title = (post.title || "").toLowerCase();
    return cat.includes("education") || title.includes("education") || title.includes("student");
  }).slice(0, 3);

  const healthcareBlogs = allBlogs.filter((post: any) => {
    const cat = (post.category?.name || (typeof post.category === "string" ? post.category : "") || "").toLowerCase();
    const title = (post.title || "").toLowerCase();
    return cat.includes("health") || cat.includes("medical") || title.includes("health") || title.includes("medical") || title.includes("cancer");
  }).slice(0, 3);

  const plantationBlogs = allBlogs.filter((post: any) => {
    const cat = (post.category?.name || (typeof post.category === "string" ? post.category : "") || "").toLowerCase();
    const title = (post.title || "").toLowerCase();
    return cat.includes("plantation") || cat.includes("environment") || cat.includes("mangrove") || title.includes("plantation") || title.includes("mangrove") || title.includes("coastal");
  }).slice(0, 3);

  const reliefBlogs = allBlogs.filter((post: any) => {
    const cat = (post.category?.name || (typeof post.category === "string" ? post.category : "") || "").toLowerCase();
    const title = (post.title || "").toLowerCase();
    return cat.includes("relief") || cat.includes("community") || title.includes("relief") || title.includes("blanket") || title.includes("cloth") || title.includes("collective action");
  }).slice(0, 3);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 312, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(autoScroll);
  }, []);



  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic/Medical-Camp-Photo.jpg"
            alt="Impact Metrics Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest  shadow-soft font-semibold bg-[#DCCFF8] text-[#444444]"
            >
              <Award className="w-3.5 h-3.5 text-[#444444]" />
              Transparency & Results
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Measuring Our Impact
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl"
            >
              We translate every donation and resource directly into local, verified actions. Explore our core statistics, distributions, and field reports.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid Dashboard */}
      <ImpactStats />

      {/* Interactive Tabs Section */}
      <section className="py-8 px-6 md:px-12 pb-8">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-foreground/5 p-1 max-w-3xl mx-auto w-full">
            {(["education", "healthcare", "environment", "relief"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-premium cursor-pointer ${activeTab === tab
                  ? "bg-[#CFE8FF] text-foreground shadow-soft border border-foreground/5"
                  : "text-foreground/65 hover:text-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="mt-4">
            {activeTab === "education" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">Education That Opens Doors and Transforms Futures</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <strong>Live 4 Help (L4H) Foundation</strong> believes that a child’s future should be shaped by talent, determination, and dreams—not limited by financial hardship. Yet for many bright and motivated students, the cost of school fees, books, uniforms, transport, accommodation, or coaching can place education beyond reach. A single setback can interrupt years of learning and close the door to opportunities that could transform not only one life, but an entire family.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Since supporting its first student in 2021, the Foundation has grown into a nationwide education initiative serving deserving children and young people across India. We identify students whose education is at risk and provide timely, practical assistance tailored to their individual needs - from admission and tuition fees to learning materials, mentoring, transport, accommodation, coaching, and emergency support.
                  </p>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Our commitment goes far beyond financial assistance. Through regular engagement with students, parents, teachers, educational institutions, and local volunteers, we follow each learner’s progress, encourage them through challenges, and help them build the confidence to aim higher. This personal, sustained approach ensures that every contribution becomes more than a payment - it becomes reassurance, guidance, and a pathway to opportunity.
                  </p>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    When a student stays in school, the impact reaches far beyond the classroom. Education can strengthen a family, inspire a community, and help break cycles of disadvantage. By standing beside students throughout their journey, Live4Help helps turn potential into progress, aspirations into achievement, and education into a lasting foundation for a more independent and hopeful future.
                  </p>
                </div>

                {/* 3-Column Grid: Support Scope, Guidelines, and Sponsoring States */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🌍 Our Reach and Impact</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1 font-semibold">
                      131 Students Supported Across India
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li>Supporting students across 12 states</li>
                      <li>Partnering with 60 educational institutions</li>
                      <li>103 active students currently pursuing education</li>
                      <li>26 alumni progressing to higher studies and careers</li>
                      <li>60% of beneficiaries are girls, promoting educational equity</li>
                      <li>Year-on-year growth in educational investment, extending support to more deserving students</li>
                    </ul>
                  </Card>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      {/* <GraduationCap className="w-5 h-5 text-primary" /> */}
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🤝 How We Help Students Succeed</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1">
                      Comprehensive Support at Every Stage
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li>Admission, Registration & Tuition Fees</li>
                      <li>Books, Stationery, Uniforms & School Bags</li>
                      <li>Hostel & Accommodation Support</li>
                      <li>Transportation Assistance</li>
                      <li>Online & Offline Coaching</li>
                      <li>Counselling & Mentorship</li>
                      <li>Health & Emergency Support</li>
                      <li>Regular Follow-up with Students, Parents & Teachers</li>
                    </ul>
                  </Card>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">📊 Education Impact</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1 font-semibold">
                      as of August 2026
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Students supported since inception</div>
                          <div className="font-semibold text-foreground text-[11px]">131</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Active students</div>
                          <div className="font-semibold text-foreground text-[11px]">105</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Alumni</div>
                          <div className="font-semibold text-foreground text-[11px]">26</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Girls supported</div>
                          <div className="font-semibold text-foreground text-[11px]">60%</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>States reached</div>
                          <div className="font-semibold text-foreground text-[11px]">12</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Educational institutions</div>
                          <div className="font-semibold text-foreground text-[11px]">60</div>
                        </div>
                      </li>
                      <li className="border-foreground/5 pb-1">
                        <div className="flex justify-between items-center w-full">
                          <div>Average age of students</div>
                          <div className="font-semibold text-foreground text-[11px]">15 years</div>
                        </div>
                      </li>
                      <li className="pb-0">
                        <div className="flex justify-between items-center w-full">
                          <div>Average annual support</div>
                          <div className="font-semibold text-foreground text-[11px]">₹40,000</div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </div>

                <section className="py-4 px-4 md:px-12 text-center">
                  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-4 md:px-4 border border-foreground/5">
                    <span className="w-10 h-0.5 bg-secondary rounded-full" />
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground italic leading-normal px-4">
                      &ldquo;Every student we support strengthens a family, inspires a community, and brings a brighter future within reach.&rdquo;
                    </h2>
                    {/* <span className="font-sans font-semibold text-sm uppercase tracking-widest text-foreground/60">
                      &mdash; Mother Teresa
                    </span> */}
                  </div>
                </section>



                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Laptop className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">Computer Education Program</h4>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground">Building Digital Skills, Creating Brighter Futures</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    In today’s world, digital skills are essential for learning, communication and future employment. However, many students in underserved communities still have limited access to computers and structured digital education.
                    <br /><br /><strong>As part of its Educational Initiatives, Live 4 Help Foundation is helping bridge this gap by expanding access to practical computer training and opening new pathways to opportunity.</strong>
                    <br /><br /><strong className="font-display font-bold text-lg pb-4 text-foreground">Digital Learning Rooted in the Community</strong>
                    <br />Live 4 Help Foundation has donated desktop computers and partnered with Roymoni Smriti Foundation to provide free computer training for underserved students in the Sundarbans, West Bengal. The collaboration brings together educational support, local knowledge and community-based delivery.
                    <br /><br />Through practical, hands-on sessions, students learn to use computers for study, research and everyday digital tasks. The program complements classroom learning while building the confidence and foundational skills needed for higher education, vocational training and future employment.
                  </p>

                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-5"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">Skills That Extend Beyond the Classroom</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-semibold">
                    The initiative enables students to:
                  </p>


                  <ul className="flex flex-col gap-3 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                    <li>Access digital learning resources and educational content</li>
                    <li>Develop practical computer and information-handling skills</li>
                    <li>Complete academic work with greater confidence</li>
                    <li>Prepare for further education, training and employment</li>
                    <li>Participate more fully in an increasingly digital society</li>
                  </ul>
                  <section className="py-4 px-4 md:px-12 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-4 md:px-4 border border-foreground/5">
                      <span className="w-10 h-0.5 bg-secondary rounded-full" />
                      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground italic leading-normal px-4">
                        &ldquo;Digital literacy is not simply a technical skill - it is a foundation for confidence, inclusion and opportunity.&rdquo;
                      </h2>
                      {/* <span className="font-sans font-semibold text-sm uppercase tracking-widest text-foreground/60">
                      &mdash; Mother Teresa
                    </span> */}
                    </div>
                  </section>
                  <p className="text-lg sm:text-sm text-foreground/75 leading-relaxed ">
                    By integrating computer training into its broader educational work, Live 4 Help Foundation is enabling students to learn with confidence, explore new possibilities and take meaningful steps towards a brighter future.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground/80 flex items-center gap-1.5 flex-wrap">
                    <span>Read more:</span>
                    <a
                      href="https://live4help.org/blog/live4help-computer-laptop-donation-education"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 transition-colors"
                    >
                      https://live4help.org/blog/live4help-computer-laptop-donation-education
                    </a>
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/computer.png"
                        alt="Computer Training photographs"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </Card>



                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Video className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">Online Coaching</h4>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground">Guiding Potential. Building Brighter Futures.</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Every student has potential. Sometimes, all they need is the right guidance to unlock it. At <strong>Live 4 Help Foundation,</strong> caring volunteers offer <strong>personalized online coaching, mentoring, and counselling to help students</strong> build confidence, strengthen their skills, and move closer to their dreams.
                    <br /> <br />The initiative began with simple <strong>face-to-face conversations</strong> that revealed students’ need for spoken English support, subject coaching, and personal guidance. Friends and well-wishers of the Foundation responded by sharing their time, knowledge, and experience. Together, they built a growing community of volunteer mentors.
                    <br /> <br />Our volunteers and core team work closely with students, parents, teachers, and school leaders to monitor each learner’s progress. Together, this trusted network identifies individual needs and provides timely, meaningful support.
                    <br /> <br />Through regular check-ins, we identify challenges early, celebrate every step forward, and encourage students to stay motivated as they continue their journey.
                    <br /> <br />As trust grows, students feel comfortable asking for the help they need—whether it is subject coaching, spoken English practice, counselling, or personal guidance. This well-rounded support strengthens academic performance while nurturing confidence and personal growth.
                    <br /> <br />Today, volunteer mentors connect with students online to strengthen academic skills, build confidence, and guide them through educational and personal challenges. Share your time.
                    {/* <br /><br /><strong>Share your experience. Help a student take the next step toward a brighter future.</strong> */}
                  </p>
                  <section className="py-4 px-4 md:px-12 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-4 md:px-4 border border-foreground/5">
                      <span className="w-10 h-0.5 bg-secondary rounded-full" />
                      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground italic leading-normal px-4">
                        &ldquo;Share your experience. Help a student take the next step toward a brighter future.&rdquo;
                      </h2>
                      {/* <span className="font-sans font-semibold text-sm uppercase tracking-widest text-foreground/60">
                      &mdash; Mother Teresa
                    </span> */}
                    </div>
                  </section>
                </Card>

                {/* A. Education Team */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-6">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Users className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground"> Education Team</h4>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    L4H Foundation has formed an education team comprising highly qualified persons. During regular monthly virtual meeting, team invites students to share their aspirations, career path, progress, needs etc. Such interaction provides an open forum for bonding with members of L4H Foundation/sponsors, increased their confidence, communication skills as well as assist Foundation to identify gaps and potential improvement opportunities.
                  </p>

                  <div className="overflow-x-auto w-full rounded-2xl border border-[#C1D6C1] shadow-soft">
                    <table className="min-w-full text-xs text-left text-foreground/80 bg-white">
                      <thead className="bg-[#FFE6D4] text-foreground uppercase tracking-wider text-[10px] font-bold border-b border-[#EEB898]">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Qualifications</th>
                          <th className="px-6 py-4">Profession</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C1D6C1]/30">
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Bibekananda Maiti</td>
                          <td className="px-6 py-4">PGDIE, IIM Mumbai; B.Tech, Chemical Engineering</td>
                          <td className="px-6 py-4">Global Ocean Logistics Leader &amp; Regional Supply Chain Leader - Guardian Industries, APAC</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Debashish Das</td>
                          <td className="px-6 py-4">Master’s in computer science</td>
                          <td className="px-6 py-4">Entrepreneur, Former Executive Director of IBM (GBS)</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Dr. Ramkrishna Sadhukhan</td>
                          <td className="px-6 py-4">PhD in Biochemistry, Post Doctorate from Cleveland Clinic and Pfizer</td>
                          <td className="px-6 py-4">Senior Principal Research Scientist, Head of Therapeutic Protein Engineering, Global Biologics, AbbVie, USA</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Kajal Kumar Mandal</td>
                          <td className="px-6 py-4">B. Tech, Computer Science</td>
                          <td className="px-6 py-4">General Manager, Durgapur Steel Plant (SAIL)</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhabrata Chakraborti</td>
                          <td className="px-6 py-4">M.Sc. Economics</td>
                          <td className="px-6 py-4">Head of Business at Bharati Bhawan, Delhi, India, Formerly Director of Higher Education at Oxford University Press</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhendu Shekhar Mal</td>
                          <td className="px-6 py-4">B. Tech, Chemical Engineering</td>
                          <td className="px-6 py-4">Operations Engineer, Kuwait National Petrochemical Company (KNPC), Kuwait</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Tarun Kanti Maiti</td>
                          <td className="px-6 py-4">B. Tech, Chemical Engineering</td>
                          <td className="px-6 py-4">Project Engineering Manager, Bechtel, India</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                {/* Inspiring Journeys and Achievements */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-5">
                  <h4 className="font-display font-bold text-xl text-foreground">🏆 Inspiring Journeys and Achievements</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-semibold">
                    Our students continue to demonstrate what is possible when talent is matched with opportunity:
                  </p>
                  <ul className="flex flex-col gap-3 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                    <li>A student is pursuing a PhD at the University of Florida, USA, after completing an M.Sc. at IIT Madras</li>
                    <li>A student secured 4th rank in the Higher Secondary Examination</li>
                    <li>Alumni are building careers in government and private-sector organizations</li>
                    <li>Multiple students have achieved scores above 90% in Grade 10 and Grade 12 examinations</li>
                    <li>Students are pursuing MBBS, B.Tech., B.Sc., B.Com., M.A., B.A., and other higher-education programs</li>
                    <li>A growing number of first-generation learners are progressing to college and professional careers</li>
                  </ul>
                </Card>

                {/* success story */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Trophy className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">Success Stories</h4>
                    </div>
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground">From a Remote Village to Financial Independence: Anjali’s Journey</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><strong>Anjali Kisku</strong> comes from Kayamati, a remote Santhal village in Bankura district, West Bengal. In 2021, she became the first graduate from her village and began pursuing her goal of financial independence.
                    <br /><br />With the nearest computer training center more than 20 KM away, tuition and travel costs placed further learning beyond her reach. <strong>Live4Help Foundation</strong> supported her course fees, transportation, and job-oriented examination preparation, enabling her to continue building practical skills.
                    <br /><br />In 2025, Anjali gained admission to the Apparel Training and Design Centre in Kolkata for a diploma program. The Foundation covered her food, accommodation, and transportation, helping her complete the course in March 2026 without financial disruption.
                    <br /><br />Today, Anjali works as a Quality Control Supervisor in a garment company. Her journey from a remote village to financial independence shows how education, determination, and timely support can create a lasting pathway to a dignified livelihood.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground/80 flex items-center gap-1.5 flex-wrap">
                    <span>Read more:</span>
                    <a
                      href="https://live4help.org/blog/alumna-spotlight"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 transition-colors"
                    >
                      https://live4help.org/blog/alumna-spotlight
                    </a>
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/story/anjali.png"
                        alt="Anjali Kisku Success Story"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                  {/* </Card> */}

                  <br /><hr /><br />
                  {/* success story - Subham */}
                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">From Bankura to Florida: Subham’s Remarkable Rise in Physics</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><br /><strong>Subham Pandey</strong> comes from a family of four with limited income, yet his academic promise has always stood out. He scored 95.8% in higher secondary school, including 97% in Physics, and remained determined to pursue science even when the COVID-19 pandemic and his father’s declining health put his education at risk.
                    <br /><br />With support from local volunteer Anup Mandal and generous sponsors, <strong>Live4Help Foundation</strong> covered Subham’s semester and hostel fees, coaching, and books. He completed his B.Sc. Honours in Physics from Bankura Christian College in 2023 with 91% marks and a CGPA of 9.60.
                    <br /><br />Subham then earned an M.Sc. in Physics from IIT Madras, steadily improving his academic performance and completing the program in 2025. His perseverance carried him further: he secured admission to a Ph.D. program at the Herbert Wertheim College of Engineering, University of Florida, beginning in Spring 2026. The Foundation also supported his visa, travel, and initial settlement costs.
                    <br /><br />From financial uncertainty in Bankura to doctoral research in Florida, Subham’s journey shows what becomes possible when exceptional talent meets sustained support. His success is a powerful reflection of <strong>Live4Help Foundation’s</strong> mission to help deserving students overcome barriers and pursue their highest aspirations.
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/story/shubham.png"
                        alt="Subham Pandey Success Story"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                  {/* </Card> */}
                  <br /><hr /><br />
                  {/* success story - Srijita */}
                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">From a Toto Driver’s Home to Academic Distinction: Srijita’s Inspiring Journey</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><br /><strong>Srijita Basak</strong>, a student from Dangar Hat High School in Dakshin Dinajpur, West Bengal, achieved an extraordinary milestone in 2023 by securing fourth position in the West Bengal Higher Secondary Examination. She scored 493 out of 500, earning an overall grade of “O” and a 100-percentile ranking.
                    <br /><br />Behind this remarkable achievement was a journey shaped by perseverance. With her father earning a modest income as a toto driver, continuing higher education was financially challenging. Yet Srijita remained determined to pursue her passion for Geography.
                    <br /><br /><strong>Live4Help Foundation</strong> stepped in to support her undergraduate studies, helping ensure that financial limitations did not interrupt her academic journey. Srijita responded with exceptional dedication, securing 9.45 GPA in the fifth semester of her B.A. Geography program and earning top grades A+ and O - across all subjects.
                    <br /><br />From a modest home in Dakshin Dinajpur to sustained academic excellence, Srijita’s story shows how talent and determination can flourish when timely support removes financial barriers. Her success reflects <strong>Live4Help Foundation’s</strong> commitment to helping deserving students continue their education and realize their potential.
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/story/srijita.png"
                        alt="Srijita Basak Success Story"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                  {/* </Card> */}
                  <br /><hr /><br />
                  {/* success story - Joyjit */}
                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">From a Farmer’s Home to the Top of His College: Joyjit’s Remarkable Journey</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><br /><strong>Joyjit Mandal</strong>, a student of Patiram High School in West Bengal, achieved an outstanding 96.8% and a 99.97 percentile ranking in the 2025 West Bengal Higher Secondary Examination. His achievement is especially inspiring because his father, a daily laborer and small farmer, has supported the family with very limited means.
                    <br /><br />Recognizing that financial hardship could interrupt this promising student’s education, local volunteer Biswajit Pramanik referred Joyjit to <strong>Live4Help Foundation</strong>. The Foundation promptly connected him with a generous donor who agreed to sponsor his higher studies.
                    <br /><br />With this support, Joyjit enrolled in B.A. Geography Honours at Balurghat College. He made an exceptional start, securing a 9.0 SGPA - equivalent to 85% - in his first semester and ranking first in his college. The institution’s official website confirms an established Geography department supporting undergraduate study.
                    <br /><br />From a financially constrained household to academic leadership, Joyjit’s journey shows how determination can flourish when timely support opens the door to opportunity. His success reflects <strong>Live4Help Foundation’s</strong> commitment to helping talented students continue their education and realize their full potential.
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/story/biswajit.png"
                        alt="Joyjit Mandal Success Story"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                  {/* </Card> */}
                  <br /><hr /><br />
                  {/* success story - Subhankari */}
                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">From Vulnerability to a Life of Her Own: Subhankari’s Journey</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Alumni Success Story</strong>
                    <br /><br /><strong>Subhankari Mondal</strong> lost both her parents at a young age and was raised by her aunt, a daily labourer. When she joined the first batch of students supported by <strong>Live4Help Foundation</strong>, she was frail, malnourished, and at risk of leaving her education behind.
                    <br /><br />The Foundation first provided medical care and nutritious food to help her regain her health. As she grew stronger, the support expanded to her education, giving her the stability and encouragement needed to continue learning.
                    <br /><br />With sustained care and determination, Subhankari completed her B.A., built a life of her own, and is now married. Today, she stands proudly as an alumna of <strong>Live4Help Foundation</strong>—healthy, confident, and a lasting inspiration to the community that supported her.
                    <br /><br />Subhankari’s transformation shows that a small act of kindness, sustained with belief and compassion, can change the course of a life. Her journey continues to inspire <strong>Live4Help Foundation</strong> to reach more children facing hardship.
                  </p>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                        <img referrerPolicy="no-referrer"
                          src="/story/subhankari1.jpg"
                          alt="Subhankari Mondal (2021)"
                          className="w-full h-auto block"
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground/70">2021</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                        <img referrerPolicy="no-referrer"
                          src="/story/subhankari2.jpg"
                          alt="Subhankari Mondal (2025)"
                          className="w-full h-auto block"
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground/70">2025</span>
                    </div>
                  </div>
                  {/* </Card> */}
                  <br /><hr /><br />
                  {/* success story - Shweta */}
                  {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4"> */}
                  <h4 className="font-display font-bold text-xl text-foreground">Rising with Courage: Shweta’s Journey from Loss to Opportunity</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><br /><strong>Shweta Singh</strong> lives in New Delhi with her mother and two siblings. After losing her father to cancer, the family faced deep emotional and financial hardship. Despite the setback, Shweta stayed committed to her education and determined to build a brighter future.
                    <br /><br /><strong>Live4Help Foundation</strong> supported her studies, while Foundation members Amrita Datta and Subhendu Shekhar Mal provided free online coaching in English and Science. A laptop donated by the Foundation further strengthened her access to learning and helped her continue with confidence.
                    <br /><br />Her school principal, Pushpa Singh, witnessed a clear transformation in Shweta’s confidence and academic engagement. After completing Class XI with 70.8%, she progressed to higher education and is now pursuing a B.Com. at Deen Dayal Upadhyaya College, New Delhi.
                    <br /><br />Shweta’s journey from personal loss to college life shows how timely educational support, mentoring, and belief can turn adversity into opportunity. Her progress reflects <strong>Live4Help Foundation’s</strong> commitment to helping deserving students move forward with resilience and hope.
                  </p>
                  <div className="mt-2">
                    <div className="w-full max-w-2xl mx-auto rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/story/shweta.png"
                        alt="Shweta Singh Success Story"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </Card>




                {/* B. Achievement of Students in 2023 */}
                {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <h4 className="font-display font-bold text-lg text-foreground">B. Achievement of Students in 2023</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                    <li>1 student selected in IIT(M.Sc.)</li>
                    <li>3 students joined in Indian Post</li>
                    <li>1 student passed 12th with 90% +</li>
                    <li>2 students passed 12th with 80% +</li>
                    <li>1 student passed 12th with 70% +</li>
                    <li>1 student in 8th secured 92%</li>
                  </ul>
                </Card> */}

                {/* C. Face to face interaction with beneficiary students */}
                {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-5">
                  <h4 className="font-display font-bold text-lg text-foreground border-b border-foreground/5 pb-2">C. Face to face interaction with beneficiary students</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Foundation always endeavor to make a difference and believe that face to face interaction with the students is vital for our success towards education support program. With this thoughts, Live 4 Help Foundation Team met few students in Dec’23. One of core team members, Mr. Ramkrishna (Ramu) Sadhukhan who has come from USA to meet students and motivate them.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Our Beneficiary Student, <strong>Mr. Subham Pandey</strong> who is pursuing <strong>M.Sc. Physics from IIT, Chennai</strong> met with us on <strong>26<sup>th</sup> Dec’23</strong>. We had a good discussion about his future carrier path. Mr. Subham like to pursue Ph. D after completion of master’s degree.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Team met five Girl Students, <strong>Anjali Kisku, Sila Soren, Mukhi Moni, Rupali Hembram, Sonali Hembram</strong> and their parents in <strong>Tribal Village of Bankura District, West Bengal</strong> and observed ground reality of the living conditions of these students. It was really eye-opening and heart-breaking experience. We have given <strong>School Bags</strong> and <strong>Christmas Cake</strong> to the students. Live 4 Help Team reiterated and re-emphasized their parents to continue their education.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    Live 4 Help Team strongly believe that such interaction will provide moral boost and motivation to them. L4H will continue to meet more students in future.
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-foreground/50 font-semibold mb-3">Here is few photographs capturing moments while interacting with students.</p>
                    <div className="w-full rounded-[2rem] overflow-hidden border border-white shadow-soft bg-white">
                      <img referrerPolicy="no-referrer"
                        src="/student/Students.png"
                        alt="Student Interaction photographs"
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </Card> */}

                {/* D. Few Success Stories */}
                {/* <div className="flex flex-col gap-6">
                  <h4 className="font-display font-bold text-2xl text-foreground">D. Few Success Stories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Suvankari Mondal</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Suvankari Mondal lost both her parents and is living with her aunty, a daily labourer. She was suffering from malnutrition and was unable to continue her education. L4H foundation initially helped her by providing medical support and nutritious foods to recover from health issues, expanded assistance in pursuing education. L4H Foundation is pleased to witness Suvankari becoming healthy young aspiring women, soon to be appearing B.A. final. Her journey is a testament of how a little bit of help can do so much of goodness for someone. Her transformation from illness to healthy life inspires us to do more for such causes.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Shweta Singh</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Shweta Singh is a student of New Sainik Public School in Delhi, living with her mother and two siblings. Her father passed away 4 years ago due to cancer. She is an intelligent and meritorious student. L4H Foundation has committed to support her education. Additionally, two L4H Foundation members, <strong>Mrs. Amrita Datta</strong> from USA and <strong>Mr. Subhendu Shekhar Mal</strong> from Kuwait have provided Shweta free online coaching in English and Science subjects. Principal of her school, Mrs. Pushpa Singh informed us that she has noticed increased confidence level in Shweta over the years. Shweta is now studying in Class X and would like to pursue higher studies in commerce.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Subham Pandey</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Subham Pandey is studying in B.Sc. (with Physics Honours) at Bankura Christian College, West Bengal. Subham has excellent results in both Class X (94%) and in Class XII (95.8). His education was at stake during Covid when his father’s income dwindled, and poor health further deteriorated future prospected income. L4H Foundation stepped in for assisting his higher studies by covering semester fees of college, monthly private coaching fees, and cost of books. One of our Volunteers, Dr. Mrs. Kazi Sabnam Banu from Kolkata provided him free online coaching in chemistry. He has completed his fifth semester and now in final year of B.Sc. L4H Foundation is proud to share that Subham has been selected in IIT Guwahati for pursuing master’s degree (M.Sc. in Physics). He has a desire to do research after completing master’s degree.
                        </p>
                      </div>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#CFE8FF] flex items-center justify-center shadow-soft z-20">
                        <Quote className="w-5 h-5 transform rotate-180 text-blue-900" />
                      </div>
                      <div className="flex flex-col gap-3 z-10">
                        <h5 className="font-display font-bold text-lg text-foreground">Anjali Kisku</h5>
                        <p className="text-xs text-foreground/70 leading-relaxed">
                          Anjali Kisku, is the <strong>1<sup>st</sup></strong> graduate from village in <strong>Bankura District</strong>, West Bengal. She is preparing for a job for which a basic computer training and soft skill development has become a necessity. Anjali belongs to a poor tribal family and her father is only earning member who works as a daily labourer Anjali was struggling to bear the cost of computer course and transportation costs for commuting from her home to nearest training centre, which is more than 20 kms from her village. L4H Foundation stepped in by providing the transportation cost and computer course fee. We are pleased to share that Anjali now has the necessary skills needed to fulfil her aspirations and wish her all the best in pursuing her journey.
                        </p>
                      </div>
                    </Card>
                  </div>
                </div> */}

                {/* E. Free OFFLINE Coaching to Needy Students */}
                {/* <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <h4 className="font-display font-bold text-xl text-foreground">E. Free OFFLINE Coaching to Needy Students</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    During Covid 19 pandemic, all schools and institutions remained closed. The students in rural areas were struggling to continue their education. L4H Foundation explored opportunities to help needy student who can’t afford their private tuition fees. L4H Foundation launched a <strong>pilot project</strong> by selecting one of the villages in Medinipur district of West Bengal. L4H Foundation arranged <strong>free offline coaching covering 10 students</strong> by engaging local volunteers. Our plan is to develop such models in more villages by finding local volunteers who can devote their time to help and educate children.
                  </p>
                </Card> */}


              </motion.div>
            )}


            {activeTab === "healthcare" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">
                    Healthcare for All: Creating Awareness, Enabling Early Detection, Transforming Lives
                  </h3>
                  <p className="text-sm font-semibold text-[#2D9CD4] uppercase tracking-wider">
                    Empowering Communities Through Awareness, Early Detection, and Accessible Healthcare
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    At <strong>Live4Help Foundation</strong>, we believe healthcare is a fundamental right - not a privilege. Through cancer awareness programs and free medical testing camps, we bring vital health education, preventive screening, and essential medical services to underserved communities. By promoting early detection and timely care, we help individuals make informed health decisions, reduce avoidable suffering, and build healthier, more resilient communities.
                  </p>
                </div>

                {/* 3-Column Grid: Our Reach & Impact, Sustainability, and Long-Term Objectives */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Reach & Impact */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🌍 OUR REACH & IMPACT</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1 font-semibold">
                      as of August 2026
                    </p>
                    <p className="text-xs font-semibold text-foreground/90 leading-snug">
                      21 Healthcare Initiatives Conducted Across Rural and Underserved Communities
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li><strong>3,100+ beneficiaries</strong> reached</li>
                      <li><strong>8 Cancer Awareness Programs</strong> delivered</li>
                      <li><strong>13 Free Medical Camps</strong> conducted</li>
                      <li>Activities spread across <strong>West Bengal</strong> and <strong>Telangana</strong></li>
                      <li>Hundreds of women educated on breast cancer awareness and self-screening</li>
                      <li>Thousands of diagnostic tests and medical consultations facilitated</li>
                      <li>Improved healthcare awareness among students, women, senior citizens, daily wage workers, and economically disadvantaged families</li>
                      <li>✨ <strong>Strong community participation</strong> through volunteers, educational institutions, healthcare professionals, and local organizations</li>
                    </ul>
                  </Card>

                  {/* Card 2: Sustainability */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🌱 SUSTAINABILITY</h4>
                    </div>
                    <p className="text-xs font-semibold text-foreground/90 leading-snug">
                      Building a Culture of Preventive Healthcare
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Promoting regular health screening and preventive care</li>
                      <li>Increasing healthcare literacy within families and communities</li>
                      <li>Creating awareness that extends beyond event participants</li>
                      <li>Strengthening local volunteer and community networks</li>
                      <li>Encouraging timely medical intervention and follow-up care</li>
                      <li>Partnering with healthcare professionals and institutions for long-term impact</li>
                      <li>Enabling communities to take ownership of their health and well-being</li>
                    </ul>
                  </Card>

                  {/* Card 3: Long-Term Objectives & Outcomes */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🎯 LONG-TERM OBJECTIVES & OUTCOMES</h4>
                    </div>
                    <p className="text-xs font-semibold text-foreground/90 leading-snug">
                      Creating Healthier, More Resilient Communities
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Increased breast cancer awareness and early detection</li>
                      <li>Reduced incidence of undiagnosed chronic illnesses</li>
                      <li>Improved healthcare-seeking behavior among rural populations</li>
                      <li>Greater access to preventive healthcare services</li>
                      <li>Enhanced quality of life and health outcomes</li>
                      <li>Stronger community-based healthcare ecosystems</li>
                      <li>Reduced healthcare inequality among vulnerable groups</li>
                      <li>Sustainable impact through education, awareness, and preventive screening</li>
                    </ul>
                  </Card>
                </div>

                {/* Why Our Work Matters: From Awareness to Action */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Activity className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">
                        Why Our Work Matters: From Awareness to Action
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    For families in remote villages and economically disadvantaged communities, healthcare can become a choice between meeting daily needs and seeking essential care. Preventive check-ups are often delayed or missed because of:
                  </p>
                  <div className="bg-[#E5F0E5]/60 p-5 rounded-2xl border border-[#C1D6C1]/40 flex flex-col gap-2">
                    <ul className="flex flex-col gap-2 text-xs text-foreground/80 list-disc pl-5 leading-relaxed font-sans">
                      <li><strong>Financial hardship</strong></li>
                      <li><strong>Limited awareness</strong> of symptoms and preventive care</li>
                      <li><strong>Inadequate access</strong> to healthcare facilities</li>
                      <li><strong>Fear, myths, and social stigma</strong> surrounding diseases such as breast cancer</li>
                    </ul>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    These barriers allow illnesses to remain undiagnosed until they reach critical stages, causing avoidable suffering and financial distress. Many women are unfamiliar with breast cancer warning signs, screening options, and the importance of timely medical care.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    <strong>Live4Help Foundation is working to change this reality</strong>. Through health education, preventive screening, and free medical testing, we help communities move from reactive treatment to proactive care. Every awareness session, screening, and informed individual brings us closer to a future where healthcare is accessible, preventive, and inclusive for all.
                  </p>
                </Card>

                {/* Two Program Focus Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cancer Awareness Program */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <Activity className="w-6 h-6 text-primary" />
                        <h4 className="font-display font-bold text-xl text-foreground">
                          Cancer Awareness Program: Breaking Silence, Saving Lives
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        Breast cancer is among the most treatable cancers when detected early, yet awareness and screening remain inadequate in many communities.
                      </p>
                      <div className="bg-[#FFE6D4]/70 p-5 rounded-2xl border border-[#EEB898]/40 flex flex-col gap-2.5">
                        <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                          Live4Help Foundation&apos;s Cancer Awareness Programs focus on educating women, girls, caregivers, and families about:
                        </span>
                        <ul className="flex flex-col gap-2 text-xs text-foreground/75 pl-1 leading-relaxed font-sans">
                          <li className="flex items-start gap-2"><span>🔹</span><span>Early warning signs of breast cancer</span></li>
                          <li className="flex items-start gap-2"><span>🔹</span><span>Importance of routine screening and medical consultation</span></li>
                          <li className="flex items-start gap-2"><span>🔹</span><span>Breast self-examination techniques</span></li>
                          <li className="flex items-start gap-2"><span>🔹</span><span>Overcoming fear, myths, and social stigma</span></li>
                          <li className="flex items-start gap-2"><span>🔹</span><span>Benefits of early detection and preventive healthcare</span></li>
                        </ul>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        Interactive presentations, question-and-answer sessions, and practical demonstrations using <strong>Breast Cancer Detection Manikins</strong> help participants gain confidence and knowledge that can potentially save lives. These programs not only educate but also inspire action, empowering individuals to become advocates for health within their communities.
                      </p>
                    </div>

                    <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative mt-2">
                      <img referrerPolicy="no-referrer"
                        src="/focus/L4H-Medical-Camp-Photo-1.jpg"
                        alt="Cancer Awareness Session with Detection Manikins"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                  </Card>

                  {/* Free Medical Testing Camps */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <HeartHandshake className="w-6 h-6 text-primary" />
                        <h4 className="font-display font-bold text-xl text-foreground">
                          Free Medical Testing Camps: Healthcare at the Doorstep of the Needy
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        Access to healthcare remains one of the biggest challenges for underserved populations. To bridge this gap, Live4Help Foundation organizes free community medical camps that bring healthcare services directly to those who need them most.
                      </p>
                      <div className="bg-[#E5F0E5]/70 p-5 rounded-2xl border border-[#C1D6C1]/40 flex flex-col gap-2.5">
                        <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                          Beneficiaries receive:
                        </span>
                        <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                          <li>Free medical consultations</li>
                          <li>Blood sugar testing</li>
                          <li>Thyroid and lipid profile testing</li>
                          <li>Kidney and liver function tests</li>
                          <li>Anemia screening</li>
                          <li>Preliminary cancer screening</li>
                          <li>Follow-up consultation based on diagnostic reports</li>
                        </ul>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        These camps enable early detection of health concerns, provide valuable medical guidance, and reduce the financial burden on vulnerable families that might otherwise forego essential healthcare services.
                      </p>
                    </div>

                    <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative mt-2">
                      <img referrerPolicy="no-referrer"
                        src="/pic/Medical-Camp-Photo.jpg"
                        alt="Community Medical Testing Camp"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                  </Card>
                </div>

                {/* Partner with Us: An Urgent Appeal for CSR Support */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-6">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <HeartHandshake className="w-6 h-6 text-[#2D9CD4] " />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">
                        Partner with Us: An Urgent Appeal for CSR Support
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-[#2D9CD4] mt-1">
                        A Simple Health Check Can Save a Life. A CSR Contribution Can Save Hundreds.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    Across rural and underserved communities, many families live with untreated illnesses because they cannot afford basic tests, reach a healthcare facility, or recognize the early signs of disease. Women may remain unaware of breast cancer warning signs, while senior citizens often delay care because even essential diagnostic services are beyond their means. These are the realities Live4Help Foundation encounters in villages, schools, tea gardens, and remote communities.
                  </p>

                  <div className="bg-[#FFE6D4]/50 p-5 rounded-2xl border border-[#EEB898]/40 flex flex-col gap-3">
                    <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                      Behind every beneficiary is a human story:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>A mother receiving her first health screening</li>
                      <li>A daily wage earner unable to afford a blood test</li>
                      <li>A senior citizen postponing treatment because of financial hardship</li>
                      <li>A young woman learning that early breast cancer detection can save her life</li>
                    </ul>
                    <p className="text-xs text-foreground/75 leading-relaxed font-sans mt-1">
                      For these individuals, our healthcare camps and awareness programs are far more than one-time events. They may be the first opportunity to receive medical guidance, preventive screening, and trusted health education—support that can lead to earlier treatment, reduced suffering, and renewed hope.
                    </p>
                  </div>

                  {/* The Need Is Greater Than Our Current Reach */}
                  <div className="flex flex-col gap-3">
                    <h5 className="font-display font-bold text-lg text-foreground">
                      The Need Is Greater Than Our Current Reach
                    </h5>
                    <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                      Although our healthcare initiatives have already reached more than <strong>3,100 people</strong>, countless communities still lack affordable care and life-saving health awareness. Requests continue to come from areas where medical infrastructure is limited, and preventive services are out of reach. Our ability to respond—and to reach the next family in need—depends directly on timely financial support.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1 text-center">
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                        Without awareness, diseases remain undetected.
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
                        Without screening, treatment arrives too late.
                      </div>
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                        Without support, vulnerable families continue to suffer in silence.
                      </div>
                    </div>
                  </div>

                  {/* Your CSR Investment Can Create Lasting Change */}
                  <div className="bg-[#E5F0E5]/60 p-5 rounded-2xl border border-[#C1D6C1]/40 flex flex-col gap-3">
                    <h5 className="font-display font-bold text-base text-foreground">
                      Your CSR Investment Can Create Lasting Change
                    </h5>
                    <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                      By partnering with <strong>Live4Help Foundation</strong>, your organization can directly enable:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/80 list-disc pl-5 leading-relaxed font-sans">
                      <li>Free Medical Camps for underserved and remote communities</li>
                      <li>Breast Cancer Awareness & Early Detection Programs</li>
                      <li>Diagnostic Testing and Preventive Health Screening</li>
                      <li>Medical Consultations and Follow-up Care</li>
                      <li>Community Healthcare Education and Awareness</li>
                      <li>Long-term Health Literacy and Preventive Healthcare Practices</li>
                    </ul>
                    <p className="text-xs font-semibold text-foreground/90 leading-relaxed font-sans mt-1">
                      Every contribution helps move healthcare from hospitals into communities that need it most.
                    </p>
                  </div>

                  {/* The Return on Your CSR Investment Is Measured in Lives Changed */}
                  <div className="flex flex-col gap-3 border-t border-foreground/5 pt-4">
                    <h5 className="font-display font-bold text-base text-foreground">
                      The Return on Your CSR Investment Is Measured in Lives Changed
                    </h5>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>When a woman recognizes the early signs of breast cancer, a life may be saved.</li>
                      <li>When a health screening detects a condition early, a family’s future can change.</li>
                      <li>When a senior citizen receives timely medical guidance, avoidable suffering can be prevented.</li>
                      <li>When a community gains health awareness, the benefits can extend across generations.</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground/80 font-medium leading-relaxed font-sans">
                      Healthcare impact reaches far beyond one beneficiary—it strengthens families, supports caregivers, protects children, and builds healthier communities.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "environment" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">Mangrove Plantation</h3>
                  <p className="text-sm font-semibold text-[#2D9CD4] uppercase tracking-wider">
                    Restoring Nature. Empowering Communities. Protecting Our Planet.
                  </p>
                  <p className="text-base sm:text-lg italic text-foreground/80 font-medium">
                    &ldquo;The best time to plant a tree was years ago. The next best time is today.&rdquo;
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Climate change is no longer a distant threat. Rising sea levels, increasing coastal erosion, extreme weather events, and biodiversity loss are impacting vulnerable communities across the globe. The Sundarbans, one of the world&apos;s most important mangrove ecosystems, stands at the frontline of this challenge.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Through its <strong>Environment Initiative, Live 4 Help Foundation </strong>is restoring critical coastal ecosystems through large-scale mangrove plantation and conservation programs that deliver measurable environmental, social, and climate benefits. Our work goes beyond planting trees. We are rebuilding natural defenses, strengthening community resilience, protecting biodiversity, and creating a sustainable future for generations to come.
                  </p>
                </div>

                {/* 3-Column Grid: Our Reach & Impact, Sustainability, and Long-Term Objectives */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Reach & Impact */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🌍 OUR REACH & IMPACT</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1 font-semibold">
                      as of August 2026
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li><strong>11 Plantation Initiatives</strong> completed across the Sundarbans</li>
                      <li><strong>8 CSR-supported Projects</strong> enabled through partnerships with Eastman and ABS Professional Services India Pvt. Ltd.</li>
                      <li><strong>3 Community-Sponsored Projects</strong> funded by individual donors</li>
                      <li><strong>40,000+ Mangrove Saplings</strong> planted and nurtured</li>
                      <li>Community Engagement through plantation and maintenance activities</li>
                      <li>Local Livelihood Support generated through environmental restoration efforts</li>
                      <li>Coastal Ecosystem Recovery supporting biodiversity and fisheries</li>
                      <li>Enhanced Climate Resilience against erosion, flooding and cyclones</li>
                    </ul>
                  </Card>

                  {/* Card 2: Sustainability */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">♻️ SUSTAINABILITY</h4>
                    </div>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Continuous monitoring of plantation sites</li>
                      <li>Replacement of damaged or non-surviving saplings</li>
                      <li>Protection and strengthening of plantation areas</li>
                      <li>Community participation and local stewardship</li>
                      <li>Coastal ecosystem restoration and conservation</li>
                      <li>Protection of marine habitats and biodiversity</li>
                      <li>Environmental awareness and education</li>
                      <li> Long-term commitment to sustainable ecological recovery</li>
                    </ul>
                  </Card>

                  {/* Card 3: Long-Term Objectives & Outcomes */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">🎯 LONG-TERM OBJECTIVES & OUTCOMES</h4>
                    </div>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Restore degraded mangrove ecosystems</li>
                      <li>Increase carbon sequestration and reduce climate impact</li>
                      <li>Protect coastlines from erosion and flooding</li>
                      <li>Strengthen resilience against cyclones and storm surges</li>
                      <li>Sustain fisheries and marine biodiversity</li>
                      <li>Support livelihoods of vulnerable coastal communities</li>
                      <li>Contribute to global climate and sustainability goals</li>
                      <li>Create a healthier planet for future generations</li>
                    </ul>
                  </Card>
                </div>

                {/* Centered Quote Banner */}
                {/* <section className="py-8 px-6 md:px-12 text-center">
                  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5">
                    <span className="w-10 h-0.5 bg-secondary rounded-full" />
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground italic leading-normal px-4">
                      &ldquo;Planting a mangrove today is an investment in a greener Earth, safer communities, and a better tomorrow.&rdquo;
                    </h2>
                  </div>
                </section> */}


                <section className="py-4 px-4 md:px-12 text-center">
                  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-4 md:px-4 border border-foreground/5">
                    <span className="w-10 h-0.5 bg-secondary rounded-full"></span>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground italic leading-normal px-4">“Planting a mangrove today is an investment in a greener Earth, safer communities, and a better tomorrow.”</h2>
                  </div>
                </section>

                {/* Why Mangroves Matter Card */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Leaf className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">Why Mangroves Matter</h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    Mangroves are among nature&apos;s most powerful climate solutions. They absorb significant amounts of carbon dioxide, protect coastlines from storms and flooding, support marine biodiversity, and safeguard livelihoods for millions of people. Every mangrove planted today generates environmental benefits that extend far beyond local communities and contribute to the health of our planet.
                  </p>
                </Card>

                {/* Partner With Us Card */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <HeartHandshake className="w-6 h-6 text-secondary" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">Partner With Us</h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    Environmental restoration requires collective action. By partnering with <strong>Live 4 Help Foundation</strong>, organizations can create measurable and lasting impact by supporting climate action, biodiversity conservation, community empowerment, and ecosystem restoration.
                  </p>

                  <div className="bg-[#E5F0E5]/50 p-5 rounded-2xl border border-[#C1D6C1]/40 flex flex-col gap-3 mt-2">
                    <span className="text-xs sm:text-sm font-bold text-foreground font-sans">🌱 Your CSR investment can help:</span>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Combat climate change</li>
                      <li>Restore biodiversity</li>
                      <li>Protect vulnerable coastal communities</li>
                      <li>Improve livelihoods</li>
                      <li>Build a sustainable future</li>
                    </ul>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/75 font-semibold leading-relaxed font-sans mt-2">
                    Together, we can restore nature, strengthen communities, and create a sustainable future for our planet. 🌱
                  </p>
                </Card>

                {/* General Info and Photo note */}
                {/* <div className="flex flex-col gap-2">
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    The Foundation would like to take more such drives in future with funding from individuals or through CSR as a part of green initiative to protect environment for better tomorrow.
                  </p>
                  <p className="text-xs text-foreground/50 font-semibold mt-2">Here are a few Snapshots of photograph of our earlier plantation.</p>
                </div> */}



                {/* Plantation Gallery Snapshot Image */}
                <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative max-w-4xl mx-auto">
                  <img referrerPolicy="no-referrer"
                    src="/focus/plant.jpg"
                    alt="Sundarban Mangrove Plantation Campaign Photographs"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
              </motion.div>

            )}



            {activeTab === "relief" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 w-full"
              >
                {/* Overview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-bold text-3xl text-foreground">
                    Relief Work: Delivering Hope When It Matters Most
                  </h3>
                  {/* <p className="text-sm font-semibold text-[#2D9CD4] uppercase tracking-wider">
                    Delivering Hope, Dignity, and Timely Assistance to Vulnerable Communities
                  </p> */}
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    When floods wash homes away, winter nights become unbearable, or vulnerable families are left without necessities, timely relief becomes more than assistance — it becomes hope, dignity, and a lifeline. Guided by its mission of <strong>&ldquo;Better Living by Helping,&rdquo; Live4Help Foundation</strong> stands beside communities in their most difficult moments, mobilizing resources swiftly, stewarding every donation responsibly, and working through committed volunteers to ensure that compassionate support reaches those who need it most.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Behind every blanket distributed, every relief kit delivered, and every family supported is a circle of compassionate people who believe that humanity grows stronger when we help one another. <strong>Live4Help Foundation</strong> brings together volunteers, donors, CSR partners, local community leaders, and social organizations, transforming collective goodwill into timely, dignified assistance for the people who need it most.
                  </p>
                </div>

                {/* Relief Impact at a Glance Card */}
                <div className="w-full flex justify-center items-center">
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white max-w-2xl w-full">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm md:text-base text-foreground uppercase tracking-wider">🌍 RELIEF IMPACT AT A GLANCE</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-1 font-semibold">
                      as of August 2026
                    </p>
                    <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li><strong>15 Relief & Humanitarian</strong> Initiatives Conducted</li>
                      <li><strong>2,000+ Beneficiaries</strong> Supported</li>
                      <li><strong>1,000+ Beneficiaries Reached</strong> Through Blanket, Clothing & Winter Relief</li>
                      <li><strong>1,000+ Beneficiaries Supported</strong> Through Flood, Cyclone & Emergency Relief Operations</li>
                      <li>Activities Across <strong>Delhi, West Bengal & Assam</strong></li>
                      <li>Supported by <strong>ERBE Medical India Pvt. Ltd.</strong>, Individual Donors & Community Partners</li>
                    </ul>
                  </Card>
                </div>

                {/* Our Relief Journey Section */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <Calendar className="w-6 h-6 text-[#2D9CD4]" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">
                        Our Relief Journey
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/70">
                        Milestones of compassionate action and humanitarian response over the years
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 2021 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2021
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            50 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Beginning with Compassion
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Live4Help Foundation began its relief journey by distributing blankets to daily-wage workers and providing clothing to underprivileged families in Delhi, turning its commitment to compassion into direct support for people facing hardship.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        50 beneficiaries supported
                      </div>
                    </Card>

                    {/* 2022 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2022
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            200 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Extending Warmth
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Winter blanket distribution drive in North 24 Parganas, West Bengal, bringing warmth and comfort to vulnerable families facing harsh winter weather.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        200 beneficiaries supported
                      </div>
                    </Card>

                    {/* 2023 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2023
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            260 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Expanding Community Reach
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Blanket distribution initiatives in Delhi and West Bengal supporting school children, rural families, and economically disadvantaged communities.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        260 beneficiaries supported
                      </div>
                    </Card>

                    {/* 2024 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2024
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            708 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Responding to Crisis
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Alongside winter relief activities, responded to cyclone- and flood-affected communities in Sandeshkhali, Hingalganj, Hooghly, and Bankura. Distributed tarpaulins, mosquito nets, food supplies, and other essential materials to help families rebuild.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        708 beneficiaries supported
                      </div>
                    </Card>

                    {/* 2025 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2025
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            470 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Standing Strong with Flood-Affected Families
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Focused relief efforts across Paschim Medinipur, Jalpaiguri, and Bankura, providing blankets, mosquito nets, and emergency support to families rebuilding their lives after devastating floods.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        470 beneficiaries supported
                      </div>
                    </Card>

                    {/* 2026 */}
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#FFE6D4] text-[#DD6B20] text-xs font-bold uppercase tracking-wider">
                            2026
                          </span>
                          <span className="text-[11px] font-semibold text-foreground/60">
                            350 beneficiaries
                          </span>
                        </div>
                        <h5 className="font-bold text-base text-foreground">
                          Reaching Further
                        </h5>
                        <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                          Winter relief for elderly women and underprivileged children in Delhi, alongside a major flood relief mission in Sivasagar District, Assam, bringing essential aid to remote communities.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-foreground/5 text-[11px] font-semibold text-[#2D9CD4]">
                        350 beneficiaries supported
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Volunteer & Accountability Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* The Power of Volunteers Card */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <Users className="w-6 h-6 text-[#2D9CD4]" />
                        <h4 className="font-display font-bold text-xl text-foreground">
                          The Power of Volunteers
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        No relief operation succeeds without committed volunteers who carry compassion into communities. <strong>Live4Help Foundation</strong> proudly acknowledges the invaluable contribution of <strong>Roymoni Smriti Foundation</strong> volunteers, whose local knowledge, outreach, community engagement, and on-the-ground coordination help us fulfil our mission with greater reach, responsiveness, and dignity.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        From identifying and documenting beneficiaries in remote villages to organizing distributions and ensuring that aid reaches families with dignity, <strong>Roymoni Smriti Foundation volunteers </strong>embody the true spirit of service. Through this partnership, <strong>Live4Help Foundation</strong> can extend its mission into hard-to-reach communities, combining local trust with coordinated action to bring practical support and renewed hope to people facing adversity.
                      </p>
                      <div className="bg-[#E5F0E5]/70 p-4 rounded-2xl border border-[#C1D6C1]/40 text-xs font-semibold text-foreground/90">
                        Together, our volunteers transform compassion into action and action into lasting impact.
                      </div>
                    </div>
                  </Card>

                  {/* Accountability & Responsible CSR Card */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <HeartHandshake className="w-6 h-6 text-[#2D9CD4]" />
                        <h4 className="font-display font-bold text-xl text-foreground">
                          Accountability & Responsible CSR
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        Every contribution entrusted to <strong>Live4Help Foundation</strong> is managed with transparency, responsibility, and respect for the people it is intended to serve. This commitment reflects our NGO mission: to transform compassion into accountable action and ensure that every resource creates meaningful, measurable impact.
                      </p>
                      <div className="bg-[#FFE6D4]/60 p-5 rounded-2xl border border-[#EEB898]/40 flex flex-col gap-2.5">
                        <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                          Our Disciplined Framework:
                        </span>
                        <ul className="flex flex-col gap-2 text-xs text-foreground/80 list-disc pl-5 leading-relaxed font-sans">
                          <li>Need-based assessment before intervention</li>
                          <li>Efficient mobilization and deployment of resources</li>
                          <li>Documented and monitored distributions</li>
                          <li>Community participation and volunteer engagement</li>
                          <li>Transparent reporting and measurable impact</li>
                        </ul>
                      </div>
                      <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                        This disciplined approach has enabled us to build lasting trust with beneficiaries, donors, volunteers, and CSR partners.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Join Us in Creating Greater Impact Card */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-6">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                    <HeartHandshake className="w-6 h-6 text-[#2D9CD4]" />
                    <div>
                      <h4 className="font-display font-bold text-2xl text-foreground">
                        Join Us in Creating Greater Impact
                      </h4>
                      {/* <p className="text-xs sm:text-sm font-semibold text-[#2D9CD4] mt-1">
                        Mobilizing Resources, Dignity, and Direct Support When Disaster Strikes
                      </p> */}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    Despite the progress made, countless families continue to face extreme weather, disasters, and economic hardship. The need for timely and meaningful relief remains greater than ever.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    Whether you are a corporate organization seeking meaningful CSR engagement, a foundation looking for a trusted implementation partner, a volunteer ready to serve, or an individual wishing to make a difference, your support can help <strong>Live4Help Foundation</strong> carry hope, dignity, and practical assistance to many more families facing hardship.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1 text-center">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 flex flex-col gap-1 items-center justify-center">
                      <span className="text-base">❄️</span>
                      <span className="font-bold">Winter Protection</span>
                      <span>A blanket can protect a child from a harsh winter night.</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 flex flex-col gap-1 items-center justify-center">
                      <span className="text-base">🌊</span>
                      <span className="font-bold">Disaster Relief</span>
                      <span>A relief kit can help a family survive a disaster.</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex flex-col gap-1 items-center justify-center">
                      <span className="text-base">🤝</span>
                      <span className="font-bold">CSR Partnership</span>
                      <span>A partnership can transform entire communities.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-center items-center pt-2">
                    <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                      Join hands with Live4Help Foundation • Partner • Volunteer • Support
                    </span>
                    <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                      Together, let&apos;s deliver hope, restore dignity, and build a future where no one is left behind.
                    </p>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2D9CD4]">
                      &ldquo;Better Living by Helping.&rdquo;
                    </span>
                  </div>
                </Card>

                {/* Gallery Snapshots Image */}
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-xs text-foreground/50 font-semibold align-self-start">
                    Here are a few snapshots of photographs from our earlier relief distributions.
                  </p>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative max-w-4xl mx-auto">
                    <img referrerPolicy="no-referrer"
                      src="/focus/Cloth-Distribution-Photo-3.jpg"
                      alt="Relief Work, Flood Response & Blanket Distribution Campaigns"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* Education tab nested sections on main page background */}
      {activeTab === "education" && (
        <>
          {/* Latest Education Activities & Updates */}
          <ImpactBlogSection
            title="Latest Education Activities & Updates"
            description="Explore detailed reports and updates from our education campaigns and student milestones."
            categoryLink="/blog?category=education"
            defaultCategoryName="Education"
            emptyText="No education updates found."
            posts={educationBlogs}
          />

          {/* Meet Our Sponsored Students CTA Section */}
          <section className="py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-[#DCEFEF] flex flex-col gap-6 items-center text-center w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-premium">
                <div className="flex flex-col gap-3 max-w-xl">
                  <h4 className="font-display font-bold text-2xl text-foreground">Meet Our Sponsored Students</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    We maintain complete transparency and updates for all students sponsored under our education program. Click below to view the full student directory, progress reports, and profiles.
                  </p>
                </div>
                <Link href="/students">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-[#444444] bg-[#FFE6D4] hover:bg-[#ffd1b3] border border-[#EEB898] transition-premium shadow-soft cursor-pointer">
                    View Student Profiles
                    <ArrowRight className="w-5 h-5 text-[#444444]" />
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Video Testimonials Section */}
          <section className="py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto bg-[#E8ECF2] rounded-[3rem] py-8 px-4 md:py-12 md:px-8 border border-foreground/5 flex flex-col gap-10 text-left">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-4 max-w-2xl text-left">
                  <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Voice of the People</span>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground">Video Testimonials</h3>
                  <p className="text-xs sm:text-sm text-foreground/70">
                    Hear directly from our members, students, and supporters sharing their journey of collective actions and hope.
                  </p>
                </div>
                <Link href="/testimonials">
                  <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-primary shadow-soft transition-premium cursor-pointer">
                    View All Stories
                  </button>
                </Link>
              </div>

              <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
                {testimonialsList.map((item, idx) => (
                  <MotionCard
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    key={item.name}
                    onClick={() => setActiveVideo(item.video)}
                    className="flex-shrink-0 w-64 h-[350px] rounded-[2.5rem] group cursor-pointer border border-[#B8C5D6] flex flex-col snap-start overflow-hidden relative text-left"
                  >
                    <img referrerPolicy="no-referrer"
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-premium"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-premium">
                      <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center shadow-lg text-white">
                        <Play className="w-5 h-5 fill-current text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest font-sans opacity-75">Supporter Story</span>
                      <h4 className="font-display font-bold text-base leading-tight">{item.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] backdrop-blur-md bg-white/20 border border-white/20 w-fit px-2.5 py-1 rounded-full font-semibold uppercase mt-1">
                        <Play className="w-2.5 h-2.5 fill-current" /> Play Video
                      </div>
                    </div>
                  </MotionCard>
                ))}
              </div>
            </div>
          </section>

          {/*  Making a Difference Today for a Better Tomorrow Section */}
          <section className="py-8 px-6 md:px-12 pb-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF9E6] via-[#FFF3C3] to-[#FFF9E6] rounded-[3rem] py-12 px-6 md:py-16 md:px-8 border border-[#EEC978]/30 shadow-premium max-w-7xl mx-auto flex flex-col gap-6 text-center items-center hover:shadow-2xl transition-all duration-500">
              {/* Subtle background decoration blurs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-x-12 -translate-y-12 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#DD6B20]/10 rounded-full blur-3xl translate-x-16 translate-y-16 pointer-events-none" />

              <span className="text-sm md:text-base font-semibold text-[#DD6B20] tracking-wide z-10">
                Making a Difference Today for a Better Tomorrow
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-800 tracking-tight whitespace-normal lg:whitespace-nowrap max-w-full z-10">
                131 students supported. 103 dreams in progress. Countless possibilities ahead.
              </h2>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-2xl font-sans z-10">
                With the partnership of donors, volunteers, educational institutions, and CSR supporters, <strong className="font-bold text-[#DD6B20]">Live4Help Foundation</strong> is helping ensure that financial hardship never stands between a child and an education. Together, we can help more young people stay in school, pursue higher education, and build independent, hopeful futures.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE6D4] text-[#DD6B20] rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border border-[#EEB898]/40 shadow-soft mt-2 z-10 transition-all duration-300 hover:scale-105 cursor-default">
                Empowering Children • Enabling Dreams • Building a Better Future
              </div>
            </div>
          </section>
        </>
      )}

      {/* Healthcare tab blog section and After Blog Section CTA */}
      {activeTab === "healthcare" && (
        <>
          <ImpactBlogSection
            title="Latest Healthcare Activities & Updates"
            description="Explore detailed reports and updates from our medical camps, health checkups, and awareness programs."
            categoryLink="/blog?category=healthcare"
            defaultCategoryName="Healthcare"
            emptyText="No healthcare updates found."
            posts={healthcareBlogs}
          />

          {/* After Blog Section: Healthcare Urgent Appeal Banner */}
          <section className="py-8 px-6 md:px-12 pb-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF9E6] via-[#FFF3C3] to-[#FFF9E6] rounded-[3rem] py-12 px-6 md:py-16 md:px-8 border border-[#EEC978]/30 shadow-premium max-w-7xl mx-auto flex flex-col gap-6 text-center items-center hover:shadow-2xl transition-all duration-500">
              {/* Subtle background decoration blurs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-x-12 -translate-y-12 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#DD6B20]/10 rounded-full blur-3xl translate-x-16 translate-y-16 pointer-events-none" />

              <span className="text-sm md:text-base font-semibold text-[#DD6B20] tracking-wide z-10">
                You Can Be the Reason They Receive It
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-800 tracking-tight max-w-4xl z-10 leading-snug">
                Somewhere Today, A Woman Needs Cancer Awareness. A Child Needs Health Education. A Senior Citizen Needs Medical Care. A Family Needs Hope.
              </h2>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-3xl font-sans z-10">
                Partner with <strong className="font-bold text-[#DD6B20]">Live4Help Foundation</strong> and help us ensure that the next screening detects a disease early, the next medical camp reaches a forgotten community, and the next life-changing intervention happens when it matters most.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE6D4] text-[#DD6B20] rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border border-[#EEB898]/40 shadow-soft mt-2 z-10 transition-all duration-300 hover:scale-105 cursor-default">
                Because healthcare cannot wait. Lives cannot wait. And together, neither should we.
              </div>
            </div>
          </section>
        </>
      )}

      {/* Environment tab blog section */}
      {activeTab === "environment" && (
        <ImpactBlogSection
          title="Latest Plantation Activities & Updates"
          description="Explore detailed reports and updates from our mangrove plantation drives and coastal restoration projects."
          categoryLink="/blog?category=plantation"
          defaultCategoryName="Plantation"
          emptyText="No plantation updates found."
          posts={plantationBlogs}
        />
      )}

      {/* Relief tab blog section and After Blog Section CTA */}
      {activeTab === "relief" && (
        <>
          <ImpactBlogSection
            title="Latest Relief Work Activities & Updates"
            description="Explore detailed reports and updates from our relief campaigns, blanket distributions, and community aid."
            categoryLink="/blog?category=relief%20work"
            defaultCategoryName="Relief Work"
            emptyText="No relief work updates found."
            posts={reliefBlogs}
          />

          {/* After Blog Section: Relief Call to Action Banner */}
          <section className="py-8 px-6 md:px-12 pb-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF9E6] via-[#FFF3C3] to-[#FFF9E6] rounded-[3rem] py-12 px-6 md:py-16 md:px-8 border border-[#EEC978]/30 shadow-premium max-w-7xl mx-auto flex flex-col gap-6 text-center items-center hover:shadow-2xl transition-all duration-500">
              {/* Subtle background decoration blurs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-x-12 -translate-y-12 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#DD6B20]/10 rounded-full blur-3xl translate-x-16 translate-y-16 pointer-events-none" />

              <span className="text-sm md:text-base font-semibold text-[#DD6B20] tracking-wide z-10">
                Join Us in Creating Greater Impact
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-800 tracking-tight max-w-4xl z-10 leading-snug">
                A blanket can protect a child from a harsh winter night. A relief kit can help a family survive a disaster. A partnership can transform entire communities.
              </h2>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-3xl font-sans z-10">
                Join hands with <strong className="font-bold text-[#DD6B20]">Live4Help Foundation</strong>. Partner. Volunteer. Support. Together, let&apos;s deliver hope, restore dignity, and build a future where no one is left behind.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE6D4] text-[#DD6B20] rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider border border-[#EEB898]/40 shadow-soft mt-2 z-10 transition-all duration-300 hover:scale-105 cursor-default">
                &ldquo;Better Living by Helping.&rdquo;
              </div>
            </div>
          </section>
        </>
      )}

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
              className="absolute top-6 right-6 p-3 rounded-full text-white hover:text-gray-200 transition-colors cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
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
