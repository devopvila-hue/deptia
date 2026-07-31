"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface DepartmentNode {
  id: string;
  name: string;
  short: string;
  color: string;
  position: { x: number; y: number };
  members: number;
  tasks: number;
  status: "ready" | "provisioning" | "active" | "pending";
}

const NODES: DepartmentNode[] = [
  {
    id: "marketing",
    name: "Marketing",
    short: "MK",
    color: "var(--accent)",
    position: { x: 78, y: 22 },
    members: 6,
    tasks: 3,
    status: "active",
  },
  {
    id: "ventas",
    name: "Ventas",
    short: "VS",
    color: "#7ce5a3",
    position: { x: 86, y: 64 },
    members: 6,
    tasks: 4,
    status: "active",
  },
  {
    id: "contenido",
    name: "Contenido",
    short: "CT",
    color: "#ffbd59",
    position: { x: 50, y: 88 },
    members: 6,
    tasks: 5,
    status: "active",
  },
  {
    id: "ops",
    name: "Operaciones",
    short: "OP",
    color: "rgba(242, 240, 233, 0.6)",
    position: { x: 14, y: 64 },
    members: 0,
    tasks: 0,
    status: "provisioning",
  },
  {
    id: "atencion",
    name: "Atención",
    short: "AT",
    color: "rgba(242, 240, 233, 0.6)",
    position: { x: 22, y: 22 },
    members: 0,
    tasks: 0,
    status: "provisioning",
  },
];

type Task = {
  id: string;
  from: number; // node index
  to: number;
  label: string;
};

const TASKS: Task[] = [
  { id: "t1", from: 0, to: 1, label: "Lead cualificado" },
  { id: "t2", from: 2, to: 0, label: "Creatividad" },
  { id: "t3", from: 1, to: 2, label: "Caso de éxito" },
];

export function CompanyOrb({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[640px] mx-auto",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f2419" />
            <stop offset="100%" stopColor="#0c0e0a" />
          </radialGradient>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Grid backdrop */}
        <g opacity="0.45">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 12.5}
              x2="100"
              y2={i * 12.5}
              stroke="rgba(242,240,233,0.05)"
              strokeWidth="0.1"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 12.5}
              y1="0"
              x2={i * 12.5}
              y2="100"
              stroke="rgba(242,240,233,0.05)"
              strokeWidth="0.1"
            />
          ))}
        </g>

        {/* Concentric rings */}
        <g fill="none" stroke="rgba(242,240,233,0.12)" strokeWidth="0.18">
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="34" strokeDasharray="0.4 0.4" />
          <circle cx="50" cy="50" r="46" strokeOpacity="0.6" />
        </g>

        {/* Connection paths */}
        {NODES.map((node, i) => (
          <g key={`conn-${node.id}`}>
            <line
              x1="50"
              y1="50"
              x2={node.position.x}
              y2={node.position.y}
              stroke={
                node.status === "provisioning"
                  ? "rgba(242,240,233,0.18)"
                  : "rgba(216,255,98,0.32)"
              }
              strokeWidth="0.18"
              strokeDasharray={node.status === "provisioning" ? "0.5 0.4" : "none"}
            />
            {node.status === "active" && !reduced && (
              <motion.line
                x1="50"
                y1="50"
                x2={node.position.x}
                y2={node.position.y}
                stroke="url(#flowGradient)"
                strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        ))}

        {/* Inter-department tasks */}
        {TASKS.map((task, i) => {
          const from = NODES[task.from];
          const to = NODES[task.to];
          if (!from || !to) return null;
          return (
            <motion.g
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4, 0.6] }}
              transition={{ delay: 1.2 + i * 0.5, duration: 4, repeat: Infinity }}
            >
              <line
                x1={from.position.x}
                y1={from.position.y}
                x2={to.position.x}
                y2={to.position.y}
                stroke="var(--accent)"
                strokeWidth="0.12"
                strokeDasharray="0.3 0.6"
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Central core (DOM) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div
            className="absolute -inset-12 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(216,255,98,0.16) 0%, transparent 60%)" }}
            aria-hidden
          />
          <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-border-strong bg-[#0c0e0a] shadow-2xl sm:h-28 sm:w-28">
            <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-[#1a1d18] to-[#0c0e0a]" aria-hidden />
            <div className="relative flex flex-col items-center">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">Empresa</span>
              <span className="mt-1 font-display text-[0.95rem] tracking-[-0.01em] text-foreground">
                ATLAS
              </span>
              <span className="mt-0.5 font-mono text-[0.55rem] text-success">● operativa</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Department nodes (DOM) */}
      {NODES.map((node, i) => {
        const isHovered = hovered === node.id;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative">
              <motion.div
                animate={
                  node.status === "active" && !reduced
                    ? { scale: [1, 1.05, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border sm:h-14 sm:w-14",
                  node.status === "provisioning"
                    ? "border-border bg-surface-soft"
                    : "border-border-strong bg-[#0c0e0a]"
                )}
                style={{
                  boxShadow:
                    node.status === "active"
                      ? `0 0 0 1px ${node.color}33, 0 0 24px ${node.color}22`
                      : "none",
                }}
              >
                <span
                  className="font-mono text-[0.65rem] font-medium tracking-[0.1em]"
                  style={{
                    color: node.status === "active" ? node.color : "var(--muted)",
                  }}
                >
                  {node.short}
                </span>
                {node.status === "active" && !reduced && (
                  <motion.span
                    className="absolute -inset-px rounded-lg"
                    style={{ border: `1px solid ${node.color}`, opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0], scale: [1, 1.2, 1.3] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}
              </motion.div>

              {/* Hover info */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 4,
                  pointerEvents: isHovered ? "auto" : "none",
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-full z-40 mt-2 w-44 -translate-x-1/2 rounded-md border border-border bg-[#0c0e0a] p-2.5 shadow-2xl"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {node.status === "provisioning" ? "En preparación" : "Operativo"}
                </p>
                <p className="mt-0.5 text-[0.8125rem] font-medium text-foreground">{node.name}</p>
                {node.status === "active" && (
                  <div className="mt-2 flex items-center justify-between text-[0.6875rem] text-muted">
                    <span>{node.members} miembros</span>
                    <span>{node.tasks} tareas activas</span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      {/* Approval badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-warning/40 bg-[#0c0e0a]/90 px-3 py-1.5 backdrop-blur"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-warning">
          1 aprobación pendiente
        </span>
      </motion.div>
    </div>
  );
}
