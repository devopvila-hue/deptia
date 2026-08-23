import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export async function Footer({ locale }: { locale: Locale }) {
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const columns = (await getTranslations({ locale, namespace: "footer" })).raw(
    "columns"
  ) as { title: string; links: { label: string; href: string }[] }[];
  const year = new Date().getFullYear();
  const copyright = tFooter("copyright", { year });

  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-light.svg"
                alt={tFooter("brandAlt")}
                className="h-7 w-auto shrink-0 select-none"
                draggable={false}
              />
            </div>

            <p className="mt-6 max-w-md font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-foreground text-pretty sm:text-[1.75rem]">
              {tFooter("titleTagline")}
            </p>
            <p className="mt-3 max-w-md text-[0.9375rem] text-muted text-pretty">
              {tBrand("description")}
            </p>

            <div className="mt-8">
              <Link
                href="https://app.departify.app/signup"
                className="group inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-4 py-2.5 text-[0.875rem] font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
              >
                {tBrand("footerCta")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={localePrefixPath(locale, link.href)}
                          className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <p className="font-mono uppercase tracking-[0.14em]">{tFooter("madeIn")}</p>
        </div>
      </Container>
    </footer>
  );
}
