// Locale-scoped layout. Lee el segmento [locale], valida que sea un locale conocido,
// carga los mensajes y renderiza el chrome (header, footer, json-ld).
// <html lang> se establece dinámicamente por locale (es-ES / en-US).
// Las URLs actuales (/, /departamentos, ...) sirven ES.
// /en, /en/departamentos, ... sirven EN.
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/layout/json-ld";
import { routing } from "@/i18n/routing";
import { locales, toBcp47, type Locale } from "@/i18n/config";
import { brand } from "@/config/brand";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

// Metadata API + i18n: title/description localizados, OG locale dinámico,
// alternates con hreflang ES/EN/x-default.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const t = await getTranslations({ locale, namespace: "brand" });
  const baseUrl = brand.url;
  const localizedUrl = locale === "es" ? baseUrl : `${baseUrl}/en`;
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s · ${t("name")}`,
    },
    description: t("description"),
    applicationName: t("name"),
    keywords:
      locale === "es"
        ? [
            "departamentos IA",
            "equipos IA empresa",
            "marketing IA",
            "ventas IA",
            "automatización empresarial",
            "departamento como servicio",
            "inteligencia artificial para empresas",
          ]
        : [
            "AI departments",
            "AI teams for business",
            "AI marketing",
            "AI sales",
            "business automation",
            "department as a service",
            "artificial intelligence for business",
          ],
    authors: [{ name: t("name"), url: baseUrl }],
    creator: t("name"),
    publisher: t("name"),
    alternates: {
      canonical: locale === "es" ? "/" : "/en",
      languages: {
        "es-ES": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: localizedUrl,
      siteName: t("name"),
      title: `${t("name")} — ${t("tagline")}`,
      description: t("description"),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${t("name")} — ${t("tagline")}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} — ${t("tagline")}`,
      description: t("description"),
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { email: false, address: false, telephone: false },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;

  // Habilita el consumo estático de getTranslations/useTranslations en server components
  // que están por debajo en el árbol.
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "chrome" });

  return (
    <html lang={toBcp47(typedLocale)} className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-[#0a0c08]"
          >
            {t("skipToContent")}
          </a>
          <Header locale={typedLocale} />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer locale={typedLocale} />
          <OrganizationJsonLd locale={typedLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
