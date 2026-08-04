"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PermissionsBoard } from "@/components/visualizations/permissions-board";

export function ControlPermissions() {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Control</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              La autonomía la decides tú.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              Cada acción del equipo se clasifica en uno de tres niveles. Tú configuras los
              límites, el departamento los respeta. Cambia una acción de un nivel a otro para
              ver cómo funciona.
            </p>

            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <ControlRow
                level="can"
                title="Trabaja solo"
                description="Investigación, análisis, borradores, planificación. El equipo decide."
              />
              <ControlRow
                level="approval"
                title="Te consulta"
                description="Publicaciones, envíos, cambios en CRM. El equipo propone y espera tu visto bueno."
              />
              <ControlRow
                level="never"
                title="Bloqueado"
                description="Pagos, firma de contratos, borrado de datos sensibles. No se ejecuta nunca."
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <PermissionsBoard />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ControlRow({
  level,
  title,
  description,
}: {
  level: "can" | "approval" | "never";
  title: string;
  description: string;
}) {
  const dot = {
    can: "bg-success",
    approval: "bg-warning",
    never: "bg-danger",
  }[level];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex gap-4 border-b border-border/60 pb-3 last:border-b-0"
    >
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden />
      <div>
        <p className="text-[0.9375rem] font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-[0.875rem] text-muted text-pretty">{description}</p>
      </div>
    </motion.div>
  );
}
