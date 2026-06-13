"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import {
  BarChartIcon,
  EnvelopeIcon,
  ChatIcon,
  ClockCircleIcon,
  LayersIcon,
  LineChartIcon,
} from "@/components/ui/Icons";
import { TARGET_AREAS } from "@/lib/data";
import type { TargetArea } from "@/types";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "bar-chart":    BarChartIcon,
  "envelope":     EnvelopeIcon,
  "chat":         ChatIcon,
  "clock-circle": ClockCircleIcon,
  "layers":       LayersIcon,
  "line-chart":   LineChartIcon,
};

function PotentialBar({ percent }: { percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="h-[2px] w-full bg-ink/[.08] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #8F7860, rgba(143,120,96,0.4))",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: percent / 100 } : {}}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
    </div>
  );
}

function AreaCard({ area }: { area: TargetArea }) {
  const Icon = ICON_MAP[area.icon] ?? LayersIcon;

  return (
    <motion.article
      className="bg-bg-panel border border-border p-10 px-9 flex flex-col gap-6 h-full transition-colors duration-300"
      whileHover={{ borderColor: "rgba(216,211,203,0.16)", backgroundColor: "#1E2024" }}
    >
      <div className="w-9 h-9 flex items-center justify-center border border-border-strong text-accent flex-shrink-0">
        <Icon />
      </div>

      <div className="flex-1">
        <h3 className="font-sans text-[16px] font-normal text-stone-100 mb-3 tracking-[-0.01em]">
          {area.title}
        </h3>
        <p className="font-sans text-[13px] font-light text-stone-400 leading-[1.7] mb-6">
          {area.description}
        </p>
        <ul className="flex flex-col gap-2" role="list">
          {area.painPoints.map((point) => (
            <li
              key={point}
              className="font-sans text-[12px] font-light text-stone-400 flex items-start gap-[10px]"
            >
              <span
                className="w-[3px] h-[3px] bg-stone-500 flex-shrink-0 inline-block mt-[7px]"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] tracking-[.14em] uppercase text-stone-500">
            Automation potential
          </span>
          <span className="font-mono text-[10px]" style={{ color: "#8F7860" }}>
            {area.potential}%
          </span>
        </div>
        <PotentialBar percent={area.potential} />
      </div>
    </motion.article>
  );
}

export function TargetAreas() {
  return (
    <section
      id="areas"
      aria-label="Areas we target"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        <FadeIn>
          <div className="flex items-end justify-between mb-20 gap-12 max-md:flex-col max-md:items-start">
            <div>
              <SectionIndex number="02" tag="Target Markets" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal text-stone-100 max-w-[620px]">
                Areas where intelligence
                <br />
                creates the most value.
              </h2>
            </div>
            <div className="max-w-[380px] flex-shrink-0">
              <p className="font-sans text-body font-light text-stone-400 leading-[1.7]">
                Every function below shares the same pattern: high-volume, rules-based work that consumes hours your team could spend on judgement calls instead.
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-3 gap-[2px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          staggerDelay={0.08}
        >
          {TARGET_AREAS.map((area) => (
            <StaggerItem key={area.title}>
              <AreaCard area={area} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
