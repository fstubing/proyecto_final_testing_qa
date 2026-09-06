const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const ClientesPage = require("../pages/ClientesPage");
const ArticulosPage = require("../pages/ArticulosPage");
const FacturasPage = require("../pages/FacturasPage");
const CobrosPage = require("../pages/CobrosPage");

test.describe("Flujo completo de facturación", () => {
  test.skip(
    !process.env.BASE_URL,
    "Define BASE_URL para ejecutar pruebas E2E.",
  );

  test("permite recorrer clientes, artículos, facturas y cobros", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);
    const articulosPage = new ArticulosPage(page);
    const facturasPage = new FacturasPage(page);
    const cobrosPage = new CobrosPage(page);

    await loginPage.goto("/login");
    await loginPage.login(process.env.E2E_USER, process.env.E2E_PASSWORD);

    await clientesPage.open();
    await expect(clientesPage.heading).toBeVisible();
    await articulosPage.open();
    await expect(articulosPage.heading).toBeVisible();
    await facturasPage.open();
    await expect(facturasPage.heading).toBeVisible();
    await cobrosPage.open();
    await expect(cobrosPage.heading).toBeVisible();
  });
});
