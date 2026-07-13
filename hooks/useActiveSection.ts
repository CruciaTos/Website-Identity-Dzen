"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Distance (px) from the top of the viewport treated as the "active" line —
// roughly the fixed navbar's height plus a small buffer, so a section
// becomes active as soon as it clears the navbar.
const ACTIVE_LINE_OFFSET = 120;

/**
 * Scroll-position based scrollspy.
 *
 * We deliberately don't use IntersectionObserver here. This site pins Hero
 * with `position: sticky` and slides CaseStudies over it via a Framer
 * Motion transform (see HeroSlideTransition) — so Hero's bounding box stays
 * ~100% visible to an observer for the entire pinned scroll range, even
 * after CaseStudies has visually covered it. An observer only re-fires when
 * an element's intersection ratio *crosses* its threshold, and Hero's ratio
 * never dips below 0.4 during that pin, so it never reports itself as
 * "left" — the nav gets stuck on the first section until the next one
 * happens to cross the threshold on its own.
 *
 * Checking real geometry (getBoundingClientRect) on every scroll frame
 * sidesteps that: it reflects whatever is actually painted right now,
 * including transform/sticky-driven positions, so the active id updates
 * continuously and correctly no matter how a section is animated in.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>("");
  const tickingRef = useRef(false);
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  const measure = useCallback(() => {
    const ids = idsRef.current;
    let current = "";

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= ACTIVE_LINE_OFFSET) {
        current = id;
      }
    }

    // Guard against short last sections that can never scroll their top
    // past the offset line — force it active once we hit page bottom.
    const atBottom =
      window.innerHeight + Math.ceil(window.scrollY) >=
      document.documentElement.scrollHeight - 2;
    if (atBottom && ids.length > 0) {
      current = ids[ids.length - 1];
    }

    setActiveSection((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        measure();
        tickingRef.current = false;
      });
    };

    measure(); // correct section immediately, e.g. on a mid-page refresh
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [measure]);

  return activeSection;
}