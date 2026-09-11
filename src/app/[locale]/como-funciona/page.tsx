import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { brand } from "@/config/brand";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { HowPage } from "@/components/marketing/premium/how-page";
import { BreadcrumbJsonLd } from "@/components/layout/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({
    locale: typedLocale,
    namespace: "comoFunciona",
  });
  const baseUrl = brand.url;
  const localizedUrl =
    typedLocale === "es"
      ? `${baseUrl}/como-funciona`
      : `${baseUrl}/en/como-funciona`;
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
  return (
    <>
      <HowPage locale={locale as Locale} />
      <BreadcrumbJsonLd
        items={[
          {
            name: locale === "es" ? "Inicio" : "Home",
            url: locale === "es" ? "/" : "/en",
          },
          {
            name: locale === "es" ? "Cómo funciona" : "How it works",
            url: locale === "es" ? "/como-funciona" : "/en/como-funciona",
          },
        ]}
      />
    </>
  );
}
