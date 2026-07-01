"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Check, AlertCircle, Send, Upload } from "lucide-react";
import Link from "next/link";

export default function EducationSupport() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  const [eduData, setEduData] = useState({
    studentName: "",
    className: "",
    gender: "Male",
    dob: "",
    parentName: "",
    annualIncome: "",
    address: "",
    state: "",
    postalCode: "",
    mobile: "",
    email: "",
    language: "English",
    // school
    schoolName: "",
    schoolAddress: "",
    schoolState: "",
    schoolPin: "",
    teacherName: "",
    teacherPhone: "",
    // support amounts
    admissionFee: "",
    tuitionFee: "",
    booksCost: "",
    stationeryCost: "",
    totalAmountWords: "",
    totalAmountFigure: "",
    otherSupport: [] as string[],
    // bank
    accountNo: "",
    ifsc: "",
    agree: false
  });

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFileNames((prev) => ({ ...prev, [field]: files[0].name }));
    }
  };

  const toggleEduSupport = (type: string) => {
    if (eduData.otherSupport.includes(type)) {
      setEduData({ ...eduData, otherSupport: eduData.otherSupport.filter(t => t !== type) });
    } else {
      setEduData({ ...eduData, otherSupport: [...eduData.otherSupport, type] });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FBFBFA] font-sans text-foreground">
      {/* Page Header */}
      <section className="relative min-h-[90vh] px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2024/02/Bankura-Student-Sila.jpg"
            alt="Education Support Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative mt-12">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <GraduationCap className="w-4 h-4 text-[#444444]" />
              Education Support
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Education Support Form
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Request sponsoring support for tuition, admission fees, books, and other study supplies for underprivileged students.
            </p>
            <Link
              href="/get-help"
              className="text-xs font-semibold uppercase tracking-wider text-white hover:text-white/80 transition-colors flex items-center gap-1.5 mt-2"
            >
              ← Back to Help Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Form Area */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto w-full pb-24">
        <div className="bg-white border border-foreground/5 rounded-[2.5rem] shadow-premium p-6 md:p-12">
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
                Your education support application has been logged successfully. The Live 4 Help operations team and local coordinators will verify the details and coordinate the required verification visits.
              </p>
              <div className="p-4 rounded-xl bg-[#FFF6ED] border border-[#FFedd5] text-xs text-foreground/80 text-left max-w-md flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>We require verification visits or school teacher confirmation calls before disbursing fees directly to institutions.</span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Student/Family Details */}
                <div className="flex flex-col gap-5">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Student & Family Details</h4>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Student Name *</label>
                    <input
                      type="text" required
                      value={eduData.studentName}
                      onChange={(e) => setEduData({ ...eduData, studentName: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm transition-all"
                      placeholder="Name of Student"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Class *</label>
                      <input
                        type="text" required
                        value={eduData.className}
                        onChange={(e) => setEduData({ ...eduData, className: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Class"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Gender *</label>
                      <select
                        value={eduData.gender}
                        onChange={(e) => setEduData({ ...eduData, gender: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm bg-white"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Date of Birth *</label>
                      <input
                        type="date" required
                        value={eduData.dob}
                        onChange={(e) => setEduData({ ...eduData, dob: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Annual Income (Rs) *</label>
                      <input
                        type="number" required
                        value={eduData.annualIncome}
                        onChange={(e) => setEduData({ ...eduData, annualIncome: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Annual income"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Name of Parent/Guardian *</label>
                    <input
                      type="text" required
                      value={eduData.parentName}
                      onChange={(e) => setEduData({ ...eduData, parentName: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Name of Parent/Guardian"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Address *</label>
                    <input
                      type="text" required
                      value={eduData.address}
                      onChange={(e) => setEduData({ ...eduData, address: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">State *</label>
                      <input
                        type="text" required
                        value={eduData.state}
                        onChange={(e) => setEduData({ ...eduData, state: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="State"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Postal Code *</label>
                      <input
                        type="text" required
                        value={eduData.postalCode}
                        onChange={(e) => setEduData({ ...eduData, postalCode: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Mobile *</label>
                      <input
                        type="tel" required
                        value={eduData.mobile}
                        onChange={(e) => setEduData({ ...eduData, mobile: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Preferred Language *</label>
                      <input
                        type="text" required
                        value={eduData.language}
                        onChange={(e) => setEduData({ ...eduData, language: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Preferred language of Communication"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Email ID</label>
                    <input
                      type="email"
                      value={eduData.email}
                      onChange={(e) => setEduData({ ...eduData, email: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Email ID"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                        ID/Proof <span className="text-foreground/40 font-normal">(Optional)</span>
                      </label>
                      <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01]">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange("eduId", e.target.files)}
                        />
                        <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                        <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                          {fileNames["eduId"] || "Upload ID Proof"}
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
                          onChange={(e) => handleFileChange("eduPhoto", e.target.files)}
                        />
                        <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                        <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                          {fileNames["eduPhoto"] || "Upload Photo"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Institution & Support Details */}
                <div className="flex flex-col gap-5">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Institution Details</h4>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Name of School / College *</label>
                    <input
                      type="text" required
                      value={eduData.schoolName}
                      onChange={(e) => setEduData({ ...eduData, schoolName: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Name of School"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Institution Address *</label>
                    <input
                      type="text" required
                      value={eduData.schoolAddress}
                      onChange={(e) => setEduData({ ...eduData, schoolAddress: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">State *</label>
                      <input
                        type="text" required
                        value={eduData.schoolState}
                        onChange={(e) => setEduData({ ...eduData, schoolState: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="State"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Postal Code *</label>
                      <input
                        type="text" required
                        value={eduData.schoolPin}
                        onChange={(e) => setEduData({ ...eduData, schoolPin: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Headmaster / Teacher Name *</label>
                      <input
                        type="text" required
                        value={eduData.teacherName}
                        onChange={(e) => setEduData({ ...eduData, teacherName: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Name of Headmaster/Class Teacher"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Teacher Phone *</label>
                      <input
                        type="tel" required
                        value={eduData.teacherPhone}
                        onChange={(e) => setEduData({ ...eduData, teacherPhone: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Mobile"
                      />
                    </div>
                  </div>

                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2 mt-4">Support Details</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Admission Fee (Rs)</label>
                      <input
                        type="number"
                        value={eduData.admissionFee}
                        onChange={(e) => setEduData({ ...eduData, admissionFee: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Admission Fee(Rs)"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Annual Tuition Fee (Rs)</label>
                      <input
                        type="number"
                        value={eduData.tuitionFee}
                        onChange={(e) => setEduData({ ...eduData, tuitionFee: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Annual Tuition Fee(Rs)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Book Purchase (Rs)</label>
                      <input
                        type="number"
                        value={eduData.booksCost}
                        onChange={(e) => setEduData({ ...eduData, booksCost: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Book Purchase(Rs)"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Stationery Cost (Rs)</label>
                      <input
                        type="number"
                        value={eduData.stationeryCost}
                        onChange={(e) => setEduData({ ...eduData, stationeryCost: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Stationery Purchase(Rs)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Total (in words) *</label>
                      <input
                        type="text" required
                        value={eduData.totalAmountWords}
                        onChange={(e) => setEduData({ ...eduData, totalAmountWords: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Total Amount(in word)Rs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground/75">Total (in figures) *</label>
                      <input
                        type="text" required
                        value={eduData.totalAmountFigure}
                        onChange={(e) => setEduData({ ...eduData, totalAmountFigure: e.target.value })}
                        className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        placeholder="Total Amount(in figure)Rs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-semibold text-foreground/75">Other Support Needed</label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {["Coaching(online)", "Coaching(offline)", "Computer training", "Counselling"].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer text-foreground/80 hover:text-foreground">
                          <input
                            type="checkbox"
                            checked={eduData.otherSupport.includes(type)}
                            onChange={() => toggleEduSupport(type)}
                            className="accent-[#6B46C1] rounded border-foreground/10"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details section */}
              <div className="flex flex-col gap-5 border-t border-foreground/5 pt-8">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Bank Details of Student</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">Account Number *</label>
                    <input
                      type="text" required
                      value={eduData.accountNo}
                      onChange={(e) => setEduData({ ...eduData, accountNo: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="Account no"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75">IFSC Code *</label>
                    <input
                      type="text" required
                      value={eduData.ifsc}
                      onChange={(e) => setEduData({ ...eduData, ifsc: e.target.value })}
                      className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                      placeholder="IFSC CODE"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                      Passbook File <span className="text-foreground/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative border-2 border-dashed border-foreground/10 hover:border-primary/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01] h-[50px]">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange("eduPassbook", e.target.files)}
                      />
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#6B46C1]" />
                        <span className="text-xs text-foreground/60 truncate max-w-[150px]">
                          {fileNames["eduPassbook"] || "Upload Passbook Scan"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-foreground/5 pt-8">
                <input
                  type="checkbox" required id="eduAgree"
                  checked={eduData.agree}
                  onChange={(e) => setEduData({ ...eduData, agree: e.target.checked })}
                  className="mt-1 accent-[#6B46C1] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="eduAgree" className="text-xs text-foreground/70 leading-relaxed cursor-pointer select-none">
                  I declare that above information is correct to the best of my knowledge and I am unable to arrange funds for the purpose stated above.
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
      </section>
    </div>
  );
}
