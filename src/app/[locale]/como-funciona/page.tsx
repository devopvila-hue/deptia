import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { InstanceBuild } from "@/components/visualizations/instance-build";
import { VideoPlaceholder } from "@/components/visualizations/video-placeholder";
import { FinalCta } from "@/components/marketing/final-cta";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

const STEP_NUMBERS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"] as const;

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
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="https://app.departify.app/signup"
              variant="primary"
              size="lg"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              {t("ctaPrimary")}
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              {t("ctaSecondary")}
            </Button>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STEP_NUMBERS.map((number, index) => (
              <li
                key={number}
                className="rounded-xl border border-border bg-[#0c0e0a] p-5"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                    {number}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                    {t(`steps.${index}.duration`)}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.125rem] font-medium text-foreground">
                  {t(`steps.${index}.title`)}
                </h3>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">
                  {t(`steps.${index}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Build visualization */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="02">{t("activationEyebrow")}</Eyebrow>
              <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
                {t("activationTitle")}
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
                {t("activationBody")}
              </p>
            </div>
            <div className="lg:col-span-7">
              <InstanceBuild />
            </div>
          </div>
        </Container>
      </section>

      {/* Demo video */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="03">{t("demoEyebrow")}</Eyebrow>
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