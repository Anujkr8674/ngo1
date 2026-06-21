"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Terms and Conditions Hero"
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold shadow-soft bg-[#DCCFF8] text-[#444444]"
            >
              <FileText className="w-3.5 h-3.5 text-[#444444]" />
              Legal Information
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Terms & Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              Please read these terms and conditions carefully before using our website or services. Your use and access to the website constitute acceptance of these terms.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 bg-white pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-foreground/5 text-foreground/80 font-sans leading-relaxed flex flex-col gap-6 text-sm md:text-base">
            <h2 className="text-2xl font-display font-bold text-foreground">Terms of Use</h2>
            <p>
              The use of this website provided by LIVE 4 HELP FOUNDATION is subject to the following Terms and Conditions:
            </p>
            <p>
              The content of the pages of this website is for your general information and use only. It is subject to change without notice. Your use and access to the website constitute acceptance of these Terms and Conditions. You agree to use this site only for lawful purposes, and in a manner which does not infringe the rights, or restrict, or inhibit the use and enjoyment of the site by any third party.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Copyright & Trademarks</h3>
            <p>
              This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions. All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Contact Information</h3>
            <p>
              <strong>LIVE 4 HELP FOUNDATION</strong><br />
              C-504, Sea Show CGHS Ltd. Plot No. 14, Sector -19B, Dwarka, New Delhi -110075<br />
              Email: live4help.org@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
