"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { PROCESS_STEPS } from "@/lib/data";
import type { ProcessStep } from "@/types";

function Step({ index, title, description, duration }: ProcessStep) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="p-8 pb-10 border-r border-b border-border relative overflow-hidden cursor-default"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* bg fill */}
      <motion.div
        className="absolute inset-0 bg-bg-panel pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left pointer-events-none"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(143,120,96,0.08) 0%, transparent 65%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* watermark index — top right */}
      <motion.div
        className="absolute top-5 right-5 font-mono font-light leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(40px,5vw,56px)" }}
        animate={{ color: hovered ? "rgba(201,169,110,0.18)" : "rgba(255,255,255,0.05)" }}
        transition={{ duration: 0.35 }}
        aria-hidden="true"
      >
        {index}
      </motion.div>

      <div className="relative z-10">
        <h3 className="font-serif text-[22px] font-normal text-stone-100 mb-5 tracking-[-0.01em] max-w-[180px]">
          {title}
        </h3>

        <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.75]">
          {description}
        </p>

        {/* duration pill */}
        <div className="inline-flex items-center gap-1.5 mt-5 font-mono text-[9px] tracking-[0.1em] uppercase border border-white/[.1] px-2.5 py-1 text-stone-500">
          <span className="w-1 h-1 rounded-full bg-accent opacity-70 animate-[pulse-dot_2s_ease-in-out_infinite]" aria-hidden="true" />
          {duration}
        </div>
      </div>
    </motion.article>
  );
}

export function Process() {
  return (
    <section
      id="process"
      aria-label="Engagement methodology"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        <FadeIn>
          <SectionIndex number="06" tag="Engagement Model" className="mb-6" />
          <h2 className="font-serif text-display-3 font-normal text-stone-100 max-w-[640px]">
            A methodology built for
            <br />
            operational environments.
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-5 border-t border-l border-border mt-20 max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1"
          staggerDelay={0.08}
          initialDelay={0.1}
        >
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.index}>
              <Step {...step} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}