"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { TESTIMONIALS } from "@/lib/data";
import type { Testimonial } from "@/types";

function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <motion.figure
      className="bg-bg-panel border border-border p-12 px-10 flex flex-col justify-between gap-10 transition-colors duration-300"
      whileHover={{ borderColor: "rgba(216,211,203,0.16)" }}
    >
      <blockquote className="font-serif text-[18px] font-normal italic text-stone-100 leading-[1.55] tracking-[-0.01em]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="pt-6 border-t border-border flex flex-col gap-1">
        <span className="font-sans text-[13px] font-normal text-stone-100">
          {name}
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone-500">
          {role}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        <FadeIn>
          <SectionIndex number="07" tag="From the Field" className="mb-6" />
          <h2 className="font-serif text-display-3 font-normal text-stone-100 max-w-[560px]">
            What operators say.
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-3 gap-[2px] mt-20 max-[900px]:grid-cols-1"
          staggerDelay={0.1}
          initialDelay={0.1}
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.role}>
              <TestimonialCard {...t} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
