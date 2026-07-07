"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

// We removed hover:-translate-y-2 from baseClasses so we can handle it differently for MotionCard to avoid conflicts
const baseClasses = "bg-white border-transparent shadow-soft hover:border-[#90BCE6] hover:shadow-premium hover:!bg-[#CFE8FF] transition-all duration-300";

const getCardClasses = (className: string) => {
  let classes = baseClasses;
  const hasCustomBorder = className.split(/\s+/).some(c => c.startsWith('border') && c !== 'border-transparent');
  if (hasCustomBorder) {
    classes = classes.replace("border-transparent", "");
  }
  return `${classes} ${className}`;
};

export function Card({ children, className = "", as: Component = "div", ...props }: CardProps) {
  return (
    <Component className={`${getCardClasses(className)} hover:-translate-y-2`} {...props}>
      {children}
    </Component>
  );
}

export const MotionCard = React.forwardRef<HTMLElement, HTMLMotionProps<"div"> & { className?: string, as?: React.ElementType }>(
  ({ children, className = "", as: Component = motion.div, ...props }, ref) => {
    // We cast Component to any here to allow motion components like motion.article to be passed via the `as` prop if needed,
    // though by default it acts as motion.div.
    const MotionComponent = Component as any;
    
    // We use Framer Motion's whileHover to handle the Y translation, preventing conflicts with initial/animate Y values
    return (
      <MotionComponent 
        ref={ref} 
        className={getCardClasses(className)} 
        whileHover={{ y: -8 }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

MotionCard.displayName = "MotionCard";
