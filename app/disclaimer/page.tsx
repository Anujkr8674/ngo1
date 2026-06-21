"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Disclaimer Hero"
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
              <AlertCircle className="w-3.5 h-3.5 text-[#444444]" />
              Important Notice
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Disclaimer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              The information contained in this website is for general information purposes only. LIVE 4 HELP FOUNDATION believes the content to be accurate, complete, and current.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 bg-white pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-foreground/5 text-foreground/80 font-sans leading-relaxed flex flex-col gap-6 text-sm md:text-base">
            <h2 className="text-2xl font-display font-bold text-foreground">Website Disclaimer</h2>
            <p>
              The information contained in this website is for general information purposes only. LIVE 4 HELP FOUNDATION believes the content to be accurate, complete, and current. LIVE 4 HELP FOUNDATION makes no representations or warranties of any kind about the accuracy, reliability, completeness, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>
            <p>
              All content is provided &ldquo;AS IS&rdquo; without warranty of any kind. LIVE 4 HELP FOUNDATION hereby disclaims all warranties about the content, including but not limited to all implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Limitation of Liability</h3>
            <p>
              In no event shall LIVE 4 HELP FOUNDATION or any of its affiliates be liable for any special, indirect, exemplary, or consequential loss or damages whatsoever, including but not limited to loss of use, data, or profits, without regard to the form of any action, including but not limited to contract, negligence, and other actions, arising out of or in connection with the use, copying, or display of the content.
            </p>
            <p>
              The content of this site may include technical inaccuracies or typographical errors. From time to time changes are made to the content herein. LIVE 4 HELP FOUNDATION reserves the right to change the Privacy Policy or Terms &amp; Conditions when necessary.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">External Links</h3>
            <p>
              Through this website you can link to other websites which are not under the control of LIVE 4 HELP FOUNDATION. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Website Availability</h3>
            <p>
              Every effort is made to keep the website up and running smoothly. However, LIVE 4 HELP FOUNDATION takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
            </p>
            <h3 className="text-lg font-bold text-foreground mt-4">Information Provided by You</h3>
            <p>
              Any information provided by you to LIVE 4 HELP FOUNDATION, including but not limited to feedback, data, questions, comments, suggestions, or the like, shall be deemed to be confidential.
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
