"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Navbar – top-level wrapper                                        */
/* ------------------------------------------------------------------ */
interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Navbar({ children, className, style, ...rest }: NavbarProps) {
  return (
    <nav className={className} style={style} {...rest}>
      {children}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  NavBody – desktop nav content row                                 */
/* ------------------------------------------------------------------ */
interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function NavBody({ children, className }: NavBodyProps) {
  return (
    <div
      className={`hidden md:flex items-center justify-between w-full max-w-[1440px] mx-auto px-8 py-4 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNav – mobile wrapper (visible on small screens)             */
/* ------------------------------------------------------------------ */
interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({ children, className }: MobileNavProps) {
  return (
    <div className={`md:hidden w-full ${className ?? ""}`}>{children}</div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavHeader – logo + toggle row                               */
/* ------------------------------------------------------------------ */
interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between w-full px-5 py-4 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavToggle – hamburger / close button                        */
/* ------------------------------------------------------------------ */
interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative w-7 h-5 bg-transparent border-none cursor-pointer flex flex-col justify-between p-0"
    >
      <motion.span
        className="block w-full h-[1.5px] rounded-full origin-center"
        style={{ backgroundColor: "#B2D5E5" }}
        animate={
          isOpen
            ? { rotate: 45, y: 7.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block w-full h-[1.5px] rounded-full origin-center"
        style={{ backgroundColor: "#B2D5E5" }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block w-full h-[1.5px] rounded-full origin-center"
        style={{ backgroundColor: "#B2D5E5" }}
        animate={
          isOpen
            ? { rotate: -45, y: -7.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.25 }}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileNavMenu – collapsible link list                             */
/* ------------------------------------------------------------------ */
interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileNavMenu({
  isOpen,
  children,
  className,
}: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`flex flex-col gap-5 px-5 pb-6 pt-2 ${className ?? ""}`}
          style={{
            backgroundColor: "rgba(2, 2, 2, 0.95)",
            borderTop: "1px solid rgba(178, 213, 229, 0.08)",
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
