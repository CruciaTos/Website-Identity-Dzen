"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

interface PhaseItem {
  icon: string;
  name: string;
  desc: string;
}

interface Phase {
  index: string;
  tag: string;
  title: string;
  titleBreak: string;
  description: string;
  outcome: string;
  listLabel: string;
  items: PhaseItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    index: "01",
    tag: "Workflow Audit",
    title: "Workflow",
    titleBreak: "Audit",
    description:
      "We embed into your operations and study how work actually moves — people, systems, data, and handoffs. We surface every repetitive task, bottleneck, and manual step that shouldn't exist.",
    outcome:
      "Delivered in 5 business days. You receive a prioritized automation roadmap and ROI projections before we write a single line of code.",
    listLabel: "Deliverables",
    items: [
      { icon: "sitemap", name: "Workflow maps", desc: "Visual documentation of every process and handoff" },
      { icon: "report-analytics", name: "Process analysis", desc: "Bottlenecks, friction points, and redundant manual steps" },
      { icon: "sparkles", name: "Automation opportunities", desc: "Ranked by impact and estimated implementation effort" },
      { icon: "trending-up", name: "ROI projections", desc: "Hours saved, cost reduction, and capacity gained" },
      { icon: "route", name: "Implementation roadmap", desc: "Phased plan with milestones, timelines, and priorities" },
    ],
  },
  {
    index: "02",
    tag: "Agentic System Development",
    title: "Agentic System",
    titleBreak: "Development",
    description:
      "We design and build your custom AI automation stack — agents, workflows, pipelines, and integrations — from the ground up. Built to fit your existing tools, not the other way around.",
    outcome:
      "Working prototype in 2–4 weeks. You test and validate the system before we move to production deployment.",
    listLabel: "What we build",
    items: [
      { icon: "robot", name: "AI agents", desc: "Autonomous systems that execute operational tasks end-to-end" },
      { icon: "arrows-transfer-down", name: "Workflow automation", desc: "Multi-step business process orchestration" },
      { icon: "git-branch", name: "Multi-agent systems", desc: "Coordinated agents handling complex, branching operations" },
      { icon: "database", name: "Data pipelines", desc: "Reliable movement and transformation of business data" },
      { icon: "plug-connected", name: "CRM & ERP integrations", desc: "Native connections to your existing stack" },
      { icon: "layout-dashboard", name: "Internal operations tools", desc: "Custom interfaces built for your team's exact workflows" },
    ],
  },
  {
    index: "03",
    tag: "Deploy & Continuously Optimize",
    title: "Deploy &",
    titleBreak: "Continuously Optimize",
    description:
      "We ship to production, then stay close. Unlike firms that hand over a solution and leave, we run rapid feedback cycles — improving the system every week based on real-world usage data.",
    outcome:
      "Most clients see measurable operational gains within 30–60 days of first deployment.",
    listLabel: "How we operate",
    items: [
      { icon: "message-circle", name: "Client feedback loops", desc: "Structured weekly sessions to capture what's working" },
      { icon: "bolt", name: "Rapid iteration cycles", desc: "Changes deployed in days, not multi-week sprints" },
      { icon: "activity", name: "Performance monitoring", desc: "Real-time observability across every running automation" },
      { icon: "test-pipe", name: "Automated testing", desc: "Every change validated before it touches production" },
      { icon: "shield-check", name: "Reliability engineering", desc: "Rollback protocols and zero-downtime deployments" },
    ],
  },
  {
    index: "04",
    tag: "Scale & ROI",
    title: "Scale &",
    titleBreak: "Compound ROI",
    description:
      "Once your core workflows are validated, we expand automation coverage across departments. Each new automation compounds — making the entire operation faster and more efficient over time.",
    outcome:
      "Automation coverage typically doubles in the 60–120 day window as new opportunities surface from live usage.",
    listLabel: "Expected outcomes",
    items: [
      { icon: "clock-off", name: "Reduced manual work", desc: "Hours of repetitive tasks eliminated permanently" },
      { icon: "rocket", name: "Faster execution", desc: "Processes that took days completed in minutes" },
      { icon: "target", name: "Higher accuracy", desc: "AI-executed tasks with consistent, auditable outputs" },
      { icon: "users", name: "Increased operational capacity", desc: "Your team focuses on work that actually matters" },
      { icon: "coins", name: "Lower operating costs", desc: "Fewer manual touchpoints, less overhead, better margins" },
    ],
  },
];

const ROI_STATS = [
  { value: "5d", label: "Audit to roadmap" },
  { value: "30d", label: "First operational gains" },
  { value: "60d", label: "Measurable ROI" },
  { value: "0", label: "Downtime deployments" },
];

const CONNECTOR_LABELS = ["Audit", "Build", "Deploy", "Scale"];

// ── Sub-components ─────────────────────────────────────────────────────────

function TabiIcon({ name, className }: { name: string; className?: string }) {
  return <i className={cn(`ti ti-${name}`, className)} aria-hidden="true" />;
}

// Small segment that auto‑fills from 0% to 100% over `duration` ms
function ProgressSegment({ duration }: { duration: number }) {
  return (
    <div
      className="absolute inset-y-0 left-0 bg-[#c9a96e]"
      style={{
        animation: `fill-progress ${duration}ms linear forwards`,
      }}
    />
  );
}

