"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Navbar as NavbarShell,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { AboutOverlay } from "@/components/sections/AboutOverlay";
import { NAV_LINKS } from "@/lib/data";

const SECTION_IDS = ["hero", "areas", "capabilities", "cases", "contact"];
const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const scrolled = useScrolled(40);
  const activeSection = useActiveSection(SECTION_IDS);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <NavbarShell
          className="transition-[background-color,border-color] duration-300"
          style={{
            backgroundColor: scrolled ? "rgba(2, 2, 2, 0.82)" : "transparent",
            borderBottom: scrolled
              ? "1px solid rgba(178, 213, 229, 0.12)"
              : "1px solid transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          }}
        >
          {/* ---------- Desktop ---------- */}
          <NavBody>
            {/* Logo */}
            <Link
              href="/"
              aria-label="DZen home"
              className="flex items-center gap-2.5 no-underline"
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ backgroundColor: "rgba(178, 213, 229, 0.55)" }}
                aria-hidden="true"
              />
              <span
                className="font-zaslia text-[19px] leading-none tracking-[-0.01em]"
                style={{ color: "#B2D5E5", fontWeight: 500 }}
              >
                DZEN
              </span>
            </Link>

            {/* Navigation links + Founders button */}
            <ul className="flex items-center gap-9 list-none">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className="font-mono text-[11px] uppercase tracking-[0.18em] no-underline transition-colors duration-200 flex items-center gap-[7px] py-1"
                      style={{
                        color: isActive ? "#B2D5E5" : "rgba(178, 213, 229, 0.5)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#B2D5E5";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "rgba(178, 213, 229, 0.5)";
                      }}
                    >
                      <span
                        className="w-[3px] h-[3px] rounded-full transition-opacity duration-200"
                        style={{
                          backgroundColor: "#B2D5E5",
                          opacity: isActive ? 1 : 0,
                        }}
                        aria-hidden="true"
                      />
                      {label}
                    </a>
                  </li>
                );
              })}

              <li>
                <button
                  onClick={() => setAboutOpen(true)}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0 py-1"
                  style={{ color: "rgba(178, 213, 229, 0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B2D5E5")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(178, 213, 229, 0.5)")
                  }
                  aria-haspopup="dialog"
                  aria-expanded={aboutOpen}
                >
                  Founders
                </button>
              </li>
            </ul>

            {/* Desktop CTA */}
            <a
              href="#cta"
              className="hidden md:inline-flex font-sans text-[13px] tracking-[0.08em] uppercase px-5 py-2.5 border transition-colors duration-200"
              style={{
                color: "#B2D5E5",
                borderColor: "rgba(178, 213, 229, 0.25)",
                backgroundColor: "transparent",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(178, 213, 229, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Get Started →
            </a>
          </NavBody>

          {/* ---------- Mobile ---------- */}
          <MobileNav>
            <MobileNavHeader>
              {/* Logo (mobile) */}
              <Link
                href="/"
                aria-label="DZen home"
                className="flex items-center gap-2.5 no-underline"
              >
                <span
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: "rgba(178, 213, 229, 0.55)" }}
                  aria-hidden="true"
                />
                <span
                  className="font-zaslia text-[19px] leading-none tracking-[-0.01em]"
                  style={{ color: "#B2D5E5", fontWeight: 500 }}
                >
                  DZEN
                </span>
              </Link>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-mono text-[12px] uppercase tracking-[0.18em] no-underline"
                    style={{
                      color: isActive ? "#B2D5E5" : "rgba(178, 213, 229, 0.55)",
                    }}
                  >
                    {label}
                  </a>
                );
              })}

              <button
                onClick={() => {
                  setAboutOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="font-mono text-[12px] uppercase tracking-[0.18em] text-left bg-transparent border-none cursor-pointer p-0"
                style={{ color: "rgba(178, 213, 229, 0.55)" }}
              >
                Founders
              </button>

              <div className="flex w-full flex-col gap-4 mt-4">
                <a
                  href="#cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-[13px] tracking-[0.08em] uppercase px-5 py-3 border text-center"
                  style={{
                    color: "#B2D5E5",
                    borderColor: "rgba(178, 213, 229, 0.25)",
                  }}
                >
                  Get Started →
                </a>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </NavbarShell>
      </motion.div>

      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}