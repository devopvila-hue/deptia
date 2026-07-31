"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";

const POINTS = [
  {
    label: "Construido en",
    value: "España",
    detail: "Datos en la UE, cumplimiento RGPD desde el diseño.",
  },
  {
    label: "Operación",
    value: "24 / 7",
    detail: "El departamento trabaja cuando tu empresa lo necesita.",
  },
  {
    label: "Tiempo medio",
    value: "< 1 hora",
    detail: "De la compra al primer equipo operativo en tu instancia.",
  },
  {
    label: "Independencia",
    value: "Por cliente",
    detail: "Instancia propia, credenciales propias, memoria propia.",
  },
];

export function TrustStrip() {
  return (
    <section className="relative border-b border-border bg-background">
      <Container width="wide" className="py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col gap-2 border-l border-border pl-4"
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {p.label}
              </span>
              <span className="font-display text-[1.5rem] tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                {p.value}
              </span>
              <span className="text-[0.8125rem] leading-relaxed text-muted text-pretty">
                {p.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
