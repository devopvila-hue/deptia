"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Maximize2, X, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { DepartmentMotionGraphic } from "./department-motion-graphic";
import "./department-cinema.css";

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
  video: "aspect-[4/3]",
  wide: "aspect-video",
  photo: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
};

export function DepartmentImage({
  src,
  alt,
  caption,
  ratio = "video",
  className,
  priority,
}: Props) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const slug = src.split("/").filter(Boolean)[1] ?? "developer";
  const kind = src.includes("/team.")
    ? "team"
    : src.includes("/output.")
      ? "output"
      : "hero";

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const trigger = opener.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <motion.figure
        initial={reduced || priority ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "department-visual",
          "department-visual--" + kind,
          className,
        )}
      >
        <div className={cn("department-cinema-shell", RATIOS[ratio])}>
          <DepartmentMotionGraphic
            slug={slug}
            kind={kind}
            paused={paused || open}
          />
        </div>
        <div className="department-cinema-toolbar">
          <span>
            {kind === "hero"
              ? "Así trabaja tu departamento"
              : kind === "team"
                ? "Especialistas que se coordinan"
                : "Del trabajo a tu aprobación"}
          </span>
          <div>
            {!reduced && (
              <button
                type="button"
                aria-label={paused ? "Reanudar animación" : "Pausar animación"}
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}
            <button
              ref={opener}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={"Ampliar " + alt}
              aria-haspopup="dialog"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
        {caption && (
          <figcaption className="department-cinema-caption">
            {caption}
          </figcaption>
        )}
      </motion.figure>
      {open && (
        <dialog
          ref={dialog}
          className="department-cinema-dialog"
          aria-label={"Vista ampliada: " + alt}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="department-cinema-modal">
            <div className="department-cinema-modal-bar">
              <span>DEPARTIFY / VISTA AMPLIADA</span>
              <div>
                {!reduced && (
                  <button
                    type="button"
                    aria-label={
                      paused ? "Reanudar animación" : "Pausar animación"
                    }
                    aria-pressed={paused}
                    onClick={() => setPaused((p) => !p)}
                  >
                    {paused ? <Play size={16} /> : <Pause size={16} />}
                  </button>
                )}
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar gráfico"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="department-cinema-expanded">
              <DepartmentMotionGraphic
                slug={slug}
                kind={kind}
                paused={paused}
              />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
