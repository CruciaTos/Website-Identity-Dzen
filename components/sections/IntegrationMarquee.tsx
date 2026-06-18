"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { LogoLoop, type LogoItem } from "@/components/LogoLoop";
import type { SimpleIcon } from "simple-icons";
import {
  /* ERP / Finance */
  siSap,
  siSage,
  siQuickbooks,
  /* CRM / Sales */
  siHubspot,
  siZoho,
  /* Collaboration */
  siZoom,
  siDiscord,
  siGooglechat,
  siGooglemeet,
  /* Project Management */
  siAsana,
  siTrello,
  siClickup,
  siLinear,
  siJira,
  siNotion,
  siAirtable,
  siBasecamp,
  /* Data / Analytics */
  siSnowflake,
  siDatabricks,
  siMysql,
  siPostgresql,
  siMongodb,
  siRedis,
  siGrafana,
  siDatadog,
  siElastic,
  siGoogleanalytics,
  siGooglebigquery,
  /* Cloud Infrastructure */
  siGooglecloud,
  siCloudflare,
  siVercel,
  siKubernetes,
  siDocker,
  siTerraform,
  /* Customer Success / Support */
  siZendesk,
  siIntercom,
  siMattermost,
  /* Commerce / Payments */
  siStripe,
  siShopify,
  siPaypal,
  /* Dev & Design */
  siGithub,
  siGitlab,
  siFigma,
  siDropbox,
  siRetool,
  /* Marketing / Comms */
  siMailchimp,
  siZapier,
  siN8n,
  /* Knowledge / Docs */
  siConfluence,
  siAtlassian,
  siGitbook,
  siGoogledocs,
  siGooglesheets,
  siGoogledrive,
} from "simple-icons";

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

const BRANDS: { icon: SimpleIcon; label: string }[] = [
  /* ── ERP / Finance ───────────────────────────── */
  { icon: siSap, label: "SAP" },
  { icon: siSage, label: "Sage Intacct" },
  { icon: siQuickbooks, label: "QuickBooks" },
  /* ── CRM / Sales ─────────────────────────────── */
  { icon: siHubspot, label: "HubSpot" },
  { icon: siZoho, label: "Zoho CRM" },
  /* ── Collaboration ───────────────────────────── */
  { icon: siZoom, label: "Zoom" },
  { icon: siDiscord, label: "Discord" },
  { icon: siGooglechat, label: "Google Chat" },
  { icon: siGooglemeet, label: "Google Meet" },
  /* ── Project Management ──────────────────────── */
  { icon: siAsana, label: "Asana" },
  { icon: siTrello, label: "Trello" },
  { icon: siClickup, label: "ClickUp" },
  { icon: siLinear, label: "Linear" },
  { icon: siJira, label: "Jira" },
  { icon: siNotion, label: "Notion" },
  { icon: siAirtable, label: "Airtable" },
  { icon: siBasecamp, label: "Basecamp" },
  /* ── Data / Analytics ───────────────────────── */
  { icon: siSnowflake, label: "Snowflake" },
  { icon: siDatabricks, label: "Databricks" },
  { icon: siMysql, label: "MySQL" },
  { icon: siPostgresql, label: "PostgreSQL" },
  { icon: siMongodb, label: "MongoDB" },
  { icon: siRedis, label: "Redis" },
  { icon: siGrafana, label: "Grafana" },
  { icon: siDatadog, label: "Datadog" },
  { icon: siElastic, label: "Elasticsearch" },
  { icon: siGoogleanalytics, label: "Google Analytics" },
  { icon: siGooglebigquery, label: "BigQuery" },
  /* ── Cloud Infrastructure ────────────────────── */
  { icon: siGooglecloud, label: "Google Cloud" },
  { icon: siCloudflare, label: "Cloudflare" },
  { icon: siVercel, label: "Vercel" },
  { icon: siKubernetes, label: "Kubernetes" },
  { icon: siDocker, label: "Docker" },
  { icon: siTerraform, label: "Terraform" },
  /* ── Customer Success / Support ──────────────── */
  { icon: siZendesk, label: "Zendesk" },
  { icon: siIntercom, label: "Intercom" },
  { icon: siMattermost, label: "Mattermost" },
  /* ── Commerce / Payments ─────────────────────── */
  { icon: siStripe, label: "Stripe" },
  { icon: siShopify, label: "Shopify" },
  { icon: siPaypal, label: "PayPal" },
  /* ── Dev & Design ────────────────────────────── */
  { icon: siGithub, label: "GitHub" },
  { icon: siGitlab, label: "GitLab" },
  { icon: siFigma, label: "Figma" },
  { icon: siDropbox, label: "Dropbox" },
  { icon: siRetool, label: "Retool" },
  /* ── Marketing / Automation ──────────────────── */
  { icon: siMailchimp, label: "Mailchimp" },
  { icon: siZapier, label: "Zapier" },
  { icon: siN8n, label: "n8n" },
  /* ── Knowledge / Docs ───────────────────────── */
  { icon: siConfluence, label: "Confluence" },
  { icon: siAtlassian, label: "Atlassian" },
  { icon: siGitbook, label: "GitBook" },
  { icon: siGoogledocs, label: "Google Docs" },
  { icon: siGooglesheets, label: "Google Sheets" },
  { icon: siGoogledrive, label: "Google Drive" },
];

