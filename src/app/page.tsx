import { Hero } from "@/components/marketing/hero";
import { PainPoints } from "@/components/marketing/pain-points";
import { Wow } from "@/components/marketing/wow";
import { HowToStart } from "@/components/marketing/how-to-start";
import { Proof } from "@/components/marketing/proof";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { ProductJsonLd, FAQJsonLd } from "@/components/layout/json-ld";
import { HOME_FAQ_DATA } from "@/data/home-faq";

// VENDING MACHINE V3 — Categoría nueva: un compañero de trabajo.
// Sin competir. Sin nombrar rivales. Sin tabla comparativa.
// Cada sección responde UNA pregunta única.
//
// Preguntas de la Home (de arriba a abajo):
// 1. Hero → ¿Qué es Departify?
// 2. PainPoints → ¿Por qué me sirve?
// 3. Wow → ¿Cómo trabaja? (la categoría)
// 4. HowToStart → ¿Cómo empiezo?
// 5. Proof → ¿Quién lo usa?
// 6. Faq → ¿Y si me equivoco?
// 7. FinalCta → Decisión.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Wow />
      <HowToStart />
      <Proof />
      <FaqSection />
      <FinalCta />
      <ProductJsonLd
        name="Departify — Un compañero de trabajo para tu empresa"
        description="Departify primero entiende tu negocio, después trabaja contigo, y cada día te conoce mejor. Sin instalar nada. Sin cambiar lo que ya funciona."
        price={49}
      />
      <FAQJsonLd items={HOME_FAQ_DATA} />
    </>
  );
}