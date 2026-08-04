// Abstract analytics layer — decouples events from any specific provider.
// Wire to PostHog, Plausible, or GA4 by setting NEXT_PUBLIC_ANALYTICS_PROVIDER.

export type AnalyticsEvent =
  | "hero_cta_clicked"
  | "secondary_hero_cta_clicked"
  | "department_viewed"
  | "pricing_plan_selected"
  | "demo_started"
  | "registration_started"
  | "integration_viewed"
  | "video_played"
  | "department_card_hovered"
  | "permission_changed"
  | "approval_clicked"
  | "menu_opened"
  | "section_viewed"
  | "mid_cta_clicked"
  | "final_cta_clicked";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "console";

  if (provider === "console") {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info(`[analytics] ${event}`, payload ?? {});
    }
    return;
  }

  if (provider === "ga4") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
    return;
  }

  // Hook for posthog / plausible — left intentionally as a no-op until SDK
  // is wired. The dispatch surface stays stable.
}

export function identify(userId: string, traits?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "console";
  if (provider === "console") {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info(`[analytics] identify ${userId}`, traits ?? {});
    }
  }
}
