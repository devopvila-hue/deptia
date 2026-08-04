"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InstanceBuild } from "@/components/visualizations/instance-build";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative border-b border-border">
      <Container width="wide" className="py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Activación</Eyebrow>
            <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              De la contratación a la primera misión, en menos de una hora.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
              El proceso de activación está diseñado para que tu empresa tenga un equipo operativo
              cuanto antes, sin necesidad de desplegar nada ni configurar infraestructura.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/como-funciona"
                variant="primary"
                size="md"
                rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                Ver el proceso completo
              </Button>
              <Button href="/demo" variant="ghost" size="md">
                Probar el panel
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  Tiempo medio
                </p>
                <p className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                  32 min
                </p>
                <p className="mt-1 text-[0.75rem] text-muted">de compra a primera misión</p>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  Configuración técnica
                </p>
                <p className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                  Cero
                </p>
                <p className="mt-1 text-[0.75rem] text-muted">nosotros la gestionamos</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-[#0c0e0a] p-6 sm:p-8">
              <InstanceBuild />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
