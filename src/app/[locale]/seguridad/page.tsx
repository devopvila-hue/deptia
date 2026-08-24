import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/marketing/final-cta";
import { IsolatedInstances } from "@/components/visualizations/isolated-instances";
import { ShieldCheck, Lock, Database, FileLock, Users, Eye, MailCheck, KeyRound } from "lucide-react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

const PILLAR_ICONS = [Lock, Database, KeyRound, ShieldCheck, Eye, Users, FileLock, MailCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "seguridad" });
  const baseUrl = brand.url;
  const localizedUrl = typedLocale === "es" ? `${baseUrl}/seguridad` : `${baseUrl}/en/seguridad`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/seguridad" : "/en/seguridad",
      languages: {
        "es-ES": "/seguridad",
        "en-US": "/en/seguridad",
        "x-default": "/seguridad",
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

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "seguridad" });
  const pillars = t.raw("pillars") as Array<{ title: string; description: string }>;
  const reserved = t.raw("reserved") as Array<{ title: string; description: string }>;

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <Eyebrow index="01">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="/contacto?asunto=seguridad"
              variant="primary"
              size="lg"
              rightIcon={<MailCheck className="h-4 w-4" />}
            >
              {t("hero.primaryCta")}
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Lock;
              return (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-[#0c0e0a] p-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/30 bg-accent-soft text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[0.875rem] text-muted text-pretty">{p.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Isolation visualization */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="wide" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="02">{t("isolation.eyebrow")}</Eyebrow>
              <h2 className="mt-6 text-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
                {t("isolation.title")}
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted text-pretty">
                {t("isolation.body")}
              </p>
            </div>
            <div className="lg:col-span-7">
              <IsolatedInstances />
            </div>
          </div>
        </Container>
      </section>

      {/* Reserved sections */}
      <section className="border-b border-border">
        <Container width="wide" className="py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow index="03">{t("documentation.eyebrow")}</Eyebrow>
              <h2 className="mt-6 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
                {t("documentation.title")}
              </h2>
              <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
                {t("documentation.body")}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 lg:col-span-8 sm:grid-cols-2">
              {reserved.map((r) => (
                <li
                  key={r.title}
                  className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-5"
                >
                  <h3 className="text-[1.0625rem] font-medium text-foreground">{r.title}</h3>
                  <p className="mt-2 text-[0.875rem] text-muted text-pretty">{r.description}</p>
                  <Link
                    href="/contacto?asunto=seguridad"
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
                  >
                    {t("documentation.cta")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Note about certifications */}
      <section className="border-b border-border bg-surface-soft/20">
        <Container width="narrow" className="py-20 sm:py-24">
          <div className="rounded-2xl border border-border bg-[#0c0e0a] p-6 sm:p-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {t("certifications.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
              {t("certifications.title")}
            </h2>
            <p className="mt-3 text-[0.9375rem] text-muted text-pretty">
              {t("certifications.body")}
            </p>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
