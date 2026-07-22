"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the viewport is at/below the site's mobile breakpoint
 * (767px, matching Tailwind's `md` cutoff used everywhere else in the app).
 *
 * Used to gate the scroll/entrance animations that are disabled on mobile
 * (see MOBILE_SIMPLIFIED_ANIMATIONS.md). Defaults to `false` so server-side
 * render and desktop are never affected — the value only flips to `true`
 * after mount, on real mobile-width viewports.
 */
export function useIsMobile(breakpoint = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);

    update(); // run once on mount
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
