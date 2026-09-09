'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "./Card";
import { getCsrPartnerships } from "@/app/actions/csrPartnership";

export default function CsrPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPartnerships() {
      try {
        const data = await getCsrPartnerships();
        setPartners(data);
      } catch (err) {
        console.error("Failed to load CSR partnerships:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPartnerships();
  }, []);

  if (loading || partners.length === 0) return null;

  // Display only the two most recently added cards
  const recentPartners = partners.slice(0, 2);

  return (
    <div className="lg:col-span-7 flex flex-col items-center gap-6">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recentPartners.map((partner) => (
          <Card key={partner.id} className="p-8 rounded-[2.5rem] flex flex-col gap-4 bg-white border border-[#C1D6C1] shadow-soft hover:shadow-md transition-shadow">
            <h4 className="font-display font-bold text-xl text-foreground">{partner.company}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {partner.desc}
            </p>
          </Card>
        ))}
      </div>
      <Link href="/donors-csr-sponsors-members">
        <button className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold text-foreground bg-primary shadow-soft hover:opacity-90 transition-premium cursor-pointer">
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  );
}
