"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/config/site";

// QUÉ MIRAMOS — las áreas que analizamos en el diagnóstico.
// No vendemos. Solo enumeramos lo que se examina.
export function Diagnostics() {
  return (
    <section className="border-b border-border bg-background">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{copy.diagnostics.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {copy.diagnostics.title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {copy.diagnostics.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {copy.diagnostics.areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface-soft/30 p-6 sm:p-7"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {area.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}