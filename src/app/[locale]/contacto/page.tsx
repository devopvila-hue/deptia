import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactForm } from "@/components/forms/contact-form";
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
  const t = await getTranslations({ locale: typedLocale, namespace: "contacto" });
  const localizedUrl =
    typedLocale === "es" ? `${brand.url}/contacto` : `${brand.url}/en/contacto`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: typedLocale === "es" ? "/contacto" : "/en/contacto",
      languages: {
        "es-ES": "/contacto",
        "en-US": "/en/contacto",
        "x-default": "/contacto",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl,
      type: "website",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: "contacto" });

  return (
    <section className="relative">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="wide" className="relative grid grid-cols-1 gap-16 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="01">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-6 text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("subtitle")}
          </p>

          <div className="mt-10 space-y-4 border-t border-border pt-6">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {t("panels.email.label")}
              </p>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="mt-1 inline-block text-[1rem] text-foreground hover:text-accent"
              >
                {t("panels.email.value")}
              </a>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {t("panels.security.label")}
              </p>
              <a
                href={`mailto:${brand.securityEmail}`}
                className="mt-1 inline-block text-[1rem] text-foreground hover:text-accent"
              >
                {t("panels.security.value")}
              </a>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {t("panels.location.label")}
              </p>
              <p className="mt-1 text-[1rem] text-foreground">
                {t("panels.location.value")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                {t("panels.response.label")}
              </p>
              <p className="mt-1 text-[1rem] text-foreground">
                {t("panels.response.value")}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}