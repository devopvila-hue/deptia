import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { CategoryStatement } from "@/components/marketing/category-statement";
import { DepartmentsCatalog } from "@/components/marketing/departments-catalog";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { DemoConversation } from "@/components/marketing/demo-conversation";
import { ControlPermissions } from "@/components/marketing/control-permissions";
import { Integrations } from "@/components/marketing/integrations";
import { IntegrationsMarquee } from "@/components/marketing/integrations-marquee";
import { PrivateInstance } from "@/components/marketing/private-instance";
import { TelegramAccess } from "@/components/marketing/telegram-access";
import { Pricing } from "@/components/marketing/pricing";
import { UseCase } from "@/components/marketing/use-case";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { ProductJsonLd, FAQJsonLd } from "@/components/layout/json-ld";
import { HOME_FAQ_DATA } from "@/data/home-faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryStatement />
      <DepartmentsCatalog />
      <HowItWorks />
      <DemoConversation />
      <ControlPermissions />
      <Integrations />
      <IntegrationsMarquee />
      <PrivateInstance />
      <TelegramAccess />
      <UseCase />
      <Pricing />
      <FaqSection />
      <FinalCta />
      <ProductJsonLd
        name="DEPT.IA — Departamentos de IA para empresas"
        description="Departamentos empresariales operados mediante inteligencia artificial: marketing, ventas, contenido. Instancia privada, control real, cancelación sencilla."
        price={99}
      />
      <FAQJsonLd items={HOME_FAQ_DATA} />
    </>
  );
}
