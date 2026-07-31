import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "elevated" | "soft" | "outline";
  interactive?: boolean;
};

export function Card({ children, className, variant = "default", interactive, ...rest }: CardProps) {
  const variantClass = {
    default: "bg-surface border border-border",
    elevated: "bg-gradient-to-b from-background-elevated to-surface border border-border",
    soft: "bg-surface-soft border border-border/60",
    outline: "bg-transparent border border-border",
  }[variant];

  return (
    <div
      className={cn(
        "rounded-xl",
        variantClass,
        interactive &&
          "transition-colors hover:border-foreground/20 hover:bg-surface-soft/60",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
