"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/agm", label: "AGM" },
  { href: "/impact", label: "Our Impact" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/blog", label: "Magazine" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
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
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-medium tracking-tight rounded-full transition-all duration-300 hover:scale-110 inline-block ${isActive
                    ? `text-[15px] bg-secondary/40 ${scrolled ? "text-foreground" : "text-white"}`
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
            <div className="flex flex-col gap-3 mt-4">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-lg font-display font-medium rounded-2xl transition-colors ${isActive
                        ? "bg-secondary/20 text-foreground"
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
