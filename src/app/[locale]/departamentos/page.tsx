// Página /departamentos index — bilingüe ES/EN.
// La lista de departamentos se mantiene en data/departments.ts (typed source of truth);
// los campos visibles en la cuadrícula se localizan via i18n catalog bajo
// departamentos.dept.{slug}.{name|shortName|promise|tagline|category}.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DepartmentGrid } from "@/components/departments/department-grid";
import { BreadcrumbJsonLd } from "@/components/layout/json-ld";
import { listPublicDepartments } from "@/data/departments";
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
  const t = await getTranslations({ locale: typedLocale, namespace: "departamentos" });
  const brandT = await getTranslations({ locale: typedLocale, namespace: "brand" });
  const baseUrl = brand.url;
  const localizedUrl = typedLocale === "es" ? `${baseUrl}/departamentos` : `${baseUrl}/en/departamentos`;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: typedLocale === "es" ? "/departamentos" : "/en/departamentos",
      languages: {
        "es-ES": "/departamentos",
        "en-US": "/en/departamentos",
        "x-default": "/departamentos",
      },
    },
    openGraph: {
      title: `${t("title")} · ${brand.name}`,
      description: t("subtitle"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function DepartmentsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "departamentos" });
  const tChrome = await getTranslations({ locale: typedLocale, namespace: "chrome" });

  // Filtrado por PUBLIC_DEPARTMENT_SLUGS — Dirección no entra aquí porque
  // se describe como base coordinadora en la landing, no como departamento
  // opcional. listPublicDepartments ya devuelve los 6 + Developer ordenados
  // por `ordering`.
  const ordered = listPublicDepartments();

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="D">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      {/* Dirección (incluida, no se vende) */}
      <section className="border-b border-border bg-surface-soft/30">
        <Container width="wide" className="py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                {t("direccion.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-9">
              <h2 className="text-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-balance text-foreground">
                {t("direccion.title")}
              </h2>
              <p className="mt-4 max-w-3xl text-[1rem] leading-relaxed text-muted text-pretty">
                {t("direccion.body")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Active departments */}
      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ordered.map((d) => (
              <DepartmentGrid key={d.slug} department={d} locale={typedLocale} />
            ))}
          </div>
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: tChrome("breadcrumbHome"), url: "/" },
          { name: tChrome("breadcrumbCatalog"), url: "/departamentos" },
        ]}
      />
    </>
  );
}