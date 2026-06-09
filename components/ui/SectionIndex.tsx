import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  tag: string;
  className?: string;
}

export function SectionIndex({ number, tag, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-[10px] text-stone-500 tracking-widest">
        {number}
      </span>
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent px-2 py-1 border border-accent/15 bg-accent/[0.15]">
        {tag}
      </span>
    </div>
  );
}
