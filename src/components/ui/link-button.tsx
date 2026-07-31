import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  withArrow?: boolean;
};

const VARIANTS = {
  primary:
    "bg-accent text-[#0a0c08] hover:bg-[#e3ff7a] border border-accent",
  secondary:
    "bg-surface-soft text-foreground border border-border-strong hover:border-foreground/30 hover:bg-surface",
  ghost: "bg-transparent text-foreground border border-transparent hover:bg-surface-soft",
  outline:
    "bg-transparent text-foreground border border-border hover:border-foreground/40 hover:bg-surface-soft/50",
} as const;

const SIZES = {
  sm: "h-9 px-3.5 text-[0.8125rem] rounded-md",
  md: "h-11 px-5 text-[0.9375rem] rounded-lg",
  lg: "h-12 px-6 text-[0.9375rem] rounded-lg",
} as const;

export function LinkButton({
  href,
  children,
  variant = "secondary",
  size = "md",
  external,
  className,
  withArrow,
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-tight transition-colors",
    VARIANTS[variant],
    SIZES[size],
    className
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {withArrow && <ArrowUpRight className="h-3.5 w-3.5" />}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow && <ArrowUpRight className="h-3.5 w-3.5" />}
    </Link>
  );
}
