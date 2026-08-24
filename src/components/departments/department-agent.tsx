"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, ChevronRight, Volume2 } from "lucide-react";
import { Icon, type IconCode } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type DepartmentAgent = {
  id: string;
  name: string;
  role: string;
  initials: string;
  icon: IconCode;
  color: string;
  colorSoft: string;
  avatarStyle:
    | "strategic"
    | "commercial"
    | "creative"
    | "operational"
    | "support"
    | "analytic"
    | "administrative"
    | "people"
    | "logistics";
  catchphrase: string;
  intro: string;
  scripts: AgentScript[];
};

export type AgentScript = {
  id: string;
  sectionId: string;
  sectionLabel: string;
  message: string;
  highlight?: string;
};

type Props = {
  agent: DepartmentAgent;
};

export function DepartmentAgent({ agent }: Props) {
  const [open, setOpen] = useState(false);
  const [activeScript, setActiveScript] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pulse, setPulse] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastTriggered = useRef<string>("");

  // Auto-detect current section by IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Stop pulse after 6 seconds
    const id = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasInteracted) return;

    const sections = agent.scripts
      .map((s) => document.getElementById(s.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;
        const topId = visible[0]?.target.id;
        if (!topId || topId === lastTriggered.current) return;

        lastTriggered.current = topId;
        const idx = agent.scripts.findIndex((s) => s.sectionId === topId);
        if (idx >= 0) setActiveScript(idx);
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, [agent.scripts, hasInteracted]);

  const current = agent.scripts[activeScript] ?? agent.scripts[0]!;

  return (
    <>
      {/* Floating bubble trigger */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        onClick={() => {
          setOpen(true);
          setHasInteracted(true);
        }}
        className="group fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full border border-border bg-[#0c0e0a]/95 p-2 pr-5 shadow-2xl backdrop-blur transition-all hover:border-foreground/30 hover:pr-6 sm:bottom-8 sm:right-8"
        aria-label={`Hablar con ${agent.name}, ${agent.role}`}
      >
        <AgentAvatar agent={agent} size="md" pulse={pulse} />
        <div className="text-left">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
            {agent.role}
          </p>
          <p className="text-[0.8125rem] font-medium text-foreground">{agent.name}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {/* Full agent panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:items-end sm:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="relative z-10 flex h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-gradient-to-b from-[#101210] to-[#080908] shadow-2xl sm:h-[640px] sm:max-w-md sm:rounded-2xl"
            >
              {/* Header */}
              <header className="flex items-start justify-between gap-3 border-b border-border/60 p-5">
                <div className="flex items-center gap-3">
                  <AgentAvatar agent={agent} size="lg" pulse={false} />
                  <div>
                    <p
                      className="font-mono text-[0.6rem] uppercase tracking-[0.18em]"
                      style={{ color: agent.color }}
                    >
                      {agent.role}
                    </p>
                    <p className="mt-0.5 font-display text-[1.125rem] tracking-[-0.01em] text-foreground">
                      {agent.name}
                    </p>
                    <p className="text-[0.75rem] text-muted text-pretty">{agent.catchphrase}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface-soft/60 text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                  aria-label="Cerrar panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              {/* Status bar */}
              <div className="flex items-center gap-2 border-b border-border/40 bg-surface-soft/30 px-5 py-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: agent.color }}
                />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  En línea · siguiendo tu recorrido
                </span>
                <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/60">
                  {String(activeScript + 1).padStart(2, "0")} / {String(agent.scripts.length).padStart(2, "0")}
                </span>
              </div>

              {/* Conversation */}
              <div className="flex-1 overflow-y-auto p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {/* Section label */}
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                      En sección · {current.sectionLabel}
                    </p>

                    {/* Message bubble */}
                    <div className="flex gap-3">
                      <AgentAvatar agent={agent} size="sm" pulse={false} />
                      <div className="flex-1 rounded-2xl rounded-tl-md border border-border bg-[#0c0e0a] p-4">
                        <p className="text-[0.9375rem] leading-relaxed text-foreground/95 text-pretty">
                          {current.message}
                        </p>
                        {current.highlight && (
                          <p
                            className="mt-3 border-t border-border/60 pt-3 text-[0.8125rem] font-medium"
                            style={{ color: agent.color }}
                          >
                            {current.highlight}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-wrap gap-2 pl-11">
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(current.sectionId);
                          el?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft/40 px-2.5 py-1.5 text-[0.75rem] text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                      >
                        Ver esta sección
                        <ChevronRight className="h-3 w-3" />
                      </button>
                      {activeScript < agent.scripts.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = activeScript + 1;
                            setActiveScript(next);
                            const el = document.getElementById(agent.scripts[next]!.sectionId);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[0.75rem] transition-colors"
                          style={{
                            borderColor: `${agent.color}50`,
                            background: `${agent.color}10`,
                            color: agent.color,
                          }}
                        >
                          Siguiente: {agent.scripts[activeScript + 1]!.sectionLabel}
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <footer className="border-t border-border/60 p-4">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {agent.scripts.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActiveScript(i);
                        const el = document.getElementById(s.sectionId);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors",
                        i === activeScript ? "" : "bg-border hover:bg-muted/40"
                      )}
                      style={i === activeScript ? { background: agent.color } : undefined}
                      aria-label={`Ir a ${s.sectionLabel}`}
                    />
                  ))}
                </div>
                <div className="rounded-md border border-border bg-[#0c0e0a] px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-3 w-3" />
                    Mensaje pre-cargado · no es un chat en vivo
                  </span>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AgentAvatar({
  agent,
  size = "md",
  pulse = false,
}: {
  agent: DepartmentAgent;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}) {
  const sizeClass = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }[size];

  const iconSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-[#0c0e0a]",
        sizeClass
      )}
      style={{
        boxShadow: `0 0 0 1px ${agent.color}33, 0 0 24px ${agent.color}20`,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full opacity-30">
        {renderAvatarPattern(agent.avatarStyle, agent.color)}
      </svg>
      <span
        className="relative z-10"
        style={{ color: agent.color }}
      >
        <Icon
          code={agent.icon}
          className={iconSize}
          strokeWidth={2}
        />
      </span>
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{ border: `1px solid ${agent.color}` }}
          animate={{ opacity: [0, 0.6, 0], scale: [1, 1.15, 1.25] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
      )}
    </div>
  );
}

