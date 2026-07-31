import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  label?: string;
  index?: string;
  className?: string;
  children?: ReactNode;
};

export function Eyebrow({ label, index, className, children }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted",
        className
      )}
    >
      {index && (
        <span className="inline-flex h-5 items-center rounded-sm border border-border bg-surface-soft px-1.5 text-[0.625rem] tracking-[0.2em] text-foreground/80">
          {index}
        </span>
      )}
      <span className="h-px w-6 bg-border-strong" aria-hidden />
      <span>{children ?? label}</span>
    </div>
  );
}
