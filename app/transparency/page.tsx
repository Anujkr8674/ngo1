"use client";

import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Transparency() {
  const certificates = [
    { title: "Certificate of Incorporation", issue: "Ministry of Corporate Affairs", year: "2020", desc: "Registered as a Section 8 Company Limited by Guarantee." },
    { title: "12A Registration Certificate", issue: "Income Tax Department", year: "2021", desc: "Grants tax-exempt status to the foundation's charitable revenue." },
    { title: "80G Tax Exemption", issue: "Income Tax Department", year: "2021", desc: "Allows donors to claim 50% tax deductions on contributions." },
    { title: "CSR-1 Filing Registration", issue: "Ministry of Corporate Affairs", year: "2021", desc: "Eligible to undertake Corporate Social Responsibility campaigns." }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FBFBFA]">
      {/* Intro Hero (100vh) */}
      <section className="relative min-h-[100vh] px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Transparency Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="max-w-4xl mx-auto w-full z-10 relative pt-16">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <Sparkles className="w-4 h-4 text-[#444444]" />
              Trust & Accountability
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Transparency & Certifications
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              We hold ourselves to the highest standards of integrity, accountability, and legal transparency in all of our social initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Registrations & Certifications Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-12 px-6 md:py-20 md:px-12 border border-foreground/5 max-w-7xl mx-auto flex flex-col gap-12">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground border-b border-foreground/10 pb-4">
            NGO Registrations & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="p-6 rounded-2xl bg-[#F6F7FA] border border-foreground/5 shadow-soft flex flex-col justify-between min-h-[220px] hover:-translate-y-2 hover:border-primary hover:shadow-premium hover:bg-[#CFE8FF] transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground leading-snug">{cert.title}</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-foreground/50 font-semibold uppercase tracking-wider mt-6 pt-2 border-t border-foreground/5">
                  <span>{cert.issue}</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
