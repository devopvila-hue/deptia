import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/layout/legal-page";
import { routing } from "@/i18n/routing";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "terminos" });
  const baseUrl = brand.url;
  const localizedUrl =
    typedLocale === "es" ? `${baseUrl}/terminos` : `${baseUrl}/en/terminos`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/terminos" : "/en/terminos",
      languages: {
        "es-ES": "/terminos",
        "en-US": "/en/terminos",
        "x-default": "/terminos",
      },
    },
    robots: { index: false, follow: true },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "terminos" });

  return (
    <LegalPage
      index="02"
      title={t("title")}
      description={t("description")}
      updated={t("updated")}
      sections={[
        {
          title: t("sections.acceptance.title"),
          content: <p>{t("sections.acceptance.body")}</p>,
        },
        {
          title: t("sections.object.title"),
          content: <p>{t("sections.object.body")}</p>,
        },
        {
          title: t("sections.account.title"),
          content: <p>{t("sections.account.body")}</p>,
        },
        {
          title: t("sections.allowedUse.title"),
          content: <p>{t("sections.allowedUse.body")}</p>,
        },
        {
          title: t("sections.payments.title"),
          content: <p>{t("sections.payments.body")}</p>,
        },
        {
          title: t("sections.ip.title"),
          content: <p>{t("sections.ip.body")}</p>,
        },
        {
          title: t("sections.liability.title"),
          content: <p>{t("sections.liability.body")}</p>,
        },
        {
          title: t("sections.suspension.title"),
          content: <p>{t("sections.suspension.body")}</p>,
        },
        {
          title: t("sections.changes.title"),
          content: <p>{t("sections.changes.body")}</p>,
        },
        {
          title: t("sections.law.title"),
          content: <p>{t("sections.law.body")}</p>,
        },
      ]}
    />
  );
}
