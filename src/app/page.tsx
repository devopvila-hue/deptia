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

// V5 — Departments as the product.
// Cada departamento ejecuta trabajo real y monitoriza el negocio.
// Tú marcas los objetivos, decides y mantienes el control.
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
        name="Departify — Departamentos con IA para tu empresa"
        description="Marketing, SEO y más departamentos especializados que ejecutan trabajo, monitorizan tu negocio y te mantienen informado de lo que importa."
        price={99}
      />
      <FAQJsonLd items={HOME_FAQ_DATA} />
    </>
  );
}