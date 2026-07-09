"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  HeartHandshake, 
  Leaf, 
  MapPin, 
  UserCheck, 
  Building,
  Activity,
  Award
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
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display font-bold text-3xl text-foreground">Sustained Educational Sponsoring</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Live 4 Help Foundation identifies deserving students based on academic credentials and household economic hardships. Our commitment is long-term, renewed year after year to ensure students finish their course journeys. From supporting 1 student in June 2021, we now sponsor 34 students in total across 7 states, of which 65% (22) are girl students.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <Card className="p-5 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/60 mb-2">IIT Chennai Sponsoring</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Supporting student Mr. Subham Pandey pursuing M.Sc. Physics at IIT Chennai, providing tuition & research support.
                      </p>
                    </Card>
                    <Card className="p-5 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/60 mb-2">Tribal Village Sponsoring</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        Funding 5 girl students (Anjali, Sila, Mukhimoni, Rupali, Sonali) in Bankura District tribal villages.
                      </p>
                    </Card>
                  </div>
                  
                  <div className="p-6 rounded-[2rem] bg-white border border-[#C1D6C1] shadow-soft flex flex-col gap-3">
                    <h4 className="font-display font-bold text-sm text-foreground">Key Student Achievements (2023)</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/75 list-disc pl-5">
                      <li>1 student selected for M.Sc at IIT Chennai</li>
                      <li>3 students successfully joined Indian Post</li>
                      <li>1 student passed 12th Board with 90%+ marks</li>
                      <li>2 students passed 12th Board with 80%+ marks</li>
                      <li>1 student in 8th standard secured 92% marks</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-[#FFE6D4] border border-[#EEB898] shadow-soft flex flex-col gap-2">
                    <h4 className="font-display font-bold text-sm text-[#DD6B20]">Sponsoring Selection Guidelines</h4>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      Deserving students must meet academic criteria and prove household financial distress. Preference is given to meritorious students facing dropout risk, single-parent/orphan children, girl students, and students below class IX.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card className="p-8 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft">
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
