// Visual QA tipográfico — 4 viewports, ES + EN. Detecta overflow y mide wrap del H1.
import { chromium } from "@playwright/test";

const URL_BASE = "http://localhost:3000";
const OUT = "/tmp/deptia-typo";

const viewports = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844 },
];

async function probeHero(page) {
  return await page.evaluate(() => {
    const heroSection = document.querySelector("main section:first-of-type");
    if (!heroSection) return { error: "no hero section" };
    const headline = heroSection.querySelector("h1");
    const copy = headline?.parentElement?.querySelector("p.text-muted");
    const ctaButtons = heroSection.querySelectorAll('a[href*="departify.app/signup"], a[href*="/departamentos"]');
    const heroCtas = Array.from(ctaButtons).filter((a) => heroSection.contains(a));
    const microtext = heroSection.querySelector("p span.inline-flex.items-center.gap-1\\.5");
    const rightPanel = heroSection.querySelector('[class*="rounded-2xl"]');
    const headlineRect = headline?.getBoundingClientRect();
    const headlineStyle = headline ? window.getComputedStyle(headline) : null;
    const result = {
      headlineLines: headline ? Math.round(headlineRect.height / parseFloat(headlineStyle.lineHeight)) : null,
      headlineHeight: headline ? Math.round(headlineRect.height) : null,
    };
    const items = {
      navbar: document.querySelector("header.sticky"),
      headline,
      copy,
      primaryCta: heroCtas.find((a) => a.getAttribute("href")?.includes("signup")),
      secondaryCta: heroCtas.find((a) => a.getAttribute("href")?.includes("/departamentos")),
      rightPanel,
      microtext,
    };
    for (const [k, el] of Object.entries(items)) {
      if (!el) { result[k] = null; continue; }
      const r = el.getBoundingClientRect();
      result[k] = {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        right: Math.round(r.right),
        visible: r.top < window.innerHeight && r.bottom > 0 && r.bottom <= window.innerHeight,
        overflowsRight: r.right > window.innerWidth,
      };
    }
    result.scrollY = window.scrollY;
    result.vh = window.innerHeight;
    result.bodyFontFamily = window.getComputedStyle(document.body).fontFamily;
    result.headlineFontFamily = headlineStyle?.fontFamily;
    result.headlineFontWeight = headlineStyle?.fontWeight;
    result.headlineTracking = headlineStyle?.letterSpacing;
    return result;
  });
}

(async () => {
  const browser = await chromium.launch();
  try {
    for (const url of [URL_BASE + "/", URL_BASE + "/en"]) {
      const locale = url.endsWith("/en") ? "en" : "es";
      for (const v of viewports) {
        const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } });
        const page = await ctx.newPage();
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForTimeout(800);
        const path = `${OUT}/${locale}-${v.name}.png`;
        await page.screenshot({ path, fullPage: false });
        const probe = await probeHero(page);
        console.log(`\n=== ${locale} ${v.name} ===`);
        console.log(JSON.stringify(probe, null, 2));
        await ctx.close();
      }
    }
    // Capture additional landing sections: pricing, departamentos, footer
    for (const route of ["/departamentos", "/precios", "/seguridad"]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(URL_BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      const slug = route.replace(/\//g, "_");
      await page.screenshot({ path: `${OUT}/es-section${slug}.png`, fullPage: false });
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
})();
