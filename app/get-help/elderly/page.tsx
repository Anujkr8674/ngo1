"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Check, AlertCircle, Send, Upload, FileText } from "lucide-react";
import Link from "next/link";

export default function ElderlySupport() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  const [elderlyData, setElderlyData] = useState({
    name: "",
    gender: "Male",
    age: "",
    address: "",
    mobile: "",
    email: "",
    livingStatus: "Single",
    language: "English",
    emergencyContact: "",
    emergencyPhone: "",
    healthStatus: "",
    supportTypes: [] as string[],
    otherSupport: "",
    suggestions: "",
    agree: false
  });

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFileNames((prev) => ({ ...prev, [field]: files[0].name }));
    }
  };

  const toggleElderlySupport = (type: string) => {
    if (elderlyData.supportTypes.includes(type)) {
      setElderlyData({ ...elderlyData, supportTypes: elderlyData.supportTypes.filter(t => t !== type) });
    } else {
      setElderlyData({ ...elderlyData, supportTypes: [...elderlyData.supportTypes, type] });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-sans text-foreground">
      {/* Page Header */}
      <section className="relative min-h-[90vh] px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-7-1.jpg"
            alt="Elderly Support Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative mt-12">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <ShieldAlert className="w-4 h-4 text-[#444444]" />
              Elderly Care Support
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Elderly Support Form
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Apply for regular companionship, digital services guidance, doctor consultation visits, or daily needs delivery support.
            </p>
            
          </div>
        </div>
      </section>

      {/* Form Area */}
      <section className="py-8 px-6 md:px-12 bg-white pb-24">
        <div className="bg-[#FFF6ED] rounded-[3rem] py-8 px-4 md:py-12 md:px-8 border border-foreground/5 max-w-5xl mx-auto w-full">
          <div className="bg-white border border-[#EEB898] rounded-[2.5rem] shadow-soft p-6 md:p-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-soft">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-3xl text-blue-950">Application Submitted</h3>
              <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                Your elderly support application has been logged successfully. The Live 4 Help operations team and local coordinators will verify the details and coordinate the required verification visits.
              </p>
              <div className="p-4 rounded-xl bg-[#FFF6ED] border border-[#FFedd5] text-xs text-foreground/80 text-left max-w-md flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Our coordinators will contact you directly to schedule visits or checkup sessions.</span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
              <div className="border-b border-foreground/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#6B46C1]">Personal & Support details</h3>
                  <p className="text-xs text-foreground/60 mt-1">Provide information about the applicant and support types.</p>
                </div>
                <a
                  href="https://live4help.org/wp-content/uploads/2021/01/Elderly-Person-Support-Form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 border border-foreground/10 hover:border-primary text-xs font-semibold uppercase tracking-wider rounded-xl transition-all w-fit shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4" /> Download PDF Form
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Personal Details */}
                <div className="flex flex-col gap-5">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Personal Details</h4>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Full Name *</label>
                    <input
                      type="text" required
                      value={elderlyData.name}
                      onChange={(e) => setElderlyData({ ...elderlyData, name: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Gender *</label>
                      <select
                        value={elderlyData.gender}
                        onChange={(e) => setElderlyData({ ...elderlyData, gender: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm bg-white"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Age *</label>
                      <input
                        type="number" required
                        value={elderlyData.age}
                        onChange={(e) => setElderlyData({ ...elderlyData, age: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Address *</label>
                    <input
                      type="text" required
                      value={elderlyData.address}
                      onChange={(e) => setElderlyData({ ...elderlyData, address: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Mobile *</label>
                      <input
                        type="tel" required
                        value={elderlyData.mobile}
                        onChange={(e) => setElderlyData({ ...elderlyData, mobile: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Living Status *</label>
                      <select
                        value={elderlyData.livingStatus}
                        onChange={(e) => setElderlyData({ ...elderlyData, livingStatus: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm bg-white"
                      >
                        <option>Single</option>
                        <option>With Spouse</option>
                        <option>With Children</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Emergency Contact Person *</label>
                      <input
                        type="text" required
                        value={elderlyData.emergencyContact}
                        onChange={(e) => setElderlyData({ ...elderlyData, emergencyContact: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Emergency Contact Person"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Emergency Phone *</label>
                      <input
                        type="tel" required
                        value={elderlyData.emergencyPhone}
                        onChange={(e) => setElderlyData({ ...elderlyData, emergencyPhone: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Emergency Contact no."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Preferred Language *</label>
                      <input
                        type="text" required
                        value={elderlyData.language}
                        onChange={(e) => setElderlyData({ ...elderlyData, language: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Preferred Language of Communication"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Email ID</label>
                      <input
                        type="email"
                        value={elderlyData.email}
                        onChange={(e) => setElderlyData({ ...elderlyData, email: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Email ID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                        ID Proof <span className="text-foreground/40 font-normal">(Optional)</span>
                      </label>
                      <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01]">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange("eldId", e.target.files)}
                        />
                        <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                        <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                          {fileNames["eldId"] || "Upload ID Proof"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                        Photo <span className="text-foreground/40 font-normal">(Optional)</span>
                      </label>
                      <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01]">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange("eldPhoto", e.target.files)}
                        />
                        <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                        <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                          {fileNames["eldPhoto"] || "Upload Photo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Health Status / Regular Medication</label>
                    <input
                      type="text"
                      value={elderlyData.healthStatus}
                      onChange={(e) => setElderlyData({ ...elderlyData, healthStatus: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Health Status/Regular Medication if any"
                    />
                  </div>
                </div>

                {/* Right: Type of Support Required */}
                <div className="flex flex-col gap-5">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Type of Support Required</h4>
                  
                  <div className="flex flex-col gap-3 text-sm">
                    {[
                      "Emotional support by regular conversation (weekly/daily)",
                      "Familiarisation with online services",
                      "Doctor's Consultation(offline)",
                      "Doctor's Consultation(online)",
                      "Assistance in Health check up",
                      "Assistance for grocery and daily needs delivery",
                      "Assistance for arranging nurse,maid,cook etc",
                      "Supply of medicines",
                      "Assistance in bill payments"
                    ].map((type) => (
                      <div
                        key={type}
                        onClick={() => toggleElderlySupport(type)}
                        className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-300 text-xs ${
                          elderlyData.supportTypes.includes(type)
                            ? "border-[#6B46C1] bg-[#CBB6F5]/10 text-foreground font-semibold"
                            : "border-foreground/10 hover:border-foreground/20 text-foreground/80"
                        }`}
                      >
                        <span>{type}</span>
                        {elderlyData.supportTypes.includes(type) && <Check className="w-4 h-4 text-[#6B46C1] shrink-0" />}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Any Other Support Requirements</label>
                    <input
                      type="text"
                      value={elderlyData.otherSupport}
                      onChange={(e) => setElderlyData({ ...elderlyData, otherSupport: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Any Other Support"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Suggestions</label>
                    <textarea
                      value={elderlyData.suggestions}
                      onChange={(e) => setElderlyData({ ...elderlyData, suggestions: e.target.value })}
                      rows={4}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm font-sans"
                      placeholder="Suggestions"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-foreground/5 pt-8">
                <input
                  type="checkbox" required id="eldAgree"
                  checked={elderlyData.agree}
                  onChange={(e) => setElderlyData({ ...elderlyData, agree: e.target.checked })}
                  className="mt-1 accent-[#6B46C1] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="eldAgree" className="text-xs text-foreground/70 leading-relaxed cursor-pointer select-none">
                  I declare that the above information is correct to the best of my knowledge.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-foreground/5 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-blue-950 bg-[#CBB6F5] hover:bg-[#b8daff] transition-all duration-300 shadow-soft cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    </div>
  );
}
