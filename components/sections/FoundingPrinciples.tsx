import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { STATS } from "@/lib/data";

export default function FoundingPrinciples() {
  return (
    <section
      id="founding-principles"
      aria-label="Founding principles"
      className="py-[120px] bg-bg-primary border-t border-border"
    >
      <Container>
        <FadeIn>
          <div className="flex items-start justify-between gap-12 mb-20 max-md:flex-col">
            <div>
              <SectionIndex number="02" tag="Founding Principles" className="mb-6" />
              <h2 className="font-serif text-display-3 font-normal text-stone-100">
                The operating principles
                <br />
                behind <em>every build</em>.
              </h2>
            </div>

            <div className="max-w-[420px] flex-shrink-0">
              <p className="font-sans text-body font-light text-stone-400 leading-[1.7]">
                DZen is built around systems that stay reliable under pressure,
                improve workflows intelligently, preserve human authority, and
                scale without creating operational debt.
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-4 border-t border-l border-border max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1"
          staggerDelay={0.1}
          aria-label="DZen founding principles"
        >
          {STATS.map((principle, index) => (
            <StaggerItem key={principle.description}>
              <article className="group relative min-h-[280px] overflow-hidden border-r border-b border-border bg-bg-secondary p-10 transition-colors duration-300 hover:bg-bg-panel">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at top left, rgba(143,120,96,0.08) 0%, transparent 62%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col justify-between gap-12">
                  <div>
                    <div className="mb-8 flex items-center justify-between gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500">
                        Principle {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                    </div>

                    <h3 className="font-serif text-[clamp(34px,3.5vw,52px)] font-normal leading-none tracking-[-0.03em] text-stone-100">
                      {principle.value}
                      {principle.accent && (
                        <span className="text-accent">{principle.accent}</span>
                      )}
                    </h3>
                  </div>

                  <div>
                    <p className="mb-6 font-sans text-[14px] font-light leading-[1.7] text-stone-400">
                      {principle.label}
                    </p>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {principle.description}
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}