function ConnectorBar({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center justify-between mb-16">
      {CONNECTOR_LABELS.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="text-center flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full border-2 transition-all duration-400",
                i <= activeIndex
                  ? "bg-[#c9a96e] border-[#c9a96e]"
                  : "bg-transparent border-white/20"
              )}
            />
            <span
              className={cn(
                "font-mono text-[9px] tracking-[.1em] uppercase transition-colors duration-300 whitespace-nowrap",
                i <= activeIndex ? "text-[#c9a96e]" : "text-white/25"
              )}
            >
              {label}
            </span>
          </div>
          {i < CONNECTOR_LABELS.length - 1 && (
            <div className="flex-1 h-px mx-3 mb-4 bg-white/[.07] overflow-hidden relative">
              {/* Completed segments – full width */}
              {i < activeIndex && (
                <div className="absolute inset-y-0 left-0 bg-[#c9a96e] w-full" />
              )}
              {/* Current segment – animated loading line (13 seconds) */}
              {i === activeIndex && (
                <ProgressSegment duration={13000} key={activeIndex} />
              )}
              {/* Future segments remain empty */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PhasePanel({ phase, active }: { phase: Phase; active: boolean }) {
  if (!active) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-phase-in">
      {/* Left */}
      <div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[.14em] uppercase text-[#c9a96e] border border-[rgba(201,169,110,0.3)] px-3 py-1.5 mb-5">
          <TabiIcon name="circle-dot" className="text-[13px]" />
          Phase {phase.index}
        </div>
        <h3 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-stone-100 leading-[1.15] mb-4">
          {phase.title}
          <br />
          {phase.titleBreak}
        </h3>
        <p className="text-[13px] font-light text-stone-400 leading-[1.85] mb-7">
          {phase.description}
        </p>
        <div className="flex items-start gap-3 text-[12px] text-stone-400 pl-3 border-l-2 border-[#c9a96e] bg-[rgba(201,169,110,0.06)] py-3 pr-4">
          <TabiIcon name="clock" className="text-[#c9a96e] text-[14px] mt-0.5 flex-shrink-0" />
          <span>{phase.outcome}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2">
        <div className="font-mono text-[9px] tracking-[.14em] uppercase text-white/25 pb-2 border-b border-white/[.07] mb-1">
          {phase.listLabel}
        </div>
        {phase.items.map((item, i) => (
          <div
            key={item.name}
            className="group flex items-center gap-3 px-4 py-3 border border-white/[.07] transition-all duration-200 hover:border-white/[.14] hover:bg-white/[.02] cursor-default"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <TabiIcon name={item.icon} className="text-[#c9a96e] text-[16px] flex-shrink-0" />
            <div>
              <div className="text-[12px] font-medium text-stone-200">{item.name}</div>
              <div className="text-[11px] font-light text-white/30 mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function CapabilitiesSection() {
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto‑advance on first reveal for 13s each, then stop
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => {
      setActivePhase((p) => (p < PHASES.length - 1 ? p + 1 : p));
    }, 13000);
    return () => clearTimeout(timer);
  }, [revealed, activePhase]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#0f0e0d] border-t border-white/[.07] py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          className={cn(
            "mb-16 transition-all duration-700",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-[#c9a96e] mb-5">
            How we work
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.025em] text-stone-100 leading-[1.1] mb-4">
            From operational chaos
            <br />
            to automated clarity.
          </h2>
          <p className="text-[15px] font-light text-stone-400 leading-[1.75] max-w-[540px]">
            A four-phase process that takes you from discovery to a continuously improving AI system — delivering measurable ROI within 30–60 days.
          </p>
        </div>

        {/* Connector progress with loading line */}
        <ConnectorBar activeIndex={activePhase} />

        {/* Phase tabs */}
        <div className="flex border border-white/[.07] mb-12 overflow-hidden">
          {PHASES.map((phase, i) => (
            <button
              key={phase.index}
              onClick={() => setActivePhase(i)}
              className={cn(
                "flex-1 py-3.5 px-2 font-mono text-[9px] tracking-[.1em] uppercase text-center",
                "border-r border-white/[.07] last:border-r-0 transition-all duration-200",
                i === activePhase
                  ? "text-[#c9a96e] bg-[rgba(201,169,110,0.08)]"
                  : "text-white/25 hover:text-white/40 hover:bg-white/[.02]"
              )}
            >
              <span className="block text-[15px] font-bold tracking-[0] mb-0.5 text-inherit">
                {phase.index}
              </span>
              {phase.tag}
            </button>
          ))}
        </div>

        {/* Phase content */}
        <div className="min-h-[420px]">
          {PHASES.map((phase, i) => (
            <PhasePanel key={phase.index} phase={phase} active={i === activePhase} />
          ))}
        </div>

        {/* ROI strip */}
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-px mt-16 bg-white/[.07] border border-white/[.07] overflow-hidden transition-all duration-700 delay-300",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {ROI_STATS.map(({ value, label }) => (
            <div key={label} className="bg-[#161512] py-5 px-4 text-center">
              <div className="text-[22px] font-bold text-[#c9a96e] tracking-[-0.02em] mb-1">
                {value}
              </div>
              <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/25">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes phase-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        .animate-phase-in {
          animation: phase-in 0.4s ease both;
        }
        @keyframes fill-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}