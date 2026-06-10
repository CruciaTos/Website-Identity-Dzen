import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  tag: string;
  className?: string;
}

export function SectionIndex({ number, tag, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-[11px] text-stone-300 tracking-widest font-semibold">
        {number}
      </span>
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent px-3 py-1.5 border border-accent/40 bg-accent/[0.25] font-semibold">
        {tag}
      </span>
    </div>
  );
}
