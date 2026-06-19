"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Sparkles, AlertCircle, Copy, Check, Info } from "lucide-react";

export default function Donate() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Calculator state
  const [cause, setCause] = useState<"education" | "plantation" | "general">("education");
  const [amount, setAmount] = useState(5000);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    panCard: "",
    address: "",
    state: "",
    postalCode: "",
    profession: "",
    company: "",
    amountFigure: "5000",
    amountWords: "Five Thousand Rupees Only",
    paymentMode: "NEFT",
    transactionId: "",
    purpose: "Education",
    suggestions: "",
    agree: false
  });

  const copyBankDetails = () => {
    const text = `Beneficiary: LIVE 4 HELP FOUNDATION\nAccount No: 50100392497716\nBank: HDFC Bank\nIFSC: HDFC0004012\nBranch: Sector-19, Dwarka, Delhi`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getImpactMessage = () => {
    if (cause === "education") {
      const students = Math.floor(amount / 5000);
      if (students >= 1) {
        return `Your donation will fully sponsor the annual tuition, admission fees, and study supplies of ${students} underprivileged student${students > 1 ? "s" : ""} in rural communities.`;
      } else {
        const months = Math.floor(amount / 400);
        return `Your donation will cover tuition coaching fees of a student for ${months || 1} month${months > 1 ? "s" : ""}.`;
      }
    } else if (cause === "plantation") {
      const trees = Math.floor(amount / 50);
      return `Your donation will sponsor the planting, fencing, and post-care of ${trees} resilient mangrove saplings in cyclonic stretches of coastal Sundarbans.`;
    } else {
      return `Your donation will fund primary diagnostics medical camps and winter blanket supplies for homeless daily wage workers during peak winter.`;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
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
          <div className="absolute inset-0 bg-[#FCFCFA]/10" />
        </div>

        {/* Floating Glassmorphism Hero Content Card */}
        <div className="max-w-4xl mx-auto w-full z-10 relative">
          <div className="bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-white/60 shadow-premium text-center flex flex-col items-center gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/60 flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full text-white/70 shadow-soft">
              <Heart className="w-4 h-4 text-secondary fill-secondary/20" />
              Selfless Sponsoring
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              Support a Purpose
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
              Sponsor a child&apos;s educational career, check a senior citizen&apos;s health, or restore storm buffers in the Sundarban.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator & Bank details Column */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Sponsoring Impact Calculator */}
          <div className="lg:col-span-7 p-8 md:p-12 rounded-[2.5rem] bg-white border border-foreground/5 shadow-soft flex flex-col justify-between gap-8 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
            <div className="flex flex-col gap-6">
              <h3 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Impact Calculator
              </h3>
              
              {/* Select Cause */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-foreground/60">Choose a Cause:</span>
                <div className="flex gap-2">
                  {[
                    { id: "education", label: "Education" },
                    { id: "plantation", label: "Mangroves" },
                    { id: "general", label: "Relief & Health" }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setCause(c.id as any); setAmount(c.id === "education" ? 5000 : c.id === "plantation" ? 1500 : 2500); }}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
                        cause === c.id ? "bg-foreground text-background shadow-soft" : "bg-foreground/5 text-foreground/75 hover:bg-foreground/10"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider / Sponsoring Amounts */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-foreground/60">Sponsorship Amount:</span>
                  <span className="text-3xl font-display font-bold text-foreground">Rs. {amount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={cause === "plantation" ? 250 : 500}
                  max={cause === "education" ? 50000 : 10000}
                  step={cause === "plantation" ? 50 : 500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-secondary h-1.5 bg-foreground/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-foreground/40 font-semibold uppercase">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>
            </div>

            {/* Calculated Impact Display */}
            <div className="p-6 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-start gap-4">
              <Info className="w-6 h-6 text-foreground/80 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Tangible Impact:</span>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {getImpactMessage()}
                </p>
              </div>
            </div>

          </div>

          {/* Sponsoring Bank details card */}
          <div className="lg:col-span-5 p-8 md:p-12 rounded-[2.5rem] glass-panel border border-white/60 shadow-soft flex flex-col justify-between gap-6 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
            <div className="flex flex-col gap-6">
              <h3 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                NEFT / RTGS Details
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Direct online transfer is our most preferred method as it incurs zero payment gateway fees. Sponsoring funds are directly credited:
              </p>

              <div className="flex flex-col gap-3 text-xs font-sans text-foreground/80 border-t border-b border-foreground/5 py-4">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Account Name:</span>
                  <span className="font-semibold text-right">LIVE 4 HELP FOUNDATION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Account Number:</span>
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
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={copyBankDetails}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Account Details"}
              </button>
              <div className="flex items-start gap-2.5 text-[10px] text-foreground/60 leading-normal">
                <AlertCircle className="w-4 h-4 shrink-0 text-foreground/40 mt-0.5" />
                <span>All donations to Live 4 Help Foundation are eligible for Tax Deductions under Section 80G of the Income Tax Act.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Donor Information Form */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] glass-panel border border-white/60 shadow-premium hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
          <div className="border-b border-foreground/5 pb-4 mb-8">
            <h3 className="font-display font-bold text-2xl text-foreground">Donor Information Form</h3>
            <p className="text-xs text-foreground/60 mt-1">Please fill in details post bank-transfer to generate your 80G tax receipt.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-accent-soft flex items-center justify-center shadow-soft">
                <Check className="w-8 h-8 text-foreground/80" />
              </div>
              <h3 className="font-display font-bold text-3xl text-foreground">Donor Information Sourced</h3>
              <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
                Thank you for your generous support! Our treasury will reconcile the bank receipt and generate your 80G tax deduction certificate and receipt, mailing it to your email address within 7 working days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Full Name</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">PAN Card Number</label>
                  <input
                    type="text" required
                    value={formData.panCard}
                    onChange={(e) => setFormData({ ...formData, panCard: e.target.value.toUpperCase() })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="E.g. ABCDE1234F (Mandatory for 80G)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Email ID</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="To receive receipt copy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Mobile</label>
                  <input
                    type="tel" required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-foreground/70">Postal Address</label>
                  <input
                    type="text" required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="Street Address, Area"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">State</label>
                  <input
                    type="text" required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="State"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Postal Code</label>
                  <input
                    type="text" required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="PIN Code"
                  />
                </div>
                
                {/* Donation details */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Donation Earmark Cause</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                  >
                    <option>Education</option>
                    <option>Healthcare Camps</option>
                    <option>Plantation Drives</option>
                    <option>Elderly Support</option>
                    <option>General Fund / Relief</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Payment Mode</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                  >
                    <option>NEFT / Online Transfer</option>
                    <option>Cheque / DD</option>
                    <option>UPI</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-foreground/70">Transaction ID / Cheque Number</label>
                  <input
                    type="text" required
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="Reference Reference ID (Mandatory for validation)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Amount Contributed (Rs)</label>
                  <input
                    type="number" required
                    value={formData.amountFigure}
                    onChange={(e) => setFormData({ ...formData, amountFigure: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="Figure in Rs"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-foreground/70">Amount in Words</label>
                  <input
                    type="text" required
                    value={formData.amountWords}
                    onChange={(e) => setFormData({ ...formData, amountWords: e.target.value })}
                    className="p-3.5 rounded-xl border border-foreground/10 bg-white/40 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                    placeholder="e.g. Five Thousand Rupees"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox" required id="donateAgree"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 accent-secondary"
                />
                <label htmlFor="donateAgree" className="text-xs text-foreground/70">
                  I declare that the information provided above is true and represents my direct voluntary transfer to Live 4 Help Foundation.
                </label>
              </div>

              <div className="flex justify-end pt-6 border-t border-foreground/5">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-foreground hover:bg-[#2c2c2c] transition-premium shadow-soft cursor-pointer"
                >
                  Submit Donation Receipt
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
