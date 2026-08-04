import { Hero } from "@/components/marketing/hero";
import { PainPoints } from "@/components/marketing/pain-points";
import { WhatIs } from "@/components/marketing/what-is";
import { Trust } from "@/components/marketing/trust";
import { HowToStart } from "@/components/marketing/how-to-start";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { ProductJsonLd, FAQJsonLd } from "@/components/layout/json-ld";
import { HOME_FAQ_DATA } from "@/data/home-faq";

// VENDING MACHINE V2 — Home optimizada para conversión.
// 5 secciones que responden a las 4 preguntas del cliente:
// 1. Hero → ¿Qué es?
// 2. PainPoints → ¿Por qué me sirve?
// 3. WhatIs + Trust → ¿Qué es? (en detalle) + ¿Por qué confiar?
// 4. HowToStart → ¿Cómo empiezo?
// 5. Faq + FinalCta → últimas objeciones + decisión
//
// Departamentos viven en su propia sección (/departamentos), no en Home.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <WhatIs />
      <Trust />
      <HowToStart />
      <FaqSection />
      <FinalCta />
      <ProductJsonLd
        name="Departify — Tu empresa trabajando sola"
        description="Departify ejecuta tareas reales de tu empresa — marketing, ventas, soporte, operaciones — como si tuvieras un equipo que nunca duerme. Tú decides, ellos trabajan."
        price={49}
      />
      <FAQJsonLd items={HOME_FAQ_DATA} />
    </>
  );
}