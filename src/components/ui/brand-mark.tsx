import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official symbol from docs.departify.app, with the lockup specified in its brand manual. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("official-brand", className)}>
      <Image
        src="/brand/departify-d-symbol.png"
        alt=""
        width={48}
        height={48}
        className="official-brand-symbol"
        priority
      />
      <span className="official-brand-wordmark">DEPARTIFY</span>
    </span>
  );
}
