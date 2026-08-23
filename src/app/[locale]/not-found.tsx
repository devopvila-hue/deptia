// Página 404 localizada. Se renderiza cuando:
// - El locale no está en el catálogo (caso edge)
// - Una página sin cobertura bilingüe se accede en /en/* (vía assertLocalizedForRoute)
//
// Garantiza ZERO-MIXED: toda la página está en un único idioma según el locale.
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export default async function NotFound({
  params,
}: {
  params?: { locale?: string };
}) {
  // Fallback ultra-defensivo: si locale es inválido o no llega (caso root not-found),
  // usamos ES para evitar render mixto.
  const typedLocale: Locale = params?.locale === "en" ? "en" : "es";
  const t = await getTranslations({ locale: typedLocale, namespace: "notFound" });
  const homeHref = localePrefixPath(typedLocale, "/");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="wide" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {t("eyebrow")}
            <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
          <h1 className="mt-6 text-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={homeHref} className="inline-flex">
              <Button variant="primary" size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                {t("primaryCta")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}