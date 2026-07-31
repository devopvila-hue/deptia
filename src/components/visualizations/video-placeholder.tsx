"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  aspect?: "video" | "square" | "wide";
  poster?: string;
};

const ASPECTS = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
} as const;

export function VideoPlaceholder({
  title = "Demostración",
  subtitle = "En construcción · 60 s",
  className,
  aspect = "video",
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#101210] to-[#080908]",
        ASPECTS[aspect],
        className
      )}
    >
      {/* Backdrop pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(216,255,98,0.08) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Animated noise bars */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

      {/* Center play button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pausar demostración" : "Reproducir demostración"}
          className="group/play relative flex h-20 w-20 items-center justify-center rounded-full border border-foreground/20 bg-[#0c0e0a]/80 backdrop-blur transition-all hover:border-accent/60 hover:bg-[#0c0e0a]"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-accent/40"
            aria-hidden
          />
          <Play className="h-6 w-6 translate-x-0.5 fill-foreground text-foreground transition-transform group-hover/play:scale-110" />
        </button>
        <p className="mt-6 text-[0.9375rem] font-medium text-foreground">{title}</p>
        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          {subtitle}
        </p>
      </div>

      {/* Timeline mock */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">00:00</span>
          <div className="h-px flex-1 bg-border">
            <div className="h-px w-1/3 bg-accent" />
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">01:00</span>
        </div>
      </div>

      {/* Corner ticks */}
      <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-foreground/20" aria-hidden />
      <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-foreground/20" aria-hidden />
      <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-foreground/20" aria-hidden />
      <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-foreground/20" aria-hidden />
    </motion.div>
  );
}
