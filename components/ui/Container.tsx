import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "max-w-content mx-auto px-12 max-md:px-6",
        className
      )}
    >
      {children}
    </Tag>
  );
}
