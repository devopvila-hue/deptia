"use client";

import { motion, useReducedMotion } from "motion/react";
import { integrations } from "@/data/departments";

export function IntegrationsMarquee() {
  const reduced = useReducedMotion();
  const list = [...integrations, ...integrations];

  return (
    <section
      aria-label="Herramientas compatibles"
      className="relative overflow-hidden border-b border-border bg-background py-8"
    >
      <div className="container-wide mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        <span className="h-px w-8 bg-border-strong" />
        <span>Compatible con las herramientas que ya usas</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="relative mask-fade-x">
        <motion.div
          className="flex gap-3 whitespace-nowrap"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {list.map((tool, i) => (
            <span
              key={`${tool.name}-${i}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-soft/40 px-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: tool.color === "rgba(242, 240, 233, 0.6)" ? "var(--muted)" : tool.color }}
              />
              {tool.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
