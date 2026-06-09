"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { CASE_STUDIES } from "@/lib/data";
import type { CaseStudy } from "@/types";

function CaseCard({ tag, headline, body, metrics, industry, featured }: CaseStudy) {
  return (
    <motion.article
      className={[
        "p-14 px-12 bg-bg-panel border border-border relative overflow-hidden",
        "transition-colors duration-300 cursor-default",
        "hover:border-border-strong",
        featured ? "row-span-2 flex flex-col max-[900px]:row-span-1" : "flex flex-col",
      ].join(" ")}
      whileHover={{ borderColor: "rgba(216, 211, 203, 0.16)" }}
    >
      {/* Subtle hover overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(ellipse at top left, rgba(143,120,96,0.03) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent mb-6">
        {tag}
      </div>

      <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] font-normal text-stone-100 leading-[1.2] tracking-[-0.01em] mb-6">
        {headline}
      </h3>

      <div className="font-sans text-[14px] font-light text-stone-400 leading-[1.7] mb-12 flex-1">
        {body.split("\n\n").map((para, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>
            {para}
          </p>
        ))}
      </div>

      {/* Metrics */}
      <div className="flex gap-10 flex-wrap pt-8 border-t border-border" role="list" aria-label="Key metrics">
        {metrics.map((m) => (
          <div key={m.label} role="listitem">
            <div className="font-serif text-[36px] font-normal text-stone-100 tracking-[-0.02em] leading-none mb-1">
              {m.value}
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone-500">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone-500">
          {industry}
        </span>
        <motion.a
          href="#"
          className="font-sans text-[12px] text-accent no-underline tracking-[0.04em] flex items-center gap-[6px] hover:gap-[10px] transition-all duration-200"
          aria-label={`Read case study: ${headline}`}
        >
          {featured ? "Read case study →" : "Read more →"}
        </motion.a>
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section
      id="cases"
      aria-label="Case studies and results"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="flex items-end justify-between mb-20 gap-12 max-md:flex-col max-md:items-start">
            <div>
              <SectionIndex number="04" tag="Results" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal text-stone-100">
                Outcomes, not promises.
              </h2>
            </div>
            <Button as="a" href="#" variant="ghost" size="md">
              All case studies →
            </Button>
          </div>
        </FadeIn>

        {/* Cases grid */}
        <StaggerContainer
          className="grid grid-cols-[7fr_5fr] gap-[2px] max-[900px]:grid-cols-1"
          staggerDelay={0.1}
        >
          {CASE_STUDIES.map((cs) => (
            <StaggerItem
              key={cs.industry}
              className={cs.featured ? "max-[900px]:order-first" : ""}
            >
              <CaseCard {...cs} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
