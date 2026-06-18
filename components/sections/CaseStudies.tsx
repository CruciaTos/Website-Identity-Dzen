"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";

/* ─────────────────────────────────────────────────────────────────────────
   Hero-exact colour tokens
   #00080eff  onyx bg  ·  #B2D5E5 candy blue  ·  #7ec3e2 headline blue
   (backgrounds now transparent)
───────────────────────────────────────────────────────────────────────── */
const C = {
  bg: "transparent",
  bgCard: "transparent",
  blue: "#B2D5E5",
  blueMid: "#7ec3e2",
  blueDeep: "#5aabce",
  border: "rgba(178,213,229,0.10)",
  borderHi: "rgba(178,213,229,0.22)",
  dim: "rgba(178,213,229,0.55)",
  faint: "rgba(178,213,229,0.32)",
  ghost: "rgba(178,213,229,0.018)",
} as const;

const SPRING = "cubic-bezier(0.22,1,0.36,1)";
const EASE_FM = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────────────────
   Data
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
    headline: "₹19.25 Cr in contractor penalties recovered via AI site monitoring.",
    body: "AI detected image reuse, missing videos, and code mismatches — violations that previously went unnoticed. Penalties were deducted directly from contractor bills.",
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
    body: "Katalyst cross‑references victim signatures in hours, not weeks, enabling faster identification and intervention.",
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
    body: "Travellers bypass officers — facial recognition and fingerprint scanners clear them in 15 seconds against government databases.",
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
   Desktop horizontal expandable card (metric boxes removed, text white)
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
        flex: isActive ? 2.9 : isCompressed ? 0.55 : 1,
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

      {/* Ghost number – unchanged */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-44px", right: "-10px",
          fontSize: "clamp(130px,15vw,240px)",
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
          position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
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
          background: `radial-gradient(ellipse at top left, ${c.accent}0D 0%, transparent 58%)`,
        }}
      />

      {/* ── Full content ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          padding: "48px 40px 48px 48px",
          display: "flex", flexDirection: "column",
          opacity: isCompressed ? 0 : 1,
          transition: "opacity 0.28s ease",
          pointerEvents: isCompressed ? "none" : "auto",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Tag row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "5px 12px",
              border: `1px solid ${c.accent}38`,
              backgroundColor: `${c.accent}0D`,
              color: "#a9bdf8ff",          // ← pure white
            }}
          >
            {c.tag}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a9bdf8ff",          // ← pure white (was C.faint)
            }}
          >
            {c.domain}
          </span>
        </div>

        {/* Org label */}
        <div
          className="font-mono"
          style={{
            fontSize: "13px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#a9bdf8ff",            // ← pure white (was C.dim)
            marginBottom: "12px",
          }}
        >
          {c.org}
        </div>

        {/* Headline */}
        <h3
          className="font-serif"
          style={{
            fontSize: "clamp(23px, 2.5vw, 39px)",
            fontWeight: 400,
            color: "#a9bdf8ff",            // ← pure white (was C.blue)
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            maxWidth: "520px",
            margin: 0,
          }}
        >
          {c.headline}
        </h3>

        {/* ── Expanded content (no metric boxes) ── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.42, ease: EASE_FM }}
              style={{ marginTop: "28px", flex: 1, display: "flex", flexDirection: "column" } as CSSProperties}
            >
              <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "24px" }} />

              <p
                className="font-sans"
                style={{
                  fontSize: "17px",
                  fontWeight: 300,
                  color: "#a9bdf8ff",      // ← pure white (was C.dim)
                  lineHeight: 1.75,
                  marginBottom: "28px",
                  maxWidth: "520px",
                }}
              >
                {c.body}
              </p>

              {/* Source citation */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                <div
                  style={{ width: "20px", height: "1px", backgroundColor: c.accent, flexShrink: 0 }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "#a9bdf8ff",    // ← pure white (was C.faint)
                  }}
                >
                  Source: {c.source}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Compressed strip ── */}
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
            fontSize: "12px",
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: "#a9bdf8ff",            // ← pure white (was `${c.accent}52`)
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
   Mobile card – click to expand (metric boxes removed, text white)
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
          position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
          backgroundColor: open ? c.accent : `${c.accent}40`,
          transition: "background-color 0.4s ease",
        }}
      />

      {/* Ghost number */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: "-16px", right: "-6px",
          fontSize: "clamp(90px,24vw,140px)",
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
          background: `radial-gradient(ellipse at top left, ${c.accent}0D 0%, transparent 55%)`,
        }}
      />

      {/* Mobile card content */}
      <div style={{ padding: "32px 24px 32px 32px", position: "relative", zIndex: 1 }}>
        {/* Tag row */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "5px 12px",
              border: `1px solid ${c.accent}38`,
              backgroundColor: `${c.accent}0D`,
              color: "#a9bdf8ff",         // ← pure white
            }}
          >
            {c.tag}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a9bdf8ff",         // ← pure white (was C.faint)
            }}
          >
            {c.domain}
          </span>
        </div>

        {/* Org */}
        <div
          className="font-mono"
          style={{
            fontSize: "13px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#a9bdf8ff",           // ← pure white (was C.dim)
            marginBottom: "10px",
          }}
        >
          {c.org}
        </div>

        {/* Headline + toggle */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(23px, 5.5vw, 31px)",
              fontWeight: 400,
              color: "#a9bdf8ff",         // ← pure white (was C.blue)
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              flex: 1,
              margin: 0,
            }}
          >
            {c.headline}
          </h3>

          <div
            style={{
              flexShrink: 0, width: 28, height: 28,
              border: `1px solid ${open ? C.borderHi : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "3px",
              transition: `transform 0.38s ${SPRING}, border-color 0.3s ease`,
              transform: open ? "rotate(45deg)" : "none",
            }}
          >
            <span
              className="font-mono"
              style={{
                color: "#a9bdf8ff",       // ← pure white (was open ? C.blue : C.faint)
                fontSize: "20px",
                lineHeight: 1,
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
              <div style={{ paddingTop: "20px" }}>
                <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "20px" }} />

                <p
                  className="font-sans"
                  style={{
                    fontSize: "17px",
                    fontWeight: 300,
                    color: "#a9bdf8ff",     // ← pure white (was C.dim)
                    lineHeight: 1.75,
                    marginBottom: "20px",
                  }}
                >
                  {c.body}
                </p>

                {/* Source */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "1px", backgroundColor: c.accent, flexShrink: 0 }} />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: "#a9bdf8ff",   // ← pure white (was C.faint)
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
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(20px, 3vw, 40px)",
        }}
      >
        <FadeIn>
          <div className="flex items-end justify-between mb-8 gap-12 max-md:flex-col max-md:items-start">
            <div>
              <SectionIndex number="04" tag="AI in the Real World" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal" style={{ color: C.blue }}>
                Think AI is still far away?
                <br />
                <em className="not-italic" style={{ color: C.dim }}>
                  Think again.
                </em>
              </h2>
            </div>
            <div className="max-w-[400px] flex-shrink-0">
              <p
                className="font-sans text-body font-light leading-[1.7]"
                style={{ color: C.dim }}
              >
                {/* placeholder */}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="hidden md:flex gap-[1px]"
            style={{ height: "clamp(620px,64vh,760px)" }}
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

          <div className="flex md:hidden flex-col gap-[1px]">
            {CASES.map((c) => (
              <MobileCard key={c.id} c={c} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}