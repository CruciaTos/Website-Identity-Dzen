"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";

// Scroll distance stays the same as before (half of original).
const SCROLL_DISTANCE_VH = 175;

export function HeroSlideTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.0001,
  });

  // Hero fades out completely by progress 0.4 (unchanged).
  const heroScale = useTransform(smoothProgress, [0, 0.65], [1, 0.96]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);

  // Market section (CaseStudies) starts sliding up when the hero is 80 % gone.
  // At progress 0.32, hero opacity = 0.2  (80 % faded).
  const coverY = useTransform(smoothProgress, [0.32, 1], ["100vh", "0vh"]);

  // Wipe line appears just before the cover begins moving.
  const wipeLineOpacity = useTransform(
    smoothProgress,
    [0.3, 0.32, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Sticky hero pin */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            height: "100%",
            transformOrigin: "center top",
            willChange: "transform, opacity",
          }}
        >
          <Hero />
        </motion.div>
      </div>

      {/* Scroll spacer */}
      <div
        aria-hidden="true"
        style={{
          height: `${SCROLL_DISTANCE_VH}vh`,
          marginTop: `-100vh`,
          pointerEvents: "none",
        }}
      />

      {/* CaseStudies cover — slides up while the last 20 % of the hero fades away */}
      <motion.div
        style={{
          translateY: coverY,
          position: "relative",
          zIndex: 2,
          willChange: "transform",
        }}
      >
        {/* Wipe line */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1.5px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(126,195,226,0.55) 20%, rgba(178,213,229,0.8) 50%, rgba(126,195,226,0.55) 80%, transparent 100%)",
            opacity: wipeLineOpacity,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <CaseStudies />
      </motion.div>
    </div>
  );
}