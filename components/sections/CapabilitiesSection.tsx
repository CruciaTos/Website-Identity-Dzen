"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ModuleSpec {
  id: string;
  shortId: string;
  label: string;
  signal: string;
  headline: string;
  thesis: string;
  operationalNote: string;
  telemetry: { label: string; value: string }[];
  systemDiagram: React.FC<{ active: boolean }>;
}

// ── System Diagrams ──────────────────────────────────────────────────────────

function DiagnosticDiagram({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      {/* Grid background */}
      <pattern id="dgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="220" fill="url(#dgrid)" />

      {/* Source nodes */}
      {[
        { x: 20, y: 30, label: "ERP", latency: "142ms" },
        { x: 20, y: 80, label: "CRM", latency: "89ms" },
        { x: 20, y: 130, label: "HRIS", latency: "204ms" },
        { x: 20, y: 180, label: "COMM", latency: "67ms" },
      ].map(({ x, y, label, latency }, i) => (
        <g key={label}>
          <motion.rect
            x={x} y={y} width={60} height={22} rx={2}
            fill="rgba(143,120,96,0.08)" stroke="rgba(143,120,96,0.3)" strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
          />
          <motion.text
            x={x + 30} y={y + 14} textAnchor="middle"
            fill="#c9a96e" fontSize={8} fontFamily="monospace" letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
          >{label}</motion.text>

          {/* Flow line to scanner */}
          <motion.line
            x1={x + 60} y1={y + 11} x2={175} y2={105 + (i - 1.5) * 16}
            stroke="rgba(201,169,110,0.2)" strokeWidth={0.5} strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          />

          {/* Latency label */}
          <motion.text
            x={x + 68} y={y + 9} fill="rgba(255,255,255,0.2)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
          >{latency}</motion.text>
        </g>
      ))}

      {/* Central scanner */}
      <motion.rect
        x={175} y={72} width={100} height={66} rx={4}
        fill="rgba(143,120,96,0.1)" stroke="rgba(143,120,96,0.5)" strokeWidth={1}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ transformOrigin: "225px 105px" }}
      />
      <motion.text
        x={225} y={95} textAnchor="middle"
        fill="#c9a96e" fontSize={9} fontFamily="monospace" letterSpacing="0.12em"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >DIAGNOSTIC</motion.text>
      <motion.text
        x={225} y={108} textAnchor="middle"
        fill="rgba(201,169,110,0.5)" fontSize={7.5} fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >SCAN ACTIVE</motion.text>
      {/* Scan line animation */}
      <motion.line
        x1={176} y1={105} x2={274} y2={105}
        stroke="rgba(201,169,110,0.6)" strokeWidth={0.5}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: [0, 1, 1, 0], x: [0, 0, 0, 0] } : { scaleX: 0 }}
        transition={{ duration: 2, delay: 0.5, repeat: active ? Infinity : 0, repeatDelay: 1 }}
        style={{ transformOrigin: "176px 105px" }}
      />
      <motion.text
        x={225} y={126} textAnchor="middle"
        fill="rgba(255,255,255,0.25)" fontSize={7} fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.45 }}
      >47 processes mapped</motion.text>

      {/* Output nodes */}
      {[
        { y: 42, label: "WORKFLOW MAP", status: "GEN" },
        { y: 82, label: "FRICTION INDEX", status: "CALC" },
        { y: 122, label: "AUTO TARGETS", status: "RANK" },
        { y: 162, label: "ROI PROJECTIONS", status: "EST" },
      ].map(({ y, label, status }, i) => (
        <g key={label}>
          <motion.line
            x1={275} y1={105 + (i - 1.5) * 16} x2={340} y2={y + 11}
            stroke="rgba(201,169,110,0.2)" strokeWidth={0.5} strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
          />
          <motion.rect
            x={340} y={y} width={120} height={22} rx={2}
            fill="rgba(143,120,96,0.06)" stroke="rgba(143,120,96,0.2)" strokeWidth={0.5}
            initial={{ opacity: 0, x: 10 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
          />
          <motion.text
            x={352} y={y + 14} fill="rgba(255,255,255,0.4)" fontSize={7.5} fontFamily="monospace" letterSpacing="0.08em"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
          >{label}</motion.text>
          <motion.text
            x={450} y={y + 14} fill="rgba(201,169,110,0.5)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.85 + i * 0.1 }}
          >{status}</motion.text>
        </g>
      ))}

      {/* Status bar */}
      <motion.rect
        x={0} y={205} width={520} height={15} fill="rgba(143,120,96,0.04)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />
      <motion.text
        x={12} y={215} fill="rgba(201,169,110,0.4)" fontSize={7} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >DZEN.OS — DIAGNOSTIC MODULE v2.1 — ALL SYSTEMS NOMINAL</motion.text>
    </svg>
  );
}

