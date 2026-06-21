import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#F5F2FC] border-t border-blue-950/5 py-16 md:py-24 font-sans text-blue-950">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                {/* Info Column */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center group w-fit">
                        <div className="bg-white p-3 rounded-2xl shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                            <img
                                src="https://live4help.org/wp-content/uploads/2021/01/live4help-01-01-01-scaled.jpg"
                                alt="Live 4 Help Foundation Logo"
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                    </Link>
                    <p className="text-sm text-blue-950/70 leading-relaxed max-w-sm">
                        Live 4 Help Foundation is a Non-Profit Organization registered under the Ministry of Corporate Affairs, Govt. of India. Selfless service with honesty, integrity, accountability, and transparency.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="https://www.facebook.com/live4help.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#CFE8FF] hover:text-[#444444] transition-all duration-300 text-blue-950 shadow-soft hover:-translate-y-1"
                            aria-label="Facebook"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/live4helpfoundation/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#DCCFF8] hover:text-[#444444] transition-all duration-300 text-blue-950 shadow-soft hover:-translate-y-1"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/live4help-foundation-ngo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#b8daff] hover:text-[#444444] transition-all duration-300 text-blue-950 shadow-soft hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </a>
                        {/* Mail Shortcut */}
                        <a
                            href="mailto:live4help.org@gmail.com"
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FDF8F5] hover:text-[#444444] transition-all duration-300 text-blue-950 shadow-soft hover:-translate-y-1"
                            aria-label="Email Us"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-950/80">
                        Quick Links
                    </h4>
                    <nav className="flex flex-col gap-3.5 text-sm text-blue-950/75">
                        <Link href="/" className="hover:text-blue-950 transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-blue-950 transition-colors">About Us</Link>
                        <Link href="/impact" className="hover:text-blue-950 transition-colors">Our Impact</Link>
                        <Link href="/initiatives" className="hover:text-blue-950 transition-colors">Initiatives</Link>
                        <Link href="/gallery" className="hover:text-blue-950 transition-colors">Photo Gallery</Link>
                        <Link href="/testimonials" className="hover:text-blue-950 transition-colors">Testimonials</Link>
                        <Link href="/blog" className="hover:text-blue-950 transition-colors">Magazine / News</Link>
                        <Link href="/students" className="hover:text-blue-950 transition-colors">Students</Link>
                        <Link href="/transparency" className="hover:text-blue-950 transition-colors">Transparency & Reports</Link>
                    </nav>
                </div>

                {/* Support Forms & Involve Column */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-950/80">
                        Get Involved
                    </h4>
                    <nav className="flex flex-col gap-3.5 text-sm text-blue-950/75">
                        <Link href="/volunteer" className="hover:text-blue-950 transition-colors">Become a Volunteer</Link>
                        <Link href="/volunteer" className="hover:text-blue-950 transition-colors">Become a Member</Link>
                        <Link href="/get-help" className="hover:text-blue-950 transition-colors">Request Educational Help</Link>
                        <Link href="/get-help" className="hover:text-blue-950 transition-colors">Request Medical Help</Link>
                        <Link href="/get-help" className="hover:text-blue-950 transition-colors">Elderly Citizen Care</Link>
                        <Link href="/donate" className="hover:text-blue-950 transition-colors flex items-center gap-1.5 font-medium">
                            <Heart className="w-3.5 h-3.5 text-secondary fill-secondary/20" />
                            Make a Donation
                        </Link>
                    </nav>
                </div>

                {/* Contact Info Column */}
                <div className="flex flex-col gap-6">
                    <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blue-950/80">
                        Contact Office
                    </h4>
                    <div className="flex flex-col gap-4 text-sm text-blue-950/75 leading-relaxed">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-950/50 shrink-0 mt-0.5" />
                            <span>
                                C-504, Sea Show CGHS Ltd.<br />
                                Plot No. 14, Sector -19B, Dwarka,<br />
                                New Delhi -110075, India
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-950/50 shrink-0" />
                            <a href="tel:+919810745206" className="hover:text-blue-950 transition-colors">
                                +91-9810745206, +91-9313241727
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-950/50 shrink-0" />
                            <a href="mailto:live4help.org@gmail.com" className="hover:text-blue-950 transition-colors break-all">
                                live4help.org@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 pt-8 border-t border-blue-950/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-blue-950/60">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
                    <span>© 2026 Live 4 Help Foundation. All rights reserved.</span>
                    <span className="hidden md:inline text-blue-950/20">|</span>
                    <span>Registered under MCA, Govt. of India (Reg No: 2020)</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    <Link href="/transparency" className="hover:text-blue-950 transition-colors">Privacy Policy</Link>
                    <Link href="/terms-conditions" className="hover:text-blue-950 transition-colors">Terms & Conditions</Link>
                    <Link href="/disclaimer" className="hover:text-blue-950 transition-colors">Disclaimer</Link>
                    <Link href="/refund-cancellation-policy" className="hover:text-blue-950 transition-colors">Refund & Cancellation</Link>
                </div>
            </div>
        </footer>
    );
}
