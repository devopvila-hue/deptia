import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { brand } from "@/config/brand";

type Section = {
  title: string;
  content: ReactNode;
};

type Props = {
  title: string;
  description: string;
  updated: string;
  sections: Section[];
  index: string;
};

export function LegalPage({ title, description, updated, sections, index }: Props) {
  return (
    <>
      <section className="relative border-b border-border">
        <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
        <Container width="wide" className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow index={index}>Legal</Eyebrow>
            <h1 className="mt-6 text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
              {title}
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted text-pretty">
              {description}
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              Última actualización · {updated}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="wide" className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_3fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Índice
              </p>
              <ol className="mt-3 space-y-1.5">
                {sections.map((s, i) => (
                  <li key={s.title} className="text-[0.8125rem] text-muted">
                    <span className="font-mono text-[0.65rem] text-muted/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {s.title}
                  </li>
                ))}
              </ol>
            </aside>

            <div className="space-y-10">
              {sections.map((s, i) => (
                <article
                  key={s.title}
                  className="border-t border-border pt-6 first:border-t-0 first:pt-0"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-[1.5rem] tracking-[-0.02em] text-foreground">
                    {s.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-foreground/85 text-pretty [&_strong]:text-foreground [&_strong]:font-medium">
                    {s.content}
                  </div>
                </article>
              ))}

              <div className="mt-12 rounded-xl border border-border bg-surface-soft/40 p-5 text-[0.8125rem] text-muted">
                <p>
                  Si tienes dudas sobre este documento, escríbenos a{" "}
                  <a
                    href={`mailto:${brand.contactEmail}`}
                    className="text-foreground hover:text-accent"
                  >
                    {brand.contactEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
