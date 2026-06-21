"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, HeartHandshake, ShieldAlert, Compass, Check, AlertCircle, Sparkles, Send } from "lucide-react";

type FormType = "education" | "medical" | "elderly" | "eachother";

export default function GetHelp() {
 const [activeForm, setActiveForm] = useState<FormType>("education");
 const [submitted, setSubmitted] = useState(false);

 // Forms state
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
 totalCost: "",
 otherSupport: "",
 accountNo: "",
 ifsc: "",
 passbookRef: "",
 agree: false
 });

 const [medData, setMedData] = useState({
 name: "",
 gender: "Male",
 dob: "",
 address: "",
 state: "",
 postalCode: "",
 mobile: "",
 email: "",
 language: "English",
 idProof: "",
 healthStatus: "",
 supportTypes: [] as string[],
 otherSupport: "",
 reason: "",
 agree: false
 });

 const [elderlyData, setElderlyData] = useState({
 name: "",
 gender: "Male",
 age: "",
 address: "",
 mobile: "",
 email: "",
 livingStatus: "Single", // Single, With Spouse, With Children
 language: "English",
 emergencyContact: "",
 supportTypes: [] as string[],
 otherSupport: "",
 suggestions: "",
 agree: false
 });

 const [eachOtherData, setEachOtherData] = useState({
 category: "Help Offered", // Help Offered, Help Required
 name: "",
 gender: "Male",
 age: "",
 dob: "",
 address: "",
 state: "",
 postalCode: "",
 mobile: "",
 email: "",
 language: "English",
 helpTypes: [] as string[],
 suggestions: "",
 agree: false
 });

 const handleMedSupportToggle = (type: string) => {
 if (medData.supportTypes.includes(type)) {
 setMedData({ ...medData, supportTypes: medData.supportTypes.filter(t => t !== type) });
 } else {
 setMedData({ ...medData, supportTypes: [...medData.supportTypes, type] });
 }
 };

 const handleElderlySupportToggle = (type: string) => {
 if (elderlyData.supportTypes.includes(type)) {
 setElderlyData({ ...elderlyData, supportTypes: elderlyData.supportTypes.filter(t => t !== type) });
 } else {
 setElderlyData({ ...elderlyData, supportTypes: [...elderlyData.supportTypes, type] });
 }
 };

 const handleEachOtherToggle = (type: string) => {
 if (eachOtherData.helpTypes.includes(type)) {
 setEachOtherData({ ...eachOtherData, helpTypes: eachOtherData.helpTypes.filter(t => t !== type) });
 } else {
 setEachOtherData({ ...eachOtherData, helpTypes: [...eachOtherData.helpTypes, type] });
 }
 };

 const handleFormSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 };

 return (
 <div className="flex flex-col w-full">
 {/* Intro Header */}
 <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
 {/* Full-size Hero Background */}
 <div className="absolute inset-0 z-0">
 <img
 src="https://live4help.org/wp-content/uploads/2024/02/Bankura-Student-Sila.jpg"
 alt="Get Help Hero"
 referrerPolicy="no-referrer"
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/20" />
 </div>

 {/* Floating Glassmorphism Hero Content Card */}
 <div className="max-w-4xl mx-auto w-full z-10 relative">
 <div className="w-full text-center flex flex-col items-center gap-6">
 <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
 <HeartHandshake className="w-4 h-4 text-[#444444]" />
 Request Sponsoring Support
 </span>
 <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
 Get Support
 </h1>
 <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
 If you are seeking support or know an underprivileged student, senior citizen, or family in need, please complete the respective application flow below.
 </p>

 {/* Tab selector */}
 <div className="flex flex-wrap justify-center p-1.5 rounded-[2rem] shadow-soft border border-foreground/5 mt-2 max-w-2xl w-full mx-auto hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 {[
 { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
 { id: "medical", label: "Medical Help", icon: <HeartHandshake className="w-3.5 h-3.5" /> },
 { id: "elderly", label: "Elderly Care", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
 { id: "eachother", label: "Help Each Other", icon: <Compass className="w-3.5 h-3.5" /> }
 ].map((tab) => (
 <button
 type="button"
 key={tab.id}
 onClick={() => { setActiveForm(tab.id as FormType); setSubmitted(false); }}
 className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-2xl transition-premium cursor-pointer ${
 activeForm === tab.id
 ? "bg-foreground text-background shadow-soft"
 : "text-white/65 hover:text-white hover:"
 }`}
 >
 {tab.icon}
 {tab.label}
 </button>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Forms Content Container */}
 <section className="py-8 px-6 md:px-12 bg-white pb-16">
 <div className="bg-[#FFF6ED] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] glass-panel border border-white/60 shadow-premium hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
 {submitted ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-center py-12 flex flex-col items-center gap-6"
 >
 <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-soft">
 <Check className="w-8 h-8 text-foreground/80" />
 </div>
 <h3 className="font-display font-bold text-3xl text-foreground">Support Request Sourced</h3>
 <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
 Your support application has been logged successfully. The Live 4 Help operations team and local coordinators will verify the details and coordinate the required verification visits.
 </p>
 <div className="p-4 rounded-xl border border-accent/20 text-xs text-foreground/80 text-left max-w-md flex items-start gap-2">
 <AlertCircle className="w-4 h-4 text-foreground/60 shrink-0 mt-0.5" />
 <span>We require verification visits or school teacher confirmation calls before disbursing fees directly to institutions.</span>
 </div>
 </motion.div>
 ) : (
 <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
 
 {/* Form 1: Educational Support Form */}
 {activeForm === "education" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
 <div className="border-b border-foreground/5 pb-4">
 <h3 className="font-display font-bold text-2xl text-foreground">Educational Support Form</h3>
 <p className="text-xs text-foreground/60 mt-1">Please provide student details, school information, and amount itemization.</p>
 </div>

 {/* Student Details */}
 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">1. Student & Family Details</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Student Name</label>
 <input
 type="text" required
 value={eduData.studentName}
 onChange={(e) => setEduData({ ...eduData, studentName: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Student full name"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Class</label>
 <input
 type="text" required
 value={eduData.className}
 onChange={(e) => setEduData({ ...eduData, className: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. Class X"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Gender</label>
 <select
 value={eduData.gender}
 onChange={(e) => setEduData({ ...eduData, gender: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <option>Male</option>
 <option>Female</option>
 <option>Others</option>
 </select>
 </div>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Parent / Guardian Name</label>
 <input
 type="text" required
 value={eduData.parentName}
 onChange={(e) => setEduData({ ...eduData, parentName: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Parent name"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Annual Household Income (Rs)</label>
 <input
 type="number" required
 value={eduData.annualIncome}
 onChange={(e) => setEduData({ ...eduData, annualIncome: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Income in rupees"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Mobile</label>
 <input
 type="tel" required
 value={eduData.mobile}
 onChange={(e) => setEduData({ ...eduData, mobile: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Contact phone number"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Email ID</label>
 <input
 type="email"
 value={eduData.email}
 onChange={(e) => setEduData({ ...eduData, email: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Email (Optional)"
 />
 </div>
 </div>
 </div>

 {/* Institution Details */}
 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">2. Institution Details</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2 sm:col-span-2">
 <label className="text-xs font-semibold text-foreground/70">School / College Name</label>
 <input
 type="text" required
 value={eduData.schoolName}
 onChange={(e) => setEduData({ ...eduData, schoolName: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Full school name"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Headmaster / Class Teacher Name</label>
 <input
 type="text" required
 value={eduData.teacherName}
 onChange={(e) => setEduData({ ...eduData, teacherName: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Teacher reference name"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Teacher Contact Phone</label>
 <input
 type="tel" required
 value={eduData.teacherPhone}
 onChange={(e) => setEduData({ ...eduData, teacherPhone: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Teacher phone number"
 />
 </div>
 </div>
 </div>

 {/* Support Details */}
 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">3. Support Amount Details</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Admission Fee (Rs)</label>
 <input
 type="number"
 value={eduData.admissionFee}
 onChange={(e) => setEduData({ ...eduData, admissionFee: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Annual admission fee"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Annual Tuition Fee (Rs)</label>
 <input
 type="number"
 value={eduData.tuitionFee}
 onChange={(e) => setEduData({ ...eduData, tuitionFee: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Ad-hoc tuition fee"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Book Purchase Cost (Rs)</label>
 <input
 type="number"
 value={eduData.booksCost}
 onChange={(e) => setEduData({ ...eduData, booksCost: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Books & syllabus"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Stationery Cost (Rs)</label>
 <input
 type="number"
 value={eduData.stationeryCost}
 onChange={(e) => setEduData({ ...eduData, stationeryCost: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Pens, copies, school bags"
 />
 </div>
 </div>
 </div>

 {/* Bank Details */}
 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">4. Bank Details of Student</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Account Number</label>
 <input
 type="text" required
 value={eduData.accountNo}
 onChange={(e) => setEduData({ ...eduData, accountNo: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Bank account number"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">IFSC Code</label>
 <input
 type="text" required
 value={eduData.ifsc}
 onChange={(e) => setEduData({ ...eduData, ifsc: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="IFSC code"
 />
 </div>
 </div>
 <div className="p-4 rounded-xl bg-foreground/[0.03] border border-foreground/5 text-[11px] text-foreground/60 flex items-start gap-2">
 <AlertCircle className="w-4 h-4 shrink-0 text-foreground/40 mt-0.5" />
 <span>Note: Please attach a photocopy of the student bank passbook during coordinate verification checks.</span>
 </div>
 </div>

 <div className="flex items-start gap-3">
 <input
 type="checkbox" required id="eduAgree"
 checked={eduData.agree}
 onChange={(e) => setEduData({ ...eduData, agree: e.target.checked })}
 className="mt-1 accent-secondary"
 />
 <label htmlFor="eduAgree" className="text-xs text-foreground/70">
 I declare that above information is correct to the best of my knowledge and I am unable to arrange funds for the purpose stated above.
 </label>
 </div>
 </motion.div>
 )}

 {/* Form 2: Medical Support Form */}
 {activeForm === "medical" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
 <div className="border-b border-foreground/5 pb-4">
 <h3 className="font-display font-bold text-2xl text-foreground">Medical Support Form</h3>
 <p className="text-xs text-foreground/60 mt-1">Request financial support for clinical checkups, diagnostics, or medicine costs.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Patient Name</label>
 <input
 type="text" required
 value={medData.name}
 onChange={(e) => setMedData({ ...medData, name: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Patient full name"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Gender</label>
 <select
 value={medData.gender}
 onChange={(e) => setMedData({ ...medData, gender: e.target.value })}
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
 type="date" required
 value={medData.dob}
 onChange={(e) => setMedData({ ...medData, dob: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 />
 </div>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Mobile</label>
 <input
 type="tel" required
 value={medData.mobile}
 onChange={(e) => setMedData({ ...medData, mobile: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Contact phone"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Email ID</label>
 <input
 type="email"
 value={medData.email}
 onChange={(e) => setMedData({ ...medData, email: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Email (Optional)"
 />
 </div>
 </div>

 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">Type of Support Required</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {["Medicines", "Medical Tests", "Medical Treatment", "Doctor Consultation (Offline)", "Doctor Consultation (Online)"].map((type) => (
 <div
 key={type}
 onClick={() => handleMedSupportToggle(type)}
 className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-premium text-sm ${
 medData.supportTypes.includes(type)
 ? " border-secondary text-foreground font-semibold"
 : "border-foreground/10 hover: text-foreground/80"
 }`}
 >
 <span>{type}</span>
 {medData.supportTypes.includes(type) && <Check className="w-4 h-4 text-secondary shrink-0" />}
 </div>
 ))}
 </div>
 </div>

 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Reason for Support Requirement</label>
 <textarea
 required
 value={medData.reason}
 onChange={(e) => setMedData({ ...medData, reason: e.target.value })}
 rows={4}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm font-sans hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Brief description of medical history and financial constraint..."
 />
 </div>

 <div className="flex items-start gap-3">
 <input
 type="checkbox" required id="medAgree"
 checked={medData.agree}
 onChange={(e) => setMedData({ ...medData, agree: e.target.checked })}
 className="mt-1 accent-secondary"
 />
 <label htmlFor="medAgree" className="text-xs text-foreground/70">
 I declare that above information is correct to the best of my knowledge and I am unable to arrange funds for the purpose stated above.
 </label>
 </div>
 </motion.div>
 )}

 {/* Form 3: Elderly Support Form */}
 {activeForm === "elderly" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
 <div className="border-b border-foreground/5 pb-4">
 <h3 className="font-display font-bold text-2xl text-foreground">Elderly Support Form</h3>
 <p className="text-xs text-foreground/60 mt-1">Apply for weekly companionship, digital services training, or doctor consultation support.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Full Name</label>
 <input
 type="text" required
 value={elderlyData.name}
 onChange={(e) => setElderlyData({ ...elderlyData, name: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Applicant name"
 />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Age</label>
 <input
 type="number" required
 value={elderlyData.age}
 onChange={(e) => setElderlyData({ ...elderlyData, age: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="e.g. 68"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Living Status</label>
 <select
 value={elderlyData.livingStatus}
 onChange={(e) => setElderlyData({ ...elderlyData, livingStatus: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 >
 <option>Single</option>
 <option>With Spouse</option>
 <option>With Children</option>
 </select>
 </div>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Emergency Contact Number</label>
 <input
 type="tel" required
 value={elderlyData.emergencyContact}
 onChange={(e) => setElderlyData({ ...elderlyData, emergencyContact: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Relative or neighbor phone"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Mobile</label>
 <input
 type="tel" required
 value={elderlyData.mobile}
 onChange={(e) => setElderlyData({ ...elderlyData, mobile: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Mobile Number"
 />
 </div>
 </div>

 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">Type of Support Required</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 "Emotional support by regular conversation (weekly/daily)",
 "Familiarisation with online services",
 "Doctor's Consultation (Offline)",
 "Doctor's Consultation (Online)"
 ].map((type) => (
 <div
 key={type}
 onClick={() => handleElderlySupportToggle(type)}
 className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-premium text-sm ${
 elderlyData.supportTypes.includes(type)
 ? " border-secondary text-foreground font-semibold"
 : "border-foreground/10 hover: text-foreground/80"
 }`}
 >
 <span className="pr-4 leading-normal">{type}</span>
 {elderlyData.supportTypes.includes(type) && <Check className="w-4 h-4 text-secondary shrink-0" />}
 </div>
 ))}
 </div>
 </div>

 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Suggestions / Other Support Requirements</label>
 <textarea
 value={elderlyData.suggestions}
 onChange={(e) => setElderlyData({ ...elderlyData, suggestions: e.target.value })}
 rows={3}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm font-sans hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Share your specific thoughts..."
 />
 </div>

 <div className="flex items-start gap-3">
 <input
 type="checkbox" required id="elderlyAgree"
 checked={elderlyData.agree}
 onChange={(e) => setElderlyData({ ...elderlyData, agree: e.target.checked })}
 className="mt-1 accent-secondary"
 />
 <label htmlFor="elderlyAgree" className="text-xs text-foreground/70">
 I declare that above information is correct to the best of my knowledge.
 </label>
 </div>
 </motion.div>
 )}

 {/* Form 4: Help Each Other Form */}
 {activeForm === "eachother" && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
 <div className="border-b border-foreground/5 pb-4">
 <h3 className="font-display font-bold text-2xl text-foreground">Help Each Other Form</h3>
 <p className="text-xs text-foreground/60 mt-1">A platform connecting those who can offer materials/services directly with those in need.</p>
 </div>

 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Category</label>
 <div className="flex gap-4">
 {["Help Offered", "Help Required"].map((cat) => (
 <label key={cat} className="flex items-center gap-2 text-sm text-foreground/85 cursor-pointer">
 <input
 type="radio"
 name="eachotherCategory"
 value={cat}
 checked={eachOtherData.category === cat}
 onChange={(e) => setEachOtherData({ ...eachOtherData, category: e.target.value })}
 className="accent-secondary"
 />
 {cat}
 </label>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Name</label>
 <input
 type="text" required
 value={eachOtherData.name}
 onChange={(e) => setEachOtherData({ ...eachOtherData, name: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Your full name"
 />
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-xs font-semibold text-foreground/70">Mobile</label>
 <input
 type="tel" required
 value={eachOtherData.mobile}
 onChange={(e) => setEachOtherData({ ...eachOtherData, mobile: e.target.value })}
 className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
 placeholder="Mobile Number"
 />
 </div>
 </div>

 <div className="flex flex-col gap-4">
 <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground/50">Support Items</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {["Ration / Food", "Clothes / Blankets", "Books / Study Material", "Electronic Gadgets (phone, laptop)", "Blood Donate / Receive", "Doctor Consultation Online"].map((type) => (
 <div
 key={type}
 onClick={() => handleEachOtherToggle(type)}
 className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-premium text-sm ${
 eachOtherData.helpTypes.includes(type)
 ? " border-secondary text-foreground font-semibold"
 : "border-foreground/10 hover: text-foreground/80"
 }`}
 >
 <span>{type}</span>
 {eachOtherData.helpTypes.includes(type) && <Check className="w-4 h-4 text-secondary shrink-0" />}
 </div>
 ))}
 </div>
 </div>

 <div className="flex items-start gap-3">
 <input
 type="checkbox" required id="eachAgree"
 checked={eachOtherData.agree}
 onChange={(e) => setEachOtherData({ ...eachOtherData, agree: e.target.checked })}
 className="mt-1 accent-secondary"
 />
 <label htmlFor="eachAgree" className="text-xs text-foreground/70">
 I declare that above information is true to the best of my knowledge.
 </label>
 </div>
 </motion.div>
 )}

 {/* Submit Button */}
 <div className="pt-6 border-t border-foreground/5 flex justify-end">
 <button
 type="submit"
 className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
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
