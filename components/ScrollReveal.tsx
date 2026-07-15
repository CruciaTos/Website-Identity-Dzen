"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  style?: React.CSSProperties;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 4,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger animation when the component comes into view
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const initial = {
    opacity: baseOpacity,
    y: 20,
    rotate: baseRotation,
    filter: enableBlur ? `blur(${blurStrength}px)` : "none",
  };

  const animate = {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(containerClassName, className)}
      style={style}
    >
      <span className={textClassName}>{children}</span>
    </motion.div>
  );
};

export default ScrollReveal;
