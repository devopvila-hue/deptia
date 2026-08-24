import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DemoPanel } from "@/components/demo/demo-panel";
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
  const t = await getTranslations({ locale: typedLocale, namespace: "demo" });
  const localizedUrl =
    typedLocale === "es" ? `${brand.url}/demo` : `${brand.url}/en/demo`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/demo" : "/en/demo",
      languages: {
        "es-ES": "/demo",
        "en-US": "/en/demo",
        "x-default": "/demo",
      },
    },
    openGraph: {
      title: `${t("metaTitle")} · ${brand.name}`,
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  return <DemoPanel />;
}