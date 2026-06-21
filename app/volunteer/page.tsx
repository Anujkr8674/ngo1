"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Check, BookOpen, ShieldCheck, Heart, Sparkles, AlertCircle } from "lucide-react";

type Role = "volunteer" | "member";

export default function Volunteer() {
 const [role, setRole] = useState<Role>("volunteer");
 const [step, setStep] = useState(1);
 const [submitted, setSubmitted] = useState(false);
 
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
 // Interests
 interests: [] as string[],
 otherInterest: "",
 // Commitment
 hoursPerWeek: "",
 reason: "",
 // Fee payment (For member)
 membershipType: "Yearly", // Yearly, Lifetime
 paymentMode: "NEFT", // NEFT, Cheque
 transactionId: "",
 agree: false
 });

 const handleInterestChange = (interest: string) => {
 if (formData.interests.includes(interest)) {
 setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
 } else {
 setFormData({ ...formData, interests: [...formData.interests, interest] });
 }
 };

 const nextStep = () => setStep(s => Math.min(s + 1, 3));
 const prevStep = () => setStep(s => Math.max(s - 1, 1));

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 };

 const interestsList = [
 "Teaching/Coaching (offline)",
 "Teaching/Coaching (online)",
 "Soft Skills Training",
 "Elderly Care",
 "Health Care",
 "Women Empowerment",
 "Plantation Drives",
 "Relief Work",
 "Fundraising"
 ];

 return (
 <div className="flex flex-col w-full">
 {/* Intro Header */}
 <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
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
 <span className="text-xs uppercase tracking-widest font-semibold  flex items-center gap-2 px-4 py-1.5 rounded-full  shadow-soft bg-[#DCCFF8] text-[#444444]">
 <Sparkles className="w-4 h-4 text-[#444444]" />
 Join the Foundation
 </span>
 <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
 Become Part of Us
 </h1>
 <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
 Apply as a volunteer to dedicate your skills and time on-ground, or join as a permanent member to help sustain our operations.
 </p>

 {/* Role Selector Toggle */}
 <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full max-w-md mx-auto">
 <button
 type="button"
 onClick={() => { setRole("volunteer"); setStep(1); setSubmitted(false); }}
 className={`w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#CFE8FF] text-[#444444] hover:bg-[#b8daff] ${
 role === "volunteer" ? "ring-4 ring-white/50 scale-105" : "opacity-70 hover:opacity-100"
 }`}
 >
 As Volunteer
 </button>
 <button
 type="button"
 onClick={() => { setRole("member"); setStep(1); setSubmitted(false); }}
 className={`w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold transition-premium shadow-soft cursor-pointer bg-[#dccff8] text-[#444444] hover:bg-[#cbb6f5] ${
 role === "member" ? "ring-4 ring-white/50 scale-105" : "opacity-70 hover:opacity-100"
 }`}
 >
 As Member
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Main Grid */}
 <section className="py-8 px-6 md:px-12 bg-white pb-16">
 <div className="bg-[#FFF6ED] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
 
 {/* Form Wizard Column */}
 <div className="lg:col-span-8 p-8 md:p-12 rounded-[2.5rem] glass-panel border border-white/60 shadow-premium hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 {submitted ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center py-12 flex flex-col items-center gap-6"
 >
 <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-soft">
 <Check className="w-8 h-8 text-foreground/80" />
 </div>
 <h3 className="font-display font-bold text-3xl text-foreground">Application Submitted</h3>
 <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
 Thank you for submitting your application to join Live 4 Help Foundation. Our coordinator team will review your details and reach out to you within 3 business days.
 </p>
 {role === "member" && (
 <div className="p-6 rounded-2xl border border-primary/20 text-xs text-foreground/80 text-left max-w-md hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 <strong>Note:</strong> Membership activations are processed once bank NEFT receipts are reconciled by our treasury department.
 </div>
 )}
 </motion.div>
 ) : (
 <form onSubmit={handleSubmit} className="flex flex-col gap-8">
 
 {/* Form Progress Bar */}
 <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-foreground/40 border-b border-foreground/5 pb-6">
 <span className={step >= 1 ? "text-foreground" : ""}>1. Personal Info</span>
 <span className={step >= 2 ? "text-foreground" : ""}>2. Interests & Skills</span>
 <span className={step >= 3 ? "text-foreground" : ""}>3. Commitments</span>
 </div>

 {/* Step 1: Personal Details */}
 {step === 1 && (
 <motion.div
 initial={{ opacity: 0, x: 10 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex flex-col gap-6"
 >
 <h3 className="font-display font-bold text-2xl text-foreground mb-2">Personal Details</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Full Name</label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Your Name"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Gender</label>
 <select
 value={formData.gender}
 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <option>Male</option>
 <option>Female</option>
 <option>Others</option>
 </select>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Date of Birth</label>
 <input
 type="date"
 required
 value={formData.dob}
 onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 />
 </div>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Mobile Number</label>
 <input
 type="tel"
 required
 value={formData.mobile}
 onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Mobile Number"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Email ID</label>
 <input
 type="email"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Email Address"
 />
 </div>
 <div className="flex flex-col gap-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground/70">Postal Address</label>
 <input
 type="text"
 required
 value={formData.address}
 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Street Address, Area"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">State</label>
 <input
 type="text"
 required
 value={formData.state}
 onChange={(e) => setFormData({ ...formData, state: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Delhi, West Bengal, etc."
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Postal Code</label>
 <input
 type="text"
 required
 value={formData.postalCode}
 onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="PIN Code"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Education/Qualification</label>
 <input
 type="text"
 required
 value={formData.qualification}
 onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. B.Tech, Master in CS"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Profession</label>
 <input
 type="text"
 value={formData.profession}
 onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. Engineer, Business head"
 />
 </div>
 </div>
 </motion.div>
 )}

 {/* Step 2: Interests & Skills */}
 {step === 2 && (
 <motion.div
 initial={{ opacity: 0, x: 10 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex flex-col gap-6"
 >
 <h3 className="font-display font-bold text-2xl text-foreground mb-2">Area of Interest</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {interestsList.map((interest) => (
 <div
 key={interest}
 onClick={() => handleInterestChange(interest)}
 className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-premium text-sm ${
 formData.interests.includes(interest)
 ? " border-secondary text-foreground font-semibold"
 : "border-foreground/10 hover: text-foreground/80"
 }`}
 >
 <span>{interest}</span>
 {formData.interests.includes(interest) && (
 <Check className="w-4 h-4 text-secondary shrink-0" />
 )}
 </div>
 ))}
 </div>

 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Language Proficiency</label>
 <input
 type="text"
 value={formData.language}
 onChange={(e) => setFormData({ ...formData, language: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. English, Hindi, Bengali"
 />
 </div>
 </motion.div>
 )}

 {/* Step 3: Commitments & Sponsoring Payments */}
 {step === 3 && (
 <motion.div
 initial={{ opacity: 0, x: 10 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex flex-col gap-6"
 >
 <h3 className="font-display font-bold text-2xl text-foreground mb-2">Commitment details</h3>
 
 {role === "volunteer" ? (
 <div className="flex flex-col gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Preferred Time Sponsoring (Hrs/Week)</label>
 <input
 type="text"
 required
 value={formData.hoursPerWeek}
 onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. 4 hrs/week, weekends"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Reasons for joining as a Volunteer</label>
 <textarea
 value={formData.reason}
 onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
 rows={4}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm font-sans hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Write brief description..."
 />
 </div>
 </div>
 ) : (
 <div className="flex flex-col gap-6">
 {/* Member Fees detail */}
 <div className="p-6 rounded-2xl border border-accent/20 flex flex-col gap-3">
 <span className="font-display font-bold text-lg text-foreground flex items-center gap-1.5">
 <Sparkles className="w-5 h-5" />
 Membership Subscriptions
 </span>
 <ul className="text-xs text-foreground/80 flex flex-col gap-2 font-sans pl-5 list-disc">
 <li>At the time of joining: **Rs 5,000/-**</li>
 <li>Yearly subscription support: **Rs 5,000/-**</li>
 <li>Lifetime Subscription support: **Rs 25,000/-**</li>
 </ul>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Membership Mode</label>
 <select
 value={formData.membershipType}
 onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <option>Yearly (Rs 5,000)</option>
 <option>Lifetime (Rs 25,000)</option>
 </select>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Payment Mode Used</label>
 <select
 value={formData.paymentMode}
 onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <option>NEFT / Online Transfer</option>
 <option>Cheque / DD</option>
 <option>UPI</option>
 </select>
 </div>
 <div className="flex flex-col gap-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground/70">Transaction ID / Cheque Number</label>
 <input
 type="text"
 required
 value={formData.transactionId}
 onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Transaction Reference Number"
 />
 </div>
 </div>
 </div>
 )}

 <div className="flex items-start gap-3 mt-4">
 <input
 type="checkbox"
 required
 id="agree"
 checked={formData.agree}
 onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
 className="mt-1 accent-secondary"
 />
 <label htmlFor="agree" className="text-xs text-foreground/70 leading-normal">
 I declare that the information furnished above is true to the best of my knowledge. I will support Live 4 Help Foundation in its mission of uplifting communities.
 </label>
 </div>
 </motion.div>
 )}

 {/* Wizard Buttons */}
 <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
 {step > 1 ? (
 <button
 type="button"
 onClick={prevStep}
 className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground hover: transition-premium  cursor-pointer"
 >
 Back
 </button>
 ) : (
 <div />
 )}

 {step < 3 ? (
 <button
 type="button"
 onClick={nextStep}
 className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
 >
 Continue
 </button>
 ) : (
 <button
 type="submit"
 className="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
 >
 Submit Application
 </button>
 )}
 </div>
 </form>
 )}
 </div>

 {/* Sponsoring Bank details Info Column */}
 <div className="lg:col-span-4 flex flex-col gap-8">
 
 {/* Volunteers are priceless */}
 <div className="p-8 rounded-3xl border border-white shadow-soft flex flex-col gap-4 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 <span className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
 <Heart className="w-4 h-4 text-secondary fill-secondary/20" />
 </span>
 <h4 className="font-display font-bold text-xl text-foreground italic leading-normal">
 &ldquo;Volunteers are seldom paid; not because they are worthless, but because they are PRICELESS!&rdquo;
 </h4>
 <p className="text-xs text-foreground/75 leading-relaxed">
 Join our collective network to contribute offline in medical setups, online for coaching, or plant saplings.
 </p>
 </div>

 {/* Bank details card */}
 <div className="p-8 rounded-3xl glass-panel border border-white shadow-soft flex flex-col gap-6 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 <h4 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
 <ShieldCheck className="w-5 h-5 text-secondary" />
 Bank Transfer Routing
 </h4>
 <p className="text-xs text-foreground/70 leading-relaxed">
 If you are applying as a Member, please execute your subscription transfer directly to our HDFC bank account:
 </p>
 
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
 <span className="font-semibold text-right">Sector -19, Dwarka, Delhi</span>
 </div>
 <div className="flex justify-between">
 <span className="text-foreground/50">IFSC Code:</span>
 <span className="font-semibold text-right">HDFC0004012</span>
 </div>
 </div>

 <div className="flex flex-col gap-2">
 <h5 className="font-semibold text-xs text-foreground">Cheque Sponsoring Address:</h5>
 <p className="text-[11px] text-foreground/60 leading-normal">
 Make Cheque in favor of &ldquo;Live 4 Help Foundation&rdquo; and mail to:<br />
 C-504, Sea Show CGHS Ltd. Plot No. 14, Sector -19B, Dwarka, New Delhi - 110075.
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}
