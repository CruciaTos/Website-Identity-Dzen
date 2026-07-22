"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 24,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  // Mobile: content appears directly, no fade/slide-up and no scroll-linked
  // delay/stagger. Desktop keeps the exact original behavior.
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y }}
      animate={isMobile ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={
        isMobile
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
