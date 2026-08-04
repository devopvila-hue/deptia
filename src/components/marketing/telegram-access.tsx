"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TelegramFlow } from "@/components/visualizations/telegram-flow";

export function TelegramAccess() {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Multicanal</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              Tu departamento también cabe en Telegram.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              Pide un informe, aprueba una publicación, recibe una alerta o responde por nota de
              voz. El panel web y Telegram están sincronizados.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
              {[
                "Pedir un informe",
                "Aprobar una publicación",
                "Consultar una campaña",
                "Recibir alertas",
                "Enviar notas de voz",
                "Aprobar acciones sensibles",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.875rem] text-foreground/90"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-5 sm:p-8">
              <TelegramFlow />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
