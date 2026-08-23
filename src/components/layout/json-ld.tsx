import { getTranslations } from "next-intl/server";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/config";

export async function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tBrand("name"),
    legalName: brand.legalName,
    url: brand.url,
    description: tBrand("description"),
    logo: `${brand.url}/logo.svg`,
    foundingDate: `${brand.foundedYear}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: brand.country,
    },
    sameAs: [brand.social.linkedin, brand.social.x].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: brand.contactEmail,
        availableLanguage: ["Spanish", "English"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: brand.name },
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: "EUR",
          price,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${brand.url}${item.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
