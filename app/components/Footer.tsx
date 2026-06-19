import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#cfe8ff] border-t border-blue-950/5 py-16 md:py-24 font-sans text-blue-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center group">
            <img 
              src="https://live4help.org/wp-content/uploads/2021/01/live4help-01-01-01-scaled.jpg" 
              alt="Live 4 Help Foundation Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <p className="text-sm text-blue-950/70 leading-relaxed max-w-sm">
            Live 4 Help Foundation is a Non-Profit Organization registered under the Ministry of Corporate Affairs, Govt. of India. Selfless service with honesty, integrity, accountability, and transparency.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/live4help.org/?ref=page_internal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-blue-950/5 flex items-center justify-center hover:bg-primary transition-colors text-blue-950"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            {/* Mail Shortcut */}
            <a
              href="mailto:live4help.org@gmail.com"
              className="w-10 h-10 rounded-full bg-blue-950/5 flex items-center justify-center hover:bg-secondary transition-colors text-blue-950"
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
            <Link href="/blog" className="hover:text-blue-950 transition-colors">Magazine / News</Link>
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
          <Link href="/transparency" className="hover:text-blue-950 transition-colors">Terms & Conditions</Link>
          <Link href="/transparency" className="hover:text-blue-950 transition-colors">Disclaimer</Link>
          <Link href="/transparency" className="hover:text-blue-950 transition-colors">Refund & Cancellation</Link>
        </div>
      </div>
    </footer>
  );
}