function ArchitectureDiagram({ active }: { active: boolean }) {
  const layers = [
    { y: 20, label: "AGENT LAYER", sublabel: "Autonomous decision execution", color: "rgba(201,169,110,0.85)" },
    { y: 72, label: "ORCHESTRATION", sublabel: "Multi-system coordination + routing", color: "rgba(201,169,110,0.65)" },
    { y: 124, label: "INTEGRATION LAYER", sublabel: "API contracts + event streams", color: "rgba(201,169,110,0.45)" },
    { y: 176, label: "DATA SUBSTRATE", sublabel: "Unified schema + transformation", color: "rgba(201,169,110,0.28)" },
  ];

  return (
    <svg viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <pattern id="agrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="220" fill="url(#agrid)" />

      {layers.map(({ y, label, sublabel, color }, i) => (
        <g key={label}>
          <motion.rect
            x={40} y={y} width={360} height={40} rx={2}
            fill={`rgba(143,120,96,0.${i === 0 ? "12" : i === 1 ? "08" : i === 2 ? "05" : "03"})`}
            stroke={`rgba(201,169,110,${i === 0 ? "0.4" : i === 1 ? "0.25" : "0.15"})`}
            strokeWidth={0.5}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "40px center" }}
          />
          <motion.rect
            x={40} y={y} width={3} height={40}
            fill={color}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.12 }}
          />
          <motion.text
            x={56} y={y + 17} fill={color} fontSize={8.5} fontFamily="monospace" letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + i * 0.12 }}
          >{label}</motion.text>
          <motion.text
            x={56} y={y + 30} fill="rgba(255,255,255,0.22)" fontSize={7.5} fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
          >{sublabel}</motion.text>
          <motion.text
            x={390} y={y + 24} fill="rgba(255,255,255,0.15)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 + i * 0.12 }}
          >DESIGNED</motion.text>
        </g>
      ))}

      {/* Connection lines between layers */}
      {[60, 112, 164].map((y, i) => (
        <motion.line key={y} x1={220} y1={y} x2={220} y2={y + 12}
          stroke="rgba(201,169,110,0.3)" strokeWidth={0.5}
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.65 + i * 0.12 }}
        />
      ))}

      {/* Integration points on right */}
      {[
        { y: 32, system: "SALESFORCE", dir: "→" },
        { y: 84, system: "ORACLE", dir: "→" },
        { y: 136, system: "WORKDAY", dir: "←" },
        { y: 188, system: "SNOWFLAKE", dir: "←" },
      ].map(({ y, system, dir }) => (
        <g key={system}>
          <motion.text x={420} y={y} fill="rgba(201,169,110,0.35)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >{dir} {system}</motion.text>
        </g>
      ))}

      {/* Status */}
      <motion.rect x={0} y={205} width={520} height={15} fill="rgba(143,120,96,0.04)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />
      <motion.text x={12} y={215} fill="rgba(201,169,110,0.4)" fontSize={7} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >ARCHITECTURE FINALIZED — 4 LAYERS — CLIENT SIGN-OFF COMPLETE</motion.text>
    </svg>
  );
}

