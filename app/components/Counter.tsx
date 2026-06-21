"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
 end: number;
 duration?: number;
 suffix?: string;
}

export default function Counter({ end, duration = 2, suffix = "" }: CounterProps) {
 const [count, setCount] = useState(0);
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: "-100px" });

 useEffect(() => {
 if (!isInView) return;

 let start = 0;
 const endValue = end;
 const totalSteps = 60;
 const stepTime = (duration * 1000) / totalSteps;
 
 const timer = setInterval(() => {
 start += 1;
 const progress = start / totalSteps;
 // Ease out quad
 const currentCount = Math.floor(endValue * (progress * (2 - progress)));
 
 if (start >= totalSteps) {
 setCount(endValue);
 clearInterval(timer);
 } else {
 setCount(currentCount);
 }
 }, stepTime);

 return () => clearInterval(timer);
 }, [isInView, end, duration]);

 return (
 <span ref={ref} className="font-display font-bold tabular-nums">
 {count}
 {suffix}
 </span>
 );
}
