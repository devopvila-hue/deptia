"use client";
import { PremiumHeader } from "@/components/marketing/premium/header";
import type { Locale } from "@/i18n/config";

/** One shared header across the entire public site. */
export function Header({ locale }: { locale: Locale }) {
  return <PremiumHeader locale={locale} />;
}
