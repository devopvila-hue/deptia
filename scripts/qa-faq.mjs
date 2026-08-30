// QA visual de la sección FAQ refactorizada (12→7).
import { chromium } from "@playwright/test";

const URL_BASE = "http://localhost:3000";
const OUT = "/tmp/deptia-faq";

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
];

(async () => {
  const browser = await chromium.launch();
  try {
    for (const url of [URL_BASE + "/", URL_BASE + "/en"]) {
      const locale = url.endsWith("/en") ? "en" : "es";
      for (const v of viewports) {
        const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } });
        const page = await ctx.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
        await page.waitForTimeout(2000);

        // La sección FAQ tiene varios botones accordion (button[aria-expanded])
        // Localiza la sección que los contiene usando Locator chaining.
        const firstQ = page.locator("button[aria-expanded]").first();
        await firstQ.waitFor({ timeout: 5000 });
        const faqSection = page.locator("section").filter({ has: page.locator("button[aria-expanded]") }).last();

        const probe = await faqSection.evaluate((el) => {
          const r = el.getBoundingClientRect();
          const buttons = el.querySelectorAll("button[aria-expanded]");
          const items = Array.from(buttons).map((b) => {
            const br = b.getBoundingClientRect();
            const q = b.querySelector("span")?.textContent?.trim();
            return { q: q?.slice(0, 50), height: Math.round(br.height) };
          });
          return {
            sectionHeight: Math.round(r.height),
            itemCount: buttons.length,
            items,
          };
        });

        console.log(`\n=== ${locale} ${v.name} ===`);
        console.log(JSON.stringify(probe, null, 2));

        await faqSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${OUT}/${locale}-${v.name}.png`, fullPage: false });

        // Screenshot con la primera pregunta abierta
        await firstQ.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${OUT}/${locale}-${v.name}-open.png`, fullPage: false });

        await ctx.close();
      }
    }
  } finally {
    await browser.close();
  }
})();
