"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Building2, Check, Cpu, KeyRound, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "instance",
    title: "Instancia privada",
    description: "Se crea un entorno aislado para tu empresa con sus propios recursos.",
    icon: Building2,
  },
  {
    id: "permissions",
    title: "Permisos",
    description: "Se aplican las reglas que has definido: puede, aprueba, nunca.",
    icon: Shield,
  },
  {
    id: "credentials",
    title: "Credenciales",
    description: "Se generan claves de cifrado únicas que solo tu empresa controla.",
    icon: KeyRound,
  },
  {
    id: "memory",
    title: "Memoria",
    description: "El equipo aprende tu marca, tus procesos y tu contexto inicial.",
    icon: Cpu,
  },
  {
    id: "ready",
    title: "Operativo",
    description: "Listo para empezar la primera misión bajo tus reglas.",
    icon: Sparkles,
  },
] as const;

export function InstanceBuild({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12", className)}>
      {/* Steps list */}
      <ol className="space-y-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          const isComplete = i < active;
          return (
            <li key={step.id}>
              <button
                onClick={() => setActive(i)}
                className={cn(
                  "group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
                  isActive
                    ? "border-foreground/30 bg-[#0c0e0a]"
                    : "border-border bg-surface-soft/40 hover:border-foreground/20"
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
                    isActive
                      ? "border-accent/50 bg-accent-soft text-foreground"
                      : isComplete
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-border bg-surface-soft text-muted"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <div className="flex-1">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    Paso {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 text-[0.9375rem] font-medium text-foreground">{step.title}</p>
                  <p
                    className={cn(
                      "mt-1 text-[0.875rem] text-pretty transition-colors",
                      isActive ? "text-foreground/80" : "text-muted"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Visualization */}
      <div className="relative aspect-square w-full max-w-[560px] self-center rounded-2xl border border-border bg-gradient-to-b from-[#101210] to-[#080908] p-6 sm:p-8">
        <div className="absolute inset-0 grid-pattern-fine opacity-40" aria-hidden />
        <BuildViz activeStep={active} />
      </div>
    </div>
  );
}

function BuildViz({ activeStep }: { activeStep: number }) {
  return (
    <div className="relative flex h-full items-center justify-center">
      {/* Central building */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-32 w-32 sm:h-40 sm:w-40"
        >
          {/* Glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-4 rounded-2xl"
            style={{
              background: "radial-gradient(circle, rgba(216,255,98,0.18) 0%, transparent 60%)",
            }}
            aria-hidden
          />

          {/* Outer frame */}
          <div className="absolute inset-0 rounded-2xl border border-border-strong bg-[#0c0e0a]">
            <div className="absolute inset-2 rounded-xl border border-border/60" aria-hidden />

            {/* Building up layers */}
            {[...Array(5)].map((_, i) => {
              const isActive = i <= activeStep;
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.15,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="absolute left-1/2 -translate-x-1/2 rounded-md"
                  style={{
                    bottom: `${8 + i * 14}%`,
                    width: `${50 - i * 4}%`,
                    height: "12%",
                    background: isActive
                      ? "linear-gradient(180deg, rgba(216,255,98,0.25) 0%, rgba(216,255,98,0.05) 100%)"
                      : "rgba(242,240,233,0.04)",
                    border: isActive ? "1px solid rgba(216,255,98,0.5)" : "1px solid rgba(242,240,233,0.1)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                      className="h-full w-full origin-left"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(216,255,98,0.4) 50%, transparent 100%)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Label */}
            <div className="absolute inset-x-0 top-2 text-center">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                {activeStep >= STEPS.length - 1 ? "Operativo" : "Construyendo"}
              </p>
              <p className="mt-0.5 font-display text-[0.85rem] tracking-[-0.01em] text-foreground">
                ATLAS
              </p>
            </div>
          </div>

          {/* Corner ticks */}
          <div className="absolute -left-2 -top-2 h-3 w-3 border-l border-t border-accent/60" aria-hidden />
          <div className="absolute -right-2 -top-2 h-3 w-3 border-r border-t border-accent/60" aria-hidden />
          <div className="absolute -bottom-2 -left-2 h-3 w-3 border-b border-l border-accent/60" aria-hidden />
          <div className="absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-accent/60" aria-hidden />
        </motion.div>
      </div>

      {/* Active step label */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-full border border-accent/40 bg-[#0c0e0a] px-3 py-1.5"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-foreground">
          {STEPS[activeStep]?.title}
        </span>
      </motion.div>
    </div>
  );
}
