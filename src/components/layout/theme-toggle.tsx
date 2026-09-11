"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import type { Locale } from "@/i18n/config";

export const THEME_KEY = "departify-theme";
function subscribe(onChange: () => void) {
  const sync = (event: StorageEvent) => {
    if (event.key !== THEME_KEY && event.key !== null) return;
    document.documentElement.dataset.theme =
      event.newValue === "light" ? "light" : "dark";
    onChange();
  };
  window.addEventListener("departify-theme-change", onChange);
  window.addEventListener("storage", sync);
  return () => {
    window.removeEventListener("departify-theme-change", onChange);
    window.removeEventListener("storage", sync);
  };
}
const snapshot = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const serverSnapshot = () => "dark";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  function select(value: "light" | "dark") {
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
    window.dispatchEvent(new Event("departify-theme-change"));
  }
  return (
    <div
      className="site-theme-toggle"
      role="group"
      aria-label={locale === "es" ? "Apariencia" : "Appearance"}
    >
      {(["light", "dark"] as const).map((value) => {
        const label =
          value === "light"
            ? locale === "es"
              ? "Modo claro"
              : "Light mode"
            : locale === "es"
              ? "Modo oscuro"
              : "Dark mode";
        const Icon = value === "light" ? Sun : Moon;
        return (
          <button
            type="button"
            key={value}
            title={label}
            aria-label={label}
            aria-pressed={theme === value}
            onClick={() => select(value)}
          >
            <Icon size={15} />
          </button>
        );
      })}
    </div>
  );
}
