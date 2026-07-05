"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-label="Why choose DZen"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        <FadeIn className="flex flex-col items-center text-center">
          <h2 className="font-sans text-[clamp(52px,5vw,72px)] font-bold tracking-[-0.02em] text-stone-100">
            QUALITY IS CLARITY <br /> AND CLARITY IS GROWTH !!
          </h2>
        </FadeIn>
      </Container>
    </section>
  );
}