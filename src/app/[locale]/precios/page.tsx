import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/ui/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { brand } from "@/config/brand";
import { assertLocalizedForRoute } from "@/i18n/guard";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Tres planes para incorporar departamentos de IA en tu empresa. Sin sorpresas, cancela cuando quieras.",
  alternates: { canonical: "/precios" },
  openGraph: {
    title: `Precios · ${brand.name}`,
    description:
      "Tres planes para incorporar departamentos de IA. Mensuales o anuales, sin permanencia.",
    url: "/precios",
    type: "website",
  },
};

const PRICING_FAQ = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí. Puedes subir o bajar de plan desde el panel de administración. El cambio se aplica de forma inmediata y se prorratea en la siguiente factura.",
  },
  {
    question: "¿Qué incluye el uso mensual?",
    answer:
      "Cada plan incluye un uso mensual adecuado al alcance habitual del equipo. Si necesitas más capacidad, puedes contratar créditos adicionales sin cambiar de plan.",
  },
  {
    question: "¿Hay permanencia?",
    answer:
      "No. Todos los planes son mensuales o anuales sin permanencia. Si decides cancelar, mantienes el acceso durante 30 días para exportar todo.",
  },
  {
    question: "¿Necesito tarjeta para empezar?",
    answer:
      "No. Puedes iniciar el proceso de alta, completar el onboarding y explorar el panel. Te pediremos el método de pago cuando decidas activar el primer departamento.",
  },
  {
    question: "¿Qué métodos de pago aceptáis?",
    answer:
      "Tarjeta de crédito y débito, transferencia bancaria para planes anuales, y SEPA para empresas europeas. Factura automática disponible.",
  },
  {
    question: "¿Emitís factura?",
    answer:
      "Sí. Emitimos factura automática en cada cobro. Las empresas europeas pueden facilitar su número de IVA para la validación.",
  },
];

export default function PricingPage({ params }: { params: { locale: string } }) {
  assertLocalizedForRoute(params.locale, "/precios");
  return (
    <>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">Precios</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            Tres planes. Sin sorpresas. Cancela cuando quieras.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Empieza con un departamento, suma más cuando los necesites. Todos los planes incluyen
            instancia privada, onboarding guiado y aprobaciones en cada acción sensible.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-background">
        <Container width="wide" className="py-16 sm:py-20">
          <Pricing hideHeader />
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="02">Preguntas</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                Sobre la facturación
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={PRICING_FAQ} />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
