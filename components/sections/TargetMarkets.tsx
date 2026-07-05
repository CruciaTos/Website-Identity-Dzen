"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#000b12ff",
  accent: "#7EC3E2",
  accentSoft: "#B2D5E5",
  textPrimary: "#e5f3e5ff",
  textMuted: "rgba(229,243,229,0.65)",
  cardBg: "#0d0d0cff",
  cardBgHover: "#141413ff",
  cardBorder: "rgba(178,213,229,0.10)",
  cardBorderHover: "rgba(126,195,226,0.28)",
  divider: "rgba(178,213,229,0.10)",
  glowSpot: "rgba(126,195,226,0.08)",
  // Glass morphism tokens
  glassBg: "transparent",
  glassHighlight: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(178,213,229,0.15)",
  glassShadow: "0 12px 40px rgba(0,0,0,0.2)",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const TRANSITION = `0.42s cubic-bezier(0.22,1,0.36,1)`;

// ── Data ─────────────────────────────────────────────────────────────────────
interface MarketCard {
  id: string;
  title: string;
  description: string;
  hoverItems: string[];
}

const MARKET_CARDS: MarketCard[] = [
  {
    id: "finance",
    title: "Finance & Accounting",
    description:
      "Invoices, reconciliations, approvals, and reporting workflows slowed by manual review and disconnected systems.",
    hoverItems: ["Invoice matching", "Approval routing", "Reconciliation workflows", "Financial reporting"],
  },
  {
    id: "sales",
    title: "Sales & CRM Operations",
    description:
      "Lead management, follow-ups, pipeline updates, and customer workflows that fall between teams and tools.",
    hoverItems: ["Lead routing", "Follow-up automation", "CRM synchronization", "Pipeline visibility"],
  },
  {
    id: "support",
    title: "Customer Support",
    description:
      "Ticket triage, response workflows, escalation handling, and knowledge management across support channels.",
    hoverItems: ["Ticket classification", "Response drafting", "Escalation workflows", "Knowledge retrieval"],
  },
  {
    id: "hr",
    title: "HR & People Operations",
    description:
      "Employee onboarding, payroll preparation, compliance tracking, and workforce administration processes.",
    hoverItems: ["Employee onboarding", "Payroll preparation", "Compliance tracking", "Internal requests"],
  },
  {
    id: "ops",
    title: "Operations & Supply Chain",
    description:
      "Order management, vendor coordination, inventory workflows, and operational exception handling.",
    hoverItems: ["Order tracking", "Vendor coordination", "Inventory visibility", "Exception handling"],
  },
  {
    id: "data",
    title: "Data & Reporting",
    description:
      "Recurring reports, business intelligence workflows, data consolidation, and operational visibility systems.",
    hoverItems: ["Data aggregation", "Automated reporting", "KPI monitoring", "Anomaly detection"],
  },
];

function getColumnSiblingId(id: string): string | null {
  const pairs: Record<string, string> = {
    finance: "hr",
    hr: "finance",
    sales: "ops",
    ops: "sales",
    support: "data",
    data: "support",
  };
  return pairs[id] ?? null;
}

// ── SpotlightCard (unchanged) ────────────────────────────────────────────────
interface CardProps {
  card: MarketCard;
  index: number;
  isExpanded: boolean;
  isCompressed: boolean;
  onEnter: (id: string) => void;
  onLeave: () => void;
}

