"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";

/* ─────────────────────────────────────────────────────────────────────────
   Hero-exact colour tokens
   #010b13  onyx bg  ·  #B2D5E5 candy blue  ·  #7ec3e2 headline blue
───────────────────────────────────────────────────────────────────────── */
const C = {
  bg: "#010b13",
  bgCard: "#06111a",
  blue: "#B2D5E5",
  blueMid: "#7ec3e2",
  blueDeep: "#5aabce",
  border: "rgba(178,213,229,0.10)",
  borderHi: "rgba(178,213,229,0.22)",
  dim: "rgba(178,213,229,0.55)",
  faint: "rgba(178,213,229,0.32)",
  ghost: "rgba(178,213,229,0.017)",
} as const;

const SPRING = "cubic-bezier(0.22,1,0.36,1)";
const EASE_FM = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────
   Data — unchanged
───────────────────────────────────────────────────────────────────────── */
interface CaseMetric { value: string; label: string }
interface RealCase {
  id: string; org: string; tag: string; domain: string;
  headline: string; body: string; metrics: CaseMetric[];
  accent: string; source: string;
}

const CASES: RealCase[] = [
  {
    id: "01",
    org: "BMC Mumbai",
    tag: "Municipal AI Enforcement",
    domain: "Infrastructure · Governance",
    headline: "₹19.25 Cr in contractor penalties recovered via AI-based site monitoring.",
    body: "Mumbai's Brihanmumbai Municipal Corporation deployed an AI monitoring system to oversee pre-monsoon drain-cleaning works citywide. The system detected reuse of uploaded images, missing unloading videos, vehicle-code mismatches, and irregularities in silt disposal — violations that previously went unnoticed. Physical inspections confirmed inadequate manpower, absent safety gear, and delayed completions. Penalties of ₹19.25 crore were recovered directly from contractors' pending bills.",
    metrics: [
      { value: "₹19.25Cr", label: "Penalties enforced" },
      { value: "Real-time", label: "AI site monitoring" },
      { value: "Zero", label: "Manual audit reliance" },
    ],
    accent: "#B2D5E5",
    source: "Hindustan Times — June 2025",
  },
  {
    id: "02",
    org: "Kerala Police",
    tag: "Law Enforcement AI",
    domain: "Public Safety · Child Protection",
    headline: "India's first AI system tracks CSAM perpetrators across the dark web.",
    body: "Kerala Police became the first law enforcement agency in India to deploy AI specifically against child sexual abuse material online. The tool — Katalyst — sifts through vast digital evidence, cross-references victim signatures across platforms, and tracks perpetrators across social media. Evidence review that previously took weeks now takes hours, enabling faster victim identification and timely intervention.",
    metrics: [
      { value: "#1", label: "First in India" },
      { value: "Hours", label: "vs. Weeks (manual)" },
      { value: "Katalyst", label: "AI tool deployed" },
    ],
    accent: "#7ec3e2",
    source: "The News Minute — 2025",
  },
  {
    id: "03",
    org: "FTITTP · Indian Airports",
    tag: "Biometric AI Systems",
    domain: "Border Control · Government",
    headline: "Airport immigration: 30 minutes down to 15 seconds with AI biometrics.",
    body: "Fast Track Immigration programs at major Indian airports deploy AI-driven facial recognition and fingerprint scanners to automate border crossings entirely. Travelers bypass human officers — scanning passport, stepping through a biometric gate, and receiving automated clearance against government databases in real-time. No queues. No manual stamps. No intervention required. Fifteen seconds.",
    metrics: [
      { value: "15s", label: "Clearance time" },
      { value: "120×", label: "Faster than manual" },
      { value: "FTITTP", label: "Govt. programme" },
    ],
    accent: "#5aabce",
    source: "NDTV Travel — 2025",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Pulsing dot
───────────────────────────────────────────────────────────────────────── */
function PulseDot({ delay }: { delay: number }) {
  return (
    <motion.div
      style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.blue, flexShrink: 0 } as CSSProperties}
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Desktop horizontal expandable card
───────────────────────────────────────────────────────────────────────── */
function CaseCard({
  c,
  isActive,
  isCompressed,
  onEnter,
}: {
  c: RealCase;
  isActive: boolean;
  isCompressed: boolean;
  onEnter: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        flex: isActive ? 2.65 : isCompressed ? 0.62 : 1,
        transition: `flex 0.60s ${SPRING}, border-color 0.35s ease`,
        position: "relative",
        overflow: "hidden",
        backgroundColor: C.bgCard,
        border: `1px solid ${isActive ? C.borderHi : C.border}`,
        cursor: "default",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: 0.014,
          backgroundImage:
            "radial-gradient(circle, rgba(178,213,229,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Ghost number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-28px", right: "-6px",
          fontSize: "clamp(100px,13vw,200px)",
          color: C.ghost,
          fontFamily: "serif",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {c.id}
      </div>

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "2px",
          backgroundColor: isActive ? c.accent : `${c.accent}40`,
          transition: "background-color 0.42s ease",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: `radial-gradient(ellipse at top left, ${c.accent}0C 0%, transparent 58%)`,
        }}
      />

      {/* ── Full content: default + active ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          padding: "36px 30px 36px 36px",
          display: "flex", flexDirection: "column",
          opacity: isCompressed ? 0 : 1,
          transition: "opacity 0.28s ease",
          pointerEvents: isCompressed ? "none" : "auto",
          zIndex: 1,
          overflowY: isActive ? "auto" : "hidden",
        }}
      >
        {/* Tag row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: `1px solid ${c.accent}38`,
              backgroundColor: `${c.accent}0D`,
              color: c.accent,
            }}
          >
            {c.tag}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.faint,
            }}
          >
            {c.domain}
          </span>
        </div>

        {/* Org */}
        <div
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.dim,
            marginBottom: "10px",
          }}
        >
          {c.org}
        </div>

        {/* Headline — always visible */}
        <h3
          className="font-serif"
          style={{
            fontSize: "clamp(15px, 1.65vw, 22px)",
            fontWeight: 400,
            color: C.blue,
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            maxWidth: "480px",
            margin: 0,
          }}
        >
          {c.headline}
        </h3>

        {/* ── Expanded content (AnimatePresence) ── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.42, ease: EASE_FM }}
              style={{ marginTop: "22px", flex: 1, display: "flex", flexDirection: "column" } as CSSProperties}
            >
              {/* Rule */}
              <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "18px" }} />

              {/* Body */}
              <p
                className="font-sans"
                style={{
                  fontSize: "13.5px",
                  fontWeight: 300,
                  color: C.dim,
                  lineHeight: 1.82,
                  marginBottom: "24px",
                  maxWidth: "500px",
                }}
              >
                {c.body}
              </p>

              {/* Metrics strip */}
              <div
                style={{
                  display: "flex",
                  border: `1px solid ${C.border}`,
                  marginBottom: "20px",
                }}
              >
                {c.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: "14px 16px",
                      borderLeft: i > 0 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <div
                      className="font-serif"
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 20px)",
                        fontWeight: 400,
                        color: c.accent,
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        marginBottom: "5px",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: C.faint,
                        lineHeight: 1.6,
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Source citation */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                <div
                  style={{ width: "18px", height: "1px", backgroundColor: c.accent, flexShrink: 0 }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: C.faint,
                  }}
                >
                  Source: {c.source}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Compressed strip: rotated label ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: isCompressed ? 1 : 0,
          transition: "opacity 0.28s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: `${c.accent}52`,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {c.id} · {c.org}
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "2px",
          backgroundColor: c.accent,
          opacity: isActive ? 0.55 : 0.12,
          transformOrigin: "left",
          transform: `scaleX(${isActive ? 1 : 0.32})`,
          transition: `opacity 0.4s ease, transform 0.65s ${SPRING}`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile card — click to expand
