import Link from "next/link";
import { LogoMark } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, COMPLIANCE_BADGES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-bg-panel border-t border-border pt-16 pb-10">
      <Container>
        {/* Top grid */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-16 pb-16 border-b border-border max-[1100px]:grid-cols-2 max-[1100px]:gap-10 max-[600px]:grid-cols-1">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="DZen home"
              className="inline-flex items-center gap-[10px] no-underline"
            >
              <div className="w-7 h-7 bg-accent flex items-center justify-center flex-shrink-0">
                <LogoMark className="w-[14px] h-[14px]" />
              </div>
              <span className="font-sans text-[15px] font-medium tracking-[0.06em] uppercase text-stone-100">
                DZen
              </span>
            </Link>

            <p className="font-sans text-[13px] font-light text-stone-400 leading-[1.7] mt-4 max-w-[280px]">
              Intelligent workflow integration for mid-market and enterprise businesses. Your systems, working together.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {COMPLIANCE_BADGES.map((badge) => (
                <Badge key={badge} variant="muted">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone-500 mb-5">
                {title}
              </div>
              <ul className="list-none flex flex-col gap-[10px]" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-[13px] font-light text-stone-400 no-underline hover:text-stone-100 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8 flex-wrap gap-4">
          <span className="font-mono text-[10px] tracking-[0.08em] text-stone-500">
            © 2025 DZen, Inc. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[10px] tracking-[0.08em] text-stone-500 no-underline hover:text-stone-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
