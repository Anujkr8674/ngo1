"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  HeartHandshake, 
  Leaf, 
  MapPin, 
  Activity,
  Award,
  UserCheck,
  CheckCircle2,
  Quote,
  Users
} from "lucide-react";
import Counter from "../components/Counter";
import { Card, MotionCard } from "../components/Card";

export default function Impact() {
  const [activeTab, setActiveTab] = useState<"education" | "healthcare" | "environment" | "relief">("education");

  const statCards = [
    { label: "Students Sponsored", count: 34, suffix: "", desc: "Across 7 states in India, with 65% girl students.", icon: <GraduationCap className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Healthcare Beneficiaries", count: 397, suffix: "+", desc: "Diagnostics and cancer screenings in rural villages.", icon: <HeartHandshake className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Mangrove Saplings", count: 4000, suffix: "+", desc: "Saplings planted & fenced in coastal Sundarbans.", icon: <Leaf className="w-5 h-5 text-foreground" />, color: "" },
    { label: "Relief Material Delivered", count: 480, suffix: "+", desc: "Families served with heavy winter protection blankets.", icon: <Activity className="w-5 h-5 text-foreground" />, color: "" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
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
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((card, i) => (
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={card.label}
              className="p-8 rounded-[2.5rem] border border-[#EEB898] flex flex-col gap-6 shadow-soft"
            >
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                {card.icon}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground/60">{card.label}</span>
                <span className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                  <Counter end={card.count} suffix={card.suffix} />
                </span>
                <p className="text-xs text-foreground/60 leading-relaxed mt-2">{card.desc}</p>
              </div>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-8 px-6 md:px-12 bg-white pb-16">
        <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-foreground/5 p-1 max-w-3xl mx-auto w-full">
            {(["education", "healthcare", "environment", "relief"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-premium cursor-pointer ${
                  activeTab === tab 
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
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-8 flex flex-col gap-8">
                  {/* Overview */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display font-bold text-3xl text-foreground">Underprivileged Student Sponsoring (USS)</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Education is the key to unlock the golden door of freedom. The main objective of L4H Foundation under the Education domain is to support needy students who are at risk of discontinuing their education due to financial hardship. 
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      L4H Foundation has started this journey since its inception with 1 needy student in West Bengal in June 2021. Today, cumulative 34 needy students from seven states of India (Delhi, West Bengal, Orissa, Uttarakhand, Uttar Pradesh, Jharkhand, Bihar) are supported under the USS scheme. Out of total students, 65% (22) are girl students.
                    </p>
                  </div>

                  {/* Split Cards: Support Scope & Guidelines */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">What We Support</h4>
                      </div>
                      <p className="text-xs text-foreground/75 leading-relaxed">
                        The support under the USS scheme covers semester and school fees, purchasing books/stationery, tuition fees, and transportation to ensure students do not drop out. Further, online/offline coaching, guidance, counselling, and where necessary, health check-ups and medicines are arranged.
                      </p>
                    </Card>
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex flex-col gap-4 bg-white">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#DD6B20]" />
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Selection Guidelines</h4>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                        <li>Needy and meritorious student.</li>
                        <li>Preference given to children with a single parent or no parents.</li>
                        <li>Preference given to girl students.</li>
                        <li>Preference given to students below Class IX.</li>
                      </ul>
                    </Card>
                  </div>

                  {/* Core Education Team */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                      <Users className="w-6 h-6 text-secondary" />
                      <div>
                        <h4 className="font-display font-bold text-lg text-foreground">Core Education Domain Team</h4>
                        <p className="text-xs text-foreground/50">Core team members running the education sector with extensive experience</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Dr. Ramkrishna Sadhukhan</strong>
                        <span className="text-foreground/60 text-[11px]">Retired Deputy Director, Delhi University</span>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Mr. Debashish Das</strong>
                        <span className="text-foreground/60 text-[11px]">Retired Joint Director, CSIR-NIScPR, Delhi</span>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Mr. Bibekananda Maiti</strong>
                        <span className="text-foreground/60 text-[11px]">Retired Dy. Controller General, Patents, Design & Trademarks, Govt. of India</span>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Mr. Subhabrata Chakraborti</strong>
                        <span className="text-foreground/60 text-[11px]">Ex-Principal Director, CDAC</span>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Dr. Subhendu Shekhar Mal</strong>
                        <span className="text-foreground/60 text-[11px]">Scientist, Jadavpur University</span>
                      </div>
                      <div className="p-3 rounded-xl hover:bg-foreground/5 transition-colors">
                        <strong className="text-foreground text-sm block">Mr. Tarun Kanti Maiti</strong>
                        <span className="text-foreground/60 text-[11px]">Social Worker & IT Professional</span>
                      </div>
                    </div>
                  </Card>

                  {/* Achievements */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                    <h4 className="font-display font-bold text-lg text-foreground">Student Achievements (2023)</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                      <li><strong>IIT Selection:</strong> 1 student selected for M.Sc. Physics at IIT Chennai.</li>
                      <li><strong>Employment:</strong> 3 students successfully joined in Indian Post.</li>
                      <li><strong>Class 12th Board:</strong> 1 student passed with 90% plus marks.</li>
                      <li><strong>Class 12th Board:</strong> 2 students passed with 80% plus marks.</li>
                      <li><strong>Secondary:</strong> 1 student in 8th standard secured 92% marks.</li>
                    </ul>
                  </Card>

                  {/* Success Stories Grid */}
                  <div className="flex flex-col gap-6">
                    <h4 className="font-display font-bold text-2xl text-foreground">Notable USS Success Stories</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-foreground/5 group-hover:scale-110 transition-transform">
                          <Quote className="w-16 h-16 transform rotate-180" />
                        </div>
                        <div className="flex flex-col gap-3 z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Geography Master's Student</span>
                          <h5 className="font-display font-bold text-lg text-foreground">Suvankari Mondal</h5>
                          <p className="text-xs text-foreground/70 leading-relaxed">
                            From a remote village of Paschim Medinipur, West Bengal. Today she is pursuing Master’s in Geography from Midnapore College (Autonomous). L4H Foundation has sponsored her since graduation.
                          </p>
                        </div>
                        <blockquote className="border-l-2 border-secondary pl-3 text-xs italic text-foreground/60 mt-4 leading-normal">
                          "Today whatever I am, it is because of Live 4 Help Foundation."
                        </blockquote>
                      </Card>

                      <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-foreground/5 group-hover:scale-110 transition-transform">
                          <Quote className="w-16 h-16 transform rotate-180" />
                        </div>
                        <div className="flex flex-col gap-3 z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Delhi University Graduate</span>
                          <h5 className="font-display font-bold text-lg text-foreground">Shweta Singh</h5>
                          <p className="text-xs text-foreground/70 leading-relaxed">
                            Today she is pursuing graduation in Delhi University. Sponsoring her in peak winter when she was about to drop out due to a complete lack of support and financial means.
                          </p>
                        </div>
                        <blockquote className="border-l-2 border-secondary pl-3 text-xs italic text-foreground/60 mt-4 leading-normal">
                          "L4H sponsored me and today I am confidently continuing my studies."
                        </blockquote>
                      </Card>

                      <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-foreground/5 group-hover:scale-110 transition-transform">
                          <Quote className="w-16 h-16 transform rotate-180" />
                        </div>
                        <div className="flex flex-col gap-3 z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">M.Sc. Physics at IIT Chennai</span>
                          <h5 className="font-display font-bold text-lg text-foreground">Subham Pandey</h5>
                          <p className="text-xs text-foreground/70 leading-relaxed">
                            Hailing from a very remote village in Bankura district, West Bengal. Today he is doing his M.Sc. in Physics at the prestigious IIT Chennai, with L4H supporting his research and educational expenses.
                          </p>
                        </div>
                        <blockquote className="border-l-2 border-secondary pl-3 text-xs italic text-foreground/60 mt-4 leading-normal">
                          "Sponsoring this bright mind is a privilege for our foundation."
                        </blockquote>
                      </Card>

                      <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4 justify-between relative overflow-hidden group">
                        <div className="absolute top-4 right-4 text-foreground/5 group-hover:scale-110 transition-transform">
                          <Quote className="w-16 h-16 transform rotate-180" />
                        </div>
                        <div className="flex flex-col gap-3 z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">Graduation Student</span>
                          <h5 className="font-display font-bold text-lg text-foreground">Anjali Kisku</h5>
                          <p className="text-xs text-foreground/70 leading-relaxed">
                            From a tribal village in Paschim Medinipur where girls rarely have the chance to go to college. L4H is sponsoring her graduation studies.
                          </p>
                        </div>
                        <blockquote className="border-l-2 border-secondary pl-3 text-xs italic text-foreground/60 mt-4 leading-normal">
                          "L4H Foundation has given wings to my dreams."
                        </blockquote>
                      </Card>
                    </div>
                  </div>

                  {/* Offline Coaching */}
                  <Card className="p-6 md:p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white flex flex-col gap-4">
                    <h4 className="font-display font-bold text-xl text-foreground">Free Offline Coaching Center Pilot Project</h4>
                    <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                      L4H Foundation launched a pilot project by selecting a village in Paschim Medinipur district of West Bengal to provide free offline coaching to 10 needy students who can't afford tuition fees. By engaging a local volunteer, we ensure they get regular academic support and mentoring. We have also sourced electronic gadgets to enable online mentoring and counseling sessions.
                    </p>
                  </Card>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft bg-white">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-secondary" />
                      Sponsoring States (7)
                    </h4>
                    <ul className="flex flex-col gap-3 text-sm text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Delhi / NCR</span> <span className="font-semibold text-foreground">Urban Outreach</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>West Bengal</span> <span className="font-semibold text-foreground">Rural & Tribal</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Bihar & Jharkhand</span> <span className="font-semibold text-foreground">Academic Sponsoring</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Uttar Pradesh</span> <span className="font-semibold text-foreground">Tuition Sponsoring</span></li>
                      <li className="flex justify-between pb-1"><span>Uttarakhand & Odisha</span> <span className="font-semibold text-foreground">Secondary Education</span></li>
                    </ul>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2026/02/Students.png"
                      alt="Student Sponsoring Campaign"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "healthcare" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Clinical Diagnostic & Health Camps</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Live 4 Help Foundation organizes comprehensive medical camps in remote villages to provide free diagnostics, primary health check-ups, and cancer screenings to underprivileged people who otherwise lack access to clinical tests.
                  </p>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-display bg-white border border-foreground/5 shadow-soft">1</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">March 26, 2022 (Daspur, Paschim Medinipur, WB)</span>
                        <span className="text-xs text-foreground/60 leading-relaxed">
                          102 adults benefited with free Thyrocare blood sample profiles (Hemogram, Thyroid, Lipid, Kidney/Liver functions, Blood Sugar) and cancer screenings (PSA/Ca125), supported by Erbe CSR.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-display bg-white border border-foreground/5 shadow-soft">2</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">December 28, 2022 (Hingalganj, Sundarbans Border, WB)</span>
                        <span className="text-xs text-foreground/60 leading-relaxed">
                          125 rural residents supported with extensive diagnostic screening test profiles, providing critical health checkups in remote delta villages, funded by Erbe CSR.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-display bg-white border border-foreground/5 shadow-soft">3</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">December 29, 2023 (Bankra MSK School, Sundarbans)</span>
                        <span className="text-xs text-foreground/60 leading-relaxed">
                          170 beneficiaries benefited with free clinical blood profiles and consulting sessions from 5 specialized doctors, supported through Erbe Medical India CSR.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Cancer Awareness Campaigns
                    </h4>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                      We focus on removing the fear and stigma associated with breast, cervical, and oral cancer in rural districts to enable early detection.
                    </p>
                    <div className="p-4 rounded-xl border border-white/50 text-xs text-foreground/80 leading-relaxed flex flex-col gap-2">
                      <div>
                        <strong>Facilitated By:</strong> Dr. Shyamsundar Mondal (retired ex. HOD, Department of Epidemiology & Biostatistics at Chittaranjan National Cancer Institute, Kolkata).
                      </div>
                      <div>
                        <strong>Outreach:</strong> Sponsoring breast self-examination simulator models using patron donations to run physical screening classes for rural women and school children.
                      </div>
                    </div>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2022/04/L4H-Medical-Camp-Photo-1.jpg"
                      alt="Healthcare Camp Campaign"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "environment" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Sundarbans Mangrove Buffer Zones</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sundarbans delta region is extremely vulnerable to severe cyclone erosion (such as Amphan and Yaas). To check soil erosion, protect coastal borders, and provide natural storm surge barriers, we lead community-led mangrove plantation programs.
                  </p>
                  <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] flex flex-col gap-4 shadow-soft">
                    <span className="font-semibold text-sm text-foreground">Plantation and Survival Care:</span>
                    <ul className="list-disc pl-5 text-xs text-foreground/70 flex flex-col gap-2 leading-relaxed">
                      <li>Planted approximately 4,000 mangrove saplings across three plantation drives (November 2, 2021, January 26, 2022, and December 30, 2023).</li>
                      <li>Cultivated resilient local species including Sundari, Bain, Kakra, Garjan, Golpata, and Dhuldhul.</li>
                      <li>Post-plantation maintenance: Sourced local bamboo and nets to build extensive fences, guarding the saplings against cattle. We maintain the plantation for 3 years to ensure long-term sustainability.</li>
                      <li>The saplings have shown excellent growth, reaching an average height of 8 to 12 feet.</li>
                    </ul>
                  </Card>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-secondary" />
                      Key Plantation Drives
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>First Drive (Nov 2021)</span> <span className="font-semibold text-foreground">1000+ Saplings</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Second Drive (Jan 2022)</span> <span className="font-semibold text-foreground">2000+ Saplings</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Third Drive (Dec 2023)</span> <span className="font-semibold text-foreground">1000+ Saplings</span></li>
                      <li className="flex justify-between pb-1"><span>CSR Partner</span> <span className="font-semibold text-foreground">ABS Professional India</span></li>
                    </ul>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
                      alt="Sundarban Mangrove Plantation Campaign"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "relief" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Winter Relief & Other Social Works</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    In response to seasonal hardships, Live 4 Help Foundation coordinates annual blanket distribution campaigns to protect daily wagers, construction workers, and daily wage labor families from severe cold waves.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-sm text-foreground mb-3">Key Blanket Distribution Drives (480 total)</h4>
                      <ul className="flex flex-col gap-2.5 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                        <li><strong>December 29, 2023:</strong> Distributed 160 heavy blankets to rural villagers in North 24 Parganas, West Bengal.</li>
                        <li><strong>January 15, 2023:</strong> Sourced and delivered 100 blankets to construction daily laborers at Government Boys Senior Secondary School, Jharoda Kalan, New Delhi.</li>
                        <li><strong>December 27, 2022:</strong> Distributed 200 winter blankets across the vulnerable rural Sundarbans delta stretches.</li>
                        <li><strong>January 14, 2021:</strong> Distributed 20 blankets to daily wage park laborers at Sec 19B DDA Park, Dwarka, New Delhi.</li>
                      </ul>
                    </Card>

                    <Card className="p-6 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-sm text-foreground mb-2">Dwarka Clothes Distribution Drive</h4>
                      <p className="text-xs text-foreground/75 leading-relaxed">
                        On August 15, 2021, L4H volunteers distributed wearable old clothes to approximately 30 daily wager families living in roadside tents near Dwarka Sector 19, New Delhi.
                      </p>
                    </Card>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-primary" />
                      Relief Outreach Summary
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Total Blankets</span> <span className="font-semibold text-foreground">480 Blankets</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Primary Recipients</span> <span className="font-semibold text-foreground">Migrant Labor & Villagers</span></li>
                      <li className="flex justify-between pb-1"><span>Locations Served</span> <span className="font-semibold text-foreground">Delhi NCR & West Bengal</span></li>
                    </ul>
                  </Card>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg"
                      alt="Relief Work & Blanket Distribution"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
