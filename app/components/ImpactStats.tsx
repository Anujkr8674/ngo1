'use client'

import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import { MotionCard } from "./Card";
import { getHomepageStats } from "@/app/actions/homepageStat";

export default function ImpactStats() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getHomepageStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load homepage stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading || stats.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-12 border-y border-foreground/5">
      <div className="max-w-7xl mx-auto bg-[#FFE6D4] rounded-[3rem] py-8 px-4 md:py-16 md:px-8 border border-foreground/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={stat.id}
              className="flex flex-col gap-3 p-6 rounded-[2.5rem] border border-[#EEB898] bg-white shadow-soft"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-foreground">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-sm tracking-tight text-foreground/90">
                {stat.label}
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                {stat.desc}
              </p>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