function SpotlightCard({ card, index, isExpanded, isCompressed, onEnter, onLeave }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${C.glowSpot} 0%, rgba(126,195,226,0.012) 50%, transparent 72%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    onLeave();
    if (spotRef.current) spotRef.current.style.background = "transparent";
  }, [onLeave]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onEnter(card.id)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: index * 0.35, ease: EASE }}
      style={{
        flexGrow: isExpanded ? 1.36 : isCompressed ? 0.64 : 1,
        flexShrink: 0,
        flexBasis: 0,
        minHeight: 0,
        transition: `flex-grow ${TRANSITION}, border-color 0.35s ease, background-color 0.35s ease`,
        position: "relative",
        backgroundColor: isExpanded ? C.cardBgHover : C.cardBg,
        border: `1px solid ${isExpanded ? C.cardBorderHover : C.cardBorder}`,
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "default",
        isolation: "isolate",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div ref={spotRef} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", transition: isExpanded ? "none" : "background 0.5s ease", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: `linear-gradient(90deg, transparent, ${C.accent}${isExpanded ? "55" : "18"}, transparent)`, transition: `background ${TRANSITION}`, zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "clamp(22px, 2.8vw, 36px)", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        <h3 style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(28px, 2vw, 38px)",
          fontWeight: 500,
          color: C.textPrimary,
          letterSpacing: "-0.022em",
          lineHeight: "1.15",
          marginBottom: "12px",
          flexShrink: 0,
        }}>
          {card.title}
        </h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 300, color: C.textMuted, lineHeight: "1.72", margin: 0, flexShrink: 0 }}>
          {card.description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div key={`expand-${card.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: EASE }} style={{ marginTop: "20px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "1px", backgroundColor: C.divider, marginBottom: "14px", flexShrink: 0 }} />
              <div style={{ flex: 1, overflow: "hidden" }}>
                {card.hoverItems.map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22, delay: 0.05 + i * 0.06, ease: EASE }} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 0" }}>
                    <span aria-hidden="true" style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", background: C.accent, flexShrink: 0, opacity: 0.85 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", letterSpacing: "0.07em", color: "rgba(178,213,229,0.75)", lineHeight: 1 }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }} style={{ marginTop: "auto", paddingTop: "12px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <div style={{ width: "20px", height: "1px", background: C.accent, opacity: 0.45 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(178,213,229,0.38)" }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCompressed && (
            <motion.div key={`compress-${card.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ marginTop: "auto", paddingTop: "8px", display: "flex", gap: "4px", flexShrink: 0 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} aria-hidden="true" style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", background: `rgba(178,213,229,${0.12 + i * 0.05})` }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── CardColumn ────────────────────────────────────────────────────────────────
interface ColumnProps {
  cards: MarketCard[];
  indices: number[];
  hoveredId: string | null;
  onEnter: (id: string) => void;
  onLeave: () => void;
}

function CardColumn({ cards, indices, hoveredId, onEnter, onLeave }: ColumnProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 14px)", height: "100%" }}>
      {cards.map((card, i) => {
        const siblingId = getColumnSiblingId(card.id);
        const isExpanded = hoveredId === card.id;
        const isCompressed = hoveredId !== null && siblingId === hoveredId;
        return (
          <SpotlightCard
            key={card.id}
            card={card}
            index={indices[i]}
            isExpanded={isExpanded}
            isCompressed={isCompressed}
            onEnter={onEnter}
            onLeave={onLeave}
          />
        );
      })}
    </div>
  );
}

// ── TargetMarkets with grid lines added ──────────────────────────────────────
export function TargetMarkets() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleEnter = useCallback((id: string) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  const columns = [
    { cards: [MARKET_CARDS[0], MARKET_CARDS[3]], indices: [0, 3] },
    { cards: [MARKET_CARDS[1], MARKET_CARDS[4]], indices: [1, 4] },
    { cards: [MARKET_CARDS[2], MARKET_CARDS[5]], indices: [2, 5] },
  ];

  return (
    <section
      id="target-markets"
      aria-label="Target markets — operational functions DZen optimizes"
      style={{
        position: "relative",
        backgroundColor: "transparent",
        padding: "clamp(88px, 11vw, 144px) 0",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "420px",
          background: "radial-gradient(ellipse at center top, rgba(126,195,226,0.045) 0%, transparent 62%)",
          filter: "blur(1px)",
          pointerEvents: "none",
        }}
      />

      {/* ★ Super‑wide wrapper ★ */}
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 clamp(12px, 1.5vw, 24px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Glass container ── */}
        <div
          style={{
            position: "relative",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: C.glassShadow,
          }}
        >
          {/* Transparent blur layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: C.glassBg,
              backdropFilter: "blur(80px)",
              WebkitBackdropFilter: "blur(80px)",
              zIndex: 0,
            }}
          />

          {/* Grid lines overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `
                linear-gradient(rgba(178,213,229,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(178,213,229,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          {/* Top glossy reflection */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${C.glassHighlight}, transparent)`,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Gradient border */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "40px",
              padding: "1px",
              background: "linear-gradient(135deg, rgba(178,213,229,0.25) 0%, rgba(178,213,229,0.05) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 3, padding: "clamp(56px, 7vw, 96px) clamp(40px, 5vw, 72px)" }}>
            {/* ── Section header (no label) ── */}
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE }}
              style={{ marginBottom: "clamp(52px, 8vw, 80px)" }}
            >
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(31px, 4.2vw, 57px)", fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.026em", lineHeight: "1.1", marginBottom: "20px", maxWidth: "700px" }}>
                Built Around How Businesses Actually Operate
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 300, color: C.textMuted, lineHeight: "1.72", maxWidth: "540px", margin: 0 }}>
                We optimize the business functions where repetitive work, disconnected systems,
                and operational inefficiencies create measurable costs.
              </p>
            </motion.div>

            {/* ── Column grid ── */}
            <div
              className="tm-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(10px, 1.4vw, 18px)",
                height: "clamp(520px, 58vh, 660px)",
              }}
            >
              {columns.map((col, ci) => (
                <CardColumn
                  key={ci}
                  cards={col.cards}
                  indices={col.indices}
                  hoveredId={hoveredId}
                  onEnter={handleEnter}
                  onLeave={handleLeave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .tm-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            height: auto !important;
          }
        }
        @media (max-width: 600px) {
          .tm-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}