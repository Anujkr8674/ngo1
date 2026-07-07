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
    <div className="flex flex-col w-full min-h-screen bg-[#FBFBFA] font-sans text-foreground">
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

      {/* Cards Grid */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto w-full pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportPrograms.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`rounded-[2.5rem] border ${program.bgColor} ${program.borderColor} p-8 flex flex-col justify-between shadow-soft hover:shadow-premium transition-all duration-300`}
            >
              <div className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-soft border border-foreground/5">
                  {program.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-blue-950 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {program.desc}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-foreground/5 flex justify-end">
                <Link
                  href={program.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white hover:bg-foreground hover:text-background text-foreground transition-all duration-300 border border-foreground/5 shadow-soft hover:scale-105"
                >
                  Fill Out Form <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
