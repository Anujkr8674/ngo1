"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, HeartHandshake, ShieldAlert, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetHelpPortal() {
  const supportPrograms = [
    {
      id: "education",
      title: "Education Support Form",
      desc: "For underprivileged students seeking sponsorship for tuition, admission fees, books, and stationery.",
      link: "/get-help/education",
      icon: <GraduationCap className="w-8 h-8 text-[#6B46C1]" />,
      bgColor: "bg-gradient-to-br from-[#F5F2FC] to-[#E9E3F8]",
      borderColor: "border-[#CBB6F5]",
      accentColor: "#6B46C1"
    },
    {
      id: "elderly",
      title: "Elderly Support Form",
      desc: "For senior citizens requesting regular companionship, digital services training, doctor visits, or delivery help.",
      link: "/get-help/elderly",
      icon: <ShieldAlert className="w-8 h-8 text-[#DD6B20]" />,
      bgColor: "bg-gradient-to-br from-[#FFF6ED] to-[#FFEAD6]",
      borderColor: "border-[#EEB898]",
      accentColor: "#DD6B20"
    },
    {
      id: "medical",
      title: "Medical Support Form",
      desc: "For clinical diagnostics testing support, medicine procurement, or doctor checkup consultations.",
      link: "/get-help/medical",
      icon: <HeartHandshake className="w-8 h-8 text-[#3182CE]" />,
      bgColor: "bg-gradient-to-br from-[#EBF8FF] to-[#DBF0FF]",
      borderColor: "border-[#B8C5D6]",
      accentColor: "#3182CE"
    },
    {
      id: "eachother",
      title: "Help Each Other Form",
      desc: "Submit peer-to-peer requests for food supplies, blankets, clothes, books, or blood donation requirements.",
      link: "/get-help/each-other",
      icon: <Compass className="w-8 h-8 text-[#319795]" />,
      bgColor: "bg-gradient-to-br from-[#E6FFFA] to-[#D2F9F1]",
      borderColor: "border-[#A5DDD0]",
      accentColor: "#319795"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-sans text-foreground">
      {/* Hero Header */}
      <section className="relative min-h-[90vh] px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Support Portal Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative mt-12">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <HeartHandshake className="w-4 h-4 text-[#444444]" />
              Support Portal
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Get Help & Support
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Complete the respective application flow below to request support. Our operations team and coordinators will review the details.
            </p>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full pb-32">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-foreground/10 shadow-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Info Text */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-foreground/80 font-sans leading-relaxed">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-[#CBB6F5] after:mt-3">
                Application Information
              </h2>
              <p className="text-sm sm:text-base text-foreground/75">
                Live 4 Help Foundation developed various forms keeping in mind the specific needs. The person who wants to avail any help/support from our foundation are required to select and submit the form online /offline accordingly. Upon receipt of request form, Live 4 Help Foundation will review, verify physically as required, and decide further for their eligibility and the extent of support to be provided.
              </p>
              <div className="p-6 rounded-[2rem] bg-[#FFE6D4] border border-[#EEB898] text-foreground/90 shadow-soft">
                <h4 className="font-bold text-[#DD6B20] text-base mb-2">Volunteers, Members or Well-wishers</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/75">
                  Can also fill the form on the behalf of needy student or person provided that he or she fully realize the need of concerned in line with our missions. Our objective is to help those who are struggling to fulfil their need and like to live a decent life.
                </p>
              </div>
              <p className="text-sm sm:text-base text-foreground/75">
                The form can be submitted online or can be downloaded from our website. Please send duly filled offline form through e-mail (<a href="mailto:support@live4help.org" className="text-blue-600 hover:underline font-semibold">support@live4help.org</a>) or by post in our Office Address.
              </p>
              <div className="mt-4 pt-6 border-t border-foreground/10 flex flex-col gap-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-foreground/50">Office Address</h4>
                <address className="not-italic text-sm text-foreground/70 leading-relaxed">
                  <strong className="text-foreground font-semibold">LIVE 4 HELP FOUNDATION</strong><br />
                  C-504, Sea Show CGHS Ltd.<br />
                  Plot No. 14, Sector -19B, Dwarka,<br />
                  New Delhi -110075
                </address>
              </div>
            </div>

            {/* Right Column: Support Forms Grid */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-display font-bold text-foreground mb-8 block lg:hidden relative after:content-[''] after:block after:w-12 after:h-1 after:bg-[#CBB6F5] after:mt-3">
                Support Programs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {supportPrograms.map((program, idx) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className={`rounded-[2.5rem] border ${program.bgColor} ${program.borderColor} p-6 flex flex-col justify-between shadow-soft hover:shadow-premium transition-all duration-300`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-soft border border-foreground/5 shrink-0">
                        {program.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-blue-950 mb-2 leading-snug">
                          {program.title}
                        </h3>
                        <p className="text-xs text-foreground/75 leading-relaxed">
                          {program.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-foreground/5 flex justify-end">
                      <Link
                        href={program.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white hover:bg-foreground hover:text-background text-foreground transition-all duration-300 border border-foreground/5 shadow-soft hover:scale-105"
                      >
                        Fill Out Form <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
