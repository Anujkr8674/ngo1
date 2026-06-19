"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ShieldCheck, Check, Sparkles, X, Eye } from "lucide-react";

export default function Transparency() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const certificates = [
    { title: "Certificate of Incorporation", issue: "Ministry of Corporate Affairs", year: "2020", desc: "Registered as a Section 8 Company Limited by Guarantee." },
    { title: "12A Registration Certificate", issue: "Income Tax Department", year: "2021", desc: "Grants tax-exempt status to the foundation's charitable revenue." },
    { title: "80G Tax Exemption", issue: "Income Tax Department", year: "2021", desc: "Allows donors to claim 50% tax deductions on contributions." },
    { title: "CSR-1 Filing Registration", issue: "Ministry of Corporate Affairs", year: "2021", desc: "Eligible to undertake Corporate Social Responsibility campaigns." }
  ];

  const reports = [
    { title: "Annual Compliance Audit Report FY 2024-25", size: "2.4 MB", type: "PDF" },
    { title: "Financial Balance Sheet FY 2024-25", size: "1.8 MB", type: "PDF" },
    { title: "Annual Operations & Student Report FY 2025-26", size: "3.1 MB", type: "PDF" },
    { title: "Financial Audit Balance Sheet FY 2025-26", size: "2.0 MB", type: "PDF" }
  ];

  const memberImages = [
    { src: "https://live4help.org/wp-content/uploads/2026/06/Members-1-June-18.png", title: "Patron Donors & Life Members - Sheet 1" },
    { src: "https://live4help.org/wp-content/uploads/2026/06/Members-2-June-18.png", title: "Patron Donors & Life Members - Sheet 2" },
    { src: "https://live4help.org/wp-content/uploads/2026/06/Members-3-June-18-.png", title: "Patron Donors & Life Members - Sheet 3" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2024/02/Meeting-with-Subham-Pandey.jpg"
            alt="Transparency Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60 flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full text-white/70 shadow-soft">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Public Audits & Governance
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Transparency & Compliance
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              We believe in absolute accountability. Explore our corporate certifications, tax exemptions, and audited operational balance sheets.
            </p>
          </div>
        </div>
      </section>

      {/* Registrations & Certifications */}
      <section className="px-6 md:px-12 py-12 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <h3 className="font-display font-bold text-2xl text-foreground border-b border-foreground/5 pb-4">
            NGO Registrations & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert) => (
              <div key={cert.title} className="p-6 rounded-2xl glass-panel border border-white/80 shadow-soft flex flex-col justify-between min-h-[200px] hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground leading-snug">{cert.title}</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-foreground/50 font-semibold uppercase tracking-wider mt-6 pt-2 border-t border-foreground/5">
                  <span>{cert.issue}</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audited Financial Downloads */}
      <section className="px-6 md:px-12 py-20 bg-white/30 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <h3 className="font-display font-bold text-2xl text-foreground border-b border-foreground/5 pb-4">
            Audit Reports & Sponsoring Disclosures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((doc) => (
              <div key={doc.title} className="p-5 rounded-2xl glass-panel border border-white shadow-soft flex items-center justify-between gap-6 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground leading-tight">{doc.title}</span>
                    <span className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1 font-semibold">{doc.size} • {doc.type}</span>
                  </div>
                </div>
                <button className="p-3 rounded-full bg-white hover:bg-foreground/5 border border-foreground/5 text-foreground shadow-soft shrink-0 cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zoomable Members List */}
      <section className="px-6 md:px-12 py-24 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Sponsors Registry
            </span>
            <h3 className="font-display font-bold text-3xl text-foreground">Registered Members & Patrons</h3>
            <p className="text-foreground/75 leading-relaxed text-sm">
              We compile and maintain records of our life subscribers and corporate sponsors. Click below to inspect verified on-book member rolls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {memberImages.map((sheet, i) => (
              <div 
                key={i}
                onClick={() => setActiveImage(sheet.src)}
                className="group flex flex-col gap-4 p-5 rounded-3xl glass-panel border border-white shadow-soft cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              >
                <div className="aspect-[4/5] rounded-2xl relative overflow-hidden bg-foreground/5 shadow-inner">
                  <img referrerPolicy="no-referrer"
                    src={sheet.src}
                    alt={sheet.title}
                    
                    
                    className="w-full h-full object-cover absolute inset-0 object-cover object-top group-hover:scale-102 transition-premium"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-premium">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-foreground text-xs">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-xs tracking-tight text-foreground/90">{sheet.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
              aria-label="Close sheet"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-2xl h-[85vh] relative rounded-2xl overflow-y-auto p-4 bg-white/10 backdrop-blur-md border border-white/10"
            >
              <div className="relative w-full h-[1500px]">
                <img referrerPolicy="no-referrer"
                  src={activeImage}
                  alt="Zoomed document"
                  
                  className="w-full h-full object-cover absolute inset-0 object-contain object-top"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
