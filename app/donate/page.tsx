"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Check, Copy, AlertCircle, BookOpen, HeartHandshake, Users, Sparkles, Leaf, Shield, Download, Mail, Phone
} from "lucide-react";

type PaymentTab = "upi" | "neft" | "cheque";

export default function Donate() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // Selection State
  const [selectedAmount, setSelectedAmount] = useState<number | "other">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("Education");
  
  // Payment Tab State
  const [paymentTab, setPaymentTab] = useState<PaymentTab>("upi");

  // Form State
  const [formData, setFormData] = useState({
    title: "Mr.",
    name: "",
    mobile: "",
    email: "",
    state: "",
    address: "",
    postalCode: "",
    paymentMode: "UPI",
    dateOfPayment: "",
    transactionId: "",
    suggestions: "",
    panCard: ""
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const amounts: { value: number | "other"; label: string }[] = [
    { value: 500, label: "School supplies" },
    { value: 1000, label: "Medical kit" },
    { value: 2500, label: "Monthly support" },
    { value: "other", label: "Custom amount" }
  ];

  const purposes = [
    { id: "Education", icon: BookOpen, label: "Education" },
    { id: "Health Care", icon: HeartHandshake, label: "Health Care" },
    { id: "Elderly Care", icon: Users, label: "Elderly Care" },
    { id: "Women Empowerment", icon: Sparkles, label: "Women Empowerment" },
    { id: "Plantation", icon: Leaf, label: "Plantation" },
    { id: "Relief Work", icon: Shield, label: "Relief Work" },
  ];

  return (
    <div className="flex flex-col w-full bg-background font-sans">
      {/* Intro Header */}
      <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[50vh]">
        {/* Full-size Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://live4help.org/wp-content/uploads/2023/07/Blanket-Distribution-4.jpeg"
            alt="Donate Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="w-full text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 px-4 py-1.5 rounded-full shadow-soft bg-[#DCCFF8] text-[#444444]">
              <Heart className="w-4 h-4 text-[#444444]" />
              Selfless Sponsoring
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Support Live 4 Help Foundation
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
              Your donation helps us support education, elderly care, health care, plantation, and relief work across Delhi NCR.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-6 md:px-12 bg-[#FCFCFA] pb-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Step 1: Selection Cards */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-foreground/5 shadow-soft flex flex-col gap-10">
            {/* Amount Selection */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display font-bold text-xl text-foreground">How much would you like to give?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amounts.map((amt) => {
                  const isSelected = selectedAmount === amt.value;
                  return (
                    <button
                      key={amt.value}
                      onClick={() => setSelectedAmount(amt.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        isSelected 
                        ? "border-[#DCCFF8] bg-[#F3EFFF]" 
                        : "border-foreground/5 hover:border-foreground/15 bg-white"
                      }`}
                    >
                      <span className={`font-display font-bold text-lg ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                        {amt.value === "other" ? "Other" : `₹${amt.value.toLocaleString()}`}
                      </span>
                      <span className={`text-xs mt-1 ${isSelected ? "text-foreground/70" : "text-foreground/50"}`}>
                        {amt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {selectedAmount === "other" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 mt-2 border-b-2 border-[#DCCFF8] pb-2 w-full md:w-1/3">
                      <span className="font-display font-bold text-xl text-foreground/50">₹</span>
                      <input 
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full bg-transparent border-none outline-none font-display font-bold text-xl text-foreground"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Purpose Selection */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display font-bold text-xl text-foreground">Where should we use your donation?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {purposes.map((purpose) => {
                  const isSelected = selectedPurpose === purpose.id;
                  const Icon = purpose.icon;
                  return (
                    <button
                      key={purpose.id}
                      onClick={() => setSelectedPurpose(purpose.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 gap-3 text-center ${
                        isSelected 
                        ? "border-[#DCCFF8] bg-[#F3EFFF]" 
                        : "border-foreground/5 hover:border-foreground/15 bg-white"
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-white shadow-soft text-[#444444]" : "bg-foreground/5 text-foreground/60"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className={`text-xs font-semibold leading-tight ${isSelected ? "text-foreground" : "text-foreground/70"}`}>
                        {purpose.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Payment Methods */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-foreground/5 shadow-soft flex flex-col gap-8">
            <h3 className="font-display font-bold text-2xl text-foreground">Payment methods</h3>
            
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-foreground/10 pb-4">
              <button
                onClick={() => setPaymentTab("upi")}
                className={`relative px-4 py-2 font-semibold text-sm transition-colors ${paymentTab === "upi" ? "text-foreground" : "text-foreground/50 hover:text-foreground/80"}`}
              >
                UPI / Online
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-[#DCCFF8] text-[#444444]">
                  Recommended
                </span>
                {paymentTab === "upi" && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-foreground rounded-t-full" />}
              </button>
              
              <button
                onClick={() => setPaymentTab("neft")}
                className={`relative px-4 py-2 font-semibold text-sm transition-colors ${paymentTab === "neft" ? "text-foreground" : "text-foreground/50 hover:text-foreground/80"}`}
              >
                NEFT / RTGS
                {paymentTab === "neft" && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-foreground rounded-t-full" />}
              </button>

              <button
                onClick={() => setPaymentTab("cheque")}
                className={`relative px-4 py-2 font-semibold text-sm transition-colors ${paymentTab === "cheque" ? "text-foreground" : "text-foreground/50 hover:text-foreground/80"}`}
              >
                Cheque / DD
                {paymentTab === "cheque" && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-foreground rounded-t-full" />}
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-2 min-h-[200px]">
              <AnimatePresence mode="wait">
                {/* UPI Tab */}
                {paymentTab === "upi" && (
                  <motion.div 
                    key="upi"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col md:flex-row gap-8 items-start"
                  >
                    <div className="w-40 h-40 bg-foreground/5 rounded-2xl border border-foreground/10 border-dashed flex items-center justify-center text-xs text-foreground/40 font-semibold text-center p-4 shrink-0">
                      UPI QR<br/>CODE<br/>HERE
                    </div>
                    <div className="flex flex-col gap-6 pt-4">
                      <p className="text-sm text-foreground/80">Scan to pay, then complete the form below.</p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-3 bg-foreground/5 rounded-xl font-mono text-sm text-foreground font-semibold">
                          live4help@hdfcbank
                        </div>
                        <button 
                          onClick={() => handleCopy("live4help@hdfcbank", "upi")}
                          className="px-6 py-3 bg-[#DCCFF8] text-[#444444] rounded-xl font-semibold text-sm hover:bg-[#c9bbf2] transition-colors flex items-center justify-center min-w-[90px]"
                        >
                          {copiedField === "upi" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <a href="#" className="text-xs text-foreground/60 underline hover:text-foreground transition-colors mt-2 flex items-center gap-1 w-fit">
                        Prefer to donate offline? Download donor information form (PDF)
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* NEFT Tab */}
                {paymentTab === "neft" && (
                  <motion.div 
                    key="neft"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-0 border-y border-foreground/5">
                      {[
                        { label: "Beneficiary", value: "LIVE 4 HELP FOUNDATION", id: "bene" },
                        { label: "Account No.", value: "50100392497716", id: "acc" },
                        { label: "Bank", value: "HDFC", id: "bank", nocopy: true },
                        { label: "Branch", value: "Sector 11, Dwarka, New Delhi - 110075", id: "branch", nocopy: true },
                        { label: "IFSC Code", value: "HDFC0001338", id: "ifsc" },
                        { label: "MICR Code", value: "110240148", id: "micr" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-4 border-b border-foreground/5 last:border-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 md:gap-4 items-center">
                            <span className="text-sm text-foreground/50">{item.label}</span>
                            <span className="text-sm font-semibold text-foreground md:col-span-2">{item.value}</span>
                          </div>
                          {!item.nocopy && (
                            <button 
                              onClick={() => handleCopy(item.value, item.id)}
                              className="px-4 py-2 bg-[#CFE8FF] text-[#444444] rounded-lg font-semibold text-xs hover:bg-[#b8daff] transition-colors shrink-0 min-w-[70px] flex justify-center"
                            >
                              {copiedField === item.id ? "Copied" : "Copy"}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-foreground/60">Use your name and mobile number as the payment reference.</p>
                      <a href="#" className="text-xs text-foreground/60 underline hover:text-foreground transition-colors w-fit">
                        Prefer to donate offline? Download donor information form (PDF)
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Cheque Tab */}
                {paymentTab === "cheque" && (
                  <motion.div 
                    key="cheque"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="bg-[#F5FAF5] p-6 rounded-2xl border border-foreground/5 flex flex-col gap-4 text-sm text-foreground/80 leading-relaxed">
                      <p>
                        Please make a cheque/DD in favour of:<br/>
                        <strong className="text-foreground text-base">Live 4 Help Foundation</strong>
                      </p>
                      <div className="h-px w-full bg-foreground/10 my-2" />
                      <p>
                        Mail to:<br/>
                        <strong className="text-foreground">LIVE 4 HELP FOUNDATION</strong><br/>
                        C-504, Sea Show CGHS Ltd.<br/>
                        Plot No. 14, Sector -19B, Dwarka<br/>
                        New Delhi - 110075
                      </p>
                      <div className="h-px w-full bg-foreground/10 my-2" />
                      <p>
                        Phone: <a href="tel:+91-9810745206" className="text-blue-600 hover:underline">+91-9810745206</a>, <a href="tel:+91-9313241727" className="text-blue-600 hover:underline">+91-9313241727</a><br/>
                        Email: <a href="mailto:live4help.org@gmail.com" className="text-blue-600 hover:underline">live4help.org@gmail.com</a>
                      </p>
                    </div>
                    <a href="#" className="text-xs text-foreground/60 underline hover:text-foreground transition-colors w-fit">
                      Prefer to donate offline? Download donor information form (PDF)
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Step 3: Receipt Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-foreground/5 shadow-soft flex flex-col gap-8 mb-12">
            <div className="flex flex-col gap-2 border-b border-foreground/5 pb-6">
              <h3 className="font-display font-bold text-2xl text-foreground">After you pay — help us send your receipt</h3>
              <p className="text-sm text-foreground/70">Thank you for your generosity. Please share a few details after making your payment so we can issue your receipt.</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#DCCFF8] text-[#444444] shadow-soft">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-3xl text-foreground">Details Submitted Successfully</h3>
                <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                  Our treasury will reconcile the bank receipt and generate your 80G tax deduction certificate. We will email it to you within 7 working days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                
                {/* Title Selection */}
                <div className="flex items-center gap-6">
                  {["Mr.", "Mrs.", "Ms."].map(title => (
                    <label key={title} className="flex items-center gap-2 cursor-pointer text-sm text-foreground/80">
                      <input 
                        type="radio" 
                        name="title"
                        value={title}
                        checked={formData.title === title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="accent-[#444444] w-4 h-4"
                      />
                      {title}
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Your Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full name" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Mobile *</label>
                    <input type="tel" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="10-digit mobile" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Email *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="For receipt" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">State *</label>
                    <input type="text" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-semibold text-foreground/70">Address *</label>
                    <textarea required rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Full address" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm resize-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Postal Code *</label>
                    <input type="text" required value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} placeholder="" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Amount in Figure (Rs.) *</label>
                    <input 
                      type="text" required 
                      value={selectedAmount !== "other" ? selectedAmount : customAmount} 
                      readOnly 
                      className="p-3.5 rounded-xl border border-foreground/10 bg-foreground/5 outline-none text-sm text-foreground/60 cursor-not-allowed" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Mode of Payment *</label>
                    <select required value={formData.paymentMode} onChange={e => setFormData({...formData, paymentMode: e.target.value})} className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm bg-white">
                      <option>UPI</option>
                      <option>NEFT / RTGS</option>
                      <option>Cheque / DD</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Donation Purpose *</label>
                    <input 
                      type="text" required 
                      value={selectedPurpose} 
                      readOnly 
                      className="p-3.5 rounded-xl border border-foreground/10 bg-foreground/5 outline-none text-sm text-foreground/60 cursor-not-allowed" 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Date of Payment *</label>
                    <input type="date" required value={formData.dateOfPayment} onChange={e => setFormData({...formData, dateOfPayment: e.target.value})} className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-foreground/70">Transaction / UTR No. *</label>
                    <input type="text" required value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})} placeholder="Required for UPI/NEFT" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <details className="group">
                    <summary className="text-xs font-semibold text-foreground/70 cursor-pointer list-none flex items-center gap-2 hover:text-foreground transition-colors">
                      <span className="w-4 h-4 flex items-center justify-center bg-foreground/10 rounded-full text-[10px] group-open:rotate-90 transition-transform">▶</span>
                      Additional details for 80G receipt (optional)
                    </summary>
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-foreground/70">PAN Card Number</label>
                        <input type="text" value={formData.panCard} onChange={e => setFormData({...formData, panCard: e.target.value.toUpperCase()})} placeholder="E.g. ABCDE1234F" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm" />
                      </div>
                    </div>
                  </details>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Suggestions (optional)</label>
                  <textarea rows={2} value={formData.suggestions} onChange={e => setFormData({...formData, suggestions: e.target.value})} placeholder="Any message" className="p-3.5 rounded-xl border border-foreground/10 focus:border-[#DCCFF8] outline-none transition-colors text-sm resize-none" />
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-wider bg-[#CFE8FF] text-[#444444] hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer">
                    Submit donation details
                  </button>
                </div>

              </form>
            )}

            {/* Form Footer Status */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 mt-2 border-t border-foreground/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DCCFF8]/30 flex items-center justify-center text-[#444444]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Receipt in 7 days</span>
                  <span className="text-xs text-foreground/60">Sent to your email</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center text-[#444444]">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">80G available</span>
                  <span className="text-xs text-foreground/60">Provide PAN for tax receipt</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#CFE8FF]/40 flex items-center justify-center text-[#444444]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Need help?</span>
                  <a href="tel:+919810745206" className="text-xs text-blue-600 hover:underline">+91-9810745206</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
