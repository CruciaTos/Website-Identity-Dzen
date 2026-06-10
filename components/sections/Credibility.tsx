"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { STATS } from "@/lib/data";

export function Credibility() {
  return (
    <section
      id="credibility"
      aria-label="Our standards and approach"
      className="py-[120px] bg-bg-primary"
    >
      <Container>
        {/* Section header */}
        <FadeIn>
          <div className="flex items-start justify-between gap-12 mb-20 max-md:flex-col">
            <div>
              <SectionIndex number="01" tag="Built to a Standard" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal text-stone-100">
                The principles every
                <br />
                engagement is built on.
              </h2>
            </div>
            <div className="max-w-[380px] flex-shrink-0">
              <p className="font-sans text-body font-light text-stone-400 leading-[1.7]">
                
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Principles grid */}
        <StaggerContainer
          className="grid grid-cols-4 border-t border-l border-border max-[900px]:grid-cols-2 max-[480px]:grid-cols-1"
          staggerDelay={0.1}
          aria-label="Engagement principles"
        >
          {STATS.map((stat) => (
            <StaggerItem key={stat.description}>
              <motion.article
                className="relative p-10 pl-8 border-r border-b border-border overflow-hidden cursor-default"
                initial={false}
                whileHover="hovered"
              >
                {/* bg fill */}
                <motion.div
                  className="absolute inset-0 bg-bg-panel pointer-events-none"
                  variants={{ hovered: { opacity: 1 }, initial: { opacity: 0 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
                {/* bottom accent bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left pointer-events-none"
                  variants={{ hovered: { scaleX: 1 }, initial: { scaleX: 0 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* eyebrow */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 bg-accent flex-shrink-0" aria-hidden="true" />
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent">
                      {stat.description}
                    </span>
                  </div>

                  {/* hero value */}
                  <div className="font-serif text-[clamp(48px,5.5vw,72px)] font-normal leading-[0.92] tracking-[-0.025em] mb-5">
                    <motion.span
                      className="text-stone-100 inline-block"
                      variants={{ hovered: { color: "#c9a96e" } }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-accent">{stat.accent}</span>
                  </div>

                  {/* label */}
                  <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.65] max-w-[240px]">
                    {stat.label}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}