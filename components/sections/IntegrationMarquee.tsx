"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG logos — brand-accurate, original aspect ratios, rendered at height
// ─────────────────────────────────────────────────────────────────────────────

function SAPLogo() {
  return (
    <svg height="22" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SAP">
      <path d="M0 0h80v28H0z" fill="currentColor" opacity="0.12"/>
      <path d="M8 19.5c0 .83.67 1.5 1.5 1.5h5.17c2.09 0 3.33-1.17 3.33-2.83 0-1.33-.75-2.17-2-2.5l-2.83-.67c-.58-.17-.83-.5-.83-.92 0-.58.5-.92 1.25-.92h4.5v-2.16H9.5c-2 0-3.17 1.08-3.17 2.75 0 1.33.75 2.08 1.83 2.42l2.84.66c.66.17.91.5.91.92 0 .58-.41.92-1.16.92H8.5a.5.5 0 00-.5.5v1.33zm11.5 1.5h2.5v-5.83l3.5 5.83H28V9h-2.5v5.92L22 9h-2.5v12zm10.5 0h2.58l.84-2.33h4.08l.83 2.33H40.5L36.75 9h-3L22 21zm4.42-4.5l1.33-3.75 1.33 3.75h-2.66z" fill="currentColor"/>
    </svg>
  );
}

function OracleLogo() {
  return (
    <svg height="16" viewBox="0 0 120 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Oracle NetSuite">
      <path d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11h98c6.075 0 11-4.925 11-11S115.075 0 109 0H11zm0 5.5h98c3.038 0 5.5 2.462 5.5 5.5s-2.462 5.5-5.5 5.5H11c-3.038 0-5.5-2.462-5.5-5.5S7.962 5.5 11 5.5z" fill="currentColor"/>
    </svg>
  );
}

