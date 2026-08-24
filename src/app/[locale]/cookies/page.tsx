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
  const t = await getTranslations({ locale: typedLocale, namespace: "cookies" });
  const baseUrl = brand.url;
  const localizedUrl =
    typedLocale === "es" ? `${baseUrl}/cookies` : `${baseUrl}/en/cookies`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/cookies" : "/en/cookies",
      languages: {
        "es-ES": "/cookies",
        "en-US": "/en/cookies",
        "x-default": "/cookies",
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

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "cookies" });

  return (
    <LegalPage
      index="03"
      title={t("title")}
      description={t("description")}
      updated={t("updated")}
      sections={[
        {
          title: t("sections.whatAreCookies.title"),
          content: <p>{t("sections.whatAreCookies.body")}</p>,
        },
        {
          title: t("sections.cookiesWeUse.title"),
          content: (
            <>
              <p>{t("sections.cookiesWeUse.intro")}</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>{t("sections.cookiesWeUse.technical.label")}:</strong>{" "}
                  {t("sections.cookiesWeUse.technical.body")}
                </li>
                <li>
                  <strong>{t("sections.cookiesWeUse.preference.label")}:</strong>{" "}
                  {t("sections.cookiesWeUse.preference.body")}
                </li>
                <li>
                  <strong>{t("sections.cookiesWeUse.analytics.label")}:</strong>{" "}
                  {t("sections.cookiesWeUse.analytics.body")}
                </li>
              </ul>
            </>
          ),
        },
        {
          title: t("sections.management.title"),
          content: <p>{t("sections.management.body")}</p>,
        },
        {
          title: t("sections.thirdParty.title"),
          content: <p>{t("sections.thirdParty.body")}</p>,
        },
        {
          title: t("sections.updates.title"),
          content: <p>{t("sections.updates.body")}</p>,
        },
      ]}
    />
  );
}
