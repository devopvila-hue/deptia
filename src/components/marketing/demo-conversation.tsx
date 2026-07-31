"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MissionChat } from "@/components/visualizations/mission-chat";
import { track } from "@/lib/analytics";
import { Play } from "lucide-react";

export function DemoConversation() {
  return (
    <section id="demo" className="relative border-b border-border bg-background">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="wide" className="relative py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="05">Misión real</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              No enseñamos una conversación. Mostramos el trabajo que hay detrás.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              Cuando le pides algo al departamento, este analiza, planifica, propone y mide.
              Aquí puedes ver una misión real del equipo de Marketing.
            </p>

            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {[
                { label: "Mensaje inicial", value: "El cliente define el objetivo" },
                { label: "Análisis interno", value: "El departamento revisa el contexto" },
                { label: "Propuesta", value: "Plan operativo, no solo respuesta" },
                { label: "Aprobaciones", value: "Tú decides antes de ejecutar" },
                { label: "Resultado", value: "Métricas y aprendizaje registrado" },
              ].map((step, i) => (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] text-foreground">{step.label}</span>
                  </div>
                  <span className="text-right text-[0.8125rem] text-muted">{step.value}</span>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => track("demo_started")}
              className="mt-8 inline-flex items-center gap-2 text-[0.875rem] font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Reproducir la misión paso a paso
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-5 sm:p-8">
              <MissionChat />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
