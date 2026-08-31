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
  ArrowRight
} from "lucide-react";
import ImpactStats from "../components/ImpactStats";
import { Card, MotionCard } from "../components/Card";
import blogsData from "../data/blogs.json";
import testimonialsData from "../data/testimonials.json";
import { getBlogPosts } from "../actions/blog";
import { getTestimonials } from "../actions/testimonial";

export default function Impact() {
  const [activeTab, setActiveTab] = useState<"education" | "healthcare" | "environment" | "relief">("education");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [blogsList, setBlogsList] = useState<any[]>(
    blogsData.filter((post: any) => {
      const catName = (post.category?.name || post.category || "").toLowerCase();
      return catName.includes("education");
    }).slice(0, 3)
  );
  const [testimonialsList, setTestimonialsList] = useState<any[]>(testimonialsData);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getBlogPosts().then((posts) => {
      if (posts && posts.length > 0) {
        const eduBlogs = posts.filter((post: any) => {
          const catName = (post.category?.name || post.category || "").toLowerCase();
          return catName.includes("education");
        });
        setBlogsList(eduBlogs.slice(0, 3));
      }
    }).catch(() => { });

    getTestimonials().then((list) => {
      if (list && list.length > 0) {
        setTestimonialsList(list);
      }
    }).catch(() => { });
  }, []);

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
      <section className="py-8 px-6 md:px-12 pb-16">
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
                    <strong>Live 4 Help (L4H) Foundation</strong>believes that a child’s future should be shaped by talent, determination, and dreams—not limited by financial hardship. Yet for many bright and motivated students, the cost of school fees, books, uniforms, transport, accommodation, or coaching can place education beyond reach. A single setback can interrupt years of learning and close the door to opportunities that could transform not only one life, but an entire family.
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

                <section className="py-8 px-6 md:px-12 text-center">
                  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5">
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
                  <section className="py-8 px-6 md:px-12 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5">
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
                  <p>Read more: <a href="https://live4help.org/blog/live4help-computer-laptop-donation-education">https://live4help.org/blog/live4help-computer-laptop-donation-education</a></p>
                </Card>



                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
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
                  <section className="py-8 px-6 md:px-12 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5">
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
                          <td className="px-6 py-4 font-bold text-foreground">Dr. Ramkrishna Sadhukhan</td>
                          <td className="px-6 py-4">PhD in Biochemistry, Post Doctorate from Cleveland Clinic and Pfizer</td>
                          <td className="px-6 py-4">Senior Principal Research Scientist, Head of Therapeutic Protein Engineering, Global Biologics, AbbVie, USA</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Debashish Das</td>
                          <td className="px-6 py-4">Master’s in computer science</td>
                          <td className="px-6 py-4">Entrepreneur, Former Executive Director of IBM (GBS)</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Bibekananda Maiti</td>
                          <td className="px-6 py-4">B.Tech, Chemical, PGDIE</td>
                          <td className="px-6 py-4">Supply Chain Director – APAC, Guardian Industries, Thailand</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhabrata Chakraborti</td>
                          <td className="px-6 py-4">M.Sc. Economics</td>
                          <td className="px-6 py-4">Head of Business at Bharati Bhawan, Delhi, India, Formerly Director of Higher Education at Oxford University Press</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Subhendu Shekhar Mal</td>
                          <td className="px-6 py-4">B. Tech, Chemical</td>
                          <td className="px-6 py-4">Operations Engineer, Kuwait National Petrochemical Company (KNPC), Kuwait</td>
                        </tr>
                        <tr className="hover:bg-foreground/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground">Tarun Kanti Maiti</td>
                          <td className="px-6 py-4">B. Tech, Chemical</td>
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


                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                  <h4 className="font-display font-bold text-xl text-foreground">From a Remote Village to Financial Independence: Anjali’s Journey</h4>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    <strong>A Live4Help Foundation Education Success Story</strong>
                    <br /><strong>Anjali Kisku</strong> comes from Kayamati, a remote Santhal village in Bankura district, West Bengal. In 2021, she became the first graduate from her village and began pursuing her goal of financial independence.
                    <br /><br />With the nearest computer training center more than 20 KM away, tuition and travel costs placed further learning beyond her reach. <strong>Live4Help Foundation</strong> supported her course fees, transportation, and job-oriented examination preparation, enabling her to continue building practical skills.
                    <br /><br />In 2025, Anjali gained admission to the Apparel Training and Design Centre in Kolkata for a diploma program. The Foundation covered her food, accommodation, and transportation, helping her complete the course in March 2026 without financial disruption.
                    <br /><br />Today, Anjali works as a Quality Control Supervisor in a garment company. Her journey from a remote village to financial independence shows how education, determination, and timely support can create a lasting pathway to a dignified livelihood.
                  </p>
                  <p>Read more: <a href="https://live4help.org/blog/alumna-spotlight">https://live4help.org/blog/alumna-spotlight</a></p>
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
                  <h3 className="font-display font-bold text-3xl text-foreground">Health Care NGO in Delhi Support Senior Citizen Care</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Live 4 Help (L4H) Foundation organized three medical camps in remote villages in last 2 years. Total number of beneficiaries from the camp is <strong>397</strong>. It is observed that rural people always give lesser priority to their health check-up due to financial constraints. The rural-urban divide in healthcare is linked to the lack of healthcare literacy. The insufficient level of health awareness has a negative impact on access to healthcare. Living conditions and a low level of education are crucial barriers for rural population. The basic objectives of these medical camps were to provide free medical tests including preliminary cancer screening test to underprivileged people and create general healthcare awareness.
                  </p>
                </div>

                {/* 3-Column Grid for Medical Camps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Camp 1 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Daspur)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>26<sup>th</sup> March’22</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation organized <strong>Free Medical Camp</strong> on <strong>26<sup>th</sup> March, 2022</strong> in Daspur Block, Paschim Medinipur, West Bengal. Blood samples were taken by <strong>Thyrocare</strong> for <strong>102</strong> adults against our target of <strong>100</strong>. Out of <strong>102</strong> beneficiaries, <strong>30</strong> were female. The people from nearby villages availed the benefits of free medical tests. The age group of beneficiaries varied from <strong>26 years to 76 years</strong>. The blood test covered complete Hemogram, TBC, Thyroid Profile, Lipid Profile, Kidney Function Test (KFT), Liver Function Test, Iron Deficiency, Vitamin D and Vitamin B12, Blood Sugar including cancer test (PSA for Male, Ca125 for Female). The Free Medical Camp was supported by <strong>M/s ERBE</strong> (Erbe Medical India Pvt. Ltd.).
                      </p>
                    </div>
                  </Card>

                  {/* Camp 2 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Hingalganj)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>28<sup>th</sup> December’22</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        The basic objective of this medical camp was to provide free medical test including preliminary cancer screening test to underprivileged people, mainly adults of age group <strong>30 years and above</strong>. Rural people in Sundarban area never got opportunity to do medical test due to remote location and unavailability of diagnostic center. This Medical Camp had special significance. The First time such medical camp was held at the far remote corner of the delta and the last human habitat, after which the core of Sundarban National Park starts.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        <strong>M/s ERBE (Erbe Medical India Pvt. Ltd.)</strong> supported the Medical Camp through their Corporate Social Responsibility (CSR). <strong>125</strong> beneficiaries availed this benefit. <strong>Thyrocare Kolkata</strong> took the blood sample and provided test report.
                      </p>
                      <div className="border-t border-foreground/5 pt-2">
                        <span className="text-xs font-semibold text-foreground block mb-1">The medical test included:</span>
                        <ul className="list-disc pl-5 text-[11px] text-foreground/75 flex flex-col gap-1 leading-normal font-sans">
                          <li>Complete Hemogram</li>
                          <li>Cancer Test (PSA for Male, Ca125 for Female)</li>
                          <li>Thyroid Profile and Lipid Profile</li>
                          <li>Kidney Function Test and Liver Function Test</li>
                          <li>Iron Deficiency</li>
                          <li>Blood Sugar</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Camp 3 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Free Medical Camp (Sundarban)</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>29<sup>th</sup> December’23</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation organized third <strong>Free Medical Camp</strong> on <strong>29<sup>th</sup> December, 2023</strong> in Sundarban area of West Bengal. <strong>170</strong> beneficiaries mostly adults availed this benefit. The medical camp includes free blood test covering Complete Hemogram, Cancer Test – PSA for Male and Ca125 for Female, Thyroid Profile and Lipid Profile, Kidney Function Test and Liver Function Test, Iron Deficiency, Blood Sugar. The foundation arranged <strong>five doctors (3 male and 2 female)</strong> to provide free consultation during camp and after availability of blood test report.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        <strong>M/s ERBE (Erbe Medical India Pvt. Ltd.)</strong> supported the Medical Camp through their Corporate Social Responsibility (CSR).
                      </p>
                    </div>
                  </Card>
                </div>

                {/* 4. Cancer Awareness Workshops */}
                <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-5">
                      <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                        <Activity className="w-6 h-6 text-primary" />
                        <h4 className="font-display font-bold text-xl text-foreground">4. Cancer Awareness Workshops</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        L4H Foundation organized <strong>1st Cancer Awareness Session</strong> at <strong>Bhagbanchak Patiram Shikha Niketan, Medinipur, West Bengal</strong> and <strong>2nd Cancer Awareness Session</strong> at <strong>Gobindakati Sikshaniketan High School, Hingalganj West Bengal</strong>. Both sessions were facilitated by <strong>Dr. Shyamsundar Mondal</strong>, retired ex. HOD, Department of Epidemiology and Biostatistics, Chittaranjan National Cancer Institute, Kolkata and attended by school students, local people. Dr. S. Mondal’s lucid explanation was well appreciated by all attendees.
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        The L4H Foundation is organizing similar program at regular intervals to create awareness and reach out to large population in future and thereby to help people in early detection and treatment.
                      </p>
                      <div className="bg-[#FFE6D4] p-5 rounded-2xl border border-[#EEB898]/40 flex flex-col gap-3">
                        <span className="text-xs sm:text-sm font-bold text-foreground font-sans">The basic objectives of cancer awareness program are:</span>
                        <ul className="flex flex-col gap-2 text-xs text-foreground/75 pl-1 leading-relaxed font-sans">
                          <li><strong>a)</strong> Remove the stigma and fear attached with cancer.</li>
                          <li><strong>b)</strong> Help people recognize the early signs and symptoms of cancer.</li>
                          <li><strong>c)</strong> Inform people about the importance of regular screening and check-ups.</li>
                          <li><strong>d)</strong> Inform women about mammograms, clinical breast exam and breast self-exam.</li>
                        </ul>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                        The Foundation has procured <strong>Breast Examination Simulator</strong> with a donation from one of our Patrons. The simulator is used during cancer awareness program for educating woman about breast self-exam.
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                      <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                        <img referrerPolicy="no-referrer"
                          src="/focus/L4H-Medical-Camp-Photo-1.jpg"
                          alt="Cancer Awareness Workshops & Medical Camp"
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </div>
                    </div>
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
                  <h3 className="font-display font-bold text-3xl text-foreground">Mangrove Plantation for Greener and Cleaner Environment</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Live 4 Help (L4H) Foundation is committed to contribute to mother earth by means of plantation with a motto of cleaner and greener environment. In a span of two years, L4H Foundation planted approximately <strong>4000</strong> mangrove saplings in three plantation drives (<strong>2<sup>nd</sup> Nov’21</strong>, <strong>26<sup>th</sup> Jan’22</strong> and <strong>30<sup>th</sup> Dec’23</strong>) in Sundarbans Areas of West Bengal.
                  </p>
                </div>

                {/* 2-Column Split Details: Objectives & Protection Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Benefits of Mangrove Plantation</h4>
                    </div>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed font-sans">
                      <li>Provide a natural defence against storm surges, coastal erosion, and flooding</li>
                      <li>Reduce of carbon footprints</li>
                      <li>Minimize greenhouse effect</li>
                    </ul>
                  </Card>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#DD6B20]" />
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Sustainability & Growth</h4>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed font-sans mb-1">
                      With the help of local team/volunteers, L4H Foundation undertook responsibility for protecting the plants for <strong>3 years</strong> to ensure their sustainability.
                    </p>
                    <p className="text-xs text-foreground/75 leading-relaxed font-sans">
                      The saplings of earlier plantation drives are growing very rapidly, and it gives us immense pleasure and satisfaction to see the growth. The average height of the sapling is <strong>8-12 feet</strong>.
                    </p>
                  </Card>
                </div>

                {/* General Info and Photo note */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
                    The Foundation would like to take more such drives in future with funding from individuals or through CSR as a part of green initiative to protect environment for better tomorrow.
                  </p>
                  <p className="text-xs text-foreground/50 font-semibold mt-2">Here are a few Snapshots of photograph of our earlier plantation.</p>
                </div>

                {/* 3-Column Grid for Plantation Drives */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Drive A */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">A. 1st Mangrove Plantation</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 2nd November, 2021</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-2">
                        The world’s largest contiguous mangrove forest is Sundarbans in West Bengal, India. Mangroves provide ecosystem including carbon sequestration and costal protection. Unfortunately, deadliest cyclone Amphan destroyed one-third of mangrove forest in 2020.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation successfully implemented its <strong>first initiative</strong> towards a clean and green environment through mangrove plantation on <strong>November 2<sup>nd</sup>, 2021</strong>. We planted approximately <strong>1000</strong> saplings at <strong>Purba Kalitala, Haridaskati</strong> near the banks of Kalindi river of Hingalganj Block of Sundarbans.
                      </p>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans border-t border-foreground/5 pt-2">
                        The entire area has been <strong>fenced with bamboo and nylon net</strong> to protect the plants from cattle. L4H Foundation commit to maintain plants for <strong>3 years</strong> with the help of local team and reserved adjacent space within the fence for plantation of another <strong>~2000</strong> saplings with <strong>2<sup>nd</sup></strong> round of fundraising later.
                      </p>
                    </div>
                  </Card>

                  {/* Drive B */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">B. 2nd Mangrove Plantation</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 26th January, 2022</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation has celebrated <strong>73<sup>rd</sup> Republic Day</strong> with successive plantation drive within a span of 3 months. With <strong>2<sup>nd</sup></strong> batch of <strong>2000</strong> mangrove saplings, L4H Foundation commit to maintain a total of <strong>3,000</strong> plants for <strong>3 years</strong> to ensure sustainability of plants. Varieties of mangroves planted are <strong>Sundari, Kakra, Dhudhul, Bain, Gorgon, Poshur.</strong>
                      </p>
                    </div>
                  </Card>

                  {/* Drive C */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">C. 3rd Mangrove Plantation</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on 30th December, 2023</span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H Foundation planted approximately <strong>1000</strong> Mangroves mostly <strong>Kakra and Sundari</strong> on <strong>Kalindi River Bank, Gobindakati, Hingalganj, North 24 Parganas, West Bengal</strong> on <strong>30<sup>th</sup> Dec’23</strong>.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Plantation Gallery Snapshot Image */}
                <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative max-w-4xl mx-auto">
                  <img referrerPolicy="no-referrer"
                    src="/focus/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
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
                  <h3 className="font-display font-bold text-3xl text-foreground">Winter Relief & Other Social Works</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                    Live 4 Help Foundation is exploring and trying to find out opportunities to help underprivileged people in every way possible. One of the initiatives is to distribute blankets during winter seasons. In last 3 years Foundation distributed total <strong>480 blankets</strong> at various locations.
                  </p>
                </div>

                {/* 3-Column / 2-Row Responsive Grid for Distribution Campaigns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Drive 1 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">1. Blanket Distribution</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>29<sup>th</sup> December, 2023</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H distributed <strong>160 blankets</strong> to rural villagers in North 24 Parganas District of West Bengal.
                      </p>
                    </div>
                  </Card>

                  {/* Drive 2 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">2. Blanket Distribution</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>15<sup>th</sup> January, 2023</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H distributed <strong>100 blankets</strong> to construction workers at Govt. Boys Senior Secondary School, Jharoda Kalan, New Delhi-110072 during peak winter.
                      </p>
                    </div>
                  </Card>

                  {/* Drive 3 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">3. Blanket Distribution</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>27<sup>th</sup> December, 2022</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        L4H distributed <strong>200 blankets</strong> among disadvantaged people in rural villages of 24th Parganas, West Bengal to provide a touch of warmth amidst the bitter winters.
                      </p>
                    </div>
                  </Card>

                  {/* Drive 4 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">4. Cloth Distribution</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on <strong>15<sup>th</sup> August, 2021</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        On Independence Day, Live 4 Help Foundation team distributed old clothes collected from friends and family to approximately <strong>30</strong> underprivileged families. Beneficiaries are daily wagers living in roadside tent in Dwarka Sub city, New Delhi. This is a small endeavour through our NGO. We will continue to do such drives in future with support from well-wishers and like-minded people.
                      </p>
                    </div>
                  </Card>

                  {/* Drive 5 */}
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between md:col-span-1 lg:col-span-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">5. Charity Begin – Blanket Distribution</h4>
                      </div>
                      <span className="text-[10px] font-semibold text-foreground/50">Held on Sankranti Day, <strong>14<sup>th</sup> January, 2021</strong></span>
                      <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                        Live 4 Help Foundation performed a special puja on <strong>14<sup>th</sup> Jan’21</strong>, Sankranti Day to begin our journey towards services and to kickstart the activities outlined in the objectives. We have distributed blankets to <strong>20</strong> daily wagers of Sec 19B DDA Park, Dwarka, New Delhi to provide a little comfort during peak winter.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Gallery Snapshots Image */}
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-xs text-foreground/50 font-semibold align-self-start">Here are a few snapshots of photograph of our earlier distributions.</p>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative max-w-4xl mx-auto">
                    <img referrerPolicy="no-referrer"
                      src="/focus/Cloth-Distribution-Photo-3.jpg"
                      alt="Relief Work & Blanket Distribution Campaigns"
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
          <section className="py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 bg-[#ECE0F0] rounded-[3rem] py-8 px-4 md:py-12 md:px-8 border border-foreground/5 w-full text-left">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-4 max-w-2xl text-left">
                  <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Journal</span>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground">Latest Education Activities & Updates</h3>
                  <p className="text-xs sm:text-sm text-foreground/70">
                    Explore detailed reports and updates from our education campaigns and student milestones.
                  </p>
                </div>
                <Link href="/blog?category=education">
                  <button className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-semibold text-foreground bg-primary shadow-soft transition-premium cursor-pointer">
                    View All News
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogsList.length > 0 ? (
                  blogsList.map((blog, idx) => {
                    const blogDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : (blog.date || 'June 1, 2026')

                    const images = blog.images || []
                    const coverImage = images.length > 0 ? (images[0] === '/logo/logo.jpg' && images.length > 1 ? images[1] : images[0]) : null
                    const isVid = coverImage && coverImage.toLowerCase().match(/\.(mp4|webm|mov|avi|mkv)$/i)
                    const title = blog.title && blog.title !== 'BLOG' ? blog.title : (blog.subheadings?.[0]?.text || 'Blog Post')
                    const categoryName = blog.category?.name || blog.category || 'Education'
                    const readTime = blog.readTime || 3
                    const excerpt = blog.excerpt || (blog.paragraphs && blog.paragraphs[0]) || 'No description available.'

                    return (
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        key={blog.slug}
                        className="group flex flex-col justify-between rounded-[2.5rem] bg-white shadow-soft border border-[#C8B4D4] min-h-[450px] hover:-translate-y-2 hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300 overflow-hidden pb-6 relative text-left"
                      >
                        <div className="flex flex-col flex-1">
                          {/* Image / Video */}
                          {coverImage ? (
                            <div className="relative aspect-[4/3] w-full rounded-b-2xl overflow-hidden shadow-inner shrink-0 bg-slate-900">
                              {isVid ? (
                                <video src={coverImage} muted className="w-full h-full object-cover group-hover:scale-105 transition-premium" />
                              ) : (
                                <img
                                  referrerPolicy="no-referrer"
                                  src={coverImage}
                                  alt={title}
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
                                {title}
                              </h4>
                              <p className="text-[11px] text-foreground/70 leading-relaxed line-clamp-3">
                                {excerpt}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 mt-4">
                          <Link href={`/blog/${blog.slug}`} className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-foreground group/btn w-fit">
                            Read full story
                            <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.article>
                    )
                  })
                ) : (
                  <div className="col-span-3 text-center text-xs text-foreground/60 py-6">
                    No education updates found.
                  </div>
                )}
              </div>
            </div>
          </section>

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
          <section className="py-8 px-6 md:px-12 pb-16">
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
