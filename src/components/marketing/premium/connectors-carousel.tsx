"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { homeConnectors } from "@/data/home-connectors";
import type { Locale } from "@/i18n/config";

export function ConnectorsCarousel({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const es = locale === "es";
  return (
    <section
      className="connectors-carousel"
      aria-label={es ? "Herramientas de tu empresa" : "Your business tools"}
    >
      <div className="p-wrap connectors-carousel-heading">
        <div>
          <p>
            {es
              ? "Trabaja donde tú ya trabajas"
              : "Works where you already work"}
          </p>
          <span>
            {es
              ? "Tus herramientas. El contexto de tu empresa."
              : "Your tools. Your business context."}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={
            paused
              ? es
                ? "Reanudar carrusel"
                : "Resume carousel"
              : es
                ? "Pausar carrusel"
                : "Pause carousel"
          }
          title={
            paused ? (es ? "Reanudar" : "Resume") : es ? "Pausar" : "Pause"
          }
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <div className="connectors-window">
        <div className={`connectors-track${paused ? " is-paused" : ""}`}>
          {[false, true].map((duplicate) => (
            <ul
              className="connectors-group"
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {homeConnectors.map((tool) => (
                <li key={tool.logo}>
                  <span className="connector-logo" aria-hidden="true">
                    <span
                      className="connector-logo-mark"
                      style={{
                        backgroundColor: tool.color,
                        maskImage: `url(/brands/connectors/${tool.logo}.svg)`,
                        WebkitMaskImage: `url(/brands/connectors/${tool.logo}.svg)`,
                      }}
                    />
                  </span>
                  <span>{tool.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
