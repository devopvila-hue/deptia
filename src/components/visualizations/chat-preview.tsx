"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Plus, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ChatPreview — réplica fiel del chat real de app.departify.app,
 * mostrada en el Hero para que el visitante vea el producto tal cual.
 * Pensada para encajar en el Container del Hero (padding p-4 → p-6,
 * border-b interno de 60% opacity) sin scroll, sin overflow.
 */
export function ChatPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative isolate flex h-full min-h-0 flex-col gap-3", className)}>
      {/* ─── Header: "Conversación de tu empresa" + acciones ─── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-3"
      >
        <h3 className="font-display text-[0.9375rem] font-medium tracking-[-0.01em] text-foreground">
          Conversación de tu empresa
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-soft/50 px-2.5 text-[0.75rem] font-medium text-foreground/90 transition-colors hover:bg-surface-soft"
          >
            <Plus className="h-3.5 w-3.5" />
            Nueva conversación
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-soft/50 px-2.5 text-[0.75rem] font-medium text-foreground/90 transition-colors hover:bg-surface-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Compactar contexto
          </button>
        </div>
      </motion.div>

      {/* ─── Hilo ─── */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Burbuja Departify */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-start gap-2.5"
        >
          <div
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-[#0c0e0a]"
            aria-hidden
          >
            <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.14em] text-accent">
              DA
            </span>
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-border bg-[#0c0e0a]/80 p-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              Departify
            </p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-pretty text-foreground/90">
              Plan de Marketing listo.
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-foreground/90">
              Guardado en <strong className="font-semibold text-foreground">Departify / 01_Marketing</strong> con sus carpetas de trabajo y 0 documentos. Si ya existía algún elemento, lo he reutilizado para no duplicarlo.
            </p>
            <a
              href="https://drive.google.com"
              className="mt-2.5 inline-flex items-center gap-1 text-[0.75rem] font-medium text-accent underline-offset-4 hover:underline"
            >
              Abrir en Google Drive
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </motion.div>

        {/* Task card — resultado */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="ml-9 rounded-lg border border-accent/40 bg-[#0c0e0a]/70 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.8125rem] font-semibold text-foreground">
              Plan de Marketing listo
            </p>
            <span className="rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-success">
              Terminado
            </span>
          </div>
          <p className="mt-2 text-[0.75rem] leading-relaxed text-pretty text-muted">
            Plan de Marketing guardado en Departify / 01_Marketing.
          </p>
          <button
            type="button"
            className="mt-2.5 inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface-soft/70 px-2.5 text-[0.7rem] font-medium text-foreground transition-colors hover:bg-surface-soft"
          >
            Abrir en Google Drive
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </motion.div>
      </div>

      {/* ─── Input ─── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex items-center gap-2 rounded-lg border border-border bg-[#0c0e0a]/90 px-3 py-2.5"
      >
        <Plus className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <span className="flex-1 truncate text-[0.8125rem] text-muted">
          Pregunta o pide algo a tu empresa…
        </span>
        <button
          type="button"
          aria-label="Enviar"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-[#0a0c08] transition-transform hover:scale-[1.03]"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
