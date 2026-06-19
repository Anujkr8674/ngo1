"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Star, BookOpen, HeartPulse, ShieldAlert, Compass } from "lucide-react";
import teamData from "../data/team.json";

export default function About() {
  const founders = teamData.filter(m => m.role === "Founder");
  const advisors = teamData.filter(m => m.role.includes("Advisor"));

  const milestones = [
    { year: "Oct 2020", title: "NGO Inception", desc: "Live 4 Help Foundation registered under the Ministry of Corporate Affairs, Gov of India. Began with individual feuding of fees and rations." },
    { year: "June 2021", title: "First Student Sponsored", desc: "Sponsorship of a single underprivileged student launched our long-term education support program." },
    { year: "Jan 2022", title: "Sundarban Mangrove Initiative", desc: "Launched coastal restoration project planting over 3000 mangrove saplings with ABS Professional India's CSR support." },
    { year: "March 2022", title: "First Rural Medical Camp", desc: "Diagnosed 125 village patients in Paschim Medinipur in collaboration with Erbe Medical India & Thyrocare." },
    { year: "Dec 2023", title: "3rd Medical Camp", desc: "Reached 170+ beneficiaries in Sundarbans and launched cancer awareness screenings using advanced simulator blocks." },
    { year: "April 2026", title: "100+ Cumulative Students", desc: "Surpassed the milestone of supporting 100+ students across 11 states of India, proving sustained long-term commitment." }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/01/PHOTO-2019-08-18-10-59-21.jpg"
            alt="About Live 4 Help Foundation Hero"
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
              Who We Are
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Redefining Community Support
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl"
            >
              We are a registered non-profit organization dedicated to bridging the gap between individuals seeking help and patrons willing to extend their support.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 md:px-12 py-16 bg-white/40 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">How We Started</h2>
            <p className="text-foreground/85 leading-relaxed text-sm md:text-base">
              Like others we were engaged individually in social services by sponsoring annual school fees for deserving students and distributing rations to a few needy families. 
            </p>
            <p className="text-foreground/80 leading-relaxed text-sm">
              As we realized the depth of the challenges faced by children and elderly citizens, we formalised our efforts in 2020 under the Ministry of Corporate Affairs. By focusing strictly on Education, Environment (Plantation), and Healthcare, we created a channel to coordinate community-level assistance with transparent auditing, accountability, and direct human connection.
            </p>
          </div>
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-premium border border-white bg-foreground/5">
            <img referrerPolicy="no-referrer"
              src="https://live4help.org/wp-content/uploads/2021/01/PHOTO-2019-08-18-10-59-21.jpg"
              alt="Live 4 Help Foundation early journey"
              
              className="w-full h-full object-cover absolute inset-0 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="px-6 md:px-12 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-premium border border-white flex flex-col gap-6 hover:-translate-y-2 hover:border-primary transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground">Our Vision</h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              To provide help, bring smiles and the joy of happiness to underprivileged and needy people so that they can live a happy, secure, and healthy life.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-premium border border-white flex flex-col gap-6 hover:-translate-y-2 hover:border-primary transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground">Our Mission</h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              To identify people who are seeking help for different needs and coordinate with patrons willing to extend their assistance, thereby bridging the gap.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-premium border border-white flex flex-col gap-6 hover:-translate-y-2 hover:border-primary transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground">Our Values</h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Selfless service with honesty, integrity, complete transparency, and accountability. We ensure every rupee donated reaches the beneficiary directly.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="px-6 md:px-12 py-20 bg-white/30 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Milestones</span>
            <h3 className="font-display font-bold text-4xl text-foreground">Our Journey Timeline</h3>
          </div>

          <div className="relative max-w-5xl mx-auto w-full px-2 md:px-0">
            {/* Center Line */}
            <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-1.5 bg-foreground/15 transform md:-translate-x-1/2 rounded-full" />
            
            <div className="flex flex-col gap-12 md:gap-16">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={m.year} className="relative flex flex-col md:flex-row items-center w-full">
                    
                    {/* Empty half for desktop to push card to the correct side */}
                    <div className={`hidden md:block w-1/2 ${isLeft ? 'order-3' : 'order-1'}`} />
                    
                    {/* Step No / Dot in the Middle */}
                    <div className="absolute left-7 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-white shadow-[0_0_0_6px_var(--bg-white,white)] z-10 md:order-2">
                      <span className="text-xs font-bold tracking-tight">{i + 1}</span>
                    </div>

                    {/* Card Content */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-16 order-1' : 'md:pl-16 order-3'} flex`}>
                      <div className="w-full relative p-6 md:p-8 rounded-3xl bg-white shadow-premium border border-foreground/5 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-4">
                        
                        {/* Little triangle pointer (hidden on mobile) */}
                        <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border border-foreground/5 rotate-45 ${isLeft ? '-right-2 border-l-0 border-b-0' : '-left-2 border-r-0 border-t-0'}`} />
                        
                        <span className="text-xs font-bold px-3 py-1.5 bg-foreground/10 rounded-full text-foreground w-fit flex items-center gap-1.5 font-sans tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          {m.year}
                        </span>
                        <h4 className="font-display font-bold text-xl md:text-2xl text-foreground leading-snug">{m.title}</h4>
                        <p className="text-sm text-foreground/75 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="px-6 md:px-12 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Leadership</span>
            <h3 className="font-display font-bold text-4xl text-foreground">Our Founders</h3>
            <p className="text-foreground/70">
              Meet the founding members who shaped the vision of Live 4 Help Foundation.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {founders.map((founder, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                key={founder.name}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-[2.5rem] bg-white/80 backdrop-blur-md border border-white shadow-premium ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`lg:col-span-4 relative aspect-square w-full max-w-[280px] mx-auto rounded-3xl overflow-hidden shadow-soft border-2 border-white shrink-0 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}>
                  <img referrerPolicy="no-referrer"
                    src={founder.image}
                    alt={founder.name}
                    
                    className="w-full h-full object-cover absolute inset-0 object-cover"
                  />
                </div>
                <div className="lg:col-span-8 flex flex-col gap-4">
                  <h4 className="font-display font-bold text-2xl md:text-3xl text-foreground">{founder.name}</h4>
                  <span className="text-xs uppercase tracking-widest font-bold text-foreground/80 bg-foreground/5 px-3 py-1.5 rounded-full w-fit">{founder.role}</span>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                    {founder.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory & Operations Team */}
      <section className="px-6 md:px-12 py-24 bg-white/40 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60">Guidance</span>
            <h3 className="font-display font-bold text-4xl text-foreground">Governing Body & Advisors</h3>
            <p className="text-foreground/70">
              Our initiatives are backed and mentored by a group of highly qualified experts from oil, biotechnology, biostatistics, business development, and education sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((adv) => (
              <div key={adv.name} className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white shadow-soft flex flex-col gap-6 hover:shadow-premium hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white shadow-inner bg-foreground/5">
                    <img referrerPolicy="no-referrer"
                      src={adv.image}
                      alt={adv.name}
                      
                      
                      className="w-full h-full object-cover absolute inset-0 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-display font-bold text-lg text-foreground leading-snug">{adv.name}</h4>
                    <span className="text-xs text-foreground/60">{adv.role}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
