"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

const REASONS = [
  {
    num: "I",
    title: "We're obsessed, not credentialled.",
    body: "We didn't come to AI through a job title. We've been building with it — reading the papers, running the experiments, breaking things in production — since before it was a safe career choice. That obsession is the credential.",
  },
  {
    num: "II",
    title: "We move at a speed traditional firms can't match.",
    body: "No approval chains. No billable-hour incentives to slow things down. When we scope a project, we build it. Most of our clients see a working prototype in under three weeks. Established consultancies are still writing the statement of work.",
  },
  {
    num: "III",
    title: "We think in systems, not in slides.",
    body: "We're not selling a framework or a methodology deck. We're here to understand how your business actually operates and build the layer of intelligence that makes it work better. The deliverable is running software, not a roadmap.",
  },
];

const ADVANTAGES = [
  {
    label: "AI-native from day one",
    desc: "We didn't adapt to AI — we built with it from the start. No legacy mental models to unlearn.",
  },
  {
    label: "Direct founder involvement",
    desc: "You work with the people who designed the system and wrote the code. Not account managers.",
  },
  {
    label: "Faster technology adoption",
    desc: "When a better model or tool releases, we evaluate and integrate it in days — not quarters.",
  },
  {
    label: "Hunger and ownership",
    desc: "Our reputation is built on every engagement we complete. We treat your systems like our own.",
  },
  {
    label: "No inflated overhead",
    desc: "No office politics, no committee decisions. Resources go directly into building what you need.",
  },
  {
    label: "Long-term partnership mindset",
    desc: "We're not optimising for a contract renewal. We're optimising for results you can't ignore.",
  },
];

function AdvantageRow({
  item,
  index,
}: {
  item: (typeof ADVANTAGES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[1fr_2fr] gap-8 py-5 border-b border-border items-start max-md:grid-cols-1 max-md:gap-2 group cursor-default"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-[3px] h-[3px] bg-accent flex-shrink-0 inline-block transition-transform duration-300 group-hover:scale-[2]"
          aria-hidden="true"
        />
        <span className="font-sans text-[13px] font-normal text-stone-200 tracking-[-0.01em]">
          {item.label}
        </span>
      </div>
      <p className="font-sans text-[13px] font-light text-stone-400 leading-[1.65]">
        {item.desc}
      </p>
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-label="Why choose DZen"
      className="py-[120px] bg-bg-secondary border-t border-border"
    >
      <Container>
        {/* Header */}
        <FadeIn className="mb-20">
          <SectionIndex number="07" tag="Why DZen" className="mb-6" />
          <div className="flex items-end justify-between gap-12 max-md:flex-col max-md:items-start">
            <h2 className="font-serif text-display-3 font-normal text-stone-100 max-w-[560px]">
              Why trust a team
              <br />
              of <em className="not-italic text-stone-400">21-year-olds</em> with
              <br />
              your systems?
            </h2>
            <div className="max-w-[360px] flex-shrink-0">
              <p className="font-sans text-body font-light text-stone-400 leading-[1.7]">
                It&apos;s a fair question. Here&apos;s the direct answer.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Three core arguments */}
        <StaggerContainer
          className="grid grid-cols-3 gap-[2px] mb-20 max-[900px]:grid-cols-1"
          staggerDelay={0.1}
          initialDelay={0.1}
        >
          {REASONS.map((r) => (
            <StaggerItem key={r.num}>
              <motion.article
                className="bg-bg-panel border border-border p-10 px-9 flex flex-col gap-7 transition-colors duration-300 h-full"
                whileHover={{ borderColor: "rgba(216,211,203,0.16)" }}
              >
                <span className="font-serif text-[48px] font-normal text-stone-600 leading-none tracking-[-0.02em]">
                  {r.num}
                </span>
                <div>
                  <h3 className="font-serif text-[20px] font-normal text-stone-100 leading-[1.3] tracking-[-0.01em] mb-4">
                    {r.title}
                  </h3>
                  <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.7]">
                    {r.body}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Specific advantages table */}
        <FadeIn delay={0.1}>
          <div className="mb-6">
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-stone-500">
              Structural advantages
            </p>
          </div>
          <div className="border-t border-border">
            {ADVANTAGES.map((item, i) => (
              <AdvantageRow key={item.label} item={item} index={i} />
            ))}
          </div>
        </FadeIn>

        {/* Closing statement */}
        <FadeIn delay={0.15}>
          <div className="mt-16 border border-border bg-bg-panel px-10 py-9 max-w-[760px] relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at bottom right, rgba(143,120,96,0.06) 0%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-accent mb-4">
                The real answer
              </div>
              <p className="font-serif text-[clamp(17px,2vw,22px)] font-normal text-stone-100 leading-[1.4] tracking-[-0.01em]">
                Age doesn&apos;t determine the quality of the system we deploy. The audit trail does. The uptime does. The hours your team stops spending on work a machine should handle.
              </p>
              <p className="font-sans text-[13px] font-light text-stone-400 leading-[1.7] mt-4 max-w-[560px]">
                We&apos;re happy to let our work answer the question. That&apos;s why every engagement starts with a fixed-scope discovery — you see exactly how we think before committing to anything.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}