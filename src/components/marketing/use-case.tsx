"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const BEFORE = [
  "Ideas dispersas en notas, chats y documentos",
  "Campañas sin continuidad entre trimestres",
  "Seguimientos manuales que se olvidan",
  "Herramientas que no se hablan entre sí",
  "Información perdida al cambiar de persona",
];

const AFTER = [
  "Plan de 30 días vivo, revisable y compartido",
  "Calendario editorial listo y coordinado",
  "Campañas preparadas con aprobaciones centralizadas",
  "Informes semanales con métricas accionables",
  "Memoria de marca y decisiones registradas",
];

export function UseCase() {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="11">Caso de uso</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              Una empresa antes y después de activar Marketing.
            </h2>
            <p className="mt-5 text-[0.9375rem] text-muted text-pretty">
              Un caso demostrativo, no porcentajes. Lo que cambia es la dinámica de trabajo, no
              las métricas infladas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:col-span-8 sm:grid-cols-2">
            <CaseColumn
              label="Antes"
              index="A"
              variant="muted"
              items={BEFORE}
              description="Una empresa intentando crecer sin estructura."
            />
            <CaseColumn
              label="Después"
              index="B"
              variant="accent"
              items={AFTER}
              description="Un equipo que propone, ejecuta y mide."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CaseColumn({
  label,
  index,
  items,
  description,
  variant,
}: {
  label: string;
  index: string;
  items: string[];
  description: string;
  variant: "muted" | "accent";
}) {
  const isAccent = variant === "accent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-8 ${
        isAccent
          ? "border-accent/30 bg-gradient-to-b from-[#101210] to-[#0a0c08]"
          : "border-border bg-surface-soft/30"
      }`}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <span
          className={`font-mono text-[0.65rem] uppercase tracking-[0.18em] ${
            isAccent ? "text-accent" : "text-muted"
          }`}
        >
          {index}
        </span>
        <span
          className={`font-display text-[1.5rem] tracking-[-0.02em] ${
            isAccent ? "text-foreground" : "text-muted"
          }`}
        >
          {label}
        </span>
      </div>
      <p className="mt-3 text-[0.875rem] text-muted">{description}</p>

      <ul className="mt-5 space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex items-start gap-3 border-t border-border/40 pt-3 text-[0.875rem] first:border-t-0 first:pt-0"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                isAccent ? "bg-accent" : "bg-muted/40"
              }`}
            />
            <span className={isAccent ? "text-foreground/90" : "text-muted"}>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
