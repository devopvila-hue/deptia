"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IsolatedInstances } from "@/components/visualizations/isolated-instances";

export function PrivateInstance() {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="08">Privacidad</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              Tu empresa no comparte oficina digital con nadie.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              Cada cliente opera sobre una instancia privada, con datos separados, credenciales
              propias y memoria independiente. Si decides irte, puedes llevarte todo y
              desconectar.
            </p>

            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {[
                "Instancia independiente por empresa",
                "Datos separados, cifrado en reposo",
                "Credenciales y claves de cifrado propias",
                "Memoria y configuración aisladas",
                "Eliminación de instancia al cancelar",
                "Permisos auditables en cada acción",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-b-0"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-[0.9375rem] text-foreground/90">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <IsolatedInstances />
          </div>
        </div>
      </Container>
    </section>
  );
}
