"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const COMPANIES = [
  { id: "atlas", name: "ATLAS", color: "var(--accent)" },
  { id: "norte", name: "NORTE", color: "#7ce5a3" },
  { id: "lumen", name: "LUMEN", color: "#ffbd59" },
];

const MODULES = [
  { name: "CRM", x: 20, y: 32 },
  { name: "Email", x: 60, y: 25 },
  { name: "Calendar", x: 78, y: 50 },
  { name: "Storage", x: 30, y: 70 },
  { name: "Telegram", x: 65, y: 78 },
];

export function IsolatedInstances({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>("atlas");

  return (
    <div className={cn("relative w-full", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COMPANIES.map((c) => {
          const isActive = hovered === c.id;
          return (
            <motion.button
              key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onFocus={() => setHovered(c.id)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-[#0c0e0a] p-4 text-left transition-colors",
                isActive ? "border-foreground/30" : "border-border"
              )}
            >
              <div
                className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top, ${c.color}10 0%, transparent 60%)`,
                  opacity: isActive ? 1 : 0,
                }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[0.65rem] uppercase tracking-[0.16em]"
                    style={{ color: c.color }}
                  >
                    Instancia · {c.id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                </div>
                <p className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                  {c.name}
                </p>
                <p className="mt-1 text-[0.75rem] text-muted">
                  Datos aislados · Memoria propia · Permisos propios
                </p>

                <div className="relative mt-4 aspect-[5/3] overflow-hidden rounded-md border border-border/60 bg-[#080908]">
                  <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
                    <defs>
                      <linearGradient id={`fill-${c.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={c.color} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* frame */}
                    <rect
                      x="0.5"
                      y="0.5"
                      width="99"
                      height="59"
                      rx="2"
                      fill="none"
                      stroke="rgba(242,240,233,0.15)"
                      strokeWidth="0.2"
                    />
                    {/* modules */}
                    {MODULES.map((m, i) => (
                      <g key={m.name}>
                        <rect
                          x={m.x - 5}
                          y={m.y - 3}
                          width="10"
                          height="6"
                          rx="1"
                          fill={`url(#fill-${c.id})`}
                          stroke={c.color}
                          strokeWidth="0.2"
                          opacity={isActive ? 0.9 : 0.5}
                        />
                        <text
                          x={m.x}
                          y={m.y + 0.8}
                          fontSize="1.6"
                          fill={c.color}
                          textAnchor="middle"
                          fontFamily="ui-monospace, monospace"
                        >
                          {m.name}
                        </text>
                        {isActive && i < MODULES.length - 1 && (
                          <motion.line
                            x1={m.x}
                            y1={m.y}
                            x2={MODULES[i + 1]!.x}
                            y2={MODULES[i + 1]!.y}
                            stroke={c.color}
                            strokeWidth="0.2"
                            strokeDasharray="0.5 0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, delay: i * 0.15 }}
                          />
                        )}
                      </g>
                    ))}
                    {/* center hub */}
                    <circle
                      cx="50"
                      cy="50"
                      r="3"
                      fill={c.color}
                      opacity={isActive ? 1 : 0.6}
                    />
                    {isActive && (
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="3"
                        fill="none"
                        stroke={c.color}
                        initial={{ opacity: 0.6, r: 3 }}
                        animate={{ opacity: 0, r: 8 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </svg>
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  <span>5 módulos</span>
                  <span>encriptado en reposo</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-surface-soft/40 p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-accent-soft text-[0.75rem] text-foreground">
          ⌘
        </span>
        <div>
          <p className="text-[0.875rem] text-foreground">Aislamiento real por empresa</p>
          <p className="mt-0.5 text-[0.75rem] text-muted">
            Cada instancia tiene su propia base de datos, claves y perímetro. Ningún cliente comparte
            espacio con otro.
          </p>
        </div>
      </div>
    </div>
  );
}
