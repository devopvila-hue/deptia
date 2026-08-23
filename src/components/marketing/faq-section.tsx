"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ } from "@/components/ui/faq";
import { LinkButton } from "@/components/ui/link-button";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const faq = t.raw("home.faq") as { q: string; a: string }[];
  const faqItems = faq.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <section className="relative border-b border-border">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{t("home.faqEyebrow")}</Eyebrow>
            <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              {t("home.faqTitle")}
            </h2>
            <p className="mt-5 text-[0.9375rem] text-muted text-pretty">{t("home.faqAfterTitle")}</p>

            <div className="mt-6">
              <LinkButton
                href={localePrefixPath(locale, "/contacto")}
                variant="ghost"
                size="md"
              >
                {t("home.faqTalkToTeam")}
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FAQ items={faqItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
