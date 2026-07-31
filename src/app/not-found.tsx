import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[60vh]">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="narrow" className="relative flex min-h-[60vh] flex-col items-start justify-center py-32">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          404 · No encontrado
        </p>
        <h1 className="mt-3 text-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-foreground">
          Esta página no está en el organigrama.
        </h1>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-muted text-pretty">
          Es posible que el enlace haya cambiado o que la página haya sido movida. Te dejamos
          algunas puertas abiertas.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="primary" size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Volver al inicio
          </Button>
          <Button href="/departamentos" variant="secondary" size="lg">
            Ver departamentos
          </Button>
          <Button href="/contacto" variant="ghost" size="lg">
            Contactar
          </Button>
        </div>
      </Container>
    </section>
  );
}
