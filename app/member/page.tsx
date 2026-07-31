"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Upload,
  X,
  Check,
  FileDown,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const interestsList = [
  "Education",
  "Elderly Care",
  "Health Care",
  "Women Empowerment",
  "Plantation",
  "Relief Work",
  "Fundraising"
];

export default function MemberRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});
  
  // File state & previews
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  
  const [residenceFile, setResidenceFile] = useState<File | null>(null);
  const [residencePreview, setResidencePreview] = useState<string | null>(null);
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fatherSpouseName: "",
    gender: "Male",
    dob: "",
    address: "",
    state: "",
    postalCode: "",
    mobile: "",
    email: "",
    pancard: "",
    education: "",
    profession: "",
    company: "",
    interests: [] as string[],
    otherInterest: "",
    reason: "",
    modeOfPayment: "NEFT",
    paymentDate: "",
    chequeNo: "",
    bankName: "",
    transactionId: "",
    agree: false
  });

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFileNames((prev) => ({ ...prev, [field]: file.name }));

      const isImage = file.type.startsWith("image/");
      const previewUrl = isImage ? URL.createObjectURL(file) : null;

      if (field === "memberId") {
        setIdFile(file);
        setIdPreview(previewUrl);
      } else if (field === "memberResidence") {
        setResidenceFile(file);
        setResidencePreview(previewUrl);
      } else if (field === "memberPhoto") {
        setPhotoFile(file);
        setPhotoPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulate form submission as backend is not requested now
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      
      // Clear files
      setIdFile(null);
      setIdPreview(null);
      setResidenceFile(null);
      setResidencePreview(null);
      setPhotoFile(null);
      setPhotoPreview(null);
      setFileNames({});
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen font-sans text-foreground">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-7-1.jpg"
            alt="Member Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <Sparkles className="w-4 h-4 text-[#444444]" />
              Join the Foundation
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Become Part of Us
            </h1>
            <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Apply as a volunteer to dedicate your skills and time on-ground, or join as a permanent member to help sustain our operations.
            </p>

            {/* Role Selector Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full max-w-md mx-auto">
              <Link
                href="/volunteer"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-center text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#CFE8FF] text-[#444444] hover:bg-[#b8daff] opacity-70 hover:opacity-100"
              >
                As Volunteer
              </Link>
              <Link
                href="/member"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-center text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#dccff8] text-[#444444] hover:bg-[#cbb6f5] ring-4 ring-white/50 scale-105"
              >
                As Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-8 px-6 md:px-12 pb-16">
        <div className="bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#CBB6F5]/20 shadow-soft">
                  <Check className="w-8 h-8 text-[#6B46C1]" />
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground">Application Submitted</h3>
                <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                  Thank you for submitting your application to become a member of Live 4 Help Foundation. Our coordinator team will review your payment receipt and details and get in touch with you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="border-b border-foreground/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#6B46C1] uppercase tracking-wider">Membership Form</h3>
                      <p className="text-xs text-slate-500 mt-1">Provide your details to associate as an integral part of the team.</p>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Two columns inside form */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    
                    {/* Form Left Side: Personal Details & Files */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Personal Details</h4>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Name *</label>
                        <input
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Name"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Father/Spouse's name *</label>
                        <input
                          type="text" required
                          value={formData.fatherSpouseName}
                          onChange={(e) => setFormData({ ...formData, fatherSpouseName: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Father/Spouse's name"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm bg-white"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Others</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Date of Birth *</label>
                        <input
                          type="date" required
                          max={new Date().toISOString().split('T')[0]}
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Address *</label>
                        <input
                          type="text" required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Address"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">State *</label>
                        <input
                          type="text" required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="State"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Postal code *</label>
                        <input
                          type="text" required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Postal code"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Mobile *</label>
                        <input
                          type="tel" required
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Mobile"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Email ID *</label>
                        <input
                          type="email" required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Email ID"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Pancard *</label>
                        <input
                          type="text" required
                          value={formData.pancard}
                          onChange={(e) => setFormData({ ...formData, pancard: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Pancard"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Education/Qualification *</label>
                        <input
                          type="text" required
                          value={formData.education}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Education/Qualification"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Profession *</label>
                        <input
                          type="text" required
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Profession"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Company Name *</label>
                        <input
                          type="text" required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Company Name"
                        />
                      </div>

                      {/* File uploads */}
                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                          ID Proof <span className="text-foreground/40 font-normal">(Optional)</span>
                        </label>
                        <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01] min-h-[90px] overflow-hidden">
                          {idPreview ? (
                            <div className="flex flex-col items-center gap-2 w-full z-20">
                              <img
                                src={idPreview}
                                alt="ID Preview"
                                className="h-14 w-auto object-cover rounded-lg cursor-zoom-in border border-foreground/10 hover:opacity-90 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setZoomImage(idPreview);
                                }}
                              />
                              <label className="text-[10px] text-[#6B46C1] hover:underline font-semibold cursor-pointer">
                                Change File
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange("memberId", e.target.files)}
                                />
                              </label>
                              <span className="text-[9px] text-slate-500 font-sans truncate max-w-full">
                                {fileNames["memberId"]}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                              <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                                {fileNames["memberId"] || "Choose File"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFileChange("memberId", e.target.files)}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                          Proof of Residence <span className="text-foreground/40 font-normal">(Optional)</span>
                        </label>
                        <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01] min-h-[90px] overflow-hidden">
                          {residencePreview ? (
                            <div className="flex flex-col items-center gap-2 w-full z-20">
                              <img
                                src={residencePreview}
                                alt="Residence Preview"
                                className="h-14 w-auto object-cover rounded-lg cursor-zoom-in border border-foreground/10 hover:opacity-90 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setZoomImage(residencePreview);
                                }}
                              />
                              <label className="text-[10px] text-[#6B46C1] hover:underline font-semibold cursor-pointer">
                                Change File
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange("memberResidence", e.target.files)}
                                />
                              </label>
                              <span className="text-[9px] text-slate-500 font-sans truncate max-w-full">
                                {fileNames["memberResidence"]}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                              <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                                {fileNames["memberResidence"] || "Choose File"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFileChange("memberResidence", e.target.files)}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75 flex items-center gap-1">
                          Photo <span className="text-foreground/40 font-normal">(Optional)</span>
                        </label>
                        <div className="relative border-2 border-dashed border-foreground/10 hover:border-[#6B46C1]/50 transition-colors rounded-xl p-3 flex flex-col items-center justify-center bg-foreground/[0.01] min-h-[90px] overflow-hidden">
                          {photoPreview ? (
                            <div className="flex flex-col items-center gap-2 w-full z-20">
                              <img
                                src={photoPreview}
                                alt="Photo Preview"
                                className="h-14 w-auto object-cover rounded-lg cursor-zoom-in border border-foreground/10 hover:opacity-90 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setZoomImage(photoPreview);
                                }}
                              />
                              <label className="text-[10px] text-[#6B46C1] hover:underline font-semibold cursor-pointer">
                                Change File
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange("memberPhoto", e.target.files)}
                                />
                              </label>
                              <span className="text-[9px] text-slate-500 font-sans truncate max-w-full">
                                {fileNames["memberPhoto"]}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                              <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                                {fileNames["memberPhoto"] || "Choose File"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFileChange("memberPhoto", e.target.files)}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Form Right Side: Interests, Reasons, Payment */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Area of Interest</h4>
                      
                      <div className="flex flex-col gap-3 text-xs">
                        {interestsList.map((interest) => (
                          <label key={interest} className="flex items-center gap-2 text-foreground/75 cursor-pointer hover:text-[#6B46C1] select-none transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(interest)}
                              onChange={() => handleInterestChange(interest)}
                              className="w-3.5 h-3.5 accent-[#6B46C1] rounded border-foreground/20 cursor-pointer"
                            />
                            <span>{interest}</span>
                          </label>
                        ))}
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75">Any other area of interest</label>
                        <input
                          type="text"
                          value={formData.otherInterest}
                          onChange={(e) => setFormData({ ...formData, otherInterest: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Any other area of interest"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75">Reasons for joining as a Member</label>
                        <textarea
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          rows={4}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm font-sans"
                          placeholder="Reasons for joining as a Member"
                        />
                      </div>

                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2 mt-4">Fee/Payment details</h4>
                      
                      <div className="p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 text-xs text-foreground/70 flex flex-col gap-1">
                        <strong className="text-foreground">Membership Fee:</strong>
                        <span>A) At the time of joining: Rs 2,000/-</span>
                        <span>B) Yearly Subscription: Rs 2,000/-</span>
                        <span>C) Lifetime Subscription: Rs 10,000/-</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Mode of payment *</label>
                        <div className="flex flex-wrap gap-4 text-xs mt-1">
                          {["NEFT", "Cheque", "UPI", "Cash"].map((mode) => (
                            <label key={mode} className="flex items-center gap-1.5 cursor-pointer text-foreground/85 hover:text-[#6B46C1]">
                              <input
                                type="radio"
                                name="modeOfPayment"
                                value={mode}
                                checked={formData.modeOfPayment === mode}
                                onChange={(e) => setFormData({ ...formData, modeOfPayment: e.target.value })}
                                className="w-3.5 h-3.5 accent-[#6B46C1] cursor-pointer"
                              />
                              <span>{mode}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Date of Payment *</label>
                        <input
                          type="date" required
                          max={new Date().toISOString().split('T')[0]}
                          value={formData.paymentDate}
                          onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                        />
                      </div>

                      {formData.modeOfPayment === "Cheque" && (
                        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#CBB6F5]/5 border border-[#CBB6F5]/10 animate-fadeScale">
                          <h5 className="font-semibold text-xs text-[#6B46C1]">Cheque Details</h5>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-foreground/70">Cheque/DD no. *</label>
                            <input
                              type="text" required
                              value={formData.chequeNo}
                              onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                              className="p-2.5 rounded-lg border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-xs font-sans"
                              placeholder="Cheque/DD no."
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-foreground/70">Bank name *</label>
                            <input
                              type="text" required
                              value={formData.bankName}
                              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                              className="p-2.5 rounded-lg border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-xs"
                              placeholder="Bank name"
                            />
                          </div>
                        </div>
                      )}

                      {formData.modeOfPayment !== "Cheque" && formData.modeOfPayment !== "Cash" && (
                        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#CBB6F5]/5 border border-[#CBB6F5]/10 animate-fadeScale">
                          <h5 className="font-semibold text-xs text-[#6B46C1]">NEFT/Online Transfer</h5>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-foreground/70">Transaction ID *</label>
                            <input
                              type="text" required
                              value={formData.transactionId}
                              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                              className="p-2.5 rounded-lg border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-xs font-sans"
                              placeholder="Transaction ID"
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Full Width Declaration & Centered Submit Button */}
                  <div className="mt-8 pt-6 border-t border-foreground/5 flex flex-col gap-6 w-full">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox" required
                        id="memberAgree"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-1 accent-[#6B46C1] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="memberAgree" className="text-xs text-foreground/70 leading-relaxed cursor-pointer select-none">
                        I declare that the information furnished above is true to the best of my knowledge.
                      </label>
                    </div>

                    <div className="flex justify-center w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-[#444444] bg-[#CBB6F5] hover:bg-[#b8daff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full border-2 border-slate-600 border-t-transparent animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Sidebar Info Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Volunteers are priceless quote card */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft flex flex-col gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FFF5EE] flex items-center justify-center border border-orange-100">
                <Heart className="w-4 h-4 text-[#6B46C1] fill-[#6B46C1]/20" />
              </span>
              <h4 className="font-display font-bold text-xl text-foreground italic leading-normal">
                &ldquo;Volunteers are seldom paid; not because they are worthless, but because they are PRICELESS!&rdquo;
              </h4>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Live 4 Help Foundation encourage people to associate with our organization and to become integral part of our team. Our mission is to work together for noble causes and help people in need.
              </p>
            </div>

            {/* Click to download Membership Form */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-foreground">
                Download Form PDF
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed">
                If you prefer to fill out a paper application, you can download the PDF format, fill it out, and mail it to our office.
              </p>
              <a
                href="/form/Membership-Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#6B46C1]/20 hover:border-[#6B46C1] hover:bg-[#6B46C1]/5 text-sm font-semibold rounded-2xl transition-all cursor-pointer text-[#6B46C1]"
              >
                <FileDown className="w-4 h-4" /> Download Membership Form
              </a>
            </div>

            {/* Bank details card */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft flex flex-col gap-6">
              <h4 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#6B46C1]" />
                Bank Transfer Routing
              </h4>
              
              <div className="flex flex-col gap-3.5 text-xs font-sans text-foreground/80 border-t border-b border-foreground/5 py-4">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Beneficiary:</span>
                  <span className="font-semibold text-right">LIVE 4 HELP FOUNDATION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Account No:</span>
                  <span className="font-semibold text-right">50100392497716</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Bank Name:</span>
                  <span className="font-semibold text-right">HDFC Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Branch:</span>
                  <span className="font-semibold text-right">Sector 11, Dwarka, New Delhi -110075</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">IFSC Code:</span>
                  <span className="font-semibold text-right">HDFCO001338</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">MICR Code:</span>
                  <span className="font-semibold text-right">110240148</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-xs text-foreground">Cheque Sponsoring Address:</h5>
                <p className="text-xs text-foreground/60 leading-normal">
                  Make Cheque in favor of &ldquo;Live 4 Help Foundation&rdquo; and mail to:<br />
                  LIVE 4 HELP FOUNDATION<br />
                  C-504, Sea Show CGHS Ltd.<br />
                  Plot No. 14, Sector -19B, Dwarka, New Delhi -110075.
                </p>
              </div>

              <div className="border-t border-foreground/5 pt-4 flex flex-col gap-2">
                <h5 className="font-semibold text-xs text-[#444444]">Contact details:</h5>
                <p className="text-xs text-foreground/60 leading-normal">
                  Phone: +91-9810745206, +91-9313241727<br />
                  Email ID: live4help.org@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Zoom Lightbox Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer" onClick={() => setZoomImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 flex flex-col shadow-2xl cursor-default animate-scaleUp" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={zoomImage}
              alt="Zoomed document"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="p-3 text-center text-xs text-slate-500 font-semibold bg-slate-50 border-t border-slate-100 font-sans">
              Original Size Image Preview
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