function SalesforceLogo() {
  return (
    <svg height="26" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Salesforce">
      <path d="M24.8 6.2a12.2 12.2 0 0122 4.1 10 10 0 0112.6 9.6 10 10 0 01-10 10H11.5a11 11 0 01-11-11 11 11 0 0111-11 10.9 10.9 0 0113.3-1.7z" fill="currentColor"/>
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <svg height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="HubSpot">
      <path d="M19.5 11.2V8.5a2 2 0 001.2-1.8V6.6a2 2 0 00-4 0v.1a2 2 0 001.2 1.8v2.7a5.7 5.7 0 00-2.7 1.2L7.6 7.2a2.2 2.2 0 10-.9 1.5l7.4 5.1a5.7 5.7 0 00-.8 2.9 5.7 5.7 0 00.8 2.9l-2.3 2.3a1.8 1.8 0 10.9.9l2.3-2.3a5.7 5.7 0 003.5 1.2 5.7 5.7 0 005.7-5.7 5.7 5.7 0 00-4.7-5.8zm-1 9.8a3.8 3.8 0 110-7.6 3.8 3.8 0 010 7.6z" fill="currentColor"/>
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Slack">
      <path d="M5.8 17.5a2.9 2.9 0 110 5.8 2.9 2.9 0 010-5.8zm0-1.8H15V23h-9.2a2.9 2.9 0 010-5.8H5.8V15.7z" fill="currentColor"/>
      <path d="M17.5 22.2a2.9 2.9 0 015.8 0 2.9 2.9 0 01-5.8 0zm1.8 0V12.8H27v9.4a2.9 2.9 0 01-5.8 0h-1.8z" fill="currentColor" opacity="0.7"/>
      <path d="M22.2 5.8a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm0 1.8H13V0h9.2a2.9 2.9 0 010 5.8H22.2V7.6z" fill="currentColor"/>
      <path d="M10.5 5.8a2.9 2.9 0 01-5.8 0 2.9 2.9 0 015.8 0zM8.7 5.8v9.4H0V5.8a2.9 2.9 0 015.8 0v.1H8.7z" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function WorkdayLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Workday">
      <path d="M14 0a14 14 0 100 28A14 14 0 0014 0zm0 6.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15z" fill="currentColor"/>
      <circle cx="14" cy="14" r="4" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function SnowflakeLogo() {
  return (
    <svg height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Snowflake">
      <path d="M16 2v28M16 2l-3 5m3-5l3 5M16 30l-3-5m3 5l3-5M2 16h28M2 16l5-3m-5 3l5 3M30 16l-5-3m5 3l-5 3M6.3 6.3l19.4 19.4M6.3 6.3l.6 5.7m-.6-5.7l5.7.6M25.7 25.7l-.6-5.7m.6 5.7l-5.7-.6M25.7 6.3L6.3 25.7M25.7 6.3l-5.7.6m5.7-.6l-.6 5.7M6.3 25.7l.6-5.7m-.6 5.7l5.7-.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MicrosoftDynamicsLogo() {
  return (
    <svg height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Dynamics 365">
      <rect x="0" y="0" width="13" height="13" fill="currentColor"/>
      <rect x="17" y="0" width="13" height="13" fill="currentColor" opacity="0.6"/>
      <rect x="0" y="17" width="13" height="13" fill="currentColor" opacity="0.6"/>
      <rect x="17" y="17" width="13" height="13" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function TableauLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tableau">
      <path d="M13 5h2v18h-2V5zm-8 8h18v2H5v-2z" fill="currentColor"/>
      <path d="M7.5 9.5h13v1.5h-13V9.5zm0 7.5h13v1.5h-13V17zm2-8h1.5v13H9.5V9zm7 0H18v13h-1.5V9z" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function DatabricksLogo() {
  return (
    <svg height="24" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Databricks">
      <path d="M20 0L40 11.5v5L20 28 0 16.5v-5L20 0z" fill="currentColor" opacity="0.9"/>
      <path d="M1 13.5L20 24l19-10.5-19-10L1 13.5z" fill="currentColor" opacity="0.2"/>
      <path d="M20 14l-11-6.5v4L20 18l11-6.5v-4L20 14z" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function PipedriveeLogo() {
  return (
    <svg height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pipedrive">
      <circle cx="15" cy="15" r="15" fill="currentColor" opacity="0.15"/>
      <path d="M10.5 8v14M10.5 12a4.5 4.5 0 100 6 4.5 4.5 0 000-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function AtlassianLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Atlassian">
      <path d="M9.5 13.5C8.3 12 7.2 9.2 6.7 7c-.2-.9-1.3-1-1.7-.3L1.5 13.5c-.2.4-.1.9.3 1.2 3 2.3 7 3.8 12.2 3.8 5.2 0 9.2-1.5 12.2-3.8.4-.3.5-.8.3-1.2l-3.5-6.8c-.4-.7-1.5-.6-1.7.3-.5 2.2-1.6 5-2.8 6.5H9.5z" fill="currentColor"/>
      <path d="M14 1.5C14 1.5 11 7 11 10a3 3 0 006 0c0-3-3-8.5-3-8.5z" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function PostgreSQLLogo() {
  return (
    <svg height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PostgreSQL">
      <path d="M21 2C14 2 8 7.6 8 14.5c0 4.2 2.2 8 5.8 10.4l-.5 4.6h5.4l.3-3a13 13 0 002 .5c7 0 11-5.6 11-12.5S28 2 21 2zM11 14.5c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10a10 10 0 01-10-10z" fill="currentColor"/>
      <path d="M16 8v9l5-4.5L16 8z" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function RetoolLogo() {
  return (
    <svg height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Retool">
      <rect width="24" height="24" rx="5" fill="currentColor" opacity="0.12"/>
      <path d="M7 7h10v3H7V7zm0 4h6v3H7v-3zm0 4h8v3H7v-3z" fill="currentColor"/>
    </svg>
  );
}

function NotionLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Notion">
      <path d="M4 5l1.5-.5L20 3l4.5-.5c1 0 1.5.5 1.5 1.3v19.4c0 .8-.5 1.3-1.5 1.3L8 25.5c-.8 0-1.3-.3-1.7-.8L4.3 7c-.3-.7-.3-1.5-.3-2z" fill="currentColor" opacity="0.1"/>
      <path d="M9 9.5h10M9 13h10M9 16.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GreenhouseLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Greenhouse">
      <circle cx="14" cy="14" r="14" fill="currentColor" opacity="0.12"/>
      <path d="M19 11h-2V9a3 3 0 00-6 0v2H9a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1v-8a1 1 0 00-1-1zm-6-2a1 1 0 012 0v2h-2V9zm3 8h-4v-2h4v2z" fill="currentColor"/>
    </svg>
  );
}

function ADPLogo() {
  return (
    <svg height="18" viewBox="0 0 70 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ADP">
      <path d="M8 4L0 20h5l1.5-3.5h7L15 20h5L12 4H8zm2 4.5l2.2 5H7.8L10 8.5zM20 4v16h8c5 0 8-3 8-8s-3-8-8-8h-8zm5 4h3c2 0 3.3 1.5 3.3 4s-1.3 4-3.3 4h-3V8zm15-4v16h5v-5h3c3.8 0 6-2 6-5.5S51.8 4 48 4h-8zm5 4h3c1.3 0 2 .8 2 1.5s-.7 1.5-2 1.5h-3V8z" fill="currentColor"/>
    </svg>
  );
}

function BambooHRLogo() {
  return (
    <svg height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BambooHR">
      <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.12"/>
      <path d="M16 6c-1 0-1.5.7-1.5 1.5v4.7c-1-.7-2.5-1.2-4-1.2-1 0-1.5.7-1.5 1.5s.5 1.5 1.5 1.5c2 0 3.5 1.2 4 3H10a1.5 1.5 0 000 3h4.5v4.5a1.5 1.5 0 003 0V20H22a1.5 1.5 0 000-3h-4.5c.5-1.8 2-3 4-3 1 0 1.5-.7 1.5-1.5s-.5-1.5-1.5-1.5c-1.5 0-3 .5-4 1.2V7.5C17.5 6.7 17 6 16 6z" fill="currentColor"/>
    </svg>
  );
}

function LookerLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Looker">
      <circle cx="14" cy="14" r="13" fill="currentColor" opacity="0.12"/>
      <circle cx="14" cy="11" r="5" fill="currentColor" opacity="0.6"/>
      <path d="M14 16c-3 0-5 1.5-5 3.5C9 21.5 11.2 23 14 23s5-1.5 5-3.5c0-2-2-3.5-5-3.5z" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function PowerBILogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power BI">
      <rect x="2" y="12" width="5" height="13" rx="1" fill="currentColor"/>
      <rect x="9" y="8" width="5" height="17" rx="1" fill="currentColor" opacity="0.7"/>
      <rect x="16" y="4" width="5" height="21" rx="1" fill="currentColor" opacity="0.85"/>
      <rect x="23" y="16" width="3" height="9" rx="1" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function QuickBooksLogo() {
  return (
    <svg height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="QuickBooks">
      <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.12"/>
      <path d="M8 16c0-3.31 2.69-6 6-6h1v2h-1c-2.21 0-4 1.79-4 4s1.79 4 4 4h1v2h-1c-3.31 0-6-2.69-6-6zm16 0c0 3.31-2.69 6-6 6h-1v-2h1c2.21 0 4-1.79 4-4s-1.79-4-4-4h-1V10h1c3.31 0 6 2.69 6 6zm-9 0a1 1 0 112 0 1 1 0 01-2 0z" fill="currentColor"/>
    </svg>
  );
}

function AsanaLogo() {
  return (
    <svg height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Asana">
      <circle cx="14" cy="8" r="5.5" fill="currentColor"/>
      <circle cx="5.5" cy="20" r="5.5" fill="currentColor" opacity="0.6"/>
      <circle cx="22.5" cy="20" r="5.5" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Logo registry — unified text style via `text-stone-400` hover on the wrapper
// ─────────────────────────────────────────────────────────────────────────────

interface LogoEntry {
  id: string;
  label: string;
  component: React.FC;
}

const LOGOS: LogoEntry[] = [
  { id: "sap",        label: "SAP",                component: SAPLogo },
  { id: "oracle",     label: "Oracle NetSuite",     component: OracleLogo },
  { id: "dynamics",   label: "Microsoft Dynamics",  component: MicrosoftDynamicsLogo },
  { id: "qb",         label: "QuickBooks",          component: QuickBooksLogo },
  { id: "sf",         label: "Salesforce",          component: SalesforceLogo },
  { id: "hs",         label: "HubSpot",             component: HubSpotLogo },
  { id: "pipe",       label: "Pipedrive",           component: PipedriveeLogo },
  { id: "slack",      label: "Slack",               component: SlackLogo },
  { id: "asana",      label: "Asana",               component: AsanaLogo },
  { id: "workday",    label: "Workday",             component: WorkdayLogo },
  { id: "bamboo",     label: "BambooHR",            component: BambooHRLogo },
  { id: "adp",        label: "ADP",                 component: ADPLogo },
  { id: "greenhouse", label: "Greenhouse",          component: GreenhouseLogo },
  { id: "snow",       label: "Snowflake",           component: SnowflakeLogo },
  { id: "db",         label: "Databricks",          component: DatabricksLogo },
  { id: "looker",     label: "Looker",              component: LookerLogo },
  { id: "tableau",    label: "Tableau",             component: TableauLogo },
  { id: "powerbi",    label: "Power BI",            component: PowerBILogo },
  { id: "pg",         label: "PostgreSQL",          component: PostgreSQLLogo },
  { id: "retool",     label: "Retool",              component: RetoolLogo },
  { id: "notion",     label: "Notion",              component: NotionLogo },
  { id: "atlassian",  label: "Atlassian",           component: AtlassianLogo },
];

// ─────────────────────────────────────────────────────────────────────────────
// Single logo slot
// ─────────────────────────────────────────────────────────────────────────────

function LogoSlot({ label, component: Logo }: Omit<LogoEntry, "id">) {
  return (
    <div
      aria-label={label}
      title={label}
      className="
        flex-shrink-0
        flex items-center justify-center
        px-8 h-14
        text-stone-500
        hover:text-stone-300
        transition-colors duration-500
      "
    >
      <Logo />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dual-row marquee with opposing directions
// ─────────────────────────────────────────────────────────────────────────────

function MarqueeRow({
  logos,
  direction = "forward",
  speed = 60,
}: {
  logos: LogoEntry[];
  direction?: "forward" | "reverse";
  speed?: number;
}) {
  const doubled = [...logos, ...logos, ...logos];

  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max ${direction === "reverse" ? "group-hover:[animation-play-state:paused]" : "group-hover:[animation-play-state:paused]"}`}
        style={{
          animation: `dzen-marquee-${direction} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((logo, i) => (
          <LogoSlot key={`${logo.id}-${i}`} label={logo.label} component={logo.component} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IntegrationLogoMarquee — dual-row, opposing directions
// ─────────────────────────────────────────────────────────────────────────────

export function IntegrationLogoMarquee() {
  // Split logos into two groups
  const row1 = LOGOS.slice(0, Math.ceil(LOGOS.length / 2));
  const row2 = LOGOS.slice(Math.ceil(LOGOS.length / 2));

  return (
    <>
      <style>{`
        @keyframes dzen-marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes dzen-marquee-reverse {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="dzen-marquee"] { animation: none !important; }
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex flex-col gap-0 border-t border-white/[.06]">
          <div className="border-b border-white/[.04]">
            <MarqueeRow logos={row1} direction="forward" speed={65} />
          </div>
          <MarqueeRow logos={row2} direction="reverse" speed={55} />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IntegrationMarquee — full section wrapper
// ─────────────────────────────────────────────────────────────────────────────

export function IntegrationMarquee() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.3 });

  const CATEGORIES = [
    { label: "ERP & Finance", count: "SAP, Oracle, Dynamics, QuickBooks +" },
    { label: "CRM & Sales",   count: "Salesforce, HubSpot, Pipedrive +" },
    { label: "HR & People",   count: "Workday, BambooHR, ADP, Greenhouse +" },
    { label: "Data & BI",     count: "Snowflake, Databricks, Tableau +" },
    { label: "Productivity",  count: "Slack, Asana, Notion, Atlassian +" },
  ];

  return (
    <section
      id="integrations"
      aria-label="Systems and integrations we connect"
      className="bg-bg-secondary border-t border-border overflow-hidden"
    >
      {/* Header */}
      <Container className="pt-16 pb-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-end justify-between gap-10 mb-10 max-md:flex-col max-md:items-start max-md:gap-5">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="font-mono text-[10px] text-stone-500 tracking-widest">05</div>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent px-2 py-1 border border-accent/15 bg-accent/[0.15]">
                  Integration Catalogue
                </span>
              </div>
              <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-normal text-stone-100 leading-[1.08] tracking-[-0.015em]">
                Your stack, connected.
              </h2>
            </div>
            <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.75] max-w-[380px]">
              Pre-built connectors across every major enterprise platform. We work with what you already run — no rip-and-replace required.
            </p>
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {CATEGORIES.map(({ label, count }) => (
              <div
                key={label}
                className="border border-white/[.07] bg-white/[.02] px-3 py-2 flex items-center gap-2.5"
              >
                <span className="font-sans text-[12px] font-light text-stone-300">{label}</span>
                <span className="font-mono text-[9px] text-white/25">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Dual-row marquee */}
      <IntegrationLogoMarquee />

      {/* Footer note */}
      <Container className="pt-5 pb-12">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.4)]" aria-hidden="true" />
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone-500">
            Custom connectors available for legacy systems and proprietary platforms
          </span>
        </div>
      </Container>
    </section>
  );
}