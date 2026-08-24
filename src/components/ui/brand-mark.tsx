import Image from "next/image";
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
        "relative inline-flex items-center justify-center leading-none",
        className
      )}
    >
      <Image
        src="/logo-light.svg"
        alt="DEPARTIFY"
        width={140}
        height={28}
        className="h-full w-auto shrink-0 select-none"
        draggable={false}
      />
    </div>
  );
}
