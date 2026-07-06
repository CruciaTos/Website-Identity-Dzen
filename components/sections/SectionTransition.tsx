"use client";

/**
 * SectionTransition
 * ------------------
 * Page-level scroll-in wrapper used ONLY from app/page.tsx to give each
 * major section a smooth, weighted arrival as it scrolls into view — the
 * "join" between sections that plain document flow doesn't give you on
 * its own.
 *
 * Deliberately NOT used around <HeroSlideTransition /> or
 * <FoundingPrinciples /> in page.tsx — both already own bespoke,
 * scroll-driven transitions (the hero → case-studies cinematic wipe, and
 * the sticky "WE ARE DZEN" scramble-reveal) that read raw scroll
 * position/geometry internally. Wrapping them here would layer a second,
 * competing transform on top of that math for no visual gain and real
 * risk of desync — so leave them exactly as they are.
 *
 * Built with GSAP + ScrollTrigger (already a project dependency, same
 * library already driving the WhyUs word-highlight) rather than
 * framer-motion, so this reads as page-level "chrome" distinct from each
 * section's own content-level reveals (FadeIn / useInView / etc). The
 * custom ease matches the cubic-bezier already used everywhere else on
 * the site (FadeIn, TargetMarkets/TargetAreas EASE, CaseStudies' SPRING)
 * so the new transition feels native, not bolted on.
 *
 * Safe-by-construction:
 *  - Only ever wraps a section in a plain, unstyled <div> — no fixed
 *    size, no positioning — so it can't affect layout/flow.
 *  - Animates transform/opacity/filter only, and fully clears every
 *    inline style it sets once the intro finishes (clearProps: "all"),
 *    so nothing lingers to affect sticky/pinned descendants (e.g. the
 *    sticky sidebar inside CapabilitiesSection) later in the scroll.
 *  - `toggleActions: "play none none none"` — plays once and stays,
 *    matching the "once: true" convention every other reveal in this
 *    codebase already uses (FadeIn, ScrollReveal, TargetMarkets/Areas'
 *    useInView, Testimonials' whileInView).
 *  - Respects prefers-reduced-motion by skipping the animation entirely.
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    // Same curve as the framer-motion EASE/SPRING constants used across
    // TargetMarkets, TargetAreas, CaseStudies and FadeIn.
    CustomEase.create("dzenEnter", "0.22, 1, 0.36, 1");
}

interface SectionTransitionProps {
    children: ReactNode;
    /** How far the section rises into place, in px. */
    distance?: number;
    /** Starting scale — kept subtle so nothing inside visibly "pops". */
    scaleFrom?: number;
    className?: string;
}

export function SectionTransition({
    children,
    distance = 56,
    scaleFrom = 0.975,
    className,
}: SectionTransitionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    y: distance,
                    scale: scaleFrom,
                    filter: "blur(6px)",
                    willChange: "transform, opacity, filter",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "dzenEnter",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            ScrollTrigger.refresh();
        }, ref);

        return () => ctx.revert();
    }, [distance, scaleFrom]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}