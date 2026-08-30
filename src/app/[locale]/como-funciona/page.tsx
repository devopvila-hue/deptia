import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { VideoPlaceholder } from "@/components/visualizations/video-placeholder";
import { FinalCta } from "@/components/marketing/final-cta";
import { HowItWorksInfographic } from "@/components/marketing/how-it-works-infographic";
import { ArrowUpRight } from "lucide-react";
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
  const t = await getTranslations({ locale: typedLocale, namespace: "comoFunciona" });
  const baseUrl = brand.url;
  const localizedUrl =
    typedLocale === "es" ? `${baseUrl}/como-funciona` : `${baseUrl}/en/como-funciona`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/como-funciona" : "/en/como-funciona",
      languages: {
        "es-ES": "/como-funciona",
        "en-US": "/en/como-funciona",
        "x-default": "/como-funciona",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "comoFunciona" });

  return (
    <>
      {/* Hero introductorio */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-12 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Eyebrow index="01">{t("eyebrow")}</Eyebrow>
            <div className="flex flex-wrap gap-3">
              <Button
                href="https://app.departify.app/signup"
                variant="primary"
                size="md"
                rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                {t("ctaPrimary")}
              </Button>
              <Button href="/demo" variant="secondary" size="md">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Diagrama principal: 8 pasos + herramientas + resultados */}
      <HowItWorksInfographic />

      {/* Demo video */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="02">{t("demoEyebrow")}</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                {t("demoTitle")}
              </h2>
              <p className="mt-4 text-[0.9375rem] text-muted text-pretty">
                {t("demoBody")}
              </p>
              <Button href="/demo" variant="secondary" size="md" className="mt-6">
                {t("demoCta")}
              </Button>
            </div>
            <div className="lg:col-span-8">
              <VideoPlaceholder title={t("videoTitle")} subtitle={t("videoSubtitle")} />
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}