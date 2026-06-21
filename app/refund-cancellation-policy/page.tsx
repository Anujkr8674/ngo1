"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Refund & Cancellation Policy Hero"
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
              <RefreshCcw className="w-3.5 h-3.5 text-[#444444]" />
              Donation Policy
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Refund & Cancellation Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              LIVE 4 HELP FOUNDATION confirms NO Refund or Cancellation for the donations by any donor after a successful transaction.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 bg-white pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-foreground/5 text-foreground/80 font-sans leading-relaxed flex flex-col gap-6 text-sm md:text-base">
            <h2 className="text-2xl font-display font-bold text-foreground">Refund & Cancellation Policy</h2>
            <p>
              LIVE 4 HELP FOUNDATION confirms <strong>NO Refund or Cancellation</strong> for the donations by any donor after a successful transaction through NEFT/RTGS/Cheque or any other offline modes.
            </p>
            <p>
              LIVE 4 HELP FOUNDATION expects all donors to exercise due care and diligence while making any donations to ensure they are directed as intended.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Contact Information</h3>
            <p>
              If you have any questions or concerns regarding this policy, please reach out to us:
            </p>
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