const LOGO_ITEMS: LogoItem[] = BRANDS.map(({ icon, label }) => ({
  node: (
    <div className="flex-shrink-0 px-11">
      <div
        className="w-40 h-40 flex items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 opacity-40 hover:opacity-90 transition-opacity duration-300 [&>svg]:h-24 [&>svg]:w-auto [&>svg]:block"
        title={label}
      >
        <BrandIcon icon={icon} />
      </div>
    </div>
  ),
  title: label,
  ariaLabel: label,
}));

interface IntegrationLogoMarqueeProps {
  maxWidth?: number | string;
  bleed?: number;
  fade?: number;
  speed?: number;
}

export function IntegrationLogoMarquee({
  maxWidth = "100%",
  bleed = 0,
  fade = 15,
  speed = 80,
}: IntegrationLogoMarqueeProps) {
  const safeBleed = Math.max(0, bleed);
  const safeFade = Math.min(Math.max(fade, 0), 49);
  const resolvedMaxWidth =
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  return (
    <Container className="overflow-visible !px-0">
      <div
        className="relative overflow-x-clip py-6"
        style={{
          width: `calc(100% + ${safeBleed * 2}px)`,
          maxWidth: `calc(${resolvedMaxWidth} + ${safeBleed * 2}px)`,
          marginLeft: `-${safeBleed}px`,
          marginRight: `-${safeBleed}px`,
          marginInline: safeBleed === 0 ? "auto" : undefined,
          WebkitMaskImage: `linear-gradient(to right, transparent, black ${safeFade}%, black ${100 - safeFade}%, transparent)`,
          maskImage: `linear-gradient(to right, transparent, black ${safeFade}%, black ${100 - safeFade}%, transparent)`,
        }}
      >
        <LogoLoop
          className="!overflow-x-clip"
          logos={LOGO_ITEMS}
          speed={speed}
          direction="left"
          pauseOnHover
          gap={0}
          logoHeight={160}
          width="100%"
          ariaLabel="Integration partner logos"
        />
      </div>
    </Container>
  );
}

export function IntegrationMarquee() {
  return (
    <section
      id="systems"
      aria-label="Systems we connect"
      className="py-10 border-t border-border overflow-hidden"
    >
      <Container className="mb-16 text-center">
        <FadeIn>
          <h2 className="font-serif text-display-2 font-normal text-stone-100">
            Systems we connect.
          </h2>
        </FadeIn>
      </Container>

      <div className="mb-4">
        <IntegrationLogoMarquee maxWidth={1200} />
      </div>
    </section>
  );
}