───────────────────────────────────────────────────────────────────────── */
function MobileCard({ c }: { c: RealCase }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: C.bgCard,
        border: `1px solid ${open ? C.borderHi : C.border}`,
        transition: "border-color 0.35s ease",
        cursor: "pointer",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "2px",
          backgroundColor: open ? c.accent : `${c.accent}40`,
          transition: "background-color 0.4s ease",
        }}
      />

      {/* Ghost number */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: "-12px", right: "-4px",
          fontSize: "clamp(80px,22vw,130px)",
          color: C.ghost, fontFamily: "serif", lineHeight: 1,
          letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none",
        }}
      >
        {c.id}
      </div>

      {/* Glow */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: open ? 1 : 0,
          transition: "opacity 0.45s ease",
          background: `radial-gradient(ellipse at top left, ${c.accent}0C 0%, transparent 55%)`,
        }}
      />

      <div style={{ padding: "26px 22px 26px 28px", position: "relative", zIndex: 1 }}>
        {/* Tag row */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "4px 10px",
              border: `1px solid ${c.accent}38`,
              backgroundColor: `${c.accent}0D`,
              color: c.accent,
            }}
          >
            {c.tag}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "9px", letterSpacing: "0.12em",
              textTransform: "uppercase", color: C.faint,
            }}
          >
            {c.domain}
          </span>
        </div>

        {/* Org */}
        <div
          className="font-mono"
          style={{
            fontSize: "10px", letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.dim, marginBottom: "8px",
          }}
        >
          {c.org}
        </div>

        {/* Headline + toggle button */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(16px, 4.5vw, 21px)",
              fontWeight: 400, color: C.blue,
              lineHeight: 1.22, letterSpacing: "-0.02em",
              flex: 1, margin: 0,
            }}
          >
            {c.headline}
          </h3>
          <div
            style={{
              flexShrink: 0, width: 24, height: 24,
              border: `1px solid ${open ? C.borderHi : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "2px",
              transition: `transform 0.38s ${SPRING}, border-color 0.3s ease`,
              transform: open ? "rotate(45deg)" : "none",
            }}
          >
            <span
              className="font-mono"
              style={{
                color: open ? C.blue : C.faint,
                fontSize: "16px", lineHeight: 1,
                transition: "color 0.3s ease",
              }}
            >
              +
            </span>
          </div>
        </div>

        {/* Expanded body */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.42, ease: EASE_FM }}
              style={{ overflow: "hidden" } as CSSProperties}
            >
              <div style={{ paddingTop: "18px" }}>
                <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "16px" }} />

                <p
                  className="font-sans"
                  style={{
                    fontSize: "13.5px", fontWeight: 300,
                    color: C.dim, lineHeight: 1.8,
                    marginBottom: "18px",
                  }}
                >
                  {c.body}
                </p>

                {/* Metrics */}
                <div style={{ display: "flex", border: `1px solid ${C.border}`, marginBottom: "16px" }}>
                  {c.metrics.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1, padding: "12px 12px",
                        borderLeft: i > 0 ? `1px solid ${C.border}` : "none",
                      }}
                    >
                      <div
                        className="font-serif"
                        style={{
                          fontSize: "clamp(12px,4vw,18px)",
                          fontWeight: 400, color: c.accent,
                          lineHeight: 1, letterSpacing: "-0.025em",
                          marginBottom: "4px",
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: "7.5px", letterSpacing: "0.12em",
                          textTransform: "uppercase", color: C.faint, lineHeight: 1.5,
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Source */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "18px", height: "1px", backgroundColor: c.accent, flexShrink: 0 }} />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "9px", letterSpacing: "0.10em",
                      textTransform: "uppercase", color: C.faint,
                    }}
                  >
                    Source: {c.source}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          height: "2px",
          backgroundColor: c.accent,
          opacity: open ? 0.55 : 0.12,
          transformOrigin: "left",
          transform: `scaleX(${open ? 1 : 0.32})`,
          transition: `opacity 0.4s ease, transform 0.65s ${SPRING}`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────── */
export function CaseStudies() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="cases"
      aria-label="Real-world AI deployments"
      style={{
        padding: "120px 0",
        backgroundColor: C.bg,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <Container>
        {/* ── Section header ── */}
        <FadeIn>
          <div className="flex items-end justify-between mb-6 gap-12 max-md:flex-col max-md:items-start">
            <div>
              <SectionIndex number="04" tag="AI in the Real World" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal" style={{ color: C.blue }}>
                AI Integration
                <br />
                <em className="not-italic" style={{ color: C.dim }}>
                  is closer than you think
                </em>
              </h2>
            </div>
            <div className="max-w-[400px] flex-shrink-0">
              <p
                className="font-sans text-body font-light leading-[1.7]"
                style={{ color: C.dim }}
              >
                AI integration is moving faster than most organisations realise.
                These are production systems — built on real data, deployed in
                critical workflows, delivering measurable outcomes today.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ── Animated separator ── */}
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-1.5">
              <PulseDot delay={0} />
              <PulseDot delay={0.4} />
              <PulseDot delay={0.8} />
            </div>
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            <span
              className="font-mono text-[9px] tracking-[0.18em] uppercase"
              style={{ color: C.faint }}
            >
              Production · Active
            </span>
          </div>
        </FadeIn>

        {/* ── Desktop: horizontal expandable cards ── */}
        <FadeIn delay={0.2}>
          <div
            className="hidden md:flex gap-[1px]"
            style={{ height: "clamp(520px,56vh,640px)" }}
            onMouseLeave={() => setActiveId(null)}
          >
            {CASES.map((c) => (
              <CaseCard
                key={c.id}
                c={c}
                isActive={activeId === c.id}
                isCompressed={activeId !== null && activeId !== c.id}
                onEnter={() => setActiveId(c.id)}
              />
            ))}
          </div>

          {/* ── Mobile: vertical click-to-expand cards ── */}
          <div className="flex md:hidden flex-col gap-[1px]">
            {CASES.map((c) => (
              <MobileCard key={c.id} c={c} />
            ))}
          </div>
        </FadeIn>

        {/* ── Footer provenance ── */}
        <FadeIn delay={0.25}>
          <div
            className="flex items-center gap-6 mt-14 pt-10 flex-wrap"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-[10px]">
              <div
                style={{ width: 6, height: 6, backgroundColor: C.blue, flexShrink: 0 }}
                aria-hidden
              />
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: C.faint }}
              >
                All examples in active production deployment
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div
                style={{ width: 6, height: 6, backgroundColor: `${C.blue}50`, flexShrink: 0 }}
                aria-hidden
              />
              <span
                className="font-mono text-[10px] tracking-[0.14em] uppercase"
                style={{ color: C.faint }}
              >
                Sources: public reporting &amp; government announcements
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}