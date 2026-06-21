"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, ArrowRight } from "lucide-react";

const pdfReports = [
  {
    id: "may-2026",
    title: "May 2026: A Journey of Collective Action",
    date: "May 2026",
    url: "https://live4help.org/wp-content/uploads/2026/06/May-2026-A-Journey-of-Collective-Action.pdf",
  },
  {
    id: "agm-jan-2024",
    title: "AGM Jan 28th 2024",
    date: "January 2024",
    url: "https://live4help.org/wp-content/uploads/2026/03/AGM-Jan-28th-2024.pdf",
  },
  {
    id: "agm-2023",
    title: "Annual General Meeting 2023",
    date: "December 2023",
    url: "https://live4help.org/wp-content/uploads/2026/03/AGM-2023.pdf",
  },
  {
    id: "mid-year-2023",
    title: "Live4Help Mid-Year Review 2023",
    date: "June 2023",
    url: "https://live4help.org/wp-content/uploads/2026/03/Live4Help-Mid-Year-Review-2023.pdf",
  },
  {
    id: "agm-dec-2022",
    title: "AGM Dec 11 2022",
    date: "December 2022",
    url: "https://live4help.org/wp-content/uploads/2026/03/AGM-Dec-11-2022.pdf",
  },
  {
    id: "agm-2021",
    title: "Annual General Meeting 2021",
    date: "December 2021",
    url: "https://live4help.org/wp-content/uploads/2026/03/AGM-2021.pdf",
  },
];

export default function Agm() {
  const [activePdf, setActivePdf] = useState(pdfReports[0]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/relief.jpg"
            alt="AGM Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-soft font-semibold bg-[#DCCFF8] text-[#444444]"
            >
              <FileText className="w-3.5 h-3.5 text-[#444444]" />
              Transparency & Reports
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Annual General Meetings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              Explore our financial reports, project reviews, and community achievements to see how your support translates into real-world impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* PDF Viewer Dashboard */}
      <section className="py-8 px-6 md:px-12 bg-white pb-24">
        <div className="bg-[#F5F2FC] rounded-[3rem] p-4 sm:p-8 md:p-12 border border-foreground/5 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start min-h-[80vh]">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <h3 className="font-display font-bold text-xl text-foreground mb-2 px-2">Published Reports</h3>
            <div className="flex flex-col gap-3">
              {pdfReports.map((report) => {
                const isActive = activePdf.id === report.id;
                return (
                  <button
                    key={report.id}
                    onClick={() => setActivePdf(report)}
                    className={`flex items-start text-left gap-4 p-4 rounded-3xl transition-premium border ${
                      isActive 
                        ? "bg-white border-white/60 shadow-premium" 
                        : "bg-transparent border-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-soft transition-colors ${isActive ? "bg-[#CFE8FF] text-foreground" : "bg-white text-foreground/60"}`}>
                      <FileText className="w-4 h-4 fill-current opacity-20" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider font-semibold text-foreground/50 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {report.date}
                      </span>
                      <span className={`text-sm font-semibold leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                        {report.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-3xl border border-white/60 shadow-soft hidden lg:flex flex-col gap-4">
              <div className="w-12 h-12 bg-gradient-soft-yellow rounded-2xl flex items-center justify-center shadow-soft">
                <Download className="w-5 h-5 text-foreground" />
              </div>
              <h4 className="font-bold font-display text-foreground">Download for Offline Viewing</h4>
              <p className="text-xs text-foreground/70 leading-relaxed">
                You can download any of these reports directly to your device to read later or share with your network.
              </p>
            </div>
          </div>

          {/* Main PDF Viewer Area */}
          <div className="w-full lg:w-2/3 flex flex-col h-full bg-white rounded-[2.5rem] shadow-soft border border-white/60 overflow-hidden">
            {/* Toolbar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-foreground/5 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-foreground/50 uppercase tracking-widest flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" /> Viewing Document
                </span>
                <h2 className="font-display font-bold text-xl text-foreground truncate max-w-[280px] sm:max-w-md">
                  {activePdf.title}
                </h2>
              </div>
              
              <a 
                href={activePdf.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-foreground bg-[#CFE8FF] hover:bg-[#b8daff] transition-premium shadow-soft shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>

            {/* Embedded iFrame Viewer */}
            <div className="w-full bg-foreground/5 flex-1 min-h-[600px] lg:min-h-[800px] relative">
              {/* Note: toolbar=0 helps remove generic browser toolbars if supported */}
              <iframe
                src={`${activePdf.url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="absolute inset-0 w-full h-full border-0 rounded-b-[2.5rem]"
                title={`PDF Viewer for ${activePdf.title}`}
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
