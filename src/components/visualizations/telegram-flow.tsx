"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Send, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PANEL_MESSAGES = [
  { id: "p1", text: "Informe semanal listo para revisar", time: "10:42" },
  { id: "p2", text: "Borrador campaña LinkedIn propuesto", time: "10:43" },
  { id: "p3", text: "Acción esperando tu aprobación", time: "10:44" },
];

const TELEGRAM_MESSAGES = [
  { id: "t1", text: "📊 Informe semanal listo", time: "10:42" },
  { id: "t2", text: "✍️ Borrador de campaña listo para revisar", time: "10:43" },
  { id: "t3", text: "⚠️ Hay 1 acción esperando tu aprobación", time: "10:44" },
];

export function TelegramFlow({ className }: { className?: string }) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("relative grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr_1fr]", className)}>
      {/* Web panel */}
      <div className="rounded-2xl border border-border bg-gradient-to-b from-[#101210] to-[#080908] p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/40 bg-accent-soft">
              <span className="font-mono text-[0.6rem] text-foreground">DA</span>
            </div>
            <span className="text-[0.875rem] font-medium text-foreground">Panel web</span>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-success">
            ● activo
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {PANEL_MESSAGES.map((m, i) => {
            const isActive = pulse === i;
            return (
              <li
                key={m.id}
                className={cn(
                  "flex items-start justify-between gap-3 rounded-md border border-border/60 bg-surface-soft/50 px-3 py-2 transition-colors",
                  isActive && "border-accent/40 bg-accent-soft/50"
                )}
              >
                <p className="text-[0.8125rem] text-foreground/90">{m.text}</p>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {m.time}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-[#0c0e0a] px-3 py-2">
          <input
            type="text"
            placeholder="Pide un informe o aprueba una acción…"
            className="flex-1 bg-transparent text-[0.8125rem] text-foreground placeholder:text-muted focus:outline-none"
            readOnly
            aria-label="Mensaje al departamento"
          />
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-[#0a0c08]"
            aria-label="Enviar"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Sync arrow */}
      <div className="relative hidden items-center justify-center lg:flex">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-[#0c0e0a]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 8h10M7 8l3-3M7 8l3 3M17 16H7m10 0l-3-3m3 3l-3 3" />
            </svg>
          </motion.div>
          <span className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            Sincronizado
          </span>
        </div>
      </div>

      {/* Phone / Telegram */}
      <div className="mx-auto w-full max-w-[280px]">
        <div className="relative rounded-[32px] border border-border bg-[#0c0e0a] p-3 shadow-2xl">
          <div className="flex items-center justify-between px-2 pt-1 text-[0.65rem] text-muted">
            <span className="font-mono">10:44</span>
            <div className="flex items-center gap-1">
              <span>●●●●</span>
              <span>100%</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 border-b border-border/60 pb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2419] text-[0.7rem] text-accent">
              D
            </div>
            <div>
              <p className="text-[0.8125rem] font-medium text-foreground">DEPARTIFY · Marketing</p>
              <p className="font-mono text-[0.6rem] text-muted">en línea</p>
            </div>
          </div>
          <div className="mt-3 space-y-2 min-h-[200px]">
            {TELEGRAM_MESSAGES.map((m, i) => (
              <motion.div
                key={m.id}
                animate={{ opacity: pulse >= i ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-border/40 bg-[#101210] px-3 py-2"
              >
                <p className="text-[0.8125rem] text-foreground/90">{m.text}</p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="font-mono text-[0.6rem] text-muted">{m.time}</span>
                  <CheckCheck className="h-3 w-3 text-accent" />
                </div>
              </motion.div>
            ))}
            {pulse === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-auto w-fit rounded-lg border border-accent/40 bg-accent-soft px-3 py-2"
              >
                <p className="text-[0.8125rem] text-foreground">✅ Aprobado</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
