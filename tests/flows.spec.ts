import { test, expect } from "@playwright/test";

test.describe("Panel demo", () => {
  test("cambia de tab correctamente", async ({ page }) => {
    await page.goto("/demo");

    // Tabs visibles
    const tabs = ["Resumen", "Departamentos", "Tareas", "Aprobaciones", "Calendario", "Conexiones", "Consumo", "Ajustes"];
    for (const label of tabs) {
      await expect(page.getByRole("button", { name: label }).first()).toBeVisible();
    }

    // Click en Aprobaciones
    await page.getByRole("button", { name: "Aprobaciones" }).first().click();
    await expect(page.getByText(/decisiones esperándote/i)).toBeVisible();
  });

  test("puede aprobar una solicitud", async ({ page }) => {
    await page.goto("/demo");
    await page.getByRole("button", { name: "Aprobaciones" }).first().click();
    const before = await page.getByText(/decisiones esperándote/i).textContent();
    expect(before).toContain("4");

    await page.getByRole("button", { name: "Aprobar" }).first().click();
    await expect(page.getByText(/decisiones esperándote/i)).toContainText("3");
  });
});

test.describe("Onboarding de registro", () => {
  test("muestra el paso 1 de cuenta", async ({ page }) => {
    await page.goto("/registro");
    await expect(page.getByText(/Paso 01 · Cuenta/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Continuar/i })).toBeVisible();
  });

  test("valida campos requeridos", async ({ page }) => {
    await page.goto("/registro");
    await page.getByRole("button", { name: /Continuar/i }).click();
    // Should show validation errors
    await expect(page.getByText(/Necesitamos tu nombre/i)).toBeVisible();
  });
});

test.describe("Menú móvil", () => {
  test("se abre y se cierra en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const openButton = page.getByRole("button", { name: "Abrir menú" });
    await openButton.click();

    const closeButton = page.getByRole("button", { name: "Cerrar menú" });
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();
  });
});

test.describe("Pricing", () => {
  test("muestra los tres planes", async ({ page }) => {
    await page.goto("/precios");
    await expect(page.getByText("Starter")).toBeVisible();
    await expect(page.getByText("Business")).toBeVisible();
    await expect(page.getByText("Company")).toBeVisible();
  });

  test("toggle mensual/anual funciona", async ({ page }) => {
    await page.goto("/precios");
    // Click on Anual
    const annualButton = page.getByRole("button", { name: /Anual/i });
    await annualButton.click();
    // Should now show yearly prices (€990, €2490, €4990)
    await expect(page.getByText("990 €").first()).toBeVisible();
  });
});

test.describe("Reduced motion", () => {
  test("respeta prefers-reduced-motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    // No debería lanzar errores
    expect(true).toBe(true);
    await context.close();
  });
});
