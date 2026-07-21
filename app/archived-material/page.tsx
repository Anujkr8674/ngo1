"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ShieldCheck, Check, Sparkles, X, Eye } from "lucide-react";
import { Card } from "../components/Card";

export default function Transparency() {
    
    

    const reports = [
        { title: "Annual Compliance Audit Report FY 2024-25", size: "2.4 MB", type: "PDF" },
        { title: "Financial Balance Sheet FY 2024-25", size: "1.8 MB", type: "PDF" },
        { title: "Annual Operations & Student Report FY 2025-26", size: "3.1 MB", type: "PDF" },
        { title: "Financial Audit Balance Sheet FY 2025-26", size: "2.0 MB", type: "PDF" }
    ];

    

    return (
        <div className="flex flex-col w-full">
            {/* Intro Hero */}
            <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
                {/* Full-size Hero Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
                        alt="Transparency Hero"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Floating Glassmorphism Hero Content Card */}
                <div className="max-w-4xl mx-auto w-full z-10 relative">
                    <div className="w-full text-center flex flex-col items-center gap-6">
                        <span className="text-xs uppercase tracking-widest font-semibold  flex items-center gap-2 px-4 py-1.5 rounded-full  shadow-soft bg-[#DCCFF8] text-[#444444]">
                            <ShieldCheck className="w-4 h-4 text-[#444444]" />
                            Public Audits & Governance
                        </span>
                        <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
                            Archived Virtual Meetings, Activity & Finance Reports
                        </h1>
                        <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
                            We believe in absolute accountability. Explore our corporate certifications, tax exemptions, and audited operational balance sheets.
                        </p>
                    </div>
                </div>
            </section>

            

            {/* Audited Financial Downloads */}
            <section className="py-8 px-6 md:px-12 pb-16">
                <div className="bg-[#E5F0E5] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
                    <h3 className="font-display font-bold text-2xl text-foreground border-b border-foreground/5 pb-4">
                        Audit Reports & Sponsoring Disclosures
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reports.map((doc) => (
                            <Card key={doc.title} className="p-5 rounded-[2.5rem] border border-[#C1D6C1] shadow-soft flex items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-foreground leading-tight">{doc.title}</span>
                                        <span className="text-xs text-foreground/50 uppercase tracking-widest mt-1 font-semibold">{doc.size} • {doc.type}</span>
                                    </div>
                                </div>
                                <button className="p-3 rounded-full bg-primary text-foreground shadow-soft shrink-0 cursor-pointer hover:-translate-y-1 hover:border-primary hover:shadow-premium transition-all duration-300">
                                    <Download className="w-4 h-4" />
                                </button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            

            

        </div>
    );
}
