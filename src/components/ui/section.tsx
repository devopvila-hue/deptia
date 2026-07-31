import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  spacing?: "default" | "tight" | "loose" | "none";
  as?: "section" | "div" | "article" | "header" | "footer";
  id?: string;
};

export function Section({
  children,
  className,
  spacing = "default",
  as: Tag = "section",
  id,
  ...rest
}: SectionProps) {
  const spacingClass = {
    none: "",
    tight: "py-16 sm:py-20",
    default: "py-24 sm:py-32",
    loose: "py-32 sm:py-40",
  }[spacing];

  return (
    <Tag id={id} className={cn("relative w-full", spacingClass, className)} {...rest}>
      {children}
    </Tag>
  );
}
