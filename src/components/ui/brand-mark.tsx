import { cn } from "@/lib/utils";

/**
 * Nexus brand mark — text scales with the parent font size.
 * The N mark is inline SVG (currentColor), the wordmark + tagline
 * use the project's font stack so it stays legible at any size.
 */
export function BrandMark({
  className,
  textClassName,
  showTagline = true,
  invert = false,
}: {
  className?: string;
  textClassName?: string;
  showTagline?: boolean;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 leading-none",
        invert ? "text-[#101214]" : "text-foreground",
        className
      )}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-[1.55em] w-[1.55em] shrink-0"
        aria-hidden
      >
        <rect width="64" height="64" rx="14" ry="14" fill="currentColor" opacity="0.92" />
        <g fill="var(--background, #080908)">
          <rect x="15" y="14" width="6" height="36" />
          <rect x="43" y="14" width="6" height="36" />
          <polygon points="15,14 21,14 49,50 43,50" />
        </g>
      </svg>
      <div className={cn("flex flex-col gap-1", textClassName)}>
        <span className="flex items-baseline gap-2">
          <span className="text-[1.05em] font-semibold tracking-[-0.02em]">
            Nexus
          </span>
          <span className="text-[0.55em] font-medium uppercase tracking-[0.18em] opacity-70">
            AI Systems
          </span>
        </span>
        {showTagline && (
          <span className="text-[0.42em] font-medium uppercase tracking-[0.22em] opacity-55">
            Business Operating System
          </span>
        )}
      </div>
    </div>
  );
}
