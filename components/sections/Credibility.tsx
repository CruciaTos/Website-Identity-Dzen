import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { STATS } from "@/lib/data";

const CLIENT_PLACEHOLDERS = Array(6).fill("Client Name");

export function Credibility() {
  return (
    <section
      id="credibility"
      aria-label="Credibility and track record"
      className="py-[120px] bg-bg-primary"
    >
      <Container>
        {/* Section header */}
        <FadeIn>
          <div className="flex items-start justify-between gap-12 mb-20 max-md:flex-col">
            <div>
              <SectionIndex number="01" tag="Operational Track Record" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal text-stone-100">
                Deployed across
                <br />
                critical business operations.
              </h2>
            </div>
            <div className="max-w-[380px] flex-shrink-0">
              <p className="font-sans text-body font-light text-stone-400 leading-[1.7]">
                DZen works exclusively with mid-market and enterprise companies where operational efficiency, data integrity, and system reliability are non-negotiable. We measure success in margins, cycle times, and audit trails — not demos.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Stats grid */}
        <StaggerContainer
          className="grid grid-cols-4 border-t border-l border-border max-[900px]:grid-cols-2 max-[480px]:grid-cols-1"
          staggerDelay={0.1}
          aria-label="Key metrics"
        >
          {STATS.map((stat) => (
            <StaggerItem key={stat.description}>
              <article className="p-12 px-10 border-r border-b border-border relative overflow-hidden transition-colors duration-300 hover:bg-bg-panel group">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at top left, rgba(143,120,96,0.04) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <div className="font-serif text-[clamp(36px,4vw,56px)] font-normal leading-none tracking-[-0.02em] text-stone-100 mb-3">
                  {stat.value}
                  <span className="text-accent">{stat.accent}</span>
                </div>
                <div className="font-sans text-[13px] font-normal text-stone-400 leading-[1.5] mb-6">
                  {stat.label}
                </div>
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone-500">
                  {stat.description}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Client logos strip */}
        <FadeIn delay={0.2} className="mt-20 pt-20 border-t border-border">
          <div className="flex items-center justify-between mb-12">
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone-500">
              Trusted by operators in
            </span>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone-500">
              Placeholder — your client logos here
            </span>
          </div>

          <div
            className="flex items-stretch border-t border-l border-border flex-wrap"
            role="list"
            aria-label="Client logos"
          >
            {CLIENT_PLACEHOLDERS.map((name, i) => (
              <div
                key={i}
                role="listitem"
                className="flex-1 min-w-[16.666%] max-md:min-w-[50%] py-8 px-6 border-r border-b border-border flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity duration-200 cursor-default"
              >
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
