// Página /recursos/[slug] — bilingüe.
//
// Cada recurso se resuelve desde el catálogo i18n (recursos.items[]).
// El slug se incluye en cada item para evitar acoplar la URL al título
// (que puede cambiar) y para mantener el routing estable.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/marketing/final-cta";
import { brand } from "@/config/brand";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { localePrefixPath } from "@/i18n/locale-path";

type Resource = {
  slug: string;
  type: string;
  title: string;
  description: string;
  time: string;
};

function findResource(items: Resource[], slug: string): Resource | undefined {
  return items.find((it) => it.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "recursos" });
  const items = t.raw("items") as Resource[];
  const item = findResource(items, slug);
  if (!item) return { title: t("notFoundTitle") };

  const baseUrl = brand.url;
  const path = `/recursos/${slug}`;
  const localizedUrl =
    typedLocale === "es" ? `${baseUrl}${path}` : `${baseUrl}/en${path}`;
  const description = item.description.slice(0, 155);
  return {
    title: `${item.title} · ${item.type}`,
    description,
    alternates: {
      canonical: typedLocale === "es" ? path : `/en${path}`,
      languages: {
        "es-ES": path,
        "en-US": `/en${path}`,
        "x-default": path,
      },
    },
    openGraph: {
      title: `${item.title} · ${item.type}`,
      description,
      url: localizedUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} · ${item.type}`,
      description,
    },
  };
}

export default async function RecursoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "recursos" });
  const items = t.raw("items") as Resource[];
  const item = findResource(items, slug);
  if (!item) notFound();

  // Sugerencias de cross-link a departamentos relevantes según el slug.
  // Mapa pequeño — mantenlo aquí para que cada recurso apunte a dept(s) reales.
  const relatedDepts: Record<string, string[]> = {
    "como-decidir-que-departamento-contratar-primero": ["marketing", "ventas"],
    "marketing-y-ventas-coordinados": ["marketing", "ventas"],
    "chatbots-vs-departamentos": ["marketing", "atencion-cliente"],
    "actualizaciones-octubre": ["marketing"],
    "activacion-departamento-en-30-minutos": ["marketing"],
    "brief-de-primera-mision": ["marketing"],
    "how-to-decide-which-department-first": ["marketing", "ventas"],
    "marketing-and-sales-coordination": ["marketing", "ventas"],
    "chatbots-vs-departments": ["marketing", "atencion-cliente"],
    "october-updates": ["marketing"],
    "department-activation-30-minutes": ["marketing"],
    "first-mission-brief": ["marketing"],
  };
  const deptSlugs = relatedDepts[item.slug] ?? [];
  const tDept = await getTranslations({ locale: typedLocale, namespace: "departamentos" });

  return (
    <>
      <section className="relative border-b border-border">
        <div
          className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade"
          aria-hidden
        />
        <Container width="wide" className="relative py-20 sm:py-28">
          <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            <Link
              href={localePrefixPath(typedLocale, "/recursos")}
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              {t("breadcrumb")}
            </Link>
          </div>
          <Eyebrow className="mt-6">{item.type}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {item.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {item.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            <span>
              {item.type} · {item.time}
            </span>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                {t("bodyEyebrow")}
              </p>
              <div className="prose prose-invert mt-4 max-w-none text-[1.0625rem] leading-relaxed text-foreground/90">
                <p className="text-pretty">{item.description}</p>
                <p className="mt-6 text-pretty text-muted">
                  {t("bodyLead")}
                </p>
                <p className="mt-4 text-pretty text-muted">{t("bodyCoda")}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  href={localePrefixPath(typedLocale, "/departamentos")}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  {t("bodyCtaPrimary")}
                </Button>
                <Button
                  href="https://app.departify.app/signup"
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  {t("bodyCtaSecondary")}
                </Button>
              </div>
            </article>
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-[#0c0e0a] p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  {t("relatedEyebrow")}
                </p>
                {deptSlugs.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {deptSlugs.map((slug) => {
                      const name = tDept(`dept.${slug}.shortName`);
                      return (
                        <li key={slug}>
                          <Link
                            href={localePrefixPath(
                              typedLocale,
                              `/departamentos/${slug}`,
                            )}
                            className="group flex items-center justify-between rounded-lg border border-border bg-background/40 p-3 transition-colors hover:border-foreground/30"
                          >
                            <span className="text-[0.9375rem] text-foreground">
                              {name}
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-4 text-[0.875rem] text-muted">
                    {t("relatedFallback")}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
