import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  width?: "narrow" | "wide" | "full";
};

export function Container({ children, className, width = "wide", ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        width === "narrow" && "max-w-[920px]",
        width === "wide" && "max-w-[1320px]",
        width === "full" && "max-w-none",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
