"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ } from "@/components/ui/faq";
import { LinkButton } from "@/components/ui/link-button";
import { copy } from "@/config/site";

// FAQ breve. Solo las objeciones reales de un Manolo.
const HOME_FAQ = [
  {
    question: "¿Necesito saber de tecnología?",
    answer:
      "No. Si sabes usar WhatsApp y Gmail, sabes usar Departify. Le hablas como le hablarías a una persona.",
  },
  {
    question: "¿Y si no funciona para mi negocio?",
    answer:
      "Tienes 14 días gratis. Si en ese tiempo no te convence, no pagas nada. Sin tarjeta al principio.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Cada empresa tiene su propia instancia privada. Tus datos no se mezclan con los de otros clientes. Puedes borrarlo todo cuando quieras.",
  },
  {
    question: "¿Hace cosas sin que yo se lo pida?",
    answer:
      "Solo si tú lo has autorizado antes. Tú decides qué puede hacer solo y qué necesita tu OK. Siempre.",
  },
  {
    question: "¿Es lo mismo que un chatbot?",
    answer:
      "No. Un chatbot responde preguntas. Departify ejecuta tareas completas: redacta, envía, programa, organiza, mide. Y recuerda lo que hizo.",
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer:
      "Sí. Sin permanencia, sin letra pequeña. Cancelas hoy y dejas de pagar mañana. Tus datos quedan disponibles 30 días para descargar.",
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