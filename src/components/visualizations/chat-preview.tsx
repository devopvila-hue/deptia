"use client";

// ChatPreview — réplica fiel del chat real de app.departify.app, localizada
// vía next-intl. Lee los textos del namespace home.visualization.chatPreview.
import { motion } from "motion/react";
import { ArrowUpRight, Plus, Layers, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FOLDER = "Departify / 01_Marketing";

export function ChatPreview({ className }: { className?: string }) {
  const t = useTranslations("home.visualization.chatPreview");
  return (
    <div className={cn("relative isolate flex h-full min-h-0 flex-col gap-3", className)}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-3"
      >
        <h3 className="font-display text-[0.9375rem] font-medium tracking-[-0.01em] text-foreground">
          {t("headerTitle")}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-soft/50 px-2.5 text-[0.75rem] font-medium text-foreground/90 transition-colors hover:bg-surface-soft"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("newConversation")}
          </button>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface-soft/50 px-2.5 text-[0.75rem] font-medium text-foreground/90 transition-colors hover:bg-surface-soft"
          >
            <Layers className="h-3.5 w-3.5 text-accent" />
            {t("compactContext")}
          </button>
        </div>
      </motion.div>

      <div className="flex-1 space-y-3 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-start gap-2.5"
        >
          <div
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-[#0c0e0a]"
            aria-hidden
          >
            <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.14em] text-accent">
              DA
            </span>
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-border bg-[#0c0e0a]/80 p-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {t("bubbleFrom")}
            </p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-pretty text-foreground/90">
              {t("bubblePlan1")}
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-foreground/90">
              {t("bubblePlan2", { folder: FOLDER })}
            </p>
            <a
              href="https://drive.google.com"
              className="mt-2.5 inline-flex items-center gap-1 text-[0.75rem] font-medium text-accent underline-offset-4 hover:underline"
            >
              {t("openInDrive")}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="ml-9 rounded-lg border border-accent/40 bg-[#0c0e0a]/70 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.8125rem] font-semibold text-foreground">{t("taskTitle")}</p>
            <span className="rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-success">
              {t("taskDone")}
            </span>
          </div>
          <p className="mt-2 text-[0.75rem] leading-relaxed text-pretty text-muted">
            {t("taskDescription", { folder: FOLDER })}
          </p>
          <button
            type="button"
            className="mt-2.5 inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface-soft/70 px-2.5 text-[0.7rem] font-medium text-foreground transition-colors hover:bg-surface-soft"
          >
            {t("openInDrive")}
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex items-center gap-2 rounded-lg border border-border bg-[#0c0e0a]/90 px-3 py-2.5"
      >
        <Plus className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <span className="flex-1 truncate text-[0.8125rem] text-muted">{t("inputPlaceholder")}</span>
        <button
          type="button"
          aria-label={t("sendAria")}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-[#0a0c08] transition-transform hover:scale-[1.03]"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