function renderAvatarPattern(style: DepartmentAgent["avatarStyle"], color: string) {
  if (style === "strategic") {
    // Barras + grid para Marketing
    return (
      <g>
        {Array.from({ length: 16 }).map((_, i) => {
          const h = 6 + (i % 4) * 6;
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
        <line x1="0" y1="20" x2="40" y2="20" stroke={color} strokeWidth="0.15" opacity="0.5" />
      </g>
    );
  }
  if (style === "commercial") {
    // Orbit + dots para Ventas
    return (
      <g>
        <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
        <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth="0.4" opacity="0.7" />
        <circle cx="34" cy="20" r="1.5" fill={color} />
        <circle cx="20" cy="6" r="1" fill={color} opacity="0.7" />
        <circle cx="6" cy="20" r="1" fill={color} opacity="0.5" />
        <circle cx="20" cy="34" r="1" fill={color} opacity="0.5" />
        <circle cx="20" cy="20" r="2" fill={color} />
      </g>
    );
  }
  if (style === "creative") {
    // Spiral para Contenido
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
  }
  if (style === "operational") {
    // Concentric gears + rings para Operaciones
    return (
      <g>
        <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="0.5" opacity="0.45" />
        <circle cx="20" cy="20" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.55" />
        <circle cx="20" cy="20" r="6" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <line
              key={i}
              x1={20 + Math.cos(angle) * 12}
              y1={20 + Math.sin(angle) * 12}
              x2={20 + Math.cos(angle) * 16}
              y2={20 + Math.sin(angle) * 16}
              stroke={color}
              strokeWidth="0.8"
              opacity={0.7}
            />
          );
        })}
        <circle cx="20" cy="20" r="2" fill={color} />
      </g>
    );
  }
  if (style === "support") {
    // Chat bubbles concéntricas para Atención al Cliente
    return (
      <g>
        <rect x="6" y="10" width="18" height="10" rx="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.55" />
        <rect x="16" y="20" width="18" height="10" rx="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.75" />
        <circle cx="11" cy="15" r="0.9" fill={color} opacity={0.9} />
        <circle cx="15" cy="15" r="0.9" fill={color} opacity={0.9} />
        <circle cx="19" cy="15" r="0.9" fill={color} opacity={0.9} />
        <circle cx="21" cy="25" r="0.7" fill={color} opacity={0.8} />
        <circle cx="25" cy="25" r="0.7" fill={color} opacity={0.8} />
        <circle cx="29" cy="25" r="0.7" fill={color} opacity={0.8} />
      </g>
    );
  }
  if (style === "analytic") {
    // Lines + dots para SEO (curva de tendencia)
    return (
      <g>
        <line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="4" y1="20" x2="4" y2="32" stroke={color} strokeWidth="0.3" opacity="0.4" />
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 6 + i * 3.2;
          const y = 30 - Math.abs(Math.sin(i * 0.6)) * 20;
          return <circle key={i} cx={x} cy={y} r="1.1" fill={color} opacity={0.5 + i * 0.05} />;
        })}
        <polyline
          points="6,28 9.2,24 12.4,26 15.6,20 18.8,22 22,14 25.2,18 28.4,10 31.6,12"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.9"
        />
      </g>
    );
  }
  if (style === "people") {
    // Tres figuras humanas estilizadas para RR.HH.
    return (
      <g fill="none" stroke={color} strokeWidth="0.8" opacity="0.85">
        <circle cx="10" cy="14" r="3" />
        <path d="M4 30 C 4 22, 16 22, 16 30" strokeLinecap="round" />
        <circle cx="20" cy="12" r="3.4" fill={color} />
        <path d="M13 32 C 13 22, 27 22, 27 32" strokeLinecap="round" />
        <circle cx="30" cy="14" r="3" />
        <path d="M24 30 C 24 22, 36 22, 36 30" strokeLinecap="round" />
      </g>
    );
  }
  if (style === "logistics") {
    // Nodos conectados tipo supply chain para Logística
    return (
      <g>
        <line x1="8" y1="8" x2="32" y2="32" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="32" x2="32" y2="8" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <line x1="20" y1="4" x2="20" y2="36" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="20" x2="36" y2="20" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <circle cx="20" cy="20" r="3.5" fill={color} />
        <circle cx="20" cy="20" r="7" fill="none" stroke={color} strokeWidth="0.5" opacity="0.7" />
        {[
          [8, 8],
          [32, 8],
          [8, 32],
          [32, 32],
          [20, 6],
          [20, 34],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x!}
            cy={y!}
            r="1.6"
            fill={color}
            opacity={0.85}
          />
        ))}
      </g>
    );
  }
  // administrative — grid + check para Administración
  return (
    <g>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={5 + c * 6}
            y={5 + r * 6}
            width="4"
            height="4"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={(r + c) % 2 === 0 ? 0.45 : 0.2}
          />
        ))
      )}
      <polyline
        points="11,21 17,27 29,12"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        opacity="0.95"
      />
    </g>
  );
}
