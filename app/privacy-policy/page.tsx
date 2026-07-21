"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Intro Hero */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Medical-Camp-Photo.jpg"
            alt="Privacy Policy Hero"
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
              <Shield className="w-3.5 h-3.5 text-[#444444]" />
              Privacy Protection
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed font-sans"
            >
              This privacy policy sets out how LIVE 4 HELP FOUNDATION uses and protects any information that you give when using this website.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12 pb-32">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-12 md:px-8 border border-foreground/5 max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#EEB898] shadow-soft text-foreground/80 font-sans leading-relaxed flex flex-col gap-6 text-sm md:text-base">
            <h2 className="text-2xl font-display font-bold text-foreground">Privacy Policy</h2>
            <p>
              LIVE 4 HELP FOUNDATION is accessible at{" "}
              <a href="https://www.live4help.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                www.live4help.org
              </a>
              . This privacy policy sets out how LIVE 4 HELP FOUNDATION uses and protects any information that you give. LIVE 4 HELP FOUNDATION is committed to ensure that your privacy is protected. We may ask you to provide certain information by which you can be identified when using this website then you can be assured that it will only be used in accordance with this privacy statement. LIVE 4 HELP FOUNDATION may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in{" "}
              <a href="https://www.live4help.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                www.live4help.org
              </a>
              . This policy is not applicable to any information collected offline or via channels other than this website.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Consent</h3>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Information we collect</h3>
            <p>
              LIVE 4 HELP FOUNDATION may collect following information from donors, volunteers, members and those who are seeking help:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Personal Details – Name, Address, Gender, Date of Birth, PAN, ID Proof, Photo etc.</li>
              <li>Contact information including Email ID</li>
              <li>Company Name and Profession</li>
              <li>Area of Interests</li>
              <li>Type of supports / helps</li>
            </ul>

            <h3 className="text-lg font-bold text-foreground mt-4">What we do with the information we collect?</h3>
            <p>
              The information we collect, we require to identify your needs and area of interests with sole objective of meeting the purposes and missions of the LIVE 4 HELP FOUNDATION in efficient ways. We gather this information for following reasons:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>To understand type of help required and connect with people who are willing to offer help.</li>
              <li>To contact you by phone either directly or through our members, volunteers to provide you with updates and other information related to LIVE 4 HELP FOUNDATION activities.</li>
              <li>To send you emails and text with information pertaining to LIVE 4 HELP FOUNDATION.</li>
              <li>To contact you as and when required for Funding / Help purposes.</li>
              <li>To use the information to customize the website according to your interests.</li>
            </ul>

            <h3 className="text-lg font-bold text-foreground mt-4">Log File</h3>
            <p>
              <a href="https://www.live4help.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                www.live4help.org
              </a>{" "}
              follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analysing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Links to other websites</h3>
            <p>
              Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information, which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Third Party Privacy Policies</h3>
            <p>
              LIVE 4 HELP FOUNDATION’s Privacy Policy does not apply to other advertisers or websites. If you click on a third-party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Non-Disclosure of customer’s Information</h3>
            <p>
              Due to the mutual trust with our customers, LIVE 4 HELP FOUNDATION will maintain at all times the privacy and confidentiality of all personal information collected. Such information may only be disclosed when required by law or when in good faith we believe that such action is necessary or desirable to comply with the law, protect or defend the rights or property of LIVE 4 HELP FOUNDATION.
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4">Contact Information</h3>
            <p>
              <strong>LIVE 4 HELP FOUNDATION</strong><br />
              C-504, Sea Show CGHS Ltd. Plot No. 14, Sector -19B, Dwarka, New Delhi -110075<br />
              Email: <a href="mailto:live4help.org@gmail.com" className="text-blue-600 hover:underline">live4help.org@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
