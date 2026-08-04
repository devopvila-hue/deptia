"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IntegrationsOrbit } from "@/components/visualizations/integrations-orbit";
import { integrations, getIntegrationsByCategory } from "@/data/departments";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: "all" | "communication" | "productivity" | "crm" | "social" | "design" | "storage"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "communication", label: "Comunicación" },
  { id: "productivity", label: "Productividad" },
  { id: "crm", label: "CRM" },
  { id: "social", label: "Redes" },
  { id: "design", label: "Diseño" },
  { id: "storage", label: "Almacenamiento" },
];

export function Integrations() {
  const [filter, setFilter] = useState<typeof CATEGORIES[number]["id"]>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const byCategory = getIntegrationsByCategory();
  const visible = filter === "all" ? integrations : byCategory[filter] ?? [];
  const selectedItem = selected ? integrations.find((i) => i.name === selected) : null;

  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Integraciones</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              Trabaja donde ya trabaja tu empresa.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              El departamento se conecta a tus herramientas, lee lo que necesita, prepara lo que
              le pides y aplica cambios solo cuando se lo apruebas.
            </p>

            {/* Categories */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[0.75rem] font-medium transition-colors",
                    filter === c.id
                      ? "border-foreground/30 bg-surface-soft text-foreground"
                      : "border-border bg-surface-soft/30 text-muted hover:border-foreground/20 hover:text-foreground"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Selected tool detail */}
            <div className="mt-6 min-h-[180px] rounded-xl border border-border bg-[#0c0e0a] p-5">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[1.25rem] tracking-[-0.01em] text-foreground">
                      {selectedItem.name}
                    </p>
                    <button
                      onClick={() => setSelected(null)}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-foreground"
                    >
                      cerrar ×
                    </button>
                  </div>
                  <dl className="mt-4 space-y-3 text-[0.8125rem]">
                    <div className="flex items-start gap-3 border-t border-border/60 pt-3">
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        Lee
                      </dt>
                      <dd className="text-foreground/90">{selectedItem.reads}</dd>
                    </div>
                    <div className="flex items-start gap-3 border-t border-border/60 pt-3">
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        Prepara
                      </dt>
                      <dd className="text-foreground/90">{selectedItem.prepares}</dd>
                    </div>
                    <div className="flex items-start gap-3 border-t border-border/60 pt-3">
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        Aprueba
                      </dt>
                      <dd className="text-foreground/90">{selectedItem.requiresApproval}</dd>
                    </div>
                  </dl>
                </motion.div>
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  <p className="text-[0.875rem] text-muted text-pretty">
                    Selecciona una herramienta del panel para ver qué puede leer, preparar y qué
                    necesita tu aprobación.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 sm:p-8">
              <IntegrationsOrbit />
            </div>

            {/* Quick chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {visible.slice(0, 8).map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => {
                    setSelected(tool.name);
                    track("integration_viewed", { integration: tool.name });
                  }}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-[0.75rem] font-medium transition-colors",
                    selected === tool.name
                      ? "border-accent/50 bg-accent-soft text-foreground"
                      : "border-border bg-surface-soft/40 text-muted hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
