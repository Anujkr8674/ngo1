"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  href?: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    label: "Virtual Meetings",
    dropdown: [
      { href: "/agm", label: "AGM" },
      { href: "/transparency", label: "Archived Material" },
    ],
  },
  {
    label: "Get Help",
    dropdown: [
      { href: "/get-help/education", label: "Education Support Form" },
      { href: "/get-help/elderly", label: "Elderly Support Form" },
      { href: "/get-help/medical", label: "Medical Support Form" },
      { href: "/get-help/each-other", label: "Help Each Other Form" },
    ],
  },
  { href: "/impact", label: "Our Impact" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/blog", label: "Web Posts" },
  { href: "/volunteer", label: "Be Part Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdowns({});
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-premium duration-500 ${scrolled
          ? "bg-white py-3 shadow-soft"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="https://live4help.org/wp-content/uploads/2021/01/live4help-01-01-01-scaled.jpg"
              alt="Live 4 Help Foundation Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isAnyActive = link.dropdown.some((subLink) => pathname === subLink.href);
                return (
                  <div key={link.label} className="relative group">
                    <button
                      className={`relative px-4 py-2 font-medium tracking-tight rounded-full transition-all duration-300 hover:scale-110 inline-flex items-center gap-1.5 cursor-pointer ${isAnyActive
                        ? `text-[15px] bg-[#cbb6f5] ${scrolled ? "text-foreground" : "text-white"}`
                        : `text-[13px] ${scrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"}`
                        }`}
                    >
                      {link.label}
                      <svg className="w-3 h-3 opacity-60 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-foreground/5 rounded-2xl shadow-premium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 overflow-hidden">
                      {link.dropdown.map((subLink) => {
                        const isSubActive = pathname === subLink.href;
                        return (
                          <Link
                            key={subLink.href}
                            href={subLink.href}
                            className={`block px-5 py-3 text-xs font-semibold tracking-wide transition-colors ${isSubActive
                              ? "bg-secondary/40 text-foreground"
                              : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                              }`}
                          >
                            {subLink.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`relative px-4 py-2 font-medium tracking-tight rounded-full transition-all duration-300 hover:scale-110 inline-block ${isActive
                    ? `text-[15px] bg-[#cbb6f5] ${scrolled ? "text-foreground" : "text-white"}`
                    : `text-[13px] ${scrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"}`
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Donate CTA button (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Link href="/donate">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-foreground bg-primary hover:bg-[#b8daff] transition-premium shadow-soft cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-foreground/10 text-foreground" />
                Support Us
              </motion.button>
            </Link>
          </div>

          {/* Mobile Hamburguer Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${scrolled ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 pt-24 pb-8 px-6 flex flex-col justify-between xl:hidden"
          >
            <div className="flex flex-col gap-3 mt-4 overflow-y-auto max-h-[60vh] no-scrollbar">
              {navLinks.map((link, idx) => {
                if (link.dropdown) {
                  const isDropdownOpen = !!mobileDropdowns[link.label];
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.label}
                      className="flex flex-col gap-1 px-4 py-1"
                    >
                      <button
                        onClick={() => toggleMobileDropdown(link.label)}
                        className="flex items-center justify-between w-full py-3 text-lg font-display font-medium text-foreground/85 rounded-2xl hover:bg-foreground/5 text-left cursor-pointer transition-colors"
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-4 h-4 opacity-60 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden flex flex-col gap-1 pl-4 border-l border-foreground/10"
                          >
                            {link.dropdown.map((subLink) => {
                              const isSubActive = pathname === subLink.href;
                              return (
                                <Link
                                  key={subLink.href}
                                  href={subLink.href}
                                  className={`block px-4 py-2 text-base font-display font-medium rounded-2xl transition-colors ${isSubActive
                                    ? "bg-[#cbb6f5] text-foreground"
                                    : "text-foreground/80 hover:bg-foreground/5"
                                    }`}
                                >
                                  {subLink.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                  >
                    <Link
                      href={link.href!}
                      className={`block px-4 py-3 text-lg font-display font-medium rounded-2xl transition-colors ${isActive
                        ? "bg-[#cbb6f5] text-foreground"
                        : "text-foreground/85 hover:bg-foreground/5"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <Link href="/donate" className="w-full">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-foreground bg-primary shadow-soft">
                  <Heart className="w-5 h-5 fill-foreground/10 text-foreground" />
                  Support Us
                </button>
              </Link>
              <div className="text-center text-xs text-foreground/50">
                © 2026 Live 4 Help Foundation. All rights reserved.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
