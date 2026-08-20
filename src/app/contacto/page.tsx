import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactForm } from "@/components/forms/contact-form";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Habla con el equipo de ${brand.name}. Respondemos en horario laboral en menos de 24 horas.`,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: `Contacto · ${brand.name}`,
    description: `Habla con el equipo de ${brand.name}. Respondemos en menos de 24 horas.`,
    url: "/contacto",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="wide" className="relative grid grid-cols-1 gap-16 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="01">Contacto</Eyebrow>
          <h1 className="mt-6 text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            Cuéntanos qué necesita tu empresa.
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Si quieres una demostración personalizada, estás evaluando para un proyecto
            específico o tienes dudas sobre seguridad, estamos disponibles.
          </p>

          <div className="mt-10 space-y-4 border-t border-border pt-6">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Email
              </p>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="mt-1 inline-block text-[1rem] text-foreground hover:text-accent"
              >
                {brand.contactEmail}
              </a>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Seguridad
              </p>
              <a
                href={`mailto:${brand.securityEmail}`}
                className="mt-1 inline-block text-[1rem] text-foreground hover:text-accent"
              >
                {brand.securityEmail}
              </a>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Ubicación
              </p>
              <p className="mt-1 text-[1rem] text-foreground">
                {brand.country} · Unión Europea
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Respuesta
              </p>
              <p className="mt-1 text-[1rem] text-foreground">
                En horario laboral · menos de 24 h
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
