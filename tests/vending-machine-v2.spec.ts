import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Vending Machine V2 — Validación Customer Zero", () => {
  test("Home optimizada responde las 4 preguntas", async ({ page }) => {
    await page.goto(BASE);

    // 1. ¿QUÉ ES? — Hero debe comunicar valor claro
    const heroTitle = page.locator("h1").first();
    await expect(heroTitle).toBeVisible();
    const heroText = await heroTitle.textContent();
    console.log("H1:", heroText);

    // NO debe contener "Business Operating System" como mensaje principal
    expect(heroText).not.toContain("Business Operating System");
    expect(heroText).not.toContain("Operating System");
    expect(heroText).not.toContain("Tu próxima hora");

    // Debe contener una promesa clara
    expect(heroText?.toLowerCase()).toMatch(/trabaja|empresa|hazlo/);

    // 2. ¿POR QUÉ ME SIRVE? — Pain Points visibles
    const painTitle = page.getByText(/Lo que te pasa ahora mismo/i);
    await expect(painTitle).toBeVisible();

    // 3. ¿QUÉ ES? en detalle — WhatIs
    const whatIsTitle = page.getByText(/Departify trabaja por ti/i);
    await expect(whatIsTitle).toBeVisible();

    // 4. ¿POR QUÉ CONFIAR? — Trust
    const trustTitle = page.getByText(/Tienes el control/i);
    await expect(trustTitle).toBeVisible();

    // 5. ¿CÓMO EMPIEZO? — HowToStart
    const howToTitle = page.getByText(/De cero a funcionando/i);
    await expect(howToTitle).toBeVisible();

    // 6. FAQ
    const faqTitle = page.getByText(/preguntas que nos hace/i);
    await expect(faqTitle).toBeVisible();

    // 7. CTA Final
    const ctaTitle = page.getByText(/Deja de hacerlo todo/i);
    await expect(ctaTitle).toBeVisible();

    // Verificar que la Home tiene MENOS secciones que antes
    const sections = await page.locator("section").count();
    console.log("Número de secciones:", sections);
    expect(sections).toBeLessThanOrEqual(10); // Antes: 15

    // Verificar que NO hay "DepartmentsCatalog" en Home
    const departmentsCatalogText = page.getByText(/departamentos disponibles/i);
    expect(await departmentsCatalogText.isVisible({ timeout: 1000 }).catch(() => false))
      .toBe(false);

    await page.screenshot({ path: "/tmp/deptia-home-v2.png", fullPage: true });
  });

  test("Manolo entiende en 20 segundos", async ({ page }) => {
    await page.goto(BASE);

    // El H1 debe decir algo que un pequeño empresario entienda
    const h1 = await page.locator("h1").first().textContent();

    // "Trabaja menos. Tu empresa, no." — promesa clara
    expect(h1).toMatch(/trabaja menos/i);

    // El CTA principal debe ser claro
    const primaryCta = page.getByRole("link", { name: /Probar gratis/i }).first();
    await expect(primaryCta).toBeVisible();

    // Micro-confianza visible
    const microtext = page.getByText(/Sin tarjeta/i).first();
    await expect(microtext).toBeVisible();
  });
});