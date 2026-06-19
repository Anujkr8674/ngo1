"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  HeartHandshake, 
  Leaf, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Building,
  Activity,
  Award
} from "lucide-react";
import Counter from "../components/Counter";

export default function Impact() {
  const [activeTab, setActiveTab] = useState<"education" | "healthcare" | "environment">("education");

  const statCards = [
    { label: "Students Supported", count: 100, suffix: "+", desc: "Providing fees & supplies across 11 states of India.", icon: <GraduationCap className="w-5 h-5 text-foreground" />, color: "bg-primary/20" },
    { label: "Clinical Beneficiaries", count: 397, suffix: "", desc: "Diagnostics and cancer screenings in rural villages.", icon: <HeartHandshake className="w-5 h-5 text-foreground" />, color: "bg-secondary/20" },
    { label: "Mangrove Saplings", count: 3000, suffix: "+", desc: "Saplings planted & fenced in coastal Sundarbans.", icon: <Leaf className="w-5 h-5 text-foreground" />, color: "bg-accent/30" },
    { label: "Winter Protection", count: 460, suffix: "+", desc: "Blankets distributed to construction workers & families.", icon: <Activity className="w-5 h-5 text-foreground" />, color: "bg-foreground/5" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Impact Metrics Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-xs uppercase tracking-widest text-white/70 shadow-soft font-semibold"
            >
              <Award className="w-3.5 h-3.5 text-secondary" />
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
              className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl"
            >
              We translate every donation and resource directly into local, verified actions. Explore our core statistics, distributions, and field reports.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grid Dashboard */}
      <section className="px-6 md:px-12 py-12 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={card.label}
              className="p-8 rounded-3xl glass-panel border border-white shadow-soft flex flex-col gap-6 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="px-6 md:px-12 py-16 bg-white/30 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Tab Selector */}
          <div className="flex justify-center border-b border-foreground/5 p-1 max-w-md mx-auto w-full">
            {(["education", "healthcare", "environment"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider rounded-2xl transition-premium cursor-pointer ${
                  activeTab === tab 
                    ? "bg-white text-foreground shadow-soft border border-foreground/5" 
                    : "text-foreground/65 hover:text-foreground hover:bg-foreground/5"
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
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Sustained Educational Sponsoring</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Live 4 Help Foundation identifies deserving students based on academic credentials and household economic hardships. Our commitment is long-term, renewed year after year to ensure students finish their course journeys.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="p-5 rounded-2xl glass-panel border border-white hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/60 mb-2">IIT Chennai Sponsoring</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Supporting student Mr. Subham Pandey pursuing M.Sc. Physics at IIT Chennai, providing tuition & research support.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl glass-panel border border-white hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/60 mb-2">Tribal Village Sponsoring</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Funding 5 girl students (Anjali, Sila, Mukhimoni, Rupali, Sonali) in Bankura District tribal villages.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl glass-panel border border-white/80 shadow-soft hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-secondary" />
                      Major Sponsoring States
                    </h4>
                    <ul className="flex flex-col gap-3 text-sm text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Delhi / NCR</span> <span className="font-semibold text-foreground">Urban Outreach</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>West Bengal</span> <span className="font-semibold text-foreground">Rural & Tribal</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Bihar</span> <span className="font-semibold text-foreground">Academic Sponsoring</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Uttar Pradesh</span> <span className="font-semibold text-foreground">Tuition Sponsoring</span></li>
                      <li className="flex justify-between pb-1"><span>Uttarakhand & Odisha</span> <span className="font-semibold text-foreground">Secondary Education</span></li>
                    </ul>
                  </div>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden bg-foreground/5 border border-white shadow-soft relative">
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
                  <h3 className="font-display font-bold text-3xl text-foreground">Clinical Diagnostic Camps</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    By partnering with CSR sponsors like Erbe Medical India, we coordinate comprehensive clinical diagnostic camps and breast cancer screening drives in rural and remote regions.
                  </p>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-xs font-bold font-display">1</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">March 2022 camp (Daspur, Paschim Medinipur)</span>
                        <span className="text-xs text-foreground/60">125 beneficiaries, blood sample tests with Thyrocare diagnostics.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-xs font-bold font-display">2</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">December 2023 camp (Sundarbans Delta)</span>
                        <span className="text-xs text-foreground/60">170 adults benefited with vital clinical diagnostics.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-xs font-bold font-display">3</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">March 2026 camp (Ashapur Tea Garden, Naxalbari)</span>
                        <span className="text-xs text-foreground/60">205 tea labor beneficiaries supported under Dr. Manorajan Mandal.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl glass-panel border border-white/80 shadow-soft hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Awareness Campaigns
                    </h4>
                    <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                      We focus heavily on removing the stigma of breast cancer in rural areas. The foundation procured a <strong>Breast Examination Simulator</strong> using patron donations.
                    </p>
                    <div className="p-4 rounded-xl bg-accent/20 border border-white/50 text-xs text-foreground/80 leading-normal">
                      <strong>Objective:</strong> Removing stigma, recognizing early signs of cancer, and teaching self-examination techniques.
                    </div>
                  </div>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden bg-foreground/5 border border-white shadow-soft relative">
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
                  <h3 className="font-display font-bold text-3xl text-foreground">Sundarban Mangrove Buffer Zones</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Sundarban regions are vulnerable to recurrent severe cyclones (like Amphan and Yaas). To check coastal erosion and provide storm surge buffers, we coordinate mangrove plantation programs.
                  </p>
                  <div className="p-6 rounded-2xl glass-panel border border-white flex flex-col gap-4 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                    <span className="font-semibold text-sm text-foreground">Sustained Survival Methods:</span>
                    <ul className="list-disc pl-5 text-xs text-foreground/70 flex flex-col gap-2">
                      <li>Planting indigenous resilient species: Sundari, Bain, Kakra, Garjan, Golpata, and Dhuldhul.</li>
                      <li>Post-plantation care: Installing protective bamboo/net fencing around the plantation zones to buffer from cattle.</li>
                      <li>CSR partnership with M/s ABS Professional India Pvt Ltd under their sustainability campaign.</li>
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="p-8 rounded-3xl glass-panel border border-white/80 shadow-soft hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-secondary" />
                      Key Milestones
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs text-foreground/75">
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>2021 & 2022 Campaigns</span> <span className="font-semibold text-foreground">3000+ Saplings</span></li>
                      <li className="flex justify-between border-b border-foreground/5 pb-2"><span>Fencing Protection</span> <span className="font-semibold text-foreground">100% Audited</span></li>
                      <li className="flex justify-between pb-1"><span>Community coordination</span> <span className="font-semibold text-foreground">Folk singer Saurav Moni</span></li>
                    </ul>
                  </div>
                  <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden bg-foreground/5 border border-white shadow-soft relative">
                    <img referrerPolicy="no-referrer"
                      src="https://live4help.org/wp-content/uploads/2022/02/Live-4-Help-Mangrove-Plantation-26th-Jan22_Photo-39.jpg"
                      alt="Sundarban Mangrove Plantation Campaign"
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
