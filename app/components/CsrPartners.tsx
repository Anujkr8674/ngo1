'use client'

import React, { useState, useEffect } from "react";
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

  return (
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {partners.map((partner) => (
        <Card key={partner.id} className="p-8 rounded-[2.5rem] flex flex-col gap-4 bg-white border border-[#C1D6C1] shadow-soft">
          <h4 className="font-display font-bold text-xl text-foreground">{partner.company}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {partner.desc}
          </p>
        </Card>
      ))}
    </div>
  );
}
