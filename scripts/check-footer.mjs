// Captura solo el footer de la home y mide su posición
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const footer = await page.evaluate(() => {
    const f = document.querySelector("footer");
    if (!f) return null;
    const r = f.getBoundingClientRect();
    return {
      top: Math.round(r.top + window.scrollY),
      bottom: Math.round(r.bottom + window.scrollY),
      text: f.textContent?.slice(0, 200),
      links: Array.from(f.querySelectorAll("a")).map((a) => a.textContent?.trim()).filter(Boolean),
    };
  });
  console.log("FOOTER:", JSON.stringify(footer, null, 2));
  // Scroll to footer + screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/tmp/deptia-typo/home-footer.png", fullPage: false });
} finally {
  await browser.close();
}
