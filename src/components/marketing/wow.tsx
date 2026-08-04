"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// WOW: Esta sección vende la CATEGORÍA, no compite con nada.
// Responde UNA sola pregunta: "¿qué hace Departify?"
// Respuesta: primero entiende, después trabaja, y cada día te conoce mejor.
// Eso no es un chat. Es un compañero de trabajo.
export function Wow() {
  return (
    <section className="border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{copy.wow.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.wow.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {copy.wow.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {copy.wow.steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-background p-6 sm:p-7"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[1.25rem] font-medium tracking-[0.05em] text-accent">
                  {step.n}
                </span>
                <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-foreground">
                  {step.head}
                </h3>
              </div>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}