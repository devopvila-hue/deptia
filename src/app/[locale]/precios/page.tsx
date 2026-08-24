import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/ui/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { brand } from "@/config/brand";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "precios" });
  const baseUrl = brand.url;
  const localizedUrl = typedLocale === "es" ? `${baseUrl}/precios` : `${baseUrl}/en/precios`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/precios" : "/en/precios",
      languages: {
        "es-ES": "/precios",
        "en-US": "/en/precios",
        "x-default": "/precios",
      },
    },
    openGraph: {
      title: `${t("ogTitle")} · ${brand.name}`,
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "precios" });

  const faqItems = (await getTranslations({ locale: typedLocale, namespace: "precios" }))
    .raw("faq.items") as Array<{ question: string; answer: string }>;

  return (
    <>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("hero.subtitle")}
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
              <Eyebrow index="02">{t("faq.eyebrow")}</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                {t("faq.title")}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FAQ items={faqItems} />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
