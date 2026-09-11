import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { notFound } from "next/navigation";
import { PremiumHome } from "@/components/marketing/premium/home";
import { content } from "@/components/marketing/premium/content";
import {
  FAQJsonLd,
  BreadcrumbJsonLd,
  WebSiteJsonLd,
} from "@/components/layout/json-ld";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const c = content[locale as Locale];
  const title =
    locale === "es"
      ? "Siete departamentos de IA. Un mismo rumbo."
      : "Seven AI departments. One direction.";
  const image = {
    url: new URL("/opengraph-image", brand.url).toString(),
    width: 1200,
    height: 630,
    alt: "Departify — Tu próximo gran paso. Con más equipo.",
  };
  return {
    title,
    description: c.intro,
    openGraph: {
      title: `${title} · Departify`,
      description: c.intro,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Departify`,
      description: c.intro,
      images: [image.url],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const c = content[typedLocale];
  return (
    <>
      <PremiumHome locale={typedLocale} />
      <FAQJsonLd
        items={c.faqs.map(([question, answer]) => ({
          question: question!,
          answer: answer!,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          {
            name: locale === "es" ? "Inicio" : "Home",
            url: locale === "es" ? "/" : "/en",
          },
        ]}
      />
      <WebSiteJsonLd locale={typedLocale} />
    </>
  );
}
