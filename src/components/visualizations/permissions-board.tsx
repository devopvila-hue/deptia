"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, ShieldAlert, ShieldCheck, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

type Level = "can" | "approval" | "never";

interface Item {
  id: string;
  label: string;
  default: Level;
}

const ITEMS: Item[] = [
  { id: "investigate", label: "Investigar mercado y competencia", default: "can" },
  { id: "draft", label: "Preparar borradores de contenido", default: "can" },
  { id: "analyze", label: "Analizar métricas y reporting", default: "can" },
  { id: "publish", label: "Publicar en redes sociales", default: "approval" },
  { id: "send", label: "Enviar correos o newsletters", default: "approval" },
  { id: "crm", label: "Modificar el CRM", default: "approval" },
  { id: "pay", label: "Realizar pagos o transferencias", default: "never" },
  { id: "sign", label: "Firmar contratos en tu nombre", default: "never" },
  { id: "delete", label: "Eliminar datos de clientes", default: "never" },
];

const LEVELS: { id: Level; label: string; icon: typeof Check; description: string }[] = [
  { id: "can", label: "Puede hacerlo", icon: Check, description: "Trabaja solo" },
  { id: "approval", label: "Necesita aprobación", icon: Hand, description: "Te pregunta antes" },
  { id: "never", label: "Nunca puede hacerlo", icon: ShieldAlert, description: "Bloqueado" },
];

const STYLES: Record<Level, { ring: string; bg: string; text: string; border: string }> = {
  can: {
    ring: "ring-success/40",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/40",
  },
  approval: {
    ring: "ring-warning/40",
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/40",
  },
  never: {
    ring: "ring-danger/40",
    bg: "bg-danger/10",
    text: "text-danger",
    border: "border-danger/40",
  },
};

export function PermissionsBoard({ className }: { className?: string }) {
  const [items, setItems] = useState<Record<string, Level>>(
    Object.fromEntries(ITEMS.map((i) => [i.id, i.default]))
  );
  const [dragging, setDragging] = useState<{ id: string; x: number; y: number } | null>(null);

  const setLevel = (id: string, level: Level) =>
    setItems((prev) => ({ ...prev, [id]: level }));

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDragging({ id, x: e.clientX, y: e.clientY });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (level: Level) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragging) {
      setLevel(dragging.id, level);
      setDragging(null);
    }
  };

  const handleClick = (id: string, level: Level) => () => setLevel(id, level);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Columns */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {LEVELS.map((lvl) => {
          const lvlItems = ITEMS.filter((i) => items[i.id] === lvl.id);
          const Icon = lvl.icon;
          return (
            <div
              key={lvl.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop(lvl.id)}
              className={cn(
                "rounded-xl border bg-[#0c0e0a] p-4 transition-colors",
                STYLES[lvl.id].border
              )}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md",
                      STYLES[lvl.id].bg
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", STYLES[lvl.id].text)} />
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-medium text-foreground">{lvl.label}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                      {lvl.description}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
                    STYLES[lvl.id].border,
                    STYLES[lvl.id].text
                  )}
                >
                  {lvlItems.length}
                </span>
              </div>

              <ul className="mt-3 space-y-2 min-h-[140px]">
                <AnimatePresence>
                  {lvlItems.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(
                          e as unknown as React.DragEvent,
                          item.id
                        )
                      }
                      className="group flex cursor-grab items-center justify-between gap-2 rounded-md border border-border/60 bg-surface-soft/60 px-3 py-2 active:cursor-grabbing"
                    >
                      <span className="text-[0.8125rem] text-foreground/90">{item.label}</span>
                      <div className="flex items-center gap-1">
                        {LEVELS.map((l) => (
                          <button
                            key={l.id}
                            onClick={handleClick(item.id, l.id)}
                            aria-label={`Mover a ${l.label}`}
                            className={cn(
                              "h-5 w-5 rounded-sm border transition-colors",
                              items[item.id] === l.id
                                ? cn(STYLES[l.id].border, STYLES[l.id].bg)
                                : "border-border/40 bg-transparent opacity-0 group-hover:opacity-100"
                            )}
                          />
                        ))}
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
                {lvlItems.length === 0 && (
                  <li className="flex h-[100px] items-center justify-center rounded-md border border-dashed border-border/40 text-[0.75rem] text-muted">
                    Arrastra aquí
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-[0.75rem] text-muted">
        Esto es una demo visual. Los cambios no se guardan. La configuración real de permisos se
        aplica en cada departamento y se mantiene entre sesiones.
      </p>
    </div>
  );
}

export function PermissionsBoardStatic({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {LEVELS.map((lvl) => {
          const lvlItems = ITEMS.filter((i) => i.default === lvl.id);
          const Icon = lvl.icon;
          return (
            <div
              key={lvl.id}
              className={cn(
                "rounded-xl border bg-[#0c0e0a] p-4",
                STYLES[lvl.id].border
              )}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md",
                      STYLES[lvl.id].bg
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", STYLES[lvl.id].text)} />
                  </span>
                  <div>
                    <p className="text-[0.875rem] font-medium text-foreground">{lvl.label}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                      {lvl.description}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
                    STYLES[lvl.id].border,
                    STYLES[lvl.id].text
                  )}
                >
                  {lvlItems.length}
                </span>
              </div>

              <ul className="mt-3 space-y-2">
                {lvlItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border/60 bg-surface-soft/60 px-3 py-2"
                  >
                    <span className="text-[0.8125rem] text-foreground/90">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-soft/40 p-4">
        <ShieldCheck className="h-5 w-5 text-success" />
        <p className="text-[0.875rem] text-foreground/90">
          Configura el nivel de cada departamento. Los cambios se aplican de inmediato.
        </p>
      </div>
    </div>
  );
}
