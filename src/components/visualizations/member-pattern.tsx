"use client";

import { cn } from "@/lib/utils";
import type { DepartmentMember } from "@/types/department";

type Props = {
  member: DepartmentMember;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
};

const SIZES = {
  sm: { box: "h-9 w-9", initials: "text-[0.65rem]" },
  md: { box: "h-12 w-12", initials: "text-[0.75rem]" },
  lg: { box: "h-14 w-14", initials: "text-[0.85rem]" },
} as const;

export function MemberPattern({ member, size = "md", color = "var(--accent)", className }: Props) {
  const dims = SIZES[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-strong bg-[#0c0e0a]",
        dims.box,
        className
      )}
      style={{ boxShadow: `0 0 0 1px ${color}22, 0 0 18px ${color}10` }}
      aria-label={member.role}
      role="img"
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full opacity-90">
        {renderPattern(member.pattern, color)}
      </svg>
      <span
        className={cn(
          "relative z-10 font-mono font-medium tracking-[0.06em] text-foreground mix-blend-screen",
          dims.initials
        )}
        style={{ color }}
      >
        {member.initials}
      </span>
    </div>
  );
}

function renderPattern(pattern: DepartmentMember["pattern"], color: string) {
  switch (pattern) {
    case "wave":
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 2 + i * 3;
            const h = 8 + Math.abs(Math.sin(i * 0.5)) * 18;
            return (
              <rect
                key={i}
                x={x}
                y={20 - h / 2}
                width="1.5"
                height={h}
                fill={color}
                opacity="0.35"
              />
            );
          })}
        </g>
      );
    case "grid":
      return (
        <g>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={4 + c * 8}
                cy={4 + r * 8}
                r="1.2"
                fill={color}
                opacity={(r + c) % 2 === 0 ? 0.5 : 0.2}
              />
            ))
          )}
        </g>
      );
    case "orbit":
      return (
        <g>
          <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
          <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth="0.4" opacity="0.7" />
          <circle cx="34" cy="20" r="1.5" fill={color} />
          <circle cx="20" cy="6" r="1" fill={color} opacity="0.7" />
          <circle cx="20" cy="20" r="2" fill={color} />
        </g>
      );
    case "spiral":
      return (
        <g>
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = i * 0.5;
            const r = i * 0.5;
            return (
              <circle
                key={i}
                cx={20 + Math.cos(angle) * r}
                cy={20 + Math.sin(angle) * r}
                r="0.8"
                fill={color}
                opacity={1 - i / 30}
              />
            );
          })}
        </g>
      );
    case "bars":
      return (
        <g>
          {Array.from({ length: 16 }).map((_, i) => {
            const h = 4 + (i % 4) * 6;
            return (
              <rect
                key={i}
                x={2 + i * 2.3}
                y={20 - h / 2}
                width="1.5"
                height={h}
                fill={color}
                opacity={0.4 + (i % 3) * 0.2}
              />
            );
          })}
        </g>
      );
    case "dots":
      return (
        <g>
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => {
              const dx = c - 3;
              const dy = r - 3;
              const d = Math.sqrt(dx * dx + dy * dy);
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={4 + c * 5.5}
                  cy={4 + r * 5.5}
                  r={Math.max(0.3, 1.8 - d * 0.4)}
                  fill={color}
                  opacity={Math.max(0.2, 1 - d * 0.3)}
                />
              );
            })
          )}
        </g>
      );
  }
}