function RuntimeDiagram({ active }: { active: boolean }) {
  const agents = [
    { cx: 90, cy: 80, label: "INVOICE\nAGENT", tasks: 847 },
    { cx: 220, cy: 50, label: "ROUTING\nAGENT", tasks: 2340 },
    { cx: 350, cy: 80, label: "REPORT\nAGENT", tasks: 445 },
    { cx: 220, cy: 150, label: "APPROVAL\nAGENT", tasks: 1128 },
  ];

  return (
    <svg viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <pattern id="rgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="220" fill="url(#rgrid)" />

      {/* Connecting edges */}
      {[
        [90, 80, 220, 50],
        [220, 50, 350, 80],
        [90, 80, 220, 150],
        [350, 80, 220, 150],
        [220, 50, 220, 150],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(201,169,110,0.15)" strokeWidth={0.5} strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
        />
      ))}

      {/* Agent nodes */}
      {agents.map(({ cx, cy, label, tasks }, i) => (
        <g key={label}>
          <motion.circle cx={cx} cy={cy} r={28}
            fill="rgba(143,120,96,0.1)" stroke="rgba(201,169,110,0.4)" strokeWidth={0.8}
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {/* Pulse ring */}
          <motion.circle cx={cx} cy={cy} r={32}
            fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth={0.5}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? {
              scale: [1, 1.2, 1],
              opacity: [0, 0.6, 0],
            } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 2.4, delay: 0.6 + i * 0.3, repeat: active ? Infinity : 0, ease: "easeOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {label.split("\n").map((line, j) => (
            <motion.text key={j} x={cx} y={cy - 4 + j * 11} textAnchor="middle"
              fill="#c9a96e" fontSize={7.5} fontFamily="monospace" letterSpacing="0.1em"
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.12 }}
            >{line}</motion.text>
          ))}
          <motion.text x={cx} y={cy + 19} textAnchor="middle"
            fill="rgba(255,255,255,0.3)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.55 + i * 0.12 }}
          >{tasks}/day</motion.text>
        </g>
      ))}

      {/* Metrics panel */}
      <motion.rect x={420} y={30} width={88} height={140} rx={3}
        fill="rgba(143,120,96,0.05)" stroke="rgba(143,120,96,0.2)" strokeWidth={0.5}
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      {[
        { label: "AGENTS", value: "4" },
        { label: "TASKS/D", value: "4,760" },
        { label: "LATENCY", value: "840ms" },
        { label: "ERRORS", value: "0.03%" },
        { label: "STATUS", value: "LIVE" },
      ].map(({ label, value }, i) => (
        <g key={label}>
          <motion.text x={430} y={52 + i * 22} fill="rgba(255,255,255,0.25)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.07 }}
          >{label}</motion.text>
          <motion.text x={500} y={52 + i * 22} textAnchor="end"
            fill={value === "LIVE" ? "#c9a96e" : "rgba(201,169,110,0.7)"} fontSize={7.5} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.85 + i * 0.07 }}
          >{value}</motion.text>
        </g>
      ))}

      <motion.rect x={0} y={205} width={520} height={15} fill="rgba(143,120,96,0.04)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.text x={12} y={215} fill="rgba(201,169,110,0.4)" fontSize={7} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.3 }}
      >RUNTIME ACTIVE — 4 AGENTS RUNNING — WEEK 2 OF DEPLOYMENT</motion.text>
    </svg>
  );
}

