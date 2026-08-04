import { Hero } from "@/components/marketing/hero";
import { PainPoints } from "@/components/marketing/pain-points";
import { Wow } from "@/components/marketing/wow";
import { Diagnostics } from "@/components/marketing/diagnostics";
import { Recommendation } from "@/components/marketing/recommendation";
import { HowToStart } from "@/components/marketing/how-to-start";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { ProductJsonLd, FAQJsonLd } from "@/components/layout/json-ld";
import { HOME_FAQ_DATA } from "@/data/home-faq";

// V4 — From Catalog To Advisor.
// La Landing vende criterio, no departamentos.
// Primero escucha. Después recomienda.
// Cada sección responde UNA sola pregunta.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Wow />
      <Diagnostics />
      <Recommendation />
      <HowToStart />
      <FaqSection />
      <FinalCta />
      <ProductJsonLd
        name="Departify — La persona que tu empresa necesita"
        description="Antes de recomendarte nada, Departify analiza cómo funciona tu empresa y solo entonces te dice qué necesitas. Sin catálogo. Sin venta. Solo entender."
        price={49}
      />
      <FAQJsonLd items={HOME_FAQ_DATA} />
    </>
  );
}