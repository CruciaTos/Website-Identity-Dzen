"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax on the bg text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      aria-label="Get started"
      className="py-[160px] bg-bg-primary border-t border-border relative overflow-hidden"
    >
      {/* Background text */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute bottom-[-20px] right-[-20px] font-serif text-[clamp(100px,14vw,220px)] font-normal text-bg-secondary leading-none tracking-[-0.04em] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        DZen
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(143,120,96,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <FadeIn>
          <div className="max-w-[800px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-px bg-accent" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                Start with a conversation
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-[clamp(40px,5.5vw,80px)] font-normal leading-[1.0] tracking-[-0.025em] text-stone-100 mb-10">
              Ready to make your
              <br />
              operations <em className="not-italic text-stone-400">intelligent?</em>
            </h2>

            {/* Body */}
            <p className="font-sans text-[17px] font-light text-stone-400 leading-[1.7] max-w-[520px] mb-14">
              Start with a 45-minute discovery briefing. We&apos;ll assess your current system landscape, identify your highest-value automation opportunities, and tell you exactly what we&apos;d do and why — with no obligation to proceed.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-6 flex-wrap">
              <Button as="a" href="#" variant="primary" size="lg">
                Schedule a Discovery Briefing
              </Button>
              <Button as="a" href="#" variant="ghost" size="lg">
                Download our methodology →
              </Button>
            </div>

            {/* Note */}
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone-500 mt-8">
              Engagements typically begin within 10 business days · NDA available on request · All briefings are confidential
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
