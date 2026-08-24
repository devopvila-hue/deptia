import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/layout/legal-page";
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
  const t = await getTranslations({ locale: typedLocale, namespace: "privacidad" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/privacidad" : "/en/privacidad",
      languages: {
        "es-ES": "/privacidad",
        "en-US": "/en/privacidad",
        "x-default": "/privacidad",
      },
    },
    robots: { index: false, follow: true },
  };
}

type SectionData = {
  title: string;
  intro: string;
  list: string[];
  body: string;
  beforeStrong: string;
  strong: string;
  afterStrong: string;
  beforeEmail: string;
  email: string;
  afterEmail: string;
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "privacidad" });
  const sections = (await getTranslations({ locale: typedLocale, namespace: "privacidad" }))
    .raw("sections") as SectionData[];

  const renderSectionContent = (s: SectionData) => {
    return (
      <>
        {s.body ? <p>{s.body}</p> : null}
        {s.intro ? <p>{s.intro}</p> : null}
        {s.list && s.list.length > 0 ? (
          <ul className="list-disc pl-5">
            {s.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : null}
        {s.beforeStrong || s.strong || s.afterStrong ? (
          <p>
            {s.beforeStrong}
            {s.strong ? <strong>{s.strong}</strong> : null}
            {s.afterStrong}
          </p>
        ) : null}
        {s.beforeEmail || s.email || s.afterEmail ? (
          <p>
            {s.beforeEmail}
            {s.email ? (
              <a href={`mailto:${s.email}`} className="text-foreground underline">
                {s.email}
              </a>
            ) : null}
            {s.afterEmail}
          </p>
        ) : null}
      </>
    );
  };

  return (
    <LegalPage
      index="01"
      title={t("title")}
      description={t("description")}
      updated={t("updated")}
      sections={sections.map((s) => ({
        title: s.title,
        content: renderSectionContent(s),
      }))}
    />
  );
}