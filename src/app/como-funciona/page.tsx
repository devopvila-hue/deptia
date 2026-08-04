import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { InstanceBuild } from "@/components/visualizations/instance-build";
import { VideoPlaceholder } from "@/components/visualizations/video-placeholder";
import { FinalCta } from "@/components/marketing/final-cta";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "De la contratación a la primera misión en menos de una hora. Sin desplegar nada. Te explicamos el proceso completo.",
};

const STEPS = [
  {
    number: "01",
    title: "Compra",
    description:
      "Eliges el plan y el departamento. La contratación se realiza online, sin llamadas comerciales obligatorias.",
    duration: "2 min",
  },
  {
    number: "02",
    title: "Aprovisionamiento",
    description:
      "Se crea una instancia privada con sus propios recursos, claves de cifrado y espacio aislado.",
    duration: "3 min",
  },
  {
    number: "03",
    title: "Onboarding",
    description:
      "Un Director de Incorporación te guía en una conversación para entender tu empresa, marca, objetivos y reglas.",
    duration: "30 min",
  },
  {
    number: "04",
    title: "Conexiones",
    description:
      "Conectas las herramientas que el departamento va a usar. Tú decides qué puede leer, preparar o aplicar.",
    duration: "20 min",
  },
  {
    number: "05",
    title: "Permisos",
    description:
      "Configuras los tres niveles de autonomía para cada tipo de acción: puede, aprueba, nunca.",
    duration: "15 min",
  },
  {
    number: "06",
    title: "Primera misión",
    description:
      "Defines la primera misión y el equipo propone un plan operativo. Apruebas y empieza a ejecutar.",
    duration: "Continuo",
  },
  {
    number: "07",
    title: "Trabajo recurrente",
    description:
      "El equipo opera bajo tus reglas, mantiene memoria, registra actividad y propone iteraciones.",
    duration: "Diario",
  },
  {
    number: "08",
    title: "Informes",
    description:
      "Recibes informes semanales, métricas por canal y resúmenes ejecutivos. Visibles desde web y Telegram.",
    duration: "Semanal",
  },
  {
    number: "09",
    title: "Mejora continua",
    description:
      "El equipo aprende de cada decisión, corrige patrones y propone nuevas oportunidades de trabajo.",
    duration: "Continuo",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">Proceso</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            De la contratación a la primera misión, en menos de una hora.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            No tienes que desplegar nada, configurar servidores ni entender infraestructura. Te
            explicamos el proceso completo, paso a paso.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="https://app.departify.app/signup"
              variant="primary"
              size="lg"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Empezar
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Probar el panel
            </Button>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="rounded-xl border border-border bg-[#0c0e0a] p-5"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                    {step.number}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.125rem] font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Build visualization */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="02">Activación</Eyebrow>
              <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
                Tu instancia se construye en directo.
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
                Durante el aprovisionamiento, el sistema crea un entorno aislado para tu empresa,
                aplica permisos y prepara el espacio de trabajo.
              </p>
            </div>
            <div className="lg:col-span-7">
              <InstanceBuild />
            </div>
          </div>
        </Container>
      </section>

      {/* Demo video */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="03">Demo</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                Una vista del panel en uso
              </h2>
              <p className="mt-4 text-[0.9375rem] text-muted text-pretty">
                El panel combina el estado del departamento, las tareas activas, las aprobaciones
                pendientes y la conexión con Telegram.
              </p>
              <Button href="/demo" variant="secondary" size="md" className="mt-6">
                Probar el panel en vivo
              </Button>
            </div>
            <div className="lg:col-span-8">
              <VideoPlaceholder title="Activación completa" subtitle="Recorrido · 90 s" />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
