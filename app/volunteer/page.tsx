"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Check,
  Upload,
  X,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    dob: "",
    address: "",
    state: "",
    postalCode: "",
    mobile: "",
    email: "",
    qualification: "",
    profession: "",
    company: "",
    language: "",
    interests: [] as string[],
    otherInterest: "",
    hoursPerWeek: "",
    reason: "",
    agree: false
  });

  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const handleInterestChange = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFileNames((prev) => ({ ...prev, [field]: file.name }));

      const isImage = file.type.startsWith("image/");
      const previewUrl = isImage ? URL.createObjectURL(file) : null;

      if (field === "volId") {
        setIdFile(file);
        setIdPreview(previewUrl);
      } else if (field === "volPhoto") {
        setPhotoFile(file);
        setPhotoPreview(previewUrl);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        gender: "Male",
        dob: "",
        address: "",
        state: "",
        postalCode: "",
        mobile: "",
        email: "",
        qualification: "",
        profession: "",
        company: "",
        language: "",
        interests: [],
        otherInterest: "",
        hoursPerWeek: "",
        reason: "",
        agree: false
      });
      setFileNames({});
      setIdFile(null);
      setIdPreview(null);
      setPhotoFile(null);
      setPhotoPreview(null);
    }, 3000);
  };

  const interestsList = [
    "Teaching/Coaching (offline)",
    "Teaching/Coaching (online)",
    "Soft Skills Training (offline)",
    "Soft Skills Training (online)",
    "Elderly Care",
    "Health Care",
    "Women Empowerment",
    "Relief Work",
    "Wellness Programme",
    "Plantation Drive",
    "Cleanliness Drive",
    "Fundraising",
    "IT Support",
    "Data Entry",
    "Social Media",
    "Photography"
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-sans text-foreground">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-7-1.jpg"
            alt="Volunteer Hero"
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
                className="w-full sm:w-auto px-8 py-4 rounded-full text-center text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#CFE8FF] text-[#444444] hover:bg-[#b8daff] ring-4 ring-white/50 scale-105"
              >
                As Volunteer
              </Link>
              <Link
                href="/member"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-center text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#dccff8] text-[#444444] hover:bg-[#cbb6f5] opacity-70 hover:opacity-100"
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

          {/* Volunteer Registration Form */}
          <div className="lg:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-soft bg-purple-50">
                  <Check className="w-8 h-8 text-[#6B46C1]" />
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground">Application Submitted</h3>
                <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                  Thank you for submitting your application to join Live 4 Help Foundation. Our coordinator team will review your details and reach out to you within 3 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="border-b border-foreground/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#6B46C1] uppercase tracking-wider">Volunteer Registration Form</h3>
                      <p className="text-xs text-slate-500 mt-1">Provide your details to join Live 4 Help Foundation as a volunteer.</p>
                    </div>
                    <a
                      href="/form/Volunteer-Registration-Form.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#6B46C1]/20 hover:border-[#6B46C1] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all w-fit shrink-0 cursor-pointer text-[#6B46C1] bg-purple-50"
                    >
                      <FileText className="w-4 h-4" /> Download PDF Form
                    </a>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    {/* Left Column: Personal Details */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Personal Details</h4>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Full Name *</label>
                        <input
                          type="text" required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Name"
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
                        <label className="text-xs font-semibold text-foreground/75">Postal-Code *</label>
                        <input
                          type="text" required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Postal-Code"
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
                        <label className="text-xs font-semibold text-foreground/75">Language Proficiency *</label>
                        <input
                          type="text" required
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Language Proficiency"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Education/Qualification *</label>
                        <input
                          type="text" required
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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

                    </div>

                    {/* Right Column: Interests & Commitments */}
                    <div className="flex flex-col gap-4 h-full">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Area of interest</h4>
                      
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
                        <label className="text-xs font-semibold text-foreground/75">Preferred time to be spent (Hrs/Week, Days/Week, Days) *</label>
                        <input
                          type="text" required
                          value={formData.hoursPerWeek}
                          onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="e.g. 4 Hrs/Wk, 2 days/Wk, Saturday"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-foreground/75">Reasons for joining as a Volunteer</label>
                        <textarea
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          rows={4}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm font-sans"
                          placeholder="Reasons for joining as a Volunteer"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-foreground/75">Company_name *</label>
                        <input
                          type="text" required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="p-3 py-2.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-[#CBB6F5] text-sm"
                          placeholder="Company name"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Document upload fields - side-by-side */}
                  <div className="flex flex-col gap-6 mt-6 pt-6 border-t border-foreground/5 w-full">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6B46C1] border-b border-[#6B46C1]/10 pb-2">Documents & Photo Uploads</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {/* ID Proof */}
                      <div className="flex flex-col gap-1.5 w-full">
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
                                  onChange={(e) => handleFileChange("volId", e.target.files)}
                                />
                              </label>
                              <span className="text-[9px] text-slate-500 font-sans truncate max-w-full">
                                {fileNames["volId"]}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                              <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                                {fileNames["volId"] || "Choose File"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFileChange("volId", e.target.files)}
                              />
                            </>
                          )}
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="flex flex-col gap-1.5 w-full">
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
                                  onChange={(e) => handleFileChange("volPhoto", e.target.files)}
                                />
                              </label>
                              <span className="text-[9px] text-slate-500 font-sans truncate max-w-full">
                                {fileNames["volPhoto"]}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-[#6B46C1] mb-1" />
                              <span className="text-[11px] text-foreground/60 text-center truncate max-w-full">
                                {fileNames["volPhoto"] || "Choose File"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => handleFileChange("volPhoto", e.target.files)}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Width Declaration & Center Submit Button */}
                  <div className="mt-8 pt-6 border-t border-foreground/5 flex flex-col gap-6 w-full">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox" required
                        id="volAgree"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-1 accent-[#6B46C1] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="volAgree" className="text-xs text-foreground/70 leading-relaxed cursor-pointer select-none">
                        I declare that the information furnished above is true to the best of my knowledge. I will help Live 4 Help Foundation in best possible way to fulfil the objectives outlined by the Foundation.
                      </label>
                    </div>

                    <div className="flex justify-center w-full">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-[#444444] bg-[#CBB6F5] hover:bg-[#b8daff] transition-all duration-300 shadow-soft cursor-pointer"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Info Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Volunteer Info Card */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-[#EEB898] shadow-soft flex flex-col gap-6">
              <span className="w-8 h-8 rounded-xl bg-[#FFF5EE] flex items-center justify-center border border-orange-100">
                <Heart className="w-4 h-4 text-secondary fill-secondary/20" />
              </span>
              <h4 className="font-display font-bold text-xl text-foreground italic leading-normal">
                &ldquo;Volunteers are seldom paid; not because they are worthless, but because they are PRICELESS!&rdquo;
              </h4>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Live 4 Help Foundation provide a platform and invite people who are enthusiastic and passionate about helping deprived citizens and environment related issues, like to devote time and energy, want to serve selflessly for societal upliftment and to give something back to society.
              </p>
              <div className="border-t border-foreground/5 pt-4 flex flex-col gap-4">
                <h5 className="font-display font-bold text-sm text-foreground italic leading-normal">
                  &ldquo;Be part of our organization and make a positive influence. Together we can make a difference&rdquo;
                </h5>
                <p className="text-xs text-foreground/60 leading-normal">
                  You can fill online form or download form and send us duly filled form through e-mail (live4help.org@gmail.com) or by post in the Office Address.
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
