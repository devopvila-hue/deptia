"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ } from "@/components/ui/faq";
import { LinkButton } from "@/components/ui/link-button";
import { copy } from "@/config/site";

// FAQ breve. Sin nombrar competidores. Sin features técnicas.
const HOME_FAQ = [
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El diagnóstico es gratis. Sin compromiso. Si después decides activar algún departamento, te diremos exactamente cuánto cuesta antes de que confirmes.",
  },
  {
    question: "¿Tengo que dar mi tarjeta para el diagnóstico?",
    answer:
      "No. El diagnóstico es gratis y sin tarjeta. Solo te la pediremos si decides activar un departamento.",
  },
  {
    question: "¿Y si después del análisis no me convence?",
    answer:
      "No pasa nada. Solo habrás invertido 5 minutos en contarnos cómo es tu día. No hay compromiso, no hay coste.",
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer:
      "No. Si sabes usar WhatsApp y un email, sabes usar Departify. No necesitas instalar nada ni aprender software.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Cada empresa tiene su propia instancia privada. Tus datos no se mezclan con los de otros clientes. Puedes borrarlo todo cuando quieras.",
  },
  {
    question: "¿Puedo cancelar después?",
    answer:
      "Sí. Sin permanencia. Cancelas hoy y dejas de pagar mañana. Tus datos quedan disponibles 30 días para descargar.",
  },
];

export function FaqSection() {
  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Preguntas</Eyebrow>
            <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              {copy.faqTitle}
            </h2>
            <p className="mt-5 text-[0.9375rem] text-muted text-pretty">
              Si te queda alguna duda, escríbenos. Respondemos en menos de 24 horas.
            </p>

            <div className="mt-6">
              <LinkButton href="/contacto" variant="ghost" size="md">
                Hablar con el equipo
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FAQ items={HOME_FAQ} />
          </div>
        </div>
      </Container>
    </section>
  );
}