"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { DEPARTIFY_DEPARTMENTS } from "@/config/departments";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(216,255,98,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <Container width="wide" className="relative py-32 sm:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            Siguiente paso
            <span className="h-1 w-1 rounded-full bg-accent" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground"
          >
            Recupera tu lunes por la mañana.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[1.0625rem] leading-relaxed text-muted text-pretty"
          >
            Crea tu primer departamento en menos de 30 minutos. Sin tarjeta, sin permanencia,
            sin perder el control de tu empresa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              href="https://app.departify.app/signup"
              variant="primary"
              size="xl"
              onClick={() => track("hero_cta_clicked", { source: "final_cta" })}
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Crear mi equipo
            </Button>
            <Button
              href="/demo"
              variant="secondary"
              size="xl"
              leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
            >
              Ver una demostración
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"
          >
            Instancia privada · Onboarding guiado · Cancela cuando quieras
          </motion.p>
        </div>

        {/* Decorative tickers — consume the official 15-department catalog. */}
        <div className="mt-20 hidden flex-wrap items-center justify-center gap-3 sm:flex">
          {DEPARTIFY_DEPARTMENTS.map((d, i) => (
            <motion.span
              key={d}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-soft/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {d}
            </motion.span>
          ))}
        </div>
      </Container>
    </section>
  );
}
