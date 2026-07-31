"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

type TabsProps = {
  items: TabItem[];
  defaultId?: string;
  className?: string;
  onChange?: (id: string) => void;
  align?: "start" | "center";
};

export function Tabs({ items, defaultId, className, onChange, align = "start" }: TabsProps) {
  const [active, setActive] = useState<string>(defaultId ?? items[0]?.id ?? "");
  const activeItem = items.find((i) => i.id === active);

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <LayoutGroup id="tabs">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className={cn(
            "relative flex flex-wrap items-center gap-1 rounded-lg border border-border bg-surface-soft/60 p-1",
            align === "center" && "mx-auto"
          )}
        >
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tab-panel-${item.id}`}
                onClick={() => {
                  setActive(item.id);
                  onChange?.(item.id);
                }}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-4 py-2 text-[0.875rem] font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-md bg-surface border border-border-strong"
                    transition={{ type: "spring", stiffness: 480, damping: 36 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            key={activeItem.id}
            id={`tab-panel-${activeItem.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {activeItem.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
