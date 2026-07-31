"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TOOLS = [
  { name: "Gmail", color: "#EA4335" },
  { name: "Calendar", color: "#4285F4" },
  { name: "Drive", color: "#FBBC04" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Pipedrive", color: "#1A1A1A" },
  { name: "WordPress", color: "#21759B" },
  { name: "Buffer", color: "#2C4BFF" },
  { name: "Telegram", color: "#26A5E4" },
  { name: "Meta", color: "#1877F2" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Canva", color: "#00C4CC" },
  { name: "YouTube", color: "#FF0000" },
];

export function IntegrationsOrbit({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[640px]", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="instanceCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f2419" />
            <stop offset="100%" stopColor="#0c0e0a" />
          </radialGradient>
        </defs>

        {/* Concentric guides */}
        <g fill="none" stroke="rgba(242,240,233,0.08)" strokeWidth="0.15">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="42" strokeDasharray="0.3 0.3" />
        </g>

        {/* Connection lines (orbit → center) */}
        {TOOLS.map((t, i) => {
          const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
          const r = 42;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          const isActive = active === t.name;
          return (
            <line
              key={`line-${t.name}`}
              x1={x}
              y1={y}
              x2="50"
              y2="50"
              stroke={isActive ? t.color : "rgba(242,240,233,0.18)"}
              strokeWidth={isActive ? 0.3 : 0.15}
              strokeDasharray={isActive ? "0" : "0.4 0.4"}
            />
          );
        })}

        {/* Animated data pulses */}
        {!reduced &&
          TOOLS.slice(0, 6).map((t, i) => {
            const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
            const r = 42;
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            return (
              <motion.circle
                key={`pulse-${t.name}`}
                r="0.6"
                fill={t.color}
                initial={{ opacity: 0 }}
                animate={{
                  cx: [x, 50],
                  cy: [y, 50],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3.5,
                  delay: i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
      </svg>

      {/* Center: instance */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(216,255,98,0.12) 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-border-strong bg-[#0c0e0a] shadow-2xl">
            <div
              className="absolute inset-1 rounded-xl"
              style={{ background: "url(#instanceCore)" }}
              aria-hidden
            />
            <div
              className="absolute inset-1 rounded-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(31,36,25,0.7) 0%, rgba(12,14,10,0.7) 100%)",
              }}
              aria-hidden
            />
            <div className="relative flex flex-col items-center">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                Instancia
              </span>
              <span className="mt-1 font-display text-[0.95rem] tracking-[-0.01em] text-foreground">
                ATLAS
              </span>
              <span className="mt-0.5 font-mono text-[0.55rem] text-success">● 12 conectores</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool chips in orbit (DOM) */}
      {TOOLS.map((t, i) => {
        const angle = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const r = 42;
        const x = 50 + Math.cos(angle) * r;
        const y = 50 + Math.sin(angle) * r;
        const isActive = active === t.name;
        return (
          <motion.button
            key={t.name}
            type="button"
            onMouseEnter={() => setActive(t.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(t.name)}
            onBlur={() => setActive(null)}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
            aria-label={`${t.name} · integración disponible`}
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md border bg-[#0c0e0a] text-[0.6rem] font-medium uppercase tracking-wider transition-all sm:h-12 sm:w-12",
                isActive
                  ? "border-foreground/40 text-foreground shadow-xl"
                  : "border-border text-muted"
              )}
              style={{
                boxShadow: isActive ? `0 0 0 1px ${t.color}66, 0 0 18px ${t.color}40` : "none",
                color: isActive ? t.color : undefined,
              }}
            >
              {t.name.slice(0, 2)}
            </span>
          </motion.button>
        );
      })}

      {/* Legend at bottom */}
      <div className="absolute -bottom-4 left-1/2 z-40 -translate-x-1/2 translate-y-full rounded-full border border-border bg-[#0c0e0a]/90 px-3 py-1.5 backdrop-blur">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {active ? `Viendo · ${active}` : "Pasa el cursor sobre una herramienta"}
        </span>
      </div>
    </div>
  );
}