function DeploymentDiagram({ active }: { active: boolean }) {
  const stages = [
    { x: 20, label: "STAGING", check: true },
    { x: 135, label: "CANARY 10%", check: true },
    { x: 260, label: "ROLLOUT 50%", check: true },
    { x: 385, label: "PRODUCTION", check: false },
  ];

  return (
    <svg viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <pattern id="dpgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="220" fill="url(#dpgrid)" />

      {/* Pipeline track */}
      <motion.line x1={20} y1={90} x2={500} y2={90}
        stroke="rgba(201,169,110,0.08)" strokeWidth={1}
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {stages.map(({ x, label, check }, i) => (
        <g key={label}>
          {/* Node */}
          <motion.circle cx={x + 50} cy={90} r={18}
            fill={i < 3 ? "rgba(201,169,110,0.12)" : "rgba(143,120,96,0.18)"}
            stroke={i < 3 ? "rgba(201,169,110,0.35)" : "rgba(201,169,110,0.7)"} strokeWidth={i < 3 ? 0.5 : 1}
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${x + 50}px 90px` }}
          />

          {check ? (
            <motion.text x={x + 50} y={94} textAnchor="middle"
              fill="rgba(201,169,110,0.8)" fontSize={11} fontFamily="monospace"
              initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.45 + i * 0.18 }}
            >✓</motion.text>
          ) : (
            <>
              <motion.circle cx={x + 50} cy={90} r={5}
                fill="#c9a96e"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: [0, 1, 0.4, 1] } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 1.0, repeat: active ? Infinity : 0 }}
              />
            </>
          )}

          <motion.text x={x + 50} y={118} textAnchor="middle"
            fill={i === 3 ? "#c9a96e" : "rgba(255,255,255,0.3)"} fontSize={7.5} fontFamily="monospace" letterSpacing="0.08em"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.18 }}
          >{label}</motion.text>

          {i < 3 && (
            <motion.line x1={x + 68} y1={90} x2={x + 132} y2={90}
              stroke="rgba(201,169,110,0.25)" strokeWidth={0.5}
              initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.18 }}
            />
          )}
        </g>
      ))}

      {/* Timeline */}
      {[
        { x: 70, label: "09:14", note: "deploy triggered" },
        { x: 185, label: "09:15", note: "tests 47/47" },
        { x: 310, label: "09:16", note: "canary stable" },
        { x: 435, label: "09:18", note: "full rollout" },
      ].map(({ x, label, note }) => (
        <g key={label}>
          <motion.text x={x} y={140} textAnchor="middle"
            fill="rgba(201,169,110,0.45)" fontSize={7.5} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >{label}</motion.text>
          <motion.text x={x} y={153} textAnchor="middle"
            fill="rgba(255,255,255,0.18)" fontSize={7} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >{note}</motion.text>
        </g>
      ))}

      {/* Zero-downtime badge */}
      <motion.rect x={160} y={165} width={200} height={24} rx={2}
        fill="rgba(143,120,96,0.08)" stroke="rgba(143,120,96,0.25)" strokeWidth={0.5}
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />
      <motion.text x={260} y={181} textAnchor="middle"
        fill="rgba(201,169,110,0.6)" fontSize={8} fontFamily="monospace" letterSpacing="0.12em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >ZERO DOWNTIME — ALL PROTOCOLS ACTIVE</motion.text>

      <motion.rect x={0} y={205} width={520} height={15} fill="rgba(143,120,96,0.04)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.3 }}
      />
      <motion.text x={12} y={215} fill="rgba(201,169,110,0.4)" fontSize={7} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.4 }}
      >DEPLOYMENT PIPELINE — ROLLBACK READY — 4-MINUTE FULL REVERT</motion.text>
    </svg>
  );
}

function ObservabilityDiagram({ active }: { active: boolean }) {
  const metrics = [
    { label: "UPTIME", value: "99.97%", w: 0.9997, y: 30 },
    { label: "THROUGHPUT", value: "4,840 tasks/d", w: 0.76, y: 65 },
    { label: "P99 LATENCY", value: "1.2s", w: 0.55, y: 100 },
    { label: "ERROR RATE", value: "0.03%", w: 0.08, y: 135 },
    { label: "COVERAGE", value: "100% ops", w: 1.0, y: 170 },
  ];

  return (
    <svg viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <pattern id="obgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="220" fill="url(#obgrid)" />

      {metrics.map(({ label, value, w, y }, i) => (
        <g key={label}>
          <motion.text x={12} y={y + 13} fill="rgba(255,255,255,0.3)" fontSize={7.5} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.1 }}
          >{label}</motion.text>

          {/* Bar track */}
          <motion.rect x={120} y={y} width={280} height={22} rx={2}
            fill="rgba(143,120,96,0.05)"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
          />
          {/* Bar fill */}
          <motion.rect x={120} y={y} width={0} height={22} rx={2}
            fill={`rgba(201,169,110,${0.12 + (1 - w) * 0.05})`}
            stroke={`rgba(201,169,110,${0.2 + w * 0.2})`} strokeWidth={0.5}
            initial={{ width: 0 }}
            animate={active ? { width: 280 * w } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.text x={410} y={y + 14} fill="rgba(201,169,110,0.8)" fontSize={8.5} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
          >{value}</motion.text>

          {/* Trending indicator */}
          <motion.text x={500} y={y + 14} textAnchor="end"
            fill={label === "ERROR RATE" ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.5)"}
            fontSize={8} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.65 + i * 0.1 }}
          >{label === "ERROR RATE" ? "↓" : "→"}</motion.text>
        </g>
      ))}

      <motion.rect x={0} y={205} width={520} height={15} fill="rgba(143,120,96,0.04)"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.text x={12} y={215} fill="rgba(201,169,110,0.4)" fontSize={7} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.3 }}
      >OBSERVABILITY MODULE — LIVE DATA — 24/7 MONITORING ACTIVE</motion.text>
    </svg>
  );
}

function ExpansionDiagram({ active }: { active: boolean }) {
  const nodes = [
    { cx: 260, cy: 100, label: "CORE\nSYSTEM", r: 30, depth: 0 },
    { cx: 130, cy: 60, label: "FINANCE", r: 20, depth: 1 },
    { cx: 390, cy: 60, label: "HR OPS", r: 20, depth: 1 },
    { cx: 130, cy: 145, label: "SALES", r: 20, depth: 1 },
    { cx: 390, cy: 145, label: "LEGAL", r: 20, depth: 1 },
    { cx: 55, cy: 100, label: "PAYROLL", r: 14, depth: 2 },
    { cx: 465, cy: 100, label: "RECRUIT", r: 14, depth: 2 },
    { cx: 80, cy: 35, label: "AP/AR", r: 14, depth: 2 },
    { cx: 440, cy: 35, label: "ONBOARD", r: 14, depth: 2 },
  ];

  const edges = [
    [260, 100, 130, 60], [260, 100, 390, 60],
    [260, 100, 130, 145], [260, 100, 390, 145],
    [130, 60, 55, 100], [390, 60, 465, 100],
    [130, 60, 80, 35], [390, 60, 440, 35],
  ];

  return (
    <svg viewBox="0 0 520 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      <pattern id="exgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <rect width="520" height="200" fill="url(#exgrid)" />

      {edges.map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(201,169,110,0.18)" strokeWidth={0.5} strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
        />
      ))}

      {nodes.map(({ cx, cy, label, r, depth }, i) => (
        <g key={label}>
          <motion.circle cx={cx} cy={cy} r={r}
            fill={`rgba(143,120,96,${depth === 0 ? "0.18" : depth === 1 ? "0.1" : "0.06"})`}
            stroke={`rgba(201,169,110,${depth === 0 ? "0.6" : depth === 1 ? "0.3" : "0.2"})`}
            strokeWidth={depth === 0 ? 1 : 0.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {label.split("\n").map((line, j) => (
            <motion.text key={j} x={cx} y={cy - (label.includes("\n") ? 4 : 0) + j * 10}
              textAnchor="middle"
              fill={depth === 0 ? "#c9a96e" : "rgba(201,169,110,0.55)"}
              fontSize={depth === 0 ? 7.5 : depth === 1 ? 7 : 6.5}
              fontFamily="monospace" letterSpacing="0.08em"
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.07 }}
            >{line}</motion.text>
          ))}
        </g>
      ))}

      <motion.text x={260} y={190} textAnchor="middle"
        fill="rgba(201,169,110,0.35)" fontSize={7.5} fontFamily="monospace" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.1 }}
      >OPERATIONAL GRAPH — 4 DEPARTMENTS LIVE — 4 IN QUEUE</motion.text>
    </svg>
  );
}

// ── Module Data ────────────────────────────────────────────────────────────────

const MODULES: ModuleSpec[] = [
  {
    id: "diagnostic",
    shortId: "DIAG",
    label: "Systems Intelligence",
    signal: "SCAN COMPLETE",
    headline: "We map exactly how your business operates — before writing a line of automation.",
    thesis:
      "Most AI projects fail because they're built on assumptions about how a business works, not direct observation. We embed ourselves in your actual operations — interviewing the people doing the work, shadowing processes, analyzing system logs — and produce a precise operational map. Every workflow documented. Every friction point named. Every manual dependency quantified. This is the intelligence layer that makes everything that follows exact rather than approximate.",
    operationalNote:
      "The diagnostic engagement runs 5 business days and produces a prioritized automation opportunity map with ROI projections tied to actual operational data. No assumptions, no boilerplate. Every finding is evidenced.",
    telemetry: [
      { label: "Delivery", value: "5 business days" },
      { label: "Scope", value: "Full operations audit" },
      { label: "Output", value: "Ranked opportunity map" },
      { label: "Method", value: "Direct observation" },
    ],
    systemDiagram: DiagnosticDiagram,
  },
  {
    id: "architecture",
    shortId: "ARCH",
    label: "Integration Architecture",
    signal: "BLUEPRINT READY",
    headline: "The system design that makes automation buildable, auditable, and extensible from day one.",
    thesis:
      "Architecture is where most AI engagements quietly fail — not in development, but in design. A system that looks functional in isolation falls apart when it has to interact with a live CRM, a legacy ERP, and a data warehouse simultaneously. We design the integration architecture before any code is written: the agent topology, the event stream contracts, the data models, the approval routing logic, the audit trail. Every technical decision is tied to a specific operational outcome.",
    operationalNote:
      "Architecture design runs 2–3 weeks and produces a client-reviewed technical specification. Development only begins after sign-off. No scope surprises, no mid-build pivots.",
    telemetry: [
      { label: "Duration", value: "2–3 weeks" },
      { label: "Deliverable", value: "Technical specification" },
      { label: "Protocol", value: "Client sign-off required" },
      { label: "Coverage", value: "All layers documented" },
    ],
    systemDiagram: ArchitectureDiagram,
  },
  {
    id: "runtime",
    shortId: "RUN",
    label: "Agentic Runtime",
    signal: "AGENTS ACTIVE",
    headline: "Production-grade AI agents that execute operational tasks autonomously, not just assist with them.",
    thesis:
      "There is a significant gap between an AI that answers questions and an AI system that actually does the work. The second requires agents with precise decision logic, reliable tool use, structured error handling, escalation protocols, and integration with the systems where work actually happens. We build the runtime — the infrastructure of autonomous business execution. Agents that route approvals, process invoices, generate reports, flag anomalies, and coordinate across departments without a human in the loop unless the task requires one.",
    operationalNote:
      "First prototype of highest-priority workflows in 3–4 weeks. Structured feedback cycles before full production deployment. Every agent has complete observability built in from day one.",
    telemetry: [
      { label: "First prototype", value: "3–4 weeks" },
      { label: "Agent types", value: "Multi-agent systems" },
      { label: "Integration", value: "Your existing stack" },
      { label: "Oversight", value: "Human escalation paths" },
    ],
    systemDiagram: RuntimeDiagram,
  },
  {
    id: "deployment",
    shortId: "OPS",
    label: "Zero-Downtime Operations",
    signal: "PROD STABLE",
    headline: "Staged deployment with rollback-ready protocols. Your operations don't pause for AI.",
    thesis:
      "Deploying AI to mission-critical workflows requires the same operational discipline as deploying any critical infrastructure change. We use staged rollout sequences — canary releases, phased expansion, automated regression testing — with complete rollback protocols at each stage. The first 30 days post-deployment are treated as the highest-leverage period of the engagement: weekly feedback loops, rapid iteration, real-time performance monitoring. The system improves on actual usage, not theoretical design.",
    operationalNote:
      "Zero-downtime deployment standard on all engagements. Full revert capability maintained for 30 days post-launch. Weekly iteration cycles during stabilization period.",
    telemetry: [
      { label: "Downtime", value: "Zero" },
      { label: "Rollback SLA", value: "< 4 minutes" },
      { label: "Iteration cycle", value: "Weekly" },
      { label: "Stabilization", value: "30 days" },
    ],
    systemDiagram: DeploymentDiagram,
  },
  {
    id: "observability",
    shortId: "OBS",
    label: "Continuous Observability",
    signal: "MONITORING LIVE",
    headline: "Every automated decision logged, every system monitored, every anomaly surfaced before it becomes an incident.",
    thesis:
      "An AI system operating in production without comprehensive observability is a liability, not an asset. Every automated action needs to be logged, attributed, and reviewable. Every performance metric needs to be tracked over time. Every anomalous behavior needs to surface to the right people before it compounds. We implement full observability across every agent and workflow: structured audit logs, performance dashboards, anomaly detection, and proactive alerting — so your team has complete visibility into what the system is doing and why.",
    operationalNote:
      "24/7 monitoring across all live automations. Proactive alerting before issues become incidents. Scheduled performance reports with optimization recommendations.",
    telemetry: [
      { label: "Monitoring", value: "24/7 continuous" },
      { label: "Log retention", value: "Fully auditable" },
      { label: "Alerting", value: "Proactive" },
      { label: "Reporting", value: "Scheduled + on-demand" },
    ],
    systemDiagram: ObservabilityDiagram,
  },
  {
    id: "expansion",
    shortId: "EXP",
    label: "Operational Scaling",
    signal: "SCALING ACTIVE",
    headline: "Proven automation becomes infrastructure. Coverage expands to every department without starting from zero.",
    thesis:
      "The highest-ROI automation is the one you don't have to rebuild. As your first workflows stabilize, they become the foundation for expanding coverage — new departments, new processes, new data sources. We identify the next tier of automation opportunities, replicate proven patterns across teams, and extend the intelligence layer to absorb operational growth. The system compounds in value over time. The business scales its operational capacity without a proportional increase in headcount or overhead.",
    operationalNote:
      "Expansion planning begins at 60 days post-initial deployment. Departmental rollout follows proven workflow patterns to minimize delivery risk.",
    telemetry: [
      { label: "Expansion start", value: "60 days post-launch" },
      { label: "Model", value: "Pattern replication" },
      { label: "Coverage goal", value: "Org-wide automation" },
      { label: "Growth curve", value: "Compounding" },
    ],
    systemDiagram: ExpansionDiagram,
  },
];

// ── Module Navigator (Left Panel) ─────────────────────────────────────────────

function ModuleNavigator({
  modules,
  activeId,
  onSelect,
}: {
  modules: ModuleSpec[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Capabilities modules"
      className="flex flex-col gap-0 border-r border-white/[.06]"
    >
      {/* System header */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[.06]">
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/20 mb-1">
          DZen OS
        </div>
        <div className="font-mono text-[10px] tracking-[0.12em] text-[#c9a96e]">
          Capability Modules
        </div>
      </div>

      {/* Module list */}
      <div className="flex flex-col flex-1 py-3">
        {modules.map((mod, i) => {
          const isActive = mod.id === activeId;
          return (
            <button
              key={mod.id}
              onClick={() => onSelect(mod.id)}
              className={cn(
                "group relative flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-white/[.03]"
                  : "hover:bg-white/[.015]"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active indicator */}
              <span
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-px transition-all duration-300",
                  isActive ? "bg-[#c9a96e]" : "bg-transparent"
                )}
              />

              {/* Module index */}
              <span
                className={cn(
                  "font-mono text-[8px] tracking-[0.1em] flex-shrink-0 w-8 transition-colors duration-200",
                  isActive ? "text-[#c9a96e]" : "text-white/20 group-hover:text-white/30"
                )}
              >
                {mod.shortId}
              </span>

              <div className="flex flex-col gap-0.5 min-w-0">
                <span
                  className={cn(
                    "font-sans text-[12px] font-light leading-tight transition-colors duration-200 whitespace-nowrap truncate",
                    isActive ? "text-stone-100" : "text-white/40 group-hover:text-white/60"
                  )}
                >
                  {mod.label}
                </span>

                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-mono text-[8px] tracking-[0.12em] text-[#c9a96e] overflow-hidden whitespace-nowrap"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c9a96e] mr-1.5 align-middle animate-[pulse_2s_ease-in-out_infinite]" />
                    {mod.signal}
                  </motion.span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* System status footer */}
      <div className="px-5 py-4 border-t border-white/[.06]">
        <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-white/15 leading-relaxed">
          <div className="flex justify-between mb-1">
            <span>Status</span>
            <span className="text-[#c9a96e]">Operational</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Modules</span>
            <span className="text-white/30">{modules.length} active</span>
          </div>
          <div className="flex justify-between">
            <span>Version</span>
            <span className="text-white/30">2.1.0</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── Module Content Panel ───────────────────────────────────────────────────────

function ModuleContent({ module }: { module: ModuleSpec }) {
  const Diagram = module.systemDiagram;

  return (
    <motion.div
      key={module.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full"
    >
      {/* Module header */}
      <div className="px-10 pt-8 pb-6 border-b border-white/[.06] flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[9px] tracking-[0.16em] uppercase border border-[rgba(201,169,110,0.25)] text-[#c9a96e] px-2 py-1">
            {module.shortId}
          </span>
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/20">
            {module.label}
          </span>
        </div>

        <h3 className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] font-normal text-stone-100 leading-[1.12] tracking-[-0.02em] max-w-[620px]">
          {module.headline}
        </h3>
      </div>

      {/* Content grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-0 min-h-0">

          {/* Left: description + diagram */}
          <div className="px-10 py-7 border-r border-white/[.04]">

            {/* System diagram */}
            <div className="mb-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-white/[.04]" />
                <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-white/15">
                  System Diagram
                </span>
                <div className="h-px flex-1 bg-white/[.04]" />
              </div>
              <div className="bg-[rgba(255,255,255,0.012)] border border-white/[.04] p-4 relative overflow-hidden">
                {/* Corner marks */}
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[rgba(201,169,110,0.2)]" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[rgba(201,169,110,0.2)]" />
                <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[rgba(201,169,110,0.2)]" />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[rgba(201,169,110,0.2)]" />
                <Diagram active={true} />
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.85] mb-5">
              {module.thesis}
            </p>

            {/* Operational note */}
            <div className="border border-[rgba(201,169,110,0.15)] bg-[rgba(201,169,110,0.03)] px-5 py-4">
              <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-[#c9a96e] mb-2">
                Operational Note
              </div>
              <p className="font-sans text-[13px] font-light text-stone-300 leading-[1.8]">
                {module.operationalNote}
              </p>
            </div>
          </div>

          {/* Right: telemetry spec */}
          <div className="px-7 py-7 flex flex-col gap-5">
            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-white/20 mb-4">
                Module Spec
              </div>
              <div className="flex flex-col gap-0 border border-white/[.06] overflow-hidden">
                {module.telemetry.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 gap-4",
                      i < module.telemetry.length - 1 && "border-b border-white/[.05]"
                    )}
                  >
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/25 flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-mono text-[10px] text-[#c9a96e] text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System integrity */}
            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-white/20 mb-3">
                Compliance
              </div>
              <div className="flex flex-col gap-1.5">
                {["SOC 2 Type II", "ISO 27001", "Full audit trail", "Human oversight controls"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[rgba(201,169,110,0.4)] flex-shrink-0" />
                    <span className="font-mono text-[9px] text-white/30">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module CTA */}
            <div className="mt-auto pt-5 border-t border-white/[.05]">
              <a
                href="#cta"
                className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 hover:text-[#c9a96e] transition-colors duration-200"
              >
                <span>Discuss this module</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile Module Accordion ────────────────────────────────────────────────────

function MobileModuleAccordion({ module, index }: { module: ModuleSpec; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const Diagram = module.systemDiagram;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/[.07] last:border-b-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.14em] text-[#c9a96e]">
            {module.shortId}
          </span>
          <span className="font-sans text-[14px] font-light text-stone-200">
            {module.label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="font-mono text-[16px] text-white/30 flex-shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7">
              <div className="bg-[rgba(255,255,255,0.012)] border border-white/[.04] p-3 mb-5 relative">
                <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[rgba(201,169,110,0.2)]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[rgba(201,169,110,0.2)]" />
                <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[rgba(201,169,110,0.2)]" />
                <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[rgba(201,169,110,0.2)]" />
                <Diagram active={open} />
              </div>

              <h3 className="font-serif text-[18px] font-normal text-stone-100 leading-[1.2] tracking-[-0.015em] mb-4">
                {module.headline}
              </h3>

              <p className="font-sans text-[13px] font-light text-stone-400 leading-[1.8] mb-4">
                {module.thesis}
              </p>

              <div className="grid grid-cols-2 gap-px bg-white/[.05] border border-white/[.05] mb-4">
                {module.telemetry.map(({ label, value }) => (
                  <div key={label} className="bg-[#0f0e0d] px-3 py-3">
                    <div className="font-mono text-[8px] tracking-[0.1em] uppercase text-white/25 mb-1">{label}</div>
                    <div className="font-mono text-[10px] text-[#c9a96e]">{value}</div>
                  </div>
                ))}
              </div>

              <div className="border border-[rgba(201,169,110,0.15)] bg-[rgba(201,169,110,0.03)] px-4 py-3">
                <div className="font-mono text-[8px] tracking-[0.14em] uppercase text-[#c9a96e] mb-1.5">Operational Note</div>
                <p className="font-sans text-[12px] font-light text-stone-300 leading-[1.75]">{module.operationalNote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="px-10 pt-16 pb-10 border-b border-white/[.06] max-md:px-6 max-md:pt-12"
    >
      <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#c9a96e]" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#c9a96e]">
              What We Build
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal text-stone-100 leading-[1.06] tracking-[-0.025em]">
            An AI operating system
            <br />
            for your <em className="not-italic text-stone-400">entire organization.</em>
          </h2>
        </div>
        <div className="max-w-[380px] flex-shrink-0">
          <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.8]">
            Six interconnected capability modules. Each one a layer of the intelligence infrastructure we build for you — from initial diagnostic through to organization-wide operational scaling.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function CapabilitiesSection() {
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const sectionRef = useRef<HTMLElement>(null);

  const activeModule = MODULES.find((m) => m.id === activeId) ?? MODULES[0];

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      aria-label="Capabilities and service modules"
      className="bg-[#0f0e0d] border-t border-white/[.07] relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.014]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Section header — full width */}
      <SectionHeader />

      {/* Desktop: two-panel layout */}
      <div className="hidden lg:flex h-[780px] relative">
        {/* Left: module navigator — sticky */}
        <div className="w-[220px] xl:w-[240px] flex-shrink-0 sticky top-0 h-full overflow-y-auto">
          <ModuleNavigator
            modules={MODULES}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>

        {/* Right: module content — scrollable */}
        <div className="flex-1 min-w-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <ModuleContent key={activeId} module={activeModule} />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion layout */}
      <div className="lg:hidden">
        <div className="border-b border-white/[.06]">
          {MODULES.map((mod, i) => (
            <MobileModuleAccordion key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </div>

      {/* Section footer — outcomes strip */}
      <div className="px-10 py-10 border-t border-white/[.06] max-md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[.05] border border-white/[.05] overflow-hidden">
          {[
            { value: "5d", label: "Audit to roadmap" },
            { value: "30d", label: "First operational gains" },
            { value: "60d", label: "Measurable ROI" },
            { value: "0", label: "Downtime deployments" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-[#0f0e0d] px-7 py-8 flex flex-col gap-2 max-md:px-5 max-md:py-6">
              <div className="font-serif text-[clamp(1.6rem,3vw,2.25rem)] font-normal text-[#c9a96e] tracking-[-0.03em] leading-none">
                {value}
              </div>
              <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/25">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}