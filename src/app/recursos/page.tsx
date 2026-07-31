import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FinalCta } from "@/components/marketing/final-cta";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Guías, casos de uso y material para entender mejor cómo DEPT.IA puede ayudar a tu empresa.",
};

const RESOURCES = [
  {
    type: "Guía",
    title: "Cómo decidir qué departamento contratar primero",
    description:
      "Una guía de cinco pasos para identificar la fricción operativa más cara y abordarla con un equipo digital.",
    time: "8 min",
  },
  {
    type: "Caso de uso",
    title: "Cómo un departamento de marketing se coordina con uno de ventas",
    description:
      "Recorremos el flujo real entre los equipos: handoff de leads, memoria compartida, aprobaciones conjuntas.",
    time: "12 min",
  },
  {
    type: "Artículo",
    title: "Por qué los chatbots no escalan como departamentos",
    description:
      "Una comparación técnica y operativa entre interfaces conversacionales aisladas y equipos estructurados.",
    time: "6 min",
  },
  {
    type: "Changelog",
    title: "Actualizaciones de octubre",
    description:
      "Nuevo sistema de aprobaciones, integración con Telegram mejorada y permisos granulares por departamento.",
    time: "3 min",
  },
  {
    type: "Webinar",
    title: "Activación de un departamento en 30 minutos",
    description:
      "Grabación del recorrido en directo: desde la compra hasta la primera misión ejecutada.",
    time: "30 min",
  },
  {
    type: "Plantilla",
    title: "Brief de primera misión",
    description:
      "Una plantilla editable para definir la primera tarea que delegarás a tu departamento.",
    time: "Plantilla",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">Recursos</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            Ideas, guías y casos para integrar departamentos digitales.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Material práctico para entender cómo DEPT.IA puede encajar en la operativa de tu
            empresa. Sin jerga, sin promesas exageradas.
          </p>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => (
              <Link
                key={r.title}
                href={`/recursos/${r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group rounded-2xl border border-border bg-[#0c0e0a] p-6 transition-colors hover:border-foreground/30"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  {r.type} · {r.time}
                </span>
                <h2 className="mt-3 font-display text-[1.25rem] leading-[1.2] tracking-[-0.02em] text-foreground text-pretty">
                  {r.title}
                </h2>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">{r.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-foreground">
                  Leer
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
