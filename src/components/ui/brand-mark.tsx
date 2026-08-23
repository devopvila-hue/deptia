import { cn } from "@/lib/utils";

/**
 * DEPARTIFY brand mark — solo el logo (logo-light.svg).
 * El bloque padre controla el alto: si el padre tiene `h-9`, el logo
 * ocupa `h-9` y el ancho se calcula solo.
 */
export function BrandMark({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center leading-none",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.svg"
        alt="DEPARTIFY"
        className="h-full w-auto shrink-0 select-none"
        draggable={false}
      />
    </div>
  );
}
