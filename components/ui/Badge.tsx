import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "accent" | "muted" | "outline";
}

const variantClasses = {
  accent:  "text-accent border border-accent/15 bg-accent/[0.15]",
  muted:   "text-stone-500 border border-border",
  outline: "text-stone-400 border border-border-strong",
};

export function Badge({ children, className, variant = "muted" }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
