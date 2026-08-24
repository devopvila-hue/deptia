import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FinalCta } from "@/components/marketing/final-cta";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { brand } from "@/config/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recursos" });
  const localizedUrl = locale === "es" ? `${brand.url}/recursos` : `${brand.url}/en/recursos`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "es" ? "/recursos" : "/en/recursos",
      languages: {
        "es-ES": "/recursos",
        "en-US": "/en/recursos",
        "x-default": "/recursos",
      },
    },
    openGraph: {
      title: `${t("ogTitle")} · ${brand.name}`,
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

type Resource = {
  type: string;
  title: string;
  description: string;
  time: string;
};

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recursos" });
  const resources = t.raw("items") as Resource[];

  return (
    <>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={`/recursos/${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group rounded-2xl border border-border bg-[#0c0e0a] p-6 transition-colors hover:border-foreground/30"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  {resource.type} · {resource.time}
                </span>
                <h2 className="mt-3 font-display text-[1.25rem] leading-[1.2] tracking-[-0.02em] text-foreground text-pretty">
                  {resource.title}
                </h2>
                <p className="mt-2 text-[0.875rem] text-muted text-pretty">
                  {resource.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-foreground">
                  {t("read")}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
