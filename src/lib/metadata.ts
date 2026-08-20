import type { Metadata, Viewport } from "next";
import { brand } from "@/config/brand";

export const siteMetadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [
    "departamentos IA",
    "equipos IA empresa",
    "marketing IA",
    "ventas IA",
    "automatización empresarial",
    "departamento como servicio",
    "inteligencia artificial para empresas",
  ],
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.name,
  // canonical se omite a propósito: cada page.tsx define el suyo
  // (/, /precios, /departamentos/<slug>, etc.). Definirlo aquí forzaba
  // que TODAS las páginas indexaran la home como canónica (bug SEO).
  // languages queda como fallback global para hreflang.
  alternates: {
    languages: {
      "es-ES": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    // Next 14 genera /og.png y /twitter-image.png desde los archivos
    // src/app/opengraph-image.tsx y src/app/twitter-image.tsx.
    // Mantener rutas explícitas acelera el render de redes sociales.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${brand.name} — ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const siteViewport: Viewport = {
  themeColor: "#080908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
