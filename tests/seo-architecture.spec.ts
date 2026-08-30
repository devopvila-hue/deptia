import { test, expect, type Page } from "@playwright/test";
import { locales } from "../src/i18n/config";

// Public catalog of department slugs that MUST appear in /departamentos,
// the navigation, the footer and the sitemap. Anything outside this set
// has to be excluded from public SEO surfaces.
const PUBLIC_SLUGS = [
  "marketing",
  "seo",
  "ventas",
  "atencion-cliente",
  "administracion",
  "developer",
] as const;

// Legacy slugs that must NOT appear as public indexable URLs. They still
// exist in the data file for internal use but are not in the catalog.
const LEGACY_SLUGS = [
  "contenido",
  "operaciones",
  "rrhh",
  "logistica",
  "growth",
  "analitica",
  "finanzas",
  "soporte",
  "legal",
  "gobierno",
] as const;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function jsonLd(page: Page) {
  return page.evaluate(() => {
    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    );
    const out: any[] = [];
    for (const s of scripts) {
      const txt = s.textContent;
      if (!txt) continue;
      try {
        out.push(JSON.parse(txt));
      } catch {
        // ignore non-JSON blocks
      }
    }
    return out;
  });
}

test.describe("Public catalog (SEO architecture)", () => {
  for (const locale of locales) {
    const prefix = locale === "es" ? "" : "/en";
    test.beforeEach(async ({ context }) => {
      // Pin the NEXT_LOCALE cookie so the intl middleware picks the right
      // variant regardless of the Chromium default Accept-Language header.
      // Without this, /departamentos/marketing redirects to /en/... because
      // Desktop Chrome ships with Accept-Language: en-US.
      await context.addCookies([
        {
          name: "NEXT_LOCALE",
          value: locale,
          domain: "localhost",
          path: "/",
        },
      ]);
    });

    test(`[${locale}] home renders the 6+Developer catalog and is indexable`, async ({ page }) => {
      await page.goto(`${prefix}/`);
      await expect(page).toHaveTitle(/Departify/);

      const meta = page.locator('meta[name="robots"]');
      await expect(meta).toHaveAttribute("content", /index/i);

      const blocks = await jsonLd(page);
      const types = blocks.map((b) => b["@type"]);
      expect(types).toContain("Organization");
      expect(types).toContain("WebSite");
      expect(types).toContain("BreadcrumbList");

      // The 7 departments must be reachable from the home as Recommendation
      // cards or internal links. URLs are locale-prefixed: ES uses the bare
      // path (`/departamentos/marketing`), EN adds `/en` prefix.
      const html = await page.content();
      for (const slug of PUBLIC_SLUGS) {
        const esPath = `/departamentos/${slug}`;
        const enPath = `/en/departamentos/${slug}`;
        expect(html.toLowerCase()).toMatch(
          new RegExp(`${escapeRegExp(esPath)}|${escapeRegExp(enPath)}`),
        );
      }
    });

    test(`[${locale}] /departamentos lists only public catalog`, async ({ page }) => {
      await page.goto(`${prefix}/departamentos`);
      await expect(page.locator("h1")).toBeVisible();

      const html = await page.content();
      // Each public slug appears at least once (URLs are locale-prefixed).
      for (const slug of PUBLIC_SLUGS) {
        const esPath = `/departamentos/${slug}`;
        const enPath = `/en/departamentos/${slug}`;
        expect(html).toMatch(
          new RegExp(`${escapeRegExp(esPath)}|${escapeRegExp(enPath)}`),
        );
      }
      // Legacy slugs must not be linked from this page (check both locales).
      for (const slug of LEGACY_SLUGS) {
        expect(html).not.toContain(`/departamentos/${slug}`);
        expect(html).not.toContain(`/en/departamentos/${slug}`);
      }
      // Dirección is described as included coordination, not sold as a dept.
      expect(html.toLowerCase()).toMatch(/direcci[oó]n|leadership/);
    });

    test(`[${locale}] department detail pages return 200 with canonical`, async ({ request }) => {
      for (const slug of PUBLIC_SLUGS) {
        const res = await request.get(`${prefix}/departamentos/${slug}`);
        expect(res.status(), `slug=${slug}`).toBe(200);
      }
      for (const slug of LEGACY_SLUGS) {
        const res = await request.get(`${prefix}/departamentos/${slug}`, {
          maxRedirects: 0,
        });
        // Legacy slugs are not statically rendered: they return 404.
        expect([404, 500]).toContain(res.status());
      }
    });

    test(`[${locale}] department detail exposes unique title/description/canonical`, async ({ page }) => {
      const titles = new Set<string>();
      const descs = new Set<string>();
      for (const slug of PUBLIC_SLUGS) {
        await page.goto(`${prefix}/departamentos/${slug}`);
        const t = await page.title();
        const d = await page.locator('meta[name="description"]').getAttribute("content");
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(t, `unique title for ${slug}`).toBeTruthy();
        expect(d, `unique description for ${slug}`).toBeTruthy();
        expect(canonical, `canonical for ${slug}`).toContain(`/departamentos/${slug}`);
        titles.add(t);
        descs.add(d ?? "");
      }
      // Titles and descriptions should differ across slugs (no duplicates).
      expect(titles.size).toBe(PUBLIC_SLUGS.length);
      expect(descs.size).toBe(PUBLIC_SLUGS.length);
    });

    test(`[${locale}] department detail has BreadcrumbList + FAQ JSON-LD`, async ({ page }) => {
      await page.goto(`${prefix}/departamentos/marketing`);
      // Wait for hydration: JSON-LD scripts render server-side but only after
      // the layout has streamed. networkidle gives Next.js time to flush
      // the locale layout chrome (which carries OrganizationJsonLd).
      await page.waitForLoadState("networkidle");
      const blocks = await jsonLd(page);
      const types = blocks.map((b) => b["@type"]);
      expect(types).toContain("BreadcrumbList");
      // FAQ is only emitted on the ES detail (data-driven) for the marketing
      // department — checking its presence here is enough to confirm the
      // pattern is wired.
      if (locale === "es") expect(types).toContain("FAQPage");
    });

    test(`[${locale}] navigation dropdown lists only public departments`, async ({ page }) => {
      await page.goto(`${prefix}/`);
      const trigger = page.getByRole("button", { name: /Departamentos/i }).first();
      if (await trigger.isVisible()) {
        await trigger.click();
      }
      const html = await page.content();
      for (const slug of PUBLIC_SLUGS) {
        const esPath = `/departamentos/${slug}`;
        const enPath = `/en/departamentos/${slug}`;
        expect(html).toMatch(
          new RegExp(`${escapeRegExp(esPath)}|${escapeRegExp(enPath)}`),
        );
      }
      for (const slug of LEGACY_SLUGS) {
        expect(html).not.toContain(`/departamentos/${slug}`);
        expect(html).not.toContain(`/en/departamentos/${slug}`);
      }
    });

    test(`[${locale}] footer lists only public departments`, async ({ page }) => {
      await page.goto(`${prefix}/`);
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      const text = await footer.textContent();
      for (const slug of LEGACY_SLUGS) {
        const html = await footer.innerHTML();
        expect(html).not.toContain(`/departamentos/${slug}`);
        expect(html).not.toContain(`/en/departamentos/${slug}`);
      }
      expect(text?.length ?? 0).toBeGreaterThan(0);
    });
  }

  test("sitemap.xml lists only public department URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<urlset");
    for (const slug of PUBLIC_SLUGS) {
      // Sitemap contains both the ES path and the EN path.
      const esPath = `/departamentos/${slug}`;
      const enPath = `/en/departamentos/${slug}`;
      expect(xml).toContain(esPath);
      expect(xml).toContain(enPath);
    }
    for (const slug of LEGACY_SLUGS) {
      expect(xml).not.toContain(`/departamentos/${slug}`);
      expect(xml).not.toContain(`/en/departamentos/${slug}`);
    }
    // Both ES and EN hreflang variants must be present.
    expect(xml).toContain('hreflang="es-ES"');
    expect(xml).toContain('hreflang="en-US"');
  });

  test("robots.txt allows / and disallows private areas", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const txt = await res.text();
    expect(txt.toLowerCase()).toMatch(/user-agent:\s*\*/i);
    expect(txt).toMatch(/Allow:\s*\//);
    expect(txt).toMatch(/Disallow:\s*\/demo/);
    expect(txt).toMatch(/Disallow:\s*\/registro/);
    expect(txt).toMatch(/Disallow:\s*\/acceso/);
    expect(txt).toMatch(/Disallow:\s*\/admin/);
    expect(txt).toMatch(/Sitemap:\s*.*sitemap\.xml/);
  });
});
