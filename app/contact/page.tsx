"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Sparkles } from "lucide-react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col w-full">
            {/* Intro Hero */}
            <section className="relative py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-foreground/5 text-center min-h-[90vh]">
                {/* Full-size Hero Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://live4help.org/wp-content/uploads/2021/11/Cloth-Distribution-Photo-3.jpg"
                        alt="Contact Hero"
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
                            Get in Touch
                        </span>
                        <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                            Contact Us
                        </h1>
                        <p className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans max-w-2xl">
                            Have an idea to share, want to partner, or need assistance? Write to our team or visit our office.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Grid */}
            <section className="py-8 px-6 md:px-12 bg-white pb-16">
                <div className="bg-[#FFF6ED] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                    {/* Contact Message Form */}
                    <div className="lg:col-span-7 p-8 md:p-12 rounded-[2.5rem] bg-white border border-foreground/5 shadow-premium hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                        <h3 className="font-display font-bold text-2xl text-foreground mb-6">Write to the Team</h3>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 flex flex-col items-center gap-6"
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-soft">
                                    <Check className="w-8 h-8 text-foreground/80" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-foreground">Message Sourced</h3>
                                <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
                                    Thank you for reaching out. We have logged your query and our office representative will get back to you shortly.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-foreground/70">Your Name</label>
                                        <input
                                            type="text" required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-foreground/70">Mobile Number</label>
                                        <input
                                            type="tel" required
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                                            placeholder="Contact phone"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label className="text-xs font-semibold text-foreground/70">Email ID</label>
                                        <input
                                            type="email" required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label className="text-xs font-semibold text-foreground/70">Subject</label>
                                        <input
                                            type="text" required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                                            placeholder="Topic of conversation"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label className="text-xs font-semibold text-foreground/70">Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="p-3.5 rounded-xl border border-foreground/10 focus:outline-none focus:border-secondary text-sm font-sans hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300"
                                            placeholder="Write your suggestions or questions..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Office Cards & Map Column */}
                    <div className="lg:col-span-5 flex flex-col gap-8">

                        {/* Info Card */}
                        <div className="p-8 rounded-3xl bg-white border border-foreground/5 shadow-soft flex flex-col gap-6 hover:-translate-y-2 hover:border-primary hover:shadow-premium transition-all duration-300">
                            <h3 className="font-display font-bold text-2xl text-foreground">Office Coordinates</h3>

                            <div className="flex flex-col gap-5 text-sm text-foreground/75 leading-relaxed">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-soft">
                                        <MapPin className="w-5 h-5 text-foreground/80" />
                                    </div>
                                    <span className="pt-1.5">
                                        <strong>LIVE 4 HELP FOUNDATION</strong><br />
                                        C-504, Sea Show CGHS Ltd.<br />
                                        Plot No. 14, Sector -19B, Dwarka,<br />
                                        New Delhi - 110075, India
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-soft">
                                        <Phone className="w-5 h-5 text-foreground/80" />
                                    </div>
                                    <div className="flex flex-col">
                                        <a href="tel:+919810745206" className="hover:text-foreground transition-colors font-medium">
                                            +91-9810745206
                                        </a>
                                        <a href="tel:+919313241727" className="hover:text-foreground transition-colors font-medium text-xs text-foreground/60">
                                            +91-9313241727
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-soft-yellow flex items-center justify-center shrink-0 shadow-soft">
                                        <Mail className="w-5 h-5 text-foreground/80" />
                                    </div>
                                    <a href="mailto:live4help.org@gmail.com" className="hover:text-foreground transition-colors font-medium break-all">
                                        live4help.org@gmail.com
                                    </a>
                                </div>

                                <div className="flex items-center gap-4 border-t border-foreground/5 pt-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-soft">
                                        <svg className="w-5 h-5 text-foreground/80 shrink-0 fill-current" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </div>
                                    <a
                                        href="https://www.facebook.com/live4help.org/?ref=page_internal"
                                        target="_blank" rel="noopener noreferrer"
                                        className="text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors"
                                    >
                                        View Facebook Profile
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Iframe */}
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-foreground/5 shadow-soft relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.9464528131336!2d77.0182606!3d28.586358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1af8d8a01bf7%3A0xe54e38c946261536!2sSector%2019%20Dwarka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Live 4 Help Foundation office location at Sector 19B Dwarka"
                            ></iframe>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}
