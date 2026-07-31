import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "danger" | "accent" | "outline";
  size?: "sm" | "md";
  children: ReactNode;
};

export function Badge({ className, variant = "default", size = "md", children, ...rest }: BadgeProps) {
  const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "border-border bg-surface-soft text-muted",
    success: "border-success/40 bg-success/10 text-success",
    warning: "border-warning/40 bg-warning/10 text-warning",
    danger: "border-danger/40 bg-danger/10 text-danger",
    accent: "border-accent/40 bg-accent-soft text-foreground",
    outline: "border-border bg-transparent text-foreground",
  };
  const sizeClasses = {
    sm: "h-6 px-2 text-[0.6875rem]",
    md: "h-7 px-2.5 text-[0.75rem]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-[0.1em] whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
