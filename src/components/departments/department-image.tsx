"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  badge?: string;
  ratio?: "video" | "wide" | "photo" | "portrait";
  className?: string;
  priority?: boolean;
};

const RATIOS = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  photo: "aspect-[3/2]",
  portrait: "aspect-[3/4]",
} as const;

// Mapeo de aspect-ratio → tamaños concretos para next/image.
// Estos valores son los reales del contenedor una vez que Tailwind aplica
// la `aspect-*` utility; mantenerlos sincronizados evita CLS.
const RATIO_DIMENSIONS = {
  video: { width: 1280, height: 720 },
  wide: { width: 1680, height: 720 },
  photo: { width: 1200, height: 800 },
  portrait: { width: 900, height: 1200 },
} as const;

// Tamaños responsivos para el slot (sirve como pista al navegador para
// elegir el source correcto en AVIF/WebP).
const SIZES = {
  video: "(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw",
  wide: "(max-width: 768px) 100vw, 80vw",
  photo: "(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw",
  portrait: "(max-width: 768px) 100vw, 40vw",
} as const;

export function DepartmentImage({
  src,
  alt,
  caption,
  badge,
  ratio = "video",
  className,
  priority,
}: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dims = RATIO_DIMENSIONS[ratio];

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={cn("group relative", className)}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Ver imagen en grande"
          className={cn(
            "relative block w-full overflow-hidden rounded-2xl border border-border bg-[#0c0e0a]",
            RATIOS[ratio],
          )}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image
              src={src}
              alt={alt}
              width={dims.width}
              height={dims.height}
              sizes={SIZES[ratio]}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Corner ticks */}
          <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-foreground/30" />
          <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-foreground/30" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-foreground/30" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-foreground/30" />

          {/* Badge */}
          {badge && (
            <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-[#0c0e0a]/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground/90 backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {badge}
            </span>
          )}

          {/* Expand hint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex translate-y-1 items-center gap-1.5 rounded-md border border-foreground/20 bg-[#0c0e0a]/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" />
            Ver
          </span>
        </button>

        {caption && (
          <figcaption className="mt-3 flex items-start gap-2 text-[0.8125rem] text-muted text-pretty">
            <ImageIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {caption}
          </figcaption>
        )}
      </motion.figure>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#0c0e0a] text-foreground"
              aria-label="Cerrar imagen"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={dims.width}
                height={dims.height}
                sizes="90vw"
                className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              />
              {caption && (
                <p className="mt-3 text-center text-[0.875rem] text-muted text-pretty">
                  {caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
