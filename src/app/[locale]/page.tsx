import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/marketing/hero";
import { PainPoints } from "@/components/marketing/pain-points";
import { Wow } from "@/components/marketing/wow";
import { Diagnostics } from "@/components/marketing/diagnostics";
import { Recommendation } from "@/components/marketing/recommendation";
import { HowToStart } from "@/components/marketing/how-to-start";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { ProductJsonLd, FAQJsonLd, BreadcrumbJsonLd, WebSiteJsonLd } from "@/components/layout/json-ld";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;

  const t = await getTranslations({ locale, namespace: "home" });
  const faq = t.raw("faq") as { q: string; a: string }[];
  const productName = t("productJsonLd.name");
  const productDescription = t("productJsonLd.description");
  const faqItems = faq.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <Hero locale={typedLocale} />
      <PainPoints />
      <Wow />
      <Diagnostics />
      <Recommendation />
      <HowToStart />
      <FaqSection locale={typedLocale} />
      <FinalCta />
      <ProductJsonLd name={productName} description={productDescription} price={99} />
      <FAQJsonLd items={faqItems} />
      <BreadcrumbJsonLd items={[{ name: "Inicio", url: "/" }]} />
      <WebSiteJsonLd locale={typedLocale} />
    </>
  );
